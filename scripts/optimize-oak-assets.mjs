import sharp from "sharp";
import { readdir, stat, unlink } from "node:fs/promises";
import { extname, join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const project = dirname(dirname(fileURLToPath(import.meta.url)));
const roots = [join(project, "public/images/sharepoint"), join(project, "public/images")];
const explicit = new Set(["current-site-community-partnership.jpeg", "current-site-tv-advocacy.jpg"]);

for (const root of roots) {
  for (const file of await readdir(root)) {
    const extension = extname(file).toLowerCase();
    if (![".jpg", ".jpeg", ".png"].includes(extension)) continue;
    if (root.endsWith("/images") && !explicit.has(file)) continue;
    const input = join(root, file);
    const output = join(root, `${basename(file, extension)}.webp`);
    const before = (await stat(input)).size;
    const quality = file.includes("funding") ? 90 : 82;
    await sharp(input)
      .rotate()
      .resize({ width: 1920, height: 1920, fit: "inside", withoutEnlargement: true })
      .webp({ quality, smartSubsample: true })
      .toFile(output);
    const after = (await stat(output)).size;
    console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB`);
    await unlink(input);
  }
}
