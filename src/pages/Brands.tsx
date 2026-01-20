import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { Building2, Users, TrendingUp, Clock, Shield, Zap } from "lucide-react";
import ProfileShowcase from "@/components/animations/ProfileShowcase";

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
            {/* Hero - Carousel First */}
            <section className="relative pt-24">
              <div className="container mx-auto max-w-7xl">
                {/* Tagline above carousel */}
                <div className="text-center mb-4 px-6">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-block px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium mb-4"
                  >
                    CV 2.0 — The Future of Hiring
                  </motion.span>
                  <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                    className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-foreground leading-tight"
                  >
                    Meet Your Next
                    <span className="text-primary"> Top Performer</span>
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-lg md:text-xl text-muted-foreground mt-4 max-w-lg mx-auto"
                  >
                    Dynamic profiles with verified career timelines. No more boring CVs.
                  </motion.p>
                </div>
              </div>

              {/* Full-width Profile Showcase */}
              <ProfileShowcase />
              
              {/* CTA under showcase */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col sm:flex-row justify-center gap-4 px-6 pb-16"
              >
                <MagneticButton className="btn-primary" strength={0.4}>
                  Post a Role
                </MagneticButton>
                <MagneticButton
                  onClick={() => navigateWithTransition("/contact")}
                  className="px-8 py-4 border border-foreground/20 text-foreground rounded-full font-semibold hover:bg-foreground/5 transition-colors"
                  strength={0.4}
                >
                  Book a Demo
                </MagneticButton>
              </motion.div>
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
                      className="group p-8 bg-muted/30 rounded-2xl border border-foreground/5 hover:border-primary/30 transition-all duration-300"
                    >
                      <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                        <benefit.icon className="w-7 h-7 text-primary" />
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
            <section className="py-24 px-6 bg-gradient-to-b from-primary/5 to-background">
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
