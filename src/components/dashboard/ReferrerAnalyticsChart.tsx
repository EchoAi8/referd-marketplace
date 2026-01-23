import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from "date-fns";
import { TrendingUp, BarChart3, PieChartIcon, Activity } from "lucide-react";

interface Referral {
  id: string;
  status: string;
  referral_fee: number;
  referrer_earnings: number;
  created_at: string;
  hired_at: string | null;
  paid_at: string | null;
}

interface ReferrerAnalyticsChartProps {
  referrals: Referral[];
}

const COLORS = {
  sage: "hsl(var(--sage))",
  mustard: "hsl(var(--mustard))",
  rose: "hsl(var(--rose))",
  forest: "hsl(var(--forest))",
  muted: "hsl(var(--muted-foreground))",
};

const STATUS_COLORS: Record<string, string> = {
  pending: "#71717a",
  contacted: "#3b82f6",
  interviewing: "#f59e0b",
  hired: "#8BA485",
  rejected: "#ef4444",
  expired: "#6b7280",
};

const ReferrerAnalyticsChart = ({ referrals }: ReferrerAnalyticsChartProps) => {
  // Generate monthly data for the last 6 months
  const monthlyData = useMemo(() => {
    const months = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthStart = startOfMonth(subMonths(now, i));
      const monthEnd = endOfMonth(subMonths(now, i));

      const monthReferrals = referrals.filter((r) => {
        const createdDate = new Date(r.created_at);
        return isWithinInterval(createdDate, { start: monthStart, end: monthEnd });
      });

      const hiredThisMonth = referrals.filter((r) => {
        if (!r.hired_at) return false;
        const hiredDate = new Date(r.hired_at);
        return isWithinInterval(hiredDate, { start: monthStart, end: monthEnd });
      });

      months.push({
        month: format(monthStart, "MMM"),
        fullMonth: format(monthStart, "MMMM yyyy"),
        referrals: monthReferrals.length,
        hires: hiredThisMonth.length,
        earnings: hiredThisMonth.reduce((sum, r) => sum + (r.referrer_earnings || 0), 0),
        potential: monthReferrals.reduce((sum, r) => sum + (r.referral_fee * 0.35 || 0), 0),
      });
    }

    return months;
  }, [referrals]);

  // Status breakdown for pie chart
  const statusData = useMemo(() => {
    const counts: Record<string, number> = {};
    referrals.forEach((r) => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });

    return Object.entries(counts).map(([status, count]) => ({
      name: status.charAt(0).toUpperCase() + status.slice(1),
      value: count,
      color: STATUS_COLORS[status] || "#6b7280",
    }));
  }, [referrals]);

  // Conversion funnel data
  const funnelData = useMemo(() => {
    const total = referrals.length;
    const contacted = referrals.filter((r) =>
      ["contacted", "interviewing", "hired"].includes(r.status)
    ).length;
    const interviewing = referrals.filter((r) =>
      ["interviewing", "hired"].includes(r.status)
    ).length;
    const hired = referrals.filter((r) => r.status === "hired").length;

    return [
      { stage: "Referred", count: total, fill: "#71717a" },
      { stage: "Contacted", count: contacted, fill: "#3b82f6" },
      { stage: "Interviewing", count: interviewing, fill: "#f59e0b" },
      { stage: "Hired", count: hired, fill: "#8BA485" },
    ];
  }, [referrals]);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (!active || !payload || !payload.length) return null;

    return (
      <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-3 shadow-xl">
        <p className="font-medium text-sm mb-2">{payload[0]?.payload?.fullMonth || label}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            <div
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium">
              {entry.name === "Earnings" || entry.name === "Potential"
                ? `£${entry.value.toLocaleString()}`
                : entry.value}
            </span>
          </div>
        ))}
      </div>
    );
  };

  if (referrals.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <BarChart3 className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p>No data yet. Add referrals to see analytics.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Referrals & Hires Over Time */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-sage" />
          <h3 className="font-semibold">Referral Activity (6 Months)</h3>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorReferrals" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8BA485" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8BA485" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorHires" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#C7A55F" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#C7A55F" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
              <XAxis
                dataKey="month"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                wrapperStyle={{ paddingTop: "10px" }}
                formatter={(value) => <span className="text-sm">{value}</span>}
              />
              <Area
                type="monotone"
                dataKey="referrals"
                name="Referrals"
                stroke="#8BA485"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorReferrals)"
              />
              <Area
                type="monotone"
                dataKey="hires"
                name="Hires"
                stroke="#C7A55F"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#colorHires)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-5 h-5 text-mustard" />
            <h3 className="font-semibold">Monthly Earnings</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
                <XAxis
                  dataKey="month"
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="hsl(var(--muted-foreground))"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `£${value}`}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="earnings" name="Earnings" fill="#8BA485" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Status Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl"
        >
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-5 h-5 text-sage" />
            <h3 className="font-semibold">Status Breakdown</h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (!active || !payload || !payload.length) return null;
                    const data = payload[0].payload;
                    return (
                      <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 shadow-xl">
                        <p className="text-sm font-medium">{data.name}</p>
                        <p className="text-sm text-muted-foreground">{data.value} referrals</p>
                      </div>
                    );
                  }}
                />
                <Legend
                  layout="vertical"
                  align="right"
                  verticalAlign="middle"
                  formatter={(value) => <span className="text-xs">{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Conversion Funnel */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="p-5 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2 mb-4">
          <Activity className="w-5 h-5 text-sage" />
          <h3 className="font-semibold">Conversion Funnel</h3>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={funnelData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} horizontal={false} />
              <XAxis type="number" hide />
              <YAxis
                type="category"
                dataKey="stage"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (!active || !payload || !payload.length) return null;
                  const data = payload[0].payload;
                  const rate = referrals.length > 0 
                    ? ((data.count / referrals.length) * 100).toFixed(0) 
                    : 0;
                  return (
                    <div className="bg-card/95 backdrop-blur-xl border border-border/50 rounded-lg p-2 shadow-xl">
                      <p className="text-sm font-medium">{data.stage}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.count} ({rate}%)
                      </p>
                    </div>
                  );
                }}
              />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {funnelData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>
    </div>
  );
};

export default ReferrerAnalyticsChart;
