import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import {
  checkRateLimit,
  getClientIP,
  createCorsHeaders,
  rateLimitResponse,
  RELAXED_RATE_LIMIT,
} from "../_shared/rate-limit.ts";
import { sanitizeText } from "../_shared/validation.ts";

// Chat-specific rate limit: 20 messages per minute
const CHAT_RATE_LIMIT = {
  windowMs: 60 * 1000,
  maxRequests: 20,
};

serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limiting
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, "chat-support", CHAT_RATE_LIMIT)) {
    console.log(`Chat rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(corsHeaders);
  }

  try {
    const body = await req.json();
    const messages = body.messages;

    // Validate messages array
    if (!Array.isArray(messages) || messages.length === 0) {
      return new Response(
        JSON.stringify({ error: "Invalid messages format" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Limit number of messages in history (prevent abuse)
    if (messages.length > 50) {
      return new Response(
        JSON.stringify({ error: "Too many messages in history" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Sanitize and validate each message
    const sanitizedMessages = messages.slice(-20).map((msg: { role?: string; content?: string }) => {
      if (!msg.role || !msg.content) {
        throw new Error("Invalid message format");
      }
      
      // Only allow user/assistant roles
      if (!['user', 'assistant'].includes(msg.role)) {
        throw new Error("Invalid message role");
      }

      return {
        role: msg.role,
        content: sanitizeText(msg.content, 2000), // Max 2000 chars per message
      };
    });

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { 
            role: "system", 
            content: `You are Culture, a helpful assistant for Phresh Phactory, Inc. Keep responses professional, concise, and refined. Never use slang, emojis, or em-dashes. Use the term "Afro-descendant" instead of "Black-owned."

ABOUT PHRESH PHACTORY:
Phresh Phactory, Inc. is a boutique operations consultancy founded by Kiera H., a fractional executive and systems strategist with over 20 years of experience spanning the U.S., the Caribbean, and Africa. We help visionary founders, creatives, and early-stage companies transform ideas into repeatable infrastructure.

We are proudly diaspora-focused, supporting founders and teams with culturally aligned, results-driven strategy across industries and continents. We operate remotely with a presence in the U.S. and Caribbean.

CORE SERVICES:
1. Fractional Executive Leadership: Strategic sessions, business transformation roadmapping, team structure design, weekly guidance, and direct access for urgent decisions. For growing businesses that need strategic leadership but aren't ready for C-level hires. Pricing starts at $8,000/month.
2. Global Talent Excellence: We hire elite talent from across the global diaspora including Africa, America, and the Caribbean. Full team integration, cultural fit assessment, onboarding, and ongoing performance management.
3. Legacy Business Transformation: We help family and legacy businesses restructure, digitize, and rebuild for succession or sale. Digital transformation, operational restructuring, exit planning.
4. High-Performance Systems Design: Accountability frameworks, end-to-end process optimization, strategic systems integration, performance tracking, and scalability planning.

ADDITIONAL OFFERINGS:
- Starter Audit: $3,000 one-time. Full operations audit, gap analysis, 90-day roadmap, and 2 implementation sessions.
- Board Advisor: $1,500/month. Monthly advisory sessions, quarterly strategy reviews, on-call support (5hrs/mo), network introductions.
- Ops Metrics Kit: $497 one-time. Plug-and-play dashboard for operational visibility.

PROGRAMS:
- The Affiliate Sales Blueprint Bootcamp: A 1-on-1 working session for brands ready to turn affiliate programs into revenue. Built from real operational work with EatOkra and Afrofiliate. Three tiers: Foundation ($1,500), Growth ($2,500), and Scale ($5,000). Brands leave with a complete Affiliate Asset Kit including messaging hooks, scripts, captions, and a launch campaign.
- Socially Selling Food: A 4-session working lab ($299) for food-related businesses (restaurants, food trucks, caterers, private chefs) to build sellable digital offers using AI tools. Sessions on Tuesdays, 2:30 PM ET.

COMMUNITIES:
- Phactory: A training community for founders, brand owners, and product-based businesses learning to prepare for affiliate partnerships and digital growth.
- Phreelance: A training community for freelancers, affiliates, creators, and remote workers to support mission-driven brands and create reliable income streams.

MEDIA:
- Phresh Phactory TV: Our YouTube channel and TikTok LIVE showcases featuring Afro-descendant created products.
- Culture and Commerce: Our email newsletter delivering a curated selection of Afro-descendant created products directly to subscribers' inboxes.
- LinkedIn Newsletter: Phresh Phactory Growth Notes, available on LinkedIn.

KEY PARTNERSHIPS:
- EatOkra: 5+ years as operational partners, managing their national restaurant database and B2B operations.
- Afrofiliate: Strategic advisory relationship.

CONTACT:
- Book a discovery call: calendly.com/PhreshPhactory
- General inquiries: info@phreshphactory.com
- Brand inquiries: Brands@PhreshPhactory.co
- Kiera directly: Kiera@PhreshPhactory.co

When someone wants to learn more about services, direct them to the Services page or suggest booking a discovery call at calendly.com/PhreshPhactory.`
          },
          ...sanitizedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limits exceeded, please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(JSON.stringify({ error: "AI service error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
