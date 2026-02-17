import PageLayout from "@/components/layout/PageLayout";
import { motion, useTransform, useScroll } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  Lock,
  ArrowRight,
  Shield,
  ChevronDown,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSmoothScroll } from "@/hooks/useSmoothScroll";

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
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Legal",
  "Marketing & Advertising",
  "Consulting",
  "E-commerce",
  "Manufacturing",
  "Real Estate",
  "Media & Entertainment",
];

const COMPANY_SIZES = [
  { value: "1-50", label: "Startup (1-50)" },
  { value: "51-200", label: "Small (51-200)" },
  { value: "201-1000", label: "Mid-size (201-1K)" },
  { value: "1001-5000", label: "Large (1K-5K)" },
  { value: "5000+", label: "Enterprise (5K+)" },
];

const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);

  const heroRef = useRef<HTMLDivElement>(null);
  const narrativeRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { smoothProgress: heroSmooth } = useSmoothScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(heroSmooth, [0, 0.6], [1, 0]);
  const heroScale = useTransform(heroSmooth, [0, 0.6], [1, 0.92]);
  const heroTextY = useTransform(heroSmooth, [0, 0.6], [0, 120]);
  const heroSubY = useTransform(heroSmooth, [0, 0.6], [0, 80]);

  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    yearsExperience: "",
    industry: "",
    baseSalary: "",
    bonus: "",
    equity: "",
    benefits: "",
    companySize: "",
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
    const totalComp = calculateTotalComp();

    if (!formData.jobTitle || !formData.industry || !formData.baseSalary) {
      toast.error("Please fill in Job Title, Industry, and Base Salary");
      return;
    }

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
    toast.info("Please sign in to view your personalised Market Pulse report");
  };

  useEffect(() => {
    document.title = "Market Value X-Ray™ | Free Salary Intelligence | Referd";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute("content", "Discover your true market value with Market Value X-Ray. AI-powered salary benchmarking across 120+ industries.");
    return () => { document.title = "Referd"; };
  }, []);

  return (
    <PageLayout>
      {/* ─── HERO ─── */}
      <section
        ref={heroRef}
        className="relative h-screen min-h-[600px] bg-foreground overflow-hidden flex flex-col justify-end"
      >
        {/* Subtle grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `
              linear-gradient(hsl(var(--color-sage) / 0.3) 1px, transparent 1px),
              linear-gradient(90deg, hsl(var(--color-sage) / 0.3) 1px, transparent 1px)
            `,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-sage/5 blur-[200px] pointer-events-none" />

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 container mx-auto px-6 pb-20 md:pb-28"
        >
          <motion.div style={{ y: heroTextY }}>
            <motion.h1
              initial={{ opacity: 0, y: 80 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-heading font-bold text-background leading-[0.85] tracking-tighter"
            >
              Market Value
              <br />
              <span className="text-sage">X-Ray</span>
              <span className="text-background/40">™</span>
            </motion.h1>
          </motion.div>

          <motion.div style={{ y: heroSubY }}>
            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-6 text-xl md:text-2xl text-background/50 max-w-xl leading-relaxed"
            >
              Stop guessing. Start knowing. Real-time salary benchmarking
              powered by machine learning across 120+ industries.
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
                Get Your Free X-Ray
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
          style={{ opacity: useTransform(heroSmooth, [0, 0.15], [1, 0]) }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-background/30 font-mono">Scroll</span>
            <motion.div
              className="w-px h-8 bg-gradient-to-b from-background/40 to-transparent"
              animate={{ scaleY: [1, 0.5, 1] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── NARRATIVE: Word reveal stats ─── */}
      <section ref={narrativeRef} className="relative bg-foreground py-32 md:py-40">
        {/* Top gradient from hero */}
        <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />

        <div className="container mx-auto px-6 max-w-4xl">
          <NarrativeReveal />
        </div>
      </section>

      {/* ─── FORM SECTION ─── */}
      <section
        ref={formRef}
        className="relative bg-foreground py-24 md:py-32 overflow-hidden"
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-background/5" />

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
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background leading-[0.95] tracking-tight mb-6">
                Your Salary,
                <br />
                <span className="text-sage">Decoded</span>
              </h2>
              <p className="text-background/40 text-lg leading-relaxed mb-10">
                Enter your compensation details. Our AI analyses millions of
                data points in real-time to benchmark you against the market.
              </p>

              {/* Minimal steps */}
              <div className="space-y-8">
                {[
                  { num: "01", title: "Input Your Data", desc: "Enter your compensation or import from LinkedIn" },
                  { num: "02", title: "AI Analysis", desc: "ML pipeline processes 500K+ data points instantly" },
                  { num: "03", title: "Get Your X-Ray", desc: "Personalised benchmarks, insights & job matches" },
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
                      <h3 className="text-background font-heading font-bold text-lg">{step.title}</h3>
                      <p className="text-background/30 text-sm">{step.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="flex items-center gap-2 mt-10 text-background/20 text-xs font-mono uppercase tracking-wider">
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
              <div className="bg-background/[0.03] backdrop-blur-sm rounded-2xl border border-background/[0.06] p-8">
                <h3 className="text-background font-heading font-bold text-xl mb-1">
                  Benchmark Analysis
                </h3>
                <p className="text-background/30 text-sm mb-6">
                  Enter your compensation data
                </p>

                <div className="space-y-4">
                  {/* Role Info */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-background/40 text-xs mb-1.5 font-mono uppercase tracking-wider">
                        Job Title *
                      </label>
                      <Input
                        placeholder="e.g., Senior Engineer"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                        className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-background/40 text-xs mb-1.5 font-mono uppercase tracking-wider">
                        Industry *
                      </label>
                      <Select
                        value={formData.industry}
                        onValueChange={(value) => handleInputChange("industry", value)}
                      >
                        <SelectTrigger className="bg-background/[0.05] border-background/10 text-background h-10 text-sm">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {INDUSTRIES.map((ind) => (
                            <SelectItem key={ind} value={ind}>{ind}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="block text-background/40 text-xs mb-1.5 font-mono uppercase tracking-wider">
                        Location
                      </label>
                      <Input
                        placeholder="e.g., London"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-background/40 text-xs mb-1.5 font-mono uppercase tracking-wider">
                        Company Size
                      </label>
                      <Select
                        value={formData.companySize}
                        onValueChange={(value) => handleInputChange("companySize", value)}
                      >
                        <SelectTrigger className="bg-background/[0.05] border-background/10 text-background h-10 text-sm">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent>
                          {COMPANY_SIZES.map((size) => (
                            <SelectItem key={size.value} value={size.value}>{size.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="h-px bg-background/5" />

                  {/* Compensation */}
                  <div>
                    <span className="text-background/30 text-xs font-mono uppercase tracking-wider mb-3 block">
                      Compensation Breakdown
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-background/40 text-xs mb-1.5">Base Salary (£) *</label>
                        <Input
                          placeholder="75,000"
                          value={formData.baseSalary}
                          onChange={(e) => handleInputChange("baseSalary", e.target.value)}
                          className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/40 text-xs mb-1.5">Annual Bonus (£)</label>
                        <Input
                          placeholder="10,000"
                          value={formData.bonus}
                          onChange={(e) => handleInputChange("bonus", e.target.value)}
                          className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/40 text-xs mb-1.5">Equity/RSUs (£/yr)</label>
                        <Input
                          placeholder="15,000"
                          value={formData.equity}
                          onChange={(e) => handleInputChange("equity", e.target.value)}
                          className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/40 text-xs mb-1.5">Benefits Value (£)</label>
                        <Input
                          placeholder="5,000"
                          value={formData.benefits}
                          onChange={(e) => handleInputChange("benefits", e.target.value)}
                          className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                        />
                      </div>
                    </div>

                    {calculateTotalComp() > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-4 pt-3 border-t border-background/5"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-background/40 text-sm">Total Compensation</span>
                          <span className="text-sage font-heading font-bold text-lg">
                            £{calculateTotalComp().toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Experience */}
                  <div>
                    <label className="block text-background/40 text-xs mb-1.5 font-mono uppercase tracking-wider">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      placeholder="5"
                      value={formData.yearsExperience}
                      onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                      className="bg-background/[0.05] border-background/10 text-background placeholder:text-background/20 h-10 text-sm"
                    />
                  </div>
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
                    <>
                      Run Analysis
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </MagneticButton>

                <p className="text-background/20 text-xs text-center mt-3 font-mono uppercase tracking-wider">
                  Encrypted · 10 sec analysis · Free
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF ─── */}
      <section className="relative py-24 bg-background overflow-hidden">
        <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-foreground via-foreground/50 to-transparent pointer-events-none z-10" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold leading-tight mb-4">
              Join <span className="text-sage">50,000+</span> Professionals
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Average salary increase of £12,000 within 6 months of using Market Value X-Ray™.
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
                <p className="text-foreground/70 text-sm mb-4 leading-relaxed italic">
                  "{t.quote}"
                </p>
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
      <section className="relative py-32 bg-foreground overflow-hidden">
        <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sage/5 blur-[200px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background leading-tight mb-6">
              Stop Leaving Money
              <br />
              On The Table
            </h2>
            <p className="text-xl text-background/40 mb-10 max-w-xl mx-auto">
              Your market value changes every day. Make sure you're always one step ahead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg"
                strength={0.4}
                onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Your Free X-Ray Report
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border border-background/10 text-background/60 rounded-full font-semibold hover:text-background hover:border-background/20 transition-all"
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
      </section>
    </PageLayout>
  );
};

/* ─── Narrative word-reveal section ─── */
const NarrativeReveal = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { smoothProgress } = useSmoothScroll({
    target: ref,
    offset: ["start 0.8", "end 0.3"],
  });

  const words = "Are you being paid what you're worth? 67% of professionals are underpaid. Our AI analyses 120+ industries to reveal your true market value — in seconds.".split(" ");

  return (
    <div ref={ref} className="py-16">
      <p className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.3] tracking-tight">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + 1 / words.length;

          return (
            <NarrativeWord key={i} word={word} progress={smoothProgress} start={start} end={end} index={i} />
          );
        })}
      </p>
    </div>
  );
};

const NarrativeWord = ({
  word,
  progress,
  start,
  end,
  index,
}: {
  word: string;
  progress: any;
  start: number;
  end: number;
  index: number;
}) => {
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  // Highlight key terms with brand colors
  const highlights: Record<string, string> = {
    "67%": "text-sage",
    "underpaid.": "text-rose",
    "120+": "text-sage",
    "seconds.": "text-sage",
  };

  const highlightClass = highlights[word] || "text-background";

  return (
    <motion.span
      style={{ opacity }}
      className={`inline-block mr-[0.3em] ${highlightClass}`}
    >
      {word}
    </motion.span>
  );
};

export default SalaryIntelligence;
