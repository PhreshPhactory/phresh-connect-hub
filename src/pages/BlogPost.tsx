import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import NewsletterForm from '@/components/NewsletterForm';
import OptimizedImage from '@/components/OptimizedImage';
import SEOHead from '@/components/SEOHead';

import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { sanitizeHTML } from '@/utils/security';

interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  slug: string;
  feature_image: string | null;
  created_at: string;
}

const BlogPost = () => {
  const { slug } = useParams();
  const { toast } = useToast();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchPost();
    }
  }, [slug]);

  const trackView = async (postId: string) => {
    try {
      // Increment view count
      await (supabase as any).rpc('increment_view_count', { post_id: postId });
      
      // Track detailed analytics (truncated to match DB column limits)
      await supabase.from('blog_analytics').insert({
        blog_post_id: postId,
        referrer: (document.referrer || '').slice(0, 500) || null,
        user_agent: navigator.userAgent.slice(0, 500),
      });
    } catch (error) {
      console.error('Error tracking view:', error);
    }
  };

  const fetchPost = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('blog_posts')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setPost(data);
      
      // Track view after successfully loading the post
      if (data) {
        trackView(data.id);
      }
    } catch (error) {
      console.error('Error fetching post:', error);
      toast({
        title: 'Error',
        description: 'Failed to load blog post',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-8">
            The blog post you're looking for doesn't exist.
          </p>
          <Link 
            to="/growthnotes" 
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            ← Back to Growth Notes
          </Link>
        </div>
      </div>
    );
  }

  const articleUrl = `https://phreshphactory.com/growthnotes/${post.slug}`;

  return (
    <>
      <SEOHead
        title={`${post.title} | Growth Notes`}
        description={post.excerpt || `Read ${post.title} on Growth Notes by Phresh Phactory, Inc.`}
        ogImage={post.feature_image || undefined}
        canonicalUrl={articleUrl}
        pageType="article"
        articleAuthor="Phresh Phactory, Inc."
      />
    <div className="min-h-screen bg-white">
      <article className="max-w-4xl mx-auto px-4 py-12">
        {/* Hero Image */}
        <div className="mb-8">
          <OptimizedImage
            src={post.feature_image || '/placeholder.svg'}
            alt={post.title}
            className="w-full h-full object-cover rounded-lg mb-8"
          />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center mb-4">
            <span className="inline-block bg-primary-100 text-primary-600 text-sm font-medium px-3 py-1 rounded">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
          <p className="text-xl text-muted-foreground">{post.excerpt}</p>
        </header>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none mb-12"
          dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.content) }}
        />

        {/* Workshop CTA Section */}
        <section className="bg-tertiary/10 border border-tertiary/30 p-8 rounded-lg mb-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Ready to Build Your 24/7 Revenue Engine?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Join the Socially Selling Food working lab and leave each session with functional, 
            revenue-generating systems for your food business.
          </p>
          <Link 
            to="/socially-selling-food" 
            className="inline-flex items-center justify-center bg-tertiary text-tertiary-foreground hover:bg-tertiary/90 font-semibold px-8 py-3 rounded-lg transition-colors"
          >
            Register for the Workshop →
          </Link>
        </section>

        {/* Share & Back */}
        <div className="text-center">
          <Link 
            to="/growthnotes" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
          >
            ← Back to Growth Notes
          </Link>
        </div>
      </article>

      {/* Newsletter Section */}
      <div className="py-15">
        <NewsletterForm 
          title="Stay Updated with Strategic Insights"
          subtitle="Get the latest thought leadership on business transformation and global talent strategies."
          benefits={[
            "Strategic frameworks",
            "Leadership insights",
            "Global talent trends",
            "Transformation guides"
          ]}
          className="bg-accent-300 bg-opacity-60"
          dark={false}
        />
      </div>
    </div>
    </>
  );
};

export default BlogPost;