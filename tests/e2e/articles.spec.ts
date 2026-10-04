import { test, expect } from '@playwright/test';

test('structure diagrams and tables render and guide code switches languages', async ({ page }) => {
  await page.goto('/data-structures/array');
  await expect(page.getByRole('table')).toBeVisible();
  const diagram = page.locator('article img');
  await expect(diagram).toBeVisible();
  expect(await diagram.evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.goto('/guided-learning/bfs-dfs');
  await expect(page.locator('article h2')).toHaveCount(5);
  await expect(page.getByRole('tab', { name: 'C++', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.getByRole('tabpanel')).toContainText('std::vector');
  await page.getByRole('tab', { name: 'Python', exact: true }).focus();
  await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tabpanel')).toContainText('public int numIslands');
  await page.getByRole('tab', { name: 'C++', exact: true }).click();
  await expect(page.getByRole('tabpanel')).toContainText('std::vector');
  await expect(page.getByRole('link', { name: '前往 LeetCode 練這題' })).toHaveAttribute('href', 'https://leetcode.com/problems/number-of-islands/');
});
test('twenty language comparisons stack on mobile; roadmap reaches guide and template', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/languages');
  await expect(page.locator('.language-comparison')).toHaveCount(20);
  await expect(page.locator('.language-comparison').first().locator('h3').first()).toHaveText('C++');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.goto('/roadmap');
  await expect(page.getByRole('table')).toHaveCount(6);
  await page.getByRole('link', { name: '代表題教學', exact: true }).first().click();
  await expect(page).toHaveURL('/guided-learning/two-pointers');
  await page.getByRole('link', { name: '對應模板', exact: true }).click();
  await expect(page).toHaveURL('/templates/two-pointers');
});
