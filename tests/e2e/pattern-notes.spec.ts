import { test, expect } from '@playwright/test';

test('template index opens Pattern notes and all supplements support three languages', async ({ page }) => {
  await page.goto('/templates');
  await page.locator('article').getByRole('link', { name: 'LeetCode 150 Pattern 重點與模板' }).click();
  await expect(page).toHaveURL(/templates\/pattern-notes$/);
  await expect(page.locator('h1')).toHaveText('LeetCode 150 Pattern 重點與模板');
  const groups = page.locator('.article-examples');
  await expect(groups).toHaveCount(15);
  for (let i = 0; i < 15; i++) {
    const group = groups.nth(i);
    await expect(group.getByRole('tab', { name: 'C++', exact: true })).toHaveAttribute('aria-selected', 'true');
    for (const language of ['Python', 'Java']) {
      await group.getByRole('tab', { name: language, exact: true }).click();
      await expect(group.locator('pre')).toHaveAttribute('aria-label', `${language} 參考實作`);
    }
  }
  await page.locator('article').getByRole('link', { name: '左右夾逼', exact: true }).click();
  await expect(page).toHaveURL(/templates\/two-pointers$/);
});
