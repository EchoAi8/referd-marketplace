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
        {/* Large Statement with Sticky Feel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-8"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8">
              About Us
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-semibold leading-[1.15] text-foreground">
              We believe the best talent comes from trusted connections. That's why we're building 
              a platform where your network becomes your greatest asset.
            </h2>
          </motion.div>
          
          <motion.div
            style={{ y }}
            className="lg:col-span-4 flex items-center"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="bg-gray-50 p-8 rounded-2xl w-full"
            >
              <p className="text-lg text-foreground/80 leading-relaxed">
                Referd connects companies with pre-vetted talent through trusted referrals, 
                rewarding everyone involved in making great hires happen.
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Services/Features Grid - Bento Style */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-24"
        >
          {/* Card 1 */}
          <div className="group bg-gray-50 hover:bg-sage/20 p-8 rounded-2xl transition-colors duration-300">
            <div className="flex items-start justify-between mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">01</span>
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                <span className="text-lg">→</span>
              </div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Refer Talent
            </h3>
            <p className="text-muted-foreground">
              Know someone perfect for a role? Refer them and earn when they get hired.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group bg-gray-50 hover:bg-sage/20 p-8 rounded-2xl transition-colors duration-300">
            <div className="flex items-start justify-between mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">02</span>
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                <span className="text-lg">→</span>
              </div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Track Progress
            </h3>
            <p className="text-muted-foreground">
              Follow your referrals through the hiring process with full transparency.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group bg-gray-50 hover:bg-sage/20 p-8 rounded-2xl transition-colors duration-300">
            <div className="flex items-start justify-between mb-12">
              <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">03</span>
              <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center">
                <span className="text-lg">→</span>
              </div>
            </div>
            <h3 className="text-2xl font-heading font-semibold text-foreground mb-4">
              Get Paid
            </h3>
            <p className="text-muted-foreground">
              Receive your referral bonus quickly and directly when your candidate is hired.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
