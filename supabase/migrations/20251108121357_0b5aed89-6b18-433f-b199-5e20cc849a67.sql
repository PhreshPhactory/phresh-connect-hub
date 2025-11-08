-- Add view_count column to blog_posts
ALTER TABLE blog_posts ADD COLUMN view_count integer NOT NULL DEFAULT 0;

-- Create blog_analytics table for detailed tracking
CREATE TABLE public.blog_analytics (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  viewed_at timestamp with time zone NOT NULL DEFAULT now(),
  referrer text,
  user_agent text
);

-- Enable RLS
ALTER TABLE public.blog_analytics ENABLE ROW LEVEL SECURITY;

-- RLS policies for blog_analytics
CREATE POLICY "Content managers can view analytics"
  ON public.blog_analytics
  FOR SELECT
  USING (is_content_manager(auth.uid()));

CREATE POLICY "Anyone can insert analytics"
  ON public.blog_analytics
  FOR INSERT
  WITH CHECK (true);

-- Add indexes for better query performance
CREATE INDEX idx_blog_analytics_post_id ON blog_analytics(blog_post_id);
CREATE INDEX idx_blog_analytics_viewed_at ON blog_analytics(viewed_at);