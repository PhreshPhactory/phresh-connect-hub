-- Add brand contact fields to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN IF NOT EXISTS brand_email text,
ADD COLUMN IF NOT EXISTS brand_website text,
ADD COLUMN IF NOT EXISTS brand_whatsapp text,
ADD COLUMN IF NOT EXISTS brand_instagram text,
ADD COLUMN IF NOT EXISTS brand_tiktok text,
ADD COLUMN IF NOT EXISTS brand_youtube text;