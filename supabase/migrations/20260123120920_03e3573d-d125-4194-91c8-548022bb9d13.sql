-- Create private bucket for video reel submission images
INSERT INTO storage.buckets (id, name, public)
VALUES ('video-reel-submissions', 'video-reel-submissions', false)
ON CONFLICT (id) DO NOTHING;

-- Allow anyone to upload to the video-reel-submissions bucket (for form submission)
CREATE POLICY "Anyone can upload video reel submissions"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'video-reel-submissions');

-- Only content managers can view video reel submissions
CREATE POLICY "Content managers can view video reel submissions"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'video-reel-submissions'
  AND is_content_manager(auth.uid())
);

-- Only content managers can delete video reel submissions
CREATE POLICY "Content managers can delete video reel submissions"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'video-reel-submissions'
  AND is_content_manager(auth.uid())
);

-- Ensure RLS helper functions are version-controlled (CREATE OR REPLACE is safe)
-- These functions already exist but need to be in migrations for reproducibility

CREATE OR REPLACE FUNCTION public.is_content_manager(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('admin', 'editor')
  )
$$;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;