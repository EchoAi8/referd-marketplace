import PageLayout from "@/components/layout/PageLayout";
import { motion, useTransform, useScroll } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { ArrowRight, Shield } from "lucide-react";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SalaryResult {
  currentSalary: number;
  marketAverage: number;
  percentile: number;
  status: "above" | "below" | "at";
  difference: number;
  industryInsights: string[];
  recommendations: string[];
}

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

/* Always-dark section wrapper — uses raw color tokens so it stays dark regardless of theme */
const DarkSection = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <section
    className={`relative ${className}`}
    style={{ backgroundColor: "hsl(0 0% 0%)", color: "hsl(0 0% 100%)" }}
  >
    {children}
  </section>
);

const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroProgress, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroProgress, [0, 0.6], [1, 0.92]);
  const heroTextY = useTransform(heroProgress, [0, 0.6], [0, 120]);

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
    const analysisData = {
      jobTitle: formData.jobTitle,
      location: formData.location || "United Kingdom",
      yearsExperience: parseInt(formData.yearsExperience) || 3,
      industry: formData.industry,
      currentSalary: totalComp || parseInt(formData.baseSalary.replace(/[^0-9]/g, "")),
      companySize: formData.companySize || "51-200",
    };
    sessionStorage.setItem("pendingMarketPulseAnalysis", JSON.stringify(analysisData));
    navigateWithTransition("/auth?redirect=/dashboard&analysis=pending");
    toast.info("Please sign in to view your personalised report");
  };

  useEffect(() => {
    document.title = "Salary Intelligence | Free Salary Benchmarking | Referd";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Discover your true market value with Referd Salary Intelligence. AI-powered salary benchmarking across 120+ industries.");
    return () => { document.title = "Referd"; };
  }, []);

  return (
    <PageLayout>
      {/* ─── HERO ─── */}
      <DarkSection className="h-screen min-h-[600px] overflow-hidden flex flex-col justify-end">
        <div ref={heroRef} className="absolute inset-0" />
        
        {/* Subtle grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--color-sage) / 0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--color-sage) / 0.3) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-sage/5 blur-[200px] pointer-events-none" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container mx-auto px-6 pb-20 md:pb-28"
        >
          <motion.div style={{ y: heroTextY }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-mono text-xs uppercase tracking-[0.3em] mb-6 text-sage/60"
            >
              Salary Intelligence
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold leading-[0.85] tracking-tighter"
            >
              Know Your
              <br />
              <span className="text-sage">Worth</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl md:text-2xl max-w-xl leading-relaxed"
              style={{ color: "hsl(0 0% 100% / 0.5)" }}
            >
              Real-time salary benchmarking powered by AI across 120+ industries.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8"
            >
              <MagneticButton
                className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg"
                strength={0.4}
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Your Free Report
                <ArrowRight className="w-5 h-5 ml-2 inline" />
              </MagneticButton>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] font-mono" style={{ color: "hsl(0 0% 100% / 0.3)" }}>Scroll</span>
            <motion.div
              className="w-px h-8"
              style={{ background: "linear-gradient(to bottom, hsl(0 0% 100% / 0.4), transparent)" }}
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </DarkSection>

      {/* ─── NARRATIVE ─── */}
      <DarkSection className="py-32 md:py-40">
        <div className="container mx-auto px-6 max-w-4xl">
          <NarrativeReveal />
        </div>
      </DarkSection>

      {/* ─── FORM ─── */}
      <DarkSection className="py-24 md:py-32 overflow-hidden">
        <div ref={formRef} className="absolute -top-32" />
        <div className="absolute top-0 left-0 right-0 h-px" style={{ backgroundColor: "hsl(0 0% 100% / 0.05)" }} />
        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Sticky explanation */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-sage/60 font-mono text-xs mb-4 block uppercase tracking-[0.3em]">
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold leading-[0.95] tracking-tight mb-6">
                Your Salary,
                <br />
                <span className="text-sage">Decoded</span>
              </h2>
              <p className="text-lg leading-relaxed mb-10" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
                Enter your compensation details. Our AI analyses millions of
                data points in real-time to benchmark you against the market.
              </p>

              <div className="space-y-8">
                {[
                  { num: "01", title: "Input Your Data", desc: "Enter your compensation or import from LinkedIn" },
                  { num: "02", title: "AI Analysis", desc: "ML pipeline processes 500K+ data points instantly" },
                  { num: "03", title: "Get Your Report", desc: "Personalised benchmarks, insights & job matches" },
                ].map((step, i) => (
                  <motion.div
                    key={step.num}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <span className="text-sage/30 font-mono text-sm mt-1">{step.num}</span>
                    <div>
                      <h3 className="font-heading font-bold text-lg">{step.title}</h3>
                      <p className="text-sm" style={{ color: "hsl(0 0% 100% / 0.3)" }}>{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-10 text-xs font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.2)" }}>
                <Shield className="w-3 h-3" />
                <span>Bank-level encryption</span>
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div
                className="rounded-2xl p-8 backdrop-blur-sm"
                style={{
                  backgroundColor: "hsl(0 0% 100% / 0.03)",
                  border: "1px solid hsl(0 0% 100% / 0.06)",
                }}
              >
                <h3 className="font-heading font-bold text-xl mb-1">Benchmark Analysis</h3>
                <p className="text-sm mb-6" style={{ color: "hsl(0 0% 100% / 0.3)" }}>Enter your compensation data</p>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <FormField label="Job Title *" placeholder="e.g., Senior Engineer" value={formData.jobTitle} onChange={(v) => handleInputChange("jobTitle", v)} />
                    <div>
                      <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Industry *</label>
                      <Select value={formData.industry} onValueChange={(v) => handleInputChange("industry", v)}>
                        <SelectTrigger
                          className="h-10 text-sm"
                          style={{ backgroundColor: "hsl(0 0% 100% / 0.05)", borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 100%)" }}
                        >
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
                        <SelectTrigger
                          className="h-10 text-sm"
                          style={{ backgroundColor: "hsl(0 0% 100% / 0.05)", borderColor: "hsl(0 0% 100% / 0.1)", color: "hsl(0 0% 100%)" }}
                        >
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
                    <span className="text-xs font-mono uppercase tracking-wider mb-3 block" style={{ color: "hsl(0 0% 100% / 0.3)" }}>Compensation Breakdown</span>
                    <div className="grid grid-cols-2 gap-3">
                      <FormField label="Base Salary (£) *" placeholder="75,000" value={formData.baseSalary} onChange={(v) => handleInputChange("baseSalary", v)} />
                      <FormField label="Annual Bonus (£)" placeholder="10,000" value={formData.bonus} onChange={(v) => handleInputChange("bonus", v)} />
                      <FormField label="Equity/RSUs (£/yr)" placeholder="15,000" value={formData.equity} onChange={(v) => handleInputChange("equity", v)} />
                      <FormField label="Benefits Value (£)" placeholder="5,000" value={formData.benefits} onChange={(v) => handleInputChange("benefits", v)} />
                    </div>

                    {calculateTotalComp() > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-3"
                        style={{ borderTop: "1px solid hsl(0 0% 100% / 0.05)" }}
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-sm" style={{ color: "hsl(0 0% 100% / 0.4)" }}>Total Compensation</span>
                          <span className="text-sage font-heading font-bold text-lg">
                            £{calculateTotalComp().toLocaleString()}
                          </span>
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
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    <>Run Analysis <ArrowRight className="w-5 h-5" /></>
                  )}
                </MagneticButton>

                <p className="text-xs text-center mt-3 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.2)" }}>
                  Encrypted · 10 sec analysis · Free
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </DarkSection>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-4 text-foreground">
              Join <span className="text-sage">50,000+</span> Professionals
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Average salary increase of £12,000 within 6 months of using Salary Intelligence.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { quote: "I discovered I was being underpaid by £18K. Within 2 months I had a new role at market rate.", name: "Sarah K.", role: "Product Manager" },
              { quote: "The compensation breakdown was eye-opening. I used it to negotiate a 25% raise.", name: "James T.", role: "Senior Engineer" },
              { quote: "Finally, a tool that gives you real data — not just vague salary ranges.", name: "Priya M.", role: "Marketing Director" },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl border border-border bg-card"
              >
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

      {/* ─── FINAL CTA ─── */}
      <DarkSection className="py-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sage/5 blur-[200px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-heading font-bold leading-tight mb-6">
              Stop Leaving Money
              <br />
              On The Table
            </h2>
            <p className="text-xl mb-10 max-w-xl mx-auto" style={{ color: "hsl(0 0% 100% / 0.4)" }}>
              Your market value changes every day. Make sure you're always one step ahead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg"
                strength={0.4}
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Your Free Report
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 rounded-full font-semibold transition-all"
                strength={0.4}
                onClick={() => navigateWithTransition("/how-it-works")}
              >
                Learn More
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <p className="absolute bottom-5 w-full text-center text-sage/40 text-lg font-heading font-bold tracking-tight">
          REFERD®
        </p>
      </DarkSection>
    </PageLayout>
  );
};

/* ─── Form field (always-dark context) ─── */
const FormField = ({
  label, placeholder, value, onChange, type = "text",
}: {
  label: string; placeholder: string; value: string; onChange: (v: string) => void; type?: string;
}) => (
  <div>
    <label className="block text-xs mb-1.5 font-mono uppercase tracking-wider" style={{ color: "hsl(0 0% 100% / 0.4)" }}>{label}</label>
    <Input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-10 text-sm"
      style={{
        backgroundColor: "hsl(0 0% 100% / 0.05)",
        borderColor: "hsl(0 0% 100% / 0.1)",
        color: "hsl(0 0% 100%)",
      }}
    />
  </div>
);

/* ─── Narrative word-reveal ─── */
const NarrativeReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const words = "Are you being paid what you're worth? 67% of professionals are underpaid. Our AI analyses 120+ industries to reveal your true market value — in seconds.".split(" ");

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

const NarrativeWord = ({
  word, progress, start, end,
}: {
  word: string; progress: any; start: number; end: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const highlights: Record<string, string> = {
    "67%": "hsl(var(--color-sage))",
    "underpaid.": "hsl(var(--color-rose))",
    "120+": "hsl(var(--color-sage))",
    "seconds.": "hsl(var(--color-sage))",
  };
  const color = highlights[word] || "hsl(0 0% 100%)";

  return (
    <motion.span style={{ opacity, color }} className="inline-block mr-[0.3em]">
      {word}
    </motion.span>
  );
};

export default SalaryIntelligence;
