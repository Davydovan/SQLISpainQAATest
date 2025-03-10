import { defineConfig, devices } from '@playwright/test';

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  timeout: 50000,
  testDir: './tests',
  reporter: 'html',
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.google.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',  
  },  
  
  /* Configure projects for major browsers */
  projects: [   
    {
      name: 'Chromium',
      use: {        
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 }, // Set full screen resolution
      headless: false,
      launchOptions: {
        args: [
          '--disable-site-isolation-trials',
          '--disable-features=site-per-process,SitePerProcess',
          '--disable-blink-features=AutomationControlled',
        ],
      },
    },
    },

    {
      name: 'Firefox',
      use: {        
        ...devices["Desktop Firefox"],
        viewport: { width: 1920, height: 1080 }, // Set full screen resolution
        headless: false,
       },
    },

    {
      name: 'Webkit',
      use: {        
        ...devices["Desktop Safari"],
        viewport: { width: 1920, height: 1080 }, // Set full screen resolution
        headless: false,
      },
    },
  ]
});
