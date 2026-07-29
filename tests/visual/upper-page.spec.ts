import { test } from "@playwright/test";

test("captures features, specialties, and statistics at 1440px", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1014 });
  await page.goto("/");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({
    path: "tests/visual/output/upper-page-1440.png",
    fullPage: false,
  });
});
