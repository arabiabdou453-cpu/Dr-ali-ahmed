import { defineConfig, devices } from "@playwright/test";
import path from "node:path";

const localAppData = process.env.LOCALAPPDATA;
if (!localAppData) {
  throw new Error("LOCALAPPDATA is required to locate Playwright Chromium.");
}

const chromiumExecutable = path.join(
  localAppData,
  "ms-playwright",
  "chromium-1234",
  "chrome-win64",
  "chrome.exe",
);

export default defineConfig({
  testDir: "./tests/visual",
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 482 },
        launchOptions: { executablePath: chromiumExecutable },
      },
    },
  ],
  use: { baseURL: "http://127.0.0.1:3100" },
  webServer: {
    command: "npm run build && npm run start -- --port 3100",
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    timeout: 120_000,
  },
});
