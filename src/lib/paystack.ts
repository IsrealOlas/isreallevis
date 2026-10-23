export function ngnToKobo(amount: number | string): number {
  const raw = typeof amount === "number" ? amount.toString() : amount.trim();
  if (!/^\d+(?:\.\d{1,2})?$/.test(raw)) {
    throw new Error("Enter a valid positive amount in NGN.");
  }

  const [whole, fraction = ""] = raw.split(".");
  const scaled = BigInt(whole) * 100n + BigInt(fraction.padEnd(2, "0"));
  if (scaled <= 0n || scaled > BigInt(Number.MAX_SAFE_INTEGER)) {
    throw new Error("Enter a valid positive amount in NGN.");
  }

  return Number(scaled);
}

export function matchesPaystackPayment(
  payment: { status?: string; amount?: number; currency?: string; reference?: string },
  expected: { amountKobo: number; reference: string },
): boolean {
  return payment.status === "success"
    && payment.amount === expected.amountKobo
    && payment.currency === "NGN"
    && payment.reference === expected.reference;
}