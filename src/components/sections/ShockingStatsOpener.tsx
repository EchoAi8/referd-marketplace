import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { TrendingDown, Users, DollarSign, Clock, AlertTriangle } from "lucide-react";

const shockingStats = [
  {
    value: 30,
    suffix: "%",
    label: "Agency fee on YOUR salary",
    sublabel: "The industry standard that's robbing talent",
    icon: DollarSign,
    source: "CIPD 2024",
    color: "text-rose",
  },
  {
    value: 72,
    suffix: "%",
    label: "Of hires come from referrals",
    sublabel: "Yet networks aren't rewarded",
    icon: Users,
    source: "LinkedIn Talent Report",
    color: "text-sage",
  },
  {
    value: 4.1,
    prefix: "£",
    suffix: "B",
    label: "Paid to agencies in the UK alone",
    sublabel: "Money that could go to people",
    icon: TrendingDown,
    source: "REC Industry Report 2023",
    color: "text-mustard",
  },
  {
    value: 45,
    suffix: " days",
    label: "Average time to hire",
    sublabel: "Agencies profit from delays",
    icon: Clock,
    source: "SHRM Benchmarks",
    color: "text-referrer",
  },
];

const ShockingStatsOpener = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [100, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-foreground text-background py-24 md:py-32 overflow-hidden"
    >
      {/* Parallax overlap from hero - creates seamless transition */}
      <div className="absolute -top-32 left-0 right-0 h-64 bg-gradient-to-b from-foreground/0 via-foreground/80 to-foreground pointer-events-none z-10" />
      
      {/* Animated background pattern */}
      <motion.div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `repeating-linear-gradient(
            45deg,
            transparent,
            transparent 40px,
            hsl(var(--color-sage)) 40px,
            hsl(var(--color-sage)) 41px
          )`,
        }}
        animate={{ 
          backgroundPosition: ["0px 0px", "40px 40px"],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div style={{ opacity, y }} className="container mx-auto px-6 relative z-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/20 mb-6">
            <AlertTriangle className="w-4 h-4 text-rose" />
            <span className="text-xs uppercase tracking-[0.2em] text-rose font-semibold">
              The Uncomfortable Truth
            </span>
          </div>
          
          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            The recruitment industry is{" "}
            <span className="text-rose">broken</span>.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
            And everyone knows it — except the agencies profiting from the chaos.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {shockingStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 60, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ 
                  duration: 0.7, 
                  delay: index * 0.1,
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="group relative"
              >
                <div className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-6 h-full hover:bg-background/10 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                    <span className="text-[10px] text-background/40 uppercase tracking-wider">
                      {stat.source}
                    </span>
                  </div>
                  
                  <div className={`text-fluid-4xl md:text-fluid-5xl font-heading font-bold ${stat.color} mb-2`}>
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2}
                      delay={0.3 + index * 0.15}
                    />
                  </div>
                  
                  <p className="text-lg font-semibold text-background mb-1">
                    {stat.label}
                  </p>
                  <p className="text-sm text-background/50">
                    {stat.sublabel}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* The Question */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-heading font-medium text-background/80 max-w-4xl mx-auto">
            What if the people who{" "}
            <span className="text-sage font-bold">actually know</span>{" "}
            the best candidates got paid instead?
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom overlap into next section */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default ShockingStatsOpener;
