import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import FloatingOrbs from "@/components/animations/FloatingOrbs";
import { ParallaxLayer } from "@/components/animations/ParallaxLayers";

const HeroSection = () => {
  return (
    <section className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center px-6 py-20">
      <ParallaxLayer intensity={18} className="absolute inset-0">
        <FloatingOrbs />
      </ParallaxLayer>

      {/* Decorative background shapes */}
      <ParallaxLayer intensity={10} className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-sage/10 blur-2xl" />
        <div className="absolute bottom-40 right-20 w-48 h-48 rounded-full bg-mustard/10 blur-2xl" />
      </ParallaxLayer>

      {/* Main content */}
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Logo */}
        <ParallaxLayer intensity={-6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <h1 className="font-heading font-extrabold text-6xl md:text-8xl text-forest tracking-tight">
              REFERD
            </h1>
          </motion.div>
        </ParallaxLayer>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="font-heading text-xl md:text-2xl text-muted-foreground mb-4"
        >
          People-powered recruitment
        </motion.p>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="font-heading text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto"
        >
          The marketplace that pays you for your network. Know your worth, earn from referrals, and help brands save 60% on hiring.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
        >
          <Button variant="mustard" size="cta" className="text-lg px-10">
            Check My Worth
          </Button>
          <Button 
            variant="outline" 
            size="cta" 
            className="text-lg px-10 border-2 border-forest text-forest hover:bg-forest hover:text-white"
          >
            Start Earning
          </Button>
        </motion.div>

        {/* Social Proof */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="flex flex-wrap justify-center gap-8 text-center"
        >
          <div>
            <div className="font-heading font-bold text-2xl text-forest">£427K+</div>
            <div className="text-sm text-muted-foreground">Paid out</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-sage">4,293</div>
            <div className="text-sm text-muted-foreground">People earning</div>
          </div>
          <div>
            <div className="font-heading font-bold text-2xl text-mustard">856</div>
            <div className="text-sm text-muted-foreground">Hires made</div>
          </div>
        </motion.div>

        {/* Model Split Card */}
        <ParallaxLayer intensity={6}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-16 p-8 bg-card/80 backdrop-blur-sm rounded-2xl max-w-xl mx-auto border border-border/50"
          >
            <h3 className="font-heading font-semibold text-lg text-foreground mb-4">
              The Fair Split
            </h3>
            <div className="flex justify-center gap-8">
              <div className="text-center">
                <div className="font-heading font-bold text-xl text-sage">35%</div>
                <div className="text-sm text-muted-foreground">Referrer</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-xl text-mustard">35%</div>
                <div className="text-sm text-muted-foreground">Talent</div>
              </div>
              <div className="text-center">
                <div className="font-heading font-bold text-xl text-forest">30%</div>
                <div className="text-sm text-muted-foreground">Platform</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Everyone wins</p>
          </motion.div>
        </ParallaxLayer>
      </div>
    </section>
  );
};

export default HeroSection;
