import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { getAdminClient, getPaystackSecret, matchesPayment, markPaymentPaid, verifyPaystackTransaction } from "../_shared/paystack.ts";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await req.json();
    const reference = body?.reference;
    if (typeof reference !== "string" || !/^quote_[a-f0-9]{32}_[a-f0-9]{32}$/i.test(reference)) return json({ error: "Payment reference is invalid." }, 400);
    const supabase = getAdminClient();
    const { data: attempt, error } = await supabase.from("paystack_payment_attempts")
      .select("id, quote_id, amount_kobo, status")
      .eq("reference", reference).maybeSingle();
    if (error || !attempt) return json({ error: "This payment reference was not found." }, 404);
    if (attempt.status === "success") return json({ paid: true, quoteId: attempt.quote_id });

    const transaction = await verifyPaystackTransaction(getPaystackSecret(), reference);
    if (!matchesPayment(transaction, { amountKobo: Number(attempt.amount_kobo), reference })) {
      if (transaction.status === "failed" || transaction.status === "abandoned") {
        await supabase.from("paystack_payment_attempts").update({ status: "failed" }).eq("id", attempt.id).eq("status", "pending");
      }
      return json({ paid: false });
    }
    const quoteId = await markPaymentPaid(reference, transaction.id);
    return json({ paid: true, quoteId });
  } catch (error) {
    console.error("paystack-verify error:", error);
    return json({ error: error instanceof Error ? error.message : "Payment verification is unavailable." }, 500);
  }
});