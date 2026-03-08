import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const ADMIN_PASSWORD = Deno.env.get("ADMIN_REVIEW_PASSWORD") || "";
const TOKEN_SECRET = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";

// Simple rate limiting: track failed attempts per IP
const failedAttempts = new Map<string, { count: number; lastAttempt: number }>();
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 15 * 60 * 1000; // 15 minutes

function isRateLimited(ip: string): boolean {
  const entry = failedAttempts.get(ip);
  if (!entry) return false;
  if (Date.now() - entry.lastAttempt > LOCKOUT_MS) {
    failedAttempts.delete(ip);
    return false;
  }
  return entry.count >= MAX_ATTEMPTS;
}

function recordFailedAttempt(ip: string) {
  const entry = failedAttempts.get(ip);
  if (entry) {
    entry.count++;
    entry.lastAttempt = Date.now();
  } else {
    failedAttempts.set(ip, { count: 1, lastAttempt: Date.now() });
  }
}

function clearAttempts(ip: string) {
  failedAttempts.delete(ip);
}

// Simple token: base64(timestamp:hmac)
async function createToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw", encoder.encode(TOKEN_SECRET),
    { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
  const hmac = btoa(String.fromCharCode(...new Uint8Array(sig)));
  return btoa(`${timestamp}:${hmac}`);
}

async function verifyToken(token: string): Promise<boolean> {
  try {
    const decoded = atob(token);
    const [timestamp, hmac] = decoded.split(":");
    if (!timestamp || !hmac) return false;

    // Token expires after 2 hours
    const age = Date.now() - parseInt(timestamp);
    if (age > 2 * 60 * 60 * 1000) return false;

    const encoder = new TextEncoder();
    const key = await crypto.subtle.importKey(
      "raw", encoder.encode(TOKEN_SECRET),
      { name: "HMAC", hash: "SHA-256" }, false, ["sign"]
    );
    const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
    const expectedHmac = btoa(String.fromCharCode(...new Uint8Array(expectedSig)));
    return hmac === expectedHmac;
  } catch {
    return false;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const clientIp = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";

  try {
    const body = await req.json();
    const { action, id, password, token } = body;

    // Login action: validate password, return token
    if (action === "login") {
      if (isRateLimited(clientIp)) {
        return new Response(JSON.stringify({ error: "Too many attempts. Try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      if (!ADMIN_PASSWORD || password !== ADMIN_PASSWORD) {
        recordFailedAttempt(clientIp);
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }

      clearAttempts(clientIp);
      const newToken = await createToken();
      return new Response(JSON.stringify({ token: newToken }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // All other actions require a valid token
    if (!token || !(await verifyToken(token))) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    if (action === "list") {
      const { data, error } = await supabase
        .from("client_reviews")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return new Response(JSON.stringify({ reviews: data }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "approve") {
      const { error } = await supabase
        .from("client_reviews")
        .update({ approved: true })
        .eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "reject") {
      const { error } = await supabase
        .from("client_reviews")
        .update({ approved: false })
        .eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (action === "delete") {
      const { error } = await supabase
        .from("client_reviews")
        .delete()
        .eq("id", id);
      if (error) throw error;
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: "Invalid action" }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("admin-reviews error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
