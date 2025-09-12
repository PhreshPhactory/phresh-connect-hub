import DOMPurify from 'dompurify';
import { z } from 'zod';

// HTML Sanitization
export const sanitizeHTML = (html: string): string => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
      'p', 'br', 'strong', 'em', 'u', 'strike',
      'ul', 'ol', 'li',
      'blockquote', 'code', 'pre',
      'a', 'img',
      'table', 'thead', 'tbody', 'tr', 'th', 'td'
    ],
    ALLOWED_ATTR: [
      'href', 'target', 'rel',
      'src', 'alt', 'width', 'height',
      'class'
    ],
    ALLOWED_URI_REGEXP: /^(?:(?:(?:f|ht)tps?|mailto|tel|callto|sms|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i,
    ADD_ATTR: ['target'],
    ADD_TAGS: ['iframe'],
    FORBID_ATTR: ['style', 'onload', 'onerror', 'onclick', 'onmouseover'],
    FORBID_TAGS: ['script', 'object', 'embed', 'form', 'input', 'textarea', 'select', 'button']
  });
};

// Input validation schemas
export const emailSchema = z.string()
  .email('Invalid email format')
  .min(5, 'Email must be at least 5 characters')
  .max(254, 'Email must be less than 254 characters')
  .transform(email => email.toLowerCase().trim());

export const nameSchema = z.string()
  .min(2, 'Name must be at least 2 characters')
  .max(100, 'Name must be less than 100 characters')
  .regex(/^[a-zA-Z\s\-'.]+$/, 'Name contains invalid characters')
  .transform(name => name.trim());

export const urlSchema = z.string()
  .url('Invalid URL format')
  .max(2048, 'URL must be less than 2048 characters')
  .optional()
  .or(z.literal(''))
  .transform(url => url?.trim());

export const textSchema = z.string()
  .min(1, 'This field is required')
  .max(1000, 'Text must be less than 1000 characters')
  .transform(text => text.trim());

export const companySchema = z.string()
  .min(1, 'Company name is required')
  .max(100, 'Company name must be less than 100 characters')
  .transform(text => text.trim());

export const challengesSchema = z.string()
  .min(10, 'Please describe your challenges (minimum 10 characters)')
  .max(1000, 'Description must be less than 1000 characters')
  .transform(text => text.trim());

export const messageSchema = z.string()
  .max(5000, 'Message must be less than 5000 characters')
  .optional()
  .transform(text => text?.trim());

// Rate limiting helper
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; resetTime: number }>();

  return (identifier: string): boolean => {
    const now = Date.now();
    const userAttempts = attempts.get(identifier);

    if (!userAttempts || now > userAttempts.resetTime) {
      attempts.set(identifier, { count: 1, resetTime: now + windowMs });
      return true;
    }

    if (userAttempts.count >= maxAttempts) {
      return false;
    }

    userAttempts.count++;
    return true;
  };
};

// Content Security Policy helpers
export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

// Input sanitization
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

// Honeypot validation
export const validateHoneypot = (honeypotValue: string): boolean => {
  return honeypotValue === '' || honeypotValue === undefined;
};