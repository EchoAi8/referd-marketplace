import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import { ArrowRight, TrendingUp, Users, Zap, Shield, PoundSterling, Percent, Target, Rocket, CheckCircle2 } from "lucide-react";

const InvestorDeck = () => {
  const heroRef = useRef(null);
  const problemRef = useRef(null);
  const solutionRef = useRef(null);
  const marketRef = useRef(null);
  const modelRef = useRef(null);
  const tractionRef = useRef(null);
  const eisRef = useRef(null);
  const askRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const problemInView = useInView(problemRef, { once: true, margin: "-100px" });
  const solutionInView = useInView(solutionRef, { once: true, margin: "-100px" });
  const marketInView = useInView(marketRef, { once: true, margin: "-100px" });
  const modelInView = useInView(modelRef, { once: true, margin: "-100px" });
  const tractionInView = useInView(tractionRef, { once: true, margin: "-100px" });
  const eisInView = useInView(eisRef, { once: true, margin: "-100px" });
  const askInView = useInView(askRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <PageTransition>
      <div className="min-h-screen bg-foreground text-background">
        <SiteHeader />

        {/* HERO - The Big Ask */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
          {/* Animated gradient background */}
          <motion.div 
            className="absolute inset-0 opacity-30"
            style={{ y: backgroundY }}
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage/20 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mustard/20 rounded-full blur-3xl" />
          </motion.div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={heroInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-center max-w-5xl mx-auto"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 rounded-full mb-8"
              >
                <Shield className="w-4 h-4 text-sage" />
                <span className="text-sm font-semibold text-sage uppercase tracking-wider">SEIS/EIS Eligible</span>
              </motion.div>

              <h1 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold mb-6 leading-[0.95]">
                <span className="text-background">We're Ripping Up</span>
                <br />
                <span className="text-sage">The Recruitment</span>
                <br />
                <span className="text-background">Rulebook</span>
              </h1>

              <p className="text-xl md:text-2xl text-background/70 mb-12 max-w-3xl mx-auto">
                Join the revolution. £1M seed round to democratise hiring and put money back where it belongs—in the pockets of talent and their networks.
              </p>

              <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-sage text-foreground rounded-full font-heading font-bold text-lg cursor-pointer flex items-center gap-2"
                >
                  <PoundSterling className="w-5 h-5" />
                  £1M Seed Round
                </motion.div>
                <div className="text-background/60">
                  <span className="text-2xl font-heading font-bold text-background">Pre-Money:</span>
                  <span className="text-2xl font-heading font-bold text-sage ml-2">£4M</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-background/30 rounded-full flex justify-center"
            >
              <motion.div className="w-1.5 h-3 bg-sage rounded-full mt-2" />
            </motion.div>
          </motion.div>
        </section>

        {/* THE PROBLEM */}
        <section ref={problemRef} className="py-32 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={problemInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-rose mb-4">The Problem</p>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold mb-12">
                Recruitment is <span className="text-rose">Broken</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8">
                {[
                  { stat: "£35B", label: "UK recruitment industry value", sublabel: "Most goes to agencies, not talent" },
                  { stat: "30%", label: "Average agency fee", sublabel: "Pricing candidates out of dream jobs" },
                  { stat: "85%", label: "Of jobs filled via networks", sublabel: "Yet referrers get nothing" },
                  { stat: "72%", label: "Candidates unhappy with process", sublabel: "Agencies prioritise speed over fit" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={problemInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="p-8 bg-rose/5 border border-rose/20 rounded-2xl"
                  >
                    <div className="text-4xl md:text-5xl font-heading font-bold text-rose mb-2">{item.stat}</div>
                    <p className="text-lg font-semibold text-foreground">{item.label}</p>
                    <p className="text-muted-foreground mt-1">{item.sublabel}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={problemInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 p-8 bg-foreground text-background rounded-3xl"
              >
                <p className="text-xl md:text-2xl font-heading italic">
                  "My agency just priced me out of my dream job, charging 30% fees. That's £25k the company could have paid ME!"
                </p>
                <p className="text-background/60 mt-4">— Every frustrated job seeker, ever</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* THE SOLUTION */}
        <section ref={solutionRef} className="py-32 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={solutionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-sage mb-4">The Solution</p>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold mb-6">
                Refer'd: <span className="text-sage">People-Powered</span> Hiring
              </h2>
              <p className="text-xl text-background/70 mb-16 max-w-3xl mx-auto">
                We're flipping recruitment on its head. Instead of agencies taking everything, we split the fee three ways—rewarding everyone who makes hiring happen.
              </p>

              {/* The 35/35/30 Model */}
              <div className="grid md:grid-cols-3 gap-6 mb-16">
                {[
                  { percent: 35, label: "Talent", desc: "Get paid for landing your own job", color: "bg-talent", icon: Users },
                  { percent: 35, label: "Referrer", desc: "Monetise your professional network", color: "bg-referrer", icon: Zap },
                  { percent: 30, label: "Platform", desc: "We keep the lights on", color: "bg-brand", icon: Target },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                    className="relative p-8 bg-background/5 backdrop-blur-sm rounded-3xl border border-background/10 overflow-hidden"
                  >
                    <div className={`absolute top-0 left-0 right-0 h-1 ${item.color}`} />
                    <item.icon className={`w-10 h-10 mb-4 ${item.color === 'bg-talent' ? 'text-talent' : item.color === 'bg-referrer' ? 'text-referrer' : 'text-brand'}`} />
                    <div className="text-5xl font-heading font-bold text-background mb-2">
                      <AnimatedCounter value={item.percent} suffix="%" delay={0.5 + index * 0.2} />
                    </div>
                    <p className="text-xl font-heading font-semibold text-background mb-2">{item.label}</p>
                    <p className="text-background/60">{item.desc}</p>
                  </motion.div>
                ))}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={solutionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-8 bg-sage/10 border border-sage/30 rounded-3xl"
              >
                <p className="text-xl md:text-2xl font-heading">
                  "I landed my dream job AND got paid <span className="text-sage font-bold">£3,000</span> through Refer'd!"
                </p>
                <p className="text-background/60 mt-4">— Happy talent, counting their bonus</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* MARKET OPPORTUNITY */}
        <section ref={marketRef} className="py-32 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={marketInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Market Opportunity</p>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold mb-16">
                A <span className="text-sage">Massive</span> Market Ripe for Disruption
              </h2>

              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  { value: 35, prefix: "£", suffix: "B", label: "UK Recruitment Market", sub: "Growing 5% YoY" },
                  { value: 500, prefix: "£", suffix: "B+", label: "Global TAM", sub: "Fragmented, ripe for disruption" },
                  { value: 40, suffix: "%", label: "Employee Referral Success Rate", sub: "vs 7% from job boards" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={marketInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                    className="text-center p-8 bg-gray-50 rounded-3xl"
                  >
                    <div className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-2">
                      <AnimatedCounter value={item.value} prefix={item.prefix} suffix={item.suffix} delay={0.4 + index * 0.15} />
                    </div>
                    <p className="text-lg font-semibold text-foreground">{item.label}</p>
                    <p className="text-muted-foreground text-sm mt-1">{item.sub}</p>
                  </motion.div>
                ))}
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={marketInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 }}
                  className="p-8 bg-foreground text-background rounded-3xl"
                >
                  <TrendingUp className="w-10 h-10 text-sage mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Why Now?</h3>
                  <ul className="space-y-3 text-background/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>Remote work explosion = global talent pools</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>Gen Z demands transparency & fairness</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>LinkedIn normalised networking for jobs</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>Companies cutting recruitment costs</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={marketInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="p-8 bg-sage/10 border border-sage/30 rounded-3xl"
                >
                  <Rocket className="w-10 h-10 text-sage mb-4" />
                  <h3 className="text-2xl font-heading font-bold mb-4">Our Unfair Advantage</h3>
                  <ul className="space-y-3 text-foreground/80">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>First mover in three-way split model</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>AI-powered salary intelligence</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>Network effects create moat</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                      <span>Premium subscriptions drive recurring revenue</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* BUSINESS MODEL */}
        <section ref={modelRef} className="py-32 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={modelInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-sage mb-4">Business Model</p>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold mb-6">
                Two Revenue Streams, <span className="text-sage">Infinite Potential</span>
              </h2>
              <p className="text-xl text-background/70 mb-16 max-w-3xl">
                We monetise through success fees AND premium subscriptions—creating both transactional and recurring revenue.
              </p>

              {/* Revenue Stream 1: Platform Fee */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={modelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="mb-12 p-8 bg-background/5 border border-background/10 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
                    <Percent className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Success Fee: 30% Platform Take</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  <div className="p-6 bg-foreground/5 rounded-2xl">
                    <p className="text-3xl font-heading font-bold text-sage">£10k</p>
                    <p className="text-background/70">Average referral fee</p>
                  </div>
                  <div className="p-6 bg-foreground/5 rounded-2xl">
                    <p className="text-3xl font-heading font-bold text-sage">£3k</p>
                    <p className="text-background/70">Platform revenue per hire</p>
                  </div>
                  <div className="p-6 bg-foreground/5 rounded-2xl">
                    <p className="text-3xl font-heading font-bold text-sage">70%</p>
                    <p className="text-background/70">Gross margin</p>
                  </div>
                </div>
              </motion.div>

              {/* Revenue Stream 2: Subscriptions */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={modelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="p-8 bg-sage/10 border border-sage/30 rounded-3xl"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-sage rounded-full flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-foreground" />
                  </div>
                  <h3 className="text-2xl font-heading font-bold">Premium Subscriptions</h3>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6">
                  {[
                    { name: "Starter", price: "Free", features: ["Unlimited referrals", "Basic tracking", "Email notifications"] },
                    { name: "Pro", price: "£49/mo", features: ["Priority placement", "Advanced analytics", "Dedicated manager"], featured: true },
                    { name: "Enterprise", price: "Custom", features: ["Team collaboration", "API integrations", "White-label"] },
                  ].map((plan, index) => (
                    <div 
                      key={plan.name}
                      className={`p-6 rounded-2xl ${plan.featured ? 'bg-sage text-foreground' : 'bg-background/10'}`}
                    >
                      <p className="text-sm uppercase tracking-wider mb-2 opacity-70">{plan.name}</p>
                      <p className="text-2xl font-heading font-bold mb-4">{plan.price}</p>
                      <ul className="space-y-2 text-sm">
                        {plan.features.map((f) => (
                          <li key={f} className="flex items-center gap-2">
                            <CheckCircle2 className="w-4 h-4" />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* TRACTION & PROJECTIONS */}
        <section ref={tractionRef} className="py-32 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={tractionInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Traction & Projections</p>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold mb-16">
                The Numbers <span className="text-sage">Speak</span>
              </h2>

              <div className="grid md:grid-cols-4 gap-6 mb-16">
                {[
                  { value: 2500000, prefix: "£", suffix: "+", label: "Paid Out" },
                  { value: 15000, suffix: "+", label: "Successful Referrals" },
                  { value: 4500, suffix: "+", label: "Active Users" },
                  { value: 98, suffix: "%", label: "Satisfaction Rate" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    animate={tractionInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.1 * index }}
                    className="text-center p-6 bg-gray-50 rounded-2xl"
                  >
                    <div className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-1">
                      <AnimatedCounter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} delay={0.3 + index * 0.1} />
                    </div>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* 5-Year Projections */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={tractionInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="p-8 bg-foreground text-background rounded-3xl"
              >
                <h3 className="text-2xl font-heading font-bold mb-8">5-Year Revenue Projections</h3>
                <div className="grid grid-cols-5 gap-4">
                  {[
                    { year: "Y1", revenue: "£500k", users: "10k" },
                    { year: "Y2", revenue: "£2M", users: "50k" },
                    { year: "Y3", revenue: "£8M", users: "200k" },
                    { year: "Y4", revenue: "£25M", users: "500k" },
                    { year: "Y5", revenue: "£75M", users: "1.5M" },
                  ].map((item, index) => (
                    <div key={item.year} className="text-center">
                      <div className="relative mb-4">
                        <div 
                          className="bg-sage rounded-t-lg mx-auto w-12"
                          style={{ height: `${40 + index * 30}px` }}
                        />
                      </div>
                      <p className="text-sm text-background/60">{item.year}</p>
                      <p className="text-lg font-heading font-bold text-sage">{item.revenue}</p>
                      <p className="text-xs text-background/50">{item.users} users</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* EIS / SEIS BENEFITS */}
        <section ref={eisRef} className="py-32 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={eisInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto"
            >
              <div className="flex items-center gap-4 mb-6">
                <Shield className="w-10 h-10 text-sage" />
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-sage">Tax-Efficient Investment</p>
                  <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold">
                    SEIS & EIS <span className="text-sage">Eligible</span>
                  </h2>
                </div>
              </div>
              <p className="text-xl text-background/70 mb-12 max-w-3xl">
                Maximise your returns with government-backed tax reliefs. Your investment works harder for you.
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* SEIS */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={eisInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="p-8 bg-sage/10 border border-sage/30 rounded-3xl"
                >
                  <h3 className="text-2xl font-heading font-bold mb-6 text-sage">SEIS Benefits</h3>
                  <ul className="space-y-4">
                    {[
                      "50% income tax relief on investments up to £200k",
                      "CGT exemption on gains if held 3+ years",
                      "Loss relief up to 86.5% of investment",
                      "CGT reinvestment relief",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                        <span className="text-background/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* EIS */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={eisInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="p-8 bg-background/5 border border-background/10 rounded-3xl"
                >
                  <h3 className="text-2xl font-heading font-bold mb-6 text-mustard">EIS Benefits</h3>
                  <ul className="space-y-4">
                    {[
                      "30% income tax relief on investments up to £1M",
                      "CGT exemption on gains if held 3+ years",
                      "Inheritance tax relief after 2 years",
                      "Loss relief against income or CGT",
                    ].map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-mustard flex-shrink-0 mt-0.5" />
                        <span className="text-background/80">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={eisInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="mt-12 p-6 bg-sage text-foreground rounded-2xl text-center"
              >
                <p className="text-lg font-heading font-semibold">
                  Example: Invest £50k → Receive £15k tax relief → Effective investment of £35k
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* THE ASK */}
        <section ref={askRef} className="py-32 bg-background text-foreground relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-sage rounded-full blur-3xl" />
            <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-mustard rounded-full blur-3xl" />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={askInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <p className="text-xs uppercase tracking-[0.3em] text-sage mb-4">The Ask</p>
              <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold mb-8">
                Join the <span className="text-sage">Revolution</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <div className="p-8 bg-foreground text-background rounded-3xl">
                  <PoundSterling className="w-12 h-12 text-sage mx-auto mb-4" />
                  <p className="text-4xl font-heading font-bold text-sage mb-2">£1M</p>
                  <p className="text-xl font-semibold mb-1">Seed Round</p>
                  <p className="text-background/60">SEIS/EIS Eligible</p>
                </div>
                <div className="p-8 bg-sage/10 border border-sage/30 rounded-3xl">
                  <Target className="w-12 h-12 text-sage mx-auto mb-4" />
                  <p className="text-4xl font-heading font-bold text-sage mb-2">£4M</p>
                  <p className="text-xl font-semibold mb-1">Pre-Money Valuation</p>
                  <p className="text-muted-foreground">20% equity for round</p>
                </div>
              </div>

              <div className="mb-12">
                <h3 className="text-2xl font-heading font-bold mb-6">Use of Funds</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { percent: "40%", label: "Product & Engineering" },
                    { percent: "30%", label: "Growth Marketing" },
                    { percent: "20%", label: "Sales & Partnerships" },
                    { percent: "10%", label: "Operations" },
                  ].map((item) => (
                    <div key={item.label} className="p-4 bg-gray-50 rounded-xl">
                      <p className="text-2xl font-heading font-bold text-sage">{item.percent}</p>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              <motion.a
                href="mailto:invest@referd.com"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-3 px-10 py-5 bg-sage text-foreground rounded-full font-heading font-bold text-xl"
              >
                <span>Let's Talk</span>
                <ArrowRight className="w-6 h-6" />
              </motion.a>

              <p className="text-muted-foreground mt-8 text-sm">
                invest@referd.com • Deck available on request
              </p>
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </PageTransition>
  );
};

export default InvestorDeck;
