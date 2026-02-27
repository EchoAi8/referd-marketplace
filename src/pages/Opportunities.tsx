import PageLayout from "@/components/layout/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { MapPin, Briefcase, ArrowRight, ArrowDown } from "lucide-react";
import { useState, useRef } from "react";

const opportunities = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "London, UK",
    type: "Full-time",
    salary: "£90k – £120k",
    reward: "£4,500",
    rewardNum: 4500,
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript"],
    color: "var(--color-talent)",
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "£80k – £100k",
    reward: "£3,500",
    rewardNum: 3500,
    posted: "1 day ago",
    tags: ["B2B", "SaaS", "Agile"],
    color: "var(--color-referrer)",
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Manchester, UK",
    type: "Full-time",
    salary: "£55k – £75k",
    reward: "£2,800",
    rewardNum: 2800,
    posted: "3 days ago",
    tags: ["Figma", "User Research", "Prototyping"],
    color: "var(--color-brand)",
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudFirst",
    location: "Remote",
    type: "Contract",
    salary: "£600/day",
    reward: "£3,000",
    rewardNum: 3000,
    posted: "5 hours ago",
    tags: ["AWS", "Kubernetes", "Terraform"],
    color: "var(--color-talent)",
  },
  {
    id: 5,
    title: "Marketing Director",
    company: "GrowthCo",
    location: "London, UK",
    type: "Full-time",
    salary: "£100k – £130k",
    reward: "£5,200",
    rewardNum: 5200,
    posted: "1 week ago",
    tags: ["B2C", "Growth", "Brand"],
    color: "var(--color-referrer)",
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataLabs",
    location: "Edinburgh, UK",
    type: "Full-time",
    salary: "£70k – £90k",
    reward: "£3,800",
    rewardNum: 3800,
    posted: "4 days ago",
    tags: ["Python", "ML", "SQL"],
    color: "var(--color-brand)",
  },
];

const Opportunities = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const filters = ["All", "Remote", "London", "Contract", "Full-time"];

  const filteredOpportunities = opportunities.filter((opp) => {
    if (activeFilter === "All") return true;
    return (
      opp.location.includes(activeFilter) ||
      opp.type.includes(activeFilter)
    );
  });

  return (
    <PageLayout>
      {/* ── Cinematic Hero ── */}
      <motion.section
        ref={heroRef}
        style={{ opacity: heroOpacity, scale: heroScale }}
        className="relative h-screen flex flex-col items-center justify-center bg-foreground overflow-hidden"
      >
        {/* Floating reward numbers background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          {["£4,500", "£3,800", "£5,200", "£2,800", "£3,000", "£3,500"].map((amount, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.04 }}
              transition={{ delay: i * 0.3, duration: 1 }}
              className="absolute font-heading font-black text-background"
              style={{
                fontSize: `${8 + Math.random() * 12}vw`,
                top: `${10 + (i % 3) * 30}%`,
                left: `${5 + (i % 2) * 40 + Math.random() * 20}%`,
                transform: `rotate(${-15 + Math.random() * 30}deg)`,
              }}
            >
              {amount}
            </motion.span>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-background/40 font-medium mb-6"
        >
          The Referral Runway
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="font-heading font-black text-background text-center leading-[0.9]"
          style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
        >
          EARN
          <br />
          <span className="text-sage">BIG.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-background/50 text-lg md:text-xl max-w-md text-center mt-6"
        >
          Know someone perfect for the role? Connect them. Get paid.
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-12"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <ArrowDown className="w-6 h-6 text-background/30" />
          </motion.div>
        </motion.div>
      </motion.section>

      {/* ── Sticky Filter Bar ── */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-foreground/5">
        <div className="container mx-auto max-w-6xl px-6 py-4 flex items-center gap-3 overflow-x-auto scrollbar-none">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-5 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                activeFilter === f
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-foreground/10"
              }`}
            >
              {f}
            </button>
          ))}
          <div className="ml-auto text-sm text-muted-foreground whitespace-nowrap">
            {filteredOpportunities.length} live roles
          </div>
        </div>
      </div>

      {/* ── Editorial Card Feed ── */}
      <section className="py-8 md:py-16 px-6">
        <div className="container mx-auto max-w-5xl space-y-6">
          {filteredOpportunities.map((opp, index) => (
            <motion.article
              key={opp.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.05 }}
              className="group relative grid md:grid-cols-[1fr_auto] items-stretch rounded-2xl border border-foreground/5 bg-muted/20 overflow-hidden hover:border-foreground/15 transition-all duration-500"
            >
              {/* Left: Content */}
              <div className="p-8 md:p-10 flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium">
                      {opp.company}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
                    <span className="text-xs text-muted-foreground">{opp.posted}</span>
                  </div>

                  <h2 className="font-heading font-bold text-2xl md:text-3xl text-foreground mb-4 group-hover:text-sage transition-colors duration-300">
                    {opp.title}
                  </h2>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" />
                      {opp.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Briefcase className="w-3.5 h-3.5" />
                      {opp.type}
                    </span>
                    <span className="font-medium text-foreground">{opp.salary}</span>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {opp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full text-xs font-medium bg-foreground/5 text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <MagneticButton
                    className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-full font-semibold text-sm group-hover:bg-sage group-hover:text-foreground transition-colors duration-300"
                    strength={0.3}
                  >
                    Refer Someone
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </MagneticButton>
                </div>
              </div>

              {/* Right: Big Reward Panel */}
              <div
                className="relative flex flex-col items-center justify-center px-10 py-8 md:py-0 md:min-w-[220px]"
                style={{ backgroundColor: `hsl(${opp.color} / 0.08)` }}
              >
                <div
                  className="absolute inset-0 opacity-[0.03]"
                  style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, hsl(${opp.color}), transparent 70%)`,
                  }}
                />
                <p className="text-xs tracking-[0.2em] uppercase text-muted-foreground font-medium mb-2 relative z-10">
                  Referral Reward
                </p>
                <p
                  className="font-heading font-black text-4xl md:text-5xl relative z-10"
                  style={{ color: `hsl(${opp.color})` }}
                >
                  {opp.reward}
                </p>
                <p className="text-xs text-muted-foreground mt-2 relative z-10">
                  paid on hire
                </p>
              </div>
            </motion.article>
          ))}

          {filteredOpportunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24"
            >
              <p className="text-xl text-muted-foreground mb-4">
                No roles match that filter.
              </p>
              <button
                onClick={() => setActiveFilter("All")}
                className="text-sage hover:underline font-medium"
              >
                Show all roles
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-6 bg-foreground">
        <div className="container mx-auto max-w-3xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold text-background mb-6"
          >
            This is just the start.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-background/50 mb-10 max-w-lg mx-auto"
          >
            Sign up to unlock exclusive roles, track your referrals, and maximise your earning potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <MagneticButton className="btn-primary" strength={0.4}>
              Join Referd
            </MagneticButton>
            <MagneticButton
              onClick={() => navigateWithTransition("/salary-intelligence")}
              className="px-8 py-4 border border-background/20 text-background rounded-full font-semibold hover:bg-background/10 transition-colors"
              strength={0.4}
            >
              Check Your Salary
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Opportunities;
