
-- 1. Remove dangerous DELETE policy on newsletter_subscribers (unsubscribe uses UPDATE)
DROP POLICY IF EXISTS "Anyone can unsubscribe by email" ON public.newsletter_subscribers;

-- 2. Remove permissive write policies on blog-images bucket (keep content-manager-only)
DROP POLICY IF EXISTS "Anyone can upload blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update blog images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete blog images" ON storage.objects;

-- 3. Restrict SELECT on holiday-sprint-materials (private bucket) to content managers
DROP POLICY IF EXISTS "Anyone can view their uploaded materials" ON storage.objects;
CREATE POLICY "Content managers can view holiday sprint materials"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'holiday-sprint-materials' AND public.is_content_manager(auth.uid()));

-- 4. Also restrict uploads to authenticated users only (was open to anyone)
DROP POLICY IF EXISTS "Anyone can upload materials" ON storage.objects;
CREATE POLICY "Authenticated users can upload holiday sprint materials"
  ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'holiday-sprint-materials');

-- 5. Revoke EXECUTE on admin-only SECURITY DEFINER functions from public/anon/authenticated
REVOKE ALL ON FUNCTION public.make_user_admin(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.make_user_editor(text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.increment_view_count(uuid) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.generate_slug(text) FROM PUBLIC, anon, authenticated;
