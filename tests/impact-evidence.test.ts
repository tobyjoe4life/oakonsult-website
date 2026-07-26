import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
import test from "node:test";

const root = process.cwd();
const read = (relative: string) => readFileSync(path.join(root, relative), "utf8");

test("public impact figures use the verified evidence set and expose their basis", () => {
  const content = read("src/lib/content/local.ts");
  const types = read("src/lib/content/types.ts");
  const homepage = read("src/app/page.tsx");

  assert.doesNotMatch(content, /250\+/);
  assert.doesNotMatch(content, /75%/);
  for (const value of ["36", "95%", "100+"]) assert.match(content, new RegExp(`value: "${value.replace("+", "\\+")}"`));
  assert.match(content, /Project ME programme records/i);
  assert.match(content, /To 18 May 2026/i);
  assert.match(content, /January to June 2026/i);
  assert.match(types, /source:\s*string/);
  assert.match(types, /period:\s*string/);
  assert.match(homepage, /item\.source/);
  assert.match(homepage, /item\.period/);
});

test("homepage frames the mixed UK and Nigeria evidence accurately", () => {
  const homepage = read("src/app/page.tsx");
  assert.match(homepage, /Evidence snapshot/);
  assert.match(homepage, /What our records show\./);
  assert.match(homepage, /Project ME participant feedback and OAKonsult Nigeria outreach records/);
  assert.doesNotMatch(homepage, /What parent carers told us\./);
});

test("impact page uses factual non-identifying alt text for published outreach photographs", () => {
  const page = read("src/app/impact/page.tsx");
  assert.match(page, /OAKonsult outreach team members gathered together with programme materials/);
  assert.doesNotMatch(page, /team members gathered after a community session/);
});

test("impact page turns verified evidence into a distinctive public journey", () => {
  const page = read("src/app/impact/page.tsx");

  assert.doesNotMatch(page, /EditorialDetailPage/);
  assert.match(page, /siteContent\.impact/);
  assert.match(page, /className="oak-home editorial-page impact-page"/);
  assert.match(page, /impact-evidence-grid/);
  assert.match(page, /impact-journal/);
  assert.match(page, /January to June 2026/i);
  assert.match(page, /medical outreach/i);
  assert.match(page, /Annual reports/i);
  assert.match(page, /approved for publication/i);
  assert.match(page, /media-gallery/);
  assert.match(page, /HomeMotion/);
});
