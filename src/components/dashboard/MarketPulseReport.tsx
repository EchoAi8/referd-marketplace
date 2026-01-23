import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, Minus, Lightbulb, Target, Building2, Sparkles } from 'lucide-react';

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
    above: { color: 'text-green-500', bg: 'bg-green-500/10', icon: TrendingUp, label: 'Above Market' },
    below: { color: 'text-amber-500', bg: 'bg-amber-500/10', icon: TrendingDown, label: 'Below Market' },
    at: { color: 'text-blue-500', bg: 'bg-blue-500/10', icon: Minus, label: 'At Market Rate' },
  };

  const config = statusConfig[data.status] || statusConfig.at;
  const StatusIcon = config.icon;

  return (
    <div className="space-y-6">
      {/* Main Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <p className="text-sm text-muted-foreground mb-1">Your Total Comp</p>
          <p className="text-3xl font-bold">${data.currentSalary.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <p className="text-sm text-muted-foreground mb-1">Market Average</p>
          <p className="text-3xl font-bold">${data.marketAverage.toLocaleString()}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className={`${config.bg} border border-border rounded-xl p-6`}
        >
          <div className="flex items-center gap-2 mb-1">
            <StatusIcon className={`w-4 h-4 ${config.color}`} />
            <p className={`text-sm ${config.color}`}>{config.label}</p>
          </div>
          <p className="text-3xl font-bold">
            {data.difference >= 0 ? '+' : ''}${Math.abs(data.difference).toLocaleString()}
          </p>
        </motion.div>
      </div>

      {/* Percentile Bar */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-medium">Market Percentile</p>
          <span className={`text-2xl font-bold ${config.color}`}>{data.percentile}th</span>
        </div>
        <div className="relative h-3 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${data.percentile}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/70 rounded-full"
          />
          <div
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-primary rounded-full border-2 border-background shadow-lg"
            style={{ left: `calc(${data.percentile}% - 8px)` }}
          />
        </div>
        <div className="flex justify-between text-xs text-muted-foreground mt-2">
          <span>0th percentile</span>
          <span>50th</span>
          <span>100th percentile</span>
        </div>
      </motion.div>

      {/* Salary Range */}
      {data.salaryRange && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card border border-border rounded-xl p-6"
        >
          <p className="font-medium mb-4">Salary Range for Your Role</p>
          <div className="flex items-center justify-between gap-4">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Min</p>
              <p className="text-lg font-semibold">${data.salaryRange.min.toLocaleString()}</p>
            </div>
            <div className="flex-1 h-2 bg-muted rounded-full relative">
              <div className="absolute inset-y-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-green-500 to-emerald-500 rounded-full" />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-foreground rounded-full border-2 border-background"
                style={{ 
                  left: `${Math.min(100, Math.max(0, ((data.currentSalary - data.salaryRange.min) / (data.salaryRange.max - data.salaryRange.min)) * 100))}%` 
                }}
              />
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Max</p>
              <p className="text-lg font-semibold">${data.salaryRange.max.toLocaleString()}</p>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-3">
            Median: ${data.salaryRange.median.toLocaleString()}
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
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-5 h-5 text-primary" />
              <p className="font-medium">Growth Potential</p>
            </div>
            <p className="text-4xl font-bold text-primary">+{data.growthPotential}%</p>
            <p className="text-sm text-muted-foreground mt-1">Projected salary growth (2 years)</p>
          </motion.div>
        )}

        {data.topPayingCompanies && data.topPayingCompanies.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-card border border-border rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-3">
              <Building2 className="w-5 h-5 text-primary" />
              <p className="font-medium">Top Paying Companies</p>
            </div>
            <ul className="space-y-2">
              {data.topPayingCompanies.map((company, i) => (
                <li key={i} className="text-sm flex items-center gap-2">
                  <span className="w-5 h-5 rounded bg-muted flex items-center justify-center text-xs font-medium">
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
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="w-5 h-5 text-amber-500" />
          <p className="font-medium">Industry Insights</p>
        </div>
        <ul className="space-y-3">
          {data.industryInsights.map((insight, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
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
        className="bg-card border border-border rounded-xl p-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Target className="w-5 h-5 text-green-500" />
          <p className="font-medium">Recommendations</p>
        </div>
        <ul className="space-y-3">
          {data.recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-3 text-sm">
              <span className="w-5 h-5 rounded bg-green-500/10 text-green-500 flex items-center justify-center text-xs font-medium shrink-0">
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
