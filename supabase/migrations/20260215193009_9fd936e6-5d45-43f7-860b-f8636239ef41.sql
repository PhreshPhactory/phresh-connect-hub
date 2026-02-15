
CREATE TABLE public.affiliate_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  text_contact TEXT,
  instagram TEXT,
  tiktok TEXT,
  youtube TEXT,
  facebook TEXT,
  twitter TEXT,
  product_categories TEXT[] NOT NULL DEFAULT '{}',
  country TEXT DEFAULT 'Unknown',
  newsletter_opt_in BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.affiliate_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit affiliate signup"
ON public.affiliate_signups FOR INSERT
WITH CHECK (true);

CREATE POLICY "Content managers can view affiliate signups"
ON public.affiliate_signups FOR SELECT
USING (is_content_manager(auth.uid()));
