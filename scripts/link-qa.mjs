import { writeFile } from "node:fs/promises";

const base = new URL(process.env.QA_BASE_URL || "http://127.0.0.1:3011");
const seed = [
  "/", "/about", "/accessibility", "/contact", "/donate", "/events", "/find-support",
  "/funders-partners", "/get-involved", "/impact", "/media-gallery", "/media-gallery/uk",
  "/media-gallery/nigeria", "/nigeria", "/privacy", "/programmes/oak-centre-prime",
  "/programmes/parent-carer-support", "/programmes/project-me", "/programmes/support-for-churches",
  "/stories", "/uk", "/what-we-do",
];

const queue = [...seed];
const seen = new Set();
const results = [];

while (queue.length && seen.size < 100) {
  const path = queue.shift();
  if (!path || seen.has(path)) continue;
  seen.add(path);
  const url = new URL(path, base);
  const response = await fetch(url, { redirect: "manual" });
  const contentType = response.headers.get("content-type") || "";
  const body = contentType.includes("text/html") ? await response.text() : "";
  const links = [...body.matchAll(/href=["']([^"']+)["']/g)].map((match) => match[1]);
  const internal = [...new Set(links
    .filter((href) => href.startsWith("/") && !href.startsWith("//"))
    .map((href) => href.split("#")[0].split("?")[0])
    .filter(Boolean))];
  for (const href of internal) if (!seen.has(href) && !queue.includes(href)) queue.push(href);
  results.push({ path, status: response.status, internalLinks: internal.length });
  console.log(`${response.status} ${path} (${internal.length} internal links)`);
}

const failures = results.filter((result) => result.status < 200 || result.status >= 400);
await writeFile("docs/link-qa-report.json", `${JSON.stringify({ base: base.href, checked: results.length, failures, results }, null, 2)}\n`);
if (failures.length) {
  console.error(`Link QA failed for ${failures.length} route(s).`);
  process.exitCode = 1;
} else {
  console.log(`Link QA passed for ${results.length} internal route(s).`);
}
