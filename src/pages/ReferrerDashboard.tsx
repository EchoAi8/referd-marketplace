import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import {
  LogOut,
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle2,
  XCircle,
  UserPlus,
  ArrowUpRight,
  Briefcase,
  ChevronRight,
  Send,
  Mail,
  Phone,
  Building2
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Referral {
  id: string;
  referred_email: string;
  referred_name: string | null;
  status: string;
  referral_fee: number;
  referrer_earnings: number;
  created_at: string;
  hired_at: string | null;
  paid_at: string | null;
  job_match_id: string | null;
}

interface JobMatch {
  id: string;
  title: string;
  company: string;
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; icon: React.ElementType }> = {
  pending: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Clock },
  contacted: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Mail },
  interviewing: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: Users },
  hired: { color: 'text-sage', bg: 'bg-sage/10', icon: CheckCircle2 },
  rejected: { color: 'text-rose', bg: 'bg-rose/10', icon: XCircle },
  expired: { color: 'text-muted-foreground', bg: 'bg-muted', icon: Clock },
};

const ReferrerDashboard = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const [referrals, setReferrals] = useState<Referral[]>([]);
  const [jobs, setJobs] = useState<JobMatch[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newReferral, setNewReferral] = useState({
    name: '',
    email: '',
    jobId: '',
    notes: ''
  });

  const stats = {
    totalReferrals: referrals.length,
    activeReferrals: referrals.filter(r => ['pending', 'contacted', 'interviewing'].includes(r.status)).length,
    successfulHires: referrals.filter(r => r.status === 'hired').length,
    totalEarnings: referrals.reduce((sum, r) => sum + (r.referrer_earnings || 0), 0),
    pendingEarnings: referrals
      .filter(r => r.status === 'hired' && !r.paid_at)
      .reduce((sum, r) => sum + (r.referrer_earnings || 0), 0),
  };

  useEffect(() => {
    document.title = 'Referrer Dashboard | Referd';
    fetchData();
  }, [user]);

  const fetchData = async () => {
    if (!user) return;
    
    try {
      const [referralsRes, jobsRes] = await Promise.all([
        supabase
          .from('referrals')
          .select('*')
          .eq('referrer_id', user.id)
          .order('created_at', { ascending: false }),
        supabase
          .from('job_matches')
          .select('id, title, company')
          .eq('is_active', true)
      ]);

      if (referralsRes.data) setReferrals(referralsRes.data);
      if (jobsRes.data) setJobs(jobsRes.data);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddReferral = async () => {
    if (!user || !newReferral.email) {
      toast.error('Please enter an email address');
      return;
    }

    try {
      const { error } = await supabase.from('referrals').insert({
        referrer_id: user.id,
        referred_email: newReferral.email,
        referred_name: newReferral.name || null,
        job_match_id: newReferral.jobId || null,
        status: 'pending'
      });

      if (error) throw error;

      toast.success('Referral added successfully!');
      setShowAddDialog(false);
      setNewReferral({ name: '', email: '', jobId: '', notes: '' });
      fetchData();
    } catch (err) {
      console.error('Error adding referral:', err);
      toast.error('Failed to add referral');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full"
        />
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
              <Users className="w-5 h-5 text-foreground" />
            </motion.div>
            <div>
              <span className="font-heading font-bold text-foreground">Referrer Portal</span>
              <p className="text-xs text-muted-foreground">35% of every placement</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate('/dashboard')}
              className="text-muted-foreground hover:text-foreground"
            >
              <Briefcase className="w-4 h-4 mr-2" />
              Talent Dashboard
            </Button>
            <span className="text-sm text-muted-foreground hidden sm:block">{user?.email}</span>
            <Button variant="ghost" size="sm" onClick={signOut}>
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome + Stats */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-8"
        >
          <h1 className="text-3xl font-heading font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Your Referral Network
          </h1>
          <p className="text-muted-foreground">Track referrals, monitor placements, and watch your earnings grow.</p>
        </motion.div>

        {/* Stats Grid with Glassmorphism */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { 
              label: 'Total Referrals', 
              value: stats.totalReferrals, 
              icon: Users, 
              color: 'from-sage/20 to-sage/5',
              iconBg: 'bg-sage/20',
              iconColor: 'text-sage'
            },
            { 
              label: 'Active Pipeline', 
              value: stats.activeReferrals, 
              icon: TrendingUp, 
              color: 'from-blue-500/20 to-blue-500/5',
              iconBg: 'bg-blue-500/20',
              iconColor: 'text-blue-500'
            },
            { 
              label: 'Successful Hires', 
              value: stats.successfulHires, 
              icon: CheckCircle2, 
              color: 'from-emerald-500/20 to-emerald-500/5',
              iconBg: 'bg-emerald-500/20',
              iconColor: 'text-emerald-500'
            },
            { 
              label: 'Total Earnings', 
              value: `£${stats.totalEarnings.toLocaleString()}`, 
              icon: DollarSign, 
              color: 'from-mustard/20 to-mustard/5',
              iconBg: 'bg-mustard/20',
              iconColor: 'text-mustard',
              subValue: stats.pendingEarnings > 0 ? `£${stats.pendingEarnings.toLocaleString()} pending` : undefined
            },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`relative overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br ${stat.color} backdrop-blur-xl p-5`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-heading font-bold text-foreground">{stat.value}</p>
                  {stat.subValue && (
                    <p className="text-xs text-muted-foreground mt-1">{stat.subValue}</p>
                  )}
                </div>
                <div className={`w-10 h-10 rounded-xl ${stat.iconBg} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
              </div>
              {/* Decorative glow */}
              <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-gradient-to-br from-transparent to-white/5 blur-2xl" />
            </motion.div>
          ))}
        </div>

        {/* Earnings Distribution (35/35/30 model) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8 p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl"
        >
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-mustard" />
            Fee Distribution Model
          </h3>
          <div className="flex gap-4">
            <div className="flex-1 p-4 rounded-xl bg-sage/10 border border-sage/20 text-center">
              <p className="text-3xl font-heading font-bold text-sage">35%</p>
              <p className="text-sm text-muted-foreground">To You (Referrer)</p>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-rose/10 border border-rose/20 text-center">
              <p className="text-3xl font-heading font-bold text-rose">35%</p>
              <p className="text-sm text-muted-foreground">To Talent</p>
            </div>
            <div className="flex-1 p-4 rounded-xl bg-muted border border-border text-center">
              <p className="text-3xl font-heading font-bold text-foreground/70">30%</p>
              <p className="text-sm text-muted-foreground">Platform</p>
            </div>
          </div>
        </motion.div>

        {/* Referrals Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl overflow-hidden"
        >
          <div className="p-5 border-b border-border/50 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Your Referrals</h2>
              <p className="text-sm text-muted-foreground">Track the progress of people you've referred</p>
            </div>
            <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
              <DialogTrigger asChild>
                <Button className="bg-gradient-to-r from-sage to-forest text-foreground shadow-lg shadow-sage/20 hover:shadow-sage/30 transition-shadow">
                  <UserPlus className="w-4 h-4 mr-2" />
                  Add Referral
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-card/95 backdrop-blur-2xl border-border/50">
                <DialogHeader>
                  <DialogTitle className="font-heading">Add New Referral</DialogTitle>
                  <DialogDescription>
                    Refer someone you know to open positions. You'll earn 35% of the placement fee when they get hired.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Name</label>
                    <Input
                      placeholder="John Smith"
                      value={newReferral.name}
                      onChange={(e) => setNewReferral(prev => ({ ...prev, name: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Email *</label>
                    <Input
                      type="email"
                      placeholder="john@example.com"
                      value={newReferral.email}
                      onChange={(e) => setNewReferral(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1.5 block">Position (Optional)</label>
                    <Select
                      value={newReferral.jobId}
                      onValueChange={(value) => setNewReferral(prev => ({ ...prev, jobId: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a position" />
                      </SelectTrigger>
                      <SelectContent>
                        {jobs.map(job => (
                          <SelectItem key={job.id} value={job.id}>
                            {job.title} at {job.company}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button 
                    onClick={handleAddReferral} 
                    className="w-full bg-gradient-to-r from-sage to-forest text-foreground"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Referral
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {referrals.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent border-border/50">
                  <TableHead>Candidate</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Potential Fee</TableHead>
                  <TableHead>Your Earnings</TableHead>
                  <TableHead>Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <AnimatePresence>
                  {referrals.map((referral, i) => {
                    const statusConfig = STATUS_CONFIG[referral.status] || STATUS_CONFIG.pending;
                    const StatusIcon = statusConfig.icon;
                    return (
                      <motion.tr
                        key={referral.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="group hover:bg-muted/30 border-border/50"
                      >
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-sage/30 to-forest/30 flex items-center justify-center text-sm font-medium text-foreground">
                              {referral.referred_name?.[0] || referral.referred_email[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="font-medium text-foreground">
                                {referral.referred_name || 'Pending'}
                              </p>
                              <p className="text-xs text-muted-foreground">{referral.referred_email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig.bg} ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {referral.status.charAt(0).toUpperCase() + referral.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {referral.referral_fee > 0 ? `£${referral.referral_fee.toLocaleString()}` : '—'}
                        </TableCell>
                        <TableCell>
                          {referral.referrer_earnings > 0 ? (
                            <span className="text-sage font-medium">
                              £{referral.referrer_earnings.toLocaleString()}
                              {referral.paid_at && (
                                <CheckCircle2 className="w-3 h-3 inline ml-1 text-emerald-500" />
                              )}
                            </span>
                          ) : (
                            <span className="text-muted-foreground">—</span>
                          )}
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">
                          {new Date(referral.created_at).toLocaleDateString('en-GB', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </TableCell>
                      </motion.tr>
                    );
                  })}
                </AnimatePresence>
              </TableBody>
            </Table>
          ) : (
            <div className="p-12 text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-muted flex items-center justify-center"
              >
                <UserPlus className="w-8 h-8 text-muted-foreground" />
              </motion.div>
              <h3 className="text-lg font-semibold mb-2">No referrals yet</h3>
              <p className="text-muted-foreground mb-4 max-w-sm mx-auto">
                Start referring talented professionals in your network and earn 35% of every successful placement.
              </p>
              <Button 
                onClick={() => setShowAddDialog(true)}
                className="bg-gradient-to-r from-sage to-forest text-foreground"
              >
                <UserPlus className="w-4 h-4 mr-2" />
                Make Your First Referral
              </Button>
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
};

export default ReferrerDashboard;
