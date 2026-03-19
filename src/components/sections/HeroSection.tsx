import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import InteractiveNetworkCanvas from "@/components/animations/InteractiveNetworkCanvas";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import HeroProfileGridBackdrop from "@/components/sections/hero/HeroProfileGridBackdrop";
import DirectionalButton from "@/components/ui/DirectionalButton";
import PlatinumCard from "@/components/sections/hero/PlatinumCard";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    stiffness: 90,
    damping: 28,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.7], [1, 0.95]);
  const canvasY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const profileGridY = useTransform(smoothProgress, [0, 1], [0, 80]);
  const orbLayer1Y = useTransform(smoothProgress, [0, 1], [0, -60]);
  const orbLayer2Y = useTransform(smoothProgress, [0, 1], [0, 120]);
  const logoY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 80]);
  const cardY = useTransform(smoothProgress, [0, 0.6], [0, -40]);
  const cardRotate = useTransform(smoothProgress, [0, 0.5], [0, -3]);

  return (
    <section ref={containerRef} className="relative h-screen bg-foreground overflow-hidden pt-24">
      {/* Layer 0: Profile Grid backdrop */}
      <motion.div
        style={{ y: profileGridY, opacity: heroOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <HeroProfileGridBackdrop className="opacity-40" />
      </motion.div>

      {/* Layer 1: Stakeholder orbs — Talent (sage) */}
      <motion.div
        style={{ y: orbLayer1Y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full opacity-[0.08]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-talent)), transparent 70%)" }}
        />
        <div className="absolute bottom-[25%] right-[5%] w-96 h-96 rounded-full opacity-[0.05]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-referrer)), transparent 70%)" }}
        />
      </motion.div>

      {/* Layer 2: Brand orb */}
      <motion.div
        style={{ y: orbLayer2Y }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-[60%] left-[40%] w-48 h-48 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-brand)), transparent 70%)" }}
        />
      </motion.div>

      {/* Layer 3: Interactive Network Canvas */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: canvasY }}
        className="absolute inset-0 pointer-events-auto"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <InteractiveNetworkCanvas />
        </motion.div>
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/20 to-foreground/90 pointer-events-none z-[6]" />
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-transparent to-foreground/30 pointer-events-none z-[6]" />

      {/* Content */}
      <div className="relative z-10 h-full px-6 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 pointer-events-none">
        {/* Left: Title + copy + CTAs */}
        <div className="absolute left-6 right-6 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-auto bottom-16 sm:bottom-20 md:bottom-24 lg:bottom-28 max-w-3xl">
          {/* Wordmark */}
          <motion.div style={{ y: logoY, scale: logoScale }} className="origin-bottom-left mb-4">
            <motion.h1
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[20vw] sm:text-[16vw] md:text-[13vw] lg:text-[10vw] font-heading font-black text-background leading-[0.85] tracking-[-0.03em]"
              style={{ textShadow: "0 0 80px rgba(255,255,255,0.3), 0 0 160px rgba(255,255,255,0.1)" }}
            >
              Refer'd
            </motion.h1>
          </motion.div>

          {/* Stakeholder-colored tagline */}
          <motion.div style={{ y: contentY }} className="max-w-2xl">
            <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-[1.05]">
              {[
                { word: "Not", color: "text-background" },
                { word: "Candidates.", color: "text-talent" },
                { word: "Not", color: "text-background" },
                { word: "Recruiters.", color: "text-background/60" },
                { word: "Just", color: "text-background" },
                { word: "People.", color: "text-referrer" },
              ].map(({ word, color }, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{ duration: 0.7, delay: 0.45 + i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  className={`inline-block mr-[0.25em] ${color}`}
                >
                  {word}
                </motion.span>
              ))}
            </p>

            {/* Sub-copy — warm, rebellious, people-first */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-background/80 text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-2xl leading-relaxed font-medium"
            >
              Forget <span className="line-through text-background/40">applicants</span>, <span className="line-through text-background/40">hiring managers</span> and <span className="line-through text-background/40">agencies</span>. 
              Here, you're <motion.span className="text-talent font-bold" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity }}>Talent</motion.span>, a <motion.span className="text-referrer font-bold" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, delay: 1 }}>Referrer</motion.span>, or a <motion.span className="text-brand font-bold" animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }}>Brand</motion.span> — and everyone earns. <span className="font-bold text-primary">#GatherYourHerd</span>
            </motion.p>

            {/* Stakeholder legend pills */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.85 }}
              className="flex flex-wrap gap-3 mt-6"
            >
              {[
                { label: "Talent", sublabel: "not candidates", color: "bg-talent", text: "text-foreground" },
                { label: "Referrer", sublabel: "not recruiters", color: "bg-referrer", text: "text-foreground" },
                { label: "Brand", sublabel: "not employers", color: "bg-brand", text: "text-foreground" },
              ].map((pill, i) => (
                <motion.div
                  key={pill.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.1 }}
                  className={`${pill.color} ${pill.text} px-4 py-2 rounded-full text-sm font-bold flex items-center gap-2`}
                >
                  <span>{pill.label}</span>
                  <span className="opacity-60 font-normal text-xs italic">{pill.sublabel}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mt-10 pointer-events-auto"
            >
              <DirectionalButton
                theme="talent"
                size="xl"
                onClick={() => navigateWithTransition("/career-intelligence")}
              >
                I'm Talent
              </DirectionalButton>

              <DirectionalButton
                theme="referrer"
                size="xl"
                onClick={() => navigateWithTransition("/opportunities")}
              >
                I'm a Referrer
              </DirectionalButton>

              <DirectionalButton
                theme="brand"
                size="xl"
                onClick={() => navigateWithTransition("/brands")}
              >
                I'm a Brand
              </DirectionalButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Platinum Card */}
        <motion.div
          style={{ y: cardY, rotate: cardRotate }}
          className="absolute top-28 sm:top-32 md:top-36 lg:top-32 right-4 sm:right-6 md:right-10 lg:right-16 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 60, rotateY: -15 }}
            animate={{ opacity: 1, y: 0, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <PlatinumCard />
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-foreground to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
