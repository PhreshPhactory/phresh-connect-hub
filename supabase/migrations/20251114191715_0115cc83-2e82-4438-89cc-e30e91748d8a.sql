-- Create newsletter_subscribers table
CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL,
  name TEXT,
  source TEXT NOT NULL, -- which page they signed up from
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_email UNIQUE (email)
);

-- Enable RLS
ALTER TABLE public.newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to subscribe
CREATE POLICY "Anyone can subscribe to newsletter"
  ON public.newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only content managers can view subscribers
CREATE POLICY "Content managers can view newsletter subscribers"
  ON public.newsletter_subscribers
  FOR SELECT
  USING (is_content_manager(auth.uid()));

-- Add index for faster email lookups
CREATE INDEX idx_newsletter_email ON public.newsletter_subscribers(email);