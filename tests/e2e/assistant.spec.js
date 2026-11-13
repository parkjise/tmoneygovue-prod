import { test, expect } from '@playwright/test';
const csrf = '1'.repeat(64);
async function status(page, configured = true) {
  await page.route('**/api/bem/status', (route) =>
    route.fulfill({
      json: {
        csrfToken: csrf,
        providers: {
          gemini: { configured, model: 'gemini-test' },
          openai: { configured, model: 'openai-test' }
        }
      }
    })
  );
}
test('Q&A answers follow-up questions with history, safely displays code, copies and resets', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await status(page);
  const payloads = [];
  await page.route('**/api/assistant/chat', async (route) => {
    payloads.push(route.request().postDataJSON());
    expect(route.request().headers()['x-bem-token']).toBe(csrf);
    return route.fulfill({
      json: {
        answer:
          payloads.length === 1
            ? 'computed는 계산된 값입니다.\n```html\n<img src=x onerror="window.qaInjected=true">\n```'
            : '방금 답변한 computed의 추가 설명입니다.',
        provider: payloads.length === 1 ? 'gemini' : 'openai',
        model: 'test-model'
      }
    });
  });
  await page.goto('/tools/ai-assistant');
  await page.getByLabel('AI에게 질문').fill('computed가 뭐야?');
  await page.getByRole('button', { name: '질문 전송', exact: true }).click();
  await expect(
    page.locator('.ai-assistant__message').filter({ hasText: 'computed는 계산된 값입니다.' })
  ).toBeVisible();
  expect(await page.evaluate(() => window.qaInjected)).toBeUndefined();
  await expect(page.locator('.ai-assistant__bubble img')).toHaveCount(0);
  await page.getByRole('button', { name: /답변 \d+ 복사/ }).click();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'computed는 계산된 값'
  );
  await page.getByLabel('질문 AI 공급자').selectOption('openai');
  await page.getByLabel('AI에게 질문').fill('좀 더 설명해줘');
  await page.getByRole('button', { name: '질문 전송', exact: true }).click();
  await expect(
    page.getByText('방금 답변한 computed의 추가 설명입니다.', { exact: true })
  ).toBeVisible();
  expect(payloads[1].provider).toBe('openai');
  expect(payloads[1].messages).toHaveLength(3);
  expect(payloads[1].messages[1].role).toBe('assistant');
  await page.getByRole('button', { name: '대화 초기화', exact: true }).click();
  await expect(page.locator('.ai-assistant__message')).toHaveCount(0);
});
test('Q&A sample, errors and cancellation never add incomplete history', async ({ page }) => {
  await status(page, false);
  let calls = 0;
  await page.route('**/api/assistant/chat', (route) => {
    calls++;
    return route.fulfill({ status: 429, json: { error: '테스트: 사용 한도' } });
  });
  await page.goto('/tools/ai-assistant');
  await page.getByRole('button', { name: '샘플 대화 보기 · API 호출 없음', exact: true }).click();
  expect(calls).toBe(0);
  await expect(page.locator('.ai-assistant__message')).toHaveCount(2);
  await status(page, true);
  await page.getByRole('button', { name: '설정 확인', exact: true }).click();
  await page.getByLabel('AI에게 질문').fill('추가 질문');
  await page.getByRole('button', { name: '질문 전송', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveText('테스트: 사용 한도');
  await expect(page.getByLabel('AI에게 질문')).toHaveValue('추가 질문');
  await expect(page.locator('.ai-assistant__message')).toHaveCount(2);
  await page.route('**/api/assistant/chat', async (route) => {
    await new Promise((done) => setTimeout(done, 1000));
    await route
      .fulfill({ json: { answer: '늦은 답변', provider: 'gemini', model: 'test' } })
      .catch(() => {});
  });
  await page.getByRole('button', { name: '질문 전송', exact: true }).click();
  await page.getByRole('button', { name: '취소', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('취소했습니다');
  await expect(page.locator('.ai-assistant__message')).toHaveCount(2);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBeTruthy();
  await page.screenshot({ path: 'test-results/ai-qa-mobile.png', fullPage: true });
});
test('Q&A requires a valid local security token before any live API call', async ({ request }) => {
  const response = await request.post('/api/assistant/chat', {
    data: { provider: 'gemini', messages: [{ role: 'user', content: '질문' }] }
  });
  expect(response.status()).toBe(403);
  expect((await response.json()).code).toBe('BEM_TOKEN_INVALID');
});
