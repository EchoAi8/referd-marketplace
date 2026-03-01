import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import TiltCard from "@/components/animations/TiltCard";
import { TrendingUp, Clock, Users, Award, DollarSign, Target, CheckCircle, Heart } from "lucide-react";

const referralStats = [
  {
    value: 4,
    suffix: "x",
    label: "More Likely to Get Hired",
    sublabel: "Referred candidates vs job board applicants",
    source: "LinkedIn Global Recruiting Trends, 2023",
    icon: TrendingUp,
    color: "text-sage",
  },
  {
    value: 55,
    suffix: "%",
    label: "Faster Time-to-Hire",
    sublabel: "Referrals fill roles in 29 days vs 55 days average",
    source: "SHRM Benchmarking Report, 2022",
    icon: Clock,
    color: "text-referrer",
  },
  {
    value: 46,
    suffix: "%",
    label: "Higher Retention After 2 Years",
    sublabel: "Referred employees stay significantly longer",
    source: "Jobvite Recruiter Nation Survey",
    icon: Heart,
    color: "text-talent",
  },
];

const advantages = [
  {
    icon: Award,
    title: "45% vs 20%",
    subtitle: "Retention after 2 years",
    desc: "Referral hires stay longer than job board hires — they already have a connection to the company.",
    source: "Deloitte, 2022",
    color: "bg-sage",
  },
  {
    icon: DollarSign,
    title: "25% Higher",
    subtitle: "Profitability per hire",
    desc: "Referred employees outperform in revenue generation from day one.",
    source: "Harvard Business Review",
    color: "bg-mustard",
  },
  {
    icon: Target,
    title: "50% Lower",
    subtitle: "Cost per hire",
    desc: "Eliminate agency fees and reduce advertising spend dramatically.",
    source: "Glassdoor Economic Research",
    color: "bg-rose",
  },
  {
    icon: Users,
    title: "70% Match",
    subtitle: "Cultural fit accuracy",
    desc: "Referrers pre-screen for team and culture alignment — something a CV can't show.",
    source: "CIPD Research, 2023",
    color: "bg-referrer",
  },
];

const PowerOfReferrals = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      {/* Top overlap */}
      <div className="absolute -top-16 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 mb-6">
            <Users className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Data Speaks
            </span>
          </div>

          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            The <span className="text-sage">power</span> of referrals.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
            Every major study agrees: employee referrals outperform every other hiring method. The evidence is overwhelming.
          </p>
        </motion.div>

        {/* Key Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {referralStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard intensity={8} glare className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-8 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-full bg-background/10 flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] text-background/40 uppercase tracking-wider bg-background/5 px-2 py-1 rounded-full">
                      {stat.source}
                    </span>
                  </div>
                  <p className={`text-fluid-4xl md:text-fluid-5xl font-heading font-bold ${stat.color} mb-1`}>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} duration={2} delay={0.3 + index * 0.15} />
                  </p>
                  <p className="text-lg font-semibold text-background mb-1">{stat.label}</p>
                  <p className="text-sm text-background/50">{stat.sublabel}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* Advantage Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-background">
            Why Referrals Win Every Time
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advantages.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
                className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 hover:bg-background/10 transition-colors"
              >
                <div className={`w-12 h-12 rounded-xl ${item.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-foreground" />
                </div>
                <p className="text-2xl font-heading font-bold text-background mb-1">{item.title}</p>
                <p className="text-sm font-medium text-sage mb-2">{item.subtitle}</p>
                <p className="text-sm text-background/50 mb-3">{item.desc}</p>
                <p className="text-xs text-background/30 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" /> {item.source}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute -bottom-1 left-0 right-0 h-40 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default PowerOfReferrals;
