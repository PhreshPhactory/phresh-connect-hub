import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
    if (!RESEND_API_KEY) {
      throw new Error('RESEND_API_KEY is not configured');
    }

    const { to, subject, html, template_id } = await req.json();

    if (!to || !subject) {
      return new Response(JSON.stringify({ error: 'Missing required fields: to, subject' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!html && !template_id) {
      return new Response(JSON.stringify({ error: 'Must provide either html or template_id' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const recipients = Array.isArray(to) ? to : [to];

    // Resolve HTML content (from template or direct)
    let resolvedHtml = html;
    if (template_id) {
      const tplRes = await fetch(`https://api.resend.com/templates/${template_id}`, {
        headers: { 'Authorization': `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      });
      const tplData = await tplRes.json();
      if (!tplRes.ok) throw new Error(`Template fetch error: ${JSON.stringify(tplData)}`);
      resolvedHtml = tplData.html_content || tplData.html || '';
    }

    // Batch recipients into groups of 49 (Resend max is 50)
    const BATCH_SIZE = 49;
    const batches: string[][] = [];
    for (let i = 0; i < recipients.length; i += BATCH_SIZE) {
      batches.push(recipients.slice(i, i + BATCH_SIZE));
    }

    const results = [];
    const errors = [];

    for (const batch of batches) {
      try {
        const res = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'Phresh Phactory <notifications@phreshphactory.co>',
            to: batch,
            subject,
            html: resolvedHtml,
          }),
        });

        const data = await res.json();
        if (!res.ok) {
          errors.push({ batch: batch.length, error: data });
        } else {
          results.push(data);
        }
      } catch (err) {
        errors.push({ batch: batch.length, error: String(err) });
      }
    }

    return new Response(JSON.stringify({
      success: errors.length === 0,
      total_recipients: recipients.length,
      batches_sent: results.length,
      batches_failed: errors.length,
      results,
      errors: errors.length > 0 ? errors : undefined,
    }), {
      status: errors.length === 0 ? 200 : 207,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
