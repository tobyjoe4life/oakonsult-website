import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import test from "node:test";
import path from "node:path";

const root = process.cwd();
const read = (relative: string) => readFileSync(path.join(root, relative), "utf8");

const requiredLegacyPaths = [
  "/about-us",
  "/vision-mission",
  "/history",
  "/our-team",
  "/partners-supporters",
  "/annual-reports-impact",
  "/programs-services",
  "/uk-programs",
  "/nigeria-programs",
  "/get-involved",
  "/volunteer-opportunities",
  "/fundraising",
  "/partnerships",
  "/learning-platform",
  "/blog-news-stories",
  "/contact-us",
  "/oak-centre-prime",
  "/oak-centre",
  "/projectme",
  "/support-for-parent-carers",
  "/support-for-churches",
  "/job-openings",
  "/uk-media-gallery",
  "/nigeria-media-gallery",
  "/nigeria-about-us",
  "/nigeria-volunteer-opportunities",
  "/zumba-class",
  "/zumba-wellbeing",
  "/uk-funders-partners",
  "/nigeria-funders-partners",
  "/nigeria-community-support",
  "/talking-faith-for-parent-carers",
  "/january-june-2026-impact-highlights",
];

test("About, founding history and Abigail's tribute are permanent first-class journeys", () => {
  const about = read("src/app/about/page.tsx");
  const story = read("src/app/our-story/page.tsx");
  const abigail = read("src/app/abigail/page.tsx");

  assert.match(about, /Who we are/i);
  assert.match(about, /Our story/i);
  assert.match(about, /History/i);
  assert.match(about, /Abigail/i);
  assert.match(story, /From crisis to calling/i);
  assert.match(story, /2010/);
  assert.match(story, /2021/);
  assert.match(abigail, /Abigail/i);
  assert.match(abigail, /2008/);
  assert.match(abigail, /2024/);
  assert.match(abigail, /OAK Centre Prime/i);
});

test("OAK Centre Prime preserves the ground-breaking and public architectural vision", () => {
  const page = read("src/app/programmes/oak-centre-prime/page.tsx");
  for (const phrase of ["Groundbreaking", "Oolo Town", "Abigail", "architectural", "community hall", "health centre"])
    assert.match(page, new RegExp(phrase, "i"));

  const images = ["masterplan", "administration", "health-centre", "community-centre", "children-accommodation", "entrance-gate"];
  for (const image of images)
    assert.equal(existsSync(path.join(root, `public/images/oak-centre-prime/${image}.jpg`)), true, `${image}.jpg must be versioned`);
});

test("social media is a visible, verified website journey", () => {
  const social = read("src/app/social/page.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  for (const phrase of ["The Praying Carer Channel", "From a Whisper to a Movement", "Facebook", "LinkedIn", "YouTube"])
    assert.match(social, new RegExp(phrase, "i"));
  assert.match(social, /8p--mGxHwTM/);
  assert.match(footer, /\/social/);
});

test("all public-facing legacy forms have an equivalent reviewed form journey", () => {
  const forms = read("src/lib/public-form-definitions.ts");
  for (const id of ["volunteer", "partnership-referral", "project-me-interest", "zumba-registration", "zumba-wellbeing", "job-application"])
    assert.match(forms, new RegExp(id));
  for (const field of ["preferredSession", "wellbeingRating", "caregivingRole", "supportNeeded", "privacy", "consent"])
    assert.match(forms, new RegExp(field));
  assert.equal(existsSync(path.join(root, "src/app/zumba-class/page.tsx")), true);
  assert.equal(existsSync(path.join(root, "src/app/zumba-wellbeing/page.tsx")), true);
});

test("legacy route contract accounts for the public production journeys", () => {
  const contract = read("src/lib/legacy-route-contract.ts");
  for (const legacyPath of requiredLegacyPaths) assert.match(contract, new RegExp(legacyPath.replaceAll("/", "\\/")));
  assert.match(contract, /a-legacy-of-hope-help-us-build-oak-centre-prime/);
  assert.match(contract, /medical-outreach-children-young-people-disabilities-april-2026/);
  assert.match(contract, /bromley-send-local-offer/);
});

test("events point to dedicated Zumba registration and wellbeing pages", () => {
  const events = read("src/app/events/page.tsx");
  assert.match(events, /\/zumba-class/);
  assert.match(events, /\/zumba-wellbeing/);
});
