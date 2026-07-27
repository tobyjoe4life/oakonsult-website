import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import test from "node:test";
import { getPrimaryJourneyTitle, journeyGroups } from "../src/lib/site-navigation.ts";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const collectSources = (directory: string): string[] =>
  readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return collectSources(path);
    return [".ts", ".tsx"].includes(extname(entry.name)) ? [path] : [];
  });

const publicSources = collectSources(join(root, "src"))
  .map((path) => [path.slice(root.length + 1), readFileSync(path, "utf8")] as const);

test("no decorative padded sequence numbering remains in public source", () => {
  const offenders: string[] = [];
  for (const [path, source] of publicSources) {
    if (/padStart\(2, "0"\)/.test(source)) offenders.push(`${path}: padStart padded index`);
    if (/<span[^>]*>0[1-9]<\/span>|<small>0[1-9]<\/small>/.test(source)) offenders.push(`${path}: literal 0N sequence label`);
    if (/0\s*\{\s*\w+\s*\+\s*1\s*\}/.test(source)) offenders.push(`${path}: JSX 0N sequence label`);
  }
  assert.deepEqual(offenders, [], `decorative sequence numbering found:\n${offenders.join("\n")}`);
});

test("decorative numbering hooks are removed from components and stylesheets", () => {
  const retiredHooks = [
    "programme-number",
    "interior-index",
    "team-card-index",
    "detail-section-number",
    "oak-home-directory",
  ];
  const files = [
    ...publicSources.map(([path, source]) => [path, source] as const),
    ["src/app/home-v4.css", read("src/app/home-v4.css")] as const,
    ["src/app/interior-v5.css", read("src/app/interior-v5.css")] as const,
    ["src/app/premium-v6.css", read("src/app/premium-v6.css")] as const,
  ];
  const offenders: string[] = [];
  for (const [path, source] of files) {
    for (const hook of retiredHooks) {
      if (source.includes(hook)) offenders.push(`${path}: ${hook}`);
    }
  }
  assert.deepEqual(offenders, [], `retired decorative hooks still referenced:\n${offenders.join("\n")}`);
});

test("header, menu, homepage and footer share one human journey architecture", () => {
  const header = read("src/components/SiteHeader.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  const navigation = read("src/lib/site-navigation.ts");
  const homepage = read("src/app/page.tsx");

  for (const journey of ["Get support", "Give support", "Our work and impact", "About OAKonsult", "Work with us"]) {
    assert.match(navigation, new RegExp(journey), `navigation model is missing the ${journey} journey`);
  }
  assert.match(header, /journeyGroups/, "header must use the shared journey model");
  assert.match(footer, /journeyGroups/, "footer must use the shared journey model");

  assert.match(header, />Where we work</, "header keeps the regional cluster");
  assert.match(homepage, /Do you need support\?/, "homepage keeps the human get-support pathway");
  assert.match(homepage, /Can you give support\?/, "homepage keeps the human give-support pathway");
  assert.match(homepage, /professional or partner/i, "homepage keeps a contextual professional route");
  assert.doesNotMatch(homepage, /<span>01<\/span>|<small>01<\/small>/, "homepage pathways and directory must not be numbered");
});

test("every previously discoverable public route remains reachable from rendered header or footer data", () => {
  const header = read("src/components/SiteHeader.tsx");
  const footer = read("src/components/SiteFooter.tsx");
  assert.match(header, /journeyGroups\.map/, "header must render every shared menu journey");
  assert.match(header, /group\.menuLinks\.map/, "header must render every menu link");
  assert.match(footer, /journeyGroups\.map/, "footer must render every shared journey");
  assert.match(footer, /group\.footerLinks\.map/, "footer must render every footer link");

  const renderedJourneyRoutes = new Set<string>(
    journeyGroups.flatMap((group) => [...group.menuLinks, ...group.footerLinks].map((link) => link.href)),
  );
  for (const href of [
    "/find-support",
    "/what-we-do",
    "/stories",
    "/impact",
    "/media-gallery",
    "/media-gallery/uk",
    "/media-gallery/nigeria",
    "/events",
    "/social",
    "/funders-partners",
    "/get-involved",
    "/about",
    "/our-story",
    "/abigail",
    "/history",
    "/our-team",
    "/vision-mission",
    "/donate",
    "/volunteer-opportunities",
    "/partnerships",
    "/contact",
    "/zumba-class",
    "/programmes/project-me",
    "/programmes/parent-carer-support",
    "/programmes/support-for-churches",
    "/programmes/oak-centre-prime",
  ]) {
    assert.ok(renderedJourneyRoutes.has(href), `${href} is absent from the rendered menuLinks and footerLinks data`);
  }

  const directNavigation = `${header}\n${footer}`;
  for (const href of ["/uk", "/nigeria", "/privacy", "/accessibility"]) {
    assert.ok(directNavigation.includes(`\"${href}\"`), `${href} is absent from the rendered regional or utility navigation`);
  }
});

test("the programme directory lists programmes without decorative row numbers", () => {
  const directory = read("src/app/what-we-do/page.tsx");
  assert.doesNotMatch(directory, /padStart/, "programme rows must not be sequence-numbered");
  assert.match(directory, /programme-region-list/, "programme rows keep their editorial list treatment");
  for (const anchor of ["#uk-programmes", "#nigeria-programmes", "#shared-support"]) {
    assert.ok(directory.includes(anchor), `programme directory lost the ${anchor} jump route`);
  }
});

test("desktop and overlay navigation assign support programmes and partnerships to one consistent journey", () => {
  for (const path of ["/find-support", "/programmes/project-me", "/programmes/parent-carer-support", "/zumba-class"]) {
    assert.equal(getPrimaryJourneyTitle(path), "Get support", `${path} should belong to Get support`);
  }
  for (const path of ["/what-we-do", "/programmes/support-for-churches", "/programmes/oak-centre-prime", "/impact"]) {
    assert.equal(getPrimaryJourneyTitle(path), "Our work and impact", `${path} should belong to Our work and impact`);
  }
  for (const path of ["/partnerships", "/contact"]) {
    assert.equal(getPrimaryJourneyTitle(path), "Work with us", `${path} should belong to Work with us`);
  }
});
