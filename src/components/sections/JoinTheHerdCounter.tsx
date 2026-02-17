import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Users, TrendingUp, Zap } from "lucide-react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";

const JoinTheHerdCounter = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [liveCount, setLiveCount] = useState(4293);

  // Simulate live signups ticking up
  useEffect(() => {
    if (!isInView) return;
    const interval = setInterval(() => {
      setLiveCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
    }, 4000 + Math.random() * 3000);
    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section
      ref={ref}
      className="relative py-16 md:py-20 bg-foreground text-background overflow-hidden"
    >
      {/* Parallax overlap from previous section */}
      <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          {/* Pulsing live indicator */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 mb-8">
            <motion.div
              className="w-2 h-2 rounded-full bg-sage"
              animate={{ scale: [1, 1.4, 1], opacity: [1, 0.6, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              Live Counter
            </span>
          </div>

          <h3 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-tight mb-4">
            Join the{" "}
            <span className="text-sage">Herd</span>
          </h3>

          {/* Live counter display */}
          <div className="flex flex-col items-center gap-2 mb-10">
            <motion.div
              key={liveCount}
              initial={{ scale: 1.05 }}
              animate={{ scale: 1 }}
              className="text-6xl md:text-8xl lg:text-9xl font-heading font-bold text-sage tabular-nums"
            >
              {liveCount.toLocaleString()}
            </motion.div>
            <p className="text-lg md:text-xl text-background/60">
              people earning from their network — and counting
            </p>
          </div>

          {/* Mini stats row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              {
                icon: Users,
                value: 856,
                label: "Successful hires",
                color: "text-referrer",
              },
              {
                icon: TrendingUp,
                value: 427,
                prefix: "£",
                suffix: "K+",
                label: "Paid to people",
                color: "text-talent",
              },
              {
                icon: Zap,
                value: 60,
                suffix: "%",
                label: "Saved vs agencies",
                color: "text-brand",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="bg-background/5 rounded-2xl p-5 border border-background/10"
              >
                <stat.icon className={`w-5 h-5 ${stat.color} mb-2 mx-auto`} />
                <div className={`text-2xl md:text-3xl font-heading font-bold ${stat.color}`}>
                  <AnimatedCounter
                    value={stat.value}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    delay={0.3 + i * 0.15}
                  />
                </div>
                <p className="text-sm text-background/50 mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom overlap */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default JoinTheHerdCounter;
