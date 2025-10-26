-- Enable pg_cron extension
CREATE EXTENSION IF NOT EXISTS pg_cron;

-- Schedule daily sync at 6 AM UTC
SELECT cron.schedule(
  'sync-youtube-playlist-daily',
  '0 6 * * *',
  $$
  SELECT
    net.http_post(
        url:='https://xmmfafefyfqzmsutqwug.supabase.co/functions/v1/sync-youtube-playlist',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhtbWZhZmVmeWZxem1zdXRxd3VnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQ2NjI4NTUsImV4cCI6MjA3MDIzODg1NX0.GCCIabDOH8qnctlr-v-R71OkUxed5Q_aEcel8_KTVDQ"}'::jsonb,
        body:='{}'::jsonb
    ) as request_id;
  $$
);