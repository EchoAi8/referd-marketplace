import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import InteractiveNetworkCanvas from "@/components/animations/InteractiveNetworkCanvas";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import HeroProfileGridBackdrop from "@/components/sections/hero/HeroProfileGridBackdrop";
import DirectionalButton from "@/components/ui/DirectionalButton";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    stiffness: 90,
    damping: 28,
  });

  // Parallax transforms
  const heroOpacity = useTransform(smoothProgress, [0, 0.7], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.7], [1, 0.95]);
  const canvasY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const logoY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.9]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 80]);
  const cardY = useTransform(smoothProgress, [0, 0.6], [0, -40]);
  const cardRotate = useTransform(smoothProgress, [0, 0.5], [0, -3]);

  return (
    <section ref={containerRef} className="relative h-screen bg-foreground overflow-hidden pt-24">
      {/* Network Canvas backdrop */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale, y: canvasY }}
        className="absolute inset-0 pointer-events-auto"
      >
        <HeroProfileGridBackdrop className="opacity-50" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <InteractiveNetworkCanvas />
        </motion.div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/60 via-foreground/20 to-foreground/90 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/30 via-transparent to-foreground/30 pointer-events-none" />
      </motion.div>

      {/* Content layout: hard-anchored left copy + top-right card */}
      <div className="relative z-10 h-full px-6 sm:px-8 md:px-12 lg:px-16 pb-12 sm:pb-16 md:pb-20 lg:pb-24 pointer-events-none">
        {/* Left: Title + copy + CTAs (locked lower-left) */}
        <div className="absolute left-6 right-6 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-auto bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 max-w-3xl">
          {/* REFERD - massive */}
          <motion.div style={{ y: logoY, scale: logoScale }} className="origin-bottom-left mb-6">
            <motion.h1
              initial={{ y: 100 }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[18vw] sm:text-[15vw] md:text-[12vw] lg:text-[9vw] font-heading font-black text-background leading-[0.85] tracking-[-0.04em] uppercase drop-shadow-[0_0_60px_rgba(255,255,255,0.2)]"
            >
              {"REFERD".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 80 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.05 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              ))}
            </motion.h1>
          </motion.div>

          {/* Tagline + sub */}
          <motion.div style={{ y: contentY }} className="max-w-2xl">
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background/90 font-heading font-bold leading-[1.05]"
            >
              The People Powered Marketplace.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-background/60 text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl leading-relaxed"
            >
              Recruitment is <span className="font-bold text-background/90">NO</span> longer corporate owned. Time to <span className="font-bold text-primary">#GatherYourHerd</span> and get Paid with Referd.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-3 mt-10 pointer-events-auto"
            >
              <DirectionalButton
                theme="talent"
                size="lg"
                onClick={() => navigateWithTransition("/career-intelligence")}
              >
                Know Your Worth
              </DirectionalButton>

              <DirectionalButton
                theme="referrer"
                size="lg"
                onClick={() => navigateWithTransition("/opportunities")}
              >
                Refer &amp; Earn
              </DirectionalButton>

              <DirectionalButton
                theme="brand"
                size="lg"
                onClick={() => navigateWithTransition("/brands")}
              >
                Hire Smarter
              </DirectionalButton>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Platinum Card (locked top-right) */}
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

      {/* Bottom gradient for seamless flow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-foreground to-transparent pointer-events-none z-20" />
    </section>
  );
};

/* ─── Referd Platinum Card ─── */
const PlatinumCard = () => {
  return (
    <div className="relative w-[240px] sm:w-[270px] md:w-[300px] aspect-[1.586/1]">
      {/* Card body */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(0 0% 15%) 0%, 
            hsl(0 0% 22%) 30%, 
            hsl(0 0% 18%) 60%, 
            hsl(0 0% 12%) 100%)`,
          boxShadow: `
            0 25px 60px -15px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.08),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Metallic shimmer overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(
              105deg,
              transparent 20%,
              rgba(255,255,255,0.05) 30%,
              rgba(255,255,255,0.12) 40%,
              rgba(255,255,255,0.05) 50%,
              transparent 60%
            )`,
          }}
        />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              90deg,
              transparent,
              transparent 2px,
              rgba(255,255,255,1) 2px,
              rgba(255,255,255,1) 3px
            )`,
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-background/40 font-medium">
                Referd
              </div>
              <div
                className="text-xs uppercase tracking-[0.2em] mt-1 font-semibold"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--color-sage)) 0%, hsl(var(--color-referrer)) 50%, hsl(var(--color-brand)) 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Platinum
              </div>
            </div>
            {/* Chip */}
            <div
              className="w-10 h-8 rounded-md"
              style={{
                background: `linear-gradient(135deg, 
                  hsl(48 70% 65%) 0%, 
                  hsl(48 50% 50%) 50%, 
                  hsl(48 70% 60%) 100%)`,
                boxShadow: `inset 0 0 2px rgba(0,0,0,0.2)`,
              }}
            />
          </div>

          {/* Amount */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-background/30 mb-1">
              Earnings to date
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-background tracking-tight">
              £47,250
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-background/30">
                Member since
              </div>
              <div className="text-sm text-background/70 font-medium tracking-wide">
                2024
              </div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-[0.15em] text-background/30">
                Status
              </div>
              <div
                className="text-sm font-bold tracking-wide"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--color-sage)), hsl(var(--color-talent-light)))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect behind card */}
      <div
        className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl -z-10 animate-pulse"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--color-sage) / 0.6), hsl(var(--color-referrer) / 0.3) 50%, transparent 80%)`,
        }}
      />
      <div
        className="absolute -inset-4 rounded-3xl opacity-25 blur-xl -z-10"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--color-sage) / 0.5), transparent 60%)`,
        }}
      />
    </div>
  );
};

export default HeroSection;
