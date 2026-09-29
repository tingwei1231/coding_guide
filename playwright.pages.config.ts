import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/pages',
  use: { baseURL: 'http://127.0.0.1:4174', ...devices['Desktop Chrome'], channel: process.env.CI ? undefined : 'msedge' },
  webServer: { command: 'node scripts/prepare-pages-test.mjs && python -m http.server 4174 --bind 127.0.0.1 --directory .snippet-check/pages-host', url: 'http://127.0.0.1:4174/coding_guide/', reuseExistingServer: false },
});
