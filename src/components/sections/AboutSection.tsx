import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Compressed Headline - Noora Style */}
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-24"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
            About Us
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-[1.05] text-foreground">
            <span className="block">Wehelpcompanies</span>
            <span className="block">findexceptionaltalent</span>
            <span className="block text-muted-foreground/40">throughthepeoplewhoknowthem.</span>
          </h2>
        </motion.div>

        {/* Bento Grid - Mixed Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2 bg-foreground text-background p-10 rounded-3xl"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-background/50 mb-4">Paid Out</p>
                <p className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold">£427,000+</p>
              </div>
              <div className="flex gap-12">
                <div>
                  <p className="text-fluid-3xl font-heading font-bold">4,293</p>
                  <p className="text-sm text-background/50">People earning</p>
                </div>
                <div>
                  <p className="text-fluid-3xl font-heading font-bold">892</p>
                  <p className="text-sm text-background/50">Companies</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-sage/20 p-8 rounded-3xl flex flex-col justify-between min-h-[200px]"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Average Time</p>
            <div>
              <p className="text-fluid-4xl font-heading font-bold text-foreground">24-48h</p>
              <p className="text-sm text-muted-foreground">First candidate review</p>
            </div>
          </motion.div>

          {/* Process Card 1 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-gray-50 hover:bg-sage/10 p-8 rounded-3xl transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">01</span>
              <motion.div 
                className="w-12 h-12 rounded-full bg-sage flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl text-foreground">→</span>
              </motion.div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
              Refer Talent
            </h3>
            <p className="text-muted-foreground">
              Know someone perfect for a role? Share the opportunity.
            </p>
          </motion.div>

          {/* Process Card 2 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-gray-50 hover:bg-sage/10 p-8 rounded-3xl transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">02</span>
              <motion.div 
                className="w-12 h-12 rounded-full bg-sage flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl text-foreground">→</span>
              </motion.div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
              Track Progress
            </h3>
            <p className="text-muted-foreground">
              Follow your referrals through every stage of the process.
            </p>
          </motion.div>

          {/* Process Card 3 */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="group bg-gray-50 hover:bg-sage/10 p-8 rounded-3xl transition-colors duration-500"
          >
            <div className="flex items-start justify-between mb-16">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">03</span>
              <motion.div 
                className="w-12 h-12 rounded-full bg-sage flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 45 }}
                transition={{ duration: 0.3 }}
              >
                <span className="text-xl text-foreground">→</span>
              </motion.div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-3">
              Get Paid
            </h3>
            <p className="text-muted-foreground">
              Receive your bonus quickly when your candidate is hired.
            </p>
          </motion.div>
        </div>

        {/* Description with Parallax Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 mt-32">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Traditional recruiting is broken. Job boards are noisy, agencies are expensive, 
              and the best candidates are often hidden in your network. We're changing that 
              by rewarding the people who make great hires happen.
            </p>
          </motion.div>
          
          <motion.div
            style={{ y }}
            className="lg:col-span-5"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="bg-foreground text-background p-8 rounded-3xl"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-background/50 mb-6">The Split</p>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg">Referrer</span>
                  <span className="text-3xl font-heading font-bold text-sage">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Talent</span>
                  <span className="text-3xl font-heading font-bold text-sage">35%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-lg">Platform</span>
                  <span className="text-3xl font-heading font-bold text-background/50">30%</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
