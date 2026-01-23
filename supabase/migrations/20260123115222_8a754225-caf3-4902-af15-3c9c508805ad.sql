-- Harden analytics inserts (INPUT_VALIDATION)

-- 1) Enforce safe field lengths (truncating existing values during type conversion)
ALTER TABLE public.blog_analytics
  ALTER COLUMN user_agent TYPE varchar(500) USING left(user_agent, 500),
  ALTER COLUMN referrer   TYPE varchar(500) USING left(referrer, 500);

ALTER TABLE public.link_clicks
  ALTER COLUMN user_agent TYPE varchar(500)  USING left(user_agent, 500),
  ALTER COLUMN referrer   TYPE varchar(500)  USING left(referrer, 500),
  ALTER COLUMN link_name  TYPE varchar(200)  USING left(link_name, 200),
  ALTER COLUMN link_url   TYPE varchar(1000) USING left(link_url, 1000);

-- 2) Replace permissive INSERT policies with validated ones
DROP POLICY IF EXISTS "Anyone can insert analytics" ON public.blog_analytics;
CREATE POLICY "Validate analytics insert"
  ON public.blog_analytics
  FOR INSERT
  WITH CHECK (
    -- Only allow analytics for published posts
    EXISTS (
      SELECT 1
      FROM public.blog_posts bp
      WHERE bp.id = blog_post_id
        AND bp.published = true
    )
    AND length(coalesce(user_agent, '')) <= 500
    AND length(coalesce(referrer, '')) <= 500
  );

DROP POLICY IF EXISTS "Anyone can insert link clicks" ON public.link_clicks;
CREATE POLICY "Validate link clicks insert"
  ON public.link_clicks
  FOR INSERT
  WITH CHECK (
    -- Require non-empty values
    length(btrim(link_name)) > 0
    AND length(btrim(link_url)) > 0

    -- Basic URL shape: absolute http(s) or site-relative
    AND btrim(link_url) ~* '^(https?://|/)'

    -- Redundant length guards (also enforced by varchar types)
    AND length(coalesce(user_agent, '')) <= 500
    AND length(coalesce(referrer, '')) <= 500
    AND length(btrim(link_name)) <= 200
    AND length(btrim(link_url)) <= 1000
  );
