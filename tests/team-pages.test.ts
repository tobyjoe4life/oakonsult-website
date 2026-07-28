import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { nigeriaTeamMembers, teamMembers, teamProfileStaticParams, ukTeamMembers } from "../src/lib/team.ts";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

test("every team route page exists and carries the premium mood or family system", () => {
  for (const route of ["our-team", "our-team/uk", "our-team/nigeria", "our-team/[slug]"]) {
    assert.ok(existsSync(join(root, "src/app", route, "page.tsx")), `missing route: ${route}`);
    const source = read(`src/app/${route}/page.tsx`);
    const hasMood = /data-mood=|mood:\s*"[a-z]+"|mood="[a-z]+"|TeamRegionPage|TeamProfile/.test(source);
    assert.ok(hasMood, `${route} must stay inside the premium mood/family system`);
  }
});

test("the dynamic profile route statically generates every listed person", () => {
  const route = read("src/app/our-team/[slug]/page.tsx");
  assert.match(route, /generateStaticParams/);
  assert.match(route, /return teamProfileStaticParams\(\)/);
  assert.deepEqual(
    teamProfileStaticParams().map(({ slug }) => slug).sort(),
    teamMembers.map(({ slug }) => slug).sort(),
  );
  assert.match(route, /notFound\(\)/);
  assert.match(route, /generateMetadata/);
  assert.match(route, /robots:\s*\{\s*index:\s*false,\s*follow:\s*false/);
});

test("the team hub links both regional public directories", () => {
  const source = read("src/app/our-team/page.tsx");
  const regionalSource = read("src/components/TeamRegionPage.tsx");
  assert.match(source, /interior-v5 team-hub-page/);
  assert.match(source, /href="\/our-team\/uk"/);
  assert.match(source, /\/our-team\/nigeria/);
  assert.match(source, /TeamDirectory/);
  assert.match(source, /ukTeamMembers\.length/);
  assert.match(source, /nigeriaTeamMembers\.length/);
  assert.match(source, /Leadership, governance and delivery/);
  assert.match(source, /public leadership, trustees and selected delivery team/i);
  assert.match(regionalSource, /Public profiles connected with/);
  assert.doesNotMatch(`${source}\n${regionalSource}`, /Everyone on the team|Everyone in|full directory|full team hub|verified biography|Meet the \{members\.length\}/i);
});

test("regional directories render only their own people", () => {
  const uk = read("src/app/our-team/uk/page.tsx");
  const nigeria = read("src/app/our-team/nigeria/page.tsx");
  assert.match(uk, /region="uk"/);
  assert.match(nigeria, /region="nigeria"/);

  const directory = read("src/components/TeamDirectory.tsx");
  assert.match(directory, /\/our-team\/\$\{member\.slug\}/);
  assert.match(directory, /regionDisplayName\(member\.region\)/);

  for (const member of ukTeamMembers) assert.equal(member.region, "uk");
  for (const member of nigeriaTeamMembers) assert.equal(member.region, "nigeria");
});

test("individual profiles show region, role, biography, related links and contact route", () => {
  const profile = read("src/components/TeamProfile.tsx");
  for (const marker of [
    "editorial-breadcrumb",
    "aria-label=\"Breadcrumb\"",
    "member.role",
    "member.biography.map",
    "member.related.map",
    "aria-current=\"page\"",
    "/contact",
    "member.boardJurisdiction",
    "member.operationalRemit",
    "regionDisplayName(member.region)",
  ]) {
    assert.match(profile, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")), `TeamProfile is missing ${marker}`);
  }
});

test("directory cards resolve to the correct individual profile", () => {
  const directory = read("src/components/TeamDirectory.tsx");
  assert.match(directory, /href=\{`\/our-team\/\$\{member\.slug\}`\}/);
  assert.deepEqual(
    teamProfileStaticParams(),
    teamMembers.map((member) => ({ slug: member.slug })),
  );
  assert.ok(existsSync(join(root, "scripts/team-route-qa.mjs")), "production route crawl must exist");
  assert.match(read("scripts/team-route-qa.mjs"), /teamMembers\.map/);
});

test("team data stays free of prohibited copy and sensitive details", () => {
  const teamSource = read("src/lib/team.ts");
  const leak = [/sharepoint/i, /whatsapp/i, /meeting minutes/i, /prompt/i, /chatgpt/i, /kimi/i, /codex/i, /\bAI\b/, /as an ai/i, /language model/i, /@oakonsult\.org/i, /gmail\.com/i, /\b\d{2}[ /.-]\d{2}[ /.-]\d{4}\b/];
  for (const pattern of leak) assert.doesNotMatch(teamSource, pattern, `team data must not match ${pattern}`);
});

test("no generic rounded kicker capsule or SaaS card grid language enters team surfaces", () => {
  const pages = ["src/app/our-team/page.tsx", "src/app/our-team/uk/page.tsx", "src/app/our-team/nigeria/page.tsx", "src/components/TeamDirectory.tsx", "src/components/TeamProfile.tsx", "src/components/TeamPortrait.tsx"];
  for (const page of pages) {
    const source = read(page);
    assert.doesNotMatch(source, /rounded kicker|capsule label|glassmorphism|dashboard/i, `${page} must avoid generic AI/SaaS patterns`);
  }
});

test("team directory copy retains accessible contrast without decorative indices", () => {
  const css = read("src/app/interior-v5.css");
  assert.match(css, /\.team-governance-list li h3 \{[^}]*color:var\(--editorial-deep\)/);
  assert.match(css, /\.team-card-name \{[^}]*color:var\(--editorial-deep\)/);
  assert.doesNotMatch(read("src/components/TeamDirectory.tsx"), /team-card-index/, "team cards must not use decorative sequence indices");
});

test("team portraits use source-attributed files only, never the Zoom-grid screenshot", () => {
  const portrait = read("src/components/TeamPortrait.tsx");
  assert.match(portrait, /teamInitials/);
  assert.match(portrait, /member\.image/);
  const teamDir = readdirSync(join(root, "public/images/team")).filter((file) => file.endsWith(".webp"));
  assert.equal(teamDir.length, 12, "all twelve source-attributed portraits should be versioned");
  assert.ok(!teamDir.some((file) => /zoom|grid|screenshot/i.test(file)), "no Zoom-grid screenshot may be used as a profile image");
});

test("verified team portraits keep natural, descriptive alt text", () => {
  for (const member of teamMembers) {
    if (!member.image) continue;
    assert.doesNotMatch(member.image.alt, /photo of a photo|selfie|screenshot/i, `${member.slug} alt text must stay professional`);
    assert.match(member.image.alt, /portrait/i, `${member.slug} alt text should identify the portrait`);
  }
});

test("the legacy contract forwards shortened or old team slugs to the verified profiles", () => {
  const contract = read("src/lib/legacy-route-contract.ts");
  for (const [from, to] of [
    ["lucky-aigbefoh", "lucky-sanni-aigbefoh"],
    ["bunmi-soji-adeyemo", "modupe-olubunmi-soji-adeyemo"],
    ["bolanle-ajayi", "bolanle-alice-ajayi"],
    ["esther-kehinde", "esther-aderike-kehinde"],
  ]) {
    assert.match(contract, new RegExp(`\\["${from}", "${to}"\\]`), `missing legacy redirect pair ${from} -> ${to}`);
    assert.match(contract, /\/our-team\/\$\{from\}.*\/our-team\/\$\{to\}/, "the contract must map old team slugs onto verified profiles");
  }
});

test("legacy root person URLs redirect directly to canonical profile pages", () => {
  const contract = read("src/lib/legacy-route-contract.ts");
  const expected = [
    ["olufunke-adeloye", "olufunke-adeloye"],
    ["ajisola-adeloye", "ajisola-adeloye"],
    ["itunuade-iyun", "itunuade-iyun"],
    ["hadiza-daura", "hadiza-daura"],
    ["esther-kehinde", "esther-aderike-kehinde"],
    ["funmilola-oshin", "oshin-hannah-oluwafunmilayo"],
    ["lucky-aigbefoh", "lucky-sanni-aigbefoh"],
    ["bunmi-soji-adeyemo", "modupe-olubunmi-soji-adeyemo"],
    ["bolanle-ajayi", "bolanle-alice-ajayi"],
    ["dayo-balogun", "dayo-balogun"],
    ["omobola-oludele", "omobola-oludele"],
    ["boluwatife-kehinde", "boluwatife-kehinde"],
  ];
  for (const [from, to] of expected) {
    assert.match(contract, new RegExp(`\\["${from}", "${to}"\\]`), `missing root profile redirect ${from} -> ${to}`);
  }
  assert.match(contract, /moved\(`\/\$\{from\}`, `\/our-team\/\$\{to\}`/);
});
