import { defineConfig } from "@playwright/test"

export default defineConfig({
  testDir: "./tests",
  timeout: 120_000,
  use: {
    baseURL: "https://legacyclinicallabs.com",
    ignoreHTTPSErrors: true,
    screenshot: "only-on-failure",
  },
  projects: [
    { name: "chromium", use: { browserName: "chromium" } },
  ],
})
