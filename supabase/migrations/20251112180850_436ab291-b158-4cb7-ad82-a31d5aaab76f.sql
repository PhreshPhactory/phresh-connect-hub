-- Create brand_links table for managing shop links
CREATE TABLE public.brand_links (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  is_featured BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.brand_links ENABLE ROW LEVEL SECURITY;

-- Public can view all brand links
CREATE POLICY "Anyone can view brand links"
ON public.brand_links
FOR SELECT
USING (true);

-- Content managers can create links
CREATE POLICY "Content managers can create brand links"
ON public.brand_links
FOR INSERT
WITH CHECK (is_content_manager(auth.uid()));

-- Content managers can update links
CREATE POLICY "Content managers can update brand links"
ON public.brand_links
FOR UPDATE
USING (is_content_manager(auth.uid()));

-- Content managers can delete links
CREATE POLICY "Content managers can delete brand links"
ON public.brand_links
FOR DELETE
USING (is_content_manager(auth.uid()));

-- Add trigger for updated_at
CREATE TRIGGER update_brand_links_updated_at
BEFORE UPDATE ON public.brand_links
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert existing brands
INSERT INTO public.brand_links (name, url, display_order, is_featured) VALUES
('No Guilt Bakes', 'https://noguiltbakes.co.uk/?_ef_transaction_id=&oid=50&affid=53', 1, true),
('Big Up Street Greets', 'https://www.arjdj2msd.com/3DCFHG/2HKTT6J/', 2, true),
('Name Your Ballz', 'https://www.arjdj2msd.com/3DCFHG/23W5CH8/', 3, true),
('PetPlate', 'https://www.arjdj2msd.com/3DCFHG/PETPLATE', 4, false),
('Be Rooted', 'https://www.arjdj2msd.com/3DCFHG/R74QP1/', 5, false),
('All Shades Cards', 'https://www.arjdj2msd.com/3DCFHG/9F3647', 6, false);