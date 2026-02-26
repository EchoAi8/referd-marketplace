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
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.6], [1, 0.92]);
  const canvasY = useTransform(smoothProgress, [0, 1], [0, 200]);
  const logoY = useTransform(smoothProgress, [0, 0.5], [0, -60]);
  const logoScale = useTransform(smoothProgress, [0, 0.5], [1, 0.88]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={containerRef} className="relative h-screen bg-foreground overflow-hidden">
      {/* Network Canvas + Profile Grid backdrop */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale, y: canvasY }} 
        className="absolute inset-0 pointer-events-auto"
      >
        <HeroProfileGridBackdrop className="opacity-70" />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <InteractiveNetworkCanvas />
        </motion.div>
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-transparent to-foreground/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/20 via-transparent to-foreground/20 pointer-events-none" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 pointer-events-none">
        {/* Logo */}
        <motion.div style={{ y: logoY, scale: logoScale }} className="origin-bottom-left mb-6">
          <motion.h1
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold text-background leading-[0.85] tracking-tighter"
          >
            {"Referd".split("").map((char, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 + i * 0.04, ease: [0.16, 1, 0.3, 1] }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-sage text-[0.35em] align-super ml-1"
            >
              ®
            </motion.span>
          </motion.h1>
        </motion.div>

        {/* Tagline + CTAs */}
        <motion.div style={{ y: contentY }} className="max-w-3xl">
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl text-background/90 font-heading font-semibold leading-tight"
          >
            Your network is worth more than any agency.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="mt-3 text-background/50 text-base sm:text-lg max-w-xl"
          >
            Refer. Get hired. Get paid. The 35/35/30 split that kills agencies.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row gap-3 mt-6 pointer-events-auto"
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
              Refer & Earn
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

      {/* No bottom gradient - seamless dark-to-dark flow into ShockingStats */}
    </section>
  );
};

export default HeroSection;
