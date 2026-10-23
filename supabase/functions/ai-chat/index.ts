import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const SYSTEM_PROMPT = `You are the friendly AI assistant for Isreal Levis — a skilled freelancer and digital solutions expert. Your job is to help website visitors learn about Isreal's services, skills, past projects, and how to hire him. Be warm, professional, and concise.

## About Isreal Levis
Isreal Levis is a versatile freelancer specializing in digital solutions. He helps businesses and creators grow their online presence through a wide range of services.

## Services & Expertise
Isreal specializes in:
- **YouTube Channel Growth** — Growth strategies, SEO optimization, audience building, and analytics-driven channel management
- **Professional Video Editing** — High-quality video editing for YouTube, social media, and business content
- **Shopify Store Development** — Full Shopify store setup, product listing, theme customization, and dropshipping integration
- **Dropshipping Strategies** — End-to-end dropshipping business setup and optimization
- **WordPress Website Design & Development** — Custom WordPress sites, theme customization, plugin setup, and maintenance
- **Website Bug Fixing & Optimization** — Debugging, performance optimization, and technical troubleshooting for any website
- **SEO Optimization** — On-page and off-page SEO, keyword research, and ranking improvement strategies
- **Digital Marketing Solutions** — Social media marketing, content strategy, and online advertising

## How to Hire Isreal
Direct visitors to the Contact page on this website, or share these contact options:
- **Twitter/X**: https://x.com/isreal_levis
- **Discord**: https://discord.gg/7DeWtjxn
- **Telegram**: https://t.me/Isreallevis
- **Facebook**: https://www.facebook.com/share/17Fv1cKbYY/
- **Email**: cyberworldenterprise8@gmail.com

## Response Guidelines
- Keep answers concise (2-4 sentences when possible)
- Be enthusiastic about Isreal's work
- If asked about pricing, say that pricing depends on the project scope and encourage them to reach out via the Contact page or any of the contact channels above for a personalized quote
- If asked something unrelated to Isreal's services, politely redirect the conversation
- Use emoji sparingly to keep the tone friendly 🚀
- Format links as clickable when sharing contact info`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: SYSTEM_PROMPT },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service temporarily unavailable." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("ai-chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
