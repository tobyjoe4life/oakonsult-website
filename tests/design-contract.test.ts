import test from "node:test";
import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");
const readAbsolute = (path: string) => readFileSync(path, "utf8");

const CONTRACT_MARKER = "OAK-PREMIUM-LIVING-SITE-CONTRACT-2026-07";
const PREMIUM_TAG = "design-premium-v6-approved-2026-07-26";
const PREMIUM_COMMIT = "ec6359e9b5eab85f00bb15fa6d2ef97a9460c4bd";

test("DESIGN.md and AGENTS.md carry one stable shared premium contract marker", () => {
  const design = read("DESIGN.md");
  const agents = read("AGENTS.md");
  assert.ok(design.includes(CONTRACT_MARKER), "DESIGN.md must carry the shared premium contract marker");
  assert.ok(agents.includes(CONTRACT_MARKER), "AGENTS.md must carry the shared premium contract marker");
});

test("the shared contract explicitly governs every new route, page family, redesign and site-wide change", () => {
  const documents: [string, string][] = [
    ["DESIGN.md", read("DESIGN.md")],
    ["AGENTS.md", read("AGENTS.md")],
  ];
  for (const [name, text] of documents) {
    assert.match(text, /non-negotiable/i, `${name} must state the direction is non-negotiable`);
    assert.match(text, /every new route/i, `${name} must govern every new route`);
    assert.match(text, /every new page family/i, `${name} must govern every new page family`);
    assert.match(text, /redesign/i, `${name} must govern redesigns`);
    assert.match(text, /site-wide change/i, `${name} must govern site-wide changes`);
  }
});

test("the contract keeps the premium pillars testable, not only aspirational", () => {
  const design = read("DESIGN.md");
  for (const pillar of [
    /route-specific colour moods|route mood/i,
    /organic/i,
    /authentic photography/i,
    /prefers-reduced-motion/i,
    /capsule/i,
    /no-JS|without JavaScript/i,
    /preview-only/i,
    /noindex/i,
    /em dashes/i,
  ]) {
    assert.match(design, pillar, `DESIGN.md contract is missing pillar: ${pillar}`);
  }
});

test("the approved premium V6 release is the durable recovery baseline", () => {
  const design = read("DESIGN.md");
  const agents = read("AGENTS.md");
  const baselineReadme = read("docs/design-baseline/premium-v6/README.md");
  const manifest = JSON.parse(read("docs/design-baseline/premium-v6/manifest.json")) as {
    gitTag: string;
    commit: string;
    captures: Array<{ name: string }>;
  };

  for (const document of [design, agents, baselineReadme]) {
    assert.match(document, new RegExp(PREMIUM_TAG));
    assert.match(document, new RegExp(PREMIUM_COMMIT));
  }
  assert.match(agents, /premium-v6\.css/);
  assert.equal(manifest.gitTag, PREMIUM_TAG);
  assert.equal(manifest.commit, PREMIUM_COMMIT);
  const baselineFiles = new Set(readdirSync(join(root, "docs", "design-baseline", "premium-v6")));
  for (const name of ["home-desktop.jpg", "home-mobile.jpg", "about-desktop.jpg", "about-mobile.jpg"]) {
    assert.ok(manifest.captures.some((capture) => capture.name === name), `premium baseline missing ${name}`);
    assert.ok(baselineFiles.has(name), `premium baseline file missing on disk: ${name}`);
  }
});

test("the visitor journey architecture is recorded as part of the shared design contract", () => {
  const documents: [string, string][] = [
    ["DESIGN.md", read("DESIGN.md")],
    ["AGENTS.md", read("AGENTS.md")],
  ];
  for (const [name, text] of documents) {
    for (const journey of ["Get support", "Give support", "Our work and impact", "About OAKonsult", "Work with us"]) {
      assert.match(text, new RegExp(journey), `${name} must record the ${journey} visitor journey`);
    }
    assert.match(text, /Where we work[\s\S]*separate|separate[\s\S]*Where we work/i, `${name} must keep Where we work separate`);
    assert.match(text, /decorative sequence (numbers|numbering|indexes)/i, `${name} must prohibit decorative sequence numbering`);
  }
});

const listRoutePages = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return listRoutePages(path);
    return entry.name === "page.tsx" ? [path] : [];
  });

test("every route page carries an explicit mood or uses an approved shared premium page family", () => {
  const approvedFamilies = [
    "InteriorPage",
    "EditorialDetailPage",
    "GalleryPage",
    "RegionPage",
    "UtilityPage",
    "PublicFormPage",
    "TeamRegionPage",
    "TeamProfile",
  ];
  const pages = listRoutePages(join(root, "src", "app"));
  assert.ok(pages.length >= 30, `expected the full route set, found ${pages.length}`);
  const offenders: string[] = [];
  for (const page of pages) {
    const source = readAbsolute(page);
    const hasExplicitMood = /data-mood=|mood:\s*"[a-z]+"|mood="[a-z]+"/.test(source);
    const usesApprovedFamily = approvedFamilies.some((family) =>
      new RegExp(`<${family}[\\s>]|from "@/components/${family}"`).test(source),
    );
    if (!hasExplicitMood && !usesApprovedFamily) offenders.push(page.slice(root.length + 1));
  }
  assert.deepEqual(offenders, [], `routes outside the premium mood/family system: ${offenders.join(", ")}`);
});

test("the premium layer loads last, after globals, home and interior systems", () => {
  const layout = read("src/app/layout.tsx");
  const cssImports = [...layout.matchAll(/import\s+"\.\/([^"]+\.css)";/g)].map((match) => match[1]);
  assert.deepEqual(cssImports, ["globals.css", "home-v4.css", "interior-v5.css", "premium-v6.css"]);
});

test("motion and reduced-motion guards remain present in the premium system", () => {
  const premium = read("src/app/premium-v6.css");
  const motion = read("src/components/HomeMotion.tsx");
  assert.match(premium, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(premium, /\.motion-ready \[data-reveal\]:not\(\.is-visible\)/);
  assert.doesNotMatch(premium, /\[data-reveal\]\s*\{\s*opacity:\s*0/, "bare hidden states break no-JS visibility");
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /IntersectionObserver/);
  assert.match(motion, /is-visible/);
});

test("staging gates remain intact: noindex and fail-closed preview forms", () => {
  const layout = read("src/app/layout.tsx");
  assert.match(layout, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false/);
  const config = read("next.config.ts");
  assert.match(config, /"X-Robots-Tag",\s*value:\s*"noindex, nofollow, noarchive"/);
  assert.match(read("src/app/api/forms/contact/route.ts"), /status:\s*503/);
  assert.match(read("src/app/api/donations/checkout/route.ts"), /status:\s*503/);
});
