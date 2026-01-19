import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}

const AnimatedNumber = ({ value, prefix = "", suffix = "", duration = 2 }: AnimatedNumberProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = value;
    const incrementTime = (duration * 1000) / end;
    const step = Math.max(1, Math.floor(end / 100));

    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, incrementTime * step);

    return () => clearInterval(timer);
  }, [isInView, value, duration]);

  return (
    <span ref={ref}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};

const stats = [
  { value: 427000, prefix: "£", suffix: "+", label: "Paid to referrers" },
  { value: 4293, prefix: "", suffix: "+", label: "People earning" },
  { value: 892, prefix: "", suffix: "+", label: "Companies hiring" },
  { value: 35, prefix: "", suffix: "%", label: "Referrer's share" },
];

const StatsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-foreground text-background overflow-hidden">
      {/* Ticker Row */}
      <div className="relative">
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: "-50%" }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex whitespace-nowrap"
        >
          {[...stats, ...stats, ...stats, ...stats].map((stat, index) => (
            <div key={index} className="flex items-center px-12 md:px-16">
              <span className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold">
                {stat.prefix}{stat.value.toLocaleString()}{stat.suffix}
              </span>
              <span className="ml-4 text-sm uppercase tracking-[0.15em] text-background/60">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Static Stats Grid */}
      <div className="container mx-auto px-6 mt-24">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
        >
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-fluid-3xl md:text-fluid-4xl font-heading font-bold text-background">
                <AnimatedNumber 
                  value={stat.value} 
                  prefix={stat.prefix} 
                  suffix={stat.suffix}
                />
              </p>
              <p className="mt-2 text-sm uppercase tracking-[0.15em] text-background/60">
                {stat.label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default StatsSection;
