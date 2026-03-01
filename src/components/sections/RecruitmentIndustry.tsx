import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Globe, TrendingUp, Users, Building2, Briefcase, Search } from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";

const industryStats = [
  {
    value: 500,
    prefix: "$",
    suffix: "B+",
    label: "Global Recruitment Market",
    sublabel: "Projected by 2027",
    source: "Grand View Research, 2023",
    icon: Globe,
    color: "text-sage",
  },
  {
    value: 20,
    suffix: "M+",
    label: "Recruitment Agencies Worldwide",
    sublabel: "And growing every year",
    source: "Staffing Industry Analysts",
    icon: Building2,
    color: "text-referrer",
  },
  {
    value: 72,
    suffix: "%",
    label: "Of Employers Struggle to Find Talent",
    sublabel: "Despite record spending",
    source: "ManpowerGroup Talent Shortage Survey, 2024",
    icon: Search,
    color: "text-rose",
  },
];

const recruitmentMethods = [
  {
    icon: Building2,
    title: "Recruitment Agencies",
    desc: "Traditional gatekeepers charging 15–30% of salary. The industry standard for decades.",
    stat: "£12B+ UK market",
  },
  {
    icon: Briefcase,
    title: "Job Boards",
    desc: "Indeed, LinkedIn, Reed — reactive platforms where candidates apply and wait.",
    stat: "300M+ job postings/year",
  },
  {
    icon: Users,
    title: "Internal Referral Schemes",
    desc: "Companies reward employees for recommending candidates. Often undervalued and poorly incentivised.",
    stat: "~30% of all hires",
  },
  {
    icon: Search,
    title: "Direct Sourcing & Headhunters",
    desc: "Executive search firms targeting passive candidates. Expensive and exclusive.",
    stat: "£50K+ avg. fee",
  },
];

const RecruitmentIndustry = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-foreground text-background overflow-hidden">
      {/* Animated background pattern */}
      <motion.div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            hsl(var(--color-sage)) 40px,
            hsl(var(--color-sage)) 41px
          )`,
        }}
        animate={{ backgroundPosition: ["0px 0px", "40px 40px"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 mb-6">
            <TrendingUp className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Industry
            </span>
          </div>

          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            Recruitment is one of the{" "}
            <span className="text-sage">biggest industries</span>{" "}
            in the world.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
            Half a trillion dollars. Millions of agencies. Yet the people who make it work — the referrers and the talent — see almost none of it.
          </p>
        </motion.div>

        {/* Industry Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {industryStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <TiltCard intensity={8} glare className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-6 h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] text-background/40 uppercase tracking-wider bg-background/5 px-2 py-1 rounded-full">
                      {stat.source}
                    </span>
                  </div>
                  <div className={`text-fluid-4xl md:text-fluid-5xl font-heading font-bold ${stat.color} mb-2`}>
                    <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} duration={2} delay={0.3 + index * 0.15} />
                  </div>
                  <p className="text-lg font-semibold text-background mb-1">{stat.label}</p>
                  <p className="text-sm text-background/50">{stat.sublabel}</p>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>

        {/* How People Recruit Today */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/40 mb-3">The Landscape</p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-background">
            How Recruitment Works Today
          </h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {recruitmentMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.08 }}
                className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-2xl p-6 hover:bg-background/10 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center mb-4">
                  <IconComponent className="w-6 h-6 text-sage" />
                </div>
                <h4 className="text-lg font-heading font-bold text-background mb-2">{method.title}</h4>
                <p className="text-sm text-background/50 mb-3">{method.desc}</p>
                <span className="text-xs text-sage font-medium">{method.stat}</span>
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

export default RecruitmentIndustry;
