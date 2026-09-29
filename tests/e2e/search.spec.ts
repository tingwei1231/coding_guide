import { test, expect } from '@playwright/test';

test('search opens a specific variation with reasons, preserves query on reload, and handles no results', async ({ page }) => {
  await page.goto('/templates');
  await expect(page.locator('.pattern-categories a')).toHaveCount(6);
  const input = page.getByRole('searchbox', { name: '題目關鍵字' });
  await input.fill('二分答案');
  const result = page.locator('.search-results > li').filter({ hasText: '最小可行速度' });
  await expect(result).toHaveCount(1);
  await result.locator('summary').click();
  await expect(result).toContainText('速度 k 增加時所需時間不會增加');
  await result.getByRole('link').click();
  await expect(page).toHaveURL(/binary-search\?q=.*#variation-answer-space$/);
  await expect(page.locator('#variation-answer-space h3 button')).toHaveAttribute('aria-expanded', 'true');
  await page.reload();
  await expect(input).toHaveValue('二分答案');
  await input.fill('找環 旋轉');
  await expect(page.locator('.search-results')).toContainText('旋轉排序陣列');
  await expect(page.locator('.search-results')).toContainText('鏈結串列找環');
  await input.fill('xyz-unmatched-928');
  await expect(page.getByRole('status')).toHaveText('找到 0 個可能對應');
  await page.getByRole('button', { name: 'dp', exact: true }).click();
  await expect(page.locator('.search-results')).toContainText('Dynamic Programming');
  await page.getByRole('button', { name: '清除' }).click();
  await expect(page.locator('.pattern-categories a')).toHaveCount(6);
});

test('all added templates have three languages and only planned variations are visible', async ({ page }) => {
  for (const [id, standards, variations] of [['binary-search', 1, 4], ['two-pointers', 1, 4], ['bfs-dfs', 2, 0], ['backtracking', 1, 0], ['dp', 2, 0]] as const) {
    await page.goto(`/templates/${id}`);
    await expect(page.locator('.sample')).toHaveCount(standards);
    await expect(page.locator('.variation-card')).toHaveCount(variations);
    for (const language of ['Python', 'Java', 'C++']) {
      await page.getByRole('tab', { name: language, exact: true }).click();
      expect((await page.locator('.sample pre').first().getAttribute('aria-label'))?.startsWith(`${language} `)).toBe(true);
      await expect(page.locator('.sample .counterexamples')).toHaveCount(standards);
    }
  }
});

test('mobile keyboard search selects a variation without horizontal overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/templates');
  await page.getByRole('searchbox').fill('找環');
  const result = page.locator('.result-title').first();
  await result.focus(); await page.keyboard.press('Enter');
  await expect(page.locator('#variation-fast-slow').getByRole('region')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/search-mobile.png', fullPage: true });
});
