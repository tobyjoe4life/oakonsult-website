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

test("contact preview uses the same immutable review-site mode", () => {
  assert.equal(isReviewSite(), true);
  assert.doesNotMatch(source("src/lib/site/review-mode.ts"), /process\.env/);
});

test("staging contact API gate runs before validation, parsing and CRM submission", () => {
  const route = source("src/app/api/forms/contact/route.ts");
  const gate = route.indexOf("if (isReviewSite())");

  assert.ok(gate >= 0);
  assert.ok(gate < route.indexOf("validatePublicRequest(request)"));
  assert.ok(gate < route.indexOf("request.json()"));
  assert.ok(gate < route.indexOf("crm.contact(parsed.data)"));
  assert.match(route, /No details were processed, delivered or stored/);
});

test("staging contact preview returns before FormData, fetch and CRM delivery", () => {
  const form = source("src/components/ContactForm.tsx");
  const guard = form.indexOf("if (contactPreviewMode)");

  assert.ok(guard >= 0);
  assert.ok(guard < form.indexOf("new FormData(form)"));
  assert.ok(guard < form.indexOf('fetch("/api/forms/contact"'));
  assert.match(form, /Nothing was sent or stored/);
  assert.match(form, /Check form without sending/);
});
