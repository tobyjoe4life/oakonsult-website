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
];

test("public copy does not expose editorial instructions or template language", () => {
  for (const phrase of leakedEditorialLanguage) {
    assert.doesNotMatch(publicSource, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), phrase);
  }
});

test("public copy follows the no-em-dash house style", () => {
  assert.doesNotMatch(publicSource, /—|–/);
});
