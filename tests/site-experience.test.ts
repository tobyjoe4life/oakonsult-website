import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const cssRule = (css: string, selector: string) => {
  const start = css.indexOf(selector);
  assert.notEqual(start, -1, `missing CSS selector: ${selector}`);
  return css.slice(start, css.indexOf("}", start) + 1);
};

test("global navigation exposes the expanded editorial and regional journeys", () => {
  const header = read("src/components/SiteHeader.tsx");
  for (const href of [
    "/what-we-do",
    "/media-gallery",
    "/events",
    "/impact",
    "/funders-partners",
    "/uk",
    "/nigeria",
  ]) {
    assert.match(header, new RegExp(`href:\\s*\\?*\"${href.replaceAll("/", "\\/")}\"|href=\"${href.replaceAll("/", "\\/")}\"`));
  }
});

test("homepage includes a curated media gallery preview with at least six real photographs", () => {
  const homepage = read("src/app/page.tsx");
  const gallery = read("src/lib/gallery.ts");
  assert.match(homepage, /Media gallery/i);
  assert.match(homepage, /href="\/media-gallery"/);
  assert.match(homepage, /homepageGallery/);
  const galleryImages = gallery.match(/\/images\/gallery\/[a-z0-9-]+\.webp/g) ?? [];
  assert.ok(new Set(galleryImages).size >= 6, `expected at least six gallery images, found ${new Set(galleryImages).size}`);
});

test("expanded public destinations have first-party route files", () => {
  for (const route of [
    "media-gallery",
    "media-gallery/uk",
    "media-gallery/nigeria",
    "events",
    "impact",
    "funders-partners",
    "programmes/project-me",
    "programmes/parent-carer-support",
    "programmes/support-for-churches",
    "programmes/oak-centre-prime",
  ]) {
    assert.ok(existsSync(join(root, "src/app", route, "page.tsx")), `missing route: ${route}`);
  }
});

test("donation choice controls expose state and a dynamic impact explanation", () => {
  const form = read("src/components/DonationForm.tsx");
  assert.match(form, /aria-pressed=/);
  assert.match(form, /impact/i);
  assert.match(form, /Continue preview with/);
  assert.match(form, /Preview only/);
  assert.match(form, /No payment has been taken/);
});

test("anti-template design removes rounded shells around the logo, partner rail and country destinations", () => {
  const css = read("src/app/home-v4.css");
  assert.match(cssRule(css, ".brand-v4-logo-shell {"), /background:\s*transparent/);
  assert.match(cssRule(css, ".oak-logo-card {"), /border-radius:\s*0/);
  assert.match(cssRule(css, ".footer-v4 .region-footer a {"), /border-radius:\s*0/);
  assert.match(cssRule(css, ".oak-hero-content .oak-kicker {"), /border-radius:\s*0/);
});
