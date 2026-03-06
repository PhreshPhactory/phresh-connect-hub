CREATE TABLE public.live_shopping_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  categories text[] NOT NULL DEFAULT '{}',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT live_shopping_waitlist_email_unique UNIQUE (email)
);

ALTER TABLE public.live_shopping_waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist" ON public.live_shopping_waitlist
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Content managers can view waitlist" ON public.live_shopping_waitlist
  FOR SELECT USING (is_content_manager(auth.uid()));