import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { AlertTriangle, Clock, DollarSign, Eye, Brain, FileText, Users, Bot } from "lucide-react";

const problems = [
  {
    icon: DollarSign,
    title: "Agency Fees Are Extortionate",
    desc: "15–30% of a candidate's salary goes to the agency. For a £60K hire, that's up to £18,000 — for an introduction.",
    color: "text-rose",
    bgColor: "bg-rose/20",
  },
  {
    icon: Eye,
    title: "Job Boards Are Reactive",
    desc: "Candidates apply and pray. The best talent doesn't sit on job boards — they're already employed and not looking.",
    color: "text-mustard",
    bgColor: "bg-mustard/20",
  },
  {
    icon: Users,
    title: "Referral Schemes Are Broken",
    desc: "A £100 supermarket voucher for helping hire a £80K executive? Internal referral incentives insult the people making them.",
    color: "text-referrer",
    bgColor: "bg-referrer/20",
  },
  {
    icon: Clock,
    title: "Old-Fashioned Processes",
    desc: "Weeks of back-and-forth emails, phone screens, and outdated ATS systems. Recruitment is stuck in 2005.",
    color: "text-sage",
    bgColor: "bg-sage/20",
  },
  {
    icon: FileText,
    title: "CVs Don't Show the Real Person",
    desc: "A list of bullet points and buzzwords. Qualifications on paper don't capture culture fit, passion, or potential.",
    color: "text-talent",
    bgColor: "bg-talent/20",
  },
  {
    icon: Bot,
    title: "No AI or Modern Technology",
    desc: "While every other industry innovates, recruitment relies on cold calls and keyword matching. No ML, no intelligence, no insight.",
    color: "text-brand",
    bgColor: "bg-brand/20",
  },
  {
    icon: Brain,
    title: "Time, Money & Energy Wasted",
    desc: "Employers spend an average of 42 days and £3,000+ per hire. Most of that is wasted on the wrong candidates.",
    color: "text-rose",
    bgColor: "bg-rose/20",
  },
  {
    icon: AlertTriangle,
    title: "Zero Transparency",
    desc: "Candidates don't know where they stand. Employers don't know what they're paying for. Agencies like it that way.",
    color: "text-mustard",
    bgColor: "bg-mustard/20",
  },
];

const RecruitmentBroken = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 md:py-32 bg-background overflow-hidden">
      {/* Top overlap */}
      <div className="absolute -top-1 left-0 right-0 h-32 bg-gradient-to-b from-foreground to-transparent pointer-events-none z-10" />

      <div className="container mx-auto px-6 relative z-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose/10 mb-6">
            <AlertTriangle className="w-4 h-4 text-rose" />
            <span className="text-xs uppercase tracking-[0.2em] text-rose font-semibold">
              The Problem
            </span>
          </div>

          <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold leading-tight max-w-5xl mx-auto">
            But is recruitment{" "}
            <span className="text-rose">broken</span>?
          </h2>
          <p className="mt-6 text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto">
            Short answer: <span className="text-foreground font-bold">Yes</span>. The industry is riddled with inefficiency, outdated processes, and misaligned incentives.
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {problems.map((problem, index) => {
            const IconComponent = problem.icon;
            return (
              <motion.div
                key={problem.title}
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 h-full hover:border-rose/30 transition-colors duration-300">
                  <div className={`w-12 h-12 rounded-xl ${problem.bgColor} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-6 h-6 ${problem.color}`} />
                  </div>
                  <h4 className="text-lg font-heading font-bold text-foreground mb-2">
                    {problem.title}
                  </h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {problem.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Closer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-2xl md:text-3xl font-heading font-medium text-foreground/80 max-w-4xl mx-auto">
            The recruitment industry is worth{" "}
            <span className="text-rose font-bold">half a trillion dollars</span>. Yet it still operates like it's{" "}
            <span className="text-rose font-bold">1995</span>.
          </p>
        </motion.div>
      </div>

      {/* Bottom gradient */}
      <div className="absolute -bottom-1 left-0 right-0 h-40 bg-gradient-to-t from-foreground to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default RecruitmentBroken;
