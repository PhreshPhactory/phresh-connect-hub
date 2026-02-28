import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import SEOHead from '@/components/SEOHead';
import { supabase } from '@/integrations/supabase/client';
import { sanitizeHTML } from '@/utils/security';
import { ArrowLeft, Mail, Share2 } from 'lucide-react';

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

  const articleUrl = `https://phreshphactory.com/cultureandcommerce/${edition.slug}`;
  const shareText = encodeURIComponent(edition.title);
  const shareUrl = encodeURIComponent(articleUrl);

  const shareLinks = {
    email: `mailto:?subject=${shareText}&body=Check out this article from Culture %26 Commerce: ${shareUrl}`,
    twitter: `https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
    pinterest: `https://pinterest.com/pin/create/button/?url=${shareUrl}&description=${shareText}`,
  };

  const ShareButtons = () => (
    <div className="flex items-center gap-3">
      <a href={shareLinks.email} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:border-[#d8b35c] hover:text-[#d8b35c] transition-colors" aria-label="Share via email">
        <Mail className="w-4 h-4" />
      </a>
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:border-[#d8b35c] hover:text-[#d8b35c] transition-colors" aria-label="Share on X">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:border-[#d8b35c] hover:text-[#d8b35c] transition-colors" aria-label="Share on LinkedIn">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
      </a>
      <a href={shareLinks.pinterest} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full border border-white/20 hover:border-[#d8b35c] hover:text-[#d8b35c] transition-colors" aria-label="Share on Pinterest">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 01.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641 0 12.017 0z"/></svg>
      </a>
    </div>
  );

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
        {/* Cover image background */}
        <div className="relative h-[70vh]">
          {edition.cover_image && (
            <img
              src={edition.cover_image}
              alt={edition.title}
              className="absolute inset-0 w-full h-full object-cover opacity-25"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0b0b0d]/40 via-transparent to-[#0b0b0d]" />
        </div>

        {/* Title below the image */}
        <div className="max-w-3xl mx-auto px-4 py-12 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white" style={{ lineHeight: '0.85' }}>
            {edition.title}
          </h1>
          {edition.featured_creator && (
            <p className="text-[#f1e1b0] text-sm font-medium mt-6">
              Featuring: {edition.featured_creator}
            </p>
          )}
          <div className="mt-8 flex justify-center">
            <ShareButtons />
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

          {/* Share & Back */}
          <div className="mt-16 pt-8 border-t border-white/10 flex flex-col items-center gap-6">
            <p className="text-white/60 text-sm uppercase tracking-widest">Share this article</p>
            <ShareButtons />
            <Link
              to="/cultureandcommerce"
              className="inline-flex items-center gap-2 text-[#d8b35c] hover:text-[#f1e1b0] font-medium transition-colors mt-4"
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
