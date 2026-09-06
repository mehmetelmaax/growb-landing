import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: 1,
  reporter: [["list"], ["html", { open: "never" }]],
  webServer: {
    command: "npm run start",
    url: "http://localhost:3001",
    reuseExistingServer: true,
    timeout: 120000,
  },
  use: {
    baseURL: "http://localhost:3001",
    trace: "on-first-retry",
    storageState: {
      cookies: [
        {
          name: "growb_ab_hero_headline_v1",
          value: "control",
          domain: "localhost",
          path: "/",
          expires: -1,
          httpOnly: false,
          secure: false,
          sameSite: "Lax",
        },
      ],
      origins: [],
    },
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
