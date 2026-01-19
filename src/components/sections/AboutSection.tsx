import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WordReveal from "@/components/animations/WordReveal";
import TiltCard from "@/components/animations/TiltCard";

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <section ref={containerRef} className="py-32 md:py-48 bg-background overflow-hidden">
      <div className="container mx-auto px-6">
        {/* Word-by-Word Reveal Headline */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-24"
        >
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-8"
          >
            About Us
          </motion.p>
          
          <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-[1.1] text-foreground">
            <WordReveal text="We help companies find exceptional talent" />
            <span className="block mt-2">
              <WordReveal text="through the people who know them." className="text-muted-foreground/40" />
            </span>
          </h2>
        </motion.div>

        {/* Bento Grid - Mixed Sizes with refined animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Large Card - Stats */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-2"
          >
            <TiltCard intensity={8} glare={true} className="bg-foreground text-background p-10 rounded-3xl h-full">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
              <div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 0.3 }}
                  className="text-xs uppercase tracking-[0.2em] text-background/50 mb-4"
                >
                  Paid Out
                </motion.p>
                <motion.p 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold"
                >
                  £427,000+
                </motion.p>
              </div>
              <div className="flex gap-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.5 }}
                >
                  <p className="text-fluid-3xl font-heading font-bold">4,293</p>
                  <p className="text-sm text-background/50">People earning</p>
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.6 }}
                >
                  <p className="text-fluid-3xl font-heading font-bold">892</p>
                  <p className="text-sm text-background/50">Companies</p>
                </motion.div>
              </div>
            </div>
            </TiltCard>
          </motion.div>

          {/* Time Card */}
          <motion.div
            initial={{ opacity: 0, y: 80, scale: 0.95 }}
            animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <TiltCard intensity={10} glare={true} className="bg-sage/20 p-8 rounded-3xl flex flex-col justify-between min-h-[200px] h-full">
              <p className="text-xs uppercase tracking-[0.2em] text-foreground/50">Average Time</p>
              <div>
                <p className="text-fluid-4xl font-heading font-bold text-foreground">24-48h</p>
                <p className="text-sm text-muted-foreground">First candidate review</p>
              </div>
            </TiltCard>
          </motion.div>

          {/* Process Cards with staggered animation */}
          {[
            { num: "01", title: "Refer Talent", desc: "Know someone perfect for a role? Share the opportunity." },
            { num: "02", title: "Track Progress", desc: "Follow your referrals through every stage of the process." },
            { num: "03", title: "Get Paid", desc: "Receive your bonus quickly when your candidate is hired." },
          ].map((card, index) => (
            <motion.div
              key={card.num}
              initial={{ opacity: 0, y: 80, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ 
                duration: 1, 
                delay: 0.3 + (index * 0.1), 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <TiltCard 
                intensity={12} 
                glare={true} 
                className="group bg-gray-50 hover:bg-sage/10 p-8 rounded-3xl transition-colors duration-500 cursor-pointer h-full"
              >
                <div className="flex items-start justify-between mb-16">
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{card.num}</span>
                  <motion.div 
                    className="w-12 h-12 rounded-full bg-sage flex items-center justify-center"
                    whileHover={{ scale: 1.15, rotate: 90 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  >
                    <span className="text-xl text-foreground">→</span>
                  </motion.div>
                </div>
                <h3 className="text-2xl font-heading font-semibold text-foreground mb-3 group-hover:text-sage-dark transition-colors duration-300">
                  {card.title}
                </h3>
                <p className="text-muted-foreground">
                  {card.desc}
                </p>
              </TiltCard>
            </motion.div>
          ))}
        </div>

        {/* Description with Parallax Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mt-32 items-start">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed">
              Traditional recruiting is broken. Job boards are noisy, agencies are expensive, 
              and the best candidates are often hidden in your network. We're changing that 
              by rewarding the people who make great hires happen.
            </p>
          </motion.div>
          
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 60, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <TiltCard intensity={8} glare={true} className="bg-foreground text-background p-8 rounded-3xl shadow-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-background/50 mb-6">The Split</p>
                <div className="space-y-4">
                  {[
                    { label: "Referrer", value: "35%", highlight: true },
                    { label: "Talent", value: "35%", highlight: true },
                    { label: "Platform", value: "30%", highlight: false },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + (index * 0.1) }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg">{item.label}</span>
                      <span className={`text-3xl font-heading font-bold ${item.highlight ? "text-sage" : "text-background/50"}`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
