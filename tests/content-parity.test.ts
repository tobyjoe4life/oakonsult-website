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
  const footer = `${read("src/components/SiteFooter.tsx")}\n${read("src/lib/site-navigation.ts")}`;
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

test("programme directory follows the regional UK and Nigeria journeys", () => {
  const programmes = read("src/app/what-we-do/page.tsx");
  const uk = read("src/app/uk/page.tsx");
  for (const phrase of ["UK programmes", "Nigeria programmes", "Shared and online support"])
    assert.match(programmes, new RegExp(phrase, "i"));
  for (const href of [
    "/programmes/parent-carer-support",
    "/programmes/project-me",
    "/zumba-class",
    "/programmes/support-for-churches",
    "/programmes/oak-centre-prime",
    "/media-gallery/nigeria",
  ]) assert.match(programmes, new RegExp(href.replaceAll("/", "\\/")));
  assert.match(uk, /title: "Zumba wellbeing"/i);
  assert.match(uk, /href: "\/zumba-class"/);
});

test("forms stay with their relevant programme, support and participation journeys", () => {
  const formsPath = path.join(root, "src/app/forms/page.tsx");
  assert.equal(existsSync(formsPath), false);

  const involved = read("src/app/get-involved/page.tsx");
  assert.match(involved, /href: "\/volunteer-opportunities"/);
  assert.match(involved, /href: "\/partnerships"/);
  assert.match(involved, /href: "\/donate"/);
  assert.match(involved, /href: "\/jobs\/zumba-group-coordinator"/);
  assert.doesNotMatch(involved, /href: "\/forms"/);

  const programmes = read("src/app/what-we-do/page.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  const editorialPages = read("src/lib/editorial-pages.ts");
  const oakCentre = read("src/app/programmes/oak-centre-prime/page.tsx");
  const events = read("src/app/events/page.tsx");
  const zumba = read("src/app/zumba-class/page.tsx");
  assert.doesNotMatch(programmes, /\/forms|Forms and registrations/);
  assert.doesNotMatch(footer, /\/forms|Forms & registrations|\["Zumba", "\/zumba-class"\]/);
  assert.match(editorialPages, /ctaHref: "\/projectme"/);
  assert.match(editorialPages, /ctaHref: "\/partnerships"/);
  assert.match(oakCentre, /\/donate\?purpose=oak-centre/);
  assert.match(events, /\/zumba-class/);
  assert.match(events, /\/zumba-wellbeing/);
  assert.match(zumba, /\/zumba-wellbeing/);
});

test("internal programme and story links use first-party routes without avoidable redirect hops", () => {
  const history = read("src/app/history/page.tsx");
  const vision = read("src/app/vision-mission/page.tsx");
  assert.match(history, /href: "\/programmes\/support-for-churches"/);
  assert.doesNotMatch(history, /href: "\/programmes\/churches"/);
  assert.match(vision, /href: "\/stories"/);
  assert.doesNotMatch(vision, /href: "\/talking-faith-for-parent-carers"/);
});

test("legacy donation campaigns retain their intended purpose", () => {
  const contract = read("src/lib/legacy-route-contract.ts");
  const form = read("src/components/DonationForm.tsx");
  const options = read("src/lib/donation-options.ts");
  assert.match(contract, /\/donate\?purpose=oak-centre/);
  assert.match(contract, /\/donate\?purpose=parent-carer/);
  assert.match(contract, /\/donate\?purpose=project-me/);
  assert.match(options, /"parent-carer": "Parent-carer support"/);
  assert.match(form, /initialPurpose/);
});
