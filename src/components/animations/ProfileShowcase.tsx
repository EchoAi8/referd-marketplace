import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  Star, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  X, 
  Pause, 
  Play,
  Sparkles,
  Calendar
} from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  type: "work" | "education" | "achievement" | "training";
  description?: string;
  achievements?: string[];
  logo?: string;
}

interface ProfileData {
  id: number;
  name: string;
  role: string;
  location: string;
  image: string;
  earnings: string;
  referrals: number;
  rating: number;
  skills: string[];
  timeline: TimelineItem[];
}

const profiles: ProfileData[] = [
  {
    id: 0,
    name: "Sarah Chen",
    role: "Senior Product Designer",
    location: "San Francisco",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
    earnings: "£12,400",
    referrals: 8,
    rating: 4.9,
    skills: ["Figma", "Design Systems", "User Research", "Prototyping"],
    timeline: [
      { year: "2024", title: "Design Lead", company: "Stripe", type: "work", description: "Leading product design for payment infrastructure", achievements: ["Redesigned checkout flow", "40% conversion increase"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2023", title: "Design Leadership Cert", company: "IDEO U", type: "training", description: "Advanced design leadership program" },
      { year: "2022", title: "Sr. Designer", company: "Figma", type: "work", description: "Core product design for collaboration features", achievements: ["FigJam launch", "Auto Layout v4"], logo: "https://logo.clearbit.com/figma.com" },
      { year: "2020", title: "Product Designer", company: "Airbnb", type: "work", description: "Experiences team design", achievements: ["Online Experiences launch"], logo: "https://logo.clearbit.com/airbnb.com" },
      { year: "2018", title: "MA Design", company: "RISD", type: "education", description: "Master of Arts in Industrial Design" },
    ],
  },
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Engineering Manager",
    location: "New York",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    earnings: "£28,750",
    referrals: 14,
    rating: 5.0,
    skills: ["React", "TypeScript", "System Design", "Team Leadership"],
    timeline: [
      { year: "2024", title: "Eng Manager", company: "Vercel", type: "work", description: "Leading Next.js core team", achievements: ["Next.js 14 release", "Turbopack stable"], logo: "https://logo.clearbit.com/vercel.com" },
      { year: "2022", title: "AWS Solutions Architect", company: "Amazon", type: "training", description: "Professional certification" },
      { year: "2021", title: "Staff Engineer", company: "Meta", type: "work", description: "React core team contributor", achievements: ["React 18 concurrent features"], logo: "https://logo.clearbit.com/meta.com" },
      { year: "2019", title: "Top Referrer", company: "Referd", type: "achievement", description: "Recognized as top platform contributor" },
      { year: "2017", title: "Sr. Engineer", company: "Google", type: "work", description: "Chrome DevTools team", logo: "https://logo.clearbit.com/google.com" },
    ],
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "VP of Marketing",
    location: "Austin",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&crop=face",
    earnings: "£45,200",
    referrals: 23,
    rating: 4.8,
    skills: ["Growth", "Brand Strategy", "Analytics", "Content"],
    timeline: [
      { year: "2024", title: "VP Marketing", company: "Notion", type: "work", description: "Leading global marketing strategy", achievements: ["2x brand awareness", "Enterprise expansion"], logo: "https://logo.clearbit.com/notion.so" },
      { year: "2023", title: "Growth Leadership", company: "Reforge", type: "training", description: "Advanced growth strategy program" },
      { year: "2022", title: "Dir. Growth", company: "Spotify", type: "work", description: "Podcast marketing growth", achievements: ["50M new podcast listeners"], logo: "https://logo.clearbit.com/spotify.com" },
      { year: "2020", title: "20+ Referrals Milestone", company: "Referd", type: "achievement", description: "Reached 20 successful referrals" },
      { year: "2018", title: "Marketing Lead", company: "Netflix", type: "work", description: "Original content marketing", logo: "https://logo.clearbit.com/netflix.com" },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    role: "Principal Data Scientist",
    location: "Seattle",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face",
    earnings: "£19,800",
    referrals: 11,
    rating: 4.7,
    skills: ["Python", "ML/AI", "TensorFlow", "Data Viz"],
    timeline: [
      { year: "2024", title: "Principal DS", company: "OpenAI", type: "work", description: "Large language model research", achievements: ["GPT-4 fine-tuning", "RLHF improvements"], logo: "https://logo.clearbit.com/openai.com" },
      { year: "2023", title: "Deep Learning Specialization", company: "Coursera", type: "training", description: "Andrew Ng's advanced ML course" },
      { year: "2022", title: "Lead Scientist", company: "DeepMind", type: "work", description: "Reinforcement learning research", logo: "https://logo.clearbit.com/deepmind.com" },
      { year: "2020", title: "PhD AI/ML", company: "Stanford", type: "education", description: "Artificial Intelligence & Machine Learning" },
      { year: "2018", title: "Data Scientist", company: "Tesla", type: "work", description: "Autopilot ML team", logo: "https://logo.clearbit.com/tesla.com" },
    ],
  },
  {
    id: 4,
    name: "Aisha Patel",
    role: "Chief People Officer",
    location: "London",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
    earnings: "£32,100",
    referrals: 19,
    rating: 4.9,
    skills: ["Leadership", "Culture", "DEI", "Talent Strategy"],
    timeline: [
      { year: "2024", title: "CPO", company: "Canva", type: "work", description: "Global people & culture strategy", achievements: ["Best Places to Work 2024", "4.8 Glassdoor rating"], logo: "https://logo.clearbit.com/canva.com" },
      { year: "2022", title: "Executive Coaching Cert", company: "ICF", type: "training", description: "International Coach Federation certified" },
      { year: "2021", title: "VP People", company: "Shopify", type: "work", description: "Remote-first transformation", achievements: ["Digital by default program"], logo: "https://logo.clearbit.com/shopify.com" },
      { year: "2019", title: "HR Director", company: "Uber", type: "work", description: "EMEA talent acquisition", logo: "https://logo.clearbit.com/uber.com" },
      { year: "2017", title: "MBA", company: "Harvard", type: "education", description: "Business Administration" },
    ],
  },
  {
    id: 5,
    name: "James Wright",
    role: "Head of Sales",
    location: "Chicago",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    earnings: "£52,300",
    referrals: 31,
    rating: 5.0,
    skills: ["Enterprise Sales", "Negotiation", "SaaS", "Team Building"],
    timeline: [
      { year: "2024", title: "Head of Sales", company: "Stripe", type: "work", description: "Enterprise sales leadership", achievements: ["$2B ARR milestone", "Fortune 100 expansion"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2023", title: "Sandler Sales Training", company: "Sandler", type: "training", description: "Advanced enterprise sales methodology" },
      { year: "2022", title: "Sales Director", company: "Salesforce", type: "work", description: "Mid-market sales team", achievements: ["150% quota attainment"], logo: "https://logo.clearbit.com/salesforce.com" },
      { year: "2020", title: "30+ Referrals", company: "Milestone", type: "achievement", description: "Top referrer status achieved" },
      { year: "2018", title: "Account Exec", company: "Oracle", type: "work", description: "Cloud infrastructure sales", logo: "https://logo.clearbit.com/oracle.com" },
    ],
  },
];

const typeConfig = {
  work: { icon: Briefcase, color: "sage", label: "Experience" },
  education: { icon: GraduationCap, color: "rose", label: "Education" },
  achievement: { icon: Award, color: "mustard", label: "Achievement" },
  training: { icon: TrendingUp, color: "primary", label: "Training" },
};

// Flip Card Component - Bold rectangular design
const FlipCard = ({
  profile,
  isActive,
  isFlipped,
  onFlip,
  onClick,
}: {
  profile: ProfileData;
  isActive: boolean;
  isFlipped: boolean;
  onFlip: (flipped: boolean) => void;
  onClick: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative cursor-pointer select-none"
      style={{
        width: 380,
        height: 520,
        perspective: 2000,
      }}
      onMouseEnter={() => onFlip(true)}
      onMouseLeave={() => onFlip(false)}
      onClick={onClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20,
          mass: 0.8,
        }}
      >
        {/* FRONT SIDE */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{ 
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
          }}
        >
          {/* Card container with glass effect */}
          <div 
            className="relative w-full h-full"
            style={{
              background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.4) 100%)",
            }}
          >
            {/* Gradient border effect */}
            <motion.div
              className="absolute inset-0 rounded-2xl pointer-events-none"
              animate={{
                boxShadow: isActive
                  ? "inset 0 0 0 2px hsl(var(--color-sage) / 0.5), 0 30px 60px -15px rgba(0,0,0,0.25)"
                  : "inset 0 0 0 1px hsl(var(--foreground) / 0.08), 0 15px 40px -10px rgba(0,0,0,0.15)",
              }}
              transition={{ duration: 0.3 }}
            />

            {/* Image - 65% of card */}
            <div className="relative h-[65%] overflow-hidden">
              {!imageLoaded && (
                <div className="absolute inset-0 bg-muted/50 animate-pulse" />
              )}
              <motion.img
                src={profile.image}
                alt={profile.name}
                className="w-full h-full object-cover"
                animate={{
                  scale: isActive ? 1.02 : 1,
                  filter: isActive ? "brightness(1.05)" : "brightness(0.95)",
                }}
                transition={{ duration: 0.5 }}
                onLoad={() => setImageLoaded(true)}
              />
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

              {/* Status badges */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                {/* Available badge */}
                <motion.div
                  className="flex items-center gap-2 px-3 py-1.5 bg-background/90 backdrop-blur-md rounded-full"
                  animate={{
                    borderColor: isActive ? "hsl(var(--color-sage))" : "transparent",
                  }}
                  style={{ border: "1px solid" }}
                >
                  <motion.div
                    className="w-2 h-2 rounded-full bg-sage"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <span className="text-xs font-semibold tracking-wide text-foreground">AVAILABLE</span>
                </motion.div>

                {/* Rating */}
                <div className="flex items-center gap-1 px-2.5 py-1.5 bg-background/90 backdrop-blur-md rounded-full">
                  <Star className="w-3.5 h-3.5 text-mustard fill-mustard" />
                  <span className="text-sm font-bold text-foreground">{profile.rating}</span>
                </div>
              </div>

              {/* Flip hint */}
              <motion.div
                className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-1.5 bg-foreground/80 rounded-full"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 10 }}
                transition={{ duration: 0.3 }}
              >
                <Sparkles className="w-3 h-3 text-background" />
                <span className="text-xs font-medium text-background">Hover for timeline</span>
              </motion.div>
            </div>

            {/* Content - 35% of card */}
            <div className="h-[35%] p-5 flex flex-col justify-between">
              {/* Name & role */}
              <div>
                <h3 className="text-2xl font-heading font-bold text-foreground tracking-tight leading-tight">
                  {profile.name}
                </h3>
                <p className="text-base text-muted-foreground mt-0.5 font-medium">{profile.role}</p>
                <div className="flex items-center gap-1.5 mt-2">
                  <MapPin className="w-3.5 h-3.5 text-sage" />
                  <span className="text-sm text-muted-foreground">{profile.location}</span>
                </div>
              </div>

              {/* Stats row */}
              <div className="flex gap-3">
                <div className="flex-1 py-2.5 px-3 bg-sage/15 rounded-xl border border-sage/20">
                  <p className="text-xl font-bold text-foreground leading-none">{profile.earnings}</p>
                  <p className="text-[10px] uppercase tracking-wider text-sage font-bold mt-1">Earned</p>
                </div>
                <div className="flex-1 py-2.5 px-3 bg-foreground/5 rounded-xl border border-foreground/10">
                  <p className="text-xl font-bold text-foreground leading-none">{profile.referrals}</p>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-bold mt-1">Referrals</p>
                </div>
              </div>
            </div>

            {/* Bottom accent */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 h-1"
              style={{
                background: "linear-gradient(90deg, hsl(var(--color-sage)), hsl(var(--color-mustard)))",
              }}
              animate={{
                scaleX: isActive ? 1 : 0,
                opacity: isActive ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>

        {/* BACK SIDE - Timeline */}
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            WebkitBackfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <div 
            className="relative w-full h-full p-6"
            style={{
              background: "linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--muted) / 0.3) 100%)",
            }}
          >
            {/* Gradient border */}
            <div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 2px hsl(var(--color-sage) / 0.4), 0 30px 60px -15px rgba(0,0,0,0.25)",
              }}
            />

            {/* Header */}
            <div className="flex items-center justify-between mb-5">
              <div>
                <h3 className="text-xl font-heading font-bold text-foreground">{profile.name}</h3>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
              <div className="flex items-center gap-1 px-2.5 py-1 bg-sage/15 rounded-full">
                <Calendar className="w-3.5 h-3.5 text-sage" />
                <span className="text-xs font-semibold text-sage">Timeline</span>
              </div>
            </div>

            {/* Timeline */}
            <div className="relative space-y-3 overflow-y-auto h-[calc(100%-70px)] pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
              {/* Vertical line */}
              <div className="absolute left-[18px] top-2 bottom-2 w-px bg-gradient-to-b from-sage via-foreground/20 to-transparent" />

              {profile.timeline.map((item, idx) => {
                const config = typeConfig[item.type];
                const Icon = config.icon;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.08, duration: 0.3 }}
                    className="relative flex gap-3 group"
                  >
                    {/* Icon node */}
                    <div 
                      className="relative z-10 w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 transition-all duration-200 group-hover:scale-110"
                      style={{
                        background: item.logo 
                          ? "hsl(var(--background))" 
                          : `hsl(var(--color-${config.color}) / 0.15)`,
                        border: `1px solid hsl(var(--color-${config.color}) / 0.3)`,
                      }}
                    >
                      {item.logo ? (
                        <img 
                          src={item.logo} 
                          alt={item.company} 
                          className="w-5 h-5 rounded object-contain"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                        />
                      ) : null}
                      <Icon 
                        className={`w-4 h-4 ${item.logo ? 'hidden' : ''}`}
                        style={{ color: `hsl(var(--color-${config.color}))` }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0 pb-3">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                        <span 
                          className="text-xs font-bold flex-shrink-0 px-2 py-0.5 rounded-full"
                          style={{
                            background: `hsl(var(--color-${config.color}) / 0.15)`,
                            color: `hsl(var(--color-${config.color}))`,
                          }}
                        >
                          {item.year}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">{item.company}</p>
                      
                      {item.description && (
                        <p className="text-xs text-muted-foreground/80 mt-1.5 leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                      )}

                      {item.achievements && item.achievements.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {item.achievements.slice(0, 2).map((achievement, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 text-[10px] font-medium bg-sage/10 text-sage rounded-full"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Skills footer */}
            <div className="absolute bottom-4 left-6 right-6">
              <div className="flex flex-wrap gap-1.5">
                {profile.skills.slice(0, 4).map((skill) => (
                  <span
                    key={skill}
                    className="px-2.5 py-1 text-[11px] font-semibold text-foreground/80 bg-foreground/5 rounded-full border border-foreground/10"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Modal for full profile view
const ProfileModal = ({
  profile,
  onClose,
}: {
  profile: ProfileData;
  onClose: () => void;
}) => {
  const [expandedItem, setExpandedItem] = useState<number | null>(0);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      {/* Backdrop */}
      <motion.div
        className="absolute inset-0 bg-foreground/80 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative w-full max-w-5xl max-h-[90vh] bg-background rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-muted/80 backdrop-blur flex items-center justify-center text-foreground hover:bg-muted transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex flex-col md:flex-row h-full max-h-[90vh]">
          {/* Left - Image */}
          <div className="relative w-full md:w-2/5 h-64 md:h-auto">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:bg-gradient-to-r" />

            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
              <h2 className="text-3xl font-heading font-bold text-foreground">{profile.name}</h2>
              <p className="text-lg text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            <div className="hidden md:block mb-8">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-4xl font-heading font-bold text-foreground">{profile.name}</h2>
                  <p className="text-xl text-muted-foreground mt-1">{profile.role}</p>
                  <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
                    <MapPin className="w-4 h-4" />
                    <span>{profile.location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full">
                  <Star className="w-4 h-4 text-foreground fill-foreground" />
                  <span className="text-lg font-bold text-foreground">{profile.rating}</span>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="p-4 bg-muted/30 rounded-xl border border-foreground/5">
                <p className="text-3xl font-bold text-primary">{profile.earnings}</p>
                <p className="text-sm text-muted-foreground mt-1">Total Earned</p>
              </div>
              <div className="p-4 bg-muted/30 rounded-xl border border-foreground/5">
                <p className="text-3xl font-bold text-foreground">{profile.referrals}</p>
                <p className="text-sm text-muted-foreground mt-1">Successful Referrals</p>
              </div>
            </div>

            {/* Skills */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-sm font-medium text-foreground bg-muted/50 rounded-full border border-foreground/5"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Timeline */}
            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Career Timeline</h3>
              <div className="space-y-3">
                {profile.timeline.map((item, idx) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;
                  const isExpanded = expandedItem === idx;

                  return (
                    <motion.div
                      key={idx}
                      className="relative cursor-pointer"
                      onClick={() => setExpandedItem(isExpanded ? null : idx)}
                    >
                      <div
                        className={`p-4 rounded-xl border transition-all duration-200 ${
                          isExpanded
                            ? "bg-muted/50 border-foreground/10"
                            : "bg-transparent border-foreground/5 hover:bg-muted/30"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {item.logo ? (
                              <img src={item.logo} alt={item.company} className="w-6 h-6 rounded object-cover" />
                            ) : (
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between gap-2">
                              <h4 className="font-semibold text-foreground">{item.title}</h4>
                              <span className="text-sm font-medium text-primary">{item.year}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.company}</p>

                            <AnimatePresence>
                              {isExpanded && (
                                <motion.div
                                  initial={{ opacity: 0, height: 0 }}
                                  animate={{ opacity: 1, height: "auto" }}
                                  exit={{ opacity: 0, height: 0 }}
                                  transition={{ duration: 0.2 }}
                                  className="mt-3 pt-3 border-t border-foreground/5"
                                >
                                  {item.description && (
                                    <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                                  )}
                                  {item.achievements && item.achievements.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                      {item.achievements.map((achievement, i) => (
                                        <span
                                          key={i}
                                          className="px-2.5 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                                        >
                                          {achievement}
                                        </span>
                                      ))}
                                    </div>
                                  )}
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Conveyor Belt Showcase
const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  // Spring for smooth conveyor movement
  const springX = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });

  const cardWidth = 400;
  const cardGap = 30;
  const totalWidth = profiles.length * (cardWidth + cardGap);

  // Calculate position for infinite loop effect
  useEffect(() => {
    const targetX = -activeIndex * (cardWidth + cardGap);
    springX.set(targetX);
  }, [activeIndex, springX]);

  // Auto-rotation
  useEffect(() => {
    if (isAutoPlaying && !isHovering && !selectedProfile) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isAutoPlaying, isHovering, selectedProfile]);

  const handleHoverStart = useCallback(() => {
    setIsHovering(true);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setIsHovering(false);
    setFlippedIndex(null);
  }, []);

  const nextCard = () => {
    setActiveIndex((prev) => (prev + 1) % profiles.length);
  };

  const prevCard = () => {
    setActiveIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
  };

  const handleCardClick = (index: number) => {
    if (index === activeIndex) {
      setSelectedProfile(profiles[index]);
    } else {
      setActiveIndex(index);
    }
  };

  // Subscribe to spring
  const [currentX, setCurrentX] = useState(0);
  useEffect(() => {
    const unsubscribe = springX.on("change", (v) => setCurrentX(v));
    return () => unsubscribe();
  }, [springX]);

  return (
    <>
      <div
        className="relative w-full py-8 overflow-hidden"
        onMouseEnter={handleHoverStart}
        onMouseLeave={handleHoverEnd}
      >
        {/* Subtle gradient background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-sage/5 via-transparent to-transparent" />
        </div>

        {/* Edge fades */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Conveyor belt container */}
        <div
          ref={containerRef}
          className="relative h-[560px] flex items-center"
        >
          <motion.div
            className="flex items-center gap-[30px] px-[calc(50vw-190px)]"
            style={{ x: currentX }}
          >
            {profiles.map((profile, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              const opacity = isActive ? 1 : Math.max(0.4, 1 - distance * 0.25);
              const scale = isActive ? 1 : Math.max(0.85, 1 - distance * 0.08);

              return (
                <motion.div
                  key={profile.id}
                  animate={{
                    opacity,
                    scale,
                    y: isActive ? -10 : 0,
                  }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ zIndex: isActive ? 10 : 5 - distance }}
                >
                  <FlipCard
                    profile={profile}
                    isActive={isActive}
                    isFlipped={flippedIndex === index && isActive}
                    onFlip={(flipped) => {
                      if (isActive) {
                        setFlippedIndex(flipped ? index : null);
                      }
                    }}
                    onClick={() => handleCardClick(index)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-6">
          {/* Prev */}
          <motion.button
            onClick={prevCard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          {/* Dots */}
          <div className="flex items-center gap-2">
            {profiles.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className="group p-1"
              >
                <motion.div
                  animate={{
                    width: index === activeIndex ? 24 : 8,
                    backgroundColor: index === activeIndex 
                      ? "hsl(var(--color-sage))" 
                      : "hsl(var(--foreground) / 0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="h-2 rounded-full group-hover:bg-sage/60"
                />
              </button>
            ))}
          </div>

          {/* Next */}
          <motion.button
            onClick={nextCard}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-12 h-12 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-foreground/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          {/* Play/Pause */}
          <motion.button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 rounded-full bg-sage/20 border border-sage/30 flex items-center justify-center text-sage hover:bg-sage/30 transition-colors ml-2"
          >
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </motion.button>
        </div>
      </div>

      {/* Profile Modal */}
      <AnimatePresence>
        {selectedProfile && (
          <ProfileModal
            profile={selectedProfile}
            onClose={() => setSelectedProfile(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProfileShowcase;
