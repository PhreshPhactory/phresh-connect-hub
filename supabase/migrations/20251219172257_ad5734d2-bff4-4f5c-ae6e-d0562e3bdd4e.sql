-- Add language field to blog_posts table
ALTER TABLE public.blog_posts 
ADD COLUMN language text NOT NULL DEFAULT 'en';

-- Update existing posts to be marked as English
UPDATE public.blog_posts SET language = 'en' WHERE language IS NULL OR language = '';