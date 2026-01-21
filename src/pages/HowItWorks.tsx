import PageLayout from "@/components/layout/PageLayout";
import StickyHowItWorks from "@/components/sections/StickyHowItWorks";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

const HowItWorks = () => {
  const { navigateWithTransition } = useGridNavigation();

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-sage/10 text-sage rounded-full text-sm font-medium mb-6"
          >
            The Process
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl font-heading font-bold text-foreground leading-tight mb-6"
          >
            How Referd Works
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto"
          >
            Turn your professional network into a revenue stream. Three simple steps to start earning from referrals.
          </motion.p>
        </div>
      </section>

      {/* Sticky How It Works */}
      <StickyHowItWorks />

      {/* CTA Section */}
      <section className="py-24 px-6 bg-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold text-background mb-6"
          >
            Ready to Start Earning?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-background/60 mb-10"
          >
            Join thousands of professionals already earning from their network.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton className="btn-primary" strength={0.4}>
              Get Started Free
            </MagneticButton>
            <MagneticButton
              onClick={() => navigateWithTransition("/contact")}
              className="px-8 py-4 border border-background/30 text-background rounded-full font-semibold hover:bg-white/10 transition-colors"
              strength={0.4}
            >
              Talk to Us
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default HowItWorks;
