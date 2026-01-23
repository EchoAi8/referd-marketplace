import PageLayout from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useState, useEffect } from "react";
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
  Briefcase
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import MarketPulseVisualization from "@/components/animations/MarketPulseVisualization";
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
  "Technology",
  "Finance & Banking",
  "Healthcare",
  "Legal",
  "Marketing & Advertising",
  "Consulting",
  "E-commerce",
  "Manufacturing",
  "Real Estate",
  "Media & Entertainment"
];

const COMPANY_SIZES = [
  { value: "1-50", label: "Startup (1-50)" },
  { value: "51-200", label: "Small (51-200)" },
  { value: "201-1000", label: "Mid-size (201-1K)" },
  { value: "1001-5000", label: "Large (1K-5K)" },
  { value: "5000+", label: "Enterprise (5K+)" }
];

const SalaryIntelligence = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<SalaryResult | null>(null);
  const [showFullReport, setShowFullReport] = useState(false);
  
  const [formData, setFormData] = useState({
    jobTitle: "",
    location: "",
    yearsExperience: "",
    industry: "",
    currentSalary: "",
    baseSalary: "",
    bonus: "",
    equity: "",
    benefits: "",
    companySize: "",
    email: "",
    name: ""
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
      toast.error("Please fill in required fields: Job Title, Industry, and Base Salary");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("salary-intelligence", {
        body: {
          jobTitle: formData.jobTitle,
          location: formData.location || "United Kingdom",
          yearsExperience: parseInt(formData.yearsExperience) || 3,
          industry: formData.industry,
          currentSalary: totalComp || parseInt(formData.baseSalary.replace(/[^0-9]/g, "")),
          companySize: formData.companySize || "51-200"
        }
      });

      if (error) throw error;

      setResult(data);
      setStep(2);
    } catch (error) {
      console.error("Error:", error);
      toast.error("Analysis failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleUnlockReport = async () => {
    if (!formData.email || !formData.name) {
      toast.error("Please enter your name and email to unlock the full report");
      return;
    }
    // In production, this would trigger auth flow
    setShowFullReport(true);
    toast.success("Full report unlocked! Check your dashboard for complete insights.");
  };

  // SEO Meta tags
  useEffect(() => {
    document.title = "Market Pulse™ | Free Salary Intelligence Report | Referd";
    
    let metaDesc = document.querySelector('meta[name="description"]');
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.setAttribute('name', 'description');
      document.head.appendChild(metaDesc);
    }
    metaDesc.setAttribute('content', 'Discover your true market value with Market Pulse. Real-time salary benchmarking powered by ML analysis of compensation data across industries.');
    
    return () => {
      document.title = "Referd";
    };
  }, []);

  return (
    <PageLayout>
      {/* Hero Section with Visualization */}
      <section className="relative pt-24 pb-16 px-6 bg-foreground overflow-hidden min-h-[90vh]">
        {/* Background Visualization */}
        <div className="absolute inset-0 opacity-40">
          <MarketPulseVisualization />
        </div>

        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/80 to-foreground pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-foreground via-transparent to-foreground pointer-events-none" />

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 border border-sage/30 rounded-full mb-6"
              >
                <motion.span 
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-2 h-2 rounded-full bg-sage"
                />
                <span className="text-sage text-sm font-mono">LIVE DATA STREAM</span>
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="text-5xl md:text-7xl font-heading font-bold text-background leading-tight mb-6"
              >
                Market
                <br />
                <span className="text-sage">Pulse</span>
                <span className="text-mustard">™</span>
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-xl text-background/70 max-w-xl mb-6"
              >
                Real-time salary benchmarking powered by <strong className="text-sage">machine learning</strong> analysis of compensation data across <strong className="text-background">120+ industries</strong>.
              </motion.p>

              {/* Trust Signals */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="flex flex-wrap gap-6 text-background/50 text-sm mb-8"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-sage" />
                  <span>Bank-level encryption</span>
                </div>
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-sage" />
                  <span>500K+ data points</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sage" />
                  <span>Real-time updates</span>
                </div>
              </motion.div>

              {/* Optional imports */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-wrap gap-3 mb-8"
              >
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-background/5 border border-background/20 rounded-lg text-background/60 hover:bg-background/10 hover:text-background transition-all text-sm"
                  onClick={() => toast.info("LinkedIn import coming soon!")}
                >
                  <Linkedin className="w-4 h-4" />
                  Import from LinkedIn
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2 bg-background/5 border border-background/20 rounded-lg text-background/60 hover:bg-background/10 hover:text-background transition-all text-sm"
                  onClick={() => toast.info("Resume parsing coming soon!")}
                >
                  <Upload className="w-4 h-4" />
                  Upload Resume
                </button>
              </motion.div>
            </div>

            {/* Right: Form */}
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6 }}
                >
                  <div className="bg-background/5 backdrop-blur-xl rounded-3xl border border-background/10 p-8">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center">
                        <Target className="w-5 h-5 text-sage" />
                      </div>
                      <div>
                        <h3 className="text-background font-heading font-bold">Benchmark Analysis</h3>
                        <p className="text-background/50 text-sm">Enter your compensation data</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {/* Industry Benchmark */}
                      <div className="bg-sage/10 rounded-xl p-4 border border-sage/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Building2 className="w-4 h-4 text-sage" />
                          <span className="text-sage text-sm font-semibold">INDUSTRY BENCHMARK</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Job Title *</label>
                            <Input
                              placeholder="e.g., Senior Engineer"
                              value={formData.jobTitle}
                              onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Industry *</label>
                            <Select
                              value={formData.industry}
                              onValueChange={(value) => handleInputChange("industry", value)}
                            >
                              <SelectTrigger className="bg-background/10 border-background/20 text-background h-9 text-sm">
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
                            <label className="block text-background/50 text-xs mb-1.5">Location</label>
                            <Input
                              placeholder="e.g., London"
                              value={formData.location}
                              onChange={(e) => handleInputChange("location", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Company Size</label>
                            <Select
                              value={formData.companySize}
                              onValueChange={(value) => handleInputChange("companySize", value)}
                            >
                              <SelectTrigger className="bg-background/10 border-background/20 text-background h-9 text-sm">
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
                      </div>

                      {/* Compensation Breakdown */}
                      <div className="bg-mustard/10 rounded-xl p-4 border border-mustard/20">
                        <div className="flex items-center gap-2 mb-3">
                          <Coins className="w-4 h-4 text-mustard" />
                          <span className="text-mustard text-sm font-semibold">COMPENSATION BREAKDOWN</span>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Base Salary (£) *</label>
                            <Input
                              placeholder="75,000"
                              value={formData.baseSalary}
                              onChange={(e) => handleInputChange("baseSalary", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Annual Bonus (£)</label>
                            <Input
                              placeholder="10,000"
                              value={formData.bonus}
                              onChange={(e) => handleInputChange("bonus", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Equity/RSUs (£/yr)</label>
                            <Input
                              placeholder="15,000"
                              value={formData.equity}
                              onChange={(e) => handleInputChange("equity", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                          <div>
                            <label className="block text-background/50 text-xs mb-1.5">Benefits Value (£)</label>
                            <Input
                              placeholder="5,000"
                              value={formData.benefits}
                              onChange={(e) => handleInputChange("benefits", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                            />
                          </div>
                        </div>
                        
                        {/* Total Comp Display */}
                        {calculateTotalComp() > 0 && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            className="mt-3 pt-3 border-t border-mustard/20"
                          >
                            <div className="flex justify-between items-center">
                              <span className="text-background/60 text-sm">Total Compensation</span>
                              <span className="text-mustard font-heading font-bold text-lg">
                                £{calculateTotalComp().toLocaleString()}
                              </span>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Years Experience */}
                      <div>
                        <label className="block text-background/50 text-xs mb-1.5">Years of Experience</label>
                        <Input
                          type="number"
                          placeholder="5"
                          value={formData.yearsExperience}
                          onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                          className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                        />
                      </div>
                    </div>

                    <MagneticButton
                      onClick={handleAnalyze}
                      className="w-full mt-6 py-4 bg-gradient-to-r from-sage to-forest text-foreground rounded-xl font-semibold text-lg flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(139,164,133,0.5)]"
                      strength={0.3}
                    >
                      {isLoading ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
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
              )}

              {step === 2 && result && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ duration: 0.6 }}
                >
                  {/* Results Card */}
                  <div className="bg-background/5 backdrop-blur-xl rounded-3xl border border-background/10 p-8">
                    {/* Status Badge */}
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className={`inline-flex items-center gap-3 px-4 py-2 rounded-full mb-6 ${
                        result.status === "above" 
                          ? "bg-sage/20 text-sage" 
                          : result.status === "below"
                          ? "bg-rose/20 text-rose"
                          : "bg-mustard/20 text-mustard"
                      }`}
                    >
                      {result.status === "above" && <TrendingUp className="w-5 h-5" />}
                      {result.status === "below" && <TrendingDown className="w-5 h-5" />}
                      {result.status === "at" && <Minus className="w-5 h-5" />}
                      <span className="font-semibold">
                        {result.status === "above" && "Above Market Average"}
                        {result.status === "below" && "Below Market Average"}
                        {result.status === "at" && "At Market Average"}
                      </span>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="text-center p-4 bg-background/5 rounded-xl">
                        <p className="text-background/40 text-xs mb-1 font-mono">YOUR COMP</p>
                        <p className="text-2xl font-heading font-bold text-background">
                          £{result.currentSalary.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-sage/10 rounded-xl">
                        <p className="text-sage/60 text-xs mb-1 font-mono">MARKET AVG</p>
                        <p className="text-2xl font-heading font-bold text-sage">
                          £{result.marketAverage.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-mustard/10 rounded-xl">
                        <p className="text-mustard/60 text-xs mb-1 font-mono">PERCENTILE</p>
                        <p className="text-2xl font-heading font-bold text-mustard">
                          {result.percentile}th
                        </p>
                      </div>
                    </div>

                    {/* Percentile Bar */}
                    <div className="mb-6">
                      <div className="relative h-3 bg-background/10 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${Math.min(result.percentile, 100)}%` }}
                          transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                          className={`absolute inset-y-0 left-0 rounded-full ${
                            result.status === "above" ? "bg-gradient-to-r from-sage to-forest" : 
                            result.status === "below" ? "bg-gradient-to-r from-rose/80 to-rose" : 
                            "bg-gradient-to-r from-mustard/80 to-mustard"
                          }`}
                        />
                        <div 
                          className="absolute top-1/2 -translate-y-1/2 w-0.5 h-5 bg-background/40"
                          style={{ left: "50%" }}
                        />
                      </div>
                      <div className="flex justify-between mt-1 text-xs text-background/30 font-mono">
                        <span>0%</span>
                        <span>50% (AVG)</span>
                        <span>100%</span>
                      </div>
                    </div>

                    {/* Preview Insights */}
                    <div className="space-y-2 mb-6">
                      {result.industryInsights.slice(0, 2).map((insight, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.7 + i * 0.1 }}
                          className="flex items-start gap-3 p-3 bg-background/5 rounded-xl"
                        >
                          <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                          <p className="text-background/70 text-sm">{insight}</p>
                        </motion.div>
                      ))}
                    </div>

                    {/* Locked Content */}
                    {!showFullReport && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="relative"
                      >
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/80 to-foreground z-10 rounded-xl" />
                        <div className="blur-sm p-4 space-y-2">
                          {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-background/5 rounded-xl">
                              <div className="w-4 h-4 bg-background/20 rounded-full" />
                              <div className="flex-1 space-y-2">
                                <div className="h-3 bg-background/20 rounded w-3/4" />
                                <div className="h-3 bg-background/20 rounded w-1/2" />
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="absolute inset-0 flex items-center justify-center z-20">
                          <div className="text-center px-4">
                            <Lock className="w-8 h-8 text-background/60 mx-auto mb-3" />
                            <p className="text-background font-medium mb-4 text-sm">
                              Unlock Full Report + Job Matches
                            </p>
                            <div className="flex flex-col gap-2 max-w-xs mx-auto">
                              <Input
                                placeholder="Your name"
                                value={formData.name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                              />
                              <Input
                                type="email"
                                placeholder="Your email"
                                value={formData.email}
                                onChange={(e) => handleInputChange("email", e.target.value)}
                                className="bg-background/10 border-background/20 text-background placeholder:text-background/30 h-9 text-sm"
                              />
                              <MagneticButton
                                onClick={handleUnlockReport}
                                className="w-full py-2 bg-sage text-foreground rounded-lg font-semibold text-sm flex items-center justify-center gap-2"
                                strength={0.3}
                              >
                                Unlock Report <ChevronRight className="w-4 h-4" />
                              </MagneticButton>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Full Report */}
                    {showFullReport && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-4"
                      >
                        {result.industryInsights.slice(2).map((insight, i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-background/5 rounded-xl">
                            <CheckCircle2 className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                            <p className="text-background/70 text-sm">{insight}</p>
                          </div>
                        ))}

                        <div className="border-t border-background/10 pt-4 mt-4">
                          <h3 className="text-sm font-semibold text-background mb-3 flex items-center gap-2">
                            <ArrowRight className="w-4 h-4 text-sage" />
                            Recommended Actions
                          </h3>
                          {result.recommendations.map((rec, i) => (
                            <div key={i} className="flex items-start gap-3 p-3 bg-sage/10 rounded-xl mb-2">
                              <span className="text-sage text-xs font-mono">{i + 1}</span>
                              <p className="text-background/80 text-sm">{rec}</p>
                            </div>
                          ))}
                        </div>

                        {/* Dual CTA */}
                        <div className="grid grid-cols-2 gap-3 pt-4">
                          <MagneticButton
                            onClick={() => navigateWithTransition("/opportunities")}
                            className="py-3 bg-sage text-foreground rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                            strength={0.3}
                          >
                            <Briefcase className="w-4 h-4" />
                            View Job Matches
                          </MagneticButton>
                          <MagneticButton
                            onClick={() => navigateWithTransition("/how-it-works")}
                            className="py-3 border border-background/20 text-background rounded-xl font-semibold text-sm flex items-center justify-center gap-2"
                            strength={0.3}
                          >
                            <Users className="w-4 h-4" />
                            Become a Referrer
                          </MagneticButton>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      {step === 1 && (
        <section className="py-24 px-6 bg-background">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <span className="text-sage font-mono text-sm mb-4 block">HOW IT WORKS</span>
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                Data-Driven Benchmarking
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Our ML pipeline aggregates compensation data from verified sources to provide accurate market positioning.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Upload, title: "Input Data", desc: "Enter your compensation details or import from LinkedIn/Resume", color: "sage" },
                { icon: BarChart3, title: "ML Analysis", desc: "Our pipeline processes 500K+ data points in real-time", color: "mustard" },
                { icon: Target, title: "Get Insights", desc: "Receive personalized benchmarks and job matches", color: "sage" }
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="relative p-8 bg-muted/30 rounded-3xl border border-foreground/5"
                >
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${
                    step.color === "sage" ? "bg-sage/10" : "bg-mustard/10"
                  }`}>
                    <step.icon className={`w-7 h-7 ${step.color === "sage" ? "text-sage" : "text-mustard"}`} />
                  </div>
                  <span className="absolute top-6 right-6 text-6xl font-heading font-bold text-foreground/5">
                    {i + 1}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default SalaryIntelligence;
