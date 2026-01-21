import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { MapPin, Briefcase, DollarSign, Clock, ArrowUpRight, Search, Filter } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const opportunities = [
  {
    id: 1,
    title: "Senior Software Engineer",
    company: "TechCorp",
    location: "London, UK",
    type: "Full-time",
    salary: "£90k - £120k",
    reward: "£4,500",
    posted: "2 days ago",
    tags: ["React", "Node.js", "TypeScript"]
  },
  {
    id: 2,
    title: "Product Manager",
    company: "StartupXYZ",
    location: "Remote",
    type: "Full-time",
    salary: "£80k - £100k",
    reward: "£3,500",
    posted: "1 day ago",
    tags: ["B2B", "SaaS", "Agile"]
  },
  {
    id: 3,
    title: "UX Designer",
    company: "DesignStudio",
    location: "Manchester, UK",
    type: "Full-time",
    salary: "£55k - £75k",
    reward: "£2,800",
    posted: "3 days ago",
    tags: ["Figma", "User Research", "Prototyping"]
  },
  {
    id: 4,
    title: "DevOps Engineer",
    company: "CloudFirst",
    location: "Remote",
    type: "Contract",
    salary: "£600/day",
    reward: "£3,000",
    posted: "5 hours ago",
    tags: ["AWS", "Kubernetes", "Terraform"]
  },
  {
    id: 5,
    title: "Marketing Director",
    company: "GrowthCo",
    location: "London, UK",
    type: "Full-time",
    salary: "£100k - £130k",
    reward: "£5,200",
    posted: "1 week ago",
    tags: ["B2C", "Growth", "Brand"]
  },
  {
    id: 6,
    title: "Data Scientist",
    company: "DataLabs",
    location: "Edinburgh, UK",
    type: "Full-time",
    salary: "£70k - £90k",
    reward: "£3,800",
    posted: "4 days ago",
    tags: ["Python", "ML", "SQL"]
  }
];

const Opportunities = () => {
  const { navigateWithTransition } = useGridNavigation();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpportunities = opportunities.filter(
    (opp) =>
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="pt-32 pb-12 px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-block px-4 py-1.5 bg-rose/10 text-rose rounded-full text-sm font-medium mb-6"
          >
            Live Opportunities
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-6xl font-heading font-bold text-foreground leading-tight mb-6"
          >
            Refer & Earn
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Browse open roles and earn rewards for successful referrals. Know someone perfect? Connect them.
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative max-w-xl mx-auto"
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search roles, companies, or skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 pr-4 py-6 text-lg rounded-full border-foreground/10 focus:border-sage"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-foreground/5 rounded-full hover:bg-foreground/10 transition-colors">
              <Filter className="w-5 h-5 text-foreground" />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Opportunities Grid */}
      <section className="py-12 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOpportunities.map((opp, index) => (
              <motion.div
                key={opp.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group relative bg-muted/30 rounded-2xl border border-foreground/5 hover:border-sage/30 transition-all duration-300 overflow-hidden"
              >
                {/* Reward Badge */}
                <div className="absolute top-4 right-4 px-3 py-1 bg-sage text-foreground rounded-full text-sm font-semibold">
                  Earn {opp.reward}
                </div>

                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1 group-hover:text-sage transition-colors">
                      {opp.title}
                    </h3>
                    <p className="text-muted-foreground">{opp.company}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {opp.location}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Briefcase className="w-4 h-4" />
                      {opp.type}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <DollarSign className="w-4 h-4" />
                      {opp.salary}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      {opp.posted}
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {opp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-1 bg-foreground/5 rounded-md text-xs text-muted-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <MagneticButton
                    className="w-full py-3 bg-foreground text-background rounded-xl font-medium flex items-center justify-center gap-2 group-hover:bg-sage group-hover:text-foreground transition-colors"
                    strength={0.3}
                  >
                    Refer Someone
                    <ArrowUpRight className="w-4 h-4" />
                  </MagneticButton>
                </div>
              </motion.div>
            ))}
          </div>

          {filteredOpportunities.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-xl text-muted-foreground mb-4">No opportunities found matching your search.</p>
              <button
                onClick={() => setSearchQuery("")}
                className="text-sage hover:underline"
              >
                Clear search
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-foreground">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl font-heading font-bold text-background mb-6"
          >
            Want to See More Opportunities?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-lg text-background/60 mb-10"
          >
            Sign up to unlock exclusive roles and maximize your earning potential.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 40 }}
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
              className="px-8 py-4 border border-background/30 text-background rounded-full font-semibold hover:bg-white/10 transition-colors"
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
