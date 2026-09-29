import { test, expect } from '@playwright/test';

test('all three types grade with explanations; retry and reload clear answers', async ({ page }) => {
  await page.goto('/quiz');
  await page.getByLabel('練習範圍').selectOption('sliding-window');
  await page.getByRole('button', { name: '開始測驗' }).click();
  const question = (id: string) => page.locator(`[data-question-id="${id}"]`);
  await expect(page.locator('.quiz-question')).toHaveCount(4);
  await question('fixed-window-choice').getByRole('radio', { name: '加入右端並移除離開的左端' }).check();
  await question('fixed-window-text').getByRole('textbox').fill('  FIXED   WINDOW  ');
  await question('fixed-window-code').getByRole('textbox').fill('right+k');
  await page.getByRole('button', { name: '送出答案' }).click();
  await expect(page.getByRole('status')).toContainText('答對 2 / 4 題；未作答 1 題');
  await expect(question('fixed-window-code').getByRole('heading', { name: '答錯', exact: true })).toBeVisible();
  await expect(question('window-negative').getByRole('heading', { name: '未作答', exact: true })).toBeVisible();
  await expect(question('fixed-window-code').getByRole('textbox')).toBeDisabled();
  await expect(question('fixed-window-choice').getByRole('link', { name: 'Sliding Window' })).toHaveAttribute('href', '/templates/sliding-window');
  await page.getByRole('button', { name: '重做這組題目' }).click();
  await expect(page.getByRole('status')).toHaveCount(0);
  await expect(question('fixed-window-code').getByRole('textbox')).toHaveValue('');
  await expect(question('fixed-window-choice').getByRole('radio').first()).not.toBeChecked();
  await page.reload();
  await expect(page.locator('.quiz-question')).toHaveCount(0);
  await expect(page.getByLabel('練習範圍')).toHaveValue('all');
});

test('mobile keyboard workflow, case-sensitive code and scope changes', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/quiz');
  await page.getByLabel('練習範圍').selectOption('bfs-dfs');
  await page.getByRole('button', { name: '開始測驗' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('heading', { name: '本回合 4 題' })).toBeFocused();
  await page.locator('[data-question-id="bfs-visited"]').getByRole('textbox').fill('true');
  await page.getByRole('button', { name: '送出答案' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('status')).toBeFocused();
  await expect(page.getByRole('status')).toContainText('答對 0 / 4 題');
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.getByLabel('練習範圍').selectOption('all');
  await page.getByRole('button', { name: '依所選範圍重新抽題' }).click();
  await expect(page.locator('.quiz-question')).toHaveCount(6);
  await expect(page.getByRole('status')).toHaveCount(0);
  const ids = await page.locator('.quiz-question').evaluateAll(nodes => nodes.map(n => n.getAttribute('data-question-id')));
  expect(new Set(ids).size).toBe(6);
});
