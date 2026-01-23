import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  LogOut, 
  Zap, 
  Briefcase, 
  TrendingUp, 
  Users,
  ArrowUpRight,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import LinkedInImport from '@/components/dashboard/LinkedInImport';
import MarketPulseReport from '@/components/dashboard/MarketPulseReport';
import JobMatchesList from '@/components/dashboard/JobMatchesList';
import ReferrerOnboardingPrompt from '@/components/dashboard/ReferrerOnboardingPrompt';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [marketPulseData, setMarketPulseData] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    document.title = 'Dashboard | Market Pulse™';
    
    // Check for pending analysis from /salary-intelligence
    const pendingAnalysis = sessionStorage.getItem('pendingMarketPulseAnalysis');
    if (pendingAnalysis && searchParams.get('analysis') === 'pending') {
      runPendingAnalysis(JSON.parse(pendingAnalysis));
      sessionStorage.removeItem('pendingMarketPulseAnalysis');
    } else {
      fetchData();
    }
  }, [user, searchParams]);

  const runPendingAnalysis = async (analysisData: any) => {
    if (!user) return;
    
    setIsAnalyzing(true);
    try {
      const { data, error } = await supabase.functions.invoke("market-pulse-analyze", {
        body: analysisData
      });

      if (error) throw error;

      // Save to database
      const { error: insertError } = await supabase.from('market_pulse_results').insert({
        user_id: user.id,
        job_title: analysisData.jobTitle,
        industry: analysisData.industry,
        years_experience: analysisData.yearsExperience,
        company_size: analysisData.companySize,
        current_salary: analysisData.currentSalary,
        market_average: data.marketAverage,
        percentile: data.percentile,
        status: data.status,
        difference: data.difference,
        industry_insights: data.industryInsights,
        recommendations: data.recommendations,
        full_report: data
      });

      if (insertError) console.error('Failed to save result:', insertError);

      setMarketPulseData({
        currentSalary: analysisData.currentSalary,
        ...data
      });

      toast.success("Your Market Pulse report is ready!");
      
      // Fetch jobs after analysis
      const { data: jobData } = await supabase
        .from('job_matches')
        .select('*')
        .eq('is_active', true)
        .order('match_score', { ascending: false })
        .limit(5);

      if (jobData) setJobs(jobData);
    } catch (err) {
      console.error('Analysis error:', err);
      toast.error('Failed to generate report. Please try again.');
    } finally {
      setIsAnalyzing(false);
      setLoading(false);
    }
  };

  const fetchData = async () => {
    if (!user) return;
    
    try {
      // Fetch latest market pulse result
      const { data: results } = await supabase
        .from('market_pulse_results')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(1);

      if (results && results.length > 0) {
        const r = results[0];
        setMarketPulseData({
          currentSalary: Number(r.current_salary),
          marketAverage: Number(r.market_average),
          percentile: r.percentile,
          status: r.status as 'above' | 'below' | 'at',
          difference: Number(r.difference),
          industryInsights: r.industry_insights || [],
          recommendations: r.recommendations || [],
          ...(r.full_report as object || {}),
        });
      }

      // Fetch job matches
      const { data: jobData } = await supabase
        .from('job_matches')
        .select('*')
        .eq('is_active', true)
        .order('match_score', { ascending: false })
        .limit(5);

      if (jobData) setJobs(jobData);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleResumeData = (data: any) => {
    toast.success(`Extracted ${data.skills?.length || 0} skills from resume`);
  };

  const handleLinkedInData = (data: any) => {
    toast.success(`Imported profile: ${data.jobTitle} at ${data.company}`);
  };

  if (loading || isAnalyzing) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="w-16 h-16 mx-auto mb-6 border-4 border-sage/30 border-t-sage rounded-full"
          />
          {isAnalyzing && (
            <>
              <h2 className="text-xl font-heading font-bold mb-2">Analyzing Your Market Value</h2>
              <p className="text-muted-foreground">Processing 500K+ data points...</p>
            </>
          )}
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Glassmorphism Header */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-sage to-forest flex items-center justify-center shadow-lg shadow-sage/20"
            >
              <Zap className="w-5 h-5 text-foreground" />
            </motion.div>
            <span className="font-heading font-bold text-foreground">Market Pulse™</span>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/referrer')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Users className="w-4 h-4 mr-2" />
              Referrer Portal
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-heading font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Welcome back
          </h1>
          <p className="text-muted-foreground">Your personalized market intelligence dashboard</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Pulse Report */}
            <AnimatePresence mode="wait">
              {marketPulseData ? (
                <motion.section
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sage/20 to-sage/10 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-sage" />
                    </div>
                    <h2 className="text-xl font-semibold">Your Market Report</h2>
                  </div>
                  <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
                    <MarketPulseReport data={marketPulseData} />
                  </div>
                </motion.section>
              ) : (
                <motion.section 
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-8 text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <h2 className="text-xl font-semibold mb-2">No Report Yet</h2>
                  <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                    Complete a Market Pulse analysis to see your personalized market value report
                  </p>
                  <Button 
                    onClick={() => navigate('/salary-intelligence')}
                    className="bg-gradient-to-r from-sage to-forest text-foreground shadow-lg shadow-sage/20"
                  >
                    <Zap className="w-4 h-4 mr-2" />
                    Start Analysis
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </motion.section>
              )}
            </AnimatePresence>

            {/* Job Matches */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-mustard/20 to-mustard/10 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-mustard" />
                  </div>
                  <h2 className="text-xl font-semibold">Jobs Matched for You</h2>
                </div>
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  View all
                  <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
              <div className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden">
                {jobs.length > 0 ? (
                  <JobMatchesList jobs={jobs} onApply={(id) => toast.info(`Applied to job ${id}`)} />
                ) : (
                  <div className="p-8 text-center">
                    <Briefcase className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
                    <p className="text-muted-foreground">No job matches available yet.</p>
                  </div>
                )}
              </div>
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ReferrerOnboardingPrompt />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl p-5"
            >
              <h3 className="font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sage" />
                Import Your Profile
              </h3>
              <div className="space-y-4">
                <LinkedInImport onImported={handleLinkedInData} />
                <div className="border-t border-border/50 pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Or upload your resume</p>
                  <ResumeUploader onParsed={handleResumeData} />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
