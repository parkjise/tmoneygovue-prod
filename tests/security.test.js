import test from 'node:test';
import assert from 'node:assert/strict';
import {
  mkdtempSync,
  mkdirSync,
  writeFileSync,
  readFileSync,
  statSync,
  symlinkSync,
  rmSync
} from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import {
  hasSecret,
  selectPrivateConfig,
  protectLocalEnvFiles,
  sensitivePath,
  sensitiveFile,
  assertSafePublicFiles,
  assertSafeBundle,
  isLocalRequest,
  createCsrfToken,
  validCsrfToken
} from '../server/security.js';
import { generateBem } from '../server/bem.js';
import { sampleMarkup, sampleResult } from '../src/composables/bemOutput.js';
const fakeKey = 'test-only-private-credential-12345';
test('Private config is allowlisted and rejects client-exposed keys and secret model IDs', () => {
  const config = selectPrivateConfig({
    GEMINI_API_KEY: fakeKey,
    OPENAI_MODEL: 'test-model',
    UNRELATED: 'do-not-retain'
  });
  assert.equal(config.GEMINI_API_KEY, fakeKey);
  assert.ok(Object.isFrozen(config));
  assert.ok(!('UNRELATED' in config));
  for (const env of [
    { GEMINI_API_KEY: fakeKey, VITE_OTHER: fakeKey },
    { VITE_OPENAI_API_KEY: fakeKey },
    { GEMINI_API_KEY: fakeKey, OPENAI_MODEL: fakeKey }
  ])
    assert.throws(
      () => selectPrivateConfig(env),
      (error) => !error.message.includes(fakeKey)
    );
});
test('Known secrets and provider-shaped keys stop public assets and bundle generation', () => {
  assert.equal(hasSecret('markup ' + fakeKey, { OPENAI_API_KEY: fakeKey }), true);
  assert.equal(hasSecret('sk-proj-' + 'x'.repeat(30)), true);
  assert.equal(hasSecret('AIza' + 'x'.repeat(35)), true);
  assert.equal(hasSecret('GEMINI_API_KEY=설정 예시'), false);
  assert.throws(
    () =>
      assertSafeBundle(
        { app: { type: 'chunk', code: 'const value="' + fakeKey + '"' } },
        { OPENAI_API_KEY: fakeKey }
      ),
    (error) => !error.message.includes(fakeKey)
  );
  const temp = mkdtempSync(join(tmpdir(), 'bem-security-'));
  try {
    const pub = join(temp, 'public');
    mkdirSync(pub);
    writeFileSync(join(pub, 'asset.txt'), fakeKey);
    assert.throws(() => assertSafePublicFiles(pub, { OPENAI_API_KEY: fakeKey }));
    writeFileSync(join(pub, 'asset.txt'), 'normal asset');
    assert.doesNotThrow(() => assertSafePublicFiles(pub, {}));
    writeFileSync(join(pub, '.env.local'), 'not-served');
    assert.throws(() => assertSafePublicFiles(pub, {}));
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
test('Environment permissions are private and symlink aliases cannot bypass file restrictions', () => {
  const temp = mkdtempSync(join(tmpdir(), 'bem-security-'));
  try {
    const env = join(temp, '.env.local');
    writeFileSync(env, 'OPENAI_API_KEY=' + fakeKey, { mode: 0o644 });
    protectLocalEnvFiles(temp);
    if (process.platform !== 'win32') assert.equal(statSync(env).mode & 0o777, 0o600);
    assert.equal(readFileSync(env, 'utf8'), 'OPENAI_API_KEY=' + fakeKey);
    symlinkSync(env, join(temp, 'innocent.txt'));
    assert.equal(sensitiveFile(join(temp, 'innocent.txt')), true);
  } finally {
    rmSync(temp, { recursive: true, force: true });
  }
});
test('Encoded URLs, raw imports and private directories are blocked without exposing contents', () => {
  for (const path of [
    '/.env.local?raw',
    '/%2eenv%2elocal?import',
    '/%252eenv%252elocal',
    '/server/bem.js?raw',
    '/@fs/Users/me/.env.local?raw',
    '/.git/config',
    '/credentials.pem',
    '/server%2fbem.js',
    '/%00bad',
    '/%ZZ'
  ])
    assert.equal(sensitivePath(path), true, path);
  assert.equal(sensitivePath('/src/views/scss/tokens.vue?raw'), false);
});
test('Origin, browser metadata and CSRF checks reject forged requests, including Unicode headers', () => {
  const req = {
    socket: { remoteAddress: '127.0.0.1' },
    headers: { host: 'localhost:4000', origin: 'http://localhost:4000' }
  };
  assert.equal(isLocalRequest(req), true);
  for (const headers of [
    { origin: 'https://localhost:4000' },
    { origin: 'http://localhost:5000' },
    { host: 'attacker.example' },
    { 'sec-fetch-site': 'cross-site' }
  ])
    assert.equal(isLocalRequest({ ...req, headers: { ...req.headers, ...headers } }), false);
  const token = createCsrfToken();
  assert.equal(token.length, 64);
  assert.notEqual(token, createCsrfToken());
  assert.equal(validCsrfToken(token, token), true);
  assert.equal(validCsrfToken(undefined, token), false);
  assert.equal(validCsrfToken('☃'.repeat(64), token), false);
});
test('Credentials in input or successful AI output cannot reach the provider or browser', async () => {
  let calls = 0;
  await assert.rejects(
    generateBem(
      { input: '<p>' + fakeKey + '</p>' },
      {
        apiKey: fakeKey,
        fetchImpl: async () => {
          calls++;
        }
      }
    ),
    (error) => error.status === 400 && !error.message.includes(fakeKey)
  );
  assert.equal(calls, 0);
  const leaked = { ...sampleResult, summary: fakeKey };
  await assert.rejects(
    generateBem(
      { input: sampleMarkup },
      {
        apiKey: fakeKey,
        fetchImpl: async (_url, options) => {
          assert.equal(options.redirect, 'error');
          return new Response(
            JSON.stringify({
              candidates: [
                { finishReason: 'STOP', content: { parts: [{ text: JSON.stringify(leaked) }] } }
              ]
            })
          );
        }
      }
    ),
    (error) => error.status === 502 && !error.message.includes(fakeKey)
  );
});

test('Same-origin stylesheet and image resource modes stay usable, API no-cors remains blocked', () => {
  const request = {
    socket: { remoteAddress: '127.0.0.1' },
    headers: {
      host: 'localhost:5173',
      'sec-fetch-mode': 'no-cors',
      'sec-fetch-site': 'same-origin'
    }
  };
  assert.equal(isLocalRequest(request), false);
  assert.equal(isLocalRequest(request, { allowNoCors: true }), true);
  assert.equal(
    isLocalRequest(
      { ...request, headers: { ...request.headers, 'sec-fetch-site': 'cross-site' } },
      { allowNoCors: true }
    ),
    false
  );
});
