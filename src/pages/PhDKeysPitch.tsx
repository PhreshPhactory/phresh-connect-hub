import SEOHead from "@/components/SEOHead";
import phdKeysLogo from "@/assets/phd-keys-logo-v2.png.asset.json";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <div className="inline-block border border-amber-400/40 text-amber-400 tracking-[0.3em] text-[10px] md:text-xs uppercase px-3 py-1 mb-6">
    {children}
  </div>
);

const SectionFooter = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-12 pt-6 border-t border-amber-400/20 text-amber-400/70 tracking-[0.25em] text-[10px] uppercase">
    {children}
  </div>
);

const Card = ({
  title,
  body,
  tag,
}: {
  title: string;
  body: string;
  tag: string;
}) => (
  <div className="border border-amber-400/20 bg-black/40 p-6 md:p-8 hover:border-amber-400/60 transition-colors">
    <h3 className="font-cinzel text-xl md:text-2xl text-amber-300 mb-4">{title}</h3>
    <p className="text-neutral-300 leading-relaxed font-light">{body}</p>
    <div className="mt-6 text-[10px] md:text-xs tracking-[0.25em] text-amber-400/70 uppercase">
      {tag}
    </div>
  </div>
);

const Section = ({
  children,
  label,
  footer,
}: {
  children: React.ReactNode;
  label?: string;
  footer?: string;
}) => (
  <section className="border-b border-amber-400/10 py-20 md:py-28 px-6 md:px-12 lg:px-24">
    <div className="max-w-7xl mx-auto">
      {label && <SectionLabel>{label}</SectionLabel>}
      {children}
      {footer && <SectionFooter>{footer}</SectionFooter>}
    </div>
  </section>
);

const PhDKeysPitch = () => {
  return (
    <>
      <SEOHead
        title="PhD Keys Venture Pitch | Phresh Phactory, Inc."
        description="The Deep-Tech IP Arbitrage Machine. A confidential venture investor pitch from Phresh Phactory, Inc."
        canonicalUrl="https://phreshphactory.com/phdkeyspitch"
      />

      <style>{`
        .font-cinzel { font-family: 'Cinzel', serif; }
        .font-mont { font-family: 'Montserrat', sans-serif; }
      `}</style>
      <link
        href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Montserrat:wght@300;400;600;800&display=swap"
        rel="stylesheet"
      />

      <main className="min-h-screen bg-[#0a0a0a] text-white font-mont">
        {/* Cover */}
        <Section label="Confidential // Investment Proposal">
          <img
            src={phdKeysLogo.url}
            alt="PhD Keys - Unlocking the World's Sharpest Minds"
            className="w-full max-w-2xl mx-auto mb-8"
          />
          <p className="text-amber-400 tracking-[0.4em] text-xs md:text-sm mb-4 uppercase">
            Venture Pitch Competition
          </p>
          <h1 className="font-cinzel text-6xl md:text-8xl lg:text-9xl text-amber-300 leading-none mb-6">
            PhD Keys
          </h1>
          <p className="text-neutral-400 italic mb-10">
            A Phresh Phactory, Inc. Production
          </p>
          <p className="text-xl md:text-2xl text-neutral-200 font-light max-w-4xl leading-relaxed mb-12">
            The Deep-Tech IP Arbitrage Machine: Building a decentralized holding
            company for the world's most valuable stagnant science.
          </p>
          <div className="border-l-2 border-amber-400 pl-6">
            <div className="text-amber-400 tracking-[0.25em] text-xs uppercase mb-2">
              Presented by: Kiera H.
            </div>
            <div className="text-neutral-300">
              Veteran · Multi-Patented Scientist · 20-Year Scaling Operator
            </div>
          </div>
        </Section>

        {/* Problem */}
        <Section label="The Macro Problem Node">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            The $100B Graveyard of Stalled Science
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              title="The Maintenance Trap"
              body="Universities and independent scientists routinely let high-value patents expire at 3.5, 7.5, or 11.5 years simply because they lack the $2,000–$7,400 required for USPTO maintenance fees."
              tag="Market Crash Node"
            />
            <Card
              title="The Execution Gap"
              body="Brilliant inventors are trained to run laboratories, not navigate regulatory trials, draft venture term sheets, set up corporate governance, or build commercial scaling architectures."
              tag="Human Capacity Constraint"
            />
            <Card
              title="The Stagnant Vault"
              body="Billions of dollars in public-funded, peer-validated research lie completely stagnant inside unindexed federal databases because traditional tech-transfer offices are bottlenecked."
              tag="Unrealized IP Arbitrage"
            />
          </div>
        </Section>

        {/* Paywall */}
        <Section label="Digital Asset Liquidity Flywheel">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            The $64 Paywall & Scientific Micro-Publishing
          </h2>
          <div className="grid md:grid-cols-2 gap-10 mb-12">
            <div>
              <h3 className="font-cinzel text-2xl text-amber-300 mb-4">
                The Institutional Gatekeepers
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light">
                To read a single paywalled paper on advanced materials, AI
                architectures, or clean-energy pathways costs the average
                citizen $64. Public-funded science is hidden behind cash
                barriers while the public gets scammed by fake internet gurus.
              </p>
            </div>
            <div>
              <h3 className="font-cinzel text-2xl text-amber-300 mb-4">
                The Micro-Publishing Engine
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light">
                PhD Keys breaks the lock. We use advanced LLM translations to
                ingest these paywalled papers, distill their core discoveries,
                and package highly digestible, plain-English micro-e-books
                priced at $4.99–$9.99. This unlocks a high-velocity, high-margin,
                viral digital revenue pipeline.
              </p>
            </div>
          </div>
          <div className="border border-amber-400/30 bg-gradient-to-br from-amber-950/30 to-transparent p-8 md:p-12">
            <h3 className="font-cinzel text-2xl md:text-3xl text-amber-300 mb-4">
              The Media Flywheel Moat
            </h3>
            <p className="text-neutral-300 mb-8 max-w-3xl font-light">
              Our proprietary media engine (PhD Keys, a Phresh Phactory, Inc.
              Production) unlocks paywalled research, distills it through LLM
              translation, and generates immediate cash liquidity through
              micro-publications, AdSense, and premium brand partnerships.
            </p>
            <div className="grid sm:grid-cols-3 gap-8">
              <div>
                <div className="font-cinzel text-5xl md:text-6xl text-amber-300">
                  $64
                </div>
                <div className="text-amber-400/80 tracking-[0.2em] uppercase text-xs mt-2">
                  Cost Per Source Paper
                </div>
              </div>
              <div>
                <div className="font-cinzel text-5xl md:text-6xl text-amber-300">
                  ~7
                </div>
                <div className="text-amber-400/80 tracking-[0.2em] uppercase text-xs mt-2">
                  Unit Sales to Breakeven
                </div>
              </div>
              <div>
                <div className="font-cinzel text-5xl md:text-6xl text-amber-300">
                  3
                </div>
                <div className="text-amber-400/80 tracking-[0.2em] uppercase text-xs mt-2">
                  Stacked Revenue Streams
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Thesis */}
        <Section label="Literature-Grounded Deep-Tech Play">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            Our Investment Thesis: Team Over Solo Inventor
          </h2>
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <h3 className="font-cinzel text-2xl text-amber-300 mb-4">
                Clayton & Feldman Integration
              </h3>
              <p className="text-neutral-300 leading-relaxed font-light mb-6">
                Empirical analysis in "Academic Teams and Commercialization in
                the Life Sciences" (Paige Clayton & Maryann Feldman) confirms
                that commercialization success is heavily dependent on diverse
                team composition, never the solitary technical inventor.
              </p>
              <ul className="space-y-4 text-neutral-300 font-light">
                <li className="flex gap-3">
                  <span className="text-amber-400">✓</span>
                  PhD Keys operationalizes this science. We leave the scientist
                  completely in control of the laboratory, while our team serves
                  as their outsourced business development force.
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-400">✓</span>
                  Friction slashed. By executing LLC setup, cap table modeling,
                  VC readiness, and regulatory compliance pathways, we materially
                  compress translation timelines from years to quarters.
                </li>
              </ul>
            </div>
            <div className="border border-amber-400/30 bg-black/40 p-8 md:p-12 flex flex-col justify-center">
              <div className="text-amber-400/80 tracking-[0.25em] uppercase text-xs mb-4">
                Our Arbitrage Moat
              </div>
              <div className="font-cinzel text-6xl md:text-7xl text-amber-300 mb-6">
                20–40%
              </div>
              <p className="text-neutral-300 font-light">
                Founder equity positions secured in every NewCo we scale out,
                captured entirely in exchange for our AI-empowered operational
                infrastructure.
              </p>
            </div>
          </div>
        </Section>

        {/* Workflow */}
        <Section label="The Proprietary Workflow Moat">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            The Automated IP Sourcing Operating System
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01 / Source",
                title: "LLM Ingestion",
                body: "Custom LLM web-crawlers scan public federal databases to locate high-value patents approaching critical lapse parameters.",
                tag: "Automated Scraping",
              },
              {
                step: "02 / Translate",
                title: "Technical Parse",
                body: "AI engines instantly translate dense scientific and engineering jargon into investor decks and plain-English content.",
                tag: "Rapid Translation",
              },
              {
                step: "03 / Co-Found",
                title: "Ops Integration",
                body: "Our operational machine deploys LLC formations, cap tables, legal guidelines, and direct corporate templates.",
                tag: "Sweat-Equity Funded",
              },
              {
                step: "04 / Scale",
                title: "Venture Launch",
                body: "Deploy clear regulatory and go-to-market maps, prepare institutional VC pitches, and drive viral market distribution.",
                tag: "Commercial Runway",
              },
            ].map((s) => (
              <div
                key={s.step}
                className="border border-amber-400/20 bg-black/40 p-6 hover:border-amber-400/60 transition-colors"
              >
                <div className="text-amber-400/70 tracking-[0.25em] text-[10px] uppercase mb-4">
                  {s.step}
                </div>
                <h3 className="font-cinzel text-xl text-amber-300 mb-3">
                  {s.title}
                </h3>
                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {s.body}
                </p>
                <div className="mt-6 text-[10px] tracking-[0.25em] text-amber-400/70 uppercase">
                  {s.tag}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Case Study */}
        <Section label="Operational Proof-of-Concept">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            Case Study: Proving the Infrastructure
          </h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-5 text-neutral-300 font-light">
              <h3 className="font-cinzel text-2xl text-amber-300 mb-2">
                The STAR Delivery Blueprint
              </h3>
              <p>
                <strong className="text-amber-300">Situation:</strong> Decades of
                high-value scientific discoveries remain locked in unindexed
                registries because academic inventors lack business capacity.
              </p>
              <p>
                <strong className="text-amber-300">Task:</strong> Build a
                systemic, highly scalable operational infrastructure that frees
                the technical creator from administrative burdens.
              </p>
              <p>
                <strong className="text-amber-300">Action:</strong> Developed
                automated patent-mining AI flows and translated academic
                research into commercial collateral.
              </p>
              <p>
                <strong className="text-amber-300">Result:</strong> Bypassed
                sluggish university TTOs and mapped 40 custom operational case
                studies for immediate venture capital funding.
              </p>
            </div>
            <div className="border border-amber-400/30 bg-black/40 p-8 flex flex-col justify-center">
              <div className="text-amber-400/80 tracking-[0.25em] uppercase text-xs mb-4">
                Current Sourcing Pipe
              </div>
              <div className="font-cinzel text-7xl text-amber-300 mb-4">40</div>
              <div className="text-neutral-200 mb-4">Operational Case Studies Mapped</div>
              <p className="text-neutral-400 text-sm font-light">
                Validated data pipelines currently mapped and formatted to
                bypass institutional gatekeepers and rescue stagnant patents.
              </p>
            </div>
          </div>
        </Section>

        {/* Founder Monetization Stack — services productized for every PhD */}
        <Section label="Founder Monetization Stack">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-6">
            Funding the Lab Through the Founder
          </h2>
          <p className="text-neutral-300 font-light max-w-4xl mb-12 leading-relaxed">
            Every PhD we co-found is also a personal brand asset. We package and
            monetize that authority into recurring revenue streams that fund
            research runway long before exit — the same productization model
            proven under the plan, now templated across the portfolio.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              title="Board & Advisory Placements"
              body="We pitch each scientist into paid corporate, nonprofit, and startup board seats aligned to their domain — converting credentials into governance income."
              tag="$25K–$75K per Seat / Year"
            />
            <Card
              title="Direct-Access Subscriptions"
              body="Productized monthly memberships where the public, operators, and other researchers interact directly with the scientist via Q&A, office hours, and gated briefings."
              tag="Recurring MRR"
            />
            <Card
              title="Speaking & Keynotes"
              body="Booked stages at industry conferences, university circuits, and corporate offsites. We handle inbound, contracts, and pricing leverage."
              tag="$5K–$50K per Engagement"
            />
            <Card
              title="Podcast & Interview Circuit"
              body="Coordinated guest tours on top-tier science, business, and culture podcasts — compounding distribution into the e-book and subscription funnel."
              tag="Owned Media Flywheel"
            />
            <Card
              title="Sponsored Research Briefs"
              body="Branded explainers and white papers where vetted sponsors fund the scientist to publish credible, plain-English distillations of their field."
              tag="Brand-Funded Authority"
            />
            <Card
              title="Licensing & Expert Witness"
              body="Inbound legal, due-diligence, and consulting engagements routed through Phresh Phactory, Inc., billed at expert-tier rates with revenue share."
              tag="Premium Hourly Yield"
            />
          </div>
          <div className="mt-12 border border-amber-400/30 bg-gradient-to-br from-amber-950/30 to-transparent p-8 md:p-10">
            <p className="text-neutral-200 text-lg font-light max-w-4xl">
              <strong className="text-amber-300">Net effect:</strong> every
              founder in the portfolio generates self-funded operating cash from
              day one. Equity upside is preserved, dilution is delayed, and the
              lab keeps running while the NewCo matures toward institutional
              capital.
            </p>
          </div>
        </Section>


        <Section label="Venture-Scale Unit Economics">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            The Deep-Tech Portfolio Flywheel
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card
              title="Micro-Publishing Cash"
              body="Immediate, high-volume digital e-book transactions ($4.99–$9.99) generating day-one business liquidity and proving consumer interest."
              tag="High-Margin Cash Liquidity"
            />
            <Card
              title="B2B Sourcing Fees"
              body="Deep-tech venture capital funds pay us flat finder fees of $10,000 per pre-vetted hard-science asset successfully sourced for them. We retain 20–40% co-founder equity in every NewCo we place, so we earn the fee upfront and the equity upside on exit."
              tag="$10K Fee + Equity Stack"
            />
            <Card
              title="Equity Arbitrage Stakes"
              body="Assuming complete corporate execution burden for selected researchers in exchange for 20% to 40% co-founder equity positions. This stacks concurrently with B2B sourcing fees on the same deals."
              tag="Portfolio Equity Value"
            />
          </div>
        </Section>

        {/* Roadmap */}
        <Section label="16-Week Blueprint & Tech Partnership">
          <h2 className="font-cinzel text-4xl md:text-6xl text-amber-300 mb-12">
            Path to Scale: 16-Week Blueprint
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
            {[
              {
                week: "W 1–4",
                title: "Set Infrastructure",
                body: "Establish regulatory filters and finalize LLM database sourcing rules with Watson Institute advisory.",
              },
              {
                week: "W 5–7",
                title: "Index & Vet",
                body: "Run first sourcing sweeps, score lapsing patents by commercial viability, and shortlist target inventors.",
              },
              {
                week: "W 8–12",
                title: "Deploy Sourcing",
                body: "Allocate pilot compute budget to unlock high-capacity GPU processing for patent indexing at production scale.",
              },
              {
                week: "W 13–15",
                title: "Founder Onboarding",
                body: "Stand up NewCo entities, cap tables, and monetization stack (boards, subscriptions, speaking) for first cohort.",
              },
              {
                week: "W 16+",
                title: "Onboard Pilot",
                body: "Close commercial agreement with partnered PhD. Prepare first investor pitch and media episode launch.",
              },
            ].map((p) => (
              <div
                key={p.week}
                className="border border-amber-400/20 bg-black/40 p-6"
              >
                <div className="text-amber-400/70 tracking-[0.25em] text-[10px] uppercase mb-4">
                  {p.week}
                </div>
                <h3 className="font-cinzel text-xl text-amber-300 mb-3">
                  {p.title}
                </h3>
                <p className="text-neutral-300 text-sm font-light leading-relaxed">
                  {p.body}
                </p>
              </div>
            ))}
          </div>
          <div className="border border-amber-400/30 bg-gradient-to-br from-amber-950/30 to-transparent p-8 md:p-12">
            <div className="text-amber-400/80 tracking-[0.25em] uppercase text-xs mb-3">
              Google Cloud Power
            </div>
            <p className="text-neutral-200 text-lg font-light max-w-4xl">
              Running large-scale LLM databases and vector parsing engines
              relies fully on the infrastructure strength of{" "}
              <strong className="text-amber-300">Google Data Centers</strong>.
            </p>
            <div className="mt-4 text-amber-400/70 tracking-[0.25em] text-[10px] uppercase">
              Deep Integration Channel
            </div>
          </div>
        </Section>

        {/* Close */}
        <Section label="Questions & Discussion // Pitch Close">
          <p className="text-amber-400 tracking-[0.4em] text-xs uppercase mb-4">
            The Close
          </p>
          <h2 className="font-cinzel text-5xl md:text-7xl text-amber-300 mb-10">
            Let the Smartest People Win
          </h2>
          <p className="text-xl text-neutral-200 max-w-4xl font-light leading-relaxed mb-8">
            PhD Keys is the definitive operational vehicle engineered to
            dismantle the academic transfer block, capture multi-million dollar
            stagnant assets, and return peak scientific truth to the public
            sphere.
          </p>
          <p className="text-amber-300 italic mb-16">
            We are currently seeking strategic partners, advisors, and cloud
            integrations.
          </p>

          <div className="border border-amber-400/30 bg-black/40 p-8 md:p-12 max-w-3xl">
            <div className="text-amber-400/80 tracking-[0.25em] uppercase text-xs mb-6">
              The Unfair Advantage
            </div>
            <dl className="space-y-4 text-neutral-200">
              <div className="grid grid-cols-2 gap-4 border-b border-amber-400/10 pb-3">
                <dt className="text-amber-400/80 uppercase text-xs tracking-widest">
                  Founder Profile
                </dt>
                <dd className="font-cinzel text-xl text-amber-300">Kiera H.</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-amber-400/10 pb-3">
                <dt className="text-amber-400/80 uppercase text-xs tracking-widest">
                  Execution Rank
                </dt>
                <dd>Veteran Officer Discipline</dd>
              </div>
              <div className="grid grid-cols-2 gap-4 border-b border-amber-400/10 pb-3">
                <dt className="text-amber-400/80 uppercase text-xs tracking-widest">
                  Technical Power
                </dt>
                <dd>Multi-Patented Scientist</dd>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <dt className="text-amber-400/80 uppercase text-xs tracking-widest">
                  Business History
                </dt>
                <dd>20-Year Operational Scaler</dd>
              </div>
            </dl>
          </div>
        </Section>

        <footer className="py-10 px-6 text-center text-amber-400/60 tracking-[0.3em] text-[10px] uppercase">
          Phresh Phactory, Inc. · Confidential
        </footer>
      </main>
    </>
  );
};

export default PhDKeysPitch;
