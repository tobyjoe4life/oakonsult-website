import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
import { extname } from "node:path";
import test from "node:test";

const sourceRoot = new URL("../src/", import.meta.url);

function collectSource(directory: URL): string {
  return readdirSync(directory, { withFileTypes: true })
    .filter((entry) => !entry.name.startsWith("."))
    .map((entry) => {
      const path = new URL(`${entry.name}${entry.isDirectory() ? "/" : ""}`, directory);
      if (entry.isDirectory()) return collectSource(path);
      if (![".ts", ".tsx"].includes(extname(entry.name))) return "";
      return readFileSync(path, "utf8");
    })
    .join("\n");
}

const publicSource = collectSource(sourceRoot);

const leakedEditorialLanguage = [
  "Open a route for more detail",
  "This is a curated public showcase",
  "Public wording, delivery dates",
  "OAKonsult should publish",
  "activity should be described",
  "The current public impact route",
  "The current public concept",
  "How the structure works",
  "Funding is presented by region",
  "Partnerships are shown where they belong",
  "People, place and participation",
  "These figures are presented as",
  "arranged as a living record",
  "approved public photographs",
  "approved stories",
  "Choose where to go next",
  "Keep exploring",
  "Continue exploring",
  "A clearer donation journey",
  "current public events information",
  "latest approved project information",
  "verified during this staging rebuild",
  "confirmed relationships by region",
  "current programme route",
  "Preview option:",
  "website rebuild",
  "reviewed during",
  "approved organisational",
  "current public website",
  "publicly verified",
  "regional team has approved",
  "as an AI",
  "language model",
  "system message",
  "internal note",
  "reviewer feedback",
  "Kimi",
  "Codex",
  "ChatGPT",
  "prompt",
];

const prohibitedFaithPositioning = [
  "a Christian disability charity",
  "a Christian charity",
  "faith-led support",
  "faith-rooted vision",
  "biblical principles",
];

test("public copy does not expose editorial instructions, prompts or model language", () => {
  for (const phrase of leakedEditorialLanguage) {
    assert.doesNotMatch(publicSource, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), phrase);
  }
});

test("OAKonsult is presented as inclusive rather than a faith-restricted charity", () => {
  for (const phrase of prohibitedFaithPositioning) {
    assert.doesNotMatch(publicSource, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), phrase);
  }

  const about = readFileSync(new URL("app/about/page.tsx", sourceRoot), "utf8");
  const vision = readFileSync(new URL("app/vision-mission/page.tsx", sourceRoot), "utf8");
  const editorial = readFileSync(new URL("lib/editorial-pages.ts", sourceRoot), "utf8");

  assert.match(about, /welcome and support everyone, regardless of faith or background/i);
  assert.match(vision, /welcome and support everyone, regardless of faith or background/i);
  assert.match(editorial, /optional prayer, reflection or faith-sensitive encouragement for those who request it/i);
  assert.match(editorial, /not a condition of receiving OAKonsult family support/i);
});

test("public copy follows the no-em-dash house style", () => {
  assert.doesNotMatch(publicSource, /—|–/);
});
