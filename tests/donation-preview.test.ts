import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { isReviewSite } from "../src/lib/site/review-mode.ts";

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");

function source(relativePath: string) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

test("review-site mode is code-locked and not controlled by deployment environment", () => {
  assert.equal(isReviewSite(), true);
  assert.doesNotMatch(source("src/lib/site/review-mode.ts"), /process\.env/);
});

test("staging API gate runs before validation, body parsing and CRM submission", () => {
  const route = source("src/app/api/donations/checkout/route.ts");
  const gate = route.indexOf("if (isReviewSite())");

  assert.ok(gate >= 0);
  assert.ok(gate < route.indexOf("validatePublicRequest(request)"));
  assert.ok(gate < route.indexOf("request.json()"));
  assert.ok(gate < route.indexOf("crm.donation(parsed.data)"));
  assert.match(route, /No details were processed and no payment was taken/);
});

test("staging form completes locally before any checkout request or redirect", () => {
  const form = source("src/components/DonationForm.tsx");
  const guard = form.indexOf("if (donationPreviewMode)");

  assert.ok(guard >= 0);
  assert.ok(guard < form.indexOf('fetch("/api/donations/checkout"'));
  assert.ok(guard < form.indexOf("window.location.assign(data.url)"));
  assert.match(form, /Nothing was sent or stored and no payment was taken/);
  assert.match(form, /Finish preview/);
});
