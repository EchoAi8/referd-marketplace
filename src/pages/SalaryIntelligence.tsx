import PageLayout from "@/components/layout/PageLayout";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Lock, 
  ChevronRight, 
  Sparkles,
  BarChart3,
  Users,
  Globe,
  Zap,
  CheckCircle2,
  ArrowRight
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SalaryResult {
  currentSalary: number;
  marketAverage: number;
  percentile: number;
  status: "above" | "below" | "at";
  difference: number;
  industryInsights: string[];
  recommendations: string[];
}

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
    companySize: "",
    email: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAnalyze = async () => {
    if (!formData.jobTitle || !formData.location || !formData.yearsExperience || !formData.currentSalary) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("salary-intelligence", {
        body: {
          jobTitle: formData.jobTitle,
          location: formData.location,
          yearsExperience: parseInt(formData.yearsExperience),
          industry: formData.industry || "Technology",
          currentSalary: parseInt(formData.currentSalary.replace(/[^0-9]/g, "")),
          companySize: formData.companySize || "50-200"
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
    if (!formData.email) {
      toast.error("Please enter your email to unlock the full report");
      return;
    }
    setShowFullReport(true);
    toast.success("Full report unlocked!");
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 bg-gradient-to-b from-foreground to-foreground/95 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.03, 0.08, 0.03]
            }}
            transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-1/4 -left-1/4 w-1/2 h-1/2 bg-sage rounded-full blur-3xl"
          />
          <motion.div
            animate={{ 
              scale: [1.2, 1, 1.2],
              opacity: [0.05, 0.1, 0.05]
            }}
            transition={{ duration: 10, repeat: Infinity }}
            className="absolute bottom-1/4 -right-1/4 w-1/2 h-1/2 bg-mustard rounded-full blur-3xl"
          />
        </div>

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-sage/10 border border-sage/20 rounded-full mb-6"
            >
              <Sparkles className="w-4 h-4 text-sage" />
              <span className="text-sage text-sm font-medium">AI-Powered Salary Intelligence</span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-7xl font-heading font-bold text-background leading-tight mb-6"
            >
              Are You Being
              <br />
              <span className="text-sage">Paid What You're Worth?</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-background/60 max-w-2xl mx-auto mb-8"
            >
              Our intelligent algorithm scrapes <strong className="text-background">100s of data points</strong> in real-time 
              to show exactly where you stand in today's market.
            </motion.p>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-wrap justify-center gap-6 text-background/40 text-sm"
            >
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                <span>500K+ Salary Data Points</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4" />
                <span>120+ Industries</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>50K+ Users This Month</span>
              </div>
            </motion.div>
          </div>

          {/* Input Form / Results */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="max-w-2xl mx-auto"
              >
                <div className="bg-background/5 backdrop-blur-xl rounded-3xl border border-background/10 p-8">
                  <div className="grid md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <label className="block text-background/60 text-sm mb-2">Job Title *</label>
                      <Input
                        placeholder="e.g., Senior Software Engineer"
                        value={formData.jobTitle}
                        onChange={(e) => handleInputChange("jobTitle", e.target.value)}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/30"
                      />
                    </div>
                    <div>
                      <label className="block text-background/60 text-sm mb-2">Location *</label>
                      <Input
                        placeholder="e.g., London, UK"
                        value={formData.location}
                        onChange={(e) => handleInputChange("location", e.target.value)}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/30"
                      />
                    </div>
                    <div>
                      <label className="block text-background/60 text-sm mb-2">Years of Experience *</label>
                      <Input
                        type="number"
                        placeholder="e.g., 5"
                        value={formData.yearsExperience}
                        onChange={(e) => handleInputChange("yearsExperience", e.target.value)}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/30"
                      />
                    </div>
                    <div>
                      <label className="block text-background/60 text-sm mb-2">Industry</label>
                      <Input
                        placeholder="e.g., Technology"
                        value={formData.industry}
                        onChange={(e) => handleInputChange("industry", e.target.value)}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/30"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-background/60 text-sm mb-2">Your Current Salary (£) *</label>
                      <Input
                        placeholder="e.g., 75000"
                        value={formData.currentSalary}
                        onChange={(e) => handleInputChange("currentSalary", e.target.value)}
                        className="bg-background/10 border-background/20 text-background placeholder:text-background/30 text-lg"
                      />
                    </div>
                  </div>

                  <MagneticButton
                    onClick={handleAnalyze}
                    className="w-full py-4 bg-sage text-foreground rounded-xl font-semibold text-lg flex items-center justify-center gap-2 hover:bg-sage/90 transition-colors"
                    strength={0.3}
                  >
                    {isLoading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full"
                        />
                        Analyzing 100s of Data Points...
                      </>
                    ) : (
                      <>
                        <Zap className="w-5 h-5" />
                        Reveal My Market Value
                      </>
                    )}
                  </MagneticButton>

                  <p className="text-background/30 text-xs text-center mt-4">
                    Takes 10 seconds • 100% Free • No credit card required
                  </p>
                </div>
              </motion.div>
            )}

            {step === 2 && result && (
              <motion.div
                key="results"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.6 }}
                className="max-w-3xl mx-auto"
              >
                {/* Main Result Card */}
                <div className="bg-background/5 backdrop-blur-xl rounded-3xl border border-background/10 p-8 mb-6">
                  <div className="text-center mb-8">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 ${
                        result.status === "above" 
                          ? "bg-sage/20 text-sage" 
                          : result.status === "below"
                          ? "bg-rose/20 text-rose"
                          : "bg-mustard/20 text-mustard"
                      }`}
                    >
                      {result.status === "above" && <TrendingUp className="w-6 h-6" />}
                      {result.status === "below" && <TrendingDown className="w-6 h-6" />}
                      {result.status === "at" && <Minus className="w-6 h-6" />}
                      <span className="text-lg font-semibold">
                        {result.status === "above" && "You're Above Market Average!"}
                        {result.status === "below" && "You're Below Market Average"}
                        {result.status === "at" && "You're At Market Average"}
                      </span>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <p className="text-background/50 text-sm mb-1">Your Salary</p>
                        <p className="text-3xl font-heading font-bold text-background">
                          £{result.currentSalary.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-background/50 text-sm mb-1">Market Average</p>
                        <p className="text-3xl font-heading font-bold text-sage">
                          £{result.marketAverage.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center">
                        <p className="text-background/50 text-sm mb-1">Your Percentile</p>
                        <p className="text-3xl font-heading font-bold text-mustard">
                          {result.percentile}th
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Difference Bar */}
                  <div className="mb-8">
                    <div className="relative h-4 bg-background/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min(result.percentile, 100)}%` }}
                        transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                        className={`absolute inset-y-0 left-0 rounded-full ${
                          result.status === "above" ? "bg-sage" : result.status === "below" ? "bg-rose" : "bg-mustard"
                        }`}
                      />
                      <div 
                        className="absolute top-1/2 -translate-y-1/2 w-1 h-6 bg-background/50"
                        style={{ left: "50%" }}
                      />
                    </div>
                    <div className="flex justify-between mt-2 text-xs text-background/40">
                      <span>0th Percentile</span>
                      <span>50th (Average)</span>
                      <span>100th Percentile</span>
                    </div>
                  </div>

                  {/* Preview Insights */}
                  <div className="space-y-3 mb-6">
                    {result.industryInsights.slice(0, 2).map((insight, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.7 + i * 0.1 }}
                        className="flex items-start gap-3 p-3 bg-background/5 rounded-xl"
                      >
                        <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                        <p className="text-background/80 text-sm">{insight}</p>
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
                      <div className="blur-sm p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-start gap-3 p-3 bg-background/5 rounded-xl">
                            <div className="w-5 h-5 bg-background/20 rounded-full" />
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-background/20 rounded w-3/4" />
                              <div className="h-4 bg-background/20 rounded w-1/2" />
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      <div className="absolute inset-0 flex items-center justify-center z-20">
                        <div className="text-center">
                          <Lock className="w-8 h-8 text-background/60 mx-auto mb-3" />
                          <p className="text-background font-medium mb-4">
                            Unlock Your Full Intelligence Report
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3 justify-center">
                            <Input
                              type="email"
                              placeholder="Enter your email"
                              value={formData.email}
                              onChange={(e) => handleInputChange("email", e.target.value)}
                              className="bg-background/10 border-background/20 text-background placeholder:text-background/30 w-64"
                            />
                            <MagneticButton
                              onClick={handleUnlockReport}
                              className="px-6 py-2 bg-sage text-foreground rounded-lg font-semibold flex items-center gap-2"
                              strength={0.3}
                            >
                              Unlock Free <ChevronRight className="w-4 h-4" />
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
                      transition={{ duration: 0.5 }}
                      className="space-y-3"
                    >
                      {result.industryInsights.slice(2).map((insight, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-3 bg-background/5 rounded-xl"
                        >
                          <CheckCircle2 className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                          <p className="text-background/80 text-sm">{insight}</p>
                        </div>
                      ))}

                      <div className="border-t border-background/10 pt-6 mt-6">
                        <h3 className="text-lg font-heading font-semibold text-background mb-4">
                          Your Personalized Recommendations
                        </h3>
                        {result.recommendations.map((rec, i) => (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-sage/10 rounded-xl mb-2"
                          >
                            <ArrowRight className="w-5 h-5 text-sage flex-shrink-0 mt-0.5" />
                            <p className="text-background/90 text-sm">{rec}</p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Opportunities CTA */}
                {showFullReport && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-sage/10 border border-sage/20 rounded-2xl p-6 text-center"
                  >
                    <h3 className="text-xl font-heading font-semibold text-background mb-2">
                      🎯 {result.status === "below" ? "We Found Roles That Pay More" : "Maximize Your Earning Potential"}
                    </h3>
                    <p className="text-background/60 mb-4">
                      Based on your profile, we've identified opportunities that could increase your earnings.
                    </p>
                    <MagneticButton
                      onClick={() => navigateWithTransition("/opportunities")}
                      className="btn-primary"
                      strength={0.4}
                    >
                      View Matching Opportunities
                    </MagneticButton>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Example Report Section */}
      {step === 1 && (
        <section className="py-24 px-6">
          <div className="container mx-auto max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-foreground mb-4">
                See What You'll Get
              </h2>
              <p className="text-lg text-muted-foreground">
                Here's an example of the intelligence report you'll receive
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-muted/30 rounded-3xl border border-foreground/5 p-8"
            >
              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div className="text-center p-6 bg-background rounded-2xl">
                  <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="w-8 h-8 text-sage" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Market Position</p>
                  <p className="text-2xl font-heading font-bold text-sage">Top 25%</p>
                </div>
                <div className="text-center p-6 bg-background rounded-2xl">
                  <div className="w-16 h-16 bg-mustard/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-mustard" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Salary Range</p>
                  <p className="text-2xl font-heading font-bold text-mustard">£65k - £95k</p>
                </div>
                <div className="text-center p-6 bg-background rounded-2xl">
                  <div className="w-16 h-16 bg-rose/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-rose" />
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">Growth Potential</p>
                  <p className="text-2xl font-heading font-bold text-rose">+£12,000</p>
                </div>
              </div>

              <div className="text-center">
                <MagneticButton
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                  className="btn-primary text-lg"
                  strength={0.4}
                >
                  Get Your Free Report Now
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>
      )}
    </PageLayout>
  );
};

export default SalaryIntelligence;
