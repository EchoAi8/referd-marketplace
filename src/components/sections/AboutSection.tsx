import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import WordReveal from "@/components/animations/WordReveal";
import TiltCard from "@/components/animations/TiltCard";
import { Sparkles, Zap, Target, TrendingUp, Users, Clock, Award, DollarSign, Rocket, CheckCircle } from "lucide-react";

const AboutSection = () => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-50px" });

  // Stats with research backing - CLARIFIED as referrals vs traditional
  const researchStats = [
    { 
      stat: "4x", 
      label: "More likely to get hired", 
      sublabel: "vs job board applicants",
      source: "LinkedIn 2023",
      icon: TrendingUp,
      color: "text-sage"
    },
    { 
      stat: "55%", 
      label: "Faster time-to-hire", 
      sublabel: "vs traditional recruiting",
      source: "SHRM Study 2022",
      icon: Clock,
      color: "text-mustard"
    },
    { 
      stat: "46%", 
      label: "Higher retention rate", 
      sublabel: "after 2 years vs other sources",
      source: "Jobvite Research",
      icon: Users,
      color: "text-rose"
    },
  ];

  // Enhanced "Why Referrals Win" data
  const referralAdvantages = [
    {
      icon: Award,
      title: "45% vs 20%",
      subtitle: "Retention after 2 years",
      desc: "Referral hires stay longer than job board hires",
      source: "Deloitte, 2022",
      color: "bg-sage"
    },
    {
      icon: DollarSign,
      title: "25% Higher",
      subtitle: "Profitability per hire",
      desc: "Referred employees outperform in revenue generation",
      source: "Harvard Business Review",
      color: "bg-mustard"
    },
    {
      icon: Zap,
      title: "50% Lower",
      subtitle: "Cost per hire",
      desc: "Eliminate agency fees and reduce advertising spend",
      source: "Glassdoor Economic Research",
      color: "bg-rose"
    },
    {
      icon: Target,
      title: "70% Match",
      subtitle: "Cultural fit accuracy",
      desc: "Referrers pre-screen for team and culture alignment",
      source: "CIPD Research 2023",
      color: "bg-forest"
    },
  ];

  // Reimagined process - more engaging
  const ourApproach = [
    { 
      icon: Rocket, 
      title: "Disrupt", 
      tagline: "Break the mould",
      desc: "We're tearing up the rulebook. No more 20% agency fees. No more cold applications. Just real people connecting real talent.",
      gradient: "from-sage/20 to-sage/5"
    },
    { 
      icon: Sparkles, 
      title: "Democratise", 
      tagline: "Power to the people",
      desc: "The recruitment fee now belongs to you — the referrer and the talent. 70% goes directly into your pockets.",
      gradient: "from-mustard/20 to-mustard/5"
    },
    { 
      icon: Target, 
      title: "Deliver", 
      tagline: "Results that matter",
      desc: "AI-powered matching. Real-time tracking. Instant payouts. We've built the infrastructure for recruitment's future.",
      gradient: "from-rose/20 to-rose/5"
    },
  ];

  return (
    <section ref={containerRef} className="pt-4 md:pt-8 pb-32 md:pb-48 -mt-20 md:-mt-28 bg-background overflow-hidden relative z-10">
      <div className="container mx-auto px-6">
        {/* About Us Label - Higher and closer to hero */}
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4"
        >
          About Us
        </motion.p>

        {/* Epic Star Wars Style Word Reveal Paragraph */}
        <div className="min-h-[90vh] md:min-h-[110vh] flex flex-col justify-center mb-8">
          <h2 className="text-fluid-3xl md:text-fluid-4xl lg:text-fluid-5xl font-heading font-bold leading-[1.15] max-w-6xl">
            <WordReveal text="Like Uber for transport, Airbnb for hospitality, or Spotify for the music industry —" />
            <span className="block mt-4">
              <WordReveal text="Refer'd is here to disrupt." delay={0.15} />
            </span>
            <span className="block mt-4">
              <WordReveal text="Redefining the recruitment industry one referral at a time." delay={0.3} />
            </span>
          </h2>

          {/* Subtext after the reveal */}
          <div className="mt-16 max-w-4xl">
            <p className="text-xl md:text-2xl lg:text-3xl font-heading leading-relaxed">
              <WordReveal text="The once corporate-owned 'Recruitment Fee' is now redistributed fairly" delay={0.45} />
              <span className="block mt-3">
                <WordReveal text="to the people who deserve it most." delay={0.55} />
              </span>
            </p>
            <p className="mt-8 text-lg md:text-xl leading-relaxed">
              <WordReveal text="Connect your network, refer friends and family — get paid." delay={0.65} />
              <span className="block mt-2">
                <WordReveal text="It's that simple." delay={0.72} />
              </span>
              <span className="block mt-4 text-base md:text-lg">
                <WordReveal text="Modern. Transparent. Automated. Supercharged with AI & Machine Learning —" delay={0.8} />
              </span>
              <span className="block mt-1 text-base md:text-lg">
                <WordReveal text="so it gets smarter over time." delay={0.88} />
              </span>
            </p>
          </div>
        </div>

        {/* Section Header for Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">The Data Speaks</p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">
            Referrals vs Traditional Recruitment
          </h3>
        </motion.div>

        {/* Research-backed Stats Bento Grid with Dramatic Pop-in */}
        <div ref={statsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {researchStats.map((item, index) => {
            const IconComponent = item.icon;
            const rotateDirection = index % 2 === 0 ? -8 : 8;
            
            return (
              <motion.div
                key={item.label}
                initial={{ 
                  opacity: 0, 
                  y: 120, 
                  scale: 0.6, 
                  rotateX: 25,
                  rotateY: rotateDirection,
                  rotateZ: rotateDirection / 2
                }}
                animate={statsInView ? { 
                  opacity: 1, 
                  y: 0, 
                  scale: 1,
                  rotateX: 0,
                  rotateY: 0,
                  rotateZ: 0
                } : {}}
                transition={{ 
                  duration: 1.2, 
                  delay: 0.1 + (index * 0.12), 
                  ease: [0.16, 1, 0.3, 1],
                  scale: { type: "spring", stiffness: 200, damping: 20 }
                }}
                style={{ transformPerspective: 1200 }}
              >
                <TiltCard 
                  intensity={10} 
                  glare={true} 
                  className="bg-foreground text-background p-8 rounded-3xl h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <motion.div 
                      className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center"
                      initial={{ scale: 0, rotate: -180 }}
                      animate={statsInView ? { scale: 1, rotate: 0 } : {}}
                      transition={{ delay: 0.4 + (index * 0.12), duration: 0.6, type: "spring" }}
                    >
                      <IconComponent className={`w-6 h-6 ${item.color}`} />
                    </motion.div>
                    <motion.span 
                      className="text-[10px] text-background/50 uppercase tracking-wider bg-background/10 px-2 py-1 rounded-full"
                      initial={{ opacity: 0, x: 20 }}
                      animate={statsInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.5 + (index * 0.12), duration: 0.5 }}
                    >
                      {item.source}
                    </motion.span>
                  </div>
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.3, y: 30 }}
                    animate={statsInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                    transition={{ 
                      delay: 0.3 + (index * 0.12), 
                      duration: 0.8, 
                      type: "spring",
                      stiffness: 150
                    }}
                    className={`text-fluid-4xl md:text-fluid-5xl font-heading font-bold ${item.color} mb-1`}
                  >
                    {item.stat}
                  </motion.p>
                  <motion.p 
                    className="text-lg font-semibold text-background mb-1"
                    initial={{ opacity: 0, y: 15 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.45 + (index * 0.12), duration: 0.5 }}
                  >
                    {item.label}
                  </motion.p>
                  <motion.p 
                    className="text-sm text-background/50"
                    initial={{ opacity: 0, y: 10 }}
                    animate={statsInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.5 + (index * 0.12), duration: 0.5 }}
                  >
                    {item.sublabel}
                  </motion.p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Why Referrals Win - EXPANDED with 4 advantage cards */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.3 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Research Backed</p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
              Why Referrals Win Every Time
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The world's leading research institutions agree: employee referrals outperform every other hiring method.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {referralAdvantages.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 60, rotateY: -15 }}
                  animate={isInView ? { opacity: 1, y: 0, rotateY: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 + (index * 0.1) }}
                  style={{ transformPerspective: 1000 }}
                >
                  <TiltCard intensity={12} glare={true} className="bg-muted/30 p-6 rounded-2xl h-full border border-border/50 hover:border-sage/30 transition-colors">
                    <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                      <IconComponent className="w-6 h-6 text-foreground" />
                    </div>
                    <p className="text-2xl font-heading font-bold text-foreground mb-1">{item.title}</p>
                    <p className="text-sm font-medium text-sage mb-2">{item.subtitle}</p>
                    <p className="text-sm text-muted-foreground mb-3">{item.desc}</p>
                    <p className="text-xs text-muted-foreground/60 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> {item.source}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Our Approach - REIMAGINED - More engaging */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.5 }}
          className="mb-20"
        >
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-3">Our Approach</p>
            <h3 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
              The Refer'd Way
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ourApproach.map((card, index) => {
              const IconComponent = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 80, scale: 0.9, rotateX: 15 }}
                  animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateX: 0 } : {}}
                  transition={{ 
                    duration: 1.2, 
                    delay: 0.6 + (index * 0.15), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  style={{ transformPerspective: 1200 }}
                >
                  <TiltCard 
                    intensity={14} 
                    glare={true} 
                    className={`group bg-gradient-to-br ${card.gradient} p-8 rounded-3xl h-full border border-border/30 hover:border-sage/40 transition-all duration-500`}
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <motion.div 
                        className="w-16 h-16 rounded-2xl bg-foreground flex items-center justify-center"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <IconComponent className="w-8 h-8 text-background" />
                      </motion.div>
                      <div>
                        <h4 className="text-2xl font-heading font-bold text-foreground">{card.title}</h4>
                        <p className="text-sm text-sage font-medium">{card.tagline}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {card.desc}
                    </p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

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
              initial={{ opacity: 0, y: 60, scale: 0.95, rotateY: -10 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1, rotateY: 0 } : {}}
              transition={{ duration: 1, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 1200 }}
            >
              <TiltCard intensity={8} glare={true} className="bg-foreground text-background p-8 rounded-3xl shadow-2xl">
                <p className="text-xs uppercase tracking-[0.2em] text-background/50 mb-6">The Fair Split</p>
                <div className="space-y-4">
                  {[
                    { label: "Referrer", value: "35%", color: "text-sage" },
                    { label: "Talent", value: "35%", color: "text-mustard" },
                    { label: "Platform", value: "30%", color: "text-background/50" },
                  ].map((item, index) => (
                    <motion.div 
                      key={item.label}
                      initial={{ opacity: 0, x: -30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.8 + (index * 0.1), type: "spring", stiffness: 200 }}
                      className="flex justify-between items-center"
                    >
                      <span className="text-lg">{item.label}</span>
                      <span className={`text-3xl font-heading font-bold ${item.color}`}>
                        {item.value}
                      </span>
                    </motion.div>
                  ))}
                </div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ delay: 1.1 }}
                  className="mt-6 pt-4 border-t border-background/10 text-sm text-background/60 text-center"
                >
                  Everyone wins — that's the Refer'd difference.
                </motion.p>
              </TiltCard>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
