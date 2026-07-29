import { test } from "@playwright/test";

test("captures the complete homepage at 1440px", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({
    path: "tests/visual/output/final-1440.png",
    fullPage: true,
  });
});
