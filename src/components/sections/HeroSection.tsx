import { motion } from "framer-motion";
import ParallaxImage from "@/components/ParallaxImage";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-foreground overflow-hidden">
      {/* Full-bleed Hero Image */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
          className="w-full h-full"
        >
          <img
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&auto=format&fit=crop&q=90"
            alt="Modern workspace"
            className="w-full h-full object-cover opacity-60"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-foreground/40 via-foreground/20 to-foreground" />
      </div>

      {/* Large Logo Overlay */}
      <div className="relative z-10 h-screen flex flex-col justify-between p-6 md:p-12">
        {/* Top - Logo */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] md:text-[12vw] font-heading font-bold text-background leading-none tracking-tight">
            Referd<span className="text-sage">®</span>
          </h1>
        </motion.div>

        {/* Bottom Content */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          {/* Left - Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-xl"
          >
            <p className="text-2xl md:text-3xl text-background/90 font-heading font-medium leading-relaxed">
              Great hires begin here.
            </p>
            <p className="mt-4 text-background/60 text-lg">
              Turn your network into income. Get paid for every successful referral.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="btn-primary"
              >
                Start Earning
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-4 border border-background/30 text-background rounded-full font-semibold hover:bg-background/10 transition-colors"
              >
                See How It Works
              </motion.button>
            </div>
          </motion.div>

          {/* Right - Floating Project Card */}
          <motion.div
            initial={{ opacity: 0, y: 60, rotate: 3 }}
            animate={{ opacity: 1, y: 0, rotate: 3 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="hidden lg:block w-80 bg-background rounded-2xl overflow-hidden shadow-2xl"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <ParallaxImage
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=90"
                alt="Team collaboration"
                intensity={10}
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
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="text-xs uppercase tracking-[0.2em] text-background/50">Scroll</span>
          <div className="w-px h-8 bg-background/30" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
