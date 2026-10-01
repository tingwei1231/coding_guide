import { test, expect } from '@playwright/test';

test('desktop sidebar stays available and keyboard button returns to top', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/roadmap');
  await page.evaluate(() => window.scrollTo(0, 1800));
  const nav = page.getByRole('navigation', { name: '主要導覽' });
  await expect(nav.getByRole('link', { name: '時間複雜度', exact: true })).toBeInViewport();
  const sidebar = await page.locator('.sidebar').boundingBox();
  expect(sidebar!.y).toBeGreaterThanOrEqual(0);
  expect(sidebar!.y).toBeLessThan(2);
  const headingColor = await nav.getByRole('heading').first().evaluate(el => getComputedStyle(el).color);
  const linkColor = await nav.getByRole('link').first().evaluate(el => getComputedStyle(el).color);
  expect(headingColor).not.toBe(linkColor);
  const button = page.getByRole('button', { name: '回到頂端' });
  await expect(button).toBeInViewport();
  await button.focus();
  await page.keyboard.press('Enter');
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator('main')).toBeFocused();
  await nav.getByRole('link', { name: '時間複雜度', exact: true }).click();
  await expect(page.locator('h1')).toHaveText('時間複雜度');
  await expect(page).toHaveTitle('時間複雜度｜Coding Guide');
});

test('mobile menu is reachable after scrolling and does not cause overflow', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 });
  await page.goto('/roadmap');
  await page.evaluate(() => window.scrollTo(0, 1500));
  const menu = page.getByRole('button', { name: '開啟選單' });
  await expect(menu).toBeInViewport();
  await menu.click();
  const nav = page.getByRole('navigation', { name: '主要導覽' });
  await nav.getByRole('link', { name: '求職準備', exact: true }).click();
  await expect(page).toHaveURL('/career-prep');
  await expect(nav).toBeHidden();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.evaluate(() => window.scrollTo(0, 1200));
  await page.getByRole('button', { name: '回到頂端' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
});
