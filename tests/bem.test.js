import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable } from 'node:stream';
import { EventEmitter } from 'node:events';
import {
  createBemHandler,
  generateBem,
  validateInput,
  validateResult,
  BemError,
  DEFAULT_OPENAI_MODEL
} from '../server/bem.js';
import { sampleResult, sampleMarkup, buildBemScss } from '../src/composables/bemOutput.js';
const TEST_CSRF_TOKEN = '1'.repeat(64);
const createTestHandler = (options) => createBemHandler({ ...options, csrfToken: TEST_CSRF_TOKEN });
const input = { input: sampleMarkup, blockName: 'product-card', context: '' };
const success = () =>
  new Response(
    JSON.stringify({
      candidates: [
        { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(sampleResult) }] } }
      ]
    }),
    { status: 200 }
  );
function request({
  body = input,
  method = 'POST',
  path = '/api/bem/generate',
  origin = 'http://localhost:4000',
  ip = '127.0.0.1',
  contentType = 'application/json'
} = {}) {
  const req = Readable.from(
    body === null ? [] : [Buffer.from(typeof body === 'string' ? body : JSON.stringify(body))]
  );
  req.url = path;
  req.method = method;
  req.socket = { remoteAddress: ip };
  req.headers = {
    host: 'localhost:4000',
    origin,
    'content-type': contentType,
    'x-bem-token': TEST_CSRF_TOKEN
  };
  const res = new EventEmitter();
  res.destroyed = false;
  res.writableEnded = false;
  res.writeHead = (status, headers) => {
    res.status = status;
    res.headers = headers;
  };
  res.end = (body) => {
    res.body = JSON.parse(body);
    res.writableEnded = true;
  };
  return { req, res };
}
test('Gemini adapter uses server-only key header and structured output, preserves safe shape', async () => {
  let sent;
  const actual = await generateBem(input, {
    apiKey: 'test-secret-never-return',
    model: 'test-model',
    fetchImpl: async (url, options) => {
      sent = { url, options };
      return success();
    }
  });
  assert.equal(sent.options.headers['x-goog-api-key'], 'test-secret-never-return');
  assert.ok(!sent.url.includes('test-secret'));
  const payload = JSON.parse(sent.options.body);
  assert.equal(payload.generationConfig.responseMimeType, 'application/json');
  assert.ok(payload.generationConfig.responseJsonSchema.properties.classes);
  assert.equal(JSON.parse(payload.contents[0].parts[0].text).input, sampleMarkup);
  assert.deepEqual(actual.result, sampleResult);
  assert.ok(!JSON.stringify(actual).includes('test-secret'));
});
test('Input and BEM response validation rejects invalid, duplicate, missing-base and foreign blocks', () => {
  assert.throws(() => validateInput({ input: '화면 설명만 입력' }), BemError);
  assert.throws(
    () => validateInput({ ...input, input: '<p>' + 'a'.repeat(12000) + '</p>' }),
    BemError,
    DEFAULT_OPENAI_MODEL
  );
  assert.throws(() => validateInput({ ...input, blockName: 'Bad__Name' }), BemError);
  assert.throws(
    () =>
      validateResult({
        ...sampleResult,
        classes: [{ ...sampleResult.classes[0], name: 'card__title__nested' }]
      }),
    BemError,
    DEFAULT_OPENAI_MODEL
  );
  assert.throws(
    () =>
      validateResult({
        ...sampleResult,
        classes: [sampleResult.classes[0], sampleResult.classes[0]]
      }),
    BemError,
    DEFAULT_OPENAI_MODEL
  );
  assert.throws(
    () => validateResult({ ...sampleResult, classes: [sampleResult.classes[2]] }),
    BemError,
    DEFAULT_OPENAI_MODEL
  );
  assert.throws(() => validateResult(sampleResult, 'other-card'), BemError);
});
test('Missing key never contacts Google; upstream errors are redacted; malformed/truncated results fail', async () => {
  let calls = 0;
  await assert.rejects(
    generateBem(input, {
      fetchImpl: () => {
        calls++;
      }
    }),
    (e) => e.status === 503
  );
  assert.equal(calls, 0);
  await assert.rejects(
    generateBem(input, {
      apiKey: 'x',
      fetchImpl: async () => new Response('secret raw project error', { status: 429 })
    }),
    (e) => e.status === 429 && !e.message.includes('secret raw')
  );
  await assert.rejects(
    generateBem(input, {
      apiKey: 'x',
      fetchImpl: async () =>
        new Response(JSON.stringify({ candidates: [{ finishReason: 'MAX_TOKENS' }] }))
    }),
    (e) => e.status === 502
  );
  await assert.rejects(
    generateBem(input, {
      apiKey: 'x',
      fetchImpl: async () =>
        new Response(
          JSON.stringify({
            candidates: [{ finishReason: 'STOP', content: { parts: [{ text: 'broken' }] } }]
          })
        )
    }),
    (e) => e.status === 502
  );
});
test('Local API protects origin, hides credentials, rejects bad input and returns readable configuration errors', async () => {
  const handler = createTestHandler({ env: { GEMINI_API_KEY: '', GEMINI_MODEL: 'test-model' } });
  const status = request({ path: '/api/bem/status', method: 'GET', body: null });
  await handler(status.req, status.res);
  assert.deepEqual(status.res.body, {
    configured: false,
    model: 'test-model',
    csrfToken: TEST_CSRF_TOKEN,
    providers: {
      gemini: { configured: false, model: 'test-model' },
      openai: { configured: false, model: DEFAULT_OPENAI_MODEL }
    }
  });
  assert.equal(status.res.headers['Cache-Control'], 'no-store');
  const cross = request({ origin: 'https://example.com' });
  await handler(cross.req, cross.res);
  assert.equal(cross.res.status, 403);
  const lan = request({ ip: '192.168.1.2' });
  await handler(lan.req, lan.res);
  assert.equal(lan.res.status, 403);
  const bad = request({ body: '{broken' });
  await handler(bad.req, bad.res);
  assert.equal(bad.res.status, 400);
  const missing = request();
  await handler(missing.req, missing.res);
  assert.equal(missing.res.status, 503);
  const content = request({ contentType: 'text/plain' });
  await handler(content.req, content.res);
  assert.equal(content.res.status, 415);
});
test('Local API limits concurrent generations and requests per minute', async () => {
  let release;
  const handler = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-for-unit-test' },
    fetchImpl: () =>
      new Promise((resolve) => {
        release = () => resolve(success());
      })
  });
  const first = request();
  const pending = handler(first.req, first.res);
  while (!release) await new Promise((resolve) => setTimeout(resolve, 0));
  const second = request();
  await handler(second.req, second.res);
  assert.equal(second.res.status, 429);
  release();
  await pending;
  assert.equal(first.res.status, 200);
  let calls = 0;
  const limited = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-for-unit-test' },
    fetchImpl: async () => {
      calls++;
      return success();
    }
  });
  for (let n = 0; n < 11; n++) {
    const call = request();
    await limited(call.req, call.res);
    assert.equal(call.res.status, n < 10 ? 200 : 429);
  }
  assert.equal(calls, 10);
});
test('Generated SCSS uses valid selectors and keeps descriptions in single-line comments', () => {
  const output = buildBemScss(sampleResult.classes);
  assert.ok(output.includes('.product-card {'));
  assert.ok(output.includes('&__header {'));
  assert.ok(output.includes('&--featured {'));
  assert.ok(!buildBemScss([{ name: 'unsafe { color:red }', description: 'x' }]).includes('unsafe'));
  const comment = buildBemScss([{ name: 'card', description: 'text\ncolor: red;' }]);
  assert.ok(comment.startsWith('// text color: red;\n'));
});

const openaiSuccess = () =>
  new Response(
    JSON.stringify({
      status: 'completed',
      output: [
        { type: 'reasoning', summary: [] },
        {
          type: 'message',
          role: 'assistant',
          content: [{ type: 'output_text', text: JSON.stringify(sampleResult) }]
        }
      ]
    })
  );
test('OpenAI uses Responses strict schema and only its own server credential', async () => {
  let sent;
  const result = await generateBem(
    { ...input, provider: 'openai' },
    {
      apiKey: 'fake-openai-private',
      model: 'test-openai-model',
      fetchImpl: async (url, options) => {
        sent = { url, options };
        return openaiSuccess();
      }
    }
  );
  assert.equal(sent.url, 'https://api.openai.com/v1/responses');
  assert.equal(sent.options.headers.Authorization, 'Bearer fake-openai-private');
  assert.ok(!('x-goog-api-key' in sent.options.headers));
  const payload = JSON.parse(sent.options.body);
  assert.equal(payload.store, false);
  assert.equal(payload.text.format.type, 'json_schema');
  assert.equal(payload.text.format.strict, true);
  assert.equal(payload.text.format.schema.additionalProperties, false);
  assert.equal(payload.text.format.schema.properties.classes.items.additionalProperties, false);
  assert.ok(!sent.options.body.includes('fake-openai-private'));
  assert.deepEqual(result, {
    result: sampleResult,
    model: 'test-openai-model',
    provider: 'openai'
  });
});
test('Provider selection never uses another provider key or falls back after failure', async () => {
  let calls = 0;
  const noOpenai = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-gemini-only' },
    fetchImpl: async () => {
      calls++;
      return success();
    }
  });
  const missing = request({ body: { ...input, provider: 'openai' } });
  await noOpenai(missing.req, missing.res);
  assert.equal(missing.res.status, 503);
  assert.match(missing.res.body.error, /OPENAI_API_KEY/);
  assert.equal(calls, 0);
  const handler = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-gemini-key', OPENAI_API_KEY: 'fake-openai-key' },
    fetchImpl: async (url, options) => {
      calls++;
      assert.equal(url, 'https://api.openai.com/v1/responses');
      assert.equal(options.headers.Authorization, 'Bearer fake-openai-key');
      return new Response('raw private upstream details', { status: 429 });
    }
  });
  const failure = request({ body: { ...input, provider: 'openai' } });
  await handler(failure.req, failure.res);
  assert.equal(failure.res.status, 429);
  assert.equal(calls, 1);
  assert.ok(!JSON.stringify(failure.res.body).includes('raw private'));
  const invalid = request({ body: { ...input, provider: 'unknown' } });
  await handler(invalid.req, invalid.res);
  assert.equal(invalid.res.status, 400);
  assert.equal(calls, 1);
  const status = request({ path: '/api/bem/status', method: 'GET', body: null });
  await handler(status.req, status.res);
  assert.equal(status.res.body.providers.openai.configured, true);
  assert.equal(status.res.body.providers.gemini.configured, true);
  assert.ok(!JSON.stringify(status.res.body).includes('fake-openai-key'));
});
test('OpenAI refusal and incomplete JSON responses are handled without raw provider output', async () => {
  for (const data of [
    { status: 'incomplete', output: [] },
    {
      status: 'completed',
      output: [{ type: 'message', content: [{ type: 'refusal', refusal: 'private refusal text' }] }]
    },
    {
      status: 'completed',
      output: [{ type: 'message', content: [{ type: 'output_text', text: 'broken JSON' }] }]
    }
  ]) {
    await assert.rejects(
      generateBem(
        { ...input, provider: 'openai' },
        { apiKey: 'fake', fetchImpl: async () => new Response(JSON.stringify(data)) }
      ),
      (error) => error.status === 502 && !error.message.includes('private refusal')
    );
  }
});

test('CSRF is required before paid calls and cannot be forged or reused after restart', async () => {
  let calls = 0;
  const handler = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-key-only-for-unit-test' },
    fetchImpl: async () => {
      calls++;
      return success();
    }
  });
  for (const token of [undefined, 'invalid-token', '☃'.repeat(64)]) {
    const call = request();
    if (token === undefined) delete call.req.headers['x-bem-token'];
    else call.req.headers['x-bem-token'] = token;
    await handler(call.req, call.res);
    assert.equal(call.res.status, 403);
    assert.equal(call.res.body.code, 'BEM_TOKEN_INVALID');
  }
  assert.equal(calls, 0);
  const valid = request();
  await handler(valid.req, valid.res);
  assert.equal(valid.res.status, 200);
  assert.equal(calls, 1);
  const nextHandler = createBemHandler({
    env: { GEMINI_API_KEY: 'fake-key-only-for-unit-test' },
    fetchImpl: async () => {
      calls++;
      return success();
    }
  });
  const old = request();
  await nextHandler(old.req, old.res);
  assert.equal(old.res.status, 403);
  assert.equal(calls, 1);
});

test('Q&A endpoint shares CSRF, key protection and rate limits with BEM requests', async () => {
  let calls = 0;
  const handler = createTestHandler({
    env: { GEMINI_API_KEY: 'fake-shared-api-test-key' },
    fetchImpl: async () => {
      calls++;
      return new Response(
        JSON.stringify({
          candidates: [{ finishReason: 'STOP', content: { parts: [{ text: '질문 답변' }] } }]
        })
      );
    }
  });
  const body = { provider: 'gemini', messages: [{ role: 'user', content: '안녕하세요?' }] };
  const denied = request({ path: '/api/assistant/chat', body });
  delete denied.req.headers['x-bem-token'];
  await handler(denied.req, denied.res);
  assert.equal(denied.res.status, 403);
  assert.equal(calls, 0);
  const leaked = request({
    path: '/api/assistant/chat',
    body: { ...body, messages: [{ role: 'user', content: 'fake-shared-api-test-key' }] }
  });
  await handler(leaked.req, leaked.res);
  assert.equal(leaked.res.status, 400);
  assert.equal(calls, 0);
  for (let i = 0; i < 10; i++) {
    const call = request({ path: '/api/assistant/chat', body });
    await handler(call.req, call.res);
    assert.equal(call.res.status, 200);
    assert.equal(call.res.body.answer, '질문 답변');
  }
  const bem = request();
  await handler(bem.req, bem.res);
  assert.equal(bem.res.status, 429);
  assert.equal(calls, 10);
});
