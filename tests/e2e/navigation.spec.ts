import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const catalog: { route: string }[] = JSON.parse(readFileSync(new URL('../../content/catalog.json', import.meta.url), 'utf8').replace(/^\uFEFF/, ''));

test('all catalog routes load directly with a title and no runtime errors', async ({ page }) => {
  test.setTimeout(60_000);
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  for (const entry of catalog) {
    await page.goto(entry.route);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page).toHaveTitle(/Coding Guide/);
    await expect(page.getByText('這一頁還不在手冊裡。')).toHaveCount(0);
  }
  expect(errors).toEqual([]);
});

test('Markdown links navigate, deep routes survive reload, and unknown routes show 404', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { name: '一本陪你建立思路的手冊' })).toBeVisible();
  await page.locator('article').getByRole('link', { name: 'Sliding Window', exact: true }).click();
  await expect(page).toHaveURL(/templates\/sliding-window$/);
  await page.reload();
  await expect(page.getByRole('tab', { name: 'C++', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('pre').first()).toContainText('std::vector');
  await page.getByRole('tab', { name: 'Java', exact: true }).click();
  await expect(page.locator('pre').first()).toContainText('class Solution');
  await page.goto('/not-a-page');
  await expect(page).toHaveTitle('找不到頁面｜Coding Guide');
  await page.getByRole('link', { name: '回到手冊首頁' }).click();
  await expect(page).toHaveURL('/');
});

test('mobile navigation works with keyboard and long code does not overflow page', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const menu = page.locator('button[aria-controls="site-navigation"]');
  await menu.focus();
  await page.keyboard.press('Enter');
  await expect(menu).toHaveAttribute('aria-expanded', 'true');
  const nav = page.getByRole('navigation');
  await nav.getByRole('link', { name: '模式模板', exact: true }).click();
  await expect(page).toHaveURL('/templates');
  await expect(nav).toBeHidden();
  await page.getByRole('link', { name: /Sliding Window/ }).first().click();
  await expect(page.locator('h1')).toHaveText('Sliding Window');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
  await page.getByRole('button', { name: '開啟選單' }).click();
  await nav.getByRole('link', { name: '手冊首頁' }).focus();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('button', { name: '開啟選單' })).toBeFocused();
});
