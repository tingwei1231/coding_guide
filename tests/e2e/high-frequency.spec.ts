import { test, expect } from '@playwright/test';

test('high frequency templates default to C++ and switch all translated groups', async ({ page }) => {
  await page.goto('/templates/cpp-review');
  await expect(page).toHaveURL(/templates\/hashmap-set$/);
  await expect(page.locator('h1')).toHaveText('HashMap / Set');
  const groups = page.locator('.article-examples');
  await expect(groups).toHaveCount(1);
  const hash = groups.nth(0);
  await expect(hash.locator('pre')).toContainText('return {seen[need], i};');
  await expect(hash.locator('pre')).toContainText('seen[nums[i]]++;');
  for (let i = 0; i < 1; i++) {
    const group = groups.nth(i);
    await expect(group.getByRole('tab', { name: 'C++', exact: true })).toHaveAttribute('aria-selected', 'true');
    for (const language of ['Python', 'Java', 'C++']) {
      await group.getByRole('tab', { name: language, exact: true }).click();
      await expect(group.getByRole('tab', { name: language, exact: true })).toHaveAttribute('aria-selected', 'true');
      await expect(group.locator('pre')).toHaveAttribute('aria-label', `${language} 參考實作`);
    }
  }
  await hash.getByRole('tab', { name: 'Python', exact: true }).click();
  await expect(hash.locator('pre')).toContainText('if need in seen:');
  await hash.getByRole('tab', { name: 'Java', exact: true }).click();
  await expect(hash.locator('pre')).toContainText('seen.containsKey(need)');
});
