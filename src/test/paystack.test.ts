import { describe, expect, it } from "vitest";
import { matchesPaystackPayment, ngnToKobo } from "@/lib/paystack";

describe("Paystack quote payment rules", () => {
  it("converts NGN to kobo exactly", () => {
    expect(ngnToKobo(1500)).toBe(150000);
    expect(ngnToKobo(1250.5)).toBe(125050);
  });

  it("rejects amounts with more than two decimal places", () => {
    expect(() => ngnToKobo(12.345)).toThrow("no more than two decimal places");
  });

  it("accepts payment only when status, amount, currency, and reference match", () => {
    const expected = { amountKobo: 150000, reference: "quote_ref_001" };
    expect(matchesPaystackPayment({ status: "success", amount: 150000, currency: "NGN", reference: "quote_ref_001" }, expected)).toBe(true);
    expect(matchesPaystackPayment({ status: "success", amount: 149999, currency: "NGN", reference: "quote_ref_001" }, expected)).toBe(false);
    expect(matchesPaystackPayment({ status: "success", amount: 150000, currency: "USD", reference: "quote_ref_001" }, expected)).toBe(false);
    expect(matchesPaystackPayment({ status: "success", amount: 150000, currency: "NGN", reference: "other" }, expected)).toBe(false);
    expect(matchesPaystackPayment({ status: "pending", amount: 150000, currency: "NGN", reference: "quote_ref_001" }, expected)).toBe(false);
  });
});