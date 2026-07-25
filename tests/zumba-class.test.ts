import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const page = () => read("src/app/zumba-class/page.tsx");
const forms = () => read("src/lib/public-form-definitions.ts");
const css = () => read("src/app/interior-v5.css");

test("zumba page carries the verified public title and complete National Lottery funding acknowledgment", () => {
  const source = page();
  assert.match(source, /Free Zumba Class for Parent Carers/);
  assert.match(source, /The National Lottery Community Fund/);
  assert.match(source, /OAKonsult is delighted to announce support from The National Lottery Community Fund\./);
  assert.match(source, /funded for the next 2 years/);
  assert.match(source, /National Lottery players/);
  assert.match(source, /national-lottery\.png/);
  assert.match(source, /Attendance is funded/);
  assert.match(source, /[Rr]egistration is compulsory/);
  assert.doesNotMatch(source, /sponsor/i, "no organisation may be described as a sponsor without evidence");
});

test("zumba page publishes the exact current session schedule and venue", () => {
  const source = page();
  for (const marker of [
    "3rd Mondays",
    "Chapel Hall",
    "11:45am",
    "12:45pm",
    "15 June 2026",
    "3rd Thursdays",
    "Verrall Hall",
    "7:30pm",
    "8:30pm",
    "16 July 2026",
    "Bromley United Reformed Church",
    "20 Widmore Road",
    "BR1 1RY",
  ]) {
    assert.ok(source.includes(marker), `zumba page missing verified detail: ${marker}`);
  }
  assert.doesNotMatch(source, /Fourth Friday|6:30 ?pm/i, "outdated session times must not appear");
});

test("zumba page is a bespoke editorial composition with authentic session photography", () => {
  const source = page();
  assert.match(source, /editorial-masthead/, "expected a photography-led editorial hero");
  assert.match(source, /zumba-action\.webp/);
  assert.equal(source.match(/zumba-action\.webp/g)?.length, 1, "the hero photo must not be repeated in the journal");
  assert.match(source, /zumba-group\.webp/);
  assert.match(source, /zumba-class-2\.webp/, "expected the additional consent-cleared group photo");
  assert.match(source, /HomeMotion/);
  assert.match(source, /data-reveal/);
  for (const asset of [
    "public/images/sharepoint/zumba-action.webp",
    "public/images/sharepoint/zumba-group.webp",
    "public/images/sharepoint/zumba-class-2.webp",
    "public/partners/national-lottery.png",
  ]) {
    assert.ok(existsSync(join(root, asset)), `missing asset: ${asset}`);
  }
});

test("zumba page keeps the accessible preview-only registration form with contextual support", () => {
  const source = page();
  assert.match(source, /PublicInterestForm/);
  assert.match(source, /publicFormDefinitions\["zumba-registration"\]/);
  assert.match(source, /aria-current="page">Zumba class/);
  assert.equal(source.match(/aria-hidden="true">\/<\/span>/g)?.length, 2, "breadcrumb separators should be hidden from assistive technology");
  assert.match(source, /<h2 id="zumba-register-title">Register your place<\/h2>/);
  assert.match(source, /href="\/zumba-wellbeing"/, "expected a contextual wellbeing check-in link");
  assert.match(source, /ukinfo@oakonsult\.org/);
  assert.match(source, /info@oakonsult\.org/);
  assert.match(source, /id="register"/, "registration section needs an anchor for the hero CTA");
});

test("zumba registration form options match the verified Monday and Thursday sessions", () => {
  const source = forms();
  assert.match(source, /Morning session: 3rd Mondays, 11:45am to 12:45pm \(Chapel Hall\)/);
  assert.match(source, /Evening session: 3rd Thursdays, 7:30pm to 8:30pm \(Verrall Hall\)/);
  assert.match(source, /Either session/);
  assert.doesNotMatch(source, /Fourth Friday/);
  assert.doesNotMatch(source, /6:30 pm to 7:30 pm/);
});

test("zumba page uses dedicated, scoped editorial sections instead of a generic form wrapper", () => {
  const source = page();
  const styles = css();
  assert.doesNotMatch(source, /PublicFormPage/, "page should be bespoke, not the generic form wrapper");
  for (const selector of [".zumba-funding-band", ".zumba-session-list", ".zumba-venue"]) {
    assert.ok(source.includes(selector.slice(1)), `page missing section ${selector}`);
    assert.ok(styles.includes(selector), `interior-v5.css missing selector ${selector}`);
  }
  assert.doesNotMatch(source, /detail-section-number/, "a lone numbered-section marker must not imply a missing series");
  assert.match(styles, /\.zumba-page \.detail-section\s*\{/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\) \{\s*\.zumba-page \*/);
  assert.doesNotMatch(styles, /@media \(prefers-reduced-motion: reduce\) \{\s*\.editorial-page \*/, "Zumba-specific motion rules must not alter every editorial page");
});

test("zumba redesign does not add the activity to global navigation", () => {
  const header = read("src/components/SiteHeader.tsx");
  assert.doesNotMatch(header, /\/zumba-class/);
  assert.doesNotMatch(header, /Zumba/);
});
