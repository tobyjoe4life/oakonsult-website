import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

const read = (file: string) => readFileSync(`${process.cwd()}/${file}`, "utf8");

const events = read("src/app/events/page.tsx");
const detail = read("src/components/EditorialDetailPage.tsx");
const utility = read("src/components/UtilityPage.tsx");

test("events use the verified Zumba schedule", () => {
  assert.match(events, /3rd Mondays, 11:45am to 12:45pm/);
  assert.match(events, /3rd Thursdays, 7:30pm to 8:30pm/);
  assert.doesNotMatch(events, /6:30 pm|fourth Fridays|12:00 pm/);
});

test("detail pages do not repeat the hero in their photo journal", () => {
  assert.match(detail, /supportingPhotos = data\.photos\.filter/);
  assert.match(detail, /supportingPhotos\.map/);
  assert.doesNotMatch(detail, /data\.photos\.map/);
});

test("utility pages use the branded editorial system", () => {
  assert.match(utility, /HomeMotion/);
  assert.match(utility, /oak-home editorial-page utility-page/);
  for (const page of ["accessibility", "privacy"]) {
    const source = read(`src/app/${page}/page.tsx`);
    assert.match(source, /UtilityPage/);
    assert.doesNotMatch(source, /page-title shell prose/);
  }
});

test("public copy contains no rebuild or approval-process leakage", () => {
  const pages = ["history", "our-team", "sierra-leone"];
  const leak = /website rebuild|approved organisational|current public website|publicly verified|regional team has approved/i;
  for (const page of pages) assert.doesNotMatch(read(`src/app/${page}/page.tsx`), leak);
});

test("privacy copy does not expose internal review or release-stage language", () => {
  const privacy = read("src/app/privacy/page.tsx");
  assert.doesNotMatch(privacy, /private review site|full live-site|development site/i);
});

test("public forms use clean visitor-facing preview language", () => {
  const form = read("src/components/PublicInterestForm.tsx");
  const donation = read("src/components/DonationForm.tsx");
  assert.match(form, /<strong>Preview only<\/strong>/);
  assert.doesNotMatch(form, /Private staging preview|being connected to OAKonsult.s reviewed submission service/i);
  assert.match(donation, /When donations are enabled, payment will be handled by/);
  assert.doesNotMatch(donation, /on the live website/i);
});

test("about promotes confirmed regional and shared journeys only", () => {
  const about = read("src/app/about/page.tsx");
  assert.match(about, /Shared and online support/);
  assert.doesNotMatch(about, /developing Sierra Leone journey/);
});

test("homepage does not repeat editorial photographs within the same page", () => {
  const homepage = read("src/app/page.tsx");
  const gallery = read("src/lib/gallery.ts");
  assert.equal(homepage.match(/zumba-group\.webp/g)?.length, 1);
  assert.doesNotMatch(gallery, /homepageGallery\s*=\s*\[[\s\S]*galleryItems\[3\]/);
});

test("programme directory carries distinct authentic regional photography", () => {
  const page = read("src/app/what-we-do/page.tsx");
  const css = read("src/app/interior-v5.css");
  assert.match(page, /uk-project-me-session\.webp/);
  assert.match(page, /nigeria-oolo-palace\.webp/);
  assert.match(page, /programme-region-photo/);
  assert.match(css, /\.programme-region-photo/);
});

test("contact keeps its safety gates inside a branded image-led journey", () => {
  const page = read("src/app/contact/page.tsx");
  assert.match(page, /oak-home editorial-page contact-editorial-page/);
  assert.match(page, /HomeMotion/);
  assert.match(page, /current-site-community-partnership\.webp/);
  assert.match(page, /Nothing you enter is sent or stored/);
});

test("new evidence panels meet contrast requirements", () => {
  const home = read("src/app/home-v4.css");
  const interior = read("src/app/interior-v5.css");
  assert.match(home, /oak-impact-stat\.stat-3 \{ color: var\(--oak-forest\)/);
  assert.match(interior, /editorial-action-band p:not\([^)]*\) \{[\s\S]*?color: #fff/);
  assert.match(interior, /impact-action-band p:not\([^)]*\) \{[^}]*color:#fff/);
});