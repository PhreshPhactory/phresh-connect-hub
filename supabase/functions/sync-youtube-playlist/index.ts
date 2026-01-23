import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';
import { checkRateLimit, getClientIP, createCorsHeaders, rateLimitResponse, STRICT_RATE_LIMIT } from '../_shared/rate-limit.ts';

const YOUTUBE_API_KEY = Deno.env.get('YOUTUBE_API_KEY');
const SUPABASE_URL = Deno.env.get('SUPABASE_URL')!;
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Both English and Spanish playlists
const PLAYLISTS = [
  { id: 'PLck7eVb60htJKgDynNkP5SlHArLtY096j', language: 'en' },
  { id: 'PLck7eVb60htKOMhAXkPR-BB8HF2GR6N6B', language: 'es' },
];

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnailUrl: string;
  videoUrl: string;
  publishedAt: string;
  isShort: boolean;
  shortsUrl?: string;
  duration?: string;
  language: string;
}

async function fetchPlaylistVideos(playlistId: string, language: string): Promise<YouTubeVideo[]> {
  console.log(`Fetching playlist ${playlistId} (${language})...`);
  
  const playlistResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=${playlistId}&key=${YOUTUBE_API_KEY}`
  );

  if (!playlistResponse.ok) {
    throw new Error(`YouTube API error for playlist ${playlistId}: ${playlistResponse.statusText}`);
  }

  const playlistData = await playlistResponse.json();
  const videoIds = playlistData.items.map((item: any) => item.snippet.resourceId.videoId);
  
  if (videoIds.length === 0) {
    console.log(`No videos found in playlist ${playlistId}`);
    return [];
  }

  // Fetch video details to detect Shorts
  const videoDetailsResponse = await fetch(
    `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoIds.join(',')}&key=${YOUTUBE_API_KEY}`
  );

  if (!videoDetailsResponse.ok) {
    throw new Error(`YouTube API error fetching video details: ${videoDetailsResponse.statusText}`);
  }

  const videoDetailsData = await videoDetailsResponse.json();
  
  const videos: YouTubeVideo[] = playlistData.items.map((item: any) => {
    const videoId = item.snippet.resourceId.videoId;
    const videoDetails = videoDetailsData.items.find((v: any) => v.id === videoId);
    const duration = videoDetails?.contentDetails?.duration || '';
    
    // Parse ISO 8601 duration (e.g., "PT59S" = 59 seconds)
    const isShort = duration.includes('PT') && !duration.includes('H') && !duration.includes('M') && parseInt(duration.replace(/\D/g, '')) <= 60;
    
    return {
      id: videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnailUrl: item.snippet.thumbnails.maxres?.url || item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url,
      videoUrl: `https://www.youtube.com/watch?v=${videoId}`,
      publishedAt: item.snippet.publishedAt,
      isShort,
      shortsUrl: isShort ? `https://www.youtube.com/shorts/${videoId}` : undefined,
      duration,
      language,
    };
  });

  console.log(`Found ${videos.length} videos in playlist ${playlistId} (${language})`);
  return videos;
}

Deno.serve(async (req) => {
  const corsHeaders = createCorsHeaders(req);

  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  // Rate limit to prevent abuse (2 requests per minute per IP)
  const clientIP = getClientIP(req);
  if (!checkRateLimit(clientIP, 'sync-youtube-playlist', STRICT_RATE_LIMIT)) {
    console.log(`Rate limit exceeded for IP: ${clientIP}`);
    return rateLimitResponse(corsHeaders);
  }

  try {
    console.log('Starting YouTube playlist sync for all languages...');
    
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Fetch videos from all playlists
    const allVideos: YouTubeVideo[] = [];
    for (const playlist of PLAYLISTS) {
      const videos = await fetchPlaylistVideos(playlist.id, playlist.language);
      allVideos.push(...videos);
    }

    console.log(`Total videos across all playlists: ${allVideos.length}`);

    // Get all video URLs currently in playlists
    const currentPlaylistUrls = allVideos.map(v => v.videoUrl);
    
    // Unpublish any videos in the database that are no longer in any playlist
    if (currentPlaylistUrls.length > 0) {
      const { error: unpublishError } = await supabase
        .from('blog_posts')
        .update({ published: false })
        .eq('category', 'Product Spotlight')
        .not('video_url', 'in', `(${currentPlaylistUrls.map(url => `"${url}"`).join(',')})`)
        .eq('published', true);
      
      if (unpublishError) {
        console.error('Error unpublishing removed videos:', unpublishError);
      } else {
        console.log('Unpublished videos that are no longer in playlists');
      }
    }

    let syncedCount = 0;
    let skippedCount = 0;
    let updatedCount = 0;

    for (const video of allVideos) {
      // Check if video already exists
      const { data: existing } = await supabase
        .from('blog_posts')
        .select('id, language')
        .eq('video_url', video.videoUrl)
        .maybeSingle();

      if (existing) {
        // Update created_at and language to match YouTube data
        const { error: updateError } = await supabase
          .from('blog_posts')
          .update({ 
            created_at: video.publishedAt,
            language: video.language 
          })
          .eq('id', existing.id);
        
        if (updateError) {
          console.error(`Error updating video ${video.title}:`, updateError);
        } else {
          if (existing.language !== video.language) {
            console.log(`Updated language for: ${video.title} (${video.language})`);
            updatedCount++;
          }
        }
        
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

      // Try to extract brand name from title
      const brandMatch = video.title.match(/^([^-:]+)[-:]/) || video.title.match(/^(.+?)\s*\|/);
      const brandName = brandMatch ? brandMatch[1].trim() : null;

      // Insert new blog post with language
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
          shorts_url: video.shortsUrl,
          brand_name: brandName,
          published: true,
          created_at: video.publishedAt,
          language: video.language,
        });

      if (insertError) {
        console.error(`Error inserting video ${video.title}:`, insertError);
        continue;
      }

      console.log(`Synced video: ${video.title} (${video.language})`);
      syncedCount++;
    }

    const result = {
      success: true,
      total: allVideos.length,
      synced: syncedCount,
      skipped: skippedCount,
      languagesUpdated: updatedCount,
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
