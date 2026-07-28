import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const galleryRoot = join(root, "public", "images", "gallery-book");
const regionFiles = (region: "uk" | "nigeria") =>
  readdirSync(join(galleryRoot, region))
    .filter((name) => name.endsWith(".webp"))
    .sort();

test("the picture book ships a comprehensive, optimised UK and Nigeria media set", () => {
  const uk = regionFiles("uk");
  const nigeria = regionFiles("nigeria");
  assert.equal(uk.length, 22, "UK picture book must retain the 22 consent-aware selections");
  assert.equal(nigeria.length, 21, "Nigeria picture book must retain the 21 consent-aware selections");

  for (const region of ["uk", "nigeria"] as const) {
    for (const name of regionFiles(region)) {
      const path = join(galleryRoot, region, name);
      const bytes = statSync(path).size;
      assert.ok(bytes >= 40_000, `${relative(root, path)} is unexpectedly tiny or broken`);
      assert.ok(bytes <= 900_000, `${relative(root, path)} is too large for the scrolling gallery`);
    }
  }
});

test("every curated asset is represented exactly once in the typed gallery data", () => {
  const data = read("src/lib/gallery.ts");
  for (const region of ["uk", "nigeria"] as const) {
    for (const name of regionFiles(region)) {
      const source = `/images/gallery-book/${region}/${name}`;
      assert.equal(data.split(source).length - 1, 1, `${source} must appear exactly once in gallery data`);
    }
  }
  assert.match(data, /alt:\s*"[^"]+"/);
  assert.match(data, /caption:\s*"[^"]+"/);
  assert.doesNotMatch(data, /alt:\s*"(?:image|photo|gallery)"/i);
});

test("UK and Nigeria remain separate editorial picture books with meaningful chapters", () => {
  const data = read("src/lib/gallery.ts");
  for (const chapter of [
    "Learning together",
    "Wellbeing in motion",
    "Recognition and partnership",
    "Community outreach",
    "Public awareness",
    "Building for the future",
    "Medical outreach",
  ]) {
    assert.match(data, new RegExp(chapter));
  }
  const ukPage = read("src/app/media-gallery/uk/page.tsx");
  const nigeriaPage = read("src/app/media-gallery/nigeria/page.tsx");
  assert.match(ukPage, /region="UK"/);
  assert.match(nigeriaPage, /region="Nigeria"/);
});

test("the gallery is an accessible progressive-enhancement picture book, not a card grid", () => {
  const componentPath = join(root, "src", "components", "PictureBookGallery.tsx");
  assert.ok(existsSync(componentPath), "PictureBookGallery client component is required");
  const component = read("src/components/PictureBookGallery.tsx");
  assert.match(component, /^"use client";/);
  assert.match(component, /aria-pressed=/);
  assert.match(component, /type="button"/);
  assert.match(component, /localStorage/);
  assert.match(component, /role="dialog"|<dialog/);
  assert.match(component, /Escape/);
  assert.match(component, /aria-label=/);
  assert.doesNotMatch(component, /Math\.random|fake|globalLikes|likeCount/i, "do not invent public like counts");
});

test("picture-book styling is editorial, responsive and reduced-motion safe", () => {
  const component = read("src/components/PictureBookGallery.tsx");
  const classes = [...component.matchAll(/className="([^"]*picture-book[^"]*)"/g)];
  assert.ok(classes.length >= 3, "picture-book class contract is missing");
  const premium = read("src/app/premium-v6.css");
  assert.match(premium, /\.picture-book/);
  assert.match(premium, /scroll-snap|position:\s*sticky/);
  assert.match(premium, /\.picture-book-figure\[data-prominence="portrait"\]:nth-of-type\(odd\)\s*\{\s*grid-column:\s*2\s*\/\s*span\s+5;/);
  assert.doesNotMatch(premium, /\.picture-book-figure\[data-prominence="portrait"\]:nth-of-type\(odd\)\s*\{\s*grid-column-start:/);
  const favouriteBlock = premium.match(/\.picture-book-favourite\s*\{[\s\S]*?\}/)?.[0] ?? "";
  assert.doesNotMatch(favouriteBlock, /border-radius:\s*999px/);
  assert.match(premium, /@media\s*\(prefers-reduced-motion:\s*reduce\)/);
  assert.doesNotMatch(component, /0\{index\s*\+\s*1\}|padStart\s*\(/, "decorative sequence numbers are prohibited");
});
