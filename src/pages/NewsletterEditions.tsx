import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

interface Edition {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  season: string;
  year: string;
  link?: string;
}

const EDITIONS: Edition[] = [
  {
    id: 'winter-2026',
    title: 'Renaissance',
    subtitle: 'A new era of Afro-descendant commerce.',
    coverImage: '/lovable-uploads/a2ef9671-ea85-426a-809f-a2b1d5b6dd1a.png',
    season: 'Winter',
    year: '2026',
    link: '#',
  },
  {
    id: 'summer-2025',
    title: 'Horizons',
    subtitle: 'Expanding the global marketplace.',
    coverImage: '/lovable-uploads/b6224f0b-d2b9-4cfb-b5eb-ed2e38ce5b2a.png',
    season: 'Summer',
    year: '2025',
    link: '#',
  },
  {
    id: 'winter-2025',
    title: 'Foundations',
    subtitle: 'Building from the ground up.',
    coverImage: '/lovable-uploads/d3cc475d-5e13-41ec-b723-b6ee721adc96.png',
    season: 'Winter',
    year: '2025',
    link: '#',
  },
  {
    id: 'summer-2024',
    title: 'Culture & Commerce',
    subtitle: 'Where identity meets industry.',
    coverImage: '/lovable-uploads/cec6bf33-d6c4-4a35-99b6-22df0f963c5a.png',
    season: 'Summer',
    year: '2024',
    link: '#',
  },
];

const EditionCard: React.FC<{ edition: Edition; index: number }> = ({ edition, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="group relative cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Album cover */}
      <div
        className={cn(
          "relative aspect-[3/4] rounded-sm overflow-hidden transition-all duration-500 ease-out",
          "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
          hovered && "shadow-[0_12px_40px_rgba(0,0,0,0.3)] -translate-y-3 scale-[1.02]"
        )}
      >
        <img
          src={edition.coverImage}
          alt={`${edition.title} — ${edition.season} ${edition.year}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        {/* Overlay on hover */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent",
            "flex flex-col justify-end p-5 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
            {edition.season} {edition.year}
          </p>
          <h3 className="text-white text-xl md:text-2xl font-bold leading-tight mt-1">
            {edition.title}
          </h3>
          <p className="text-white/70 text-sm mt-1 line-clamp-2">
            {edition.subtitle}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Shelf: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="relative mb-16">
    {/* Cards row */}
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 relative z-10 px-2 md:px-0">
      {children}
    </div>
    {/* Shelf surface */}
    <div className="relative mt-2 z-0">
      <div className="h-3 bg-gradient-to-b from-muted-foreground/20 to-muted-foreground/5 rounded-sm" />
      <div className="h-1 bg-muted-foreground/10" />
    </div>
  </div>
);

const TimelineNav: React.FC<{ editions: Edition[] }> = ({ editions }) => (
  <div className="flex flex-wrap gap-x-8 gap-y-3 justify-center mt-12 pt-8 border-t border-border">
    {editions.map((ed) => (
      <div key={ed.id} className="text-center group cursor-pointer">
        <p className="text-xs text-muted-foreground tracking-widest uppercase">{ed.year}</p>
        <p className="text-xs text-muted-foreground">{ed.season}</p>
        <p className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors mt-0.5">
          {ed.title}
        </p>
      </div>
    ))}
  </div>
);

const NewsletterEditions = () => {
  // Split editions into shelf rows of 4
  const shelfRows: Edition[][] = [];
  for (let i = 0; i < EDITIONS.length; i += 4) {
    shelfRows.push(EDITIONS.slice(i, i + 4));
  }

  return (
    <>
      <SEOHead
        title="Culture & Commerce Editions | Phresh Phactory, Inc."
        description="Browse every edition of Culture & Commerce — our curated newsletter showcasing Afro-descendant created brands, products, and stories."
      />
      <div className="min-h-screen bg-background">
        {/* Hero */}
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center px-4">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="text-sm tracking-[0.25em] uppercase text-muted-foreground mb-4"
          >
            Culture & Commerce
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-[1.1] max-w-4xl mx-auto"
          >
            Every edition.
            <br />
            Every story.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto"
          >
            Curated Afro-descendant brands delivered to your inbox.
          </motion.p>
        </section>

        {/* Shelves */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pb-8">
          {shelfRows.map((row, rowIdx) => (
            <Shelf key={rowIdx}>
              {row.map((edition, idx) => (
                <EditionCard key={edition.id} edition={edition} index={rowIdx * 4 + idx} />
              ))}
            </Shelf>
          ))}
        </section>

        {/* Timeline navigation */}
        <section className="max-w-5xl mx-auto px-4 pb-20">
          <TimelineNav editions={EDITIONS} />
        </section>
      </div>
    </>
  );
};

export default NewsletterEditions;
