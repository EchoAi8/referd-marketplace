import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import PageLayout from "@/components/layout/PageLayout";
import { ArrowRight, Shield, TrendingUp, Users, BarChart3, Target, CheckCircle2, X, Clock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";

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
      <HeroSection onScrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />

      {/* ═══════════ TRUST STATS ═══════════ */}
      <section className="py-20 md:py-28 border-t border-border">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            {[
              { value: 67, suffix: "%", label: "of professionals are underpaid", color: "text-rose" },
              { value: 18, prefix: "£", suffix: "K", label: "average salary increase after using our tool", color: "text-sage" },
              { value: 47, suffix: "sec", label: "average time to get your full report", color: "text-mustard" },
              { value: 127, suffix: "K+", label: "reports generated this month", color: "text-sage" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                <AnimatedCounter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  className={`text-4xl md:text-5xl font-heading font-bold ${stat.color}`}
                  delay={0.2 + i * 0.15}
                />
                <p className="mt-2 text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Three simple steps to discover your true market value
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <BarChart3 className="w-6 h-6" />,
                step: "01",
                title: "Drop Your Numbers",
                desc: "Enter your current salary, role and industry. Takes 30 seconds.",
                color: "bg-sage/10 text-sage border-sage/20",
              },
              {
                icon: <Target className="w-6 h-6" />,
                step: "02",
                title: "AI Crunches the Data",
                desc: "We analyse 500K+ real salary data points across your industry in real-time.",
                color: "bg-rose/10 text-rose border-rose/20",
              },
              {
                icon: <TrendingUp className="w-6 h-6" />,
                step: "03",
                title: "Get the Truth",
                desc: "Your exact percentile, gap analysis and personalised action plan.",
                color: "bg-mustard/10 text-mustard border-mustard/20",
              },
            ].map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="relative bg-background rounded-2xl p-8 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 border ${step.color}`}>
                  {step.icon}
                </div>
                <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">{step.step}</span>
                <h3 className="font-heading font-bold text-xl mt-2 mb-2 text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NARRATIVE ═══════════ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-4xl">
          <NarrativeReveal />
        </div>
      </section>

      {/* ═══════════ DASHBOARD PREVIEW ═══════════ */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="container mx-auto px-6 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              Your Salary <span className="text-sage">X-Ray</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Think of it like <span className="font-semibold text-foreground">Rightmove for your career</span> — browse what's out there to see your market value
            </p>
          </motion.div>

          {/* Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-background rounded-2xl border border-border shadow-lg overflow-hidden"
          >
            {/* Dashboard Header */}
            <div className="px-6 py-4 border-b border-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-rose" />
                <div className="w-3 h-3 rounded-full bg-mustard" />
                <div className="w-3 h-3 rounded-full bg-sage" />
              </div>
              <span className="text-xs font-mono text-muted-foreground">salary-intelligence.referd.com</span>
            </div>

            {/* Dashboard Content */}
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { label: "Your Salary", value: "£75,000", sub: "Base + Benefits", accent: "border-l-sage" },
                  { label: "Market Average", value: "£92,400", sub: "For your role & level", accent: "border-l-mustard" },
                  { label: "You're Missing", value: "£17,400", sub: "Per year", accent: "border-l-rose" },
                ].map((card, i) => (
                  <motion.div
                    key={card.label}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.1 }}
                    className={`bg-muted/40 rounded-xl p-5 border-l-4 ${card.accent}`}
                  >
                    <p className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-1">{card.label}</p>
                    <p className="text-2xl md:text-3xl font-heading font-bold text-foreground">{card.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{card.sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Percentile bar */}
              <div className="bg-muted/40 rounded-xl p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">Your Percentile</span>
                  <span className="text-sm font-bold text-sage">72nd percentile</span>
                </div>
                <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: "72%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-sage to-sage-dark rounded-full"
                  />
                </div>
                <div className="flex justify-between mt-2 text-xs text-muted-foreground">
                  <span>0th</span>
                  <span>50th</span>
                  <span>100th</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══════════ FORM ═══════════ */}
      <section className="py-24 md:py-32">
        <div ref={formRef} className="absolute -top-32" />
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left side */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-xs font-mono text-sage uppercase tracking-[0.3em] mb-4 block">
                FREE — FOR NOW
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-tight text-foreground mb-6">
                Your Salary,
                <br /><span className="text-sage">Exposed</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-10">
                In 47 seconds, you'll know if you're being underpaid.
                The question is: can you afford not to know?
              </p>

              <div className="space-y-6">
                {[
                  { num: "01", title: "Drop Your Numbers", desc: "Takes 30 seconds. We'll handle the rest." },
                  { num: "02", title: "AI Crunches 500K+ Data Points", desc: "Real salaries. Real companies. Real-time." },
                  { num: "03", title: "Get The Truth", desc: "Your exact percentile, gap analysis & action plan." },
                ].map((step, i) => (
                  <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-start gap-4">
                    <span className="font-mono text-sm mt-1 text-sage/40">{step.num}</span>
                    <div>
                      <h3 className="font-heading font-bold text-lg text-foreground">{step.title}</h3>
                      <p className="text-sm text-muted-foreground">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-10 text-xs font-mono text-muted-foreground uppercase tracking-wider">
                <Shield className="w-3 h-3" />
                <span>256-bit encryption · data never shared</span>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="rounded-2xl p-8 bg-background border border-border shadow-lg">
                {/* Urgency banner */}
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
                        <SelectTrigger className="h-10 text-sm bg-background border-border">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormField label="Location" placeholder="e.g., London" value={formData.location} onChange={(v) => handleInputChange("location", v)} />
                    <div>
                      <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider text-muted-foreground">Company Size</label>
                      <Select value={formData.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
                        <SelectTrigger className="h-10 text-sm bg-background border-border">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="h-px bg-border" />

                  <div>
                    <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mb-3 block">What are they paying you?</span>
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

                <MagneticButton
                  onClick={handleAnalyze}
                  className="w-full mt-6 py-4 bg-sage text-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
                  strength={0.3}
                >
                  {isLoading ? (
                    <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full" /> Processing...</>
                  ) : (
                    <>Reveal My True Worth <ArrowRight className="w-5 h-5" /></>
                  )}
                </MagneticButton>

                <p className="text-xs text-center mt-3 text-muted-foreground">
                  Free · 47 sec analysis · No credit card
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════ TESTIMONIALS ═══════════ */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-6 max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
              They Found Out. <span className="text-sage">So Can You.</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Average salary increase: £18K within 90 days.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I was being robbed. £22K under market rate. Had a new offer within 3 weeks.", name: "Sarah K.", role: "Product Manager", increase: "+£22K" },
              { quote: "Showed my manager the data. Got a 28% raise the same month.", name: "James T.", role: "Senior Engineer", increase: "+28%" },
              { quote: "I was 'comfortable' — turns out I was leaving £15K on the table every year.", name: "Priya M.", role: "Marketing Director", increase: "+£15K" },
            ].map((t, i) => (
              <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-background relative overflow-hidden shadow-sm">
                <span className="absolute top-3 right-3 text-xs font-bold px-2 py-1 rounded-full bg-sage/10 text-sage">{t.increase}</span>
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed italic">"{t.quote}"</p>
                <div>
                  <p className="font-heading font-bold text-foreground">{t.name}</p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FINAL CTA ═══════════ */}
      <section className="py-24 md:py-32">
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-foreground leading-tight mb-6">
              Every Day You Don't Know,
              <br />You're Losing Money
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
              The average underpaid professional loses £1,500/month. That's £18,000 a year. 47 seconds is all it takes.
            </p>

            <MagneticButton
              className="px-10 py-5 bg-sage text-foreground rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
              strength={0.4}
              onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
            >
              Get My Free Report Now
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </MagneticButton>

            <p className="mt-6 text-xs text-muted-foreground">
              No credit card · No spam · Just the truth
            </p>
          </motion.div>
        </div>
      </section>

      {/* Floating Sticky CTA */}
      <SalaryFloatingCTA onScrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />
    </PageLayout>
  );
};

/* ─── Floating Sticky CTA Bar ─── */
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
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50"
        >
          <div className="relative flex items-center gap-3 rounded-full px-3 py-2 shadow-xl backdrop-blur-xl bg-foreground/95 border border-foreground/10">
            <button onClick={() => setIsDismissed(true)} className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-foreground/80 flex items-center justify-center" aria-label="Dismiss">
              <X className="w-3 h-3 text-background" />
            </button>
            <span className="hidden sm:inline text-sm font-medium pl-2 text-background/60">Are you underpaid?</span>
            <button onClick={onScrollToForm} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm bg-sage text-foreground hover:scale-105 transition-transform">
              Get Free Report
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

/* ═══════════ SUB-COMPONENTS ═══════════ */

/* ─── Hero ─── */
const HeroSection = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 80]);

  return (
    <section className="relative min-h-[85vh] flex items-end pb-20 md:pb-28 overflow-hidden pt-32">
      <div ref={heroRef} className="absolute inset-0" />

      {/* Subtle grid */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(var(--color-sage) / 0.5) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-sage) / 0.5) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />

      {/* Soft gradient blob */}
      <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none bg-sage/5" />

      <motion.div style={{ opacity: heroOpacity }} className="relative z-10 container mx-auto px-6">
        <motion.div style={{ y: heroY }}>
          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider bg-rose/10 text-rose border border-rose/20">
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full bg-rose" />
              2,847 REPORTS RUN TODAY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[12vw] sm:text-[10vw] md:text-[8vw] lg:text-[6vw] font-heading font-bold leading-[0.9] tracking-tighter text-foreground"
          >
            Are You Being
            <br /><span className="text-rose">Underpaid?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 text-xl md:text-2xl max-w-xl leading-relaxed text-muted-foreground"
          >
            67% of professionals are. Find out in 47 seconds — before your employer hopes you never do.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.65 }}
            className="mt-5 text-lg md:text-xl max-w-xl leading-relaxed text-foreground/70"
          >
            Think of it like <span className="font-bold text-sage">Rightmove for your career</span> — browse what's out there to see your market value, no intention to move required.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton
              className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg shadow-md hover:shadow-lg transition-shadow"
              strength={0.4}
              onClick={onScrollToForm}
            >
              Find Out Now — It's Free
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono text-muted-foreground">Scroll</span>
          <motion.div className="w-px h-8 bg-gradient-to-b from-muted-foreground/40 to-transparent" animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </section>
  );
};

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
      className="h-10 text-sm bg-background border-border"
    />
  </div>
);

export default SalaryIntelligence;
