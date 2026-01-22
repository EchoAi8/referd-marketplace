import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import WordReveal from "@/components/animations/WordReveal";
import TiltCard from "@/components/animations/TiltCard";
import { Sparkles, Handshake, Briefcase, TrendingUp, Users, Clock } from "lucide-react";

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Stats with research backing
  const researchStats = [
    { 
      stat: "4x", 
      label: "More likely to succeed", 
      source: "LinkedIn 2023",
      icon: TrendingUp
    },
    { 
      stat: "55%", 
      label: "Faster to hire", 
      source: "SHRM Study 2022",
      icon: Clock
    },
    { 
      stat: "46%", 
      label: "Higher retention rate", 
      source: "Jobvite Research",
      icon: Users
    },
  ];

  // Process steps
  const processSteps = [
    { 
      num: "01", 
      title: "Vision", 
      desc: "Be the global leader in referral-based recruitment.",
      icon: Sparkles
    },
    { 
      num: "02", 
      title: "Mission", 
      desc: "Empower brands and individuals through simplified, rewarding, and modern recruitment solutions.",
      icon: Handshake
    },
    { 
      num: "03", 
      title: "Impact", 
      desc: "Join us in transforming recruitment into a win-win for everyone—brands, candidates, and referrers alike.",
      icon: Briefcase
    },
  ];

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
            <WordReveal text="Refer'd is for brands" />
            <span className="block mt-2">
              <WordReveal text="and referrers" className="text-muted-foreground/40" />
            </span>
          </h2>
        </motion.div>

        {/* Intro Text Block */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-20"
        >
          <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
            Refer'd is revolutionizing recruitment by turning networks into opportunities. For brands, this means faster hiring, reduced turnover, and access to top talent through trusted connections.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Using smart technology and social networks, we bring recruitment into the modern era—efficient, cost-effective, and community-driven.
          </p>
        </motion.div>

        {/* Research-backed Stats Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {researchStats.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 1, 
                  delay: 0.1 + (index * 0.1), 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <TiltCard 
                  intensity={10} 
                  glare={true} 
                  className="bg-foreground text-background p-8 rounded-3xl h-full"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-sage/20 flex items-center justify-center">
                      <IconComponent className="w-6 h-6 text-sage" />
                    </div>
                    <span className="text-xs text-background/40 uppercase tracking-wider">
                      {item.source}
                    </span>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + (index * 0.1), duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-sage mb-2"
                  >
                    {item.stat}
                  </motion.p>
                  <p className="text-lg text-background/70">
                    {item.label}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Why Referrals Work - Large Statement Card */}
        <motion.div
          initial={{ opacity: 0, y: 80, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <TiltCard intensity={6} glare={true} className="bg-rose/10 p-10 md:p-14 rounded-3xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-foreground/50 mb-6">
                  Why Referrals Win
                </p>
                <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground leading-tight mb-6">
                  Hire through connections
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  With Refer'd, brands can slash hiring times, cut expensive recruitment fees, and engage their employees to promote jobs internally with inspiring incentives.
                </p>
              </div>
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-5 bg-background/60 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-sage flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-foreground text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Deloitte, 2022</p>
                    <p className="text-muted-foreground text-sm">Employee referrals have a 45% retention rate after 2 years vs 20% from job boards.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4 p-5 bg-background/60 rounded-2xl">
                  <div className="w-10 h-10 rounded-full bg-mustard flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-foreground text-lg">✓</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground mb-1">Harvard Business Review</p>
                    <p className="text-muted-foreground text-sm">Referred candidates are 25% more profitable than non-referred hires.</p>
                  </div>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Process Cards - Vision, Mission, Impact */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {processSteps.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <motion.div
                key={card.num}
                initial={{ opacity: 0, y: 80, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ 
                  duration: 1, 
                  delay: 0.5 + (index * 0.1), 
                  ease: [0.16, 1, 0.3, 1] 
                }}
              >
                <TiltCard 
                  intensity={12} 
                  glare={true} 
                  className="group bg-muted/50 hover:bg-sage/10 p-8 rounded-3xl transition-colors duration-500 cursor-pointer h-full"
                >
                  <div className="flex items-start justify-between mb-12">
                    <div className="w-14 h-14 rounded-2xl bg-rose/20 flex items-center justify-center">
                      <IconComponent className="w-7 h-7 text-rose" />
                    </div>
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{card.num}</span>
                  </div>
                  <h3 className="text-2xl font-heading font-semibold text-foreground mb-3 group-hover:text-sage-dark transition-colors duration-300">
                    {card.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {card.desc}
                  </p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* The Split Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-xl md:text-2xl text-foreground/80 leading-relaxed mb-6">
              Refer'd makes earning money simple and social. Connect your network with job opportunities, refer friends to roles, and earn rewards when they get hired.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Join a community where referrals redefine recruitment, making every connection count.
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
