import { chromium } from "playwright";
import axe from "axe-core";
import { writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3027";
const expectedCounts = { uk: 22, nigeria: 21 };
const cases = [
  { region: "uk", viewport: { width: 1440, height: 1100 }, name: "uk-desktop" },
  { region: "uk", viewport: { width: 390, height: 844 }, name: "uk-mobile" },
  { region: "nigeria", viewport: { width: 1440, height: 1100 }, name: "nigeria-desktop" },
  { region: "nigeria", viewport: { width: 390, height: 844 }, name: "nigeria-mobile" },
];

const browser = await chromium.launch({ headless: true });
const report = [];
for (const entry of cases) {
  const context = await browser.newContext({ viewport: entry.viewport, locale: "en-GB", colorScheme: "light" });
  await context.addInitScript(() => {
    if (!sessionStorage.getItem("gallery-picture-book-qa-initialised")) {
      localStorage.clear();
      sessionStorage.setItem("gallery-picture-book-qa-initialised", "true");
    }
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const responseErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) responseErrors.push({ status: response.status(), url: response.url() });
  });
  await page.goto(`${base}/media-gallery/${entry.region}`, { waitUntil: "networkidle" });
  const figures = page.locator(".picture-book-figure");
  const figureCount = await figures.count();
  if (figureCount !== expectedCounts[entry.region]) throw new Error(`${entry.name}: expected ${expectedCounts[entry.region]} figures, got ${figureCount}`);

  for (let index = 0; index < figureCount; index += 1) {
    await figures.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(140);
  }
  await page.evaluate(async () => {
    const images = [...document.querySelectorAll(".picture-book-figure img")];
    await Promise.all(images.map((image) => image.complete
      ? image.decode?.().catch(() => undefined)
      : new Promise((resolve) => {
        image.addEventListener("load", resolve, { once: true });
        image.addEventListener("error", resolve, { once: true });
      })));
    window.scrollTo(0, 0);
  });
  await page.waitForLoadState("networkidle");

  const brokenImages = await page.locator(".picture-book-figure img").evaluateAll((images) =>
    images.filter((image) => !image.complete || !image.naturalWidth).map((image) => image.currentSrc || image.src),
  );
  const overflow = await page.evaluate(() => ({
    viewportWidth: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    overflowing: document.documentElement.scrollWidth > window.innerWidth + 1,
  }));

  const firstOpen = page.locator(".picture-book-open").first();
  const firstFavourite = page.locator(".picture-book-favourite").first();
  await firstFavourite.click();
  if ((await firstFavourite.getAttribute("aria-pressed")) !== "true") throw new Error(`${entry.name}: favourite did not activate`);
  await page.reload({ waitUntil: "networkidle" });
  const restoredFavourite = page.locator(".picture-book-favourite").first();
  await page.waitForFunction(() => document.querySelector(".picture-book-favourite")?.getAttribute("aria-pressed") === "true");
  if ((await restoredFavourite.getAttribute("aria-pressed")) !== "true") throw new Error(`${entry.name}: favourite did not persist`);
  await firstOpen.click();
  const dialog = page.getByRole("dialog");
  await dialog.waitFor({ state: "visible" });
  const before = await page.locator(".picture-book-viewer-count").textContent();
  await page.keyboard.press("ArrowRight");
  const after = await page.locator(".picture-book-viewer-count").textContent();
  if (before === after) throw new Error(`${entry.name}: ArrowRight did not advance the viewer`);
  await page.keyboard.press("Escape");
  await dialog.waitFor({ state: "detached" });
  if (!(await firstOpen.evaluate((element) => element === document.activeElement))) throw new Error(`${entry.name}: viewer focus was not restored`);
  await restoredFavourite.click();

  for (let index = 0; index < figureCount; index += 1) {
    await figures.nth(index).scrollIntoViewIfNeeded();
    await page.waitForTimeout(120);
  }
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => {
    document.querySelectorAll("[data-reveal], [data-reveal-child]").forEach((element) => element.classList.add("is-visible"));
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(450);

  await page.addScriptTag({ content: axe.source });
  const axeResult = await page.evaluate(async () => window.axe.run(document, {
    resultTypes: ["violations"],
    runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
  }));
  const seriousCritical = axeResult.violations.filter((violation) => violation.impact === "serious" || violation.impact === "critical");
  await page.addStyleTag({ content: "header.header-v4{position:absolute!important;top:0!important}.skip-link{display:none!important}" });
  await page.screenshot({ path: `docs/qa-gallery-${entry.name}-picture-book-local.png`, fullPage: true });

  const row = { ...entry, figureCount, brokenImages, overflow, consoleErrors, responseErrors, seriousCritical };
  report.push(row);
  console.log(`${entry.name}: ${figureCount} figures, ${brokenImages.length} broken, horizontal overflow=${overflow.overflowing}, ${consoleErrors.length} console errors, ${responseErrors.length} response errors, ${seriousCritical.length} serious/critical axe`);
  if (brokenImages.length || overflow.overflowing || consoleErrors.length || responseErrors.length || seriousCritical.length) {
    throw new Error(`${entry.name}: QA blockers detected`);
  }
  await context.close();
}
await browser.close();
await writeFile("docs/gallery-picture-book-qa-report-local.json", `${JSON.stringify(report, null, 2)}\n`);
