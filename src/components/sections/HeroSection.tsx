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
      <div className="relative z-10 min-h-screen flex flex-col pt-20 sm:pt-24 md:pt-28 pb-6 sm:pb-8 px-4 sm:px-6 md:px-12 pointer-events-none">
        {/* Top - Logo with character animation and parallax */}
        <motion.div 
          style={{ y: logoY, scale: logoScale }} 
          className="overflow-hidden origin-top-left"
        >
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[16vw] sm:text-[14vw] md:text-[12vw] lg:text-[10vw] font-heading font-bold text-background leading-none tracking-tight"
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

        {/* Bottom Content - Text on Left */}
        <motion.div 
          style={{ y: contentY }}
          className="flex-1 flex flex-col justify-end mt-auto pb-24 sm:pb-20 md:pb-12"
        >
          {/* Tagline & CTAs */}
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
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-background/95 font-heading font-bold leading-tight"
            >
              The People Powered Marketplace
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-lg sm:text-xl md:text-2xl text-sage font-heading font-medium"
            >
              Gather your Herd — Get paid with Referd.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 text-background/60 text-sm sm:text-base md:text-lg max-w-xl"
            >
              Find out your market value. Turn your network into income. AI and Machine learning intelligence.
            </motion.p>

            {/* CTA Buttons with Glow */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row flex-wrap gap-3 mt-6 pointer-events-auto"
            >
              <MagneticButton 
                className="btn-primary text-sm sm:text-base px-5 py-3 shadow-[0_0_25px_rgba(139,164,133,0.6)] hover:shadow-[0_0_35px_rgba(139,164,133,0.8)] transition-shadow" 
                strength={0.4}
                onClick={() => navigateWithTransition("/salary-intelligence")}
              >
                Find out how much you're worth
              </MagneticButton>
              <MagneticButton
                className="px-5 py-3 bg-mustard text-foreground rounded-full font-semibold hover:bg-mustard/90 transition-all text-sm sm:text-base shadow-[0_0_25px_rgba(226,195,104,0.6)] hover:shadow-[0_0_35px_rgba(226,195,104,0.8)]"
                strength={0.4}
                onClick={() => navigateWithTransition("/opportunities")}
              >
                Refer & Earn
              </MagneticButton>
              <MagneticButton
                className="px-5 py-3 border-2 border-background/40 text-background rounded-full font-semibold hover:bg-background/10 transition-all text-sm sm:text-base shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]"
                strength={0.4}
                onClick={() => navigateWithTransition("/how-it-works")}
              >
                How the marketplace works
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Credit Card - Fixed to bottom right corner, hidden on very small screens */}
        <motion.div
          style={{ y: cardY, rotate: cardRotate, opacity: cardOpacity }}
          initial={{ opacity: 0, y: 50, rotate: 5 }}
          animate={{ opacity: 1, y: 0, rotate: 3 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.05, rotate: 0 }}
          className="hidden sm:block absolute bottom-24 sm:bottom-8 right-4 sm:right-6 md:bottom-12 md:right-8 lg:right-12 w-44 sm:w-48 md:w-56 lg:w-60 pointer-events-auto cursor-pointer z-20"
        >
          {/* Credit Card Design - Compact */}
          <div className="relative w-full aspect-[1.586/1] rounded-xl overflow-hidden shadow-2xl">
            {/* Card Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-sage via-sage/90 to-forest" />
            
            {/* Card Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-2 left-2 w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-foreground/20" />
              <div className="absolute top-3 left-3 w-4 h-4 sm:w-6 sm:h-6 rounded-full border-2 border-foreground/20" />
              <div className="absolute bottom-3 right-3 w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-foreground/10" />
            </div>
            
            {/* Card Content */}
            <div className="relative h-full p-2.5 sm:p-3 md:p-4 flex flex-col justify-between">
              {/* Top */}
              <div className="flex justify-between items-start">
                <div className="text-foreground font-heading font-bold text-xs sm:text-sm md:text-base tracking-tight">
                  Referd<span className="text-foreground/60 text-[8px] sm:text-[10px] align-super">®</span>
                </div>
                <div className="w-5 h-4 sm:w-6 sm:h-5 md:w-7 md:h-5 rounded bg-gradient-to-br from-mustard/80 to-mustard/50 border border-foreground/10" />
              </div>
              
              {/* Balance */}
              <div>
                <p className="text-[7px] sm:text-[8px] md:text-[10px] uppercase tracking-widest text-foreground/60">
                  Referral Balance
                </p>
                <p className="text-base sm:text-lg md:text-xl font-heading font-bold text-foreground tracking-tight">
                  £24,000
                </p>
              </div>
              
              {/* Bottom */}
              <div className="flex justify-between items-end">
                <div>
                  <p className="text-[5px] sm:text-[6px] md:text-[8px] uppercase tracking-wider text-foreground/50">Since</p>
                  <p className="text-[9px] sm:text-[10px] md:text-xs font-medium text-foreground/80">2024</p>
                </div>
                <div className="flex">
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-rose/80" />
                  <div className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 rounded-full bg-mustard/80 -ml-1.5 sm:-ml-2" />
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
