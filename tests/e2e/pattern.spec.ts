import { test, expect } from '@playwright/test';
import { readFileSync } from 'node:fs';
const pattern = JSON.parse(readFileSync(new URL('../../content/patterns/sliding-window.json', import.meta.url), 'utf8'));

test('five accordions preserve language and show actual highlighted line numbers', async ({ page }) => {
  await page.goto('/templates/sliding-window');
  await expect(page.locator('.variation-card')).toHaveCount(5);
  for (const [language, label] of [['python', 'Python'], ['java', 'Java'], ['cpp', 'C++']]) {
    await page.getByRole('tab', { name: label, exact: true }).click();
    for (const variation of pattern.variations) {
      const card = page.locator(`#variation-${variation.id}`);
      const toggle = card.locator('h3 button');
      if (await toggle.getAttribute('aria-expanded') === 'false') await toggle.click();
      await expect(card.getByRole('region')).toBeVisible();
      await card.getByRole('button', { name: '查看完整程式碼' }).click();
      await expect(card.locator('.code-line')).toHaveCount(variation.code[language].lines.length);
      expect(await card.locator('.code-line.changed').evaluateAll(lines => lines.map(l => Number(l.getAttribute('data-line'))))).toEqual(variation.highlight_lines[language]);
      await expect(card.locator('pre')).toContainText(variation.code[language].lines[0]);
      await card.getByRole('button', { name: '只看差異' }).click();
      await expect(card.locator('.counterexamples')).toBeVisible();
      await expect(card.locator('a[href^="https://leetcode.com/problems/"]').first()).toHaveAttribute('target', '_blank');
      await toggle.click();
    }
  }
});

test('hash opens variation after reload; tabs and accordion work with keyboard on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/templates/sliding-window#variation-shrink-to-min');
  const target = page.locator('#variation-shrink-to-min');
  await expect(target.locator('h3 button')).toHaveAttribute('aria-expanded', 'true');
  await page.reload();
  await expect(target.getByRole('region')).toBeVisible();
  const python = page.getByRole('tab', { name: 'Python', exact: true });
  await python.focus(); await page.keyboard.press('ArrowRight');
  await expect(page.getByRole('tab', { name: 'Java', exact: true })).toHaveAttribute('aria-selected', 'true');
  await page.keyboard.press('End');
  await expect(page.getByRole('tab', { name: 'Java', exact: true })).toBeFocused();
  await page.keyboard.press('Home');
  await expect(page.getByRole('tab', { name: 'C++', exact: true })).toBeFocused();
  await target.locator('h3 button').focus(); await page.keyboard.press('Enter');
  await expect(target.getByRole('region')).toBeHidden();
  await page.getByRole('navigation', { name: '變形快速導覽' }).getByRole('link', { name: 'window＋monotonic deque：每個 window 的最大值' }).click();
  await expect(page.locator('#variation-monotonic-deque').getByRole('region')).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: 'test-results/sliding-window-mobile.png', fullPage: true });
});
