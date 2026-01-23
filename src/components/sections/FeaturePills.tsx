import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TrendingUp, Users, Building2, BarChart3, PieChart, Network } from "lucide-react";

interface FeatureItem {
  label: string;
  title: string;
  description: string;
  icon: React.ElementType;
  stat: string;
  statLabel: string;
}

const features: FeatureItem[] = [
  {
    label: "Know Your Worth",
    title: "AI Salary Intelligence",
    description: "Real-time market data powered by machine learning. See exactly where you stand and negotiate with confidence.",
    icon: TrendingUp,
    stat: "23%",
    statLabel: "Average salary increase",
  },
  {
    label: "Monetize Your Network",
    title: "Referral Earnings",
    description: "Turn your professional connections into income. Earn up to 35% of placement fees for successful referrals.",
    icon: Users,
    stat: "£8K",
    statLabel: "Average referral payout",
  },
  {
    label: "Access Hidden Talent",
    title: "Network-Powered Hiring",
    description: "Tap into a pre-vetted talent pool. Find candidates through trusted referrals, not just job boards.",
    icon: Building2,
    stat: "60%",
    statLabel: "Lower hiring costs",
  },
  {
    label: "Market Intelligence",
    title: "Industry Benchmarks",
    description: "Comprehensive salary benchmarks, industry trends, and competitive analysis across sectors.",
    icon: BarChart3,
    stat: "150+",
    statLabel: "Industries covered",
  },
  {
    label: "Fair & Transparent",
    title: "Clear Fee Structure",
    description: "See exactly how referral fees are distributed. 35% to talent, 35% to referrer, 30% platform.",
    icon: PieChart,
    stat: "100%",
    statLabel: "Transparent splits",
  },
  {
    label: "Build Your Herd",
    title: "Community Growth",
    description: "Join a community of professionals helping each other succeed. The more you refer, the more you earn.",
    icon: Network,
    stat: "15K+",
    statLabel: "Active members",
  },
];

const FeaturePills = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
            The Data Speaks
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-6">
            Why Referd Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Built on transparency, powered by your network
          </p>
        </motion.div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <motion.div
              key={feature.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative"
            >
              <div className={`relative p-8 rounded-3xl bg-background border-2 border-transparent transition-all duration-500 ${
                activeIndex === index 
                  ? "border-sage shadow-lg shadow-sage/20" 
                  : "hover:border-muted"
              }`}>
                {/* Icon + Stat */}
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors duration-300 ${
                    activeIndex === index ? "bg-sage" : "bg-sage/10"
                  }`}>
                    <feature.icon className={`w-7 h-7 transition-colors duration-300 ${
                      activeIndex === index ? "text-foreground" : "text-sage"
                    }`} />
                  </div>
                  
                  <AnimatePresence>
                    {activeIndex === index && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="text-right"
                      >
                        <div className="text-2xl font-heading font-bold text-sage">
                          {feature.stat}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {feature.statLabel}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Content */}
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 bg-sage/10 text-sage text-xs font-medium rounded-full mb-3">
                    {feature.label}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">
                    {feature.title}
                  </h3>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-sage rounded-b-3xl"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: activeIndex === index ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  style={{ originX: 0 }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturePills;
