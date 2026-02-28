-- Create the increment_view_count RPC function
CREATE OR REPLACE FUNCTION public.increment_view_count(post_id uuid)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE blog_posts
  SET view_count = view_count + 1
  WHERE id = post_id;
$$;

-- Grant execute to anon and authenticated users (public blog views)
GRANT EXECUTE ON FUNCTION public.increment_view_count(uuid) TO anon;
GRANT EXECUTE ON FUNCTION public.increment_view_count(uuid) TO authenticated;

-- Create blog-images storage bucket with RLS policies
INSERT INTO storage.buckets (id, name, public)
VALUES ('blog-images', 'blog-images', true)
ON CONFLICT (id) DO NOTHING;

-- Only content managers can upload blog images
CREATE POLICY "Content managers can upload blog images"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'blog-images' 
    AND is_content_manager(auth.uid())
  );

-- Anyone can view blog images (public bucket)
CREATE POLICY "Anyone can view blog images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-images');

-- Only content managers can update blog images
CREATE POLICY "Content managers can update blog images"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'blog-images'
    AND is_content_manager(auth.uid())
  );

-- Only content managers can delete blog images
CREATE POLICY "Content managers can delete blog images"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'blog-images'
    AND is_content_manager(auth.uid())
  );