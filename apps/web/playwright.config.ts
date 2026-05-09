import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "__tests__/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "auth-initial-chromium",
      testMatch: /auth\.setup\.ts/,
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "features-chromium",
      testIgnore: [/auth\.setup\.ts/],
      use: {
        ...devices["Desktop Chrome"],
        storageState: "playwright/.auth/chromium.json",
      },
      // Runs only after the Chromium auth smoke tests succeeded
      dependencies: ["auth-initial-chromium"],
    },
    // {
    //   name: "features-chromium",
    //   testIgnore: [/auth\.spec\.ts/, /auth\.setup\.ts/],
    //   use: {
    //     ...devices["Desktop Chrome"],
    //     storageState: "playwright/.auth/chromium.json",
    //   },
    //   dependencies: ["auth-initial-chromium"],
    // },
  ],
  webServer: {
    command: "npm run test",
    url: "http://localhost:3000",
    reuseExistingServer: !process.env.CI,
  },
});
