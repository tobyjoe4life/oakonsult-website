import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import type { Buffer } from "node:buffer";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const HERO = "abigail-at-fourteen.webp";
const GALLERY = [
  "abigail-award-moment.webp",
  "baby-abigail-2008.webp",
  "abigail-early-years.webp",
  "abigail-2015.webp",
  "abigail-face-paint-2014.webp",
  "abigail-outdoor-play.webp",
  "abigail-with-family.webp",
  "abigail-sixteenth-birthday.webp",
  "abigail-life-in-colour.webp",
  "abigail-memorial-corner.webp",
];
const ORIGINAL_FILENAMES = [
  "Abigail @14 Yrs.JPG",
  "THE-STAR-ABIGAIL-1-scaled-1.jpg",
  "Baby Abigail 2008.jpg",
  "ABIGAIL 5.jpg",
  "Cool Abigail 2015.jpg",
  "Pretty Abigail 2014.jpg",
  "ABIGAIL.jpg",
  "Abigail and Mum.jpg",
  "Abigail- Last birthday on earth.jpg",
  "Abigai loving her colors!.JPG",
  "OLUWATOYITAN Abigail Memorial Corner.jpg",
];

const webpSize = (buffer: Buffer) => {
  const chunk = buffer.subarray(12, 16).toString("ascii");
  if (chunk === "VP8X") {
    return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  }
  if (chunk === "VP8L") {
    const b = buffer.subarray(21, 25);
    return {
      width: 1 + (((b[1] & 0x3f) << 8) | b[0]),
      height: 1 + (((b[3] & 0x0f) << 10) | (b[2] << 2) | ((b[1] & 0xc0) >> 6)),
    };
  }
  return { width: buffer.readUInt16LE(26) & 0x3fff, height: buffer.readUInt16LE(28) & 0x3fff };
};

test("the Abigail page uses the real Abigail portrait as hero, not architecture", () => {
  const page = read("src/app/abigail/page.tsx");
  const data = read("src/lib/abigail-tribute.ts");
  assert.match(data, new RegExp(`/images/abigail/${HERO.replace(".", "\\.")}`));
  assert.match(page, /abigailHero/);
  assert.doesNotMatch(page, /children-accommodation\.jpg/);
  assert.doesNotMatch(page, /Architectural vision/);
});

test("the tribute gallery data carries all ten supporting images with unique sources, alt text and captions", () => {
  const data = read("src/lib/abigail-tribute.ts");
  const galleryAt = data.indexOf("abigailTributeGallery");
  assert.ok(galleryAt > -1, "abigailTributeGallery data export missing");
  const block = data.slice(galleryAt);
  const entries = [...block.matchAll(/src:\s*"\/images\/abigail\/([^"]+)",\s*\n?\s*alt:\s*"([^"]+)",\s*\n?\s*caption:\s*"([^"]+)"/g)];
  assert.equal(entries.length, 10, `expected exactly 10 supporting images, found ${entries.length}`);
  const names = entries.map((entry) => entry[1]);
  assert.equal(new Set(names).size, names.length, "gallery sources must be unique");
  for (const expected of GALLERY) assert.ok(names.includes(expected), `gallery missing ${expected}`);
  for (const entry of entries) {
    assert.ok(entry[2].trim().length > 0, `${entry[1]} needs non-empty alt text`);
    assert.ok(entry[3].trim().length > 0, `${entry[1]} needs a non-empty caption`);
  }
  assert.ok(!names.includes(HERO), "the hero source must not repeat inside the supporting gallery");
});

test("the editorial shell supports an explicit tribute gallery variant without changing shared journals", () => {
  const shell = read("src/components/EditorialDetailPage.tsx");
  assert.match(shell, /data\.gallery/);
  assert.match(shell, /TributeGallery/);
  assert.match(shell, /supportingPhotos = /, "shared three-image journal logic must be preserved");
  assert.match(shell, /priority/, "hero image stays priority-loaded");
  const types = read("src/lib/editorial-pages.ts");
  assert.match(types, /gallery\?:/);
});

test("the gallery renders semantic figures with captions and a discoverable open invitation", () => {
  const component = read("src/components/TributeGallery.tsx");
  assert.match(component, /<figure/);
  assert.match(component, /<figcaption>/);
  assert.match(component, /tribute-tile-open[\s\S]*?Open image/, "visible 'Open image' invitation missing");
  assert.match(component, /aria-label=\{`Open image \$\{/);
  assert.match(component, /tribute-mosaic/);
  assert.match(component, /sizes=/);
  assert.doesNotMatch(component, /priority/, "gallery images should lazy-load, never priority");
});

test("the viewer is an accessible dialog with keyboard, focus and scroll management", () => {
  const component = read("src/components/TributeGallery.tsx");
  assert.match(component, /role="dialog"/);
  assert.match(component, /aria-modal="true"/);
  assert.match(component, /aria-label="Close image viewer"/);
  assert.match(component, /aria-label="Previous image"/);
  assert.match(component, /aria-label="Next image"/);
  assert.match(component, /"Escape"/);
  assert.match(component, /"ArrowLeft"/);
  assert.match(component, /"ArrowRight"/);
  assert.match(component, /document\.body\.style\.overflow = "hidden"/, "page scroll must be locked behind the dialog");
  assert.match(component, /event\.target === event\.currentTarget/, "backdrop click should close the viewer");
  assert.match(component, /aria-live="polite"/, "viewer position updates must be announced to assistive technology");
  assert.match(component, /\{active \+ 1\} of \{images\.length\}/, "visible x of 10 position indicator");
  const focusReturns = /triggerRefs\.current\[/.test(component) && /\.focus\(\)/.test(component);
  assert.ok(focusReturns, "focus must move into the dialog and return to the triggering tile on close");
});

test("the static gallery baseline renders unconditionally before the dialog enhancement", () => {
  const component = read("src/components/TributeGallery.tsx");
  const mosaicAt = component.indexOf("tribute-mosaic");
  const dialogGate = component.indexOf("{active !== null && current && (");
  assert.ok(mosaicAt > -1, "mosaic markup missing");
  assert.ok(dialogGate > mosaicAt, "the static mosaic must render unconditionally; only the dialog is gated");
});

test("tribute gallery styling lives in the premium layer with focus and reduced-motion safety", () => {
  const css = read("src/app/premium-v6.css");
  assert.match(css, /\.tribute-mosaic/);
  assert.match(css, /\.tribute-lightbox[^\{]*\{/);
  assert.match(css, /@media \(max-width: 760px\)[\s\S]*\.tribute-lightbox-stage img\s*\{[^}]*object-position:\s*center bottom/, "mobile lightbox must keep landscape images visually connected to their captions");
  assert.match(css, /\.tribute-lightbox[^{]*:focus-visible|\.tribute-lightbox button:focus-visible/);
  assert.match(css, /\.tribute-tile-button:focus-visible/);
  const openRule = css.match(/\.tribute-tile-open[^{]*\{[^}]*\}/);
  assert.ok(openRule, "open invitation styling missing");
  assert.doesNotMatch(openRule[0], /border-radius:\s*999px|border-radius:\s*50/, "the open invitation must not be a pill");
  const reduced = (css.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g) ?? []).join("\n");
  assert.match(reduced, /tribute/, "the reduced-motion block must cover tribute gallery animation");
});

test("the gallery addition preserves the verified tribute narrative", () => {
  const page = read("src/app/abigail/page.tsx");
  assert.match(page, /Never defined by a diagnosis\./);
  assert.match(page, /At 18 months, Abigail sustained profound brain damage following medical mismanagement in Nigeria\./);
  assert.match(page, /repeatedly survived life-threatening illness\./);
  assert.match(page, /It honours Abigail as a whole person, not a diagnosis/);
});

test("new gallery copy avoids private sources, process language, grief shorthand and em dashes", () => {
  const copy = read("src/lib/abigail-tribute.ts");
  const forbidden: [RegExp, string][] = [
    [/last birthday/i, "grief shorthand kept out of public copy"],
    [/sharepoint|onedrive|graph\.microsoft/i, "private source reference"],
    [/approv|staging review|sign[- ]?off/i, "internal approval language"],
    [/kimi|claude|gpt|codex|openai|\bllm\b|prompt/i, "model or prompt language"],
    [/—|–/, "em or en dash"],
  ];
  for (const [pattern, label] of forbidden) {
    assert.doesNotMatch(copy, pattern, `forbidden ${label} in public gallery copy: ${pattern}`);
  }
});

test("all selected assets exist under public/images/abigail as right-sized WebP files", () => {
  for (const name of [HERO, ...GALLERY]) {
    const path = join(root, "public", "images", "abigail", name);
    assert.ok(existsSync(path), `missing asset public/images/abigail/${name}`);
    const buffer = readFileSync(path) as Buffer;
    assert.equal(buffer.subarray(0, 4).toString("ascii"), "RIFF", `${name} is not a RIFF container`);
    assert.equal(buffer.subarray(8, 12).toString("ascii"), "WEBP", `${name} is not WebP`);
    const { width, height } = webpSize(buffer);
    const longest = Math.max(width, height);
    assert.ok(longest >= 600 && longest <= 2200, `${name} longest side ${longest}px outside the 600-2200px premium window`);
  }
});

test("the provenance note records every asset and source without private identifiers", () => {
  const note = read("docs/media-provenance/abigail-tribute-gallery.md");
  for (const name of [HERO, ...GALLERY]) assert.ok(note.includes(name), `provenance missing output asset ${name}`);
  for (const original of ORIGINAL_FILENAMES) assert.ok(note.includes(original), `provenance missing original filename ${original}`);
  assert.match(note, /staging review only/i);
  assert.match(note, /publication confirmation/i);
  assert.match(note, /WordPress/);
  assert.doesNotMatch(note, /sharepoint\.com|graph\.microsoft|onedrive\.live|access_?token|bearer\s+[a-z0-9._-]+|[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i, "provenance must not contain private URLs, tokens or Graph item IDs");
});
