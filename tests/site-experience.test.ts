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

test("global navigation preserves the approved identity and exposes expanded journeys", () => {
  const header = read("src/components/SiteHeader.tsx");
  for (const href of [
    "/what-we-do",
    "/stories",
    "/impact",
    "/media-gallery",
    "/events",
    "/funders-partners",
    "/get-involved",
    "/about",
    "/uk",
    "/nigeria",
  ]) {
    assert.match(header, new RegExp(`href:\\s*\\?*\"${href.replaceAll("/", "\\/")}\"|href=\"${href.replaceAll("/", "\\/")}\"`));
  }
  assert.match(header, /oakonsult-logo\.png/);
  assert.match(header, />Our work</);
  assert.match(header, />Where we work</);
});

test("homepage preserves the approved editorial sequence and adds a real media gallery", () => {
  const homepage = read("src/app/page.tsx");
  const gallery = read("src/lib/gallery.ts");
  const sequence = ["oak-hero", "oak-proof", "oak-pathways", "oak-editorial", "oak-project-band", "oak-impact", "oak-regions", "oak-gallery-preview", "oak-home-directory", "oak-stories", "oak-partners", "oak-final-cta"];
  let cursor = -1;
  for (const className of sequence) {
    const next = homepage.indexOf(`className=\"${className}\"`);
    assert.ok(next > cursor, `${className} should follow the approved section order`);
    cursor = next;
  }
  assert.match(homepage, /zumba-action\.webp/);
  assert.match(homepage, /project-me-workshop\.webp/);
  assert.match(homepage, /homepageGallery/);
  assert.match(homepage, /href=\"\/media-gallery\"/);
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

test("approved visual identity keeps the original logo tile without floating kicker capsules", () => {
  const css = read("src/app/home-v4.css");
  const header = read("src/components/SiteHeader.tsx");
  assert.match(header, /src="\/logos\/oakonsult-logo\.png" width=\{124\}/);
  assert.doesNotMatch(header, /brand-v4-wordmark/);
  assert.match(cssRule(css, ".brand-v4-logo-shell {"), /background:\s*var\(--oak-forest\)/);
  assert.match(cssRule(css, ".brand-v4-logo-shell {"), /border-radius:\s*22px 22px 36px 12px/);
  assert.doesNotMatch(css, /\.oak-hero-content \.oak-kicker \{[^}]*border-radius:\s*999px/);
  assert.match(css, /\.header-v4-main-links/);
  assert.match(css, /\.header-v4-region-links/);
});

test("interior mastheads keep accessible foreground colours over the dark hero", () => {
  const css = read("src/app/interior-v5.css");
  assert.match(css, /\.interior-v5 \.interior-hero \.interior-hero-copy > \.oak-kicker\s*\{[^}]*color:\s*var\(--editorial-lime\)/);
  assert.match(css, /\.interior-v5 \.interior-hero \.interior-hero-copy > p:not\(\.oak-kicker\)\s*\{[^}]*color:\s*rgba\(255,255,255,\.88\)/);
});

test("regional, interior and footer journeys retain editorial depth and gallery discoverability", () => {
  const region = read("src/components/RegionPage.tsx");
  const interior = read("src/components/InteriorPage.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  assert.match(region, /region-gallery-bridge/);
  assert.match(region, /media-gallery\/\$\{data\.slug\}/);
  assert.match(region, /service\.href/);
  assert.match(interior, /HomeMotion/);
  assert.match(interior, /interior-flow/);
  for (const label of ["Media gallery", "Events", "Funders & partners", "OAK Centre Prime"]) assert.match(footer, new RegExp(label));
});
