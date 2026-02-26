import React, { useState } from 'react';
import SEOHead from '@/components/SEOHead';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import club7Cover from '@/assets/club7-cover.png';

interface Edition {
  id: string;
  title: string;
  subtitle: string;
  coverImage: string;
  date: string;
  link?: string;
}

const EDITIONS: Edition[] = [
  {
    id: 'club7-menswear',
    title: 'Club 7 Menswear',
    subtitle: 'Black-owned UK menswear brand — underwear, loungewear & swimwear.',
    coverImage: club7Cover,
    date: 'February 24, 2026',
    link: '#',
  },
];

// Scrolling names of modern Black creators, designers, entrepreneurs
const CREATORS = [
  'Virgil Abloh', 'Aurora James', 'Theophilio', 'Kerby Jean-Raymond', 'Tracy Reese',
  'Dapper Dan', 'Ozwald Boateng', 'LaQuan Smith', 'Telfar Clemens', 'Christopher John Rogers',
  'Fe Noel', 'Hanifa (Anifa Mvuemba)', 'Jerry Lorenzo', 'Undra Celeste', 'Stella Jean',
  'Maki Oh', 'Brandon Blackwood', 'Victor Glemaud', 'Carly Cushnie', 'Rihanna (Fenty)',
  'Tyler Mitchell', 'Mickalene Thomas', 'Kehinde Wiley', 'Issa Rae', 'Nipsey Hussle',
  'Pharrell Williams', 'Sean Combs (Sean John)', 'Bethann Hardison', 'Edward Enninful', 'Pat McGrath',
  'André Leon Talley', 'Willi Smith', 'Stephen Burrows', 'Misa Hylton', 'June Ambrose',
  'Shayne Oliver', 'Sergio Hudson', 'Balmain (Olivier Rousteing)', 'Aminah Abdul Jillil', 'Mattiel',
];

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
        {doubled.map((name, i) => (
          <span
            key={i}
            className="inline-block mx-4 text-sm md:text-base font-medium text-foreground/10 select-none"
          >
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const EditionCard: React.FC<{ edition: Edition }> = ({ edition }) => {
  const [hovered, setHovered] = useState(false);

  return (
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
          "relative aspect-[3/4] rounded-sm overflow-hidden transition-all duration-500 ease-out",
          "shadow-[0_4px_20px_rgba(0,0,0,0.15)]",
          hovered && "shadow-[0_12px_40px_rgba(0,0,0,0.3)] -translate-y-3 scale-[1.02]"
        )}
      >
        <img
          src={edition.coverImage}
          alt={edition.title}
          className="w-full h-full object-cover"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent",
            "flex flex-col justify-end p-5 transition-opacity duration-300",
            hovered ? "opacity-100" : "opacity-0"
          )}
        >
          <p className="text-white/80 text-sm font-medium tracking-wide uppercase">
            {edition.date}
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
  const row1 = CREATORS.slice(0, 14);
  const row2 = CREATORS.slice(14, 28);
  const row3 = CREATORS.slice(28);

  return (
    <>
      <SEOHead
        title="Culture & Commerce Editions | Phresh Phactory, Inc."
        description="Browse every edition of Culture & Commerce — our curated newsletter showcasing Afro-descendant created brands, products, and stories."
      />
      <div className="min-h-screen bg-background relative overflow-hidden">
        {/* Animated background — scrolling creator names */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 opacity-60 pointer-events-none">
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

        {/* Shelf */}
        <section className="relative z-10 max-w-6xl mx-auto px-4 md:px-8 pb-20">
          <Shelf>
            {EDITIONS.map((edition) => (
              <EditionCard key={edition.id} edition={edition} />
            ))}
          </Shelf>
        </section>
      </div>
    </>
  );
};

export default NewsletterEditions;
