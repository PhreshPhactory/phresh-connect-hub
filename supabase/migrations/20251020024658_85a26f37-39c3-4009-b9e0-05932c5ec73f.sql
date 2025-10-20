-- Add video_url field to blog_posts table for YouTube video embeds
ALTER TABLE public.blog_posts
ADD COLUMN video_url TEXT;