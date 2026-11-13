import { test, expect } from '@playwright/test';
import { sampleMarkup, sampleResult } from '../../src/composables/bemOutput.js';
import { readFile } from 'node:fs/promises';
import { parse } from '@vue/compiler-sfc';
const TEST_CSRF_TOKEN = '1'.repeat(64);
const status = async (page, configured) =>
  page.route('**/api/bem/status', (route) =>
    route.fulfill({
      json: {
        csrfToken: TEST_CSRF_TOKEN,
        configured,
        model: 'test-gemini-model',
        providers: {
          gemini: { configured, model: 'test-gemini-model' },
          openai: { configured: false, model: 'test-openai-model' }
        }
      }
    })
  );
test('BEM tool without a key offers sample, copy, valid draft download and mobile layout', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await status(page, false);
  let apiCalls = 0;
  await page.route('**/api/bem/generate', (route) => {
    apiCalls++;
    return route.fulfill({ status: 500, json: { error: 'Unexpected call' } });
  });
  await page.goto('/tools/bem-generator');
  await expect(page.getByText('Gemini API 키 미설정', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '예시 마크업 넣기', exact: true }).click();
  await expect(page.getByLabel('원본 HTML 마크업')).toHaveValue(sampleMarkup);
  await expect(page.getByRole('button', { name: 'Gemini로 생성', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: '샘플 결과 보기 · API 호출 없음', exact: true }).click();
  await expect(page.locator('.bem-generator__result-label')).toContainText('LOCAL SAMPLE');
  await expect(page.getByLabel('생성된 코드', { exact: true })).toContainText(
    'product-card__title'
  );
  await page.getByRole('button', { name: 'SCSS 뼈대', exact: true }).click();
  await expect(page.getByLabel('생성된 코드', { exact: true })).toContainText('&__title');
  await page.getByRole('button', { name: 'BEM 결과 복사', exact: true }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('&--featured');
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: '.vue 초안 다운로드', exact: true }).click();
  const download = await downloadEvent;
  const text = await readFile(await download.path(), 'utf8');
  const { descriptor, errors } = parse(text);
  expect(errors).toEqual([]);
  expect(descriptor.template.content).toContain('product-card__title');
  expect(descriptor.styles[0].lang).toBe('scss');
  await page.getByLabel('원본 HTML 마크업').fill('<p>새 마크업</p>');
  await expect(
    page.getByText('입력이 변경되었습니다. 아래 결과는 이전 입력 기준입니다.', { exact: true })
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBeTruthy();
  await page.screenshot({ path: 'test-results/bem-mobile.png', fullPage: true });
  expect(apiCalls).toBe(0);
});
test('BEM generation submits markup without credentials, displays result safely and handles errors', async ({
  page
}) => {
  await status(page, true);
  let payload;
  await page.route('**/api/bem/generate', async (route) => {
    payload = route.request().postDataJSON();
    await route.fulfill({
      json: {
        model: 'test-gemini-model',
        result: {
          ...sampleResult,
          markup: sampleResult.markup + '\n<img src="x" onerror="window.bemInjected=true">',
          notes: ['기존 CSS 선택자를 검토하세요.']
        }
      }
    });
  });
  await page.goto('/tools/bem-generator');
  await page.getByLabel('원본 HTML 마크업').fill(sampleMarkup);
  await page.getByLabel('블록 이름 (선택)', { exact: true }).fill('product-card');
  await page.getByRole('button', { name: 'Gemini로 생성', exact: true }).click();
  await expect(page.locator('.bem-generator__result-label')).toContainText('GEMINI RESULT');
  expect(payload).toEqual({
    input: sampleMarkup,
    blockName: 'product-card',
    context: '',
    provider: 'gemini'
  });
  await expect(page.getByLabel('생성된 코드', { exact: true })).toContainText('onerror');
  expect(await page.evaluate(() => window.bemInjected)).toBeUndefined();
  await expect(page.locator('.bem-generator__result img')).toHaveCount(0);
  await page.route('**/api/bem/generate', (route) =>
    route.fulfill({ status: 429, json: { error: '테스트: 사용 한도를 초과했습니다.' } })
  );
  await page.getByRole('button', { name: 'Gemini로 생성', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('테스트: 사용 한도를 초과했습니다.');
  await expect(page.getByRole('button', { name: 'Gemini로 생성', exact: true })).toBeEnabled();
});
test('BEM cancellation restores the form', async ({ page }) => {
  await status(page, true);
  await page.route('**/api/bem/generate', async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 1200));
    await route.fulfill({ json: { model: 'test', result: sampleResult } }).catch(() => {});
  });
  await page.goto('/tools/bem-generator');
  await page.getByRole('button', { name: '예시 마크업 넣기', exact: true }).click();
  await page.getByRole('button', { name: 'Gemini로 생성', exact: true }).click();
  await expect(page.getByLabel('원본 HTML 마크업')).toBeDisabled();
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('요청을 취소했습니다.');
  await expect(page.getByLabel('원본 HTML 마크업')).toBeEnabled();
});
test('Personal Vite API exposes only configuration to the local UI', async ({ request }) => {
  const response = await request.get('/api/bem/status');
  expect(response.status()).toBe(200);
  const data = await response.json();
  expect(Object.keys(data).sort()).toEqual(['configured', 'csrfToken', 'model', 'providers']);
  expect(typeof data.configured).toBe('boolean');
  const foreign = await request.post('/api/bem/generate', {
    headers: { origin: 'https://example.com' },
    data: { input: sampleMarkup }
  });
  expect(foreign.status()).toBe(403);
});

test('OpenAI can generate independently, stays labeled after switching and disables only the missing key', async ({
  page
}) => {
  await page.route('**/api/bem/status', (route) =>
    route.fulfill({
      json: {
        csrfToken: TEST_CSRF_TOKEN,
        configured: false,
        model: 'unused',
        providers: {
          gemini: { configured: false, model: 'gemini-test' },
          openai: { configured: true, model: 'openai-test' }
        }
      }
    })
  );
  let sent;
  await page.route('**/api/bem/generate', (route) => {
    sent = route.request().postDataJSON();
    return route.fulfill({
      json: {
        provider: 'openai',
        model: 'openai-test',
        result: { ...sampleResult, notes: ['검토하세요.'] }
      }
    });
  });
  await page.goto('/tools/bem-generator');
  await page.getByRole('button', { name: '예시 마크업 넣기', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Gemini로 생성', exact: true })).toBeDisabled();
  await page.getByLabel('AI 공급자', { exact: true }).selectOption('openai');
  await expect(page.getByText('OpenAI API 키 설정됨', { exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'OpenAI로 생성', exact: true })).toBeEnabled();
  await page.getByRole('button', { name: 'OpenAI로 생성', exact: true }).click();
  await expect(page.locator('.bem-generator__result-label')).toHaveText(
    'OPENAI RESULT · openai-test'
  );
  expect(sent.provider).toBe('openai');
  expect(sent.input).toBe(sampleMarkup);
  expect(Object.keys(sent)).not.toContain('apiKey');
  await page.getByLabel('AI 공급자', { exact: true }).selectOption('gemini');
  await expect(page.getByRole('button', { name: 'Gemini로 생성', exact: true })).toBeDisabled();
  await expect(page.locator('.bem-generator__result-label')).toHaveText(
    'OPENAI RESULT · openai-test'
  );
  await expect(
    page.getByText('입력이 변경되었습니다. 아래 결과는 이전 입력 기준입니다.', { exact: true })
  ).toBeVisible();
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBeTruthy();
});

test('Private files cannot be downloaded and missing CSRF prevents generation', async ({
  request
}) => {
  for (const path of [
    '/.env.local',
    '/.env.local?raw',
    '/%2eenv%2elocal?import',
    '/%252eenv%252elocal?raw',
    '/server/bem.js?raw',
    '/@fs/Users/Js/Work/Vue/.env.local?raw',
    '/.git/config'
  ]) {
    const response = await request.get(path);
    expect(response.status(), path).toBe(403);
    expect(response.headers()['cache-control']).toBe('no-store');
  }
  const response = await request.post('/api/bem/generate', { data: { input: sampleMarkup } });
  expect(response.status()).toBe(403);
  expect((await response.json()).code).toBe('BEM_TOKEN_INVALID');
});
