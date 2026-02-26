import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import DirectionalButton from "@/components/ui/DirectionalButton";
import heroClip from "@/assets/referd-hero-clip.mp4";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    stiffness: 90,
    damping: 28,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.6], [1, 1.05]);
  const contentY = useTransform(smoothProgress, [0, 0.5], [0, 80]);

  return (
    <section ref={containerRef} className="relative h-screen bg-foreground overflow-hidden">
      {/* Video background */}
      <motion.div
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="absolute inset-0"
      >
        <video
          src={heroClip}
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        />
        {/* Dark overlays for text readability */}
        <div className="absolute inset-0 bg-foreground/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/20 to-foreground/40" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-12 pointer-events-none">
        <motion.div style={{ y: contentY }}>
          <motion.h1
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[14vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold text-background leading-[0.85] tracking-tighter mb-6"
          >
            Referd
            <span className="text-sage text-[0.35em] align-super ml-1">®</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-2xl sm:text-3xl md:text-4xl text-background/90 font-heading font-semibold leading-tight max-w-3xl"
          >
            Your network is worth more than any agency.
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65 }}
            className="mt-3 text-background/50 text-base sm:text-lg max-w-xl"
          >
            Refer. Get hired. Get paid. The 35/35/30 split that kills agencies.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 mt-6 pointer-events-auto"
          >
            <DirectionalButton theme="talent" size="lg" onClick={() => navigateWithTransition("/career-intelligence")}>
              Know Your Worth
            </DirectionalButton>
            <DirectionalButton theme="referrer" size="lg" onClick={() => navigateWithTransition("/opportunities")}>
              Refer & Earn
            </DirectionalButton>
            <DirectionalButton theme="brand" size="lg" onClick={() => navigateWithTransition("/brands")}>
              Hire Smarter
            </DirectionalButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
