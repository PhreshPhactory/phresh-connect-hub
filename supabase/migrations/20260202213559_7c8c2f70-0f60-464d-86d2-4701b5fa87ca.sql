-- Create press_contacts table for media outreach and e-catalog distribution
CREATE TABLE public.press_contacts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT,
  location_string TEXT,
  phone TEXT,
  publications TEXT,
  title TEXT,
  topics TEXT[], -- Array for multiple topics
  categories TEXT[], -- Array for multiple categories
  twitter TEXT,
  linkedin_connected BOOLEAN DEFAULT false,
  last_contacted_at TIMESTAMP WITH TIME ZONE,
  contact_notes TEXT,
  priority TEXT DEFAULT 'medium',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create unique index on email
CREATE UNIQUE INDEX press_contacts_email_unique ON public.press_contacts (email);

-- Enable RLS
ALTER TABLE public.press_contacts ENABLE ROW LEVEL SECURITY;

-- RLS policies for content managers
CREATE POLICY "Content managers can view press contacts"
  ON public.press_contacts FOR SELECT
  USING (is_content_manager(auth.uid()));

CREATE POLICY "Content managers can create press contacts"
  ON public.press_contacts FOR INSERT
  WITH CHECK (is_content_manager(auth.uid()));

CREATE POLICY "Content managers can update press contacts"
  ON public.press_contacts FOR UPDATE
  USING (is_content_manager(auth.uid()));

CREATE POLICY "Content managers can delete press contacts"
  ON public.press_contacts FOR DELETE
  USING (is_content_manager(auth.uid()));

-- Add updated_at trigger
CREATE TRIGGER update_press_contacts_updated_at
  BEFORE UPDATE ON public.press_contacts
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();