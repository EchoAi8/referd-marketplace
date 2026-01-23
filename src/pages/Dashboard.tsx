import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { LogOut, Zap, Briefcase, TrendingUp } from 'lucide-react';
import ResumeUploader from '@/components/dashboard/ResumeUploader';
import LinkedInImport from '@/components/dashboard/LinkedInImport';
import MarketPulseReport from '@/components/dashboard/MarketPulseReport';
import JobMatchesList from '@/components/dashboard/JobMatchesList';
import ReferrerOnboardingPrompt from '@/components/dashboard/ReferrerOnboardingPrompt';

const Dashboard = () => {
  const { user, signOut } = useAuth();
  const [marketPulseData, setMarketPulseData] = useState<any>(null);
  const [jobs, setJobs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = 'Dashboard | Market Pulse™';
    fetchData();
  }, [user]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" />
            <span className="font-bold">Market Pulse™</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4 mr-2" />
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="text-muted-foreground">Your personalized market intelligence dashboard</p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Market Pulse Report */}
            {marketPulseData ? (
              <section>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  <h2 className="text-xl font-semibold">Your Market Report</h2>
                </div>
                <MarketPulseReport data={marketPulseData} />
              </section>
            ) : (
              <section className="bg-card border border-border rounded-xl p-8 text-center">
                <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No Report Yet</h2>
                <p className="text-muted-foreground mb-4">Complete a Market Pulse analysis to see your personalized report</p>
                <Button onClick={() => window.location.href = '/salary-intelligence'}>
                  Start Analysis
                </Button>
              </section>
            )}

            {/* Job Matches */}
            <section>
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-primary" />
                <h2 className="text-xl font-semibold">Jobs Matched for You</h2>
              </div>
              {jobs.length > 0 ? (
                <JobMatchesList jobs={jobs} onApply={(id) => toast.info(`Applied to job ${id}`)} />
              ) : (
                <p className="text-muted-foreground">No job matches available yet.</p>
              )}
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <ReferrerOnboardingPrompt />
            
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-semibold mb-4">Import Your Profile</h3>
              <div className="space-y-4">
                <LinkedInImport onImported={handleLinkedInData} />
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-muted-foreground mb-3">Or upload your resume</p>
                  <ResumeUploader onParsed={handleResumeData} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
