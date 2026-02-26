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
    subtitle: 'Afro-descendant created UK menswear brand ♥ underwear, loungewear & swimwear.',
    coverImage: club7Cover,
    date: 'February 24, 2026',
    link: '#',
  },
];

// Modern Afro-descendant creators and their brands
const CREATORS = [
  'Virgil Abloh ♥ Off-White', 'Aurora James ♥ Brother Vellies', 'Edvin Thompson ♥ Theophilio',
  'Kerby Jean-Raymond ♥ Pyer Moss', 'Tracy Reese ♥ Hope for Flowers', 'Dapper Dan ♥ Dapper Dan of Harlem',
  'Ozwald Boateng ♥ Ozwald Boateng', 'LaQuan Smith ♥ LaQuan Smith', 'Telfar Clemens ♥ Telfar',
  'Christopher John Rogers ♥ CJR', 'Fe Noel ♥ Fe Noel', 'Anifa Mvuemba ♥ Hanifa',
  'Jerry Lorenzo ♥ Fear of God', 'Undra Duncan ♥ Undra Celeste', 'Stella Jean ♥ Stella Jean',
  'Amaka Osakwe ♥ Maki Oh', 'Brandon Blackwood ♥ Brandon Blackwood', 'Victor Glemaud ♥ Victor Glemaud',
  'Carly Cushnie ♥ Cushnie', 'Rihanna ♥ Fenty / Savage X Fenty', 'Pat McGrath ♥ Pat McGrath Labs',
  'Pharrell Williams ♥ Humanrace', 'Bethann Hardison ♥ Advocate & Icon', 'Edward Enninful ♥ British Vogue',
  'André Leon Talley ♥ Fashion Legacy', 'Sergio Hudson ♥ Sergio Hudson', 'Shayne Oliver ♥ Hood By Air',
  'Olivier Rousteing ♥ Balmain', 'Aminah Abdul Jillil ♥ Aminah Abdul Jillil', 'June Ambrose ♥ Slash',
  'Misa Hylton ♥ MCM x Misa Hylton', 'Stephen Burrows ♥ Stephen Burrows', 'Willi Smith ♥ WilliWear',
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
          "relative aspect-[9/16] rounded-sm overflow-hidden transition-all duration-500 ease-out",
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
        {/* Animated background — modern Afro-descendant created brands */}
        <div className="absolute inset-0 z-0 flex flex-col justify-center gap-6 pointer-events-none">
          <p className="text-center text-sm md:text-base tracking-[0.3em] uppercase text-foreground/40 font-semibold mb-4">
            Modern Afro-descendant created brands & their visionaries
          </p>
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
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="text-lg text-muted-foreground mt-6 max-w-xl mx-auto"
          >
            Curated Afro-descendant created brands delivered to your inbox.
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
