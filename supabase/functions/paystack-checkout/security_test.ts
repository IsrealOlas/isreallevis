import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { isPaystackTestKey } from "../_shared/paystack.ts";

Deno.test("Paystack checkout accepts test keys only", () => {
  assertEquals(isPaystackTestKey("sk_test_1234567890"), true);
  assertEquals(isPaystackTestKey("sk_live_1234567890"), false);
  assertEquals(isPaystackTestKey(undefined), false);
  assertEquals(isPaystackTestKey(""), false);
});