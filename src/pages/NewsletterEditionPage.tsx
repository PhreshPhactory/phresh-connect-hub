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
          <h1 className="text-4xl font-bold mb-4">Not Found</h1>
          <p className="text-muted-foreground mb-8">This newsletter hasn't been published yet.</p>
          <Link to="/cultureandcommerce" className="text-primary font-medium hover:underline">← Back to Culture & Commerce</Link>
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
        description={edition.subtitle || `Read about ${edition.title} on Culture & Commerce by Phresh Phactory, Inc.`}
        ogImage={edition.cover_image || undefined}
        keywords={`${edition.title}, ${edition.featured_creator || ''}, Afro-descendant brands, culture and commerce, Phresh Phactory`}
        canonicalUrl={`https://phreshphactory.com/cultureandcommerce/${edition.slug}`}
        pageType="article"
        articleAuthor="Phresh Phactory, Inc."
        publishDate={edition.published_at || undefined}
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Article",
          "headline": edition.title,
          "description": edition.subtitle || `Read about ${edition.title} on Culture & Commerce by Phresh Phactory, Inc.`,
          "url": `https://phreshphactory.com/cultureandcommerce/${edition.slug}`,
          ...(edition.cover_image ? { "image": edition.cover_image } : {}),
          ...(edition.published_at ? { "datePublished": edition.published_at } : {}),
          "author": { "@type": "Organization", "name": "Phresh Phactory, Inc." },
          "publisher": {
            "@type": "Organization",
            "name": "Phresh Phactory, Inc.",
            "url": "https://phreshphactory.com"
          },
          "isPartOf": {
            "@type": "CollectionPage",
            "name": "Culture & Commerce",
            "url": "https://phreshphactory.com/cultureandcommerce"
          },
          ...(edition.featured_creator ? {
            "about": {
              "@type": "Person",
              "name": edition.featured_creator.split('♥')[0]?.trim(),
              "brand": { "@type": "Brand", "name": edition.featured_creator.split('♥')[1]?.trim() }
            }
          } : {})
        }}
      />

      <div className="min-h-screen bg-[#0b0b0d] text-white">
        {/* Hero with full-bleed background */}
        <div className="relative min-h-[60vh] flex items-end justify-center pt-32">
          {edition.cover_image && (
            <img
              src={edition.cover_image}
              alt={edition.title}
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/40 via-transparent to-[#0b0b0d]" />

          <div className="relative z-10 max-w-3xl mx-auto px-4 py-20 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ lineHeight: '0.85' }}>
              {edition.title}
            </h1>
            {edition.featured_creator && (
              <p className="text-[#f1e1b0] text-sm font-medium mt-6">
                Featuring: {edition.featured_creator}
              </p>
            )}
          </div>
        </div>

        {/* Content */}
        <article className="max-w-3xl mx-auto px-4 pb-20">
          <div
            className="max-w-none text-lg leading-relaxed
              [&>h2:first-child]:hidden
              [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:text-white [&_h1]:mt-10 [&_h1]:mb-4
              [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-white [&_h2]:mt-10 [&_h2]:mb-4
              [&_h3]:text-xl [&_h3]:font-bold [&_h3]:text-white [&_h3]:mt-8 [&_h3]:mb-3
              [&_p]:text-white [&_p]:mb-5 [&_p]:leading-relaxed
              [&_strong]:text-white [&_strong]:font-bold
              [&_a]:text-[#d8b35c] [&_a]:underline [&_a]:font-semibold hover:[&_a]:text-[#f1e1b0]
              [&_ul]:text-white [&_ul]:mb-5 [&_ul]:pl-6 [&_ul]:list-disc
              [&_ol]:text-white [&_ol]:mb-5 [&_ol]:pl-6 [&_ol]:list-decimal
              [&_li]:text-white [&_li]:mb-2
              [&_hr]:border-white/20 [&_hr]:my-10
              [&_img]:rounded-lg [&_img]:shadow-lg [&_img]:my-6"
            dangerouslySetInnerHTML={{ __html: sanitizeHTML(edition.content) }}
          />

          {/* Back link */}
          <div className="mt-16 pt-8 border-t border-white/10 text-center">
            <Link
              to="/cultureandcommerce"
              className="inline-flex items-center gap-2 text-[#d8b35c] hover:text-[#f1e1b0] font-medium transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Culture & Commerce
            </Link>
          </div>
        </article>
      </div>
    </>
  );
};

export default NewsletterEditionPage;
