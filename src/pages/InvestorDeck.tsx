import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { ArrowRight, ArrowDown, Skull, Flame, Zap, Crown, Coins, TrendingUp, Users, Shield, Target, Rocket, X, Check, PoundSterling, BarChart3, Sparkles } from "lucide-react";

const InvestorDeck = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const heroRef = useRef(null);
  const deathRef = useRef(null);
  const rebirthRef = useRef(null);
  const modelRef = useRef(null);
  const numbersRef = useRef(null);
  const eisRef = useRef(null);
  const askRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const deathInView = useInView(deathRef, { once: true, margin: "-20%" });
  const rebirthInView = useInView(rebirthRef, { once: true, margin: "-20%" });
  const modelInView = useInView(modelRef, { once: true, margin: "-20%" });
  const numbersInView = useInView(numbersRef, { once: true, margin: "-20%" });
  const eisInView = useInView(eisRef, { once: true, margin: "-20%" });
  const askInView = useInView(askRef, { once: true, margin: "-20%" });

  const { scrollYProgress } = useScroll();
  const noiseOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.03, 0.05, 0.03]);

  // Counter animation
  const Counter = ({ value, prefix = "", suffix = "", delay = 0 }: { value: number; prefix?: string; suffix?: string; delay?: number }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const inView = useInView(ref, { once: true });

    useEffect(() => {
      if (inView) {
        const timeout = setTimeout(() => {
          let start = 0;
          const end = value;
          const duration = 2000;
          const increment = end / (duration / 16);
          
          const timer = setInterval(() => {
            start += increment;
            if (start >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, 16);
          
          return () => clearInterval(timer);
        }, delay * 1000);
        return () => clearTimeout(timeout);
      }
    }, [inView, value, delay]);

    return <span ref={ref}>{prefix}{count.toLocaleString()}{suffix}</span>;
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-foreground text-background overflow-hidden" ref={containerRef}>
        <SiteHeader />
        
        {/* Noise overlay */}
        <motion.div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{ 
            opacity: noiseOpacity,
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* ===== SLIDE 1: TITLE ===== */}
        <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Animated gradient orbs */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.2, 1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-talent/20 rounded-full blur-[120px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                x: [0, -40, 0],
                y: [0, 40, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-referrer/20 rounded-full blur-[100px]"
            />
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-brand/15 rounded-full blur-[80px]"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={heroInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.5 }}
              className="text-center max-w-6xl mx-auto"
            >
              {/* Pre-title */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="inline-flex items-center gap-3 mb-8"
              >
                <div className="h-px w-12 bg-gradient-to-r from-transparent to-talent" />
                <span className="text-xs uppercase tracking-[0.4em] text-talent font-medium">SEIS/EIS Eligible • Seed Round</span>
                <div className="h-px w-12 bg-gradient-to-l from-transparent to-talent" />
              </motion.div>

              {/* Main title - MASSIVE */}
              <motion.h1
                initial={{ opacity: 0, y: 60 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold leading-[0.85] tracking-tight mb-8"
              >
                <span className="block text-background">KILL THE</span>
                <span className="block bg-gradient-to-r from-talent via-referrer to-brand bg-clip-text text-transparent">RECRUITER</span>
              </motion.h1>

              {/* Subhead */}
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={heroInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="text-xl md:text-2xl text-background/60 max-w-2xl mx-auto mb-16 font-body"
              >
                Recruitment agencies take <span className="text-background font-semibold">30% of your salary</span> and give you nothing. 
                We're flipping that model and putting money back where it belongs.
              </motion.p>

              {/* The Ask - Hero */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 1.1 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8"
              >
                <div className="px-10 py-6 bg-background text-foreground rounded-2xl">
                  <p className="text-sm uppercase tracking-wider text-foreground/60 mb-1">Raising</p>
                  <p className="text-5xl font-heading font-bold">£1M</p>
                </div>
                <div className="px-10 py-6 border-2 border-background/20 rounded-2xl">
                  <p className="text-sm uppercase tracking-wider text-background/60 mb-1">Pre-Money</p>
                  <p className="text-5xl font-heading font-bold text-talent">£4M</p>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-wider text-background/40">Scroll to disrupt</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ArrowDown className="w-5 h-5 text-background/40" />
            </motion.div>
          </motion.div>
        </section>

        {/* ===== SLIDE 2: THE DEATH OF RECRUITMENT ===== */}
        <section ref={deathRef} className="min-h-screen flex items-center py-32 bg-background text-foreground relative overflow-hidden">
          {/* Blood splatter decoration */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-rose/10 to-transparent" />
          
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={deathInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-16">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={deathInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-rose rounded-2xl flex items-center justify-center"
                >
                  <Skull className="w-8 h-8 text-background" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-rose font-medium">The Problem</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold">Recruitment is Dead</h2>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                {[
                  { stat: "£35B", label: "UK recruitment industry", icon: Coins, color: "rose" },
                  { stat: "30%", label: "Average agency cut", icon: X, color: "rose" },
                  { stat: "85%", label: "Jobs filled via networks", icon: Users, color: "talent" },
                  { stat: "0%", label: "Referrers get paid", icon: X, color: "rose" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 40 }}
                    animate={deathInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className={`p-8 rounded-3xl border-2 ${
                      item.color === 'rose' ? 'border-rose/30 bg-rose/5' : 'border-talent/30 bg-talent/5'
                    }`}
                  >
                    <item.icon className={`w-8 h-8 mb-4 ${item.color === 'rose' ? 'text-rose' : 'text-talent'}`} />
                    <p className={`text-5xl font-heading font-bold mb-2 ${item.color === 'rose' ? 'text-rose' : 'text-talent'}`}>
                      {item.stat}
                    </p>
                    <p className="text-foreground/60 font-body">{item.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* The Problem Quote */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={deathInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
                className="p-10 bg-foreground text-background rounded-3xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-rose/20 rounded-full blur-3xl" />
                <Flame className="w-10 h-10 text-rose mb-6" />
                <blockquote className="text-2xl md:text-3xl font-heading font-medium leading-relaxed relative z-10">
                  "My recruiter just priced me out of my dream job. They're charging <span className="text-rose">£25,000</span> for a few emails. 
                  <br />That money should be <span className="text-talent">MINE</span>."
                </blockquote>
                <p className="mt-6 text-background/50 text-sm uppercase tracking-wider">— Every frustrated candidate, everywhere</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SLIDE 3: THE REBIRTH - OUR MODEL ===== */}
        <section ref={rebirthRef} className="min-h-screen flex items-center py-32 bg-foreground text-background relative">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={rebirthInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={rebirthInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-talent rounded-2xl flex items-center justify-center"
                >
                  <Zap className="w-8 h-8 text-foreground" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-talent font-medium">The Solution</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold">Refer'd: The Anti-Agency</h2>
                </div>
              </div>

              {/* The Big Idea */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={rebirthInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-center mb-20"
              >
                <p className="text-xl md:text-2xl text-background/70 max-w-3xl mx-auto font-body">
                  Instead of agencies keeping everything, we <span className="text-background font-semibold">split the fee three ways</span>. 
                  Talent gets paid. Referrers get paid. Everyone wins.
                </p>
              </motion.div>

              {/* The 35/35/30 Split - Visual */}
              <div className="grid md:grid-cols-3 gap-8 mb-16">
                {[
                  { 
                    percent: 35, 
                    label: "TALENT", 
                    desc: "Get paid for landing your own job. Yes, really.", 
                    color: "talent",
                    example: "£3,500",
                    icon: Crown 
                  },
                  { 
                    percent: 35, 
                    label: "REFERRER", 
                    desc: "Your network is worth money. Cash it in.", 
                    color: "referrer",
                    example: "£3,500",
                    icon: Users 
                  },
                  { 
                    percent: 30, 
                    label: "PLATFORM", 
                    desc: "We keep the lights on and the revolution going.", 
                    color: "brand",
                    example: "£3,000",
                    icon: Rocket 
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, y: 60, rotateX: 15 }}
                    animate={rebirthInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.4 + index * 0.15 }}
                    className={`relative p-10 rounded-3xl border-2 overflow-hidden group
                      ${item.color === 'talent' ? 'border-talent/40 bg-talent/5' : ''}
                      ${item.color === 'referrer' ? 'border-referrer/40 bg-referrer/5' : ''}
                      ${item.color === 'brand' ? 'border-brand/40 bg-brand/5' : ''}
                    `}
                  >
                    {/* Glow effect */}
                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500
                      ${item.color === 'talent' ? 'bg-gradient-to-br from-talent/20 to-transparent' : ''}
                      ${item.color === 'referrer' ? 'bg-gradient-to-br from-referrer/20 to-transparent' : ''}
                      ${item.color === 'brand' ? 'bg-gradient-to-br from-brand/20 to-transparent' : ''}
                    `} />
                    
                    <item.icon className={`w-10 h-10 mb-6 relative z-10
                      ${item.color === 'talent' ? 'text-talent' : ''}
                      ${item.color === 'referrer' ? 'text-referrer' : ''}
                      ${item.color === 'brand' ? 'text-brand' : ''}
                    `} />
                    
                    <p className={`text-7xl font-heading font-bold mb-2 relative z-10
                      ${item.color === 'talent' ? 'text-talent' : ''}
                      ${item.color === 'referrer' ? 'text-referrer' : ''}
                      ${item.color === 'brand' ? 'text-brand' : ''}
                    `}>
                      <Counter value={item.percent} suffix="%" delay={0.5 + index * 0.2} />
                    </p>
                    
                    <p className="text-lg font-heading font-bold uppercase tracking-wider mb-3 relative z-10">{item.label}</p>
                    <p className="text-background/60 font-body relative z-10">{item.desc}</p>
                    
                    <div className="mt-6 pt-6 border-t border-background/10 relative z-10">
                      <p className="text-sm text-background/40 uppercase tracking-wider">On £10k fee</p>
                      <p className={`text-2xl font-heading font-bold
                        ${item.color === 'talent' ? 'text-talent' : ''}
                        ${item.color === 'referrer' ? 'text-referrer' : ''}
                        ${item.color === 'brand' ? 'text-brand' : ''}
                      `}>{item.example}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Happy ending quote */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={rebirthInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.9 }}
                className="p-10 bg-talent/10 border-2 border-talent/30 rounded-3xl text-center"
              >
                <Sparkles className="w-10 h-10 text-talent mx-auto mb-6" />
                <blockquote className="text-2xl md:text-3xl font-heading font-medium">
                  "I landed my dream job AND got paid <span className="text-talent font-bold">£3,500</span> for it. 
                  <br />Recruitment will never be the same."
                </blockquote>
                <p className="mt-6 text-background/50 text-sm uppercase tracking-wider">— Actual Refer'd talent</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SLIDE 4: BUSINESS MODEL ===== */}
        <section ref={modelRef} className="min-h-screen flex items-center py-32 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={modelInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={modelInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center"
                >
                  <BarChart3 className="w-8 h-8 text-background" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-foreground/50 font-medium">Business Model</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold">Two Revenue Engines</h2>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-8">
                {/* Engine 1: Platform Fee */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={modelInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="p-10 bg-foreground text-background rounded-3xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-talent rounded-xl flex items-center justify-center">
                      <Coins className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold">Success Fees</h3>
                  </div>
                  
                  <p className="text-4xl font-heading font-bold text-talent mb-4">30% Platform Take</p>
                  <p className="text-background/70 mb-8 font-body">
                    Every successful placement = revenue. No placement? No fee. We only win when everyone wins.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-4 bg-background/5 rounded-xl">
                      <span className="text-background/60">Average fee per hire</span>
                      <span className="font-heading font-bold text-xl">£10,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/5 rounded-xl">
                      <span className="text-background/60">Platform revenue</span>
                      <span className="font-heading font-bold text-xl text-talent">£3,000</span>
                    </div>
                    <div className="flex justify-between items-center p-4 bg-background/5 rounded-xl">
                      <span className="text-background/60">Gross margin</span>
                      <span className="font-heading font-bold text-xl text-talent">~70%</span>
                    </div>
                  </div>
                </motion.div>

                {/* Engine 2: Subscriptions */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={modelInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="p-10 border-2 border-foreground/10 rounded-3xl"
                >
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-referrer rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-6 h-6 text-foreground" />
                    </div>
                    <h3 className="text-2xl font-heading font-bold">Premium Subscriptions</h3>
                  </div>
                  
                  <p className="text-foreground/70 mb-8 font-body">
                    Recurring revenue from power users who want priority placement, analytics, and advanced features.
                  </p>
                  
                  <div className="space-y-4">
                    {[
                      { name: "Free", price: "£0", features: "Unlimited referrals, basic tracking" },
                      { name: "Pro", price: "£49/mo", features: "Priority placement, analytics, dedicated support", featured: true },
                      { name: "Enterprise", price: "Custom", features: "API, white-label, team features" },
                    ].map((plan) => (
                      <div 
                        key={plan.name}
                        className={`p-4 rounded-xl ${plan.featured ? 'bg-referrer/10 border-2 border-referrer/30' : 'bg-foreground/5'}`}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-heading font-bold">{plan.name}</span>
                          <span className={`font-heading font-bold ${plan.featured ? 'text-referrer' : ''}`}>{plan.price}</span>
                        </div>
                        <p className="text-sm text-foreground/50">{plan.features}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>

              {/* Market Size */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={modelInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mt-12 grid md:grid-cols-3 gap-6"
              >
                {[
                  { value: 35, prefix: "£", suffix: "B", label: "UK Market", sub: "Growing 5% YoY" },
                  { value: 500, prefix: "£", suffix: "B+", label: "Global TAM", sub: "Fragmented, ripe for disruption" },
                  { value: 40, suffix: "%", label: "Referral Success Rate", sub: "vs 7% from job boards" },
                ].map((item, index) => (
                  <div key={item.label} className="p-8 bg-foreground/5 rounded-2xl text-center">
                    <p className="text-4xl font-heading font-bold text-foreground mb-2">
                      <Counter value={item.value} prefix={item.prefix} suffix={item.suffix} delay={0.7 + index * 0.1} />
                    </p>
                    <p className="font-heading font-semibold">{item.label}</p>
                    <p className="text-sm text-foreground/50 mt-1">{item.sub}</p>
                  </div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SLIDE 5: THE NUMBERS ===== */}
        <section ref={numbersRef} className="min-h-screen flex items-center py-32 bg-foreground text-background">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={numbersInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={numbersInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center"
                >
                  <TrendingUp className="w-8 h-8 text-foreground" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-background/50 font-medium">Traction & Projections</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold">The Numbers Don't Lie</h2>
                </div>
              </div>

              {/* Current Traction */}
              <div className="grid md:grid-cols-4 gap-6 mb-16">
                {[
                  { value: 2500000, prefix: "£", suffix: "+", label: "Paid Out" },
                  { value: 15000, suffix: "+", label: "Successful Referrals" },
                  { value: 4500, suffix: "+", label: "Active Users" },
                  { value: 98, suffix: "%", label: "Satisfaction Rate" },
                ].map((stat, index) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={numbersInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="p-8 bg-background/5 border border-background/10 rounded-2xl text-center"
                  >
                    <p className="text-4xl md:text-5xl font-heading font-bold text-talent mb-2">
                      <Counter value={stat.value} prefix={stat.prefix} suffix={stat.suffix} delay={0.4 + index * 0.1} />
                    </p>
                    <p className="text-sm uppercase tracking-wider text-background/50">{stat.label}</p>
                  </motion.div>
                ))}
              </div>

              {/* 5-Year Projections */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={numbersInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="p-10 bg-background text-foreground rounded-3xl"
              >
                <h3 className="text-2xl font-heading font-bold mb-8">5-Year Revenue Trajectory</h3>
                
                <div className="flex items-end justify-between gap-4 h-64 mb-8">
                  {[
                    { year: "Y1", revenue: "£500K", height: "15%" },
                    { year: "Y2", revenue: "£2M", height: "30%" },
                    { year: "Y3", revenue: "£8M", height: "50%" },
                    { year: "Y4", revenue: "£25M", height: "70%" },
                    { year: "Y5", revenue: "£75M", height: "100%" },
                  ].map((item, index) => (
                    <motion.div
                      key={item.year}
                      initial={{ height: 0 }}
                      animate={numbersInView ? { height: item.height } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.15, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 bg-gradient-to-t from-talent to-referrer rounded-t-xl relative group"
                    >
                      <div className="absolute -top-16 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="bg-foreground text-background px-3 py-1 rounded-lg text-sm font-heading font-bold whitespace-nowrap">
                          {item.revenue}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
                
                <div className="flex justify-between">
                  {["Y1", "Y2", "Y3", "Y4", "Y5"].map((year) => (
                    <span key={year} className="text-sm font-heading font-medium text-foreground/50">{year}</span>
                  ))}
                </div>
                
                <div className="mt-8 pt-8 border-t border-foreground/10 grid grid-cols-3 gap-8 text-center">
                  <div>
                    <p className="text-3xl font-heading font-bold text-talent">£75M</p>
                    <p className="text-sm text-foreground/50 uppercase tracking-wider">Y5 Revenue</p>
                  </div>
                  <div>
                    <p className="text-3xl font-heading font-bold text-referrer">1.5M</p>
                    <p className="text-sm text-foreground/50 uppercase tracking-wider">Y5 Users</p>
                  </div>
                  <div>
                    <p className="text-3xl font-heading font-bold text-brand">150x</p>
                    <p className="text-sm text-foreground/50 uppercase tracking-wider">Growth Multiple</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SLIDE 6: TAX BENEFITS ===== */}
        <section ref={eisRef} className="min-h-screen flex items-center py-32 bg-background text-foreground">
          <div className="container mx-auto px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={eisInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-6xl mx-auto"
            >
              {/* Section header */}
              <div className="flex items-center gap-4 mb-16">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={eisInView ? { scale: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
                  className="w-16 h-16 bg-talent rounded-2xl flex items-center justify-center"
                >
                  <Shield className="w-8 h-8 text-foreground" />
                </motion.div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-talent font-medium">Tax-Efficient Investment</p>
                  <h2 className="text-4xl md:text-5xl font-heading font-bold">SEIS & EIS Eligible</h2>
                </div>
              </div>

              <p className="text-xl text-foreground/70 mb-12 max-w-3xl font-body">
                Maximise your returns with government-backed tax reliefs. Your investment works harder for you.
              </p>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {/* SEIS */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={eisInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="p-10 bg-talent/10 border-2 border-talent/30 rounded-3xl"
                >
                  <h3 className="text-2xl font-heading font-bold mb-6 text-talent">SEIS Benefits</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Check, text: "50% income tax relief on investments up to £200k" },
                      { icon: Check, text: "CGT exemption on gains if held 3+ years" },
                      { icon: Check, text: "Loss relief up to 86.5% of investment" },
                      { icon: Check, text: "CGT reinvestment relief available" },
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <benefit.icon className="w-5 h-5 text-talent flex-shrink-0 mt-1" />
                        <span className="text-foreground/80 font-body">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                {/* EIS */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={eisInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="p-10 bg-referrer/10 border-2 border-referrer/30 rounded-3xl"
                >
                  <h3 className="text-2xl font-heading font-bold mb-6 text-referrer">EIS Benefits</h3>
                  <ul className="space-y-4">
                    {[
                      { icon: Check, text: "30% income tax relief on investments up to £1M" },
                      { icon: Check, text: "CGT exemption on gains if held 3+ years" },
                      { icon: Check, text: "Inheritance tax relief after 2 years" },
                      { icon: Check, text: "Loss relief against income or CGT" },
                    ].map((benefit, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <benefit.icon className="w-5 h-5 text-referrer flex-shrink-0 mt-1" />
                        <span className="text-foreground/80 font-body">{benefit.text}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Example calculation */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={eisInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="p-8 bg-foreground text-background rounded-2xl"
              >
                <h4 className="text-lg font-heading font-bold mb-6 text-center">Example: £50,000 SEIS Investment</h4>
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                  <div className="text-center">
                    <p className="text-3xl font-heading font-bold">£50,000</p>
                    <p className="text-sm text-background/50">Investment</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-talent rotate-90 md:rotate-0" />
                  <div className="text-center">
                    <p className="text-3xl font-heading font-bold text-talent">-£25,000</p>
                    <p className="text-sm text-background/50">Tax Relief (50%)</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-talent rotate-90 md:rotate-0" />
                  <div className="text-center">
                    <p className="text-3xl font-heading font-bold text-talent">£25,000</p>
                    <p className="text-sm text-background/50">Effective Cost</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* ===== SLIDE 7: THE ASK ===== */}
        <section ref={askRef} className="min-h-screen flex items-center py-32 bg-foreground text-background relative overflow-hidden">
          {/* Animated background */}
          <div className="absolute inset-0">
            <motion.div 
              animate={{ 
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
              }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-conic from-talent via-referrer to-brand opacity-10 blur-[100px] rounded-full"
            />
          </div>

          <div className="container mx-auto px-6 relative z-10">
            <motion.div
              initial={{ opacity: 0 }}
              animate={askInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8 }}
              className="max-w-4xl mx-auto text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={askInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <p className="text-xs uppercase tracking-[0.4em] text-talent font-medium mb-6">The Ask</p>
                <h2 className="text-5xl md:text-7xl font-heading font-bold mb-8">
                  Join the
                  <br />
                  <span className="bg-gradient-to-r from-talent via-referrer to-brand bg-clip-text text-transparent">Revolution</span>
                </h2>
              </motion.div>

              {/* Investment cards */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={askInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid md:grid-cols-2 gap-8 mb-16"
              >
                <div className="p-10 bg-background text-foreground rounded-3xl">
                  <PoundSterling className="w-12 h-12 text-talent mx-auto mb-4" />
                  <p className="text-6xl font-heading font-bold text-talent mb-2">£1M</p>
                  <p className="text-xl font-heading font-semibold">Seed Round</p>
                  <p className="text-foreground/50 mt-2">SEIS/EIS Eligible</p>
                </div>
                <div className="p-10 border-2 border-background/20 rounded-3xl">
                  <Target className="w-12 h-12 text-referrer mx-auto mb-4" />
                  <p className="text-6xl font-heading font-bold text-referrer mb-2">£4M</p>
                  <p className="text-xl font-heading font-semibold">Pre-Money</p>
                  <p className="text-background/50 mt-2">20% equity for round</p>
                </div>
              </motion.div>

              {/* Use of Funds */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={askInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="mb-16"
              >
                <h3 className="text-xl font-heading font-bold mb-8">Use of Funds</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { percent: "40%", label: "Product & Engineering", color: "talent" },
                    { percent: "30%", label: "Growth Marketing", color: "referrer" },
                    { percent: "20%", label: "Sales & Partnerships", color: "brand" },
                    { percent: "10%", label: "Operations", color: "background" },
                  ].map((item) => (
                    <div key={item.label} className="p-6 bg-background/5 border border-background/10 rounded-xl">
                      <p className={`text-3xl font-heading font-bold mb-2 ${
                        item.color === 'talent' ? 'text-talent' :
                        item.color === 'referrer' ? 'text-referrer' :
                        item.color === 'brand' ? 'text-brand' : 'text-background'
                      }`}>{item.percent}</p>
                      <p className="text-sm text-background/60">{item.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={askInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <motion.a
                  href="mailto:invest@referd.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className="inline-flex items-center gap-4 px-12 py-6 bg-gradient-to-r from-talent to-referrer text-foreground rounded-full font-heading font-bold text-xl"
                >
                  <span>Let's Build the Future</span>
                  <ArrowRight className="w-6 h-6" />
                </motion.a>
                
                <p className="text-background/40 mt-8 text-sm">
                  invest@referd.com • Full deck available on request
                </p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        <SiteFooter />
      </div>
    </PageTransition>
  );
};

export default InvestorDeck;
