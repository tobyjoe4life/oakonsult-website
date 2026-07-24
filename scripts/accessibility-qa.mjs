import { chromium } from "playwright";
import axe from "axe-core";
import { writeFile } from "node:fs/promises";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3011";
const routes = ["/", "/donate", "/media-gallery", "/uk", "/nigeria", "/programmes/project-me", "/funders-partners", "/stories", "/contact"];
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
];

const browser = await chromium.launch({ headless: true });
const results = [];

for (const path of routes) {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(`${base}${path}`, { waitUntil: "networkidle" });
    await page.evaluate(async () => {
      const step = Math.max(300, Math.floor(window.innerHeight * .8));
      for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise((resolve) => setTimeout(resolve, 55));
      }
      window.scrollTo(0, 0);
      await new Promise((resolve) => setTimeout(resolve, 650));
    });
    await page.addScriptTag({ content: axe.source });
    const scan = await page.evaluate(async () => window.axe.run(document, {
      resultTypes: ["violations"],
      runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"] },
    }));
    const violations = scan.violations.map((violation) => ({
      id: violation.id,
      impact: violation.impact,
      description: violation.description,
      help: violation.help,
      nodes: violation.nodes.map((node) => ({ target: node.target, html: node.html, failureSummary: node.failureSummary })),
    }));
    results.push({ path, viewport: viewport.name, violations });
    console.log(`${path} ${viewport.name}: ${violations.length} violation groups`);
    await context.close();
  }
}

await browser.close();
const blocking = results.flatMap((result) => result.violations
  .filter((violation) => violation.impact === "serious" || violation.impact === "critical")
  .map((violation) => ({ path: result.path, viewport: result.viewport, ...violation })));
await writeFile("docs/accessibility-qa-report.json", `${JSON.stringify({ base, scans: results.length, blocking, results }, null, 2)}\n`);
console.log(`${blocking.length} serious/critical violation group(s) across ${results.length} scans.`);
if (blocking.length) process.exitCode = 1;
