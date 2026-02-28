import React, { useState, useEffect } from 'react';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import club7Cover from '@/assets/club7-cover.png';

interface Edition {
  id: string;
  title: string;
  subtitle: string | null;
  slug: string;
  cover_image: string | null;
  published_at: string | null;
  featured_creator: string | null;
}

// Fallback for the initial Club Seven card if not yet in DB
const FALLBACK_EDITIONS: Edition[] = [
  {
    id: 'club-seven-menswear-fallback',
    title: 'Club Seven Menswear',
    subtitle: 'What happened when I hosted Club Seven Menswear on Phresh Phactory TV.',
    slug: 'club-seven-menswear',
    cover_image: club7Cover,
    published_at: '2026-02-24T00:00:00Z',
    featured_creator: 'Alex Gede ♥ Club Seven Menswear',
  },
];

// Modern Afro-descendant creators and their brands
const CREATORS = [
  'Virgil Abloh ♥ Off-White', 'Aurora James ♥ Brother Vellies', 'Edvin Thompson ♥ Theophilio',
  'Kerby Jean-Raymond ♥ Pyer Moss', 'Tracy Reese ♥ Hope for Flowers', 'Alex Gede ♥ Club Seven Menswear',
  'Dapper Dan ♥ Dapper Dan of Harlem', 'Ozwald Boateng ♥ Ozwald Boateng', 'LaQuan Smith ♥ LaQuan Smith',
  'Telfar Clemens ♥ Telfar', 'Christopher John Rogers ♥ CJR', 'Fe Noel ♥ Fe Noel',
  'Anifa Mvuemba ♥ Hanifa', 'Jerry Lorenzo ♥ Fear of God', 'Undra Duncan ♥ Undra Celeste',
  'Stella Jean ♥ Stella Jean', 'Amaka Osakwe ♥ Maki Oh', 'Brandon Blackwood ♥ Brandon Blackwood',
  'Victor Glemaud ♥ Victor Glemaud', 'Carly Cushnie ♥ Cushnie', 'Rihanna ♥ Fenty / Savage X Fenty',
  'Pat McGrath ♥ Pat McGrath Labs', 'Pharrell Williams ♥ Humanrace', 'Bethann Hardison ♥ Advocate & Icon',
  'Edward Enninful ♥ British Vogue', 'André Leon Talley ♥ Fashion Legacy', 'Sergio Hudson ♥ Sergio Hudson',
  'Shayne Oliver ♥ Hood By Air', 'Olivier Rousteing ♥ Balmain', 'Aminah Abdul Jillil ♥ Aminah Abdul Jillil',
  'June Ambrose ♥ Slash', 'Misa Hylton ♥ MCM x Misa Hylton', 'Stephen Burrows ♥ Stephen Burrows',
  'Willi Smith ♥ WilliWear', 'Kanye West ♥ Yeezy',
];

const FEATURED = 'Alex Gede ♥ Club Seven Menswear';

const ScrollingRow: React.FC<{ names: string[]; direction: 'left' | 'right'; speed: number }> = ({
  names,
  direction,
  speed,
}) => {
  const doubled = [...names, ...names];
  return (
    <div className="overflow-hidden whitespace-nowrap py-2">
      <motion.div
        className="inline-block"
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
      >
        {doubled.map((name, i) => {
          const isFeatured = name === FEATURED;
          return (
            <span
              key={i}
              className={cn(
                "inline-block mx-4 select-none",
                isFeatured
                  ? "text-base md:text-xl font-bold text-primary"
                  : "text-sm md:text-base font-medium text-foreground/10"
              )}
            >
              {name}
            </span>
          );
        })}
      </motion.div>
    </div>
  );
};

const EditionCard: React.FC<{ edition: Edition }> = ({ edition }) => {
  const [hovered, setHovered] = useState(false);
  const displayDate = edition.published_at
    ? new Date(edition.published_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
    : '';

  return (
    <Link to={`/cultureandcommerce/${edition.slug}`}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="group relative cursor-pointer mx-auto"
        style={{ maxWidth: 380 }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={cn(
            "relative aspect-[9/16] rounded-sm overflow-hidden transition-all duration-500 ease-out",
            "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
            hovered && "shadow-[0_12px_40px_rgba(0,0,0,0.3)] -translate-y-3 scale-[1.02]"
          )}
        >
          {/* Pale background cover image */}
          <img
            src={edition.cover_image || '/placeholder.svg'}
            alt={edition.title}
            className="w-full h-full object-cover"
          />
          {/* Hover overlay with CTA */}
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent",
              "flex flex-col justify-end items-center text-center p-6 transition-opacity duration-300",
              hovered ? "opacity-100" : "opacity-0"
            )}
          >
            <span className="text-sm font-semibold text-primary tracking-wide uppercase">
              Click Here to Read →
            </span>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const Shelf: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mb-16">
    <div className="flex justify-center relative z-10 px-2 md:px-0">
      {children}
    </div>
    <div className="relative mt-2 z-0">
      <div className="h-3 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/5 rounded-sm" />
      <div className="h-1 bg-muted-foreground/10" />
    </div>
  </div>
);

const NewsletterEditions = () => {
  const [editions, setEditions] = useState<Edition[]>(FALLBACK_EDITIONS);

  useEffect(() => {
    const fetchEditions = async () => {
      const { data } = await (supabase as any)
        .from('newsletter_editions')
        .select('id, title, subtitle, slug, cover_image, published_at, featured_creator')
        .eq('published', true)
        .order('published_at', { ascending: false });

      if (data && data.length > 0) {
        // Merge cover images from fallbacks when DB entry has none
        const merged = data.map((d: Edition) => {
          if (!d.cover_image) {
            const fallback = FALLBACK_EDITIONS.find(f => f.slug === d.slug);
            if (fallback?.cover_image) return { ...d, cover_image: fallback.cover_image };
          }
          return d;
        });
        setEditions(merged);
      }
    };
    fetchEditions();
  }, []);

  const row1 = CREATORS.slice(0, 14);
  const row2 = CREATORS.slice(14, 28);
  const row3 = CREATORS.slice(28);

  return (
    <>
      <SEOHead
        title="Culture & Commerce | Phresh Phactory, Inc."
        description="Celebrating modern Afro-descendant created brands while spotlighting the next wave of visionaries you need to know."
        keywords="Afro-descendant brands, Black-owned fashion, culture and commerce, visionary designers, diaspora commerce, Phresh Phactory"
        canonicalUrl="https://phreshphactory.com/cultureandcommerce"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Culture & Commerce",
          "description": "Celebrating modern Afro-descendant created brands while spotlighting the next wave of visionaries you need to know.",
          "url": "https://phreshphactory.com/cultureandcommerce",
          "publisher": {
            "@type": "Organization",
            "name": "Phresh Phactory, Inc.",
            "url": "https://phreshphactory.com"
          },
          "about": {
            "@type": "Thing",
            "name": "Afro-descendant created brands and visionary founders"
          },
          "hasPart": editions.map(e => ({
            "@type": "Article",
            "headline": e.title,
            "url": `https://phreshphactory.com/cultureandcommerce/${e.slug}`,
            ...(e.cover_image ? { "image": e.cover_image } : {}),
            ...(e.published_at ? { "datePublished": e.published_at } : {})
          })),
          "mentions": CREATORS.map(c => {
            const [person, brand] = c.split(' ♥ ');
            return {
              "@type": "Person",
              "name": person.trim(),
              "brand": { "@type": "Brand", "name": brand.trim() }
            };
          })
        }}
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 pointer-events-none">
          <ScrollingRow names={row1} direction="left" speed={60} />
          <ScrollingRow names={row2} direction="right" speed={75} />
          <ScrollingRow names={row3} direction="left" speed={50} />
          <ScrollingRow names={row1} direction="right" speed={65} />
          <ScrollingRow names={row2} direction="left" speed={55} />
          <ScrollingRow names={row3} direction="right" speed={70} />
          <ScrollingRow names={row1} direction="left" speed={80} />
          <ScrollingRow names={row2} direction="right" speed={45} />
        </div>

        {/* Hero */}
        <section className="relative z-10 pt-24 pb-12 md:pt-32 md:pb-16 text-center px-4">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] max-w-4xl mx-auto"
          >
            Culture & Commerce
            <span className="block text-lg md:text-2xl lg:text-3xl font-medium text-muted-foreground mt-2">by Phresh Phactory, Inc.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto"
          >
            Celebrating modern Afro-descendant created brands while spotlighting the next wave of visionaries you need to know.
          </motion.p>
        </section>

        {/* Shelf */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-20">
          <Shelf>
            {editions.map((edition) => (
              <EditionCard key={edition.id} edition={edition} />
            ))}
          </Shelf>
        </section>

        {/* SEO-visible visionary list (hidden visually, readable by crawlers) */}
        <section className="sr-only" aria-label="Featured visionaries and brands">
          <h2>Visionaries & Brands Featured in Culture & Commerce</h2>
          <ul>
            {CREATORS.map((creator, i) => {
              const [person, brand] = creator.split(' ♥ ');
              return <li key={i}>{person.trim()} — {brand.trim()}</li>;
            })}
          </ul>
        </section>
      </div>
    </>
  );
};

export default NewsletterEditions;
