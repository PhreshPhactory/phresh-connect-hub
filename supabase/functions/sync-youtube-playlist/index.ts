import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const PLAYLIST_ID = 'PLck7eVb60htJKgDynNkP5SlHArLtY096j';

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Starting YouTube playlist sync...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch videos from YouTube playlist
    const playlistResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${PLAYLIST_ID}&key=${YOUTUBE_API_KEY}`
    );

    if (!playlistResponse.ok) {
      throw new Error(`YouTube API error: ${playlistResponse.statusText}`);
    }

    const playlistData = await playlistResponse.json();
    const videos: YouTubeVideo[] = playlistData.items.map((item: any) => ({
      id: item.snippet.resourceId.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      videoUrl: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`,
    }));

    console.log(`Found ${videos.length} videos in playlist`);

    let syncedCount = 0;
    let skippedCount = 0;

    for (const video of videos) {
      // Check if video already exists
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id')
        .eq('video_url', video.videoUrl)
        .maybeSingle();

      if (existing) {
        console.log(`Video already exists: ${video.title}`);
        skippedCount++;
        continue;
      }

      // Generate slug from title
      const slug = video.title
        .toLowerCase()
        .replace(/[^a-z0-9\s]/g, '')
        .replace(/\s+/g, '-')
        .substring(0, 100);

      // Extract excerpt from description (first 200 chars)
      const excerpt = video.description
        ? video.description.substring(0, 200) + (video.description.length > 200 ? '...' : '')
        : `Watch ${video.title} on YouTube`;

      // Insert new blog post
      const { error: insertError } = await supabase
        .from('blog_posts')
        .insert({
          title: video.title,
          content: `<p>${video.description || 'Watch this video to learn more.'}</p>`,
          excerpt: excerpt,
          category: 'Product Spotlight',
          slug: slug,
          feature_image: video.thumbnailUrl,
          video_url: video.videoUrl,
          published: true,
        });

      if (insertError) {
        console.error(`Error inserting video ${video.title}:`, insertError);
        continue;
      }

      console.log(`Synced video: ${video.title}`);
      syncedCount++;
    }

    const result = {
      success: true,
      total: videos.length,
      synced: syncedCount,
      skipped: skippedCount,
      timestamp: new Date().toISOString(),
    };

    console.log('Sync completed:', result);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in sync-youtube-playlist:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
