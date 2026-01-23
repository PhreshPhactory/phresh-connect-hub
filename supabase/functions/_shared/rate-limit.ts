// Shared rate limiting utility for edge functions
// Uses in-memory store (per function instance) for simplicity
// For production at scale, consider using Supabase or Redis

const requestCounts = new Map<string, { count: number; resetAt: number }>();

export interface RateLimitConfig {
  windowMs: number; // Time window in milliseconds
  maxRequests: number; // Max requests per window
}

export const DEFAULT_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 10, // 10 requests per minute
};

export const STRICT_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 5, // 5 requests per minute
};

export const RELAXED_RATE_LIMIT: RateLimitConfig = {
  windowMs: 60 * 1000, // 1 minute
  maxRequests: 20, // 20 requests per minute
};

/**
 * Check rate limit for a given identifier (usually IP address)
 * @returns true if request is allowed, false if rate limited
 */
export function checkRateLimit(
  identifier: string,
  functionName: string,
  config: RateLimitConfig = DEFAULT_RATE_LIMIT
): boolean {
  const key = `${functionName}:${identifier}`;
  const now = Date.now();
  
  const record = requestCounts.get(key);
  
  if (!record || now >= record.resetAt) {
    // New window or expired window
    requestCounts.set(key, {
      count: 1,
      resetAt: now + config.windowMs,
    });
    return true;
  }
  
  if (record.count >= config.maxRequests) {
    return false; // Rate limited
  }
  
  record.count += 1;
  return true;
}

/**
 * Get client IP from request headers
 */
export function getClientIP(req: Request): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

/**
 * Create CORS headers with allowed origins
 */
export function createCorsHeaders(req: Request): Record<string, string> {
  const allowedOrigins = [
    "https://phreshphactory.com",
    "https://www.phreshphactory.com",
    "https://phresh-connect-hub.lovable.app",
    "https://id-preview--9a01b4e9-dfa6-44d7-befb-a427ea75d7f4.lovable.app",
    // Development origins
    "http://localhost:5173",
    "http://localhost:8080",
  ];
  
  const origin = req.headers.get("origin") || "";
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  
  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  };
}

/**
 * Create rate limit exceeded response
 */
export function rateLimitResponse(corsHeaders: Record<string, string>): Response {
  return new Response(
    JSON.stringify({ error: "Too many requests. Please try again later." }),
    {
      status: 429,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    }
  );
}

// Cleanup old entries periodically (every 5 minutes)
setInterval(() => {
  const now = Date.now();
  for (const [key, record] of requestCounts.entries()) {
    if (now >= record.resetAt) {
      requestCounts.delete(key);
    }
  }
}, 5 * 60 * 1000);
