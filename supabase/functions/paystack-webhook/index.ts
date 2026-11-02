import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { getAdminClient, getPaystackSecret, matchesPayment, markPaymentPaid, verifyPaystackTransaction } from "../_shared/paystack.ts";

function equalHex(left: string, right: string) {
  if (left.length !== right.length) return false;
  let diff = 0;
  for (let i = 0; i < left.length; i += 1) diff |= left.charCodeAt(i) ^ right.charCodeAt(i);
  return diff === 0;
}

async function signatureFor(rawBody: string, secret: string) {
  const key = await crypto.subtle.importKey("raw", new TextEncoder().encode(secret), { name: "HMAC", hash: "SHA-512" }, false, ["sign"]);
  const bytes = new Uint8Array(await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(rawBody)));
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join("");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const secret = getPaystackSecret();
    const rawBody = await req.text();
    const providedSignature = req.headers.get("x-paystack-signature") || "";
    if (!equalHex(providedSignature, await signatureFor(rawBody, secret))) return json({ error: "Invalid signature" }, 401);
    const event = JSON.parse(rawBody);
    const reference = event?.data?.reference;
    if (event?.event !== "charge.success" || typeof reference !== "string") return json({ received: true, ignored: true });

    const supabase = getAdminClient();
    const { data: attempt, error } = await supabase.from("paystack_payment_attempts")
      .select("id, quote_id, amount_kobo, status").eq("reference", reference).maybeSingle();
    if (error || !attempt) return json({ error: "Payment reference not found" }, 404);
    const transaction = await verifyPaystackTransaction(secret, reference);
    if (!matchesPayment(transaction, { amountKobo: Number(attempt.amount_kobo), reference })) return json({ error: "Payment details do not match" }, 400);
    if (attempt.status === "success") return json({ received: true, duplicate: true });
    await markPaymentPaid(reference, transaction.id);
    return json({ received: true });
  } catch (error) {
    console.error("paystack-webhook error:", error);
    return json({ error: error instanceof Error ? error.message : "Webhook processing failed" }, 500);
  }
});