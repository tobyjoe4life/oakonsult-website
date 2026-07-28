import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("media pages keep only one concise introduction and do not repeat the chapter summaries", () => {
  const page = read("src/components/GalleryPage.tsx");
  const gallery = read("src/components/PictureBookGallery.tsx");

  assert.doesNotMatch(page, /galleryBookChapters|picture-book-gateway|Inside the books|Two picture books, one story of support/i);
  assert.doesNotMatch(gallery, /A book to browse slowly|Scroll through each chapter|heart control|saved on this device|Photographs you like/i);
});

test("gallery chapter introductions and captions stay concise", () => {
  const data = read("src/lib/gallery.ts");
  const introductions = [...data.matchAll(/intro:\s*\n?\s*"([^"]+)"/g)].map((match) => match[1]);
  const captions = [...data.matchAll(/caption:\s*"([^"]+)"/g)].map((match) => match[1]);
  assert.equal(introductions.length, 7);
  assert.equal(captions.length, 43);

  for (const introduction of introductions) {
    assert.ok(introduction.split(/\s+/).length <= 15, `chapter introduction is too long: ${introduction}`);
  }
  for (const caption of captions) {
    assert.ok(caption.split(/\s+/).length <= 16, `gallery caption is too long: ${caption}`);
  }
});

test("public copy avoids prompt leakage and formulaic AI language", () => {
  const publicCopy = [
    read("src/components/GalleryPage.tsx"),
    read("src/components/PictureBookGallery.tsx"),
    read("src/lib/gallery.ts"),
    read("src/lib/team.ts"),
  ].join("\n");

  assert.doesNotMatch(publicCopy, /\b(?:ChatGPT|OpenAI|Claude|Kimi|AI-generated|model-generated|prompt leak)\b/i);
  assert.doesNotMatch(publicCopy, /\b(?:serves as|stands as|at its core|the real question is|vibrant|pivotal|testament|tapestry|showcasing)\b/i);
  assert.doesNotMatch(publicCopy, /—/);
});
