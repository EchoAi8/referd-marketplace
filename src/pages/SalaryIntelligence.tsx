import PageLayout from "@/components/layout/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  TrendingDown,
  Minus,
  Lock,
  ChevronRight,
  Upload,
  Linkedin,
  Building2,
  Coins,
  Target,
  Shield,
  ArrowRight,
  Zap,
  BarChart3,
  Users,
  Globe,
  CheckCircle2,
  Briefcase,
  Play,
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
import salaryHeroImage from "@/assets/salary-intelligence-hero.jpg";

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

const STATS = [
  { value: "50K+", label: "Professionals Benchmarked" },
  { value: "120+", label: "Industries Covered" },
  { value: "93%", label: "Accuracy Rate" },
  { value: "£12K", label: "Avg. Salary Increase" },
];

const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);

  // Parallax refs
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: statsProgress } = useScroll({
    target: statsRef,
    offset: ["start end", "end start"],
  });

  const heroImageY = useTransform(heroProgress, [0, 1], ["0%", "30%"]);
  const heroImageScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const heroOverlayOpacity = useTransform(heroProgress, [0, 0.5], [0.4, 0.85]);
  const heroTextY = useTransform(heroProgress, [0, 1], ["0%", "50%"]);

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
    email: "",
    name: "",
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
      toast.error(
        "Please fill in required fields: Job Title, Industry, and Base Salary"
      );
      return;
    }

    const analysisData = {
      jobTitle: formData.jobTitle,
      location: formData.location || "United Kingdom",
      yearsExperience: parseInt(formData.yearsExperience) || 3,
      industry: formData.industry,
      currentSalary:
        totalComp || parseInt(formData.baseSalary.replace(/[^0-9]/g, "")),
      companySize: formData.companySize || "51-200",
    };

    sessionStorage.setItem(
      "pendingMarketPulseAnalysis",
      JSON.stringify(analysisData)
    );

    navigateWithTransition("/auth?redirect=/dashboard&analysis=pending");
    toast.info("Please sign in to view your personalized Market Pulse report");
  };

  const handleUnlockReport = async () => {
    if (result) {
      sessionStorage.setItem(
        "pendingMarketPulseResult",
        JSON.stringify(result)
      );
    }
    navigateWithTransition("/auth?redirect=/dashboard");
  };

  useEffect(() => {
    document.title =
      "Market Value X-Ray™ | Free Salary Intelligence | Referd";
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement("meta");
      metaDesc.setAttribute("name", "description");
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute(
      "content",
      "Discover your true market value with Market Value X-Ray. AI-powered salary benchmarking across 120+ industries."
    );
    return () => {
      document.title = "Referd";
    };
  }, []);

  return (
    <PageLayout>
      {/* ─── HERO: Full-bleed parallax image ─── */}
      <section
        ref={heroRef}
        className="relative h-[100vh] min-h-[600px] overflow-hidden flex items-end"
      >
        {/* Parallax Background Image */}
        <motion.div
          style={{ y: heroImageY, scale: heroImageScale }}
          className="absolute inset-0 will-change-transform"
        >
          <img
            src={salaryHeroImage}
            alt="Salary Intelligence Dashboard"
            className="w-full h-full object-cover"
          />
        </motion.div>

        {/* Dynamic dark overlay */}
        <motion.div
          style={{ opacity: heroOverlayOpacity }}
          className="absolute inset-0 bg-foreground"
        />

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-foreground to-transparent" />

        {/* Hero Content */}
        <motion.div
          style={{ y: heroTextY }}
          className="relative z-10 container mx-auto px-6 pb-16 md:pb-24"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 border border-sage/30 rounded-full mb-6">
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-sage"
              />
              <span className="text-sage text-sm font-mono uppercase tracking-wider">
                AI-Powered Intelligence
              </span>
            </div>

            <h1 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-background leading-[0.95] tracking-tight max-w-3xl mb-6">
              Market Value
              <br />
              <span className="text-sage">X-Ray</span>
              <span className="text-mustard">™</span>
            </h1>

            <p className="text-xl md:text-2xl text-background/60 max-w-xl mb-8 leading-relaxed">
              Stop guessing. Start knowing. Real-time salary benchmarking
              powered by machine learning across{" "}
              <strong className="text-background">120+ industries</strong>.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton
                className="px-8 py-4 bg-sage text-foreground rounded-full font-bold text-lg shadow-[0_0_30px_hsl(var(--color-sage)/0.5)]"
                strength={0.4}
                onClick={() => {
                  formRef.current?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <Zap className="w-5 h-5 mr-2 inline" />
                Get Your Free X-Ray
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border-2 border-background/20 text-background rounded-full font-semibold hover:bg-background/5 transition-all"
                strength={0.4}
                onClick={() => navigateWithTransition("/how-it-works")}
              >
                <Play className="w-4 h-4 mr-2 inline" />
                How It Works
              </MagneticButton>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── STATS BAR: Animated counters ─── */}
      <section
        ref={statsRef}
        className="relative bg-foreground py-16 border-y border-background/10"
      >
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center"
              >
                <p className="text-4xl md:text-5xl font-heading font-bold text-sage mb-2">
                  {stat.value}
                </p>
                <p className="text-background/40 text-sm font-mono uppercase tracking-wider">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FORM SECTION: Parallax overlap with dark theme ─── */}
      <section
        ref={formRef}
        className="relative bg-foreground py-24 md:py-32 overflow-hidden"
      >
        {/* Decorative parallax elements */}
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-sage/5 blur-[120px] -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-mustard/5 blur-[100px] translate-x-1/3 translate-y-1/3" />

        <div className="container mx-auto px-6 max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            {/* Left: Value Proposition */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <span className="text-sage font-mono text-sm mb-4 block uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background leading-tight mb-6">
                Your Salary,{" "}
                <span className="text-sage">Decoded</span>
              </h2>
              <p className="text-lg text-background/50 mb-10 leading-relaxed">
                Enter your compensation details and our AI analyses millions
                of data points in real-time to benchmark you against the
                market.
              </p>

              {/* Steps */}
              <div className="space-y-6">
                {[
                  {
                    icon: Upload,
                    title: "Input Your Data",
                    desc: "Enter your compensation or import from LinkedIn",
                    color: "sage",
                  },
                  {
                    icon: BarChart3,
                    title: "AI Analysis",
                    desc: "Our ML pipeline processes 500K+ data points instantly",
                    color: "mustard",
                  },
                  {
                    icon: Target,
                    title: "Get Your X-Ray",
                    desc: "Receive personalised benchmarks, insights & job matches",
                    color: "sage",
                  },
                ].map((step, i) => (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        step.color === "sage"
                          ? "bg-sage/10"
                          : "bg-mustard/10"
                      }`}
                    >
                      <step.icon
                        className={`w-6 h-6 ${
                          step.color === "sage"
                            ? "text-sage"
                            : "text-mustard"
                        }`}
                      />
                    </div>
                    <div>
                      <h3 className="text-background font-heading font-bold text-lg">
                        {step.title}
                      </h3>
                      <p className="text-background/40 text-sm">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust signals */}
              <div className="flex flex-wrap gap-6 mt-10 text-background/30 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sage" />
                  <span>Bank-level encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sage" />
                  <span>Real-time updates</span>
                </div>
              </div>
            </motion.div>

            {/* Right: Form Card */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-background/5 backdrop-blur-xl rounded-3xl border border-background/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                    <Target className="w-5 h-5 text-sage" />
                  </div>
                  <div>
                    <h3 className="text-background font-heading font-bold">
                      Benchmark Analysis
                    </h3>
                    <p className="text-background/50 text-sm">
                      Enter your compensation data
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {/* Industry Benchmark */}
                  <div className="bg-sage/10 rounded-xl p-4 border border-sage/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Building2 className="w-4 h-4 text-sage" />
                      <span className="text-sage text-sm font-semibold">
                        INDUSTRY BENCHMARK
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Job Title *
                        </label>
                        <Input
                          placeholder="e.g., Senior Engineer"
                          value={formData.jobTitle}
                          onChange={(e) =>
                            handleInputChange("jobTitle", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Industry *
                        </label>
                        <Select
                          value={formData.industry}
                          onValueChange={(value) =>
                            handleInputChange("industry", value)
                          }
                        >
                          <SelectTrigger className="bg-background/10 border-background/20 text-background h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {INDUSTRIES.map((ind) => (
                              <SelectItem key={ind} value={ind}>
                                {ind}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Location
                        </label>
                        <Input
                          placeholder="e.g., London"
                          value={formData.location}
                          onChange={(e) =>
                            handleInputChange("location", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Company Size
                        </label>
                        <Select
                          value={formData.companySize}
                          onValueChange={(value) =>
                            handleInputChange("companySize", value)
                          }
                        >
                          <SelectTrigger className="bg-background/10 border-background/20 text-background h-9 text-sm">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent>
                            {COMPANY_SIZES.map((size) => (
                              <SelectItem key={size.value} value={size.value}>
                                {size.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Compensation Breakdown */}
                  <div className="bg-mustard/10 rounded-xl p-4 border border-mustard/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Coins className="w-4 h-4 text-mustard" />
                      <span className="text-mustard text-sm font-semibold">
                        COMPENSATION BREAKDOWN
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Base Salary (£) *
                        </label>
                        <Input
                          placeholder="75,000"
                          value={formData.baseSalary}
                          onChange={(e) =>
                            handleInputChange("baseSalary", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Annual Bonus (£)
                        </label>
                        <Input
                          placeholder="10,000"
                          value={formData.bonus}
                          onChange={(e) =>
                            handleInputChange("bonus", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Equity/RSUs (£/yr)
                        </label>
                        <Input
                          placeholder="15,000"
                          value={formData.equity}
                          onChange={(e) =>
                            handleInputChange("equity", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">
                          Benefits Value (£)
                        </label>
                        <Input
                          placeholder="5,000"
                          value={formData.benefits}
                          onChange={(e) =>
                            handleInputChange("benefits", e.target.value)
                          }
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                    </div>

                    {calculateTotalComp() > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t border-mustard/20"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-background/60 text-sm">
                            Total Compensation
                          </span>
                          <span className="text-mustard font-heading font-bold text-lg">
                            £{calculateTotalComp().toLocaleString()}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* Years Experience */}
                  <div>
                    <label className="block text-background/50 text-xs mb-1.5">
                      Years of Experience
                    </label>
                    <Input
                      type="number"
                      placeholder="5"
                      value={formData.yearsExperience}
                      onChange={(e) =>
                        handleInputChange("yearsExperience", e.target.value)
                      }
                      className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                    />
                  </div>
                </div>

                <MagneticButton
                  onClick={handleAnalyze}
                  className="w-full mt-6 py-4 bg-gradient-to-r from-sage to-forest text-foreground rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_hsl(var(--color-sage)/0.5)]"
                  strength={0.3}
                >
                  {isLoading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
                      />
                      Processing data points...
                    </>
                  ) : (
                    <>
                      <Zap className="w-5 h-5" />
                      Run Analysis
                    </>
                  )}
                </MagneticButton>

                <p className="text-background/30 text-xs text-center mt-3 font-mono">
                  ENCRYPTED • 10 SEC ANALYSIS • FREE ACCESS
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SOCIAL PROOF MARQUEE ─── */}
      <section className="relative py-20 bg-background overflow-hidden">
        {/* Top gradient overlap */}
        <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-foreground via-foreground/50 to-transparent pointer-events-none z-10" />

        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold leading-tight mb-6">
              Join <span className="text-sage">50,000+</span> Professionals
              <br />
              Who Discovered Their{" "}
              <span className="text-mustard">True Worth</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
              Our users report an average salary increase of £12,000 within
              6 months of using Market Value X-Ray™.
            </p>
          </motion.div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                quote:
                  "I discovered I was being underpaid by £18K. Within 2 months I had a new role at market rate.",
                name: "Sarah K.",
                role: "Product Manager",
                color: "sage",
              },
              {
                quote:
                  "The compensation breakdown was eye-opening. I used it to negotiate a 25% raise.",
                name: "James T.",
                role: "Senior Engineer",
                color: "mustard",
              },
              {
                quote:
                  "Finally, a tool that gives you real data — not just vague salary ranges.",
                name: "Priya M.",
                role: "Marketing Director",
                color: "rose",
              },
            ].map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`p-6 rounded-2xl border bg-muted/30 border-${t.color}/20`}
              >
                <p className="text-foreground/80 text-sm mb-4 leading-relaxed italic">
                  "{t.quote}"
                </p>
                <div>
                  <p className={`font-heading font-bold text-${t.color}`}>
                    {t.name}
                  </p>
                  <p className="text-muted-foreground text-xs">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FINAL CTA ─── */}
      <section className="relative py-32 bg-foreground overflow-hidden">
        {/* Top gradient overlap */}
        <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-background to-transparent pointer-events-none z-10" />

        {/* Decorative glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-sage/10 blur-[150px] pointer-events-none" />

        <div className="container mx-auto px-6 max-w-3xl text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-mustard/20 border border-mustard/30 rounded-full mb-6 text-mustard text-sm font-bold"
            >
              ⚡ FREE FOR A LIMITED TIME
            </motion.span>

            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background leading-tight mb-6">
              Stop Leaving Money
              <br />
              On The Table
            </h2>

            <p className="text-xl text-background/50 mb-10 max-w-xl mx-auto">
              Your market value changes every day. Make sure you're always
              one step ahead.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton
                className="px-8 py-4 bg-gradient-to-r from-sage via-sage to-forest text-foreground rounded-full font-bold text-lg shadow-[0_0_30px_hsl(var(--color-sage)/0.7),0_0_60px_hsl(var(--color-sage)/0.4)] hover:shadow-[0_0_40px_hsl(var(--color-sage)/0.9),0_0_80px_hsl(var(--color-sage)/0.5)] transition-all duration-300"
                strength={0.4}
                onClick={() =>
                  formRef.current?.scrollIntoView({ behavior: "smooth" })
                }
              >
                🔥 Get Your Free X-Ray Report
              </MagneticButton>
              <MagneticButton
                className="px-8 py-4 border-2 border-background/20 text-background rounded-full font-semibold hover:bg-background/5 transition-all"
                strength={0.4}
                onClick={() => navigateWithTransition("/how-it-works")}
              >
                Learn More
              </MagneticButton>
            </div>
          </motion.div>
        </div>

        <p className="absolute bottom-5 w-full text-center text-sage text-lg font-black tracking-tight">
          REFERD®
        </p>
      </section>
    </PageLayout>
  );
};

export default SalaryIntelligence;
