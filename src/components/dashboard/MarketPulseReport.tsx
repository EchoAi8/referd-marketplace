import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lightbulb, Target, Building2, Sparkles, Zap } from 'lucide-react';

interface MarketPulseReportProps {
  data: {
    currentSalary: number;
    marketAverage: number;
    percentile: number;
    status: 'above' | 'below' | 'at';
    difference: number;
    industryInsights: string[];
    recommendations: string[];
    salaryRange?: { min: number; max: number; median: number };
    growthPotential?: number;
    topPayingCompanies?: string[];
    skillsPremium?: Record<string, number>;
  };
}

const MarketPulseReport = ({ data }: MarketPulseReportProps) => {
  const statusConfig = {
    above: { color: 'text-sage', bg: 'bg-sage/10', borderColor: 'border-sage/20', icon: TrendingUp, label: 'Above Market' },
    below: { color: 'text-rose', bg: 'bg-rose/10', borderColor: 'border-rose/20', icon: TrendingDown, label: 'Below Market' },
    at: { color: 'text-mustard', bg: 'bg-mustard/10', borderColor: 'border-mustard/20', icon: Minus, label: 'At Market Rate' },
  };

  const config = statusConfig[data.status] || statusConfig.at;
  const StatusIcon = config.icon;

  return (
    <div className="p-6 space-y-6">
      {/* Status Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${config.bg} ${config.borderColor} border`}
      >
        <StatusIcon className={`w-4 h-4 ${config.color}`} />
        <span className={`font-medium text-sm ${config.color}`}>{config.label}</span>
      </motion.div>

      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-muted/50 to-muted/20 border border-border/50 p-5"
        >
          <p className="text-sm text-muted-foreground mb-1 font-mono uppercase tracking-wider">Your Comp</p>
          <p className="text-2xl font-heading font-bold">£{data.currentSalary.toLocaleString()}</p>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-transparent to-foreground/5 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-xl bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 p-5"
        >
          <p className="text-sm text-sage/70 mb-1 font-mono uppercase tracking-wider">Market Avg</p>
          <p className="text-2xl font-heading font-bold text-sage">£{data.marketAverage.toLocaleString()}</p>
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-sage/10 blur-xl" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`relative overflow-hidden rounded-xl ${config.bg} ${config.borderColor} border p-5`}
        >
          <p className={`text-sm ${config.color} opacity-70 mb-1 font-mono uppercase tracking-wider`}>Difference</p>
          <p className={`text-2xl font-heading font-bold ${config.color}`}>
            {data.difference >= 0 ? '+' : ''}£{Math.abs(data.difference).toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Percentile Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="rounded-xl bg-gradient-to-br from-muted/30 to-transparent border border-border/50 p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-mustard" />
            <p className="font-medium">Market Percentile</p>
          </div>
          <span className={`text-2xl font-heading font-bold ${config.color}`}>{data.percentile}th</span>
        </div>
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.percentile}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage to-forest rounded-full"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-foreground rounded-full border-2 border-background shadow-lg"
            style={{ left: `calc(${data.percentile}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2 font-mono">
          <span>0th</span>
          <span>50th (median)</span>
          <span>100th</span>
        </div>
      </motion.div>

      {/* Salary Range */}
      {data.salaryRange && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="rounded-xl bg-gradient-to-br from-muted/30 to-transparent border border-border/50 p-5"
        >
          <p className="font-medium mb-4">Salary Range for Your Role</p>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-mono">MIN</p>
              <p className="text-lg font-heading font-semibold">£{data.salaryRange.min.toLocaleString()}</p>
            </div>
            <div className="flex-1 h-2 bg-muted rounded-full relative">
              <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-rose via-mustard to-sage rounded-full" />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full border-2 border-background shadow-lg"
                style={{ 
                  left: `${Math.min(100, Math.max(0, ((data.currentSalary - data.salaryRange.min) / (data.salaryRange.max - data.salaryRange.min)) * 100))}%` 
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-mono">MAX</p>
              <p className="text-lg font-heading font-semibold">£{data.salaryRange.max.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Median: £{data.salaryRange.median.toLocaleString()}
          </p>
        </motion.div>
      )}

      {/* Growth Potential & Top Companies */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.growthPotential && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="rounded-xl bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-sage" />
              <p className="font-medium">Growth Potential</p>
            </div>
            <p className="text-4xl font-heading font-bold text-sage">+{data.growthPotential}%</p>
            <p className="text-sm text-muted-foreground mt-1">Projected salary growth (2 years)</p>
          </motion.div>
        )}

        {data.topPayingCompanies && data.topPayingCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="rounded-xl bg-gradient-to-br from-mustard/10 to-mustard/5 border border-mustard/20 p-5"
          >
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-mustard" />
              <p className="font-medium">Top Paying Companies</p>
            </div>
            <ul className="space-y-2">
              {data.topPayingCompanies.map((company, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-mustard/20 text-mustard flex items-center justify-center text-xs font-medium">
                    {i + 1}
                  </span>
                  {company}
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </div>

      {/* Insights */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="rounded-xl bg-gradient-to-br from-muted/30 to-transparent border border-border/50 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-mustard" />
          <p className="font-medium">Industry Insights</p>
        </div>
        <ul className="space-y-3">
          {data.industryInsights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-sage mt-2 shrink-0" />
              <span className="text-muted-foreground">{insight}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="rounded-xl bg-gradient-to-br from-sage/10 to-sage/5 border border-sage/20 p-5"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-sage" />
          <p className="font-medium">Recommendations</p>
        </div>
        <ul className="space-y-3">
          {data.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-5 h-5 rounded bg-sage/20 text-sage flex items-center justify-center text-xs font-medium shrink-0">
                {i + 1}
              </span>
              <span className="text-muted-foreground">{rec}</span>
            </li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default MarketPulseReport;
