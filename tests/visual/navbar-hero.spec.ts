import { test } from "@playwright/test";

test("captures the Navbar and Hero gate", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.screenshot({
    path: "tests/visual/output/navbar-hero-1440.png",
    fullPage: false,
  });
});
