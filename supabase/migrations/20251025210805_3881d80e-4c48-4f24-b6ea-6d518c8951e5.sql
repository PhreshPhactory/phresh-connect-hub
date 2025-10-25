-- Add shorts_url column to blog_posts table
ALTER TABLE public.blog_posts
ADD COLUMN shorts_url text;