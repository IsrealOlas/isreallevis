export function ngnToKobo(amount: number): number {
  if (!Number.isFinite(amount) || amount <= 0 || !Number.isSafeInteger(Math.round(amount * 100))) {
    throw new Error("Enter a valid positive amount in NGN.");
  }

  const scaled = amount * 100;
  if (!Number.isInteger(scaled)) {
    throw new Error("NGN amounts can have no more than two decimal places.");
  }

  return scaled;
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