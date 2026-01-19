import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 md:py-48 bg-background">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl"
        >
          {/* Section Label */}
          <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground mb-8">
            About Us
          </p>

          {/* Large Statement */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-medium leading-tight text-foreground">
            We believe talent knows talent. That's why we've built a platform 
            where your network becomes your income stream.
          </h2>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-12 mt-24"
        >
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">Our Mission</p>
            <p className="text-lg text-foreground/80">
              Democratize recruiting by rewarding the people who make great hires happen.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">Our Approach</p>
            <p className="text-lg text-foreground/80">
              A transparent 35/35/30 split that ensures everyone wins — referrers, talent, and companies.
            </p>
          </div>
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground uppercase tracking-wide mb-4">Our Promise</p>
            <p className="text-lg text-foreground/80">
              Fast payouts, full transparency, and a community that grows together.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
