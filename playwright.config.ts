import { defineConfig, devices } from '@playwright/test';




export default defineConfig({
  testDir: './tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  //retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html'],
    ['list'],
    ['allure-playwright'],
    ['playwright-html-reporter', { 
      testFolder: 'tests',
      title: 'OPEN CART HTML Report',
      project: 'Open Cart',
      release: '9.87.6',
      testEnvironment: 'PROD',
      embedAssets: true,
      embedAttachments: true,
      outputFolder: 'playwright-html-report',
      minifyAssets: true,
      startServer: false,
    }]
  ],
  
  use: {
    
    trace: 'on-first-retry',
    headless: true,
    screenshot: 'on',
    video: 'on',
    baseURL: 'https://naveenautomationlabs.com/opencart/index.php',

    httpCredentials: {
      username: 'admin',
      password: 'admin'
    }
    
  },

  metadata: {
    appUsername: 'pwtest@nal.com',
    appPassword: 'test123'
  },

  /* Configure projects for major browsers */
  projects: [
  {
    name: 'Google Chrome',
    use: {
      channel: 'chrome',
      viewport: null,
      launchOptions: {
        args: ['--start-maximized'],
        ignoreDefaultArgs: ['--window-size=1280,720']
      }
    }
  },

  // {
  //   name: 'Microsoft Edge',
  //   use: {
  //     channel: 'msedge',
  //     viewport: null,
  //     launchOptions: {
  //       args: ['--start-maximized'],
  //       ignoreDefaultArgs: ['--window-size=1280,720']
  //     }
  //   }
  // },

  // {
  //   name: 'Chromium',
  //   use: {
  //     browserName: 'chromium',
  //     viewport: { width: 1920, height: 1080 },
  //     launchOptions: {
  //       args: [],
  //       ignoreDefaultArgs: ['--window-size=1280,720']
  //     }
  //   }
  // },

  // {
  //   name: 'Firefox',
  //   use: {
  //     browserName: 'firefox',
  //     viewport: { width: 1920, height: 1080 },       
  //     launchOptions: {
  //       args: [],
  //       ignoreDefaultArgs: ['--window-size=1280,720']
  //     }
  //   }
  // },

  // {
  //   name: 'WebKit',
  //   use: {
  //     browserName: 'webkit',
  //     viewport: { width: 1920, height: 1080 },      
  //     launchOptions: {
  //       args: [],
  //       ignoreDefaultArgs: ['--window-size=1280,720']
  //     }
  //   }
  // }
],


});
