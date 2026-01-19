import { motion, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import MagneticButton from "@/components/animations/MagneticButton";
import NetworkDiagram from "@/components/animations/NetworkDiagram";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    stiffness: 90,
    damping: 28,
  });

  const heroOpacity = useTransform(smoothProgress, [0, 0.55], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.55], [1, 0.96]);
  const textY = useTransform(smoothProgress, [0, 0.55], [0, 90]);
  const cardY = useTransform(smoothProgress, [0, 0.55], [0, -45]);
  const cardRotate = useTransform(smoothProgress, [0, 0.55], [3, -4]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-foreground overflow-hidden">
      {/* Interactive Network Diagram Background */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }} 
        className="absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <NetworkDiagram />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/20 via-transparent to-foreground/80 pointer-events-none" />
      </motion.div>

      {/* Large Logo Overlay */}
      <div className="relative z-10 h-screen flex flex-col justify-between p-6 md:p-12">
        {/* Top - Logo with character animation */}
        <motion.div style={{ y: textY }} className="overflow-hidden">
          <motion.h1
            initial={{ y: 120 }}
            animate={{ y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] md:text-[12vw] font-heading font-bold text-background leading-none tracking-tight"
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
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left - Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-2xl md:text-3xl text-background/90 font-heading font-medium leading-relaxed"
            >
              Great hires begin here.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="mt-4 text-background/60 text-lg"
            >
              Turn your network into income. Get paid for every successful referral.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 mt-8"
            >
              <MagneticButton className="btn-primary" strength={0.4}>
                Start Earning
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border border-background/30 text-background rounded-full font-semibold hover:bg-white/10 transition-colors"
                strength={0.4}
              >
                See How It Works
              </MagneticButton>
            </motion.div>
          </motion.div>

          {/* Right - Stats Card */}
          <motion.div
            style={{ y: cardY, rotate: cardRotate }}
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="hidden lg:block w-72 bg-background/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-2xl cursor-pointer border border-foreground/5"
          >
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-4">
                Network Stats
              </p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Connections</span>
                  <span className="font-heading font-bold text-sage">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Referrals</span>
                  <span className="font-heading font-bold text-mustard">156</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Earnings</span>
                  <span className="font-heading font-bold text-rose">£15,420</span>
                </div>
                <div className="h-px bg-foreground/10 my-2" />
                <p className="text-xs text-muted-foreground">
                  Your network is growing. Keep referring!
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
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
