import { createClient } from "npm:@supabase/supabase-js@2";

export function getAdminClient() {
  const url = Deno.env.get("SUPABASE_URL");
  const key = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!url || !key) throw new Error("Payment storage is not configured.");
  return createClient(url, key);
}

export function getPaystackSecret() {
  const key = Deno.env.get("PAYSTACK_SECRET_KEY");
  if (!key) throw new Error("Paystack is not connected yet. Please contact Isreal to arrange payment.");
  return key;
}

export function validUuid(value: unknown): value is string {
  return typeof value === "string" && /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function verifyPaystackTransaction(secret: string, reference: string) {
  const response = await fetch(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, {
    headers: { Authorization: `Bearer ${secret}` },
  });
  const body = await response.json().catch(() => null);
  if (!response.ok || body?.status !== true || !body?.data) {
    console.error("Paystack verification failed", response.status, body?.message || "No response details");
    throw new Error("Paystack could not verify this transaction yet.");
  }
  return body.data as { status?: string; amount?: number; currency?: string; reference?: string; id?: number };
}

export function matchesPayment(
  transaction: { status?: string; amount?: number; currency?: string; reference?: string },
  expected: { amountKobo: number; reference: string },
) {
  return transaction.status === "success"
    && transaction.amount === expected.amountKobo
    && transaction.currency === "NGN"
    && transaction.reference === expected.reference;
}

export async function markPaymentPaid(reference: string, transactionId?: number | string) {
  const supabase = getAdminClient();
  const { data: attempt, error: attemptError } = await supabase
    .from("paystack_payment_attempts")
    .select("id, quote_id, amount_kobo, status")
    .eq("reference", reference)
    .maybeSingle();
  if (attemptError || !attempt) throw new Error("Payment reference was not found.");

  const paidAt = new Date().toISOString();
  const { error: attemptUpdateError } = await supabase
    .from("paystack_payment_attempts")
    .update({ status: "success", paid_at: paidAt })
    .eq("id", attempt.id);
  if (attemptUpdateError) throw new Error("Payment could not be recorded.");

  const { error: quoteUpdateError } = await supabase
    .from("paystack_quotes")
    .update({ status: "paid", paid_at: paidAt, paystack_reference: reference, paystack_transaction_id: transactionId ? String(transactionId) : null })
    .eq("id", attempt.quote_id)
    .eq("status", "pending");
  if (quoteUpdateError) throw new Error("Payment could not be recorded.");

  return attempt.quote_id as string;
}