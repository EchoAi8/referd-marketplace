import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { MapPin, DollarSign, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';

interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string | null;
  salary_range: string | null;
  match_score: number | null;
  skills_matched: string[] | null;
  description: string | null;
  external_url: string | null;
}

interface JobMatchesListProps {
  jobs: JobMatch[];
  onApply?: (jobId: string) => void;
}

const JobMatchesList = ({ jobs, onApply }: JobMatchesListProps) => {
  return (
    <div className="space-y-4">
      {jobs.map((job, index) => (
        <motion.div
          key={job.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-colors group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-2">
                <h3 className="font-semibold text-lg truncate">{job.title}</h3>
                {job.match_score && job.match_score >= 90 && (
                  <span className="shrink-0 inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-500/10 text-green-500 text-xs font-medium">
                    <Sparkles className="w-3 h-3" />
                    Top Match
                  </span>
                )}
              </div>
              
              <p className="text-muted-foreground mb-3">{job.company}</p>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                {job.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </span>
                )}
                {job.salary_range && (
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4" />
                    {job.salary_range}
                  </span>
                )}
              </div>

              {job.skills_matched && job.skills_matched.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {job.skills_matched.slice(0, 5).map((skill, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      {skill}
                    </span>
                  ))}
                </div>
              )}

              {job.description && (
                <p className="text-sm text-muted-foreground mt-3 line-clamp-2">
                  {job.description}
                </p>
              )}
            </div>

            <div className="flex flex-col items-end gap-3 shrink-0">
              {job.match_score && (
                <div className="text-right">
                  <div className="relative w-14 h-14">
                    <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-muted"
                      />
                      <path
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeDasharray={`${job.match_score}, 100`}
                        className={job.match_score >= 80 ? 'text-green-500' : job.match_score >= 60 ? 'text-amber-500' : 'text-primary'}
                      />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-bold">
                      {job.match_score}%
                    </span>
                  </div>
                </div>
              )}

              <Button
                size="sm"
                onClick={() => onApply?.(job.id)}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <ExternalLink className="w-4 h-4 mr-1.5" />
                Apply
              </Button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default JobMatchesList;
