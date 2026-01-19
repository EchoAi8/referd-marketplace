import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ParallaxImage from "@/components/ParallaxImage";
import MagneticButton from "@/components/animations/MagneticButton";
const HeroSection = () => {
  const containerRef = useRef(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 100]);
  const cardY = useTransform(scrollYProgress, [0, 0.5], [0, -50]);
  const cardRotate = useTransform(scrollYProgress, [0, 0.5], [3, -5]);

  return (
    <section ref={containerRef} className="relative min-h-screen bg-foreground overflow-hidden">
      {/* Full-bleed Hero Image with Parallax */}
      <motion.div 
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="absolute inset-0"
      >
        <motion.div
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <ParallaxImage
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=90"
            alt="Modern workspace"
            intensity={30}
            className="w-full h-full opacity-50"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/30 via-foreground/10 to-foreground" />
      </motion.div>

      {/* Large Logo Overlay */}
      <div className="relative z-10 h-screen flex flex-col justify-between p-6 md:p-12">
        {/* Top - Logo with character animation */}
        <motion.div
          style={{ y: textY }}
          className="overflow-hidden"
        >
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
                  delay: 0.1 + (i * 0.05), 
                  ease: [0.16, 1, 0.3, 1] 
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
              <MagneticButton
                className="btn-primary"
                strength={0.4}
              >
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

          {/* Right - Floating Project Card */}
          <motion.div
            style={{ y: cardY, rotate: cardRotate }}
            initial={{ opacity: 0, y: 100, rotate: 5 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 1.2, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.03, rotate: 0 }}
            className="hidden lg:block w-80 bg-background rounded-2xl overflow-hidden shadow-2xl cursor-pointer"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=90"
                alt="Team collaboration"
                intensity={15}
                className="w-full h-full"
              />
            </div>
            <div className="p-5">
              <p className="text-xs uppercase tracking-[0.15em] text-muted-foreground mb-1">Latest Success</p>
              <p className="font-heading font-semibold text-foreground">Tech Talent Network</p>
              <p className="text-sm text-muted-foreground mt-1">£15,000 paid out this month</p>
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
