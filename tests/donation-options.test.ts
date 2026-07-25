import test from "node:test";
import assert from "node:assert/strict";
import { donationPurposeLabels, normaliseDonationPurpose } from "../src/lib/donation-options.ts";
import { donationSchema } from "../src/lib/crm/schemas.ts";

test("normalises supported campaign purpose parameters", () => {
  for (const purpose of Object.keys(donationPurposeLabels)) {
    assert.equal(normaliseDonationPurpose(purpose), purpose);
  }
  assert.equal(normaliseDonationPurpose(undefined), "general");
  assert.equal(normaliseDonationPurpose("unknown-campaign"), "general");
  assert.equal(normaliseDonationPurpose("constructor"), "general");
  assert.equal(normaliseDonationPurpose("toString"), "general");
});

test("accepts the parent-carer donation purpose", () => {
  assert.equal(donationSchema.safeParse({
    frequency: "one-time",
    currency: "GBP",
    amount: 25,
    purpose: "parent-carer",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    privacy: true,
    website: "",
  }).success, true);
});
