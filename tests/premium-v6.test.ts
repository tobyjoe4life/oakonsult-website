import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const root = join(import.meta.dirname, "..");
const read = (path: string) => readFileSync(join(root, path), "utf8");

const premium = read("src/app/premium-v6.css");
const homeStyles = read("src/app/home-v4.css");
const layout = read("src/app/layout.tsx");
const motion = read("src/components/HomeMotion.tsx");

const relativeLuminance = (hex: string) => {
  const channels = [1, 3, 5].map((index) => Number.parseInt(hex.slice(index, index + 2), 16) / 255);
  const [red, green, blue] = channels.map((channel) => channel <= 0.04045
    ? channel / 12.92
    : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * red + 0.7152 * green + 0.0722 * blue;
};

const contrastRatio = (foreground: string, background: string) => {
  const first = relativeLuminance(foreground);
  const second = relativeLuminance(background);
  return (Math.max(first, second) + 0.05) / (Math.min(first, second) + 0.05);
};

test("layout loads the premium design layer after the interior system", () => {
  const interiorAt = layout.indexOf("interior-v5.css");
  const premiumAt = layout.indexOf("premium-v6.css");
  assert.ok(interiorAt > -1, "layout must keep loading interior-v5.css");
  assert.ok(premiumAt > interiorAt, "premium-v6.css must load after interior-v5.css");
});

test("premium layer defines a controlled page mood system", () => {
  const moods = ["growth", "harvest", "wellbeing", "clay", "calm"];
  for (const mood of moods) {
    assert.match(premium, new RegExp(`\\[data-mood="${mood}"\\]`), `missing mood: ${mood}`);
  }
  for (const token of ["--mood-pop", "--mood-deep", "--mood-soft", "--mood-accent"]) {
    assert.ok(premium.includes(token), `missing mood token: ${token}`);
  }
});

test("every page family carries an explicit mood and families vary", () => {
  const families: [string, string][] = [
    ["src/app/page.tsx", "data-mood"],
    ["src/components/InteriorPage.tsx", "data-mood"],
    ["src/components/EditorialDetailPage.tsx", "data-mood"],
    ["src/components/GalleryPage.tsx", "data-mood"],
    ["src/components/RegionPage.tsx", "data-mood"],
    ["src/components/UtilityPage.tsx", "data-mood"],
    ["src/components/PublicFormPage.tsx", "data-mood"],
  ];
  for (const [file, marker] of families) {
    assert.match(read(file), new RegExp(marker), `${file} must carry a page mood`);
  }
  const routes = [
    "src/app/find-support/page.tsx",
    "src/app/about/page.tsx",
    "src/app/impact/page.tsx",
    "src/app/donate/page.tsx",
    "src/app/contact/page.tsx",
    "src/app/zumba-class/page.tsx",
    "src/app/what-we-do/page.tsx",
    "src/app/privacy/page.tsx",
  ].map(read).join("\n");
  const used = new Set([...routes.matchAll(/mood[:=]\s*"([a-z]+)"|data-mood="([a-z]+)"/g)].map((m) => m[1] ?? m[2]));
  assert.ok(used.size >= 4, `expected at least 4 distinct moods across routes, found ${used.size}`);
});

test("premium motion uses distinct choreography, not one uniform reveal", () => {
  for (const variant of ["slide", "pop", "unfold"]) {
    assert.match(premium, new RegExp(`data-reveal-child="${variant}"`), `missing child choreography: ${variant}`);
  }
  for (const variant of ["left", "right", "zoom"]) {
    assert.match(premium, new RegExp(`data-reveal="${variant}"`), `missing directional reveal: ${variant}`);
  }
  assert.match(motion, /data-reveal-group/);
  assert.match(motion, /--stagger-index/);
  assert.match(premium, /--stagger-index/);
  assert.match(motion, /data-drift/);
  assert.match(motion, /requestAnimationFrame/);
});

test("hidden reveal states are gated behind motion-ready and clear after reveal", () => {
  assert.doesNotMatch(premium, /\[data-reveal\]\s*\{\s*opacity:\s*0/, "bare hidden state would break no-JS and post-reveal hovers");
  assert.match(premium, /\.motion-ready[^\{]*\[data-reveal\]:not\(\.is-visible\)/);
  assert.match(premium, /\.motion-ready[^\{]*\[data-reveal-child\]:not\(\.is-visible\)/);
});

test("reduced motion fully disables premium choreography while keeping content visible", () => {
  const reducedBlocks = premium.match(/@media \(prefers-reduced-motion: reduce\) \{[\s\S]*?\n\}/g) ?? [];
  assert.ok(reducedBlocks.length >= 1, "premium layer needs a reduced-motion block");
  const reduced = reducedBlocks.join("\n");
  assert.match(reduced, /\[data-drift\]/, "drift must be disabled under reduced motion");
  assert.match(reduced, /\[data-reveal\]/, "reveals must be visible under reduced motion");
  assert.match(motion, /prefers-reduced-motion/);
  assert.match(motion, /is-visible/);
});

test("decorative drift and stagger hooks appear on real page decorations", () => {
  const homepage = read("src/app/page.tsx");
  assert.match(homepage, /data-drift/);
  assert.match(homepage, /data-reveal-group/);
  assert.match(homepage, /data-reveal-child/);
});

test("footer gains a premium editorial statement while preserving its directory", () => {
  const footer = `${read("src/components/SiteFooter.tsx")}\n${read("src/lib/site-navigation.ts")}`;
  assert.match(footer, /footer-v4-statement/);
  for (const label of ["Media gallery", "Events", "Funders & partners", "OAK Centre Prime", "Keep in touch"]) {
    assert.match(footer, new RegExp(label));
  }
});

test("staging forms stay preview-only and fail-closed", () => {
  const contactApi = read("src/app/api/forms/contact/route.ts");
  const donationApi = read("src/app/api/donations/checkout/route.ts");
  assert.match(contactApi, /status:\s*503/);
  assert.match(donationApi, /status:\s*503/);
  const form = read("src/components/PublicInterestForm.tsx");
  const donation = read("src/components/DonationForm.tsx");
  assert.match(form, /<strong>Preview only<\/strong>/);
  assert.match(donation, /No payment has been taken/);
});

test("premium layer keeps kickers flat and avoids capsule decoration", () => {
  assert.doesNotMatch(premium, /\.oak-kicker[^{]*\{[^}]*border-radius:\s*999px/, "no kicker capsules in the premium layer");
  assert.doesNotMatch(premium, /family-action/i, "no third-party brand references");
});

test("mood-coloured form guidance retains WCAG AA contrast", () => {
  const rule = premium.match(/\.interior-v5 \.form-section \.field-help\s*\{[^}]*color:\s*(#[0-9a-f]{6})/i);
  assert.ok(rule, "premium layer must override muted form guidance on mood-coloured form grounds");
  const foreground = rule[1];
  for (const background of ["#e9f4cf", "#f7ecd2", "#e2f0f1", "#f9e6db", "#f8f3e8"]) {
    assert.ok(
      contrastRatio(foreground, background) >= 4.5,
      `${foreground} must have at least 4.5:1 contrast on ${background}`,
    );
  }
});

test("shared interior journeys visibly carry their route mood through the content", () => {
  assert.match(
    premium,
    /\.interior-v5 \.interior-flow::before\s*\{[\s\S]*?background:[\s\S]*?var\(--mood-soft\)/,
    "interior content needs a full-width mood surface, not only a thin masthead stripe",
  );
});

test("the bespoke social journey participates in premium motion", () => {
  const social = read("src/app/social/page.tsx");
  assert.match(social, /HomeMotion/);
  assert.match(social, /data-reveal-group/);
  assert.match(social, /data-reveal-child/);
});

test("interior list hover polish preserves reveal choreography and stagger", () => {
  const rule = premium.match(
    /\.motion-ready \.interior-v5 \.interior-list article\[data-reveal-child\]\s*\{([\s\S]*?)\}/,
  );
  assert.ok(rule, "interior reveal items need a cascade-safe transition override");
  for (const property of ["opacity", "transform", "clip-path", "background-color", "box-shadow"]) {
    assert.match(rule[1], new RegExp(property), `${property} must remain animated`);
  }
  assert.match(
    rule[1],
    /transition-delay:[\s\S]*var\(--stagger-index[\s\S]*0ms/,
    "reveal properties must keep their stagger while hover properties react immediately",
  );
});

test("shipping styles do not name a third-party reference brand", () => {
  assert.doesNotMatch(`${homeStyles}\n${premium}`, /family[ -]action/i);
});
