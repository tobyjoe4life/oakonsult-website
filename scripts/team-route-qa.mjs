import { teamMembers } from "../src/lib/team.ts";
import { legacyRedirects } from "../src/lib/legacy-route-contract.ts";

const baseUrl = (process.env.QA_BASE_URL ?? "http://127.0.0.1:3100").replace(/\/$/, "");
const failures = [];
let checked = 0;

async function request(path, options = {}) {
  try {
    return await fetch(`${baseUrl}${path}`, { redirect: "manual", ...options });
  } catch (error) {
    failures.push(`${path}: request failed: ${error instanceof Error ? error.message : String(error)}`);
    return null;
  }
}

for (const path of ["/our-team", "/our-team/uk", "/our-team/nigeria"]) {
  const response = await request(path);
  checked += 1;
  if (!response || response.status !== 200) {
    failures.push(`${path}: expected 200, received ${response?.status ?? "no response"}`);
  }
}

for (const member of teamMembers.map((entry) => entry)) {
  const path = `/our-team/${member.slug}`;
  const response = await request(path);
  checked += 1;
  if (!response || response.status !== 200) {
    failures.push(`${path}: expected 200, received ${response?.status ?? "no response"}`);
    continue;
  }
  const body = await response.text();
  if (!body.includes(member.name)) failures.push(`${path}: rendered page does not contain ${member.name}`);
  if (!body.includes(member.role)) failures.push(`${path}: rendered page does not contain ${member.role}`);
  if (member.image) {
    const imageResponse = await request(member.image.src);
    checked += 1;
    if (!imageResponse || imageResponse.status !== 200) {
      failures.push(`${member.image.src}: expected 200, received ${imageResponse?.status ?? "no response"}`);
    } else if (!imageResponse.headers.get("content-type")?.startsWith("image/")) {
      failures.push(`${member.image.src}: response is not an image`);
    }
  }
}

const canonicalSlugs = new Set(teamMembers.map((member) => member.slug));
for (const redirect of legacyRedirects.filter((entry) => entry.destination.startsWith("/our-team/"))) {
  const destinationSlug = redirect.destination.split("/").filter(Boolean).at(-1);
  if (!destinationSlug || !canonicalSlugs.has(destinationSlug)) continue;
  const response = await request(redirect.source);
  checked += 1;
  if (!response || ![307, 308].includes(response.status)) {
    failures.push(`${redirect.source}: expected 307 or 308, received ${response?.status ?? "no response"}`);
    continue;
  }
  const location = response.headers.get("location");
  const expected = `${baseUrl}${redirect.destination}`;
  if (location !== redirect.destination && location !== expected) {
    failures.push(`${redirect.source}: expected redirect to ${redirect.destination}, received ${location ?? "no location"}`);
  }
}

if (failures.length > 0) {
  console.error(`Team route QA failed after ${checked} checks:`);
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`Team route QA passed: ${checked} canonical, image and legacy-route checks.`);
