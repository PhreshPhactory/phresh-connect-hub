import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface BlogifyWebhookData {
  title: string;
  content: string;
  excerpt?: string;
  category?: string;
  feature_image?: string;
  published?: boolean;
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Only accept POST requests
  if (req.method !== 'POST') {
    console.log(`Method ${req.method} not allowed`);
    return new Response(
      JSON.stringify({ error: 'Method not allowed' }),
      { 
        status: 405, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }

  try {
    // SECURITY: Verify webhook secret - this is CRITICAL for security
    const authHeader = req.headers.get('authorization');
    const webhookSecret = Deno.env.get('BLOGIFY_WEBHOOK_SECRET');
    
    if (!webhookSecret) {
      console.error('BLOGIFY_WEBHOOK_SECRET not configured');
      return new Response(
        JSON.stringify({ error: 'Server configuration error' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }
    
    // Verify the Authorization header matches our secret
    if (!authHeader || authHeader !== `Bearer ${webhookSecret}`) {
      console.error('Unauthorized webhook attempt - invalid or missing secret');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Parse webhook data
    const webhookData: BlogifyWebhookData = await req.json();
    console.log('Received webhook data:', JSON.stringify(webhookData, null, 2));

    // Validate required fields
    if (!webhookData.title || !webhookData.content) {
      console.error('Missing required fields: title or content');
      return new Response(
        JSON.stringify({ error: 'Missing required fields: title and content are required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Generate slug from title
    const slug = generateSlug(webhookData.title);
    
    // Check if slug already exists
    const { data: existingPost } = await supabase
      .from('blog_posts')
      .select('id')
      .eq('slug', slug)
      .single();

    if (existingPost) {
      console.log(`Post with slug '${slug}' already exists`);
      return new Response(
        JSON.stringify({ 
          message: 'Post already exists', 
          slug,
          existing_id: existingPost.id 
        }),
        { 
          status: 200, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    // Prepare blog post data
    const blogPostData = {
      title: webhookData.title,
      content: webhookData.content,
      excerpt: webhookData.excerpt || webhookData.content.substring(0, 150) + '...',
      category: webhookData.category || 'General',
      slug: slug,
      feature_image: webhookData.feature_image || null,
      published: webhookData.published !== undefined ? webhookData.published : true,
    };

    // Insert blog post into database
    const { data: newPost, error: insertError } = await supabase
      .from('blog_posts')
      .insert(blogPostData)
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to create blog post', details: insertError.message }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Blog post created successfully:', newPost.id);

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Blog post created successfully',
        blog_post: {
          id: newPost.id,
          title: newPost.title,
          slug: newPost.slug,
          published: newPost.published
        }
      }),
      { 
        status: 201, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );

  } catch (error) {
    console.error('Webhook processing error:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error', 
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
});
