import test from "node:test";
import assert from "node:assert/strict";
import { integrationEnabled } from "../src/lib/crm/client.ts";
import { checkRateLimit, resetRateLimitsForTests } from "../src/lib/security/rate-limit.ts";

test("integration is disabled without server configuration", () => {
  const baseUrl = process.env.CRM_BASE_URL;
  const apiKey = process.env.CRM_WEBSITE_API_KEY;
  delete process.env.CRM_BASE_URL;
  delete process.env.CRM_WEBSITE_API_KEY;
  assert.equal(integrationEnabled(), false);
  if (baseUrl) process.env.CRM_BASE_URL = baseUrl;
  if (apiKey) process.env.CRM_WEBSITE_API_KEY = apiKey;
});

test("rate limiter blocks requests above the configured limit", () => {
  resetRateLimitsForTests();
  assert.equal(checkRateLimit("test", 2, 60_000).allowed, true);
  assert.equal(checkRateLimit("test", 2, 60_000).allowed, true);
  assert.equal(checkRateLimit("test", 2, 60_000).allowed, false);
});
