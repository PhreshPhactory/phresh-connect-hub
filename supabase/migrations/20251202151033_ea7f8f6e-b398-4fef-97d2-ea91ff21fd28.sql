-- Create table for video reel submissions (paid brand placements)
CREATE TABLE public.video_reel_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_name TEXT NOT NULL,
  product_description TEXT NOT NULL,
  product_url TEXT NOT NULL,
  brand_name TEXT NOT NULL,
  brand_email TEXT NOT NULL,
  image_urls TEXT[] DEFAULT '{}',
  stripe_session_id TEXT,
  payment_status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.video_reel_submissions ENABLE ROW LEVEL SECURITY;

-- Anyone can insert (for initial submission before payment)
CREATE POLICY "Anyone can create submissions"
ON public.video_reel_submissions
FOR INSERT
WITH CHECK (true);

-- Content managers can view all submissions
CREATE POLICY "Content managers can view submissions"
ON public.video_reel_submissions
FOR SELECT
USING (is_content_manager(auth.uid()));

-- Content managers can update submissions
CREATE POLICY "Content managers can update submissions"
ON public.video_reel_submissions
FOR UPDATE
USING (is_content_manager(auth.uid()));

-- Content managers can delete submissions
CREATE POLICY "Content managers can delete submissions"
ON public.video_reel_submissions
FOR DELETE
USING (is_content_manager(auth.uid()));

-- Trigger for updated_at
CREATE TRIGGER update_video_reel_submissions_updated_at
BEFORE UPDATE ON public.video_reel_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();