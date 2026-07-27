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

test("global navigation preserves the approved identity without promoting individual forms or activities", () => {
  const header = read("src/components/SiteHeader.tsx");
  const navigation = `${header}\n${read("src/lib/site-navigation.ts")}`;
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
    assert.match(navigation, new RegExp(`href:\\s*\\?*\"${href.replaceAll("/", "\\/")}\"|href=\"${href.replaceAll("/", "\\/")}\"`));
  }
  assert.match(header, /oakonsult-logo\.png/);
  assert.match(header, />Get support</);
  assert.match(header, />Give support</);
  assert.match(header, /Our work &amp; impact/);
  assert.match(header, /About OAKonsult/);
  assert.match(header, /Work with us/);
  assert.match(header, />Where we work</);
  assert.doesNotMatch(header, />Zumba</);
  assert.doesNotMatch(header, /Forms & registrations/);
  assert.doesNotMatch(header, /href:\s*\?*"\/forms"|href="\/forms"/);
  assert.doesNotMatch(header, /String\(index \+ 1\)\.padStart\(2, "0"\)/, "visitor menu must not use decorative sequence numbering");
});

test("homepage preserves the approved editorial sequence and adds a real media gallery", () => {
  const homepage = read("src/app/page.tsx");
  const gallery = read("src/lib/gallery.ts");
  const sequence = ["oak-hero", "oak-proof", "oak-pathways", "oak-editorial", "oak-project-band", "oak-impact", "oak-regions", "oak-gallery-preview", "oak-stories", "oak-partners", "oak-final-cta"];
  let cursor = -1;
  for (const className of sequence) {
    const next = homepage.indexOf(`className=\"${className}\"`);
    assert.ok(next > cursor, `${className} should follow the approved section order`);
    cursor = next;
  }
  assert.match(homepage, /zumba-action\.webp/);
  assert.match(homepage, /href=\"\/zumba-class\"/);
  assert.match(homepage, /Zumba wellbeing/);
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

test("design system keeps the historical V4 recovery baseline alongside the approved premium V6 baseline", () => {
  const design = read("DESIGN.md");
  const agents = read("AGENTS.md");
  const manifest = JSON.parse(read("docs/design-baseline/manifest.json")) as { gitTag: string; commit: string; captures: Array<{ name: string }> };
  const historicalCommit = "d43128ac3c9e9895a9f4225453a210bae358b709";
  const historicalTag = "design-v4-canonical-2026-07-25";
  const premiumCommit = "ec6359e9b5eab85f00bb15fa6d2ef97a9460c4bd";
  const premiumTag = "design-premium-v6-approved-2026-07-26";
  assert.match(design, new RegExp(historicalTag));
  assert.match(design, new RegExp(premiumCommit));
  assert.match(design, new RegExp(premiumTag));
  assert.match(design, /Never use the generic AI pattern/i);
  assert.match(agents, new RegExp(historicalTag));
  assert.match(agents, new RegExp(premiumCommit));
  assert.match(agents, new RegExp(premiumTag));
  assert.equal(manifest.commit, historicalCommit);
  assert.equal(manifest.gitTag, historicalTag);
  for (const name of ["home-desktop.jpg", "home-mobile.jpg", "about-desktop.jpg", "about-mobile.jpg", "menu-mobile.jpg"]) {
    assert.ok(manifest.captures.some((capture) => capture.name === name), `baseline manifest missing ${name}`);
    assert.ok(existsSync(join(root, "docs/design-baseline", name)), `baseline image missing ${name}`);
  }
});

test("layout loads the canonical editorial stylesheet", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /import\s+"\.\/interior-v5\.css"/);
});

test("interior mastheads keep accessible foreground colours over the dark hero", () => {
  const css = read("src/app/interior-v5.css");
  assert.match(css, /\.interior-v5 \.interior-hero \.interior-hero-copy > \.oak-kicker\s*\{[^}]*color:\s*var\(--editorial-lime\)/);
  assert.match(css, /\.interior-v5 \.interior-hero \.interior-hero-copy > p:not\(\.oak-kicker\)\s*\{[^}]*color:\s*rgba\(255,255,255,\.88\)/);
});

test("form and light-panel kickers keep accessible contrast", () => {
  const css = read("src/app/interior-v5.css");
  assert.match(css, /\.interior-v5 \.interior-split \.oak-kicker,\s*\.interior-v5 \.form-layout \.oak-kicker\s*\{[^}]*color:\s*var\(--editorial-deep\)/);
});

test("regional, interior and footer journeys retain editorial depth and gallery discoverability", () => {
  const region = read("src/components/RegionPage.tsx");
  const interior = read("src/components/InteriorPage.tsx");
  const footer = `${read("src/components/SiteFooter.tsx")}\n${read("src/lib/site-navigation.ts")}`;
  assert.match(region, /region-gallery-bridge/);
  assert.match(region, /media-gallery\/\$\{data\.slug\}/);
  assert.match(region, /service\.href/);
  assert.match(interior, /HomeMotion/);
  assert.match(interior, /interior-flow/);
  for (const label of ["Media gallery", "Events", "Funders & partners", "OAK Centre Prime"]) assert.match(footer, new RegExp(label));
});
