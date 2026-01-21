import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import MagneticButton from "@/components/animations/MagneticButton";
import InteractiveNetworkCanvas from "@/components/animations/InteractiveNetworkCanvas";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

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
    <section ref={containerRef} className="relative min-h-screen bg-foreground overflow-hidden">
      {/* Interactive Network Canvas Background with parallax */}
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
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-transparent to-foreground/70 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-transparent to-foreground/20 pointer-events-none" />
      </motion.div>

      {/* Main Content Container */}
      <div className="relative z-10 min-h-screen flex flex-col pt-24 md:pt-28 pb-8 px-4 sm:px-6 md:px-12 pointer-events-none">
        {/* Top - Logo with character animation and parallax */}
        <motion.div 
          style={{ y: logoY, scale: logoScale }} 
          className="overflow-hidden origin-top-left"
        >
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[18vw] md:text-[14vw] font-heading font-bold text-background leading-none tracking-tight"
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
              className="text-sage"
            >
              ®
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Bottom Content */}
        <motion.div 
          style={{ y: contentY }}
          className="flex-1 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 lg:gap-8 mt-auto pb-16 lg:pb-8"
        >
          {/* Left - Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-3xl md:text-4xl lg:text-5xl text-background/95 font-heading font-bold leading-tight"
            >
              The People Powered Marketplace
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-xl md:text-2xl text-sage font-heading font-medium"
            >
              Gather your Herd — Get paid with Referd.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-background/60 text-base md:text-lg max-w-xl"
            >
              Find out your market value. Turn your network into income. AI and Machine learning intelligence.
            </motion.p>

            {/* 3 Big CTA Buttons with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 mt-6 sm:mt-8 pointer-events-auto"
            >
              <MagneticButton 
                className="btn-primary text-sm sm:text-base md:text-lg px-4 sm:px-6 py-3 sm:py-4 shadow-[0_0_30px_rgba(139,164,133,0.5)] hover:shadow-[0_0_40px_rgba(139,164,133,0.7)] transition-shadow" 
                strength={0.4}
                onClick={() => navigateWithTransition("/salary-intelligence")}
              >
                Find out how much you're worth
              </MagneticButton>
              <MagneticButton
                className="px-4 sm:px-6 py-3 sm:py-4 bg-mustard text-foreground rounded-full font-semibold hover:bg-mustard/90 transition-all text-sm sm:text-base md:text-lg shadow-[0_0_30px_rgba(226,195,104,0.5)] hover:shadow-[0_0_40px_rgba(226,195,104,0.7)]"
                strength={0.4}
                onClick={() => navigateWithTransition("/opportunities")}
              >
                Refer & Earn
              </MagneticButton>
              <MagneticButton
                className="px-4 sm:px-6 py-3 sm:py-4 border-2 border-background/40 text-background rounded-full font-semibold hover:bg-background/10 transition-all text-sm sm:text-base md:text-lg shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.25)]"
                strength={0.4}
                onClick={() => navigateWithTransition("/how-it-works")}
              >
                How the marketplace works
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Credit Card Visual - Responsive for all screen sizes */}
          <motion.div
            style={{ y: cardY, rotate: cardRotate, opacity: cardOpacity }}
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.05, rotate: 0 }}
            className="w-full sm:w-72 md:w-80 lg:w-80 mt-8 lg:mt-0 pointer-events-auto cursor-pointer mx-auto lg:mx-0"
          >
            {/* Credit Card Design */}
            <div className="relative w-full aspect-[1.586/1] rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl">
              {/* Card Background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage/90 to-forest" />
              
              {/* Card Pattern Overlay */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 w-10 sm:w-16 h-10 sm:h-16 rounded-full border-2 border-foreground/20" />
                <div className="absolute top-4 sm:top-8 left-4 sm:left-8 w-8 sm:w-12 h-8 sm:h-12 rounded-full border-2 border-foreground/20" />
                <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full border border-foreground/10" />
              </div>
              
              {/* Card Content */}
              <div className="relative h-full p-4 sm:p-6 flex flex-col justify-between">
                {/* Top - Logo & Chip */}
                <div className="flex justify-between items-start">
                  <div className="text-foreground font-heading font-bold text-base sm:text-xl tracking-tight">
                    Referd<span className="text-foreground/60 text-xs sm:text-sm align-super">®</span>
                  </div>
                  {/* Card Chip */}
                  <div className="w-8 sm:w-10 h-6 sm:h-8 rounded-md bg-gradient-to-br from-mustard/80 to-mustard/50 border border-foreground/10" />
                </div>
                
                {/* Middle - Balance Label */}
                <div>
                  <p className="text-[10px] sm:text-xs uppercase tracking-[0.15em] text-foreground/60 mb-1">
                    Referral Balance
                  </p>
                  <p className="text-2xl sm:text-3xl font-heading font-bold text-foreground tracking-tight">
                    £24,000
                  </p>
                </div>
                
                {/* Bottom - Card Details */}
                <div className="flex justify-between items-end">
                  <div>
                    <p className="text-[8px] sm:text-[10px] uppercase tracking-wider text-foreground/50 mb-1">Member Since</p>
                    <p className="text-xs sm:text-sm font-medium text-foreground/80">2024</p>
                  </div>
                  <div className="flex gap-1 sm:gap-2">
                    <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-rose/80" />
                    <div className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-mustard/80 -ml-3 sm:-ml-4" />
                  </div>
                </div>
              </div>
              
              {/* Shine Effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-background/20 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
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
            className="w-px h-10 bg-gradient-to-b from-background/50 to-transparent"
            animate={{ scaleY: [1, 0.6, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>

    </section>
  );
};

export default HeroSection;
