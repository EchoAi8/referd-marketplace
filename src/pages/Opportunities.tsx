import PageLayout from "@/components/layout/PageLayout";
import { motion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { MapPin, Briefcase, ArrowRight, Sparkles, PoundSterling } from "lucide-react";
import { useMemo, useRef, useState } from "react";

type Opportunity = {
  id: number;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  reward: string;
  rewardNum: number;
  posted: string;
  tags: string[];
  lane: "Brands" | "Referrers" | "Talent";
};

const opportunities: Opportunity[] = [
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
    lane: "Talent",
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
    lane: "Brands",
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
    tags: ["Figma", "Research", "Prototyping"],
    lane: "Talent",
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
    lane: "Referrers",
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
    lane: "Brands",
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
    lane: "Referrers",
  },
];

const filters = ["All", "Big Rewards", "Remote", "Fresh"] as const;
type Filter = (typeof filters)[number];

const Opportunities = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [activeFilter, setActiveFilter] = useState<Filter>("All");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });

  const heroY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 220]);

  const filteredOpportunities = useMemo(() => {
    if (activeFilter === "Big Rewards") return opportunities.filter((o) => o.rewardNum >= 4000);
    if (activeFilter === "Remote") return opportunities.filter((o) => o.location.toLowerCase().includes("remote"));
    if (activeFilter === "Fresh") return opportunities.filter((o) => o.posted.includes("hours") || o.posted.includes("1 day"));
    return opportunities;
  }, [activeFilter]);

  return (
    <PageLayout>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[92vh] bg-foreground overflow-hidden">
        <motion.div
          style={{ y: bgY }}
          className="absolute inset-0 pointer-events-none opacity-20"
        >
          <div className="absolute -top-24 -left-20 w-[32rem] h-[32rem] rounded-full bg-referrer blur-3xl" />
          <div className="absolute top-1/4 -right-24 w-[28rem] h-[28rem] rounded-full bg-brand blur-3xl" />
          <div className="absolute -bottom-24 left-1/3 w-[30rem] h-[30rem] rounded-full bg-talent blur-3xl" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 container mx-auto px-6 pt-36 pb-20"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-background/10 text-background/80 text-xs tracking-[0.2em] uppercase"
          >
            <Sparkles className="w-3 h-3" />
            Opportunity Runway
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="mt-6 font-heading font-black text-background leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.2rem, 12vw, 10rem)" }}
          >
            NOT A
            <br />
            JOB BOARD.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-2xl text-lg md:text-2xl text-background/70"
          >
            A people-powered deal flow where introductions become outcomes — and outcomes pay.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-10 flex flex-wrap gap-3"
          >
            <button className="px-4 py-2 rounded-full bg-background text-foreground text-sm font-semibold">Talent Wins</button>
            <button className="px-4 py-2 rounded-full bg-referrer text-foreground text-sm font-semibold">Referrer Earns</button>
            <button className="px-4 py-2 rounded-full bg-brand text-foreground text-sm font-semibold">Brands Move Faster</button>
          </motion.div>
        </motion.div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Filter rail */}
      <section className="sticky top-0 z-30 border-y border-border bg-background/85 backdrop-blur-xl">
        <div className="container mx-auto max-w-7xl px-6 py-4 flex flex-wrap items-center gap-3">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeFilter === filter
                  ? "bg-foreground text-background"
                  : "bg-muted text-muted-foreground hover:bg-muted/70"
              }`}
            >
              {filter}
            </button>
          ))}
          <p className="ml-auto text-sm text-muted-foreground">{filteredOpportunities.length} active opportunities</p>
        </div>
      </section>

      {/* Runway cards */}
      <section className="py-12 md:py-20 bg-background">
        <div className="container mx-auto max-w-7xl px-6">
          <div className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory">
            {filteredOpportunities.map((opp, index) => {
              const laneClass =
                opp.lane === "Talent"
                  ? "text-talent"
                  : opp.lane === "Referrers"
                    ? "text-referrer"
                    : "text-brand";

              return (
                <motion.article
                  key={opp.id}
                  initial={{ opacity: 0, x: 80, rotate: index % 2 === 0 ? 2 : -2 }}
                  whileInView={{ opacity: 1, x: 0, rotate: index % 2 === 0 ? 1 : -1 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: index * 0.08 }}
                  className="snap-center min-w-[85vw] md:min-w-[40rem] lg:min-w-[46rem] rounded-3xl border border-border bg-card overflow-hidden shadow-lg"
                >
                  <div className="grid md:grid-cols-[0.95fr_1.05fr] min-h-[30rem]">
                    <div className="relative p-8 md:p-10 bg-foreground text-background flex flex-col justify-between">
                      <div>
                        <p className="text-xs tracking-[0.22em] uppercase text-background/50 mb-4">Referral reward</p>
                        <p className="font-heading font-black leading-none" style={{ fontSize: "clamp(3rem, 7vw, 5.25rem)" }}>
                          {opp.reward}
                        </p>
                        <p className="mt-2 text-sm text-background/60">Paid on successful hire</p>
                      </div>
                      <div className="inline-flex items-center gap-2 text-sm text-background/70">
                        <PoundSterling className="w-4 h-4" />
                        Higher-trust, higher-return referrals
                      </div>
                    </div>

                    <div className="p-8 md:p-10 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.18em] text-muted-foreground mb-4">
                          <span>{opp.company}</span>
                          <span>•</span>
                          <span className={laneClass}>{opp.lane}</span>
                        </div>

                        <h2 className="font-heading font-bold text-2xl md:text-4xl leading-tight text-card-foreground">
                          {opp.title}
                        </h2>

                        <div className="mt-5 space-y-2 text-sm text-muted-foreground">
                          <p className="inline-flex items-center gap-2"><MapPin className="w-4 h-4" />{opp.location}</p>
                          <p className="inline-flex items-center gap-2"><Briefcase className="w-4 h-4" />{opp.type} · {opp.salary}</p>
                          <p className="text-xs">Posted {opp.posted}</p>
                        </div>

                        <div className="mt-6 flex flex-wrap gap-2">
                          {opp.tags.map((tag) => (
                            <span key={tag} className="px-3 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      <MagneticButton
                        className="mt-8 inline-flex items-center gap-2 px-6 py-3 rounded-full bg-foreground text-background font-semibold hover:bg-primary hover:text-primary-foreground transition-colors"
                        strength={0.3}
                      >
                        Make an Introduction
                        <ArrowRight className="w-4 h-4" />
                      </MagneticButton>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* Impact strip */}
      <section className="px-6 pb-24 bg-background">
        <div className="container mx-auto max-w-7xl grid md:grid-cols-3 gap-4">
          {[
            { title: "Talent", text: "Know your market value and enter warm intros, not cold queues.", className: "bg-talent text-foreground" },
            { title: "Referrers", text: "Monetise your credibility with transparent, outcome-based rewards.", className: "bg-referrer text-foreground" },
            { title: "Brands", text: "Hire through trusted networks and move from brief to hire faster.", className: "bg-brand text-foreground" },
          ].map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.08 }}
              className={`rounded-3xl p-7 ${item.className}`}
            >
              <h3 className="font-heading font-black text-3xl mb-3">{item.title}</h3>
              <p className="text-foreground/75 mb-6">{item.text}</p>
              <MagneticButton
                className="px-5 py-2.5 rounded-full bg-foreground text-background text-sm font-semibold"
                strength={0.25}
                onClick={() => navigateWithTransition("/salary-intelligence")}
              >
                See the edge
              </MagneticButton>
            </motion.div>
          ))}
        </div>
      </section>
    </PageLayout>
  );
};

export default Opportunities;
