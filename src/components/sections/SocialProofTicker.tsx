import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Users, Banknote, Building2, TrendingUp } from "lucide-react";

const SocialProofTicker = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [liveCount, setLiveCount] = useState(4293);

  // Simulate live counter incrementing
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  const stats = [
    {
      icon: Users,
      value: liveCount,
      label: "People in the Herd",
      color: "text-sage",
      live: true,
    },
    {
      icon: Banknote,
      value: 427,
      prefix: "£",
      suffix: "K+",
      label: "Paid Out",
      color: "text-referrer",
    },
    {
      icon: Building2,
      value: 856,
      label: "Successful Hires",
      color: "text-brand",
    },
    {
      icon: TrendingUp,
      value: 60,
      suffix: "%",
      label: "Avg. Savings vs Agencies",
      color: "text-talent",
    },
  ];

  return (
    <section ref={ref} className="relative py-16 md:py-20 bg-foreground overflow-hidden">
      {/* Animated background line */}
      <div className="absolute inset-0 flex items-center pointer-events-none">
        <motion.div
          className="w-full h-px bg-gradient-to-r from-transparent via-sage/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10"
        >
          <p className="text-xs uppercase tracking-[0.3em] text-background/40 mb-2">
            Live from the marketplace
          </p>
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-background">
            The Herd is <span className="text-sage">growing</span>.
          </h3>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-background/5 flex items-center justify-center mx-auto mb-3">
                  <IconComponent className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className={`text-3xl md:text-4xl font-heading font-bold ${stat.color} mb-1`}>
                  {stat.live ? (
                    <motion.span
                      key={liveCount}
                      initial={{ scale: 1.1 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {liveCount.toLocaleString()}
                    </motion.span>
                  ) : (
                    <AnimatedCounter
                      value={stat.value}
                      prefix={stat.prefix}
                      suffix={stat.suffix}
                      duration={2}
                      delay={0.3 + index * 0.15}
                    />
                  )}
                </div>
                <p className="text-sm text-background/50">{stat.label}</p>
                {stat.live && (
                  <div className="flex items-center justify-center gap-1.5 mt-2">
                    <span className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                    <span className="text-[10px] uppercase tracking-wider text-sage/80">Live</span>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SocialProofTicker;
