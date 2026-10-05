import { test, expect } from '@playwright/test';

test('categories contain merged templates and notes contain only the summary', async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto('/templates');
  const links = page.locator('.pattern-categories a');
  await expect(links).toHaveCount(19);
  const routes = await links.evaluateAll(nodes => nodes.map(node => node.getAttribute('href')!));
  await expect(page.locator('article a')).toHaveCount(1);
  await page.locator('article').getByRole('link', { name: 'LeetCode 150 Pattern 重點與模板' }).click();
  await expect(page).toHaveURL(/templates\/pattern-notes$/);
  await expect(page.locator('.article-examples')).toHaveCount(0);
  await expect(page.getByRole('heading', { name: '常用 Pattern 組合' })).toBeVisible();
  for (const route of routes) {
    await page.goto(route);
    const groups = page.locator('.article-examples');
    for (let i = 0; i < await groups.count(); i++) {
      const group = groups.nth(i);
      await expect(group.getByRole('tab', { name: 'C++', exact: true })).toHaveAttribute('aria-selected', 'true');
      for (const language of ['Python', 'Java']) {
        await group.getByRole('tab', { name: language, exact: true }).click();
        await expect(group.locator('pre')).toHaveAttribute('aria-label', `${language} 參考實作`);
      }
    }
  }
  await page.goto('/templates?q=trie');
  await expect(page.locator('.search-results')).toContainText('Trie');
  await page.locator('.result-title').click();
  await expect(page).toHaveURL(/templates\/trie\?q=trie$/);
});
