import { chromium } from "playwright";

const base = process.env.QA_BASE_URL || "http://127.0.0.1:3011";
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
let checkoutRequests = 0;

page.on("request", (request) => {
  if (new URL(request.url()).pathname === "/api/donations/checkout") checkoutRequests += 1;
});

await page.goto(`${base}/donate`, { waitUntil: "networkidle" });
await page.getByRole("button", { name: /Continue preview with/ }).click();
await page.getByLabel("First name").fill("Preview");
await page.getByLabel("Last name").fill("Donor");
await page.getByLabel("Email address").fill("preview@example.invalid");
await page.getByLabel(/preview does not send or store my details/).check();
await page.getByRole("button", { name: "Review gift" }).click();
await page.getByRole("button", { name: "Finish preview" }).click();

const status = await page.getByRole("status").textContent();
if (checkoutRequests !== 0) throw new Error(`Preview made ${checkoutRequests} checkout request(s)`);
if (!status?.includes("Nothing was sent") || !status.includes("no payment was taken")) {
  throw new Error(`Unexpected preview status: ${status}`);
}

console.log(`Donation preview completed locally; checkout requests=${checkoutRequests}; status=${status}`);
await browser.close();
