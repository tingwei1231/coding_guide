import { test, expect } from '@playwright/test';

test('home leads through interview practice and career preparation on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  await expect(page.locator('.cards .card')).toHaveCount(7);
  const interview = page.locator('article').getByRole('link', { name: '模擬面試', exact: true });
  await interview.focus();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/mock-interview');
  await expect(page.locator('article h3')).toHaveCount(3);
  await expect(page.locator('article ol li')).toHaveCount(5);
  await expect(page.getByRole('heading', { name: 'STAR 範例', exact: true })).toBeVisible();
  await expect(page.locator('article')).toContainText('虛構教學情境');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('article').getByRole('link', { name: '求職準備', exact: true }).click();
  await expect(page).toHaveURL('/career-prep');
  await expect(page.getByRole('heading', { name: '前一週 checklist' })).toBeVisible();
  await expect(page.getByRole('heading', { name: '前一天 checklist' })).toBeVisible();
  await expect(page.locator('article ol')).toHaveCount(2);
  await expect(page.locator('article ol').first().locator('li')).toHaveCount(7);
  await expect(page.locator('article ol').last().locator('li')).toHaveCount(6);
  await page.reload();
  await expect(page.getByRole('heading', { name: '作品集', exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.locator('article').getByRole('link', { name: '學習路徑', exact: true }).click();
  await expect(page).toHaveURL('/roadmap');
});
