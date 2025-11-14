-- Create table for Holiday Sprint applications
CREATE TABLE IF NOT EXISTS public.holiday_sprint_applications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  email TEXT NOT NULL,
  brand_website TEXT,
  social_handle TEXT,
  has_affiliate_program BOOLEAN NOT NULL,
  affiliate_platform TEXT,
  products_description TEXT NOT NULL,
  desired_results TEXT NOT NULL,
  biggest_challenge TEXT NOT NULL,
  materials_urls TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.holiday_sprint_applications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert applications (public form)
CREATE POLICY "Anyone can submit applications"
ON public.holiday_sprint_applications
FOR INSERT
WITH CHECK (true);

-- Only authenticated users can view applications (for admin)
CREATE POLICY "Authenticated users can view applications"
ON public.holiday_sprint_applications
FOR SELECT
USING (auth.role() = 'authenticated');

-- Create storage bucket for application materials
INSERT INTO storage.buckets (id, name, public)
VALUES ('holiday-sprint-materials', 'holiday-sprint-materials', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for uploading materials
CREATE POLICY "Anyone can upload materials"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'holiday-sprint-materials');

CREATE POLICY "Anyone can view their uploaded materials"
ON storage.objects
FOR SELECT
USING (bucket_id = 'holiday-sprint-materials');