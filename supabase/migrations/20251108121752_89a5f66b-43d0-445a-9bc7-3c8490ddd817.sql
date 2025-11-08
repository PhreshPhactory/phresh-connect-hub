-- Create link_clicks table for tracking clicks on LinkInBio page
CREATE TABLE public.link_clicks (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  link_name text NOT NULL,
  link_url text NOT NULL,
  clicked_at timestamp with time zone NOT NULL DEFAULT now(),
  referrer text,
  user_agent text
);

-- Enable RLS
ALTER TABLE public.link_clicks ENABLE ROW LEVEL SECURITY;

-- RLS policies for link_clicks
CREATE POLICY "Content managers can view link clicks"
  ON public.link_clicks
  FOR SELECT
  USING (is_content_manager(auth.uid()));

CREATE POLICY "Anyone can insert link clicks"
  ON public.link_clicks
  FOR INSERT
  WITH CHECK (true);

-- Add indexes for better query performance
CREATE INDEX idx_link_clicks_name ON link_clicks(link_name);
CREATE INDEX idx_link_clicks_clicked_at ON link_clicks(clicked_at);