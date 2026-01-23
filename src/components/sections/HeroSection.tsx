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

  // Parallax transforms for different layers
  const heroOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.55], [1, 0.92]);
  const canvasY = useTransform(smoothProgress, [0, 1], [0, 150]);
  const logoY = useTransform(smoothProgress, [0, 0.55], [0, -80]);
  const logoScale = useTransform(smoothProgress, [0, 0.55], [1, 0.85]);
  const contentY = useTransform(smoothProgress, [0, 0.55], [0, 120]);
  const cardY = useTransform(smoothProgress, [0, 0.55], [0, -60]);
  const cardRotate = useTransform(smoothProgress, [0, 0.55], [3, -6]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={containerRef} className="relative min-h-screen h-screen max-h-screen bg-foreground overflow-hidden flex-shrink-0">
      {/* Interactive Network Canvas Background with parallax */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: canvasY }} 
        className="absolute inset-0 pointer-events-auto"
      >
        {/* Animated profile-grid depth layer – more visible with slow horizontal scroll */}
        <HeroProfileGridBackdrop className="opacity-80" />

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <InteractiveNetworkCanvas />
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-transparent to-foreground/20 pointer-events-none" />
      </motion.div>

      {/* Main Content Container - Full height with flexbox */}
      <div className="relative z-10 h-full flex flex-col justify-between pt-24 sm:pt-28 md:pt-32 pb-20 sm:pb-24 md:pb-28 px-4 sm:px-6 md:px-12 pointer-events-none">
        {/* Top - Logo with character animation and parallax */}
        <motion.div 
          style={{ y: logoY, scale: logoScale }} 
          className="origin-top-left overflow-visible"
        >
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] sm:text-[16vw] md:text-[14vw] lg:text-[12vw] font-heading font-bold text-background leading-[0.85] tracking-tighter"
          >
            {"Referd".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.1 + i * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="text-sage text-[0.4em] align-super ml-1"
            >
              ®
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Center/Bottom Content - Text on Left */}
        <motion.div 
          style={{ y: contentY }}
          className="flex-1 flex flex-col justify-end"
        >
          {/* Tagline & CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-background/95 font-heading font-bold leading-tight"
            >
              The People Powered Recruitment Marketplace
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-xl sm:text-2xl md:text-3xl text-sage font-heading font-medium"
            >
              Gather your Herd — Get paid with Referd.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-background/60 text-base sm:text-lg md:text-xl max-w-2xl"
            >
              Find out your market value. Turn your network into income. AI and Machine learning intelligence.
            </motion.p>

            {/* Bold Directional CTA Buttons with User-Type Colors + Pulsing Glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row flex-wrap gap-4 mt-8 pointer-events-auto"
            >
              {/* Talent CTA - Pastel Green with pulsing glow */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-talent/40"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                />
                <DirectionalButton 
                  theme="talent"
                  size="xl"
                  onClick={() => navigateWithTransition("/career-intelligence")}
                  className="relative z-10 shadow-[0_0_40px_hsl(var(--color-talent)/0.5)] hover:shadow-[0_0_60px_hsl(var(--color-talent)/0.7)]"
                >
                  Find Out How Much You're Worth
                </DirectionalButton>
              </div>
              
              {/* Referrer CTA - Pastel Blue with pulsing glow */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-referrer/40"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                />
                <DirectionalButton
                  theme="referrer"
                  size="xl"
                  onClick={() => navigateWithTransition("/opportunities")}
                  className="relative z-10 shadow-[0_0_40px_hsl(var(--color-referrer)/0.5)] hover:shadow-[0_0_60px_hsl(var(--color-referrer)/0.7)]"
                >
                  Refer & Earn
                </DirectionalButton>
              </div>
              
              {/* Brand CTA - Pastel Pink with pulsing glow */}
              <div className="relative">
                <motion.div
                  className="absolute inset-0 rounded-full bg-brand/40"
                  animate={{ scale: [1, 1.15, 1], opacity: [0.6, 0, 0.6] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                />
                <DirectionalButton
                  theme="brand"
                  size="xl"
                  onClick={() => navigateWithTransition("/how-it-works")}
                  className="relative z-10 shadow-[0_0_40px_hsl(var(--color-brand)/0.5)] hover:shadow-[0_0_60px_hsl(var(--color-brand)/0.7)]"
                >
                  Post Opportunities
                </DirectionalButton>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Credit Card - Visible on all screen sizes */}
        <motion.div
          style={{ y: cardY, rotate: cardRotate, opacity: cardOpacity }}
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="absolute bottom-24 sm:bottom-20 right-4 sm:right-8 lg:right-12 w-48 sm:w-56 md:w-64 lg:w-80 pointer-events-auto cursor-pointer z-20"
        >
          {/* Credit Card Design - Using UNIFIED talent green */}
          <div className="relative w-full aspect-[1.586/1] rounded-2xl overflow-hidden shadow-2xl">
            {/* Card Background - Talent green to match R button and CTAs */}
            <div className="absolute inset-0 bg-gradient-to-br from-talent via-talent/90 to-talent-dark" />
            
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-3 left-3 w-8 h-8 lg:w-10 lg:h-10 rounded-full border-2 border-foreground/20" />
              <div className="absolute top-4 left-4 w-5 h-5 lg:w-7 lg:h-7 rounded-full border-2 border-foreground/20" />
              <div className="absolute bottom-4 right-4 w-10 h-10 lg:w-12 lg:h-12 rounded-full border border-foreground/10" />
            </div>
            
            {/* Card Content */}
            <div className="relative h-full p-4 lg:p-5 flex flex-col justify-between">
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="text-foreground font-heading font-bold text-sm lg:text-base tracking-tight">
                  Referd<span className="text-foreground/60 text-[10px] lg:text-xs align-super">®</span>
                </div>
                {/* Chip using referrer blue */}
                <div className="w-7 h-5 lg:w-8 lg:h-6 rounded bg-gradient-to-br from-referrer/80 to-referrer/50 border border-foreground/10" />
              </div>
              
              {/* Balance */}
              <div>
                <p className="text-[10px] lg:text-xs uppercase tracking-widest text-foreground/60">
                  Referral Balance
                </p>
                <p className="text-xl lg:text-2xl font-heading font-bold text-foreground tracking-tight">
                  £24,000
                </p>
              </div>
              
              {/* Bottom - Using referrer blue and brand pink */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[8px] lg:text-[10px] uppercase tracking-wider text-foreground/50">Since</p>
                  <p className="text-xs lg:text-sm font-medium text-foreground/80">2024</p>
                </div>
                <div className="flex">
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-brand/80" />
                  <div className="w-5 h-5 lg:w-6 lg:h-6 rounded-full bg-referrer/80 -ml-2" />
                </div>
              </div>
            </div>
            
            {/* Shine */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
              initial={{ x: "-100%" }}
              animate={{ x: "200%" }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator - centered at bottom */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        style={{ opacity: useTransform(smoothProgress, [0, 0.2], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-background/40">Scroll</span>
          <motion.div
            className="w-px h-8 bg-gradient-to-b from-background/50 to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
