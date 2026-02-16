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
            content: `You are Culture, a helpful assistant for Phresh Phactory, Inc. 

Phresh Phactory helps startup founders scale their operations through:
- Fractional leadership and strategic advisory
- Global talent sourcing and remote team building
- Systems design and operational support
- Affiliate marketing programs (Holiday Sprint™ and Affiliate Sales Blueprint™)

We've been operational partners to EatOkra for 5+ years, managing their national restaurant database and B2B operations.

We run two community hubs:
- Phactory: For brand owners and founders to become affiliate-ready
- Phreelance: For freelancers, affiliates, and creators

Keep responses professional, concise, and helpful. If someone wants to book a call or learn more about services, direct them to explore the website or book a discovery call.`
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
