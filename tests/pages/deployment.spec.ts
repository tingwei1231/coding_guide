import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const catalog = JSON.parse(readFileSync('content/catalog.json', 'utf8'));

test('static subdirectory hosting supports every direct route and diagram', async ({ page }) => {
  test.setTimeout(90_000);
  for (const entry of catalog) {
    const response = await page.goto(`/coding_guide${entry.route === '/' ? '/' : entry.route + '/'}`);
    expect(response?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).not.toHaveTitle(/找不到頁面/);
  }
  await page.goto('/coding_guide/data-structures/array/');
  expect(await page.locator('article img').evaluate((img: HTMLImageElement) => img.complete && img.naturalWidth > 0)).toBe(true);
  await page.goto('/coding_guide/templates/sliding-window/#variation-shrink-to-min');
  await page.reload();
  await expect(page.locator('h1')).toHaveText('Sliding Window');
  await page.getByRole('tab', { name: 'Java', exact: true }).click();
  await expect(page.locator('pre').first()).toContainText('class Solution');
  await page.getByRole('navigation', { name: '主要導覽' }).getByRole('link', { name: '概念測驗', exact: true }).click();
  await expect(page).toHaveURL(/\/coding_guide\/quiz$/);
  await page.getByRole('button', { name: '開始測驗' }).click();
  await expect(page.locator('.quiz-question')).toHaveCount(6);
});
