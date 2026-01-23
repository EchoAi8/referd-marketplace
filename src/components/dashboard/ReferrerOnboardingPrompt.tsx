import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Users, DollarSign, ArrowRight, CheckCircle2, X } from 'lucide-react';

const ReferrerOnboardingPrompt = () => {
  const [dismissed, setDismissed] = useState(false);
  const [joining, setJoining] = useState(false);
  const { user } = useAuth();

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
        } else {
          throw error;
        }
      } else {
        toast.success('Welcome to the Referrer network! 🎉');
      }
      setDismissed(true);
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
        className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 rounded-2xl p-6 overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
        
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
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">Become a Referrer</h3>
              <p className="text-sm text-muted-foreground">Earn from your network</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <DollarSign className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Earn Referral Bonuses</p>
                <p className="text-xs text-muted-foreground">Up to $5,000 per successful placement</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 rounded-lg bg-background/50">
              <CheckCircle2 className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-sm">Exclusive Access</p>
                <p className="text-xs text-muted-foreground">See jobs before they're public</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              onClick={handleJoinAsReferrer}
              disabled={joining}
              className="flex-1"
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
              className="sm:w-auto"
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
