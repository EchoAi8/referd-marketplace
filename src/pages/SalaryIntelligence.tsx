import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import AnimatedCounter from "@/components/animations/AnimatedCounter";
import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import { GridOverlay } from "@/components/animations/GridTransition";
import { ArrowRight, Shield, Zap, TrendingUp, Users, Clock, AlertTriangle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import salaryDashboardImage from "@/assets/salary-intelligence-dashboard.jpg";

gsap.registerPlugin(ScrollTrigger, Flip);

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

/* ─── Always-dark wrapper ─── */
const DarkSection = ({ children, className = "", style = {} }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) => (
  <section
    className={`relative ${className}`}
    style={{ backgroundColor: "hsl(0 0% 0%)", color: "hsl(0 0% 100%)", ...style }}
  >
    {children}
  </section>
);

/* ─── Main Page ─── */
const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const zoomContainerRef = useRef<HTMLDivElement>(null);
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
    metaDesc.setAttribute("content", "67% of professionals are underpaid. Discover your true market value with Referd's AI salary benchmarking across 120+ industries. Free for a limited time.");
    return () => { document.title = "Referd"; };
  }, []);

  /* ─── GSAP Parallax Zoom ─── */
  useEffect(() => {
    const container = zoomContainerRef.current;
    if (!container) return;

    let masterTimeline: gsap.core.Timeline;

    const getScrollRange = ({ trigger, start, endTrigger, end }: {
      trigger: Element; start: string; endTrigger: Element; end: string;
    }) => {
      const st = ScrollTrigger.create({ trigger, start, endTrigger, end });
      const range = Math.max(1, st.end - st.start);
      st.kill();
      return range;
    };

    const buildTimeline = () => {
      if (masterTimeline) masterTimeline.kill();
      const startEl = container.querySelector("[data-bg-zoom-start]");
      const endEl = container.querySelector("[data-bg-zoom-end]");
      const contentEl = container.querySelector("[data-bg-zoom-content]") as HTMLElement;
      const darkEl = container.querySelector("[data-bg-zoom-dark]");
      const imgEl = container.querySelector("[data-bg-zoom-img]");
      if (!startEl || !endEl || !contentEl) return;

      masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: startEl, start: "clamp(top bottom)",
          endTrigger: container, end: "bottom top",
          scrub: true, invalidateOnRefresh: true,
        },
      });

      const startRadius = getComputedStyle(startEl).borderRadius;
      const endRadius = getComputedStyle(endEl).borderRadius;
      const hasRadius = startRadius !== "0px" || endRadius !== "0px";
      contentEl.style.overflow = hasRadius ? "hidden" : "";
      if (hasRadius) gsap.set(contentEl, { borderRadius: startRadius });
      Flip.fit(contentEl, startEl, { scale: false });

      const zoomRange = getScrollRange({ trigger: startEl, start: "clamp(top bottom)", endTrigger: endEl, end: "center center" });
      const afterRange = getScrollRange({ trigger: endEl, start: "center center", endTrigger: container, end: "bottom top" });

      masterTimeline.add(Flip.fit(contentEl, endEl, { duration: zoomRange, ease: "none", scale: false }) as gsap.core.Tween);
      if (hasRadius) masterTimeline.to(contentEl, { borderRadius: endRadius, duration: zoomRange }, "<");
      masterTimeline.to(contentEl, { y: `+=${afterRange}`, duration: afterRange });
      if (darkEl) {
        gsap.set(darkEl, { opacity: 0 });
        masterTimeline.to(darkEl, { opacity: 0.75, duration: afterRange * 0.25 }, "<");
      }
      if (imgEl) {
        gsap.set(imgEl, { scale: 1, transformOrigin: "50% 50%" });
        masterTimeline.to(imgEl, { scale: 1.25, yPercent: -10, duration: afterRange }, "<");
      }
      ScrollTrigger.refresh();
    };

    const initTimeout = setTimeout(buildTimeline, 100);
    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => { clearTimeout(resizeTimer); resizeTimer = setTimeout(buildTimeline, 100); };
    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimeout); clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (masterTimeline) masterTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <GridOverlay key="salary-intelligence-grid" />
      <CursorFollower />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <TwoStepNavigation />
          <div className="menu-vignette" aria-hidden="true" />
          <div className="site-shell">
            <main>
              {/* ═══════════ HERO ═══════════ */}
              <HeroSection onScrollToForm={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} />

              {/* ═══════════ URGENCY STATS ═══════════ */}
              <DarkSection className="py-20 md:py-28 border-t border-b" style={{ borderColor: "hsl(0 0% 100% / 0.05)" } as any}>
                <div className="container mx-auto px-6">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-12"
                  >
                    <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-mono uppercase tracking-wider"
                      style={{ backgroundColor: "hsl(var(--color-rose) / 0.15)", color: "hsl(var(--color-rose))", border: "1px solid hsl(var(--color-rose) / 0.3)" }}>
                      <AlertTriangle className="w-4 h-4" /> THE NUMBERS DON'T LIE
                    </span>
                  </motion.div>

                  <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
                    {[
                      { value: 67, suffix: "%", label: "of professionals are underpaid right now", color: "var(--color-rose)" },
                      { value: 18, prefix: "£", suffix: "K", label: "average salary increase after using our tool", color: "var(--color-sage)" },
                      { value: 47, suffix: "sec", label: "average time to get your full market report", color: "var(--color-mustard)" },
                      { value: 127, suffix: "K+", label: "reports generated this month alone", color: "var(--color-sage)" },
                    ].map((stat, i) => (
                      <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1, duration: 0.6 }}
                      >
                        <AnimatedCounter
                          value={stat.value}
                          prefix={stat.prefix}
                          suffix={stat.suffix}
                          className="text-5xl md:text-6xl font-heading font-bold"
                          delay={0.2 + i * 0.15}
                        />
                        <p className="mt-2 text-sm" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{stat.label}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </DarkSection>

              {/* ═══════════ NARRATIVE REVEAL ═══════════ */}
              <DarkSection className="py-32 md:py-40">
                <div className="container mx-auto px-6 max-w-4xl">
                  <NarrativeReveal />
                </div>
              </DarkSection>

              {/* ═══════════ PARALLAX ZOOM ═══════════ */}
              <section
                ref={zoomContainerRef}
                data-bg-zoom-init=""
                className="relative flex flex-col items-center justify-center min-h-screen overflow-clip px-4 bg-foreground text-background"
                style={{ paddingTop: "calc(50dvh - 15em)" }}
              >
                <div className="text-center mb-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 text-sm font-bold"
                    style={{ backgroundColor: "hsl(var(--color-rose) / 0.2)", color: "hsl(var(--color-rose))", border: "1px solid hsl(var(--color-rose) / 0.3)" }}
                  >
                    🔥 CLOSING SOON — FREE ACCESS ENDS THIS MONTH
                  </motion.span>
                  <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight max-w-[10em] mx-auto">
                    Your Salary
                    <span className="text-sage"> X-Ray</span>
                  </h2>
                  <p className="mt-4 text-background/60 text-lg max-w-xl mx-auto">
                    The tool your employer doesn't want you to find
                  </p>
                </div>

                {/* Zoom Start Circle */}
                <div data-bg-zoom-start="" className="relative aspect-square w-64 rounded-[16em]">
                  <div data-bg-zoom-content="" className="absolute inset-0 rounded-[inherit] bg-sage will-change-transform overflow-hidden">
                    <img
                      data-bg-zoom-img=""
                      src={salaryDashboardImage}
                      alt="Salary Intelligence Dashboard"
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <p className="absolute top-5 w-full text-center text-mustard text-lg font-black tracking-tight drop-shadow-lg">REFERD®</p>
                    <button
                      onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 group cursor-pointer z-10"
                    >
                      <span className="absolute inset-0 rounded-full bg-background/20 animate-ping" />
                      <span className="absolute inset-2 rounded-full bg-background/30 animate-pulse" />
                      <span className="relative flex items-center justify-center w-full h-full rounded-full bg-background shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Zap className="w-8 h-8 text-foreground" fill="currentColor" />
                      </span>
                    </button>
                    <div data-bg-zoom-dark="" className="absolute inset-0 bg-foreground opacity-0" />
                  </div>
                </div>

                {/* Zoom End */}
                <div data-bg-zoom-end="" className="w-screen h-screen" />

                {/* Scroll text beats */}
                <div className="relative flex flex-col items-center gap-8 w-full pb-[calc(50dvh-12em)]">
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em]">
                    Everyone else
                    <br /><span className="text-sage">already knows</span>
                  </h3>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em] mt-[33dvh]">
                    Your employer
                    <br /><span className="text-mustard">has the data</span>
                  </h3>
                  <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em] mt-[33dvh]">
                    Now it's
                    <br /><span className="text-rose">your turn</span>
                  </h3>
                </div>
              </section>

              {/* ═══════════ SOCIAL PROOF URGENCY ═══════════ */}
              <DarkSection className="py-16">
                <LiveActivityFeed />
              </DarkSection>

              {/* ═══════════ FORM ═══════════ */}
              <DarkSection className="py-24 md:py-32 overflow-hidden">
                <div ref={formRef} className="absolute -top-32" />
                <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "hsl(0 0% 100% / 0.05)" }} />
                <div className="container mx-auto px-6 max-w-5xl relative z-10">
                  <div className="grid lg:grid-cols-2 gap-16 items-start">
                    {/* Left side */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      transition={{ duration: 0.8 }}
                      className="lg:sticky lg:top-32"
                    >
                      <span className="font-mono text-xs mb-4 block uppercase tracking-[0.3em]" style={{ color: "hsl(var(--color-sage) / 0.6)" }}>
                        FREE — FOR NOW
                      </span>
                      <h2 className="text-4xl md:text-5xl font-heading font-bold leading-[0.95] tracking-tight mb-6">
                        Your Salary,
                        <br /><span className="text-sage">Exposed</span>
                      </h2>
                      <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
                        In 47 seconds, you'll know if you're being underpaid.
                        The question is: can you afford not to know?
                      </p>

                      <div className="space-y-8">
                        {[
                          { num: "01", title: "Drop Your Numbers", desc: "Takes 30 seconds. We'll handle the rest." },
                          { num: "02", title: "AI Crunches 500K+ Data Points", desc: "Real salaries. Real companies. Real-time." },
                          { num: "03", title: "Get The Truth", desc: "Your exact percentile, gap analysis & action plan." },
                        ].map((step, i) => (
                          <motion.div key={step.num} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + i * 0.1 }} className="flex items-start gap-4">
                            <span className="font-mono text-sm mt-1" style={{ color: "hsl(var(--color-sage) / 0.3)" }}>{step.num}</span>
                            <div>
                              <h3 className="font-heading font-bold text-lg">{step.title}</h3>
                              <p className="text-sm" style={{ color: "hsl(0 0% 100% / 0.3)" }}>{step.desc}</p>
                            </div>
                          </motion.div>
                        ))}
                      </div>

                      <div className="flex items-center gap-2 mt-10 text-xs font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.2)" }}>
                        <Shield className="w-3 h-3" />
                        <span>256-bit encryption · data never shared</span>
                      </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      <div className="rounded-2xl p-8 backdrop-blur-sm" style={{ backgroundColor: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.06)" }}>
                        {/* Urgency banner */}
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg mb-6 text-xs font-bold"
                          style={{ backgroundColor: "hsl(var(--color-rose) / 0.1)", color: "hsl(var(--color-rose))", border: "1px solid hsl(var(--color-rose) / 0.2)" }}>
                          <Clock className="w-3.5 h-3.5" />
                          <span>2,847 people ran this analysis today</span>
                        </div>

                        <h3 className="font-heading font-bold text-xl mb-1">Your Market X-Ray</h3>
                        <p className="text-sm mb-6" style={{ color: "hsl(0 0% 100% / 0.3)" }}>Takes 30 seconds. Changes everything.</p>

                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <FormField label="Job Title *" placeholder="e.g., Senior Engineer" value={formData.jobTitle} onChange={(v) => handleInputChange("jobTitle", v)} />
                            <div>
                              <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Industry *</label>
                              <Select value={formData.industry} onValueChange={(v) => handleInputChange("industry", v)}>
                                <SelectTrigger className="h-10 text-sm" style={{ backgroundColor: "hsl(0 0% 100% / 0.05)", borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 100%)" }}>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {INDUSTRIES.map((ind) => <SelectItem key={ind} value={ind}>{ind}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                            <FormField label="Location" placeholder="e.g., London" value={formData.location} onChange={(v) => handleInputChange("location", v)} />
                            <div>
                              <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Company Size</label>
                              <Select value={formData.companySize} onValueChange={(v) => handleInputChange("companySize", v)}>
                                <SelectTrigger className="h-10 text-sm" style={{ backgroundColor: "hsl(0 0% 100% / 0.05)", borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 100%)" }}>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                                <SelectContent>
                                  {COMPANY_SIZES.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="h-px" style={{ backgroundColor: "hsl(0 0% 100% / 0.05)" }} />

                          <div>
                            <span className="text-xs font-mono uppercase tracking-wider mb-3 block" style={{ color: "hsl(0 0% 100% / 0.3)" }}>What are they paying you?</span>
                            <div className="grid grid-cols-2 gap-3">
                              <FormField label="Base Salary (£) *" placeholder="75,000" value={formData.baseSalary} onChange={(v) => handleInputChange("baseSalary", v)} />
                              <FormField label="Annual Bonus (£)" placeholder="10,000" value={formData.bonus} onChange={(v) => handleInputChange("bonus", v)} />
                              <FormField label="Equity/RSUs (£/yr)" placeholder="15,000" value={formData.equity} onChange={(v) => handleInputChange("equity", v)} />
                              <FormField label="Benefits Value (£)" placeholder="5,000" value={formData.benefits} onChange={(v) => handleInputChange("benefits", v)} />
                            </div>

                            {calculateTotalComp() > 0 && (
                              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} className="mt-4 pt-3" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.05)" }}>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Total Package</span>
                                  <span className="text-sage font-heading font-bold text-lg">£{calculateTotalComp().toLocaleString()}</span>
                                </div>
                              </motion.div>
                            )}
                          </div>

                          <FormField label="Years of Experience" placeholder="5" type="number" value={formData.yearsExperience} onChange={(v) => handleInputChange("yearsExperience", v)} />
                        </div>

                        <MagneticButton
                          onClick={handleAnalyze}
                          className="w-full mt-6 py-4 bg-sage text-foreground rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                          strength={0.3}
                        >
                          {isLoading ? (
                            <><motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full" /> Processing...</>
                          ) : (
                            <>🔥 Reveal My True Worth <ArrowRight className="w-5 h-5" /></>
                          )}
                        </MagneticButton>

                        <p className="text-xs text-center mt-3 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.2)" }}>
                          Free · 47 sec analysis · No credit card
                        </p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </DarkSection>

              {/* ═══════════ TESTIMONIALS ═══════════ */}
              <section className="relative py-24 bg-background overflow-hidden">
                <div className="container mx-auto px-6 max-w-4xl relative z-10">
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4 text-foreground">
                      They Found Out. <span className="text-sage">So Can You.</span>
                    </h2>
                    <p className="text-muted-foreground text-lg max-w-xl mx-auto">
                      Average salary increase: £18K within 90 days.
                    </p>
                  </motion.div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {[
                      { quote: "I was being robbed. £22K under market rate. Had a new offer within 3 weeks of running this report.", name: "Sarah K.", role: "Product Manager", increase: "+£22K" },
                      { quote: "Showed my manager the data. Got a 28% raise the same month. No job hopping needed.", name: "James T.", role: "Senior Engineer", increase: "+28%" },
                      { quote: "I was 'comfortable' — turns out I was leaving £15K on the table every year. Not anymore.", name: "Priya M.", role: "Marketing Director", increase: "+£15K" },
                    ].map((t, i) => (
                      <motion.div key={t.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                        className="p-6 rounded-2xl border border-border bg-card relative overflow-hidden">
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
              <DarkSection className="py-32 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ backgroundColor: "hsl(var(--color-sage) / 0.05)" }} />

                <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
                  <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                    <motion.span
                      animate={{ opacity: [0.6, 1, 0.6] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-bold"
                      style={{ backgroundColor: "hsl(var(--color-mustard) / 0.15)", color: "hsl(var(--color-mustard))", border: "1px solid hsl(var(--color-mustard) / 0.3)" }}
                    >
                      ⚡ FREE ACCESS CLOSING — DON'T MISS OUT
                    </motion.span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold leading-tight mb-6">
                      Every Day You Don't Know,
                      <br />You're Losing Money
                    </h2>
                    <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
                      The average underpaid professional loses £1,500/month. That's £18,000 a year walking out the door. 47 seconds is all it takes.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <MagneticButton
                        className="px-10 py-5 bg-sage text-foreground rounded-full font-bold text-lg shadow-[0_0_40px_rgba(139,164,133,0.5)]"
                        strength={0.4}
                        onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
                      >
                        🔥 Get My Free Report Now
                      </MagneticButton>
                    </div>

                    <p className="mt-6 text-xs font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.2)" }}>
                      No credit card · No spam · Just the truth
                    </p>
                  </motion.div>
                </div>

                <p className="absolute bottom-5 w-full text-center text-lg font-heading font-bold tracking-tight" style={{ color: "hsl(var(--color-sage) / 0.4)" }}>
                  REFERD®
                </p>
              </DarkSection>
            </main>
            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

/* ═══════════ SUB-COMPONENTS ═══════════ */

/* ─── Hero ─── */
const HeroSection = ({ onScrollToForm }: { onScrollToForm: () => void }) => {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.6], [1, 0.92]);
  const heroY = useTransform(scrollYProgress, [0, 0.6], [0, 120]);

  return (
    <DarkSection className="h-screen min-h-[600px] overflow-hidden flex flex-col justify-end">
      <div ref={heroRef} className="absolute inset-0" />

      {/* Grid bg */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `linear-gradient(hsl(var(--color-sage) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-sage) / 0.3) 1px, transparent 1px)`,
        backgroundSize: "60px 60px",
      }} />
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full blur-[200px] pointer-events-none" style={{ backgroundColor: "hsl(var(--color-sage) / 0.05)" }} />

      <motion.div style={{ opacity: heroOpacity, scale: heroScale }} className="relative z-10 container mx-auto px-6 pb-20 md:pb-28">
        <motion.div style={{ y: heroY }}>
          {/* Live counter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider"
              style={{ backgroundColor: "hsl(var(--color-rose) / 0.15)", color: "hsl(var(--color-rose))", border: "1px solid hsl(var(--color-rose) / 0.3)" }}>
              <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--color-rose))" }} />
              2,847 REPORTS RUN TODAY
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 80 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold leading-[0.85] tracking-tighter"
          >
            Are You Being
            <br /><span className="text-rose">Underpaid?</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-xl md:text-2xl max-w-xl leading-relaxed"
            style={{ color: "hsl(0 0% 100% / 0.5)" }}
          >
            67% of professionals are. Find out in 47 seconds — before your employer hopes you never do.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <MagneticButton
              className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg shadow-[0_0_30px_rgba(139,164,133,0.5)]"
              strength={0.4}
              onClick={onScrollToForm}
            >
              🔥 Find Out Now — It's Free
              <ArrowRight className="w-5 h-5 ml-2 inline" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Scroll */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-[0.2em] font-mono" style={{ color: "hsl(0 0% 100% / 0.3)" }}>Scroll</span>
          <motion.div className="w-px h-8" style={{ background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.4), transparent)" }} animate={{ scaleY: [1, 0.5, 1] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }} />
        </motion.div>
      </motion.div>
    </DarkSection>
  );
};

/* ─── Live Activity Feed ─── */
const LiveActivityFeed = () => {
  const activities = [
    { name: "Sophie L.", action: "discovered she was underpaid by", amount: "£14,200", time: "2 min ago", location: "London" },
    { name: "Marcus R.", action: "negotiated a raise of", amount: "£21,000", time: "8 min ago", location: "Manchester" },
    { name: "Emma W.", action: "found her true market value:", amount: "£95,000", time: "12 min ago", location: "Edinburgh" },
    { name: "David K.", action: "discovered a gap of", amount: "£8,500", time: "15 min ago", location: "Bristol" },
    { name: "Aisha B.", action: "benchmarked at the", amount: "92nd percentile", time: "19 min ago", location: "Birmingham" },
  ];

  return (
    <div className="container mx-auto px-6 max-w-4xl">
      <div className="flex items-center gap-2 mb-6">
        <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-2 h-2 rounded-full" style={{ backgroundColor: "hsl(var(--color-sage))" }} />
        <span className="text-xs font-mono uppercase tracking-wider" style={{ color: "hsl(var(--color-sage) / 0.6)" }}>LIVE ACTIVITY</span>
      </div>
      <div className="space-y-3">
        {activities.map((a, i) => (
          <motion.div
            key={a.name}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-center justify-between py-3 px-4 rounded-xl"
            style={{ backgroundColor: "hsl(0 0% 100% / 0.03)", border: "1px solid hsl(0 0% 100% / 0.05)" }}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "hsl(var(--color-sage) / 0.15)", color: "hsl(var(--color-sage))" }}>
                {a.name.charAt(0)}
              </div>
              <div>
                <span className="text-sm font-medium">{a.name}</span>
                <span className="text-sm mx-1" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{a.action}</span>
                <span className="text-sm font-bold text-sage">{a.amount}</span>
              </div>
            </div>
            <div className="text-right hidden sm:block">
              <span className="text-xs" style={{ color: "hsl(0 0% 100% / 0.3)" }}>{a.location} · {a.time}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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
  const color = highlights[word] || "hsl(0 0% 100%)";
  return <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">{word}</motion.span>;
};

/* ─── Form Field ─── */
const FormField = ({ label, placeholder, value, onChange, type = "text" }: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <div>
    <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{label}</label>
    <Input type={type} placeholder={placeholder} value={value} onChange={(e) => onChange(e.target.value)}
      className="h-10 text-sm"
      style={{ backgroundColor: "hsl(0 0% 100% / 0.05)", borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 100%)" }}
    />
  </div>
);

export default SalaryIntelligence;
