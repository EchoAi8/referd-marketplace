import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import TiltCard from "@/components/animations/TiltCard";
import {
  Zap, Users, Rocket, Building2, Star, Brain,
  SlidersHorizontal, Shield, Share2, BarChart3,
  Video, Award, TrendingUp, Sparkles, CheckCircle2
} from "lucide-react";

const TheReferdWay = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState<"brands" | "referrers" | "talent">("brands");

  const tabs = {
    brands: {
      color: "text-brand",
      bgColor: "bg-brand",
      borderColor: "border-brand/30",
      icon: Building2,
      title: "For Brands",
      subtitle: "Hire smarter, pay less",
      features: [
        { icon: SlidersHorizontal, text: "Pick your fees on a sliding scale — you set the budget" },
        { icon: CheckCircle2, text: "Pay only on successful placements — zero risk" },
        { icon: Shield, text: "Full transparency and accountability on every hire" },
        { icon: Brain, text: "AI personal assistant to help with the whole recruitment process" },
        { icon: BarChart3, text: "Instant data and analytics dashboards" },
        { icon: Users, text: "Access a pre-vetted, referral-quality talent pool" },
      ],
    },
    referrers: {
      color: "text-referrer",
      bgColor: "bg-referrer",
      borderColor: "border-referrer/30",
      icon: Star,
      title: "For Referrers",
      subtitle: "Your network is your income",
      features: [
        { icon: Zap, text: "No more £100 supermarket voucher — earn big fees and big rewards" },
        { icon: Share2, text: "Leverage your social and professional networks virally" },
        { icon: Shield, text: "Full transparency with live dashboards and real-time tracking" },
        { icon: Brain, text: "Full AI and ML technology to help you match and refer" },
        { icon: Award, text: "Ratings, reviews and feedback to enhance your referrer profile" },
        { icon: TrendingUp, text: "Build exposure and unlock retainer opportunities from brands" },
      ],
    },
    talent: {
      color: "text-talent",
      bgColor: "bg-talent",
      borderColor: "border-talent/30",
      icon: Users,
      title: "For Talent",
      subtitle: "Know your worth, get paid",
      features: [
        { icon: BarChart3, text: "Intelligent salary portal — know your exact market value" },
        { icon: Shield, text: "Modern profile and CPD safe for all qualifications and training" },
        { icon: Video, text: "Video introductions — no more boring CVs" },
        { icon: Zap, text: "Get PAID to find your dream role — 35% of the fee is yours" },
        { icon: Brain, text: "AI and ML algorithms to match you to your perfect job" },
        { icon: Star, text: "Transition from Talent to Referrer to earn even more" },
      ],
    },
  };

  const activeData = tabs[activeTab];
  const ActiveIcon = activeData.icon;

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Top overlap */}
      <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sage/20 mb-6">
            <Sparkles className="w-4 h-4 text-sage" />
            <span className="text-xs uppercase tracking-[0.2em] text-sage font-semibold">
              The Solution
            </span>
          </div>

          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            The <span className="text-sage">Referd</span> Way.
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            No more corporate-owned gatekeepers. The fee, fairly distributed.
          </p>
        </motion.div>

        {/* 35/35/30 Split Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <TiltCard intensity={6} glare className="bg-foreground text-background p-8 md:p-12 rounded-3xl">
            <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-8 text-center">
              The 35/35/30 Revolution
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              {[
                { value: 35, label: "To the Referrer", sublabel: "Your network has value", color: "text-referrer", icon: Star },
                { value: 35, label: "To the Talent", sublabel: "You deserve a cut", color: "text-talent", icon: Users },
                { value: 30, label: "Keeps Us Running", sublabel: "No hidden fees. No bullshit.", color: "text-brand", icon: Rocket },
              ].map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-background/10 flex items-center justify-center mx-auto mb-3">
                      <IconComponent className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <div className={`text-fluid-4xl font-heading font-bold ${item.color} mb-1`}>
                      <AnimatedCounter value={item.value} suffix="%" duration={2} delay={0.4 + index * 0.15} />
                    </div>
                    <p className="text-lg font-semibold text-background">{item.label}</p>
                    <p className="text-sm text-background/50">{item.sublabel}</p>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-6 border-t border-background/10 text-center">
              <p className="text-lg text-background/80">
                <CheckCircle2 className="w-5 h-5 inline mr-2 text-sage" />
                Every hire. Every referral. <span className="text-sage font-bold">Everyone gets paid</span>.
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* Key Differentiators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {[
            { icon: Share2, title: "Viral Referrals", desc: "Referrals shared socially — not locked in an inbox. Modern, instant, viral." },
            { icon: Brain, title: "Full AI & ML Tech", desc: "Salary intelligence, smart matching, analytics dashboards — for everyone." },
            { icon: BarChart3, title: "Instant Dashboards", desc: "Real-time data and analytics for Brands, Referrers, and Talent. Full transparency." },
          ].map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="bg-muted/30 border border-border/50 rounded-2xl p-6 text-center"
              >
                <div className="w-14 h-14 rounded-2xl bg-sage/20 flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-7 h-7 text-sage" />
                </div>
                <h4 className="text-lg font-heading font-bold text-foreground mb-2">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Tabbed Stakeholder Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="max-w-5xl mx-auto"
        >
          {/* Tab Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
            {(Object.keys(tabs) as Array<keyof typeof tabs>).map((key) => {
              const tabData = tabs[key];
              const TabIcon = tabData.icon;
              const isActive = activeTab === key;
              return (
                <motion.button
                  key={key}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(key)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-heading font-bold text-lg transition-all duration-300 ${
                    isActive
                      ? `${tabData.bgColor} text-foreground shadow-lg`
                      : "bg-muted/30 text-muted-foreground hover:bg-muted/50"
                  }`}
                >
                  <TabIcon className="w-5 h-5" />
                  {tabData.title}
                </motion.button>
              );
            })}
          </div>

          {/* Tab Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className={`border-2 ${activeData.borderColor} rounded-3xl p-8 md:p-10`}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className={`w-14 h-14 rounded-2xl ${activeData.bgColor} flex items-center justify-center`}>
                <ActiveIcon className="w-7 h-7 text-foreground" />
              </div>
              <div>
                <h3 className={`text-2xl font-heading font-bold ${activeData.color}`}>
                  {activeData.title}
                </h3>
                <p className="text-muted-foreground">{activeData.subtitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeData.features.map((feature, i) => {
                const FeatureIcon = feature.icon;
                return (
                  <motion.div
                    key={feature.text}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-muted/20 transition-colors"
                  >
                    <FeatureIcon className={`w-5 h-5 mt-0.5 flex-shrink-0 ${activeData.color}`} />
                    <span className="text-foreground">{feature.text}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-foreground to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default TheReferdWay;
