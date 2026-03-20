import { motion, useTransform, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import HeroProfileGridBackdrop from "@/components/sections/hero/HeroProfileGridBackdrop";
import DirectionalButton from "@/components/ui/DirectionalButton";
import PlatinumCard from "@/components/sections/hero/PlatinumCard";
import HeroScrollIndicator from "@/components/sections/hero/HeroScrollIndicator";
import HeroTagline from "@/components/sections/hero/HeroTagline";

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();
  const [showContent, setShowContent] = useState(false);

  const { smoothProgress } = useSmoothScroll({
    target: containerRef,
    offset: ["start start", "end start"],
    stiffness: 90,
    damping: 28,
  });

  // Parallax layers
  const heroOpacity = useTransform(smoothProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(smoothProgress, [0, 0.7], [1, 0.92]);
  const profileGridY = useTransform(smoothProgress, [0, 1], [0, 120]);
  const profileGridScale = useTransform(smoothProgress, [0, 0.5], [1, 1.08]);
  const logoY = useTransform(smoothProgress, [0, 0.4], [0, -120]);
  const logoScale = useTransform(smoothProgress, [0, 0.4], [1, 0.85]);
  const contentY = useTransform(smoothProgress, [0, 0.4], [0, 100]);
  const cardY = useTransform(smoothProgress, [0, 0.5], [0, -60]);
  const cardRotate = useTransform(smoothProgress, [0, 0.4], [0, -4]);
  const vignetteOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0.5]);

  // Mouse parallax for depth
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  useEffect(() => {
    const handleMouse = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      mouseX.set((e.clientX - cx) / cx * 12);
      mouseY.set((e.clientY - cy) / cy * 8);
    };
    window.addEventListener("mousemove", handleMouse);
    // Stagger content reveal
    const timer = setTimeout(() => setShowContent(true), 200);
    return () => {
      window.removeEventListener("mousemove", handleMouse);
      clearTimeout(timer);
    };
  }, [mouseX, mouseY]);

  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section ref={containerRef} className="relative h-screen bg-foreground overflow-hidden">
      {/* Layer 0: Profile Grid — cinematic backdrop */}
      <motion.div
        style={{ y: profileGridY, scale: profileGridScale, opacity: heroOpacity, x: springX, }}
        className="absolute inset-0 pointer-events-none"
      >
        <HeroProfileGridBackdrop className="opacity-50" />
      </motion.div>

      {/* Stakeholder orbs — ambient depth */}
      <motion.div style={{ x: springX, y: springY }} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[12%] left-[5%] w-80 h-80 rounded-full opacity-[0.1]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-talent)), transparent 70%)" }}
        />
        <div className="absolute bottom-[15%] right-[8%] w-[28rem] h-[28rem] rounded-full opacity-[0.07]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-referrer)), transparent 70%)" }}
        />
        <div className="absolute top-[55%] left-[45%] w-56 h-56 rounded-full opacity-[0.06]"
          style={{ background: "radial-gradient(circle, hsl(var(--color-brand)), transparent 70%)" }}
        />
      </motion.div>

      {/* Cinematic vignette */}
      <motion.div style={{ opacity: vignetteOpacity }} className="absolute inset-0 pointer-events-none z-[6]">
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/70 via-foreground/25 to-foreground/95" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/40 via-transparent to-foreground/40" />
        {/* Top film grain texture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.5'/%3E%3C/svg%3E\")" }}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 h-full pointer-events-none">
        <AnimatePresence>
          {showContent && (
            <>
              {/* Left: Title + tagline + CTAs — anchored to lower-left */}
              <div className="absolute left-6 right-6 sm:left-8 sm:right-8 md:left-12 md:right-12 lg:left-16 lg:right-auto bottom-12 sm:bottom-16 md:bottom-20 lg:bottom-24 max-w-3xl">
                {/* Wordmark */}
                <motion.div style={{ y: logoY, scale: logoScale }} className="origin-bottom-left mb-3">
                  <motion.h1
                    initial={{ opacity: 0, y: 80, filter: "blur(12px)" }}
                    animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                    transition={{ duration: 1.2, delay: 0, ease }}
                    className="text-[18vw] sm:text-[14vw] md:text-[11vw] lg:text-[9vw] font-heading font-black text-background leading-[0.85] tracking-[-0.04em]"
                    style={{ textShadow: "0 0 100px rgba(255,255,255,0.25), 0 4px 40px rgba(0,0,0,0.4)" }}
                  >
                    Refer'd
                  </motion.h1>
                </motion.div>

                {/* Tagline — punchy, minimal */}
                <motion.div style={{ y: contentY }} className="max-w-2xl">
                  <HeroTagline />

                  {/* CTAs */}
                  <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.4, ease }}
                    className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-8 sm:mt-10 pointer-events-auto"
                  >
                    <DirectionalButton theme="talent" size="xl" onClick={() => navigateWithTransition("/career-intelligence")}>
                      I'm Talent
                    </DirectionalButton>
                    <DirectionalButton theme="referrer" size="xl" onClick={() => navigateWithTransition("/opportunities")}>
                      I'm a Referrer
                    </DirectionalButton>
                    <DirectionalButton theme="brand" size="xl" onClick={() => navigateWithTransition("/brands")}>
                      I'm a Brand
                    </DirectionalButton>
                  </motion.div>
                </motion.div>
              </div>

              {/* Right: Platinum Card — floating */}
              <motion.div
                style={{ y: cardY, rotate: cardRotate }}
                className="absolute top-24 sm:top-28 md:top-32 lg:top-28 right-4 sm:right-6 md:right-10 lg:right-16 pointer-events-none hidden sm:block"
              >
                <motion.div
                  initial={{ opacity: 0, y: 80, rotateY: -20, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, rotateY: 0, scale: 1 }}
                  transition={{ duration: 1.2, delay: 1.0, ease }}
                >
                  <PlatinumCard />
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <HeroScrollIndicator />
      </div>

      {/* Bottom gradient bleed into next section */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-foreground via-foreground/80 to-transparent pointer-events-none z-20" />
    </section>
  );
};

export default HeroSection;
