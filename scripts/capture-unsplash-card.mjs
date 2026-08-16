import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT_DIR = path.join(__dirname, "../docs/screenshots");
const URL = "https://primayuda.dev/birthday-card-generator/";

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

  await page.goto(URL, { waitUntil: "networkidle" });

  await page.fill("#name", "Alex");
  await page.fill("#age", "30");
  await page.fill("#hobby", "baking");
  await page.fill("#adjective", "sparkly");
  await page.fill("#plural-nouns", "puppies");

  await page.getByRole("button", { name: /Generate/i }).click();

  await page.getByText("Photo by", { exact: false }).waitFor({ timeout: 60_000 });
  await page.getByRole("link", { name: "Unsplash" }).waitFor({ timeout: 10_000 });

  // Let card animation and image finish loading
  await page.waitForTimeout(1500);

  const card = page.locator("article").first();
  await card.screenshot({
    path: path.join(OUT_DIR, "card-unsplash-attribution.png"),
  });

  await page.screenshot({
    path: path.join(OUT_DIR, "desktop-with-card-unsplash.png"),
    fullPage: false,
  });

  await browser.close();
  console.log("Saved card-unsplash-attribution.png and desktop-with-card-unsplash.png");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
