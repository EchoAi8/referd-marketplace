import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, ArrowRight, CheckCircle2, X, Sparkles } from 'lucide-react';

const ReferrerOnboardingPrompt = () => {
  const [dismissed, setDismissed] = useState(false);
  const [joining, setJoining] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleJoinAsReferrer = async () => {
    if (!user) return;
    
    setJoining(true);
    try {
      const { error } = await supabase
        .from('user_roles')
        .insert({ user_id: user.id, role: 'referrer' });

      if (error) {
        if (error.code === '23505') {
          toast.info('You\'re already registered as a Referrer!');
          navigate('/referrer');
        } else {
          throw error;
        }
      } else {
        toast.success('Welcome to the Referrer network! 🎉');
        navigate('/referrer');
      }
    } catch (err) {
      console.error('Join error:', err);
      toast.error('Failed to join. Please try again.');
    } finally {
      setJoining(false);
    }
  };

  if (dismissed) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="relative rounded-2xl border border-border/50 bg-gradient-to-br from-sage/10 via-sage/5 to-transparent backdrop-blur-xl p-6 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-sage/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-mustard/5 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
        
        {/* Dismiss button */}
        <button
          onClick={() => setDismissed(true)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="relative">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-sage/20 to-sage/10 flex items-center justify-center shadow-lg shadow-sage/10">
              <Users className="w-6 h-6 text-sage" />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-lg flex items-center gap-2">
                Become a Referrer
                <Sparkles className="w-4 h-4 text-mustard" />
              </h3>
              <p className="text-sm text-muted-foreground">Earn 35% of every placement</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="space-y-2 mb-6">
            <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
              <DollarSign className="w-5 h-5 text-sage shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Earn Referral Bonuses</p>
                <p className="text-xs text-muted-foreground">Up to £5,000+ per successful placement</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-xl bg-card/50 border border-border/30">
              <CheckCircle2 className="w-5 h-5 text-sage shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Exclusive Access</p>
                <p className="text-xs text-muted-foreground">See jobs before they're public</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleJoinAsReferrer}
              disabled={joining}
              className="w-full bg-gradient-to-r from-sage to-forest text-foreground shadow-lg shadow-sage/20 hover:shadow-sage/30 transition-shadow"
              size="lg"
            >
              {joining ? (
                <>
                  <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
                  Joining...
                </>
              ) : (
                <>
                  Join as Referrer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </Button>
            <Button
              variant="ghost"
              onClick={() => setDismissed(true)}
              className="text-muted-foreground hover:text-foreground"
              size="sm"
            >
              Maybe later
            </Button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ReferrerOnboardingPrompt;
