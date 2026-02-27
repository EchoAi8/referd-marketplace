import PageLayout from "@/components/layout/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { Play, Heart, TrendingUp, Users, ArrowRight, Sparkles } from "lucide-react";
import { useRef } from "react";

/* ── Discovery Grid Data ── */
const discoveries = [
  {
    id: 1,
    title: "Product Designer",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=800&fit=crop",
    badge: { type: "trending" as const, text: "#Trending" },
    size: "tall" as const,
  },
  {
    id: 2,
    title: "Software Engineer",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=800&fit=crop&crop=top",
    badge: { type: "match" as const, text: "Great match", value: "84%" },
    size: "large" as const,
  },
  {
    id: 3,
    title: "Sales Director",
    image: "https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=800&fit=crop",
    badge: { type: "network" as const, text: "12 people in your network viewed" },
    networkAvatars: [
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&h=80&fit=crop&crop=face",
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&h=80&fit=crop&crop=face",
    ],
    size: "wide" as const,
  },
  {
    id: 4,
    title: "Watch intro",
    subtitle: "Watch intro",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&crop=top",
    badge: { type: "video" as const },
    size: "medium" as const,
  },
  {
    id: 5,
    title: "Customer Success Manager",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=800&fit=crop",
    badge: { type: "tag" as const, text: "#bestPresentals" },
    size: "medium" as const,
  },
  {
    id: 6,
    title: "Data Analyst",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=800&fit=crop",
    badge: { type: "earnup" as const, value: "£1,800" },
    size: "tall" as const,
  },
  {
    id: 7,
    title: "Engineering Manager",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=600&h=600&fit=crop&crop=top",
    badge: { type: "match" as const, text: "Great match", value: "91%" },
    size: "medium" as const,
  },
  {
    id: 8,
    title: "UX Researcher",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=top",
    badge: { type: "earnup" as const, value: "£3,200" },
    size: "large" as const,
  },
  {
    id: 9,
    title: "DevOps Lead",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=600&h=800&fit=crop&crop=top",
    badge: { type: "trending" as const, text: "#HotRole" },
    size: "medium" as const,
  },
];

/* ── Badge Components ── */
const TrendingBadge = ({ text }: { text: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -12 }}
    whileInView={{ scale: 1, rotate: -3 }}
    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.3 }}
    className="absolute top-3 left-3 z-20 px-3 py-1.5 rounded-full bg-destructive font-heading font-bold text-destructive-foreground text-xs shadow-lg"
  >
    {text}
  </motion.div>
);

const MatchBadge = ({ value }: { value: string }) => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.4 }}
    className="absolute top-1/4 left-4 z-20 w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-talent flex flex-col items-center justify-center shadow-xl"
  >
    <span className="text-[10px] font-semibold text-foreground leading-tight">Great</span>
    <span className="text-[10px] font-semibold text-foreground leading-tight">match</span>
    <span className="font-heading font-black text-lg text-foreground leading-none">{value}</span>
  </motion.div>
);

const NetworkBadge = ({ text, avatars }: { text: string; avatars: string[] }) => (
  <motion.div
    initial={{ y: -20, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5, delay: 0.3 }}
    className="absolute top-3 right-3 z-20"
  >
    <div className="flex -space-x-2 mb-1.5">
      {avatars.map((av, i) => (
        <img key={i} src={av} alt="" className="w-7 h-7 rounded-full border-2 border-foreground object-cover" />
      ))}
    </div>
    <div className="px-3 py-1.5 rounded-lg bg-mustard text-foreground text-[10px] font-semibold leading-tight max-w-[120px]">
      {text}
    </div>
  </motion.div>
);

const VideoBadge = () => (
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    transition={{ type: "spring", stiffness: 300, damping: 12, delay: 0.2 }}
    className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
  >
    <div className="w-14 h-14 rounded-full bg-background/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
      <Play className="w-6 h-6 text-foreground fill-foreground ml-0.5" />
    </div>
  </motion.div>
);

const TagBadge = ({ text }: { text: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: 8 }}
    whileInView={{ scale: 1, rotate: 3 }}
    transition={{ type: "spring", stiffness: 400, damping: 15, delay: 0.35 }}
    className="absolute top-1/3 right-4 z-20 px-3 py-1.5 rounded-full bg-talent text-foreground font-heading font-bold text-xs shadow-lg"
  >
    {text}
  </motion.div>
);

const EarnUpBadge = ({ value }: { value: string }) => (
  <motion.div
    initial={{ scale: 0, rotate: -5 }}
    whileInView={{ scale: 1, rotate: 2 }}
    transition={{ type: "spring", stiffness: 350, damping: 14, delay: 0.3 }}
    className="absolute top-3 right-3 z-20 px-3 py-2 rounded-xl bg-mustard shadow-xl"
  >
    <div className="flex items-center gap-1.5">
      <Heart className="w-3.5 h-3.5 text-destructive fill-destructive" />
      <span className="text-[10px] font-semibold text-foreground">Earnup</span>
    </div>
    <p className="font-heading font-black text-xl text-foreground leading-none mt-0.5">{value}</p>
  </motion.div>
);

/* ── Discovery Card ── */
const DiscoveryCard = ({ item, index }: { item: typeof discoveries[0]; index: number }) => {
  const sizeClasses = {
    tall: "row-span-2",
    large: "row-span-2 md:col-span-1",
    wide: "md:col-span-1 row-span-1",
    medium: "row-span-1",
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.07, ease: [0.22, 0.03, 0.26, 1] }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={`group relative rounded-2xl overflow-hidden cursor-pointer ${sizeClasses[item.size]}`}
      style={{ minHeight: item.size === "tall" || item.size === "large" ? "420px" : "200px" }}
    >
      {/* Image */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/30 to-foreground/10" />

      {/* Badges */}
      {item.badge.type === "trending" && <TrendingBadge text={item.badge.text!} />}
      {item.badge.type === "match" && <MatchBadge value={item.badge.value!} />}
      {item.badge.type === "network" && <NetworkBadge text={item.badge.text!} avatars={item.networkAvatars || []} />}
      {item.badge.type === "video" && <VideoBadge />}
      {item.badge.type === "tag" && <TagBadge text={item.badge.text!} />}
      {item.badge.type === "earnup" && <EarnUpBadge value={item.badge.value!} />}

      {/* Title */}
      <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 z-10">
        <h3 className="font-heading font-black text-background leading-[0.95]"
          style={{ fontSize: item.size === "large" || item.size === "tall" ? "clamp(1.5rem, 4vw, 2.5rem)" : "clamp(1.2rem, 3vw, 1.75rem)" }}
        >
          {item.title}
        </h3>
        {item.subtitle && (
          <p className="text-xs text-background/60 mt-1">{item.subtitle}</p>
        )}
      </div>

      {/* Online dot for some cards */}
      {index % 3 === 0 && (
        <div className="absolute bottom-4 right-4 z-10 w-2.5 h-2.5 rounded-full bg-talent shadow-[0_0_8px_hsl(var(--color-talent))]" />
      )}
    </motion.article>
  );
};

/* ── Page ── */
const Opportunities = () => {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <PageLayout>
      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[80vh] bg-foreground overflow-hidden flex items-center">
        {/* Ambient glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-talent/10 blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[30vw] h-[30vw] rounded-full bg-mustard/10 blur-[100px]" />
        </div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 py-32 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-background/10 text-background/60 text-xs tracking-[0.25em] uppercase mb-8"
          >
            <Sparkles className="w-3 h-3" />
            Refer'd Discovery Grid
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="font-heading font-black text-sage leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            You're not reading.
            <br />
            <span className="text-background">You're discovering.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-6 max-w-xl mx-auto text-lg text-background/50"
          >
            Scroll through roles, people, and opportunities the way you scroll through culture — visually, intuitively, endlessly.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            <MagneticButton
              className="px-6 py-3 rounded-full bg-sage text-foreground font-heading font-bold text-sm"
              strength={0.3}
            >
              Explore The Grid
              <ArrowRight className="w-4 h-4 ml-2 inline" />
            </MagneticButton>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* ── Discovery Grid ── */}
      <section className="py-16 md:py-24 bg-background -mt-16">
        <div className="container mx-auto max-w-6xl px-4 sm:px-6">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-10"
          >
            <TrendingUp className="w-5 h-5 text-sage" />
            <span className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-muted-foreground">
              Curated for you
            </span>
          </motion.div>

          {/* Bento Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 auto-rows-[180px] sm:auto-rows-[200px]">
            {discoveries.map((item, index) => (
              <DiscoveryCard key={item.id} item={item} index={index} />
            ))}
          </div>

          {/* Load more */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <MagneticButton
              className="px-8 py-4 rounded-full border border-border text-muted-foreground font-heading font-bold text-sm hover:bg-foreground hover:text-background transition-colors"
              strength={0.25}
            >
              Load more discoveries
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="py-20 bg-foreground">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-black text-background leading-[0.9]"
            style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}
          >
            Stop scrolling job boards.
            <br />
            <span className="text-sage">Start discovering people.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-10 flex flex-wrap justify-center gap-4"
          >
            {[
              { label: "I'm Talent", color: "bg-talent text-foreground" },
              { label: "I Refer People", color: "bg-referrer text-foreground" },
              { label: "I'm Hiring", color: "bg-brand text-foreground" },
            ].map((cta) => (
              <MagneticButton
                key={cta.label}
                className={`px-6 py-3 rounded-full font-heading font-bold text-sm ${cta.color}`}
                strength={0.3}
              >
                {cta.label}
                <ArrowRight className="w-4 h-4 ml-2 inline" />
              </MagneticButton>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="mt-8 flex items-center justify-center gap-6 text-background/40 text-xs"
          >
            <span className="flex items-center gap-1.5"><Users className="w-3.5 h-3.5" /> 2,400+ active referrers</span>
            <span>•</span>
            <span>£1.2M+ earned this quarter</span>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Opportunities;
