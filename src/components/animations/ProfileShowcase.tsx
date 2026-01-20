import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, TrendingUp } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  type: "work" | "education" | "achievement" | "growth";
}

interface ProfileData {
  id: number;
  name: string;
  role: string;
  image: string;
  earnings: string;
  referrals: number;
  timeline: TimelineItem[];
}

const profiles: ProfileData[] = [
  {
    id: 0,
    name: "Sarah Chen",
    role: "Senior Product Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=face",
    earnings: "£12,400",
    referrals: 8,
    timeline: [
      { year: "2024", title: "Design Lead", company: "Stripe", type: "work" },
      { year: "2022", title: "Sr. Designer", company: "Figma", type: "work" },
      { year: "2020", title: "Product Designer", company: "Airbnb", type: "work" },
      { year: "2018", title: "MA Design", company: "RISD", type: "education" },
    ],
  },
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Engineering Manager",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
    earnings: "£28,750",
    referrals: 14,
    timeline: [
      { year: "2024", title: "Eng Manager", company: "Vercel", type: "work" },
      { year: "2021", title: "Staff Engineer", company: "Meta", type: "work" },
      { year: "2019", title: "Top Referrer", company: "Referd", type: "achievement" },
      { year: "2017", title: "Sr. Engineer", company: "Google", type: "work" },
    ],
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "VP of Marketing",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
    earnings: "£45,200",
    referrals: 23,
    timeline: [
      { year: "2024", title: "VP Marketing", company: "Notion", type: "work" },
      { year: "2022", title: "Dir. Growth", company: "Spotify", type: "work" },
      { year: "2020", title: "20+ Referrals", company: "Milestone", type: "growth" },
      { year: "2018", title: "Marketing Lead", company: "Netflix", type: "work" },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    role: "Principal Data Scientist",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
    earnings: "£19,800",
    referrals: 11,
    timeline: [
      { year: "2024", title: "Principal DS", company: "OpenAI", type: "work" },
      { year: "2022", title: "Lead Scientist", company: "DeepMind", type: "work" },
      { year: "2020", title: "PhD AI/ML", company: "Stanford", type: "education" },
      { year: "2018", title: "Data Scientist", company: "Tesla", type: "work" },
    ],
  },
];

const typeIcons = {
  work: Briefcase,
  education: GraduationCap,
  achievement: Award,
  growth: TrendingUp,
};

const typeColors = {
  work: "bg-primary/20 text-primary",
  education: "bg-blue-500/20 text-blue-400",
  achievement: "bg-amber-500/20 text-amber-400",
  growth: "bg-emerald-500/20 text-emerald-400",
};

const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout>();

  // Auto-rotate profiles
  useEffect(() => {
    if (isHovered) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % profiles.length);
    }, 4000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isHovered]);

  const activeProfile = profiles[activeIndex];

  return (
    <div
      className="relative w-full max-w-5xl mx-auto px-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="grid md:grid-cols-2 gap-8 items-center">
        {/* Profile Image Side */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.id}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="relative"
            >
              {/* Glow background */}
              <div className="absolute -inset-4 bg-gradient-to-br from-primary/30 via-primary/10 to-transparent rounded-3xl blur-2xl" />

              {/* Main image card */}
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-foreground/10 shadow-2xl">
                <img
                  src={activeProfile.image}
                  alt={activeProfile.name}
                  className="w-full h-full object-cover"
                />

                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

                {/* Name & Role overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <motion.h3
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-2xl md:text-3xl font-bold text-foreground"
                  >
                    {activeProfile.name}
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground text-lg"
                  >
                    {activeProfile.role}
                  </motion.p>

                  {/* Stats */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex gap-6 mt-4"
                  >
                    <div>
                      <p className="text-2xl font-bold text-primary">{activeProfile.earnings}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Earned</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-foreground">{activeProfile.referrals}</p>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider">Referrals</p>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Profile selector dots */}
          <div className="flex justify-center gap-2 mt-6">
            {profiles.map((profile, index) => (
              <button
                key={profile.id}
                onClick={() => setActiveIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-primary"
                    : "bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Timeline Side */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeProfile.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              {/* Section header */}
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2">
                  Career Journey
                </p>
                <h4 className="text-xl font-semibold text-foreground">
                  The New CV
                </h4>
              </div>

              {/* Timeline */}
              <div className="relative">
                {/* Vertical line */}
                <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent" />

                {/* Timeline items */}
                <div className="space-y-6">
                  {activeProfile.timeline.map((item, index) => {
                    const Icon = typeIcons[item.type];
                    const colorClass = typeColors[item.type];

                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + index * 0.1, duration: 0.4 }}
                        className="relative pl-12 group"
                      >
                        {/* Node */}
                        <div
                          className={`absolute left-0 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-110`}
                        >
                          <Icon className="w-4 h-4" />
                        </div>

                        {/* Glow on hover */}
                        <div className="absolute left-0 w-8 h-8 rounded-full bg-primary/0 group-hover:bg-primary/30 blur-lg transition-all duration-300" />

                        {/* Content */}
                        <div className="bg-foreground/5 rounded-xl p-4 border border-foreground/10 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-foreground/10">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs font-medium text-primary">
                              {item.year}
                            </span>
                            <span className="text-xs text-muted-foreground">
                              {item.company}
                            </span>
                          </div>
                          <p className="font-semibold text-foreground">
                            {item.title}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Animated pulse at top of timeline */}
                <motion.div
                  className="absolute left-3 top-0 w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Background decorative elements */}
      <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-3xl pointer-events-none" />
    </div>
  );
};

export default ProfileShowcase;
