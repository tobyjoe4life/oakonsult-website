import test from "node:test";
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { join } from "node:path";
import {
  nigeriaTeamMembers,
  officialUkTrusteeNames,
  regionDisplayName,
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
  assert.equal(ukTeamMembers.length, 7);
  assert.equal(nigeriaTeamMembers.length, 5);
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

test("only verified portraits are referenced, and monograms cover the rest", () => {
  const withImages = teamMembers.filter((member) => member.image);
  const withoutImages = teamMembers.filter((member) => !member.image);
  for (const member of withImages) {
    assert.ok(existsSync(join(root, "public", member.image!.src)), `${member.slug} portrait must exist at public${member.image!.src}`);
    assert.match(member.image!.src, /^\/images\/team\/[a-z0-9-]+\.webp$/, `${member.slug} portrait must be an optimised webp in /images/team`);
    assert.ok(member.image!.alt.length > 10, `${member.slug} portrait needs meaningful alt text`);
    assert.doesNotMatch(member.image!.alt, /zoom|grid|screenshot/i, `${member.slug} alt must not reference the Zoom-grid screenshot`);
  }
  assert.deepEqual(
    withoutImages.map((member) => member.slug).sort(),
    ["boluwatife-kehinde", "esther-aderike-kehinde", "itunuade-iyun"],
    "only Itunuade, Esther and Boluwatife should use the monogram treatment",
  );
  for (const member of withoutImages) assert.match(teamInitials(member.name), /^[A-Z]{2}$/, `${member.slug} monogram initials must be clean`);
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
  assert.equal(teamByRegion("uk").length, 7);
  assert.equal(teamByRegion("nigeria").length, 5);
  assert.equal(teamBySlug("not-a-person"), undefined);
});
