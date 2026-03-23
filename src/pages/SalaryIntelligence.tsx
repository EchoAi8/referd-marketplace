import { useEffect, useRef, useState, useMemo } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import PageLayout from "@/components/layout/PageLayout";
import {
  ArrowRight, Shield, TrendingUp, Clock, X, Zap, Eye, Sparkles,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell, PieChart, Pie, RadialBarChart, RadialBar,
} from "recharts";

/* ─── Constants ─── */
const INDUSTRIES = [
  "Technology", "Finance & Banking", "Healthcare", "Legal",
  "Marketing & Advertising", "Consulting", "E-commerce",
  "Manufacturing", "Real Estate", "Media & Entertainment",
];
const COMPANY_SIZES = [
  { value: "1-50", label: "Startup (1-50)" },
  { value: "51-200", label: "Small (51-200)" },
  { value: "201-1000", label: "Mid-size (201-1K)" },
  { value: "1001-5000", label: "Large (1K-5K)" },
  { value: "5000+", label: "Enterprise (5K+)" },
];

/* ─── Chart data ─── */
const SALARY_TREND_DATA = [
  { month: "Jan", market: 78000, you: 65000 },
  { month: "Feb", market: 79500, you: 65000 },
  { month: "Mar", market: 81000, you: 67000 },
  { month: "Apr", market: 83000, you: 67000 },
  { month: "May", market: 85000, you: 68000 },
  { month: "Jun", market: 87500, you: 68000 },
  { month: "Jul", market: 89000, you: 70000 },
  { month: "Aug", market: 91000, you: 70000 },
  { month: "Sep", market: 92400, you: 72000 },
];

const INDUSTRY_COMPARISON = [
  { name: "Tech", salary: 95000, fill: "hsl(83, 69%, 72%)" },
  { name: "Finance", salary: 88000, fill: "hsl(48, 100%, 50%)" },
  { name: "Legal", salary: 82000, fill: "hsl(330, 100%, 84%)" },
  { name: "Healthcare", salary: 76000, fill: "hsl(83, 55%, 58%)" },
  { name: "Marketing", salary: 71000, fill: "hsl(48, 100%, 40%)" },
];

const PERCENTILE_DATA = [{ name: "You", value: 72, fill: "hsl(83, 69%, 72%)" }];

const COMP_BREAKDOWN = [
  { name: "Base", value: 75000, fill: "hsl(83, 69%, 72%)" },
  { name: "Bonus", value: 12000, fill: "hsl(48, 100%, 50%)" },
  { name: "Equity", value: 18000, fill: "hsl(330, 100%, 84%)" },
  { name: "Benefits", value: 8000, fill: "hsl(83, 55%, 58%)" },
];

/* ─── Live Activity Feed ─── */
const LIVE_ACTIVITIES = [
  "Sarah in London just discovered she's underpaid by £22K",
  "Marketing Director in Manchester got +28% after using this",
  "3 people in your industry ran reports in the last 5 min",
  "James in Bristol negotiated a £15K raise with his report",
  "A Product Manager just found £19K gap — shared with manager",
  "Senior Engineer uncovered £31K in missing compensation",
];

/* ─── Main Page ─── */
const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const formRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    jobTitle: "", location: "", yearsExperience: "", industry: "",
    baseSalary: "", bonus: "", equity: "", benefits: "", companySize: "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const calculateTotalComp = () => {
    const base = parseInt(formData.baseSalary.replace(/[^0-9]/g, "")) || 0;
    const bonus = parseInt(formData.bonus.replace(/[^0-9]/g, "")) || 0;
    const equity = parseInt(formData.equity.replace(/[^0-9]/g, "")) || 0;
    const benefits = parseInt(formData.benefits.replace(/[^0-9]/g, "")) || 0;
    return base + bonus + equity + benefits;
  };

  const handleAnalyze = async () => {
    if (!formData.jobTitle || !formData.industry || !formData.baseSalary) {
      toast.error("Please fill in Job Title, Industry, and Base Salary");
      return;
    }
    const totalComp = calculateTotalComp();
    sessionStorage.setItem("pendingMarketPulseAnalysis", JSON.stringify({
      jobTitle: formData.jobTitle,
      location: formData.location || "United Kingdom",
      yearsExperience: parseInt(formData.yearsExperience) || 3,
      industry: formData.industry,
      currentSalary: totalComp || parseInt(formData.baseSalary.replace(/[^0-9]/g, "")),
      companySize: formData.companySize || "51-200",
    }));
    navigateWithTransition("/auth?redirect=/dashboard&analysis=pending");
    toast.info("Sign in to view your personalised report");
  };

  useEffect(() => {
    document.title = "Salary Intelligence | Know Your True Worth | Referd";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "67% of professionals are underpaid. Discover your true market value with Referd's AI salary benchmarking across 120+ industries.");
    return () => { document.title = "Referd"; };
  }, []);

  return (
    <PageLayout>
      {/* ═══════════ HERO ═══════════ */}
      <SIHero onScrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />

      {/* ═══════════ LIVE ACTIVITY TICKER ═══════════ */}
      <LiveActivityTicker />

      {/* ═══════════ PHONE MOCKUP VISUAL ═══════════ */}
      <PhoneMockupSection />

      {/* ═══════════ INTERACTIVE DASHBOARD ═══════════ */}
      <InteractiveDashboard />

      {/* ═══════════ NARRATIVE ═══════════ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <NarrativeReveal />
        </div>
      </section>

      {/* ═══════════ LAPTOP MOCKUP ═══════════ */}
      <LaptopMockupSection />

      {/* ═══════════ FORM ═══════════ */}
      <section className="py-24 md:py-32 relative">
        <div ref={formRef} className="absolute -top-32" />
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="lg:sticky lg:top-32">
              <span className="text-xs font-mono text-sage uppercase tracking-[0.3em] mb-4 block">FREE — FOR NOW</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-foreground mb-6">
                Your Salary,<br /><span className="text-sage">Exposed</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                In 47 seconds, you'll know if you're being underpaid.
              </p>

              {/* Social proof avatars */}
              <div className="flex items-center gap-3 mb-8">
                <div className="flex -space-x-2">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-background bg-gradient-to-br from-sage/60 to-sage/20" />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  <span className="font-bold text-foreground">2,847</span> reports today
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <Shield className="w-3 h-3" />
                <span>256-bit encryption · data never shared</span>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}>
              <div className="rounded-2xl p-8 bg-background border border-border shadow-lg">
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-6 text-xs font-bold bg-rose/10 text-rose border border-rose/20">
                  <Clock className="w-3.5 h-3.5" />
                  <span>2,847 people ran this analysis today</span>
                </div>

                <h3 className="font-heading font-bold text-xl text-foreground mb-1">Your Market X-Ray</h3>
                <p className="text-sm text-muted-foreground mb-6">Takes 30 seconds. Changes everything.</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Job Title *" placeholder="e.g., Senior Engineer" value={formData.jobTitle} onChange={(v) => handleInputChange("jobTitle", v)} />
                    <div>
                      <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider text-muted-foreground">Industry *</label>
                      <Select value={formData.industry} onValueChange={(v) => handleInputChange("industry", v)}>
                        <SelectTrigger className="h-10 text-sm bg-background border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                    <FormField label="Location" placeholder="e.g., London" value={formData.location} onChange={(v) => handleInputChange("location", v)} />
                    <div>
                      <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider text-muted-foreground">Company Size</label>
                      <Select value={formData.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
                        <SelectTrigger className="h-10 text-sm bg-background border-border"><SelectValue placeholder="Select" /></SelectTrigger>
                        <SelectContent>{COMPANY_SIZES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}</SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 block">Compensation</span>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Base Salary (£) *" placeholder="75,000" value={formData.baseSalary} onChange={(v) => handleInputChange("baseSalary", v)} />
                      <FormField label="Annual Bonus (£)" placeholder="10,000" value={formData.bonus} onChange={(v) => handleInputChange("bonus", v)} />
                      <FormField label="Equity/RSUs (£/yr)" placeholder="15,000" value={formData.equity} onChange={(v) => handleInputChange("equity", v)} />
                      <FormField label="Benefits Value (£)" placeholder="5,000" value={formData.benefits} onChange={(v) => handleInputChange("benefits", v)} />
                    </div>
                    {calculateTotalComp() > 0 && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-3 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Total Package</span>
                          <span className="text-sage font-heading font-bold text-lg">£{calculateTotalComp().toLocaleString()}</span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  <FormField label="Years of Experience" placeholder="5" type="number" value={formData.yearsExperience} onChange={(v) => handleInputChange("yearsExperience", v)} />
                </div>

                <MagneticButton onClick={handleAnalyze} className="w-full mt-6 py-4 bg-sage text-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow" strength={0.3}>
                  {isLoading ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full" /> Processing...</>
                  ) : (
                    <>Reveal My True Worth <ArrowRight className="w-5 h-5" /></>
                  )}
                </MagneticButton>
                <p className="text-xs text-center mt-3 text-muted-foreground">Free · 47 sec analysis · No credit card</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-24 md:py-32 bg-foreground text-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `radial-gradient(circle at 30% 50%, hsl(var(--color-sage)) 0%, transparent 50%), radial-gradient(circle at 70% 50%, hsl(var(--color-rose)) 0%, transparent 50%)`,
        }} />
        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <motion.div initial={{ scale: 0 }} whileInView={{ scale: 1 }} viewport={{ once: true }} transition={{ type: "spring", delay: 0.2 }}
              className="w-16 h-16 mx-auto mb-8 rounded-2xl bg-sage/20 flex items-center justify-center">
              <Zap className="w-8 h-8 text-sage" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight mb-6">
              Every Day You Don't Know,<br />You're Losing <span className="text-rose">£50</span>
            </h2>
            <p className="text-lg text-background/60 mb-10 max-w-xl mx-auto">
              The average underpaid professional loses £18,000 a year. 47 seconds is all it takes.
            </p>
            <MagneticButton className="px-10 py-5 bg-sage text-foreground rounded-full font-bold text-lg" strength={0.4}
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}>
              Get My Free Report <ArrowRight className="w-5 h-5 ml-2 inline" />
            </MagneticButton>
          </motion.div>
        </div>
      </section>

      <SalaryFloatingCTA onScrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />
    </PageLayout>
  );
};

/* ═══════════ HERO ═══════════ */
const SIHero = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.95]);

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Animated gradient blobs */}
      <motion.div animate={{ x: [0, 30, 0], y: [0, -20, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 right-[10%] w-[400px] h-[400px] rounded-full blur-[150px] pointer-events-none bg-sage/8" />
      <motion.div animate={{ x: [0, -20, 0], y: [0, 30, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-20 left-[10%] w-[300px] h-[300px] rounded-full blur-[120px] pointer-events-none bg-rose/6" />

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 container mx-auto px-6">
        <motion.div style={{ y: heroY }} className="max-w-3xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-8">
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-rose/10 text-rose border border-rose/20">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-rose" />
              LIVE NOW
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[11vw] sm:text-[9vw] md:text-[7vw] lg:text-[5.5vw] font-heading font-bold leading-[0.9] tracking-tighter text-foreground">
            Are You Being<br /><span className="text-rose">Underpaid?</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-xl md:text-2xl max-w-xl leading-relaxed text-muted-foreground">
            Find out in <span className="font-bold text-foreground">47 seconds</span>.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }} className="mt-8 flex flex-wrap gap-4 items-center">
            <MagneticButton className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow" strength={0.4} onClick={onScrollToForm}>
              Find Out Now — Free <ArrowRight className="w-5 h-5 ml-2 inline" />
            </MagneticButton>
            <span className="text-sm text-muted-foreground">No credit card required</span>
          </motion.div>

          {/* Floating stats */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="mt-12 flex gap-8">
            {[
              { value: "67%", label: "are underpaid" },
              { value: "£18K", label: "avg increase" },
              { value: "47s", label: "to find out" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.4 + i * 0.1 }}>
                <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">Scroll</span>
          <motion.div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

/* ═══════════ LIVE ACTIVITY TICKER ═══════════ */
const LiveActivityTicker = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % LIVE_ACTIVITIES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="border-y border-border bg-foreground/[0.02] py-3 overflow-hidden">
      <div className="container mx-auto px-6">
        <AnimatePresence mode="wait">
          <motion.div key={activeIndex} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}
            className="flex items-center justify-center gap-3 text-sm">
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-sage flex-shrink-0" />
            <span className="text-muted-foreground">{LIVE_ACTIVITIES[activeIndex]}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

/* ═══════════ PHONE MOCKUP ═══════════ */
const PhoneMockupSection = () => {
  return (
    <section className="py-20 md:py-28 overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
            Your Career <span className="text-sage">X-Ray</span>
          </h2>
          <p className="text-muted-foreground text-lg">Instant insights, anywhere you are</p>
        </motion.div>

        <div className="flex justify-center items-end gap-6 md:gap-10">
          {/* Phone 1 */}
          <motion.div initial={{ opacity: 0, y: 60, rotate: -5 }} whileInView={{ opacity: 1, y: 0, rotate: -5 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}
            className="w-[180px] md:w-[220px] flex-shrink-0">
            <PhoneMockup>
              <div className="p-3 space-y-3">
                <div className="text-center">
                  <p className="text-[8px] text-muted-foreground font-mono uppercase">Your Percentile</p>
                  <p className="text-2xl font-heading font-bold text-sage">72nd</p>
                </div>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadialBarChart cx="50%" cy="50%" innerRadius="60%" outerRadius="90%" data={PERCENTILE_DATA} startAngle={180} endAngle={0}>
                      <RadialBar dataKey="value" cornerRadius={10} fill="hsl(83, 69%, 72%)" background={{ fill: "hsl(0, 0%, 94%)" }} />
                    </RadialBarChart>
                  </ResponsiveContainer>
                </div>
                <div className="bg-muted/50 rounded-lg p-2">
                  <p className="text-[7px] text-muted-foreground">Missing per year</p>
                  <p className="text-sm font-bold text-rose">£17,400</p>
                </div>
              </div>
            </PhoneMockup>
          </motion.div>

          {/* Phone 2 — center, bigger */}
          <motion.div initial={{ opacity: 0, y: 80 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.15 }}
            className="w-[200px] md:w-[260px] flex-shrink-0 relative z-10">
            <PhoneMockup>
              <div className="p-3 space-y-2">
                <p className="text-[8px] font-mono text-muted-foreground uppercase">Market Trend</p>
                <div className="h-32">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={SALARY_TREND_DATA}>
                      <defs>
                        <linearGradient id="phoneMktGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="hsl(83,69%,72%)" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="hsl(83,69%,72%)" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                      <Area type="monotone" dataKey="market" stroke="hsl(83,69%,72%)" strokeWidth={2} fill="url(#phoneMktGrad)" />
                      <Area type="monotone" dataKey="you" stroke="hsl(330,100%,84%)" strokeWidth={2} fill="transparent" strokeDasharray="4 4" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex gap-3 text-[7px]">
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-sage rounded" /> Market</span>
                  <span className="flex items-center gap-1"><span className="w-2 h-0.5 bg-rose rounded" /> You</span>
                </div>
                <div className="bg-sage/10 rounded-lg p-2 mt-1">
                  <p className="text-[7px] text-sage font-bold">↑ Market growing 12% YoY</p>
                </div>
              </div>
            </PhoneMockup>
          </motion.div>

          {/* Phone 3 */}
          <motion.div initial={{ opacity: 0, y: 60, rotate: 5 }} whileInView={{ opacity: 1, y: 0, rotate: 5 }}
            viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }}
            className="w-[180px] md:w-[220px] flex-shrink-0">
            <PhoneMockup>
              <div className="p-3 space-y-2">
                <p className="text-[8px] font-mono text-muted-foreground uppercase">Comp Breakdown</p>
                <div className="h-24">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={COMP_BREAKDOWN} cx="50%" cy="50%" innerRadius={25} outerRadius={40} dataKey="value" paddingAngle={2}>
                        {COMP_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-1">
                  {COMP_BREAKDOWN.map((c) => (
                    <div key={c.name} className="flex items-center justify-between text-[7px]">
                      <span className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: c.fill }} />
                        {c.name}
                      </span>
                      <span className="font-bold">£{(c.value / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </div>
            </PhoneMockup>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const PhoneMockup = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-foreground rounded-[2rem] p-2 shadow-2xl">
    <div className="bg-background rounded-[1.5rem] overflow-hidden">
      {/* Notch */}
      <div className="flex justify-center pt-2 pb-1">
        <div className="w-16 h-1 bg-foreground/10 rounded-full" />
      </div>
      {children}
      {/* Home indicator */}
      <div className="flex justify-center py-2">
        <div className="w-10 h-1 bg-foreground/10 rounded-full" />
      </div>
    </div>
  </div>
);

/* ═══════════ INTERACTIVE DASHBOARD ═══════════ */
const InteractiveDashboard = () => {
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload?.length) return null;
    return (
      <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-3 shadow-xl text-xs">
        <p className="font-bold mb-1">{label}</p>
        {payload.map((p: any, i: number) => (
          <div key={i} className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }} />
            <span className="text-muted-foreground">{p.name}:</span>
            <span className="font-bold">£{p.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="py-20 md:py-28 bg-foreground text-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `radial-gradient(circle at 20% 50%, hsl(var(--color-sage)) 0%, transparent 40%), radial-gradient(circle at 80% 50%, hsl(var(--color-mustard)) 0%, transparent 40%)`,
      }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
          <span className="text-xs font-mono text-sage uppercase tracking-[0.3em] mb-3 block">DASHBOARD PREVIEW</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4">
            Your Salary <span className="text-sage">X-Ray</span>
          </h2>
          <p className="text-background/50 text-lg max-w-xl mx-auto">
            Like <span className="font-semibold text-background/80">Rightmove for your career</span>
          </p>
        </motion.div>

        {/* Laptop frame */}
        <motion.div initial={{ opacity: 0, y: 50, scale: 0.95 }} whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }} transition={{ duration: 1 }}>
          <div className="bg-background/10 backdrop-blur-sm rounded-2xl border border-background/10 p-1.5">
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-4 py-2.5 bg-background/5 rounded-t-xl">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-rose/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-mustard/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-sage/60" />
              </div>
              <div className="flex-1 mx-4 px-3 py-1 rounded-md bg-background/5 text-background/30 text-xs font-mono">
                salary-intelligence.referd.com/dashboard
              </div>
            </div>

            {/* Dashboard content */}
            <div className="bg-background rounded-b-xl p-6 md:p-8">
              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { label: "Your Salary", value: "£75,000", accent: "border-sage", icon: <Eye className="w-4 h-4 text-sage" /> },
                  { label: "Market Average", value: "£92,400", accent: "border-mustard", icon: <TrendingUp className="w-4 h-4 text-mustard" /> },
                  { label: "You're Missing", value: "£17,400", accent: "border-rose", icon: <Sparkles className="w-4 h-4 text-rose" /> },
                ].map((card, i) => (
                  <motion.div key={card.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}
                    className={`bg-muted/30 rounded-xl p-4 border-l-4 ${card.accent}`}>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{card.label}</p>
                      {card.icon}
                    </div>
                    <p className="text-xl md:text-2xl font-heading font-bold text-foreground">{card.value}</p>
                  </motion.div>
                ))}
              </div>

              {/* Charts row */}
              <div className="grid md:grid-cols-2 gap-6">
                {/* Salary trend */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.5 }} className="bg-muted/20 rounded-xl p-5 border border-border/50">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Salary Trend vs Market</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={SALARY_TREND_DATA}>
                        <defs>
                          <linearGradient id="dashMktGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(83,69%,72%)" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="hsl(83,69%,72%)" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="dashYouGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(330,100%,84%)" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="hsl(330,100%,84%)" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                        <XAxis dataKey="month" stroke="hsl(0,0%,45%)" fontSize={10} tickLine={false} axisLine={false} />
                        <YAxis stroke="hsl(0,0%,45%)" fontSize={10} tickLine={false} axisLine={false}
                          tickFormatter={(v) => `£${(v / 1000).toFixed(0)}K`} />
                        <Tooltip content={<CustomTooltip />} />
                        <Area type="monotone" dataKey="market" name="Market" stroke="hsl(83,69%,72%)" strokeWidth={2.5} fill="url(#dashMktGrad)" />
                        <Area type="monotone" dataKey="you" name="You" stroke="hsl(330,100%,84%)" strokeWidth={2} fill="url(#dashYouGrad)" strokeDasharray="6 3" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-sage rounded" /> Market Average</span>
                    <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-rose rounded border-dashed" /> Your Salary</span>
                  </div>
                </motion.div>

                {/* Industry comparison */}
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: 0.6 }} className="bg-muted/20 rounded-xl p-5 border border-border/50">
                  <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-4">Industry Comparison</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={INDUSTRY_COMPARISON} layout="vertical">
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" horizontal={false} />
                        <XAxis type="number" stroke="hsl(0,0%,45%)" fontSize={10} tickLine={false} axisLine={false}
                          tickFormatter={(v) => `£${(v / 1000).toFixed(0)}K`} />
                        <YAxis type="category" dataKey="name" stroke="hsl(0,0%,45%)" fontSize={10} tickLine={false} axisLine={false} width={55} />
                        <Tooltip content={({ active, payload }) => {
                          if (!active || !payload?.length) return null;
                          return (
                            <div className="bg-background/95 backdrop-blur-sm border border-border rounded-lg p-2 shadow-xl text-xs">
                              <p className="font-bold">{payload[0].payload.name}: £{payload[0].value?.toLocaleString()}</p>
                            </div>
                          );
                        }} />
                        <Bar dataKey="salary" radius={[0, 6, 6, 0]}>
                          {INDUSTRY_COMPARISON.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>
              </div>

              {/* Percentile bar */}
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: 0.7 }} className="mt-6 bg-muted/20 rounded-xl p-5 border border-border/50">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground">Your Percentile</span>
                  <span className="text-sm font-bold text-sage">72nd percentile</span>
                </div>
                <div className="w-full h-4 bg-border/50 rounded-full overflow-hidden relative">
                  <motion.div initial={{ width: 0 }} whileInView={{ width: "72%" }} viewport={{ once: true }}
                    transition={{ duration: 2, delay: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sage/60 via-sage to-sage-dark rounded-full relative">
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }}
                      className="absolute right-0 top-0 bottom-0 w-6 bg-gradient-to-r from-transparent to-background/20 rounded-full" />
                  </motion.div>
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-muted-foreground">
                  <span>0th</span><span>25th</span><span>50th</span><span>75th</span><span>100th</span>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ═══════════ LAPTOP MOCKUP ═══════════ */
const LaptopMockupSection = () => (
  <section className="py-20 md:py-28 bg-muted/30 overflow-hidden">
    <div className="container mx-auto px-6 max-w-5xl">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <span className="text-xs font-mono text-rose uppercase tracking-[0.3em] mb-3 block">NOT RECRUITMENT</span>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-4">
            Traditional recruitment is <span className="text-rose line-through">broken</span>
          </h2>
          <p className="text-muted-foreground mb-8">
            Recruiters have the data. Employers have the data. You don't. We're changing that.
          </p>
          <div className="space-y-4">
            {[
              { label: "No recruiter games", color: "text-sage" },
              { label: "No selling your data", color: "text-rose" },
              { label: "Just the truth, instantly", color: "text-mustard" },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <Zap className={`w-4 h-4 ${item.color}`} />
                <span className="text-foreground font-medium">{item.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Laptop mockup with comp breakdown chart */}
        <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
          <div className="bg-foreground rounded-2xl p-2 shadow-2xl">
            <div className="bg-background rounded-xl overflow-hidden">
              <div className="flex items-center gap-1.5 px-3 py-2 bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-rose/60" />
                <div className="w-2 h-2 rounded-full bg-mustard/60" />
                <div className="w-2 h-2 rounded-full bg-sage/60" />
              </div>
              <div className="p-5">
                <p className="text-xs font-mono text-muted-foreground uppercase mb-3">Total Compensation Breakdown</p>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={COMP_BREAKDOWN}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(0,0%,90%)" />
                      <XAxis dataKey="name" stroke="hsl(0,0%,45%)" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="hsl(0,0%,45%)" fontSize={10} tickLine={false} axisLine={false}
                        tickFormatter={(v) => `£${(v / 1000).toFixed(0)}K`} />
                      <Tooltip content={({ active, payload }) => {
                        if (!active || !payload?.length) return null;
                        return (
                          <div className="bg-background border border-border rounded-lg p-2 shadow-xl text-xs">
                            <p className="font-bold">{payload[0].payload.name}: £{payload[0].value?.toLocaleString()}</p>
                          </div>
                        );
                      }} />
                      <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                        {COMP_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.fill} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
          {/* Laptop base */}
          <div className="mx-auto w-[110%] -ml-[5%] h-3 bg-foreground/80 rounded-b-xl" />
          <div className="mx-auto w-[40%] h-1 bg-foreground/40 rounded-b-lg" />
        </motion.div>
      </div>
    </div>
  </section>
);

/* ─── Narrative word-reveal ─── */
const NarrativeReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.3"] });
  const words = "Your employer knows exactly what the market pays. Recruiters know. HR knows. The only person who doesn't? You. Until now.".split(" ");

  return (
    <div ref={ref} className="py-16">
      <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.3] tracking-tight">
        {words.map((word, i) => (
          <NarrativeWord key={i} word={word} progress={scrollYProgress} start={i / words.length} end={(i + 1) / words.length} />
        ))}
      </p>
    </div>
  );
};

const NarrativeWord = ({ word, progress, start, end }: { word: string; progress: any; start: number; end: number }) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const highlights: Record<string, string> = {
    "doesn't?": "hsl(var(--color-rose))",
    "You.": "hsl(var(--color-rose))",
    "now.": "hsl(var(--color-sage))",
    "market": "hsl(var(--color-sage))",
  };
  const color = highlights[word] || "hsl(var(--foreground))";
  return <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">{word}</motion.span>;
};

/* ─── Form Field ─── */
const FormField = ({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <div>
    <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider text-muted-foreground">{label}</label>
    <Input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      className="h-10 text-sm bg-background border-border" />
  </div>
);

/* ─── Floating Sticky CTA ─── */
const SalaryFloatingCTA = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (latest) => {
      if (!isDismissed) setIsVisible(latest > window.innerHeight * 0.8);
    });
    return () => unsubscribe();
  }, [scrollY, isDismissed]);

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
          <div className="relative flex items-center gap-3 rounded-full px-3 py-2 shadow-xl backdrop-blur-xl bg-foreground/95 border border-foreground/10">
            <button onClick={() => setIsDismissed(true)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground/80 flex items-center justify-center" aria-label="Dismiss">
              <X className="w-3 h-3 text-background" />
            </button>
            <span className="hidden sm:inline text-sm font-medium pl-2 text-background/60">Are you underpaid?</span>
            <button onClick={onScrollToForm} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-sage text-foreground hover:scale-105 transition-transform">
              Get Free Report <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SalaryIntelligence;
