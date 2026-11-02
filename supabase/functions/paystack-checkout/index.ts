import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { getAdminClient, getPaystackSecret, validUuid } from "../_shared/paystack.ts";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

function safeOrigin(origin: string | null) {
  if (origin && (/^https:\/\/[a-z0-9-]+\.lovable\.app$/i.test(origin) || /^http:\/\/localhost(?::\d+)?$/i.test(origin))) return origin;
  return "https://isreallevis.lovable.app";
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  try {
    const body = await req.json();
    if (!validUuid(body?.quoteId)) return json({ error: "This payment link is invalid." }, 400);
    const supabase = getAdminClient();
    const { data: quote, error } = await supabase.from("paystack_quotes")
      .select("id, customer_name, customer_email, service, description, amount_ngn, amount_kobo, status")
      .eq("id", body.quoteId).maybeSingle();
    if (error || !quote) return json({ error: "This payment link could not be found." }, 404);

    if (body.action === "quote") {
      return json({ quote: {
        id: quote.id,
        customer_name: quote.customer_name,
        service: quote.service,
        description: quote.description,
        amount_kobo: Number(quote.amount_kobo ?? Number(quote.amount_ngn) * 100),
        status: quote.status,
      } });
    }

    if (body.action !== "initialize") return json({ error: "Invalid action" }, 400);
    if (quote.status !== "pending") return json({ error: quote.status === "paid" ? "This quote has already been paid." : "This quote is no longer accepting payments." }, 409);
    const { data: existingAttempt, error: existingAttemptError } = await supabase.from("paystack_payment_attempts")
      .select("authorization_url, created_at")
      .eq("quote_id", quote.id)
      .eq("status", "pending")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();
    if (existingAttemptError) throw new Error("Checkout could not be prepared. Please try again.");
    if (existingAttempt?.authorization_url) return json({ authorizationUrl: existingAttempt.authorization_url });
    const secret = getPaystackSecret();
    const reference = `quote_${quote.id.replaceAll("-", "")}_${crypto.randomUUID().replaceAll("-", "")}`;
    const amountKobo = Number(quote.amount_kobo ?? Number(quote.amount_ngn) * 100);
    if (!Number.isSafeInteger(amountKobo) || amountKobo <= 0) return json({ error: "This quote has an invalid amount." }, 400);
    const origin = safeOrigin(req.headers.get("origin"));
    const response = await fetch("https://api.paystack.co/transaction/initialize", {
      method: "POST",
      headers: { Authorization: `Bearer ${secret}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        email: quote.customer_email,
        amount: amountKobo,
        currency: "NGN",
        reference,
        callback_url: `${origin}/pay/${quote.id}`,
        metadata: { quote_id: quote.id, service: quote.service },
      }),
    });
    const payload = await response.json().catch(() => null);
    if (!response.ok || payload?.status !== true || !payload?.data?.authorization_url) {
      console.error("Paystack initialize failed", response.status, payload?.message || "No response details");
      return json({ error: "Paystack could not start checkout. Please try again." }, 502);
    }

    const { error: attemptError } = await supabase.from("paystack_payment_attempts").insert({
      quote_id: quote.id,
      reference,
      amount_kobo: amountKobo,
      authorization_url: payload.data.authorization_url,
    });
    if (attemptError) throw new Error("Checkout could not be prepared. Please try again.");
    return json({ authorizationUrl: payload.data.authorization_url });
  } catch (error) {
    console.error("paystack-checkout error:", error);
    return json({ error: error instanceof Error ? error.message : "Checkout is unavailable." }, 500);
  }
});