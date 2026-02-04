import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CheckCircle2, ArrowDown, Sparkles } from "lucide-react";
import TiltCard from "@/components/animations/TiltCard";

const SolutionReveal = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3], [0.9, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.2], [0, 1]);

  const benefits = [
    {
      title: "35% to Referrer",
      description: "Your network, your reward. Get paid for the connections you've built.",
      color: "text-referrer",
      bgColor: "bg-referrer/20",
    },
    {
      title: "35% to Talent",
      description: "Finally, candidates share in the success of their own placement.",
      color: "text-talent",
      bgColor: "bg-talent/20",
    },
    {
      title: "30% Platform",
      description: "Fair, transparent, and reinvested into making hiring even better.",
      color: "text-muted-foreground",
      bgColor: "bg-muted/30",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Parallax overlap effect */}
      <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6"
      >
        {/* Section Header with highlighted words */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 mb-6">
            <Sparkles className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Solution
            </span>
          </div>

          <h2 className="text-fluid-4xl md:text-fluid-5xl lg:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            We{" "}
            <span className="text-sage">disrupted</span>{" "}
            the model.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Like <span className="text-foreground font-semibold">Uber</span> for transport,{" "}
            <span className="text-foreground font-semibold">Airbnb</span> for hospitality,{" "}
            <span className="text-foreground font-semibold">Rightmove</span> for property — {" "}
            <span className="text-sage font-bold">Referd</span> is here to{" "}
            <span className="text-rose font-bold">kill</span> the recruitment agency.
          </p>
        </motion.div>

        {/* The Split Visualization */}
        <div className="max-w-4xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <TiltCard intensity={6} glare={true} className="bg-foreground text-background p-8 md:p-12 rounded-3xl">
              <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-8 text-center">
                The 35/35/30 Revolution
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={benefit.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className={`w-16 h-16 rounded-2xl ${benefit.bgColor} flex items-center justify-center mx-auto mb-4`}>
                      <span className={`text-2xl font-heading font-bold ${benefit.color}`}>
                        {benefit.title.split(" ")[0]}
                      </span>
                    </div>
                    <h4 className="text-lg font-heading font-bold text-background mb-2">
                      {benefit.title.split(" ").slice(1).join(" ")}
                    </h4>
                    <p className="text-sm text-background/60">
                      {benefit.description}
                    </p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 pt-6 border-t border-background/10 text-center"
              >
                <p className="text-lg text-background/80">
                  <CheckCircle2 className="w-5 h-5 inline mr-2 text-sage" />
                  No hidden fees. No middlemen taking 30%. Just people helping people.
                </p>
              </motion.div>
            </TiltCard>
          </motion.div>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* Old Way */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="p-6 rounded-2xl bg-rose/10 border border-rose/20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-rose font-semibold mb-4">
              ❌ The Old Way
            </p>
            <ul className="space-y-3">
              {[
                "30% agency fee on salary",
                "Talent priced out of opportunities",
                "Referrers get nothing",
                "Employers overpay for hires",
                "Slow, opaque processes",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-muted-foreground">
                  <span className="text-rose mt-1">•</span>
                  <span className="line-through opacity-60">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* New Way */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-6 rounded-2xl bg-sage/10 border border-sage/20"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-sage font-semibold mb-4">
              ✓ The Referd Way
            </p>
            <ul className="space-y-3">
              {[
                "70% goes to people, not agencies",
                "Talent gets paid for being hired",
                "Your network becomes income",
                "Brands save 60% on hiring costs",
                "AI-powered, instant matching",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-foreground">
                  <CheckCircle2 className="w-4 h-4 text-sage mt-0.5 flex-shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator to next section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="flex justify-center mt-16"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-xs uppercase tracking-[0.2em]">Keep scrolling</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>

      {/* Bottom overlap */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default SolutionReveal;
