
-- Create broadcast_logs table to track newsletter sends
CREATE TABLE public.broadcast_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  template_id text,
  recipient_emails text[] NOT NULL DEFAULT '{}',
  recipient_count integer NOT NULL DEFAULT 0,
  sent_at timestamp with time zone NOT NULL DEFAULT now(),
  sent_by uuid REFERENCES auth.users(id),
  notes text
);

-- Enable RLS
ALTER TABLE public.broadcast_logs ENABLE ROW LEVEL SECURITY;

-- Only content managers can view broadcast logs
CREATE POLICY "Content managers can view broadcast logs"
  ON public.broadcast_logs FOR SELECT
  USING (is_content_manager(auth.uid()));

-- Only content managers can create broadcast logs
CREATE POLICY "Content managers can create broadcast logs"
  ON public.broadcast_logs FOR INSERT
  WITH CHECK (is_content_manager(auth.uid()));

-- Only admins can delete broadcast logs
CREATE POLICY "Only admins can delete broadcast logs"
  ON public.broadcast_logs FOR DELETE
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Index for quick lookups by date
CREATE INDEX idx_broadcast_logs_sent_at ON public.broadcast_logs (sent_at DESC);
