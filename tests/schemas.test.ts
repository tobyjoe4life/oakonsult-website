import test from "node:test";
import assert from "node:assert/strict";
import { contactSchema, donationSchema } from "../src/lib/crm/schemas.ts";

test("accepts a valid GBP donation", () => {
  assert.equal(donationSchema.safeParse({
    frequency: "one-time",
    currency: "GBP",
    amount: 25,
    purpose: "general",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    privacy: true,
    website: "",
  }).success, true);
});

test("rejects unsupported currency and excessive GBP amount", () => {
  assert.equal(donationSchema.safeParse({
    frequency: "one-time",
    currency: "USD",
    amount: 999_999,
    purpose: "general",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    privacy: true,
    website: "",
  }).success, false);

  assert.equal(donationSchema.safeParse({
    frequency: "one-time",
    currency: "GBP",
    amount: 100_001,
    purpose: "general",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    privacy: true,
    website: "",
  }).success, false);
});

test("rejects Gift Aid for NGN donations", () => {
  assert.equal(donationSchema.safeParse({
    frequency: "monthly",
    currency: "NGN",
    amount: 10_000,
    purpose: "community-outreach",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    giftAid: true,
    privacy: true,
    website: "",
  }).success, false);
});

test("rejects the donation honeypot", () => {
  assert.equal(donationSchema.safeParse({
    frequency: "monthly",
    currency: "NGN",
    amount: 5_000,
    purpose: "general",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    privacy: true,
    website: "spam",
  }).success, false);
});

test("requires contact privacy acknowledgement", () => {
  assert.equal(contactSchema.safeParse({
    enquiryType: "programme",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    region: "United Kingdom",
    message: "Please tell me more",
    preferredContact: "email",
    privacy: false,
    website: "",
  }).success, false);
});

test("accepts valid contact data without marketing consent", () => {
  const result = contactSchema.safeParse({
    enquiryType: "parent-carer support",
    firstName: "Ada",
    lastName: "Oak",
    email: "ada@example.org",
    region: "United Kingdom",
    message: "I would like support please",
    preferredContact: "email",
    privacy: true,
    marketing: false,
    website: "",
  });
  assert.equal(result.success, true);
  if (result.success) assert.equal(result.data.marketing, false);
});
