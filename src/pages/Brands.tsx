import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { Building2, Users, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import InfiniteProfileCanvas from "@/components/animations/InfiniteProfileCanvas";

const benefits = [
  {
    icon: Users,
    title: "Quality Candidates",
    description: "Pre-vetted talent from trusted referrers who stake their reputation."
  },
  {
    icon: TrendingUp,
    title: "Higher Retention",
    description: "Referred hires stay 2x longer and perform better from day one."
  },
  {
    icon: Clock,
    title: "Faster Hiring",
    description: "Cut time-to-hire by 50% with warm introductions from your network."
  },
  {
    icon: Shield,
    title: "Risk-Free",
    description: "Pay only when a referral leads to a successful hire. No upfront costs."
  },
  {
    icon: Building2,
    title: "Employer Branding",
    description: "Strengthen your employer brand through authentic word-of-mouth."
  },
  {
    icon: Zap,
    title: "Instant Access",
    description: "Tap into a network of 10,000+ active referrers across industries."
  }
];

const Brands = () => {
  const { navigateWithTransition } = useGridNavigation();

  return (
    <>
      <GridOverlay />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main>
            {/* Hero Section with Infinite Profile Canvas */}
            <section className="relative pt-32 pb-20 px-6 bg-foreground min-h-[90vh] overflow-hidden">
              {/* Infinite Profile Canvas Background */}
              <InfiniteProfileCanvas />
              
              <div className="container mx-auto max-w-5xl relative z-10">
                <div className="flex flex-col items-center text-center">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-1.5 bg-mustard/20 text-mustard rounded-full text-sm font-medium mb-6"
                  >
                    For Brands & Employers
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-5xl md:text-7xl font-heading font-bold text-background leading-tight mb-6"
                  >
                    Hire Better.
                    <br />
                    <span className="text-sage">Pay Less.</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-xl text-background/70 mb-8 max-w-lg"
                  >
                    Access pre-vetted talent through trusted referrals. Only pay when you make a successful hire.
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="flex flex-col sm:flex-row gap-4"
                  >
                    <MagneticButton className="btn-primary" strength={0.4}>
                      Post a Role
                    </MagneticButton>
                    <MagneticButton
                      onClick={() => navigateWithTransition("/contact")}
                      className="px-8 py-4 border border-background/30 text-background rounded-full font-semibold hover:bg-white/10 transition-colors"
                      strength={0.4}
                    >
                      Book a Demo
                    </MagneticButton>
                  </motion.div>
                </div>
              </div>
            </section>

            {/* Benefits Grid */}
            <section className="py-24 px-6">
              <div className="container mx-auto max-w-6xl">
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-center mb-16"
                >
                  <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                    Why Brands Choose Referd
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Traditional recruiting is broken. Here's how we fix it.
                  </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      className="group p-8 bg-muted/30 rounded-2xl border border-foreground/5 hover:border-sage/30 transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-sage/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-sage/20 transition-colors">
                        <benefit.icon className="w-7 h-7 text-sage" />
                      </div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                        {benefit.title}
                      </h3>
                      <p className="text-muted-foreground">
                        {benefit.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 px-6 bg-gradient-to-b from-sage/5 to-background">
              <div className="container mx-auto max-w-4xl text-center">
                <motion.h2
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                  className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-6"
                >
                  Ready to Transform Your Hiring?
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  className="text-lg text-muted-foreground mb-10"
                >
                  Join 500+ companies hiring smarter with Referd.
                </motion.p>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                >
                  <MagneticButton className="btn-primary text-lg" strength={0.4}>
                    Get Started Today
                  </MagneticButton>
                </motion.div>
              </div>
            </section>
          </main>
          <SiteFooter />
        </div>
      </PageTransition>
    </>
  );
};

export default Brands;
