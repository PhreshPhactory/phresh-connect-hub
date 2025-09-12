import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import NewsletterForm from '@/components/NewsletterForm';
import OptimizedImage from '@/components/OptimizedImage';
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
            to="/blog" 
            className="text-primary-600 hover:text-primary-500 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
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

        {/* About Section */}
        <section className="bg-accent-50 p-8 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-4">About Phresh Phactory, Inc.</h2>
          <p className="text-muted-foreground mb-6">
            We specialize in transforming businesses through strategic fractional leadership, 
            global talent acquisition, and innovative systems design. Our mission is to help 
            organizations build high-performance teams and sustainable growth strategies.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/contact" 
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Get in Touch →
            </Link>
            <Link 
              to="/services" 
              className="text-primary-600 hover:text-primary-500 font-medium"
            >
              Our Services →
            </Link>
          </div>
        </section>

        {/* Back to Blog */}
        <div className="text-center">
          <Link 
            to="/blog" 
            className="inline-flex items-center text-primary-600 hover:text-primary-500 font-medium"
          >
            ← Back to Blog
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
  );
};

export default BlogPost;