import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Linkedin, Loader2, CheckCircle2, Link2 } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface LinkedInData {
  fullName: string;
  jobTitle: string;
  company: string;
  yearsExperience: number;
  industry: string;
  skills: string[];
  linkedinUrl: string;
}

interface LinkedInImportProps {
  onImported: (data: LinkedInData) => void;
}

const LinkedInImport = ({ onImported }: LinkedInImportProps) => {
  const [linkedinUrl, setLinkedinUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [showManualEntry, setShowManualEntry] = useState(false);
  const [manualData, setManualData] = useState({
    fullName: '',
    jobTitle: '',
    company: '',
    yearsExperience: '',
    industry: '',
    skills: '',
  });

  const handleUrlImport = async () => {
    if (!linkedinUrl.trim()) {
      toast.error('Please enter your LinkedIn profile URL');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('linkedin-import', {
        body: { linkedinUrl }
      });

      if (error) throw error;

      if (data?.requiresManualEntry) {
        setShowManualEntry(true);
        toast.info('Please enter your profile details manually');
      } else if (data?.success && data.data) {
        onImported(data.data);
        toast.success('Profile imported successfully!');
      }
    } catch (err) {
      console.error('LinkedIn import error:', err);
      toast.error('Failed to import profile');
    } finally {
      setLoading(false);
    }
  };

  const handleManualSubmit = async () => {
    if (!manualData.fullName || !manualData.jobTitle) {
      toast.error('Please fill in at least your name and job title');
      return;
    }

    setLoading(true);
    try {
      const profileData: LinkedInData = {
        fullName: manualData.fullName,
        jobTitle: manualData.jobTitle,
        company: manualData.company,
        yearsExperience: parseInt(manualData.yearsExperience) || 0,
        industry: manualData.industry,
        skills: manualData.skills.split(',').map(s => s.trim()).filter(Boolean),
        linkedinUrl: linkedinUrl,
      };

      const { data, error } = await supabase.functions.invoke('linkedin-import', {
        body: { profileData }
      });

      if (error) throw error;

      onImported(profileData);
      toast.success('Profile saved successfully!');
    } catch (err) {
      console.error('Save error:', err);
      toast.error('Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (showManualEntry) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Linkedin className="w-4 h-4 text-[#0A66C2]" />
          <span>Enter your profile details</span>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              value={manualData.fullName}
              onChange={(e) => setManualData({ ...manualData, fullName: e.target.value })}
              placeholder="John Doe"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="jobTitle">Current Title</Label>
            <Input
              id="jobTitle"
              value={manualData.jobTitle}
              onChange={(e) => setManualData({ ...manualData, jobTitle: e.target.value })}
              placeholder="Senior Engineer"
              className="mt-1.5"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={manualData.company}
              onChange={(e) => setManualData({ ...manualData, company: e.target.value })}
              placeholder="TechCorp"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="yearsExp">Years Experience</Label>
            <Input
              id="yearsExp"
              type="number"
              value={manualData.yearsExperience}
              onChange={(e) => setManualData({ ...manualData, yearsExperience: e.target.value })}
              placeholder="5"
              className="mt-1.5"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="industry">Industry</Label>
          <Input
            id="industry"
            value={manualData.industry}
            onChange={(e) => setManualData({ ...manualData, industry: e.target.value })}
            placeholder="Technology"
            className="mt-1.5"
          />
        </div>

        <div>
          <Label htmlFor="skills">Skills (comma-separated)</Label>
          <Input
            id="skills"
            value={manualData.skills}
            onChange={(e) => setManualData({ ...manualData, skills: e.target.value })}
            placeholder="React, TypeScript, Node.js"
            className="mt-1.5"
          />
        </div>

        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={() => setShowManualEntry(false)}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            onClick={handleManualSubmit}
            disabled={loading}
            className="flex-1"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Save Profile
              </>
            )}
          </Button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Linkedin className="w-5 h-5 text-[#0A66C2]" />
        <span className="font-medium">Import from LinkedIn</span>
      </div>

      <div className="flex gap-2">
        <Input
          placeholder="https://linkedin.com/in/yourprofile"
          value={linkedinUrl}
          onChange={(e) => setLinkedinUrl(e.target.value)}
          className="flex-1"
        />
        <Button
          onClick={handleUrlImport}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Link2 className="w-4 h-4" />
          )}
        </Button>
      </div>

      <button
        onClick={() => setShowManualEntry(true)}
        className="text-sm text-muted-foreground hover:text-foreground underline-offset-4 hover:underline"
      >
        Or enter details manually
      </button>
    </div>
  );
};

export default LinkedInImport;
