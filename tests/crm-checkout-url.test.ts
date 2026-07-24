import assert from "node:assert/strict";
import test from "node:test";
import { isApprovedCheckoutUrl } from "../src/lib/crm/client.ts";

test("checkout redirects are restricted to approved payment hosts", () => {
  assert.equal(isApprovedCheckoutUrl("https://checkout.stripe.com/c/pay/cs_test_123"), true);
  assert.equal(isApprovedCheckoutUrl("https://checkout.paystack.com/abc123"), true);
  assert.equal(isApprovedCheckoutUrl("http://checkout.stripe.com/example"), false);
  assert.equal(isApprovedCheckoutUrl("https://checkout.stripe.com.evil.example/steal"), false);
  assert.equal(isApprovedCheckoutUrl("https://evil.example/checkout"), false);
  assert.equal(isApprovedCheckoutUrl("not-a-url"), false);
});
