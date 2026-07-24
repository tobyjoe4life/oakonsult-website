import { chromium } from "playwright";
import { writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3010";
const suffix = process.env.QA_SUFFIX || "";
const cases = [
  { name: "home-mobile", path: "/", viewport: { width: 390, height: 844 } },
  { name: "home-desktop", path: "/", viewport: { width: 1440, height: 1100 } },
  { name: "gallery-desktop", path: "/media-gallery", viewport: { width: 1440, height: 1100 } },
  { name: "gallery-mobile", path: "/media-gallery", viewport: { width: 390, height: 844 } },
  { name: "donate-mobile", path: "/donate", viewport: { width: 390, height: 844 } },
  { name: "project-me-mobile", path: "/programmes/project-me", viewport: { width: 390, height: 844 } },
  { name: "uk-desktop", path: "/uk", viewport: { width: 1440, height: 1100 } },
  { name: "nigeria-mobile", path: "/nigeria", viewport: { width: 390, height: 844 } },
  { name: "partners-desktop", path: "/funders-partners", viewport: { width: 1440, height: 1100 } },
  { name: "stories-mobile", path: "/stories", viewport: { width: 390, height: 844 } },
  { name: "contact-mobile", path: "/contact", viewport: { width: 390, height: 844 } },
];

const browser = await chromium.launch({ headless: true });
const report = [];

for (const entry of cases) {
  const context = await browser.newContext({ viewport: entry.viewport, colorScheme: "light", locale: "en-GB" });
  const page = await context.newPage();
  const consoleErrors = [];
  const responseErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("response", (response) => {
    if (response.status() >= 400) responseErrors.push({ status: response.status(), url: response.url() });
  });

  await page.goto(`${base}${entry.path}`, { waitUntil: "networkidle" });
  await page.evaluate(async () => {
    const step = Math.max(300, Math.floor(window.innerHeight * .72));
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((resolve) => setTimeout(resolve, 70));
    }
    window.scrollTo(0, document.documentElement.scrollHeight);
    await new Promise((resolve) => setTimeout(resolve, 500));
  });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.addStyleTag({ content: "header.header-v4{position:absolute!important;top:0!important}.skip-link{display:none!important}" });
  await page.waitForLoadState("networkidle");
  await page.waitForTimeout(350);
  await page.screenshot({ path: `docs/qa-${entry.name}${suffix}.png`, fullPage: true });

  const metrics = await page.evaluate(() => {
    const images = [...document.images].map((image) => ({
      alt: image.alt,
      src: image.currentSrc || image.src,
      complete: image.complete,
      naturalWidth: image.naturalWidth,
      naturalHeight: image.naturalHeight,
    }));
    const overflow = [...document.querySelectorAll("body *")]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.right > window.innerWidth + 1 || rect.left < -1;
      })
      .slice(0, 25)
      .map((element) => ({
        tag: element.tagName.toLowerCase(),
        className: typeof element.className === "string" ? element.className : "",
        text: (element.textContent || "").trim().replace(/\s+/g, " ").slice(0, 90),
        rect: element.getBoundingClientRect().toJSON(),
      }));
    return {
      title: document.title,
      viewport: { width: window.innerWidth, height: window.innerHeight },
      document: { width: document.documentElement.scrollWidth, height: document.documentElement.scrollHeight },
      images,
      brokenImages: images.filter((image) => !image.complete || !image.naturalWidth),
      overflow,
    };
  });

  report.push({ ...entry, ...metrics, consoleErrors, responseErrors });
  console.log(`${entry.name}: ${metrics.brokenImages.length} broken images, ${metrics.overflow.length} overflow candidates, ${responseErrors.length} response errors`);
  await context.close();
}

await browser.close();
await writeFile(`docs/visual-qa-report${suffix}.json`, `${JSON.stringify(report, null, 2)}\n`);
