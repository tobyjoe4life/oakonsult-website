import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  nigeriaTeamMembers,
  officialUkTrusteeNames,
  regionDisplayName,
  teamByBoardJurisdiction,
  teamByRegion,
  teamBySlug,
  teamInitials,
  teamMembers,
  teamProfileStaticParams,
  ukTeamMembers,
  ukTrustees,
} from "../src/lib/team.ts";

const root = join(import.meta.dirname, "..");

test("team directory uses unique slugs and names", () => {
  const slugs = teamMembers.map((member) => member.slug);
  const names = teamMembers.map((member) => member.name);
  assert.equal(new Set(slugs).size, slugs.length, "team slugs must be unique");
  assert.equal(new Set(names).size, names.length, "team names must be unique");
  for (const slug of slugs) assert.match(slug, /^[a-z0-9]+(?:-[a-z0-9]+)*$/, `slug must be url-safe: ${slug}`);
});

test("team directory contains exactly the twelve current people", () => {
  assert.equal(teamMembers.length, 12);
  assert.equal(ukTeamMembers.length, 6);
  assert.equal(nigeriaTeamMembers.length, 6);
});

test("static profile parameters exactly match the canonical team slugs", () => {
  assert.deepEqual(
    teamProfileStaticParams().map(({ slug }) => slug).sort(),
    teamMembers.map(({ slug }) => slug).sort(),
  );
});

test("every person is assigned to exactly one region and grouping is correct", () => {
  for (const member of teamMembers) {
    assert.ok(member.region === "uk" || member.region === "nigeria", `${member.slug} must have a valid region`);
  }
  assert.deepEqual([...ukTeamMembers].every((member) => member.region === "uk"), true);
  assert.deepEqual([...nigeriaTeamMembers].every((member) => member.region === "nigeria"), true);
});

test("Omobola Oludele is in Nigeria, not the United Kingdom", () => {
  const omobola = teamBySlug("omobola-oludele");
  assert.ok(omobola, "Omobola Oludele must exist in the directory");
  assert.equal(omobola.region, "nigeria");
  assert.equal(omobola.role, "Learning and Development Manager, Nigeria");
  assert.ok(!ukTeamMembers.some((member) => member.slug === "omobola-oludele"), "Omobola must never appear on the UK team");
});

test("Dayo Balogun follows the current Nigeria workforce structure", () => {
  const dayo = teamBySlug("dayo-balogun");
  assert.ok(dayo, "Dayo Balogun must exist in the directory");
  assert.equal(dayo.region, "nigeria");
  assert.equal(dayo.operationalRemit, "nigeria");
  assert.ok(!ukTeamMembers.some((member) => member.slug === "dayo-balogun"), "Dayo must not remain in the UK directory");
});

test("the UK trustee roster matches the official Charity Commission register exactly", () => {
  assert.deepEqual(
    [...officialUkTrusteeNames].sort(),
    ["Ajisola Adeola Adeloye", "Bolanle Alice Ajayi", "Hadiza Daura", "Lucky Sanni Aigbefoh", "Modupe Olubunmi Soji-Adeyemo"].sort(),
  );
  assert.equal(ukTrustees.length, 5);
  for (const trustee of ukTrustees) {
    assert.equal(trustee.region, "uk", `${trustee.name} must be in the UK`);
    assert.equal(trustee.group, "trustee", `${trustee.name} must be grouped as trustee`);
  }
  const olufunke = teamBySlug("olufunke-adeloye");
  assert.ok(olufunke && !officialUkTrusteeNames.includes(olufunke.name as (typeof officialUkTrusteeNames)[number]), "Olufunke is CEO, not a current trustee");
});

test("verified names are used, including full forms and familiar names", () => {
  assert.equal(teamBySlug("modupe-olubunmi-soji-adeyemo")?.name, "Modupe Olubunmi Soji-Adeyemo");
  assert.equal(teamBySlug("modupe-olubunmi-soji-adeyemo")?.familiarName, "Bunmi");
  assert.equal(teamBySlug("ajisola-adeloye")?.name, "Ajisola Adeola Adeloye");
  assert.equal(teamBySlug("ajisola-adeloye")?.familiarName, "Aji");
  assert.equal(teamBySlug("itunuade-iyun")?.name, "Itunuade Iyun");
  assert.ok(!teamMembers.some((member) => /Itunade\b/.test(member.name)), "the older misspelling Itunade must not be used");
});

test("current approved biographies replace the disputed staging career histories", () => {
  const ajisola = JSON.stringify(teamBySlug("ajisola-adeloye"));
  const modupe = JSON.stringify(teamBySlug("modupe-olubunmi-soji-adeyemo"));
  const hadiza = JSON.stringify(teamBySlug("hadiza-daura"));
  const lucky = JSON.stringify(teamBySlug("lucky-sanni-aigbefoh"));
  const itunuade = JSON.stringify(teamBySlug("itunuade-iyun"));
  const oshin = teamBySlug("oshin-hannah-oluwafunmilayo");

  assert.match(ajisola, /Church of England priest/i);
  assert.match(ajisola, /real estate and facilities management/i);
  assert.match(modupe, /Nurse Practitioner/i);
  assert.match(hadiza, /Cooperative Management/i);
  assert.match(lucky, /Certified Scrum Master/i);
  assert.match(itunuade, /International Law and Diplomacy/i);
  assert.equal(oshin?.role, "Nigeria trustee");

  const serialised = JSON.stringify(teamMembers);
  for (const unsupported of [
    /preventable medical error/i,
    /MPhil in Theology/i,
    /founding Registrar/i,
    /32 years of service to the seminary/i,
    /broadcast media/i,
    /Sky TV/i,
    /Buckingham Palace/i,
    /Foreign and Commonwealth Office/i,
    /more than 30 years in the NHS/i,
    /PwC/i,
    /Chief Financial Officer/i,
    /ACCA/i,
    /Modern Montessori/i,
    /Five Hearts Siblings/i,
    /21 years of teaching/i,
  ]) {
    assert.doesNotMatch(serialised, unsupported, `team data must not retain unsupported copy matching ${unsupported}`);
  }
});

test("board jurisdiction, operational remit and public directory grouping are separate facts", () => {
  for (const member of teamMembers) {
    assert.ok(["uk", "nigeria", "cross-regional"].includes(member.operationalRemit), `${member.slug} needs an operational remit`);
  }
  for (const trustee of ukTrustees) assert.equal(trustee.boardJurisdiction, "uk");
  assert.equal(teamBySlug("olufunke-adeloye")?.operationalRemit, "cross-regional");
  assert.equal(teamBySlug("bolanle-alice-ajayi")?.operationalRemit, "cross-regional");
  assert.equal(teamBySlug("oshin-hannah-oluwafunmilayo")?.boardJurisdiction, "nigeria");
  assert.deepEqual(teamByBoardJurisdiction("uk").map((member) => member.name).sort(), [...officialUkTrusteeNames].sort());
});

test("every profile carries mandatory factual fields", () => {
  for (const member of teamMembers) {
    assert.ok(member.name.length > 2, `${member.slug} needs a name`);
    assert.ok(member.role.length > 2, `${member.slug} needs a role`);
    assert.ok(member.summary.length >= 40, `${member.slug} needs a substantive summary`);
    assert.ok(Array.isArray(member.biography) && member.biography.length >= 2, `${member.slug} needs at least two biography sections`);
    for (const section of member.biography) {
      assert.ok(section.eyebrow.length > 1, `${member.slug} biography section needs an eyebrow`);
      assert.ok(section.title.length > 1, `${member.slug} biography section needs a title`);
      assert.ok(section.paragraphs.every((paragraph) => paragraph.length >= 40), `${member.slug} biography paragraphs must be substantive`);
    }
    assert.ok(member.related.length >= 2, `${member.slug} needs related team links`);
    for (const link of member.related) assert.match(link.href, /^\//, `${member.slug} related links must be first-party`);
    assert.ok(member.ctaTitle.length > 3 && member.ctaText.length > 3, `${member.slug} needs a contact route`);
  }
});

test("no sensitive or private fields are published on profiles", () => {
  const prohibited = [/email/i, /@oakonsult\.org/i, /gmail\.com/i, /phone/i, /\b\d{2}[ /.-]\d{2}[ /.-]\d{4}\b/, /date of birth/i, /born on/i, /married/i, /children's details/i];
  for (const member of teamMembers) {
    const serialised = JSON.stringify(member);
    for (const pattern of prohibited) {
      assert.doesNotMatch(serialised, pattern, `${member.slug} must not expose sensitive data matching ${pattern}`);
    }
  }
});

test("no prohibited copy or process leakage appears in team data", () => {
  const leak = [/sharepoint/i, /whatsapp/i, /meeting minutes/i, /minutes for leadership/i, /prompt/i, /chatgpt/i, /kimi/i, /codex/i, /\bAI\b/, /source conflict/i, /evidence file/i, /as an ai/i, /language model/i];
  for (const member of teamMembers) {
    const serialised = JSON.stringify(member);
    for (const pattern of leak) {
      assert.doesNotMatch(serialised, pattern, `${member.slug} must not leak internal process language matching ${pattern}`);
    }
  }
});

test("every public team profile uses a source-attributed portrait", () => {
  const withImages = teamMembers.filter((member) => member.image);
  const withoutImages = teamMembers.filter((member) => !member.image);
  for (const member of withImages) {
    assert.ok(existsSync(join(root, "public", member.image!.src)), `${member.slug} portrait must exist at public${member.image!.src}`);
    assert.match(member.image!.src, /^\/images\/team\/[a-z0-9-]+\.webp$/, `${member.slug} portrait must be an optimised webp in /images/team`);
    assert.ok(member.image!.alt.length > 10, `${member.slug} portrait needs meaningful alt text`);
    assert.doesNotMatch(member.image!.alt, /zoom|grid|screenshot/i, `${member.slug} alt must not reference the Zoom-grid screenshot`);
  }
  assert.equal(withImages.length, 12, "all twelve public profiles should carry their current source-attributed portrait");
  assert.deepEqual(withoutImages, [], "no public profile should fall back to a monogram while an attributed portrait is available");
});

test("region display names and initials helper behave predictably", () => {
  assert.equal(regionDisplayName("uk"), "United Kingdom");
  assert.equal(regionDisplayName("nigeria"), "Nigeria");
  assert.equal(teamInitials("Itunuade Iyun"), "II");
  assert.equal(teamInitials("Esther Aderike Kehinde"), "EA");
  assert.equal(teamInitials("Boluwatife Kehinde"), "BK");
});

test("team lookup helpers resolve consistently", () => {
  assert.equal(teamBySlug("olufunke-adeloye")?.role, "Co-founder and Chief Executive Officer");
  assert.equal(teamBySlug("itunuade-iyun")?.role, "Country Director, Nigeria");
  assert.equal(teamByRegion("uk").length, 6);
  assert.equal(teamByRegion("nigeria").length, 6);
  assert.equal(teamBySlug("not-a-person"), undefined);
});
