import { readFileSync } from 'node:fs';
import { test, expect } from '@playwright/test';
import { menuItems } from '../../src/data/menuData.js';
test('All 79 menu routes render a preview and their actual full source', async ({ page }) => {
  test.setTimeout(120000);
  const errors = [];
  page.on('pageerror', (error) => errors.push(error.message));
  for (const item of menuItems) {
    await page.goto(item.path);
    await expect(page.locator('h1').first()).toBeVisible();
    await expect(
      page.locator(
        item.path === '/dashboard/default' ? '.dashboard' : '.code-card__preview > .demo'
      )
    ).toBeVisible();
    if (item.slug === 'default' && item.folder === 'dashboard')
      await page.getByText('대시보드 구현 코드 보기', { exact: true }).click();
    const card = page.locator('.code-card');
    await expect(card).toBeVisible();
    const source = card.locator('pre[aria-label="소스 코드"]');
    if (item.sourceFile) {
      await expect(source).toBeVisible();
      await expect(source).toHaveText(readFileSync('.' + item.sourceFile, 'utf8'));
    } else {
      await page.getByRole('button', { name: 'Vue 코드 보기' }).click();
      await expect(source).toContainText('<script setup>');
      await expect(source).toContainText('<template>');
      await expect(source).toContainText('<style lang="scss" scoped>');
    }
  }
  expect(errors).toEqual([]);
});
test('Conditional DOM, complete source tabs, clipboard and toast', async ({ page, context }) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/vue-syntax/conditional');
  await page.getByRole('button', { name: '표시 전환', exact: true }).click();
  await expect(page.getByTestId('if-content')).toHaveCount(0);
  await expect(page.getByTestId('show-content')).toBeHidden();
  await page.getByRole('button', { name: 'Vue 코드 보기' }).click();
  await page.getByRole('button', { name: '<script setup>', exact: true }).click();
  await expect(page.locator('.code-card pre')).toContainText("const status = ref('active')");
  await page.getByRole('button', { name: '현재 코드 복사', exact: true }).click();
  await expect(page.getByText('클립보드에 Vue 코드가 복사되었습니다.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    'const visible = ref(true)'
  );
  await page.goto('/vue-syntax/communication');
  await page.getByRole('button', { name: 'Vue 코드 보기' }).click();
  await page.getByRole('button', { name: '<template>', exact: true }).click();
  await expect(page.locator('.code-card pre')).toContainText('#default');
  await page.getByLabel('소스 파일').selectOption('src/components/examples/ProfileEditor.vue');
  await page.getByRole('button', { name: '전체 코드 (.vue)', exact: true }).click();
  await expect(page.locator('.code-card pre')).toContainText('defineModel');
});
test('API loading, error, retry and debounce filtering', async ({ page }) => {
  await page.goto('/vue-patterns/async');
  await expect(page.getByText('Jise Park', { exact: true }).last()).toBeVisible();
  await page.getByLabel('실패 응답 테스트').check();
  await page.getByRole('button', { name: '새로고침 / 재시도', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('불러오지 못했습니다');
  await page.getByLabel('실패 응답 테스트').uncheck();
  await page.getByRole('button', { name: '새로고침 / 재시도', exact: true }).click();
  await expect(page.getByRole('alert')).toHaveCount(0);
  await expect(page.getByText('Emma Wilson', { exact: true })).toBeVisible();
  await page.goto('/vue-patterns/debounce');
  await page.getByLabel('검색', { exact: true }).fill('Vue');
  await expect(page.getByRole('status')).toHaveText('2개 결과');
  await page.getByRole('combobox', { name: '분류', exact: true }).selectOption('문서');
  await expect(page.getByRole('status')).toHaveText('1개 결과');
});
test('Bookmark creation, favorites and Kanban drag & drop', async ({ page }) => {
  await page.goto('/apps/bookmark');
  await page.getByRole('button', { name: 'Add bookmark', exact: true }).click();
  await page.getByRole('dialog').getByLabel('이름', { exact: true }).fill('Test Bookmark');
  await page.getByRole('dialog').getByLabel('URL', { exact: true }).fill('https://example.com');
  await page.getByRole('button', { name: '북마크 추가', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Test Bookmark', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Test Bookmark 즐겨찾기', exact: true }).click();
  await page.getByRole('button', { name: 'Favorites', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Test Bookmark', exact: true })).toBeVisible();
  await page.goto('/apps/kanban');
  const task = page.locator('.kanban__task').filter({ hasText: '디자인 시스템 토큰 설계' });
  await task.dragTo(page.locator('.kanban__column').nth(2));
  await expect(page.locator('.kanban__column').nth(2)).toContainText('디자인 시스템 토큰 설계');
});
test('Modal confirm, dynamic rows and infinite scroll', async ({ page }) => {
  await page.goto('/vue-patterns/composables');
  await page.getByRole('button', { name: 'useConfirm 실행', exact: true }).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await page.getByRole('dialog').getByRole('button', { name: '확인', exact: true }).click();
  await expect(page.getByText('삭제를 승인했습니다.', { exact: true })).toBeVisible();
  await page.goto('/vue-patterns/dynamic-form');
  await page.getByRole('button', { name: '+ 팀원 추가', exact: true }).click();
  await expect(page.locator('.code-card fieldset')).toHaveCount(2);
  await page.locator('.code-card fieldset').nth(1).getByRole('button', { name: '행 삭제' }).click();
  await expect(page.locator('.code-card fieldset')).toHaveCount(1);
  await page.goto('/vue-patterns/infinite');
  await expect(page.locator('.infinite-feed article')).toHaveCount(8);
  await page.getByRole('button', { name: '더 보기 (키보드 지원)' }).click();
  await expect(page.locator('.infinite-feed article')).toHaveCount(16);
});
test('Cart totals, chat replies and wizard validation', async ({ page }) => {
  await page.goto('/apps/cart');
  const input = page.getByRole('spinbutton').first();
  await input.fill('2');
  await expect(page.locator('.cart__total')).toContainText('307,000');
  await page.goto('/apps/chat');
  await page.getByRole('textbox', { name: '메시지', exact: true }).fill('computed');
  await page.getByRole('button', { name: '전송 ↗', exact: true }).click();
  await expect(page.locator('.chat__message').last()).toContainText('캐싱합니다');
  await page.goto('/forms-tables/wizard');
  await expect(page.getByRole('button', { name: '다음', exact: true })).toBeDisabled();
  await page.getByLabel('이름 (2자 이상)', { exact: true }).fill('Jise');
  await page.getByLabel('이메일', { exact: true }).fill('jise@example.com');
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await page.getByLabel('팀 이름 (2자 이상)', { exact: true }).fill('Atelier');
  await page.getByRole('button', { name: '다음', exact: true }).click();
  await expect(page.getByText('Jise / jise@example.com', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: '완료', exact: true }).click();
  await expect(
    page.getByRole('heading', { name: '✓ 워크스페이스 설정이 완료되었습니다.' })
  ).toBeVisible();
});
test('Table search, sort, pagination, scoped selection, delete and CSV', async ({ page }) => {
  await page.goto('/forms-tables/data');
  await page.locator('.data-table').getByLabel('검색', { exact: true }).fill('Emma');
  await expect(page.locator('.data-table tbody tr')).toHaveCount(1);
  const downloadEvent = page.waitForEvent('download');
  await page.getByRole('button', { name: '↓ CSV 다운로드' }).click();
  expect((await downloadEvent).suggestedFilename()).toBe('vue-atelier-users.csv');
  await page.locator('.data-table').getByLabel('검색', { exact: true }).fill('');
  await page.getByRole('button', { name: '이름 ↑', exact: true }).click();
  await expect(page.locator('th[aria-sort="descending"]')).toContainText('이름');
  await page.getByLabel('현재 페이지 전체 선택').check();
  await expect(page.getByRole('button', { name: '선택 5개 삭제' })).toBeEnabled();
  await page.getByRole('button', { name: '다음 페이지', exact: true }).click();
  await expect(page.getByLabel('현재 페이지 전체 선택')).not.toBeChecked();
  await page.getByRole('button', { name: '선택 5개 삭제' }).click();
  await expect(page.locator('.data-table footer')).toContainText('총 8개');
});
test('Mobile navigation, menu search, dark theme and screenshot', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: '전체 메뉴 열기' }).click();
  await page.getByLabel('메뉴 검색', { exact: true }).fill('Bookmark');
  await page.locator('.app-sidebar').getByRole('link', { name: 'Bookmark', exact: true }).click();
  await expect(page).toHaveURL(/apps\/bookmark/);
  await page.getByRole('button', { name: '다크 모드로 전환' }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)
  ).toBeTruthy();
  await page.screenshot({ path: 'test-results/mobile-dark.png', fullPage: true });
});
test('Dashboard desktop screenshot', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.dashboard__welcome')).toBeVisible();
  await page.screenshot({ path: 'test-results/dashboard.png', fullPage: true });
});

test('Every route fits a mobile viewport and unknown routes recover', async ({ page }) => {
  test.setTimeout(120000);
  await page.setViewportSize({ width: 390, height: 844 });
  for (const item of menuItems) {
    await page.goto(item.path);
    await expect(page.locator('.code-card')).toHaveCount(1);
    await expect(
      page.locator(
        item.path === '/dashboard/default' ? '.dashboard' : '.code-card__preview > .demo'
      )
    ).toBeVisible();
    const overflow = await page.evaluate(() => ({
      width: document.documentElement.scrollWidth,
      elements: [...document.querySelectorAll('main *')]
        .map((el) => ({
          tag: el.tagName,
          class: el.className,
          width: el.getBoundingClientRect().width,
          right: el.getBoundingClientRect().right
        }))
        .filter((el) => el.right > 391)
    }));
    if (overflow.width > 390) console.log(item.path, JSON.stringify(overflow));
    expect(overflow.width <= 390, item.path).toBeTruthy();
  }
  await page.goto('/unknown-route');
  await expect(page).toHaveURL(/dashboard\/default/);
});

test('SCSS menu, compiled mixins, transitive source files and SCSS clipboard', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/scss/mixins');
  await page.getByLabel('메뉴 검색', { exact: true }).fill('SCSS');
  await expect(page.locator('.app-sidebar__link')).toHaveCount(14);
  await page.getByLabel('메뉴 검색', { exact: true }).fill('');
  await expect(
    page.getByRole('heading', { name: 'Mixin 실무 패턴 SCSS', exact: true })
  ).toBeVisible();
  const card = page.getByTestId('mixin-card');
  await expect(card).toHaveCSS('padding', '24px');
  await page.getByLabel('믹스인 간격').selectOption('compact');
  await expect(card).toHaveCSS('padding', '12px');
  await page.getByRole('button', { name: 'Vue 코드 보기' }).click();
  await page.getByRole('button', { name: '<style scss>', exact: true }).click();
  await expect(page.locator('pre[aria-label="소스 코드"]')).toContainText('@include ui.surface');
  for (const filename of ['_index.scss', '_tokens.scss', '_functions.scss', '_mixins.scss']) {
    await expect(
      page.getByLabel('소스 파일').locator(`option[value="src/assets/styles/practice/${filename}"]`)
    ).toHaveCount(1);
  }
  await page.getByLabel('소스 파일').selectOption('src/assets/styles/practice/_mixins.scss');
  await expect(page.locator('pre[aria-label="소스 코드"]')).toContainText('@mixin surface');
  await page.getByRole('button', { name: '현재 코드 복사', exact: true }).click();
  await expect(page.getByText('클립보드에 SCSS 코드가 복사되었습니다.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain('@content');
});

test('SCSS container queries, generated classes and state styles actually change', async ({
  page
}) => {
  await page.goto('/scss/responsive');
  const grid = page.getByTestId('responsive-grid');
  await expect(grid).toBeVisible();
  await expect
    .poll(() => grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length))
    .toBe(3);
  await page.getByLabel('반응형 미리보기 너비').fill('300');
  await expect
    .poll(() => grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length))
    .toBe(1);
  await page.goto('/scss/loops');
  await page.getByLabel('뱃지 크기').selectOption('lg');
  await page.getByLabel('상태 색상').selectOption('danger');
  await expect(page.getByTestId('generated-badge')).toHaveCSS('font-size', '15px');
  await expect(page.getByTestId('generated-badge')).toHaveClass(/loop-badge--danger/);
  await page.goto('/scss/states');
  await page.getByLabel('로딩 상태', { exact: true }).check();
  await expect(page.locator('.state-button').first()).toBeDisabled();
  await expect(page.locator('.state-button').first()).toHaveAttribute('aria-busy', 'true');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.state-button__spinner').first()).toHaveCSS('animation-name', 'none');
});

test('Dedicated Sass source menus open actual originals and copy complete modules', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  await page.goto('/scss/mixins');
  await page.getByLabel('메뉴 검색', { exact: true }).fill('@/assets/styles/mixins');
  await page
    .locator('.app-sidebar')
    .getByRole('link', { name: '공통 Mixin 소스', exact: true })
    .click();
  await expect(page).toHaveURL(/scss\/mixins-source/);
  const source = page.locator('pre[aria-label="소스 코드"]');
  await expect(source).toBeVisible();
  await expect(source).toHaveText(readFileSync('src/assets/styles/_mixins.scss', 'utf8'));
  await expect(page.getByRole('button', { name: 'SCSS 코드 닫기' })).toHaveAttribute(
    'aria-expanded',
    'true'
  );
  await page.getByRole('button', { name: '현재 코드 복사', exact: true }).click();
  await expect(page.getByText('클립보드에 SCSS 코드가 복사되었습니다.')).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(
    readFileSync('src/assets/styles/_mixins.scss', 'utf8')
  );
  await page.goto('/scss/practice-source');
  await expect(source).toHaveText(readFileSync('src/assets/styles/practice/_index.scss', 'utf8'));
  await expect(page.getByLabel('소스 파일').locator('option')).toHaveCount(4);
  for (const name of ['_tokens.scss', '_functions.scss', '_mixins.scss', '_index.scss']) {
    const file = 'src/assets/styles/practice/' + name;
    await page.getByLabel('소스 파일').selectOption(file);
    await expect(source).toHaveText(readFileSync(file, 'utf8'));
  }
});

test('Forwarded modules each have a direct menu, original source and complete copy', async ({
  page,
  context
}) => {
  await context.grantPermissions(['clipboard-read', 'clipboard-write']);
  for (const name of ['tokens', 'functions', 'mixins']) {
    await page.goto('/scss/practice-source');
    await page
      .locator('.practice-source__files')
      .getByRole('link', { name: `_${name}.scss ↗`, exact: true })
      .click();
    await expect(page).toHaveURL(new RegExp('/scss/practice-' + name + '$'));
    const expected = readFileSync('src/assets/styles/practice/_' + name + '.scss', 'utf8');
    await expect(page.locator('pre[aria-label="소스 코드"]')).toHaveText(expected);
    await expect(page.locator('.app-sidebar__link.router-link-exact-active')).toHaveCount(1);
    await page.getByRole('button', { name: '현재 코드 복사', exact: true }).click();
    await expect(page.getByText('클립보드에 SCSS 코드가 복사되었습니다.')).toBeVisible();
    expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(expected);
  }
});
