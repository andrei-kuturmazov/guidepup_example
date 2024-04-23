// @ts-check
const { defineConfig, devices } = require('@playwright/test');
import { screenReaderConfig } from "@guidepup/playwright";


/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  ...screenReaderConfig,
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { open: 'never'}],
  ],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'], headless: false },
    // },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'], headless: false },
    },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],

});

