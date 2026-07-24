import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const destination = join(project, "public/images/gallery");
const manifestPath = join(project, "docs/oak-gallery-source-manifest.json");

const assets = [

  ["uk-project-me-session", "UK", "https://oakonsult.org/wp-content/uploads/2024/05/ENR-1026.jpg", "Parent carers taking part in a Project ME session"],
  ["uk-parent-carer-community", "UK", "https://oakonsult.org/wp-content/uploads/2024/05/ENR-1058.jpg", "Parent carers connecting during an OAKonsult community activity"],
  ["uk-project-me-group", "UK", "https://oakonsult.org/wp-content/uploads/2024/05/ENR-1127C.jpg", "A group activity during an OAKonsult Project ME session"],
  ["nigeria-knowledge-radio", "Nigeria", "https://oakonsult.org/wp-content/uploads/2025/04/Knowledge-Radio-1-scaled-1.jpg", "OAKonsult disability-awareness engagement at Knowledge Radio"],
  ["nigeria-press-conference", "Nigeria", "https://oakonsult.org/wp-content/uploads/2025/04/Press-conference-pictures-scaled-1.jpg", "OAKonsult representatives at a public press conference"],
  ["nigeria-oolo-palace", "Nigeria", "https://oakonsult.org/wp-content/uploads/2025/04/Visit-to-Oolo-Palace-scaled-1.jpg", "OAKonsult representatives during a community engagement visit to Oolo Palace"],
];

await mkdir(destination, { recursive: true });
const manifest = [];
for (const [slug, region, url, alt] of assets) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const input = Buffer.from(await response.arrayBuffer());
  const output = join(destination, `${slug}.webp`);
  const info = await sharp(input)
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 84, smartSubsample: true })
    .toFile(output);
  manifest.push({ file: `public/images/gallery/${slug}.webp`, region, sourceUrl: url, alt, width: info.width, height: info.height, source: "Current public OAKonsult media gallery", productionGate: "Confirm image consent and publication rights before production launch" });
  console.log(`${slug}: ${info.width}x${info.height}`);
}
await writeFile(manifestPath, `${JSON.stringify({ reviewed: new Date().toISOString(), assets: manifest }, null, 2)}\n`);
