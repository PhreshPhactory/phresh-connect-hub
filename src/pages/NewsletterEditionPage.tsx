import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeHTML } from '@/utils/security';
import { ArrowLeft } from 'lucide-react';

interface Edition {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image: string | null;
  content: string;
  published_at: string | null;
  featured_creator: string | null;
}

const NewsletterEditionPage = () => {
  const { slug } = useParams();
  const [edition, setEdition] = useState<Edition | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) fetchEdition();
  }, [slug]);

  const fetchEdition = async () => {
    try {
      const { data, error } = await (supabase as any)
        .from('newsletter_editions')
        .select('*')
        .eq('slug', slug)
        .eq('published', true)
        .maybeSingle();

      if (error) throw error;
      setEdition(data);
    } catch (error) {
      console.error('Error fetching edition:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!edition) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Edition Not Found</h1>
          <p className="text-muted-foreground mb-8">This newsletter edition doesn't exist or hasn't been published yet.</p>
          <Link to="/newsletter" className="text-primary font-medium hover:underline">← Back to All Editions</Link>
        </div>
      </div>
    );
  }

  const publishDate = edition.published_at
    ? new Date(edition.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <>
      <SEOHead
        title={`${edition.title} | Culture & Commerce`}
        description={edition.subtitle || `Read the ${edition.title} edition of Culture & Commerce by Phresh Phactory, Inc.`}
        ogImage={edition.cover_image || undefined}
      />

      <div className="min-h-screen bg-[#0b0b0d] text-white">
        {/* Hero */}
        <div className="relative">
          {edition.cover_image && (
            <div className="w-full max-w-md mx-auto pt-10 px-4">
              <img
                src={edition.cover_image}
                alt={edition.title}
                className="w-full aspect-[9/16] object-cover rounded-sm shadow-[0_8px_30px_rgba(216,179,92,0.15)]"
              />
            </div>
          )}

          <div className="max-w-3xl mx-auto px-4 py-10 text-center">
            <p className="text-[#d8b35c] text-sm font-medium tracking-widest uppercase mb-3">
              Culture & Commerce
            </p>
            {publishDate && (
              <p className="text-white/50 text-sm mb-4">{publishDate}</p>
            )}
            <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              {edition.title}
            </h1>
            {edition.subtitle && (
              <p className="text-white/60 text-lg max-w-xl mx-auto">{edition.subtitle}</p>
            )}
            {edition.featured_creator && (
              <p className="text-[#f1e1b0] text-sm mt-4 font-medium">
                Featuring: {edition.featured_creator}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 pb-20">
          <div
            className="prose prose-invert prose-lg max-w-none
              prose-headings:font-bold prose-headings:text-[#f1e1b0]
              prose-a:text-[#d8b35c] prose-a:underline
              prose-strong:text-white
              prose-p:text-white/80 prose-p:leading-relaxed
              prose-li:text-white/80
              prose-img:rounded-lg prose-img:shadow-lg"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(edition.content) }}
          />

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <Link
              to="/newsletter"
              className="inline-flex items-center gap-2 text-[#d8b35c] hover:text-[#f1e1b0] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              All Editions
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default NewsletterEditionPage;
