import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { Zap, Users, Banknote, Rocket } from "lucide-react";

const stats = [
  {
    value: 35,
    suffix: "%",
    label: "Goes to the referrer",
    sublabel: "Because your network has value",
    icon: Users,
    color: "text-referrer",
  },
  {
    value: 35,
    suffix: "%",
    label: "Goes to the talent",
    sublabel: "You deserve a cut of your own hire",
    icon: Zap,
    color: "text-talent",
  },
  {
    value: 30,
    suffix: "%",
    label: "Keeps us running",
    sublabel: "No hidden fees. No bullshit.",
    icon: Rocket,
    color: "text-brand",
  },
  {
    value: 60,
    suffix: "%",
    label: "Less than agency fees",
    sublabel: "We're not even close to their prices",
    icon: Banknote,
    color: "text-sage",
  },
];

const ShockingStatsOpener = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2], [80, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen bg-foreground text-background py-24 md:py-32 overflow-hidden"
    >
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/10 mb-6">
            <Zap className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Referd Split
            </span>
          </div>

          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            We didn't come here to{" "}
            <span className="text-sage">play nice</span>.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-background/60 max-w-3xl mx-auto">
            35% to the referrer. 35% to the talent. 30% to us. That's it. No middlemen, no markups, no games. The Fee Fairly Distributed!
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {stats.map((stat, index) => {
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
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="group relative"
              >
                <div className="bg-background/5 backdrop-blur-sm border border-background/10 rounded-3xl p-6 h-full hover:bg-background/10 transition-colors duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
                      <IconComponent className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>

                  <div className={`text-fluid-4xl md:text-fluid-5xl font-heading font-bold ${stat.color} mb-2`}>
                    <AnimatedCounter
                      value={stat.value}
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

        {/* Closer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <p className="text-2xl md:text-3xl font-heading font-medium text-background/80 max-w-4xl mx-auto">
            Every hire. Every referral.{" "}
            <span className="text-sage font-bold">Everyone gets paid</span>.
          </p>
        </motion.div>
      </motion.div>

      {/* Bottom gradient fade into next section */}
      <div className="absolute -bottom-1 left-0 right-0 h-40 bg-gradient-to-t from-muted/30 via-background/80 to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default ShockingStatsOpener;
