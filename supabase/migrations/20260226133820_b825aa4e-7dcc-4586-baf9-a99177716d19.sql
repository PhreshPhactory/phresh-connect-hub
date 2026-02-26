
-- Create newsletter_editions table
CREATE TABLE public.newsletter_editions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subtitle TEXT,
  slug TEXT NOT NULL UNIQUE,
  cover_image TEXT,
  content TEXT NOT NULL DEFAULT '',
  published BOOLEAN NOT NULL DEFAULT false,
  published_at TIMESTAMP WITH TIME ZONE,
  featured_creator TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.newsletter_editions ENABLE ROW LEVEL SECURITY;

-- Public can view published editions
CREATE POLICY "Anyone can view published editions"
ON public.newsletter_editions
FOR SELECT
USING (published = true);

-- Content managers can view all editions
CREATE POLICY "Content managers can view all editions"
ON public.newsletter_editions
FOR SELECT
USING (is_content_manager(auth.uid()));

-- Content managers can create editions
CREATE POLICY "Content managers can create editions"
ON public.newsletter_editions
FOR INSERT
WITH CHECK (is_content_manager(auth.uid()));

-- Content managers can update editions
CREATE POLICY "Content managers can update editions"
ON public.newsletter_editions
FOR UPDATE
USING (is_content_manager(auth.uid()));

-- Only admins can delete editions
CREATE POLICY "Only admins can delete editions"
ON public.newsletter_editions
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_newsletter_editions_updated_at
BEFORE UPDATE ON public.newsletter_editions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Index for slug lookups
CREATE INDEX idx_newsletter_editions_slug ON public.newsletter_editions (slug);
CREATE INDEX idx_newsletter_editions_published ON public.newsletter_editions (published, published_at DESC);
