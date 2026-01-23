// Shared validation utilities for edge functions

/**
 * Validate email format
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 255;
}

/**
 * Truncate string to max length
 */
export function truncate(str: string | undefined | null, maxLength: number): string {
  if (!str) return "";
  return str.slice(0, maxLength);
}

/**
 * Sanitize and validate text input
 */
export function sanitizeText(
  text: string | undefined | null,
  maxLength: number = 500
): string {
  if (!text) return "";
  // Remove null bytes and control characters (except newlines and tabs)
  const cleaned = text.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, "");
  return cleaned.slice(0, maxLength);
}

/**
 * Validate URL format
 */
export function isValidUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return ["http:", "https:"].includes(parsed.protocol) && url.length <= 2000;
  } catch {
    return false;
  }
}

/**
 * Escape HTML to prevent XSS
 */
export function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

/**
 * Validate required fields exist and are non-empty strings
 */
export function validateRequiredFields(
  data: Record<string, unknown>,
  fields: string[]
): { valid: boolean; missing: string[] } {
  const missing: string[] = [];
  
  for (const field of fields) {
    const value = data[field];
    if (value === undefined || value === null || (typeof value === "string" && !value.trim())) {
      missing.push(field);
    }
  }
  
  return { valid: missing.length === 0, missing };
}
