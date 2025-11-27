-- Create brand_contacts table for private brand contact management
CREATE TABLE public.brand_contacts (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_name text NOT NULL,
  brand_email text,
  brand_website text,
  brand_whatsapp text,
  brand_instagram text,
  brand_tiktok text,
  brand_youtube text,
  notes text,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brand_contacts ENABLE ROW LEVEL SECURITY;

-- Only content managers can view brand contacts (private)
CREATE POLICY "Content managers can view brand contacts"
ON public.brand_contacts
FOR SELECT
USING (is_content_manager(auth.uid()));

-- Only content managers can create brand contacts
CREATE POLICY "Content managers can create brand contacts"
ON public.brand_contacts
FOR INSERT
WITH CHECK (is_content_manager(auth.uid()));

-- Only content managers can update brand contacts
CREATE POLICY "Content managers can update brand contacts"
ON public.brand_contacts
FOR UPDATE
USING (is_content_manager(auth.uid()));

-- Only content managers can delete brand contacts
CREATE POLICY "Content managers can delete brand contacts"
ON public.brand_contacts
FOR DELETE
USING (is_content_manager(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_brand_contacts_updated_at
BEFORE UPDATE ON public.brand_contacts
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Remove brand contact columns from blog_posts (cleanup)
ALTER TABLE public.blog_posts
DROP COLUMN IF EXISTS brand_email,
DROP COLUMN IF EXISTS brand_website,
DROP COLUMN IF EXISTS brand_whatsapp,
DROP COLUMN IF EXISTS brand_instagram,
DROP COLUMN IF EXISTS brand_tiktok,
DROP COLUMN IF EXISTS brand_youtube;