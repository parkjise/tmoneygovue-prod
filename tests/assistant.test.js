import test from 'node:test';
import assert from 'node:assert/strict';
import { generateAnswer, validateConversation } from '../server/assistant.js';
import { buildConversation, answerBlocks } from '../src/composables/assistantText.js';
const messages = [
  { role: 'user', content: 'computed가 뭐야?' },
  { role: 'assistant', content: '반응형 계산 값입니다.' },
  { role: 'user', content: '간단한 예제도 알려줘' }
];
const gemini = (answer) =>
  new Response(
    JSON.stringify({
      candidates: [
        {
          finishReason: 'STOP',
          content: { parts: [{ thought: true, text: '비공개 생각' }, { text: answer }] }
        }
      ]
    })
  );
const openai = (answer) =>
  new Response(
    JSON.stringify({
      status: 'completed',
      output: [
        { type: 'reasoning', summary: [] },
        { type: 'message', content: [{ type: 'output_text', text: answer }] }
      ]
    })
  );
test('Q&A forwards visible history with correct Gemini roles and strips hidden thoughts', async () => {
  let sent;
  const data = await generateAnswer(
    { provider: 'gemini', messages },
    {
      apiKey: 'fake-assistant-test-key',
      model: 'gemini-test',
      fetchImpl: async (url, options) => {
        sent = { url, options, payload: JSON.parse(options.body) };
        return gemini('예제입니다.');
      }
    }
  );
  assert.equal(data.answer, '예제입니다.');
  assert.equal(data.provider, 'gemini');
  assert.deepEqual(
    sent.payload.contents.map((m) => m.role),
    ['user', 'model', 'user']
  );
  assert.equal(sent.payload.contents.at(-1).parts[0].text, messages.at(-1).content);
  assert.equal(sent.options.redirect, 'error');
  assert.ok(!sent.options.body.includes('fake-assistant-test-key'));
});
test('Q&A OpenAI request uses text history, server-only auth and store:false', async () => {
  let payload;
  const data = await generateAnswer(
    { provider: 'openai', messages },
    {
      apiKey: 'fake-openai-test-key',
      model: 'openai-test',
      fetchImpl: async (url, options) => {
        assert.equal(url, 'https://api.openai.com/v1/responses');
        assert.equal(options.headers.Authorization, 'Bearer fake-openai-test-key');
        payload = JSON.parse(options.body);
        return openai('한국어 답변');
      }
    }
  );
  assert.equal(data.answer, '한국어 답변');
  assert.equal(payload.store, false);
  assert.deepEqual(payload.input, messages);
  assert.ok(!payload.tools);
});
test('Q&A rejects forged roles, broken turns, excessive history and credential leakage', async () => {
  for (const input of [
    { messages: [] },
    { messages: [{ role: 'system', content: '변조' }] },
    { messages: [messages[0], messages[1]] },
    { messages: [{ role: 'user', content: 'a'.repeat(4001) }] },
    { provider: 'unknown', messages: [messages[0]] }
  ])
    assert.throws(() => validateConversation(input));
  let calls = 0;
  await assert.rejects(
    generateAnswer(
      { messages: [{ role: 'user', content: 'fake-assistant-secret-key' }] },
      {
        apiKey: 'fake-assistant-secret-key',
        fetchImpl: async () => {
          calls++;
        }
      }
    )
  );
  assert.equal(calls, 0);
  await assert.rejects(
    generateAnswer(
      { messages: [messages[0]] },
      {
        apiKey: 'fake-assistant-secret-key',
        fetchImpl: async () => gemini('fake-assistant-secret-key')
      }
    ),
    (error) => error.status === 502 && !error.message.includes('fake-assistant-secret-key')
  );
  await assert.rejects(
    generateAnswer(
      { messages: [messages[0]] },
      {
        fetchImpl: async () => {
          calls++;
        }
      }
    ),
    (error) => error.status === 503
  );
  assert.equal(calls, 0);
});
test('Q&A handles provider errors, refusals and incomplete answers without exposing raw bodies', async () => {
  await assert.rejects(
    generateAnswer(
      { messages: [messages[0]] },
      {
        apiKey: 'fake',
        fetchImpl: async () => new Response('raw secret provider error', { status: 429 })
      }
    ),
    (error) => error.status === 429 && !error.message.includes('raw secret')
  );
  await assert.rejects(
    generateAnswer(
      { provider: 'openai', messages: [messages[0]] },
      {
        apiKey: 'fake',
        fetchImpl: async () => new Response(JSON.stringify({ status: 'incomplete', output: [] }))
      }
    ),
    (error) => error.status === 502
  );
  await assert.rejects(
    generateAnswer(
      { provider: 'openai', messages: [messages[0]] },
      {
        apiKey: 'fake',
        fetchImpl: async () =>
          new Response(
            JSON.stringify({
              status: 'completed',
              output: [{ type: 'message', content: [{ type: 'refusal' }] }]
            })
          )
      }
    ),
    (error) => error.status === 502
  );
});
test('Client history retains whole recent pairs and renders code fences as text data', () => {
  const history = Array.from({ length: 24 }, (_, i) => ({
    role: i % 2 ? 'assistant' : 'user',
    content: 'turn ' + i
  }));
  const recent = buildConversation(history, '다음 질문');
  assert.equal(recent.length, 19);
  assert.equal(recent[0].content, 'turn 6');
  assert.equal(recent.at(-1).role, 'user');
  const large = buildConversation(
    [
      { role: 'user', content: 'a'.repeat(10000) },
      { role: 'assistant', content: 'b'.repeat(10000) }
    ],
    '추가'
  );
  assert.equal(large.length, 1);
  const blocks = answerBlocks('설명\n```html\n<img onerror="evil()">\n```\n끝');
  assert.equal(blocks[1].type, 'code');
  assert.ok(blocks[1].text.includes('onerror'));
  assert.equal(blocks.at(-1).text, '\n끝');
});
