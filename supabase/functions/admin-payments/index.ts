import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createAdminToken, verifyAdminToken } from "../_shared/admin-token.ts";
import { getAdminClient } from "../_shared/paystack.ts";

const attempts = new Map<string, { count: number; since: number }>();
const maxAttempts = 5;
const lockoutMs = 15 * 60 * 1000;

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

function validEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  try {
    const body = await req.json();
    const action = body?.action;
    const passwordSecret = Deno.env.get("ADMIN_REVIEW_PASSWORD") || "";
    const tokenSecret = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

    if (action === "login") {
      const previous = attempts.get(ip);
      if (previous && Date.now() - previous.since < lockoutMs && previous.count >= maxAttempts) return json({ error: "Too many attempts. Try again later." }, 429);
      if (!passwordSecret || typeof body.password !== "string" || body.password !== passwordSecret) {
        if (!previous || Date.now() - previous.since >= lockoutMs) attempts.set(ip, { count: 1, since: Date.now() });
        else attempts.set(ip, { count: previous.count + 1, since: previous.since });
        return json({ error: "Unauthorized" }, 401);
      }
      attempts.delete(ip);
      return json({ token: await createAdminToken(tokenSecret) });
    }

    if (!tokenSecret || typeof body.token !== "string" || !(await verifyAdminToken(body.token, tokenSecret))) return json({ error: "Unauthorized" }, 401);
    const supabase = getAdminClient();

    if (action === "list") {
      const { data, error } = await supabase.from("paystack_quotes").select("id, customer_name, customer_email, service, description, amount_ngn, amount_kobo, status, created_at, paystack_reference").order("created_at", { ascending: false }).limit(100);
      if (error) throw error;
      return json({ quotes: data, paymentReady: Boolean(Deno.env.get("PAYSTACK_SECRET_KEY")) });
    }

    if (action === "create") {
      const quote = body.quote;
      if (!quote || typeof quote !== "object") return json({ error: "Enter valid quote details." }, 400);
      const customerName = typeof quote.customerName === "string" ? quote.customerName.trim() : "";
      const customerEmail = typeof quote.customerEmail === "string" ? quote.customerEmail.trim() : "";
      const service = typeof quote.service === "string" ? quote.service.trim() : "";
      const description = typeof quote.description === "string" ? quote.description.trim() : "";
      const amountKobo = quote.amountKobo;
      if (customerName.length < 1 || customerName.length > 100 || !validEmail(customerEmail) || customerEmail.length > 255 || service.length < 1 || service.length > 160 || description.length < 1 || description.length > 2000 || !Number.isSafeInteger(amountKobo) || amountKobo <= 0 || amountKobo > 10000000000000) {
        return json({ error: "Check the customer details and enter a valid NGN amount greater than zero." }, 400);
      }
      const { data, error } = await supabase.from("paystack_quotes").insert({
        customer_name: customerName,
        customer_email: customerEmail,
        service,
        description,
        amount_ngn: Math.floor(amountKobo / 100),
        amount_kobo: amountKobo,
      }).select("id, customer_name, customer_email, service, description, amount_ngn, amount_kobo, status, created_at").single();
      if (error) throw error;
      return json({ quote: data }, 201);
    }

    return json({ error: "Invalid action" }, 400);
  } catch (error) {
    console.error("admin-payments error:", error);
    return json({ error: error instanceof Error ? error.message : "Payment management is unavailable." }, 500);
  }
});