import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3011";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let contactRequests = 0;

page.on("request", (request) => {
  if (new URL(request.url()).pathname === "/api/forms/contact") contactRequests += 1;
});

await page.goto(`${base}/contact`, { waitUntil: "networkidle" });
await page.getByLabel("What can we help with?").selectOption("programme");
await page.getByLabel("First name").fill("Preview");
await page.getByLabel("Last name").fill("Visitor");
await page.getByLabel("Email address").fill("preview@example.invalid");
await page.locator('select[name="region"]').selectOption("Elsewhere / online");
await page.getByLabel("Your message").fill("Placeholder message for the browser-only staging preview.");
await page.getByLabel(/browser-only preview/).check();
await page.getByRole("button", { name: "Complete form preview" }).click();

const status = await page.getByRole("status").textContent();
if (contactRequests !== 0) throw new Error(`Preview made ${contactRequests} contact request(s)`);
if (!status?.includes("No personal details were sent") || !status.includes("delivered or stored")) {
  throw new Error(`Unexpected preview status: ${status}`);
}

console.log(`Contact preview completed locally; contact requests=${contactRequests}; status=${status}`);
await browser.close();
