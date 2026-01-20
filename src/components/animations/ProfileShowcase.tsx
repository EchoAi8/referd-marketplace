import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, useMotionValue, useTransform } from "framer-motion";
import { Briefcase, GraduationCap, Award, TrendingUp, Star, ChevronLeft, ChevronRight, MapPin, ExternalLink, X } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  type: "work" | "education" | "achievement" | "growth";
  description?: string;
  achievements?: string[];
  logo?: string;
}

interface SkillBadge {
  name: string;
  color: string;
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
  skills: SkillBadge[];
  timeline: TimelineItem[];
}

const profiles: ProfileData[] = [
  {
    id: 0,
    name: "Sarah Chen",
    role: "Senior Product Designer",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
    earnings: "£12,400",
    referrals: 8,
    rating: 4.9,
    skills: [
      { name: "Figma", color: "from-purple-500 to-pink-500" },
      { name: "Design Systems", color: "from-blue-500 to-cyan-500" },
      { name: "User Research", color: "from-emerald-500 to-teal-500" },
    ],
    timeline: [
      { year: "2024", title: "Design Lead", company: "Stripe", type: "work", description: "Leading product design for payment infrastructure", achievements: ["Redesigned checkout flow", "40% conversion increase"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2022", title: "Sr. Designer", company: "Figma", type: "work", description: "Core product design for collaboration features", achievements: ["FigJam launch", "Auto Layout v4"], logo: "https://logo.clearbit.com/figma.com" },
      { year: "2020", title: "Product Designer", company: "Airbnb", type: "work", description: "Experiences team design", achievements: ["Online Experiences launch"], logo: "https://logo.clearbit.com/airbnb.com" },
      { year: "2018", title: "MA Design", company: "RISD", type: "education", description: "Master of Arts in Industrial Design" },
    ],
  },
  {
    id: 1,
    name: "Marcus Johnson",
    role: "Engineering Manager",
    location: "New York, NY",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    earnings: "£28,750",
    referrals: 14,
    rating: 5.0,
    skills: [
      { name: "React", color: "from-cyan-500 to-blue-500" },
      { name: "TypeScript", color: "from-blue-600 to-blue-800" },
      { name: "System Design", color: "from-orange-500 to-red-500" },
    ],
    timeline: [
      { year: "2024", title: "Eng Manager", company: "Vercel", type: "work", description: "Leading Next.js core team", achievements: ["Next.js 14 release", "Turbopack stable"], logo: "https://logo.clearbit.com/vercel.com" },
      { year: "2021", title: "Staff Engineer", company: "Meta", type: "work", description: "React core team contributor", achievements: ["React 18 concurrent features"], logo: "https://logo.clearbit.com/meta.com" },
      { year: "2019", title: "Top Referrer", company: "Referd", type: "achievement", description: "Recognized as top platform contributor" },
      { year: "2017", title: "Sr. Engineer", company: "Google", type: "work", description: "Chrome DevTools team", logo: "https://logo.clearbit.com/google.com" },
    ],
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    role: "VP of Marketing",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&crop=face",
    earnings: "£45,200",
    referrals: 23,
    rating: 4.8,
    skills: [
      { name: "Growth", color: "from-green-500 to-emerald-500" },
      { name: "Brand Strategy", color: "from-violet-500 to-purple-500" },
      { name: "Analytics", color: "from-amber-500 to-orange-500" },
    ],
    timeline: [
      { year: "2024", title: "VP Marketing", company: "Notion", type: "work", description: "Leading global marketing strategy", achievements: ["2x brand awareness", "Enterprise expansion"], logo: "https://logo.clearbit.com/notion.so" },
      { year: "2022", title: "Dir. Growth", company: "Spotify", type: "work", description: "Podcast marketing growth", achievements: ["50M new podcast listeners"], logo: "https://logo.clearbit.com/spotify.com" },
      { year: "2020", title: "20+ Referrals", company: "Milestone", type: "growth", description: "Reached 20 successful referrals" },
      { year: "2018", title: "Marketing Lead", company: "Netflix", type: "work", description: "Original content marketing", logo: "https://logo.clearbit.com/netflix.com" },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    role: "Principal Data Scientist",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face",
    earnings: "£19,800",
    referrals: 11,
    rating: 4.7,
    skills: [
      { name: "Python", color: "from-yellow-500 to-green-500" },
      { name: "ML/AI", color: "from-pink-500 to-rose-500" },
      { name: "TensorFlow", color: "from-orange-500 to-yellow-500" },
    ],
    timeline: [
      { year: "2024", title: "Principal DS", company: "OpenAI", type: "work", description: "Large language model research", achievements: ["GPT-4 fine-tuning", "RLHF improvements"], logo: "https://logo.clearbit.com/openai.com" },
      { year: "2022", title: "Lead Scientist", company: "DeepMind", type: "work", description: "Reinforcement learning research", logo: "https://logo.clearbit.com/deepmind.com" },
      { year: "2020", title: "PhD AI/ML", company: "Stanford", type: "education", description: "Artificial Intelligence & Machine Learning" },
      { year: "2018", title: "Data Scientist", company: "Tesla", type: "work", description: "Autopilot ML team", logo: "https://logo.clearbit.com/tesla.com" },
    ],
  },
  {
    id: 4,
    name: "Aisha Patel",
    role: "Chief People Officer",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
    earnings: "£32,100",
    referrals: 19,
    rating: 4.9,
    skills: [
      { name: "Leadership", color: "from-indigo-500 to-purple-500" },
      { name: "Culture", color: "from-pink-500 to-rose-500" },
      { name: "DEI", color: "from-teal-500 to-cyan-500" },
    ],
    timeline: [
      { year: "2024", title: "CPO", company: "Canva", type: "work", description: "Global people & culture strategy", achievements: ["Best Places to Work 2024", "4.8 Glassdoor rating"], logo: "https://logo.clearbit.com/canva.com" },
      { year: "2021", title: "VP People", company: "Shopify", type: "work", description: "Remote-first transformation", achievements: ["Digital by default program"], logo: "https://logo.clearbit.com/shopify.com" },
      { year: "2019", title: "HR Director", company: "Uber", type: "work", description: "EMEA talent acquisition", logo: "https://logo.clearbit.com/uber.com" },
      { year: "2017", title: "MBA", company: "Harvard", type: "education", description: "Business Administration" },
    ],
  },
  {
    id: 5,
    name: "James Wright",
    role: "Head of Sales",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    earnings: "£52,300",
    referrals: 31,
    rating: 5.0,
    skills: [
      { name: "Enterprise Sales", color: "from-blue-500 to-indigo-500" },
      { name: "Negotiation", color: "from-red-500 to-orange-500" },
      { name: "SaaS", color: "from-violet-500 to-fuchsia-500" },
    ],
    timeline: [
      { year: "2024", title: "Head of Sales", company: "Stripe", type: "work", description: "Enterprise sales leadership", achievements: ["$2B ARR milestone", "Fortune 100 expansion"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2022", title: "Sales Director", company: "Salesforce", type: "work", description: "Mid-market sales team", achievements: ["150% quota attainment"], logo: "https://logo.clearbit.com/salesforce.com" },
      { year: "2020", title: "30+ Referrals", company: "Milestone", type: "growth", description: "Top referrer status achieved" },
      { year: "2018", title: "Account Exec", company: "Oracle", type: "work", description: "Cloud infrastructure sales", logo: "https://logo.clearbit.com/oracle.com" },
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
  work: "bg-primary/20 text-primary border-primary/30",
  education: "bg-blue-500/20 text-blue-400 border-blue-500/30",
  achievement: "bg-amber-500/20 text-amber-400 border-amber-500/30",
  growth: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
};

// Floating Particle component
const FloatingParticle = ({ delay, duration, size, x, y }: { 
  delay: number; 
  duration: number; 
  size: number; 
  x: number; 
  y: number;
}) => (
  <motion.div
    className="absolute rounded-full bg-primary/60 pointer-events-none"
    style={{ width: size, height: size }}
    initial={{ x, y, opacity: 0, scale: 0 }}
    animate={{
      x: [x, x + (Math.random() - 0.5) * 80, x],
      y: [y, y - 120 - Math.random() * 80, y],
      opacity: [0, 0.8, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeOut",
    }}
  />
);

// Skill Badge Component
const SkillBadge = ({ skill, index, isActive }: { skill: SkillBadge; index: number; isActive: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0, y: 20 }}
    animate={isActive ? { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { delay: 0.3 + index * 0.1, type: "spring", stiffness: 400, damping: 20 }
    } : { opacity: 0, scale: 0, y: 20 }}
    className={`px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${skill.color} shadow-lg`}
    style={{
      boxShadow: isActive ? `0 4px 20px rgba(0,0,0,0.3)` : "none",
    }}
  >
    {skill.name}
  </motion.div>
);

// Expandable Timeline Item Component
const TimelineItemCard = ({ 
  item, 
  idx, 
  isExpanded, 
  onToggle 
}: { 
  item: TimelineItem; 
  idx: number; 
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  const Icon = typeIcons[item.type];
  const colorClass = typeColors[item.type];

  return (
    <motion.div
      className="relative flex items-start gap-3 group cursor-pointer"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: idx * 0.08, type: "spring", stiffness: 300, damping: 25 }}
      onClick={(e) => { e.stopPropagation(); onToggle(); }}
    >
      {/* Node */}
      <div className={`relative z-10 flex-shrink-0 w-9 h-9 rounded-full ${colorClass} flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110`}>
        <Icon className="w-4 h-4" />
        <motion.div
          className="absolute inset-0 rounded-full bg-current opacity-20"
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0, 0.2] }}
          transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
        />
      </div>

      {/* Content */}
      <motion.div 
        className="flex-1 bg-foreground/5 rounded-xl border border-foreground/10 overflow-hidden transition-all duration-300 group-hover:border-primary/40 group-hover:bg-foreground/8"
        animate={{ height: isExpanded ? "auto" : "auto" }}
      >
        <div className="p-3">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              {item.logo && (
                <img src={item.logo} alt={item.company} className="w-5 h-5 rounded object-cover" />
              )}
              <span className="text-xs font-bold text-primary">{item.year}</span>
            </div>
            <span className="text-xs text-muted-foreground">{item.company}</span>
          </div>
          <p className="font-semibold text-foreground text-sm">{item.title}</p>
          
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="mt-2 pt-2 border-t border-foreground/10"
              >
                {item.description && (
                  <p className="text-xs text-muted-foreground mb-2">{item.description}</p>
                )}
                {item.achievements && item.achievements.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {item.achievements.map((achievement, i) => (
                      <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded-full">
                        {achievement}
                      </span>
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Flip Card component with 3D carousel integration
const FlipCard = ({ 
  profile, 
  isActive, 
  rotation,
  zIndex,
  opacity,
  scale,
}: { 
  profile: ProfileData; 
  isActive: boolean;
  rotation: number;
  zIndex: number;
  opacity: number;
  scale: number;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current || !isActive) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setMousePos({ x: 0, y: 0 });
    setExpandedTimeline(null);
  };

  return (
    <motion.div
      ref={cardRef}
      className="absolute left-1/2 top-1/2 cursor-pointer"
      style={{ 
        width: 380,
        height: 500,
        perspective: 2000,
        transformStyle: "preserve-3d",
        marginLeft: -190,
        marginTop: -250,
      }}
      animate={{
        rotateY: rotation,
        z: zIndex,
        opacity,
        scale,
      }}
      transition={{ type: "spring", stiffness: 100, damping: 20, mass: 1 }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => isActive && setIsFlipped(true)}
      onHoverEnd={handleMouseLeave}
    >
      {/* Spotlight for active card */}
      <AnimatePresence>
        {isActive && (
          <>
            {/* Outer glow */}
            <motion.div
              className="absolute -inset-20 rounded-[4rem] pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.35) 0%, hsl(var(--primary) / 0.08) 45%, transparent 70%)",
              }}
            />
            
            {/* Rotating spotlight cone */}
            <motion.div
              className="absolute -inset-8 rounded-3xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, rotate: 360 }}
              exit={{ opacity: 0 }}
              transition={{ rotate: { duration: 12, repeat: Infinity, ease: "linear" }, opacity: { duration: 0.5 } }}
              style={{
                background: "conic-gradient(from 0deg at 50% 0%, transparent 25%, hsl(var(--primary) / 0.25) 50%, transparent 75%)",
                filter: "blur(25px)",
              }}
            />

            {/* Ground reflection */}
            <motion.div
              className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-[140%] h-24 pointer-events-none"
              initial={{ opacity: 0, scaleX: 0.8 }}
              animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [0.9, 1.1, 0.9] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.5) 0%, transparent 70%)",
                filter: "blur(20px)",
              }}
            />

            {/* Floating particles */}
            {[...Array(16)].map((_, i) => (
              <FloatingParticle
                key={i}
                delay={i * 0.12}
                duration={2 + Math.random() * 1.5}
                size={2 + Math.random() * 6}
                x={-60 + Math.random() * 500}
                y={420 + Math.random() * 80}
              />
            ))}

            {/* Skill badges floating around */}
            <div className="absolute -left-6 top-1/2 -translate-y-1/2 flex flex-col gap-2 pointer-events-none">
              {profile.skills.map((skill, i) => (
                <SkillBadge key={skill.name} skill={skill} index={i} isActive={isActive} />
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Card container with flip */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: isFlipped ? 180 : mousePos.x * 12,
          rotateX: isFlipped ? 0 : -mousePos.y * 12,
        }}
        transition={{ 
          rotateY: { type: "spring", stiffness: 200, damping: 25 },
          rotateX: { type: "spring", stiffness: 300, damping: 30 },
        }}
      >
        {/* Dynamic shadow */}
        <motion.div
          className="absolute inset-0 rounded-3xl pointer-events-none"
          style={{ transform: "translateZ(-40px)" }}
          animate={{
            boxShadow: isFlipped
              ? "25px 25px 50px rgba(0,0,0,0.5), -25px 25px 50px rgba(0,0,0,0.25)"
              : isActive
                ? "0 30px 80px rgba(0,0,0,0.5), 0 15px 40px hsl(var(--primary) / 0.25)"
                : "0 10px 30px rgba(0,0,0,0.2)",
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
        />

        {/* FRONT - Profile Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden border border-foreground/15"
          style={{ backfaceVisibility: "hidden" }}
          animate={{
            borderColor: isActive ? "hsl(var(--primary) / 0.5)" : "hsl(var(--foreground) / 0.15)",
          }}
        >
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
            style={{ transform: `scale(${isActive ? 1.05 : 1})`, transition: "transform 0.6s ease-out" }}
            loading="lazy"
          />

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
          
          {/* Shine effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.12) 45%, rgba(255,255,255,0.25) 50%, rgba(255,255,255,0.12) 55%, transparent 60%)",
            }}
            initial={{ x: "-200%" }}
            animate={isFlipped ? { x: "200%" } : { x: "-200%" }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Rating */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "text-amber-400 fill-amber-400" : "text-foreground/20"}`}
                />
              ))}
              <span className="ml-1.5 text-sm font-bold text-foreground">{profile.rating}</span>
            </div>

            <h3 className="text-2xl font-bold text-foreground mb-1">{profile.name}</h3>
            <p className="text-sm text-muted-foreground mb-1 font-medium">{profile.role}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground/70 mb-4">
              <MapPin className="w-3 h-3" />
              {profile.location}
            </div>

            {/* Stats */}
            <div className="flex gap-2">
              <div className="bg-primary/20 backdrop-blur rounded-lg px-3 py-1.5 border border-primary/30">
                <span className="text-primary font-bold">{profile.earnings}</span>
              </div>
              <div className="bg-foreground/10 backdrop-blur rounded-lg px-3 py-1.5 border border-foreground/15">
                <span className="text-foreground font-medium text-sm">{profile.referrals} referrals</span>
              </div>
            </div>
          </div>

          {/* Flip hint */}
          {isActive && (
            <motion.div 
              className="absolute top-4 right-4 bg-background/60 backdrop-blur rounded-full px-3 py-1 text-xs text-muted-foreground flex items-center gap-1.5"
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.span animate={{ rotateY: [0, 180, 360] }} transition={{ duration: 2, repeat: Infinity }}>↻</motion.span>
              Hover to flip
            </motion.div>
          )}

          {/* Active border ring */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-3xl pointer-events-none"
              animate={{
                boxShadow: [
                  "inset 0 0 0 2px hsl(var(--primary) / 0.3)",
                  "inset 0 0 0 3px hsl(var(--primary) / 0.5)",
                  "inset 0 0 0 2px hsl(var(--primary) / 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </motion.div>

        {/* BACK - Timeline Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border border-foreground/15"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-[0.02]">
            <motion.div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
                backgroundSize: "20px 20px",
              }}
              animate={{ backgroundPosition: ["0 0", "20px 20px"] }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Header */}
          <div className="p-5 border-b border-foreground/10 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={profile.image} alt={profile.name} className="w-12 h-12 rounded-full object-cover border-2 border-primary/40" />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h4 className="font-bold text-foreground">{profile.name}</h4>
                <p className="text-xs text-muted-foreground">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="relative p-5 h-[calc(100%-140px)] overflow-y-auto scrollbar-hide">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/40 to-primary/10 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary via-primary/60 to-transparent rounded-full"
                animate={{ opacity: [0.3, 0.8, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-3 ml-2">
              {profile.timeline.map((item, idx) => (
                <TimelineItemCard
                  key={idx}
                  item={item}
                  idx={idx}
                  isExpanded={expandedTimeline === idx}
                  onToggle={() => setExpandedTimeline(expandedTimeline === idx ? null : idx)}
                />
              ))}
            </div>
          </div>

          {/* Bottom stats */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background/95 to-transparent">
            <div className="flex justify-between items-center">
              <div className="text-center">
                <p className="text-xl font-bold text-primary">{profile.earnings}</p>
                <p className="text-xs text-muted-foreground">Earned</p>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold text-foreground">{profile.referrals}</p>
                <p className="text-xs text-muted-foreground">Referrals</p>
              </div>
              <div className="text-center flex flex-col items-center">
                <div className="flex items-center gap-1">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                  <span className="text-xl font-bold text-foreground">{profile.rating}</span>
                </div>
                <p className="text-xs text-muted-foreground">Rating</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Momentum scrolling
  const dragX = useMotionValue(0);
  const dragVelocity = useRef(0);
  const isDragging = useRef(false);
  const animationFrame = useRef<number>();
  
  const cardAngle = 360 / profiles.length;
  const radius = 500;

  // Smooth spring rotation
  const springRotation = useSpring(0, { stiffness: 60, damping: 20, mass: 1.5 });

  // Update rotation based on active index
  useEffect(() => {
    springRotation.set(-activeIndex * cardAngle);
  }, [activeIndex, cardAngle, springRotation]);

  // Momentum animation
  const animateMomentum = useCallback(() => {
    if (Math.abs(dragVelocity.current) > 0.1) {
      dragVelocity.current *= 0.95; // Friction
      dragX.set(dragX.get() + dragVelocity.current);
      animationFrame.current = requestAnimationFrame(animateMomentum);
    } else {
      // Snap to nearest card
      const currentRotation = dragX.get();
      const nearestIndex = Math.round(-currentRotation / cardAngle);
      const clampedIndex = ((nearestIndex % profiles.length) + profiles.length) % profiles.length;
      setActiveIndex(clampedIndex);
    }
  }, [dragX, cardAngle]);

  const handleDragStart = () => {
    isDragging.current = true;
    if (animationFrame.current) {
      cancelAnimationFrame(animationFrame.current);
    }
  };

  const handleDrag = (_: any, info: { delta: { x: number }; velocity: { x: number } }) => {
    const sensitivity = 0.15;
    dragX.set(dragX.get() + info.delta.x * sensitivity);
    dragVelocity.current = info.velocity.x * sensitivity * 0.05;
  };

  const handleDragEnd = () => {
    isDragging.current = false;
    animateMomentum();
  };

  const nextCard = () => setActiveIndex((prev) => (prev + 1) % profiles.length);
  const prevCard = () => setActiveIndex((prev) => (prev - 1 + profiles.length) % profiles.length);

  // Subscribe to spring changes
  const [currentRotation, setCurrentRotation] = useState(0);
  useEffect(() => {
    const unsubscribe = springRotation.on("change", (v) => setCurrentRotation(v));
    return () => unsubscribe();
  }, [springRotation]);

  return (
    <div className="relative w-full min-h-[85vh] flex flex-col items-center justify-center overflow-hidden py-8">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1400px] h-[900px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl" />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full border border-foreground/5"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full border border-foreground/5"
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* 3D Carousel */}
      <motion.div
        ref={containerRef}
        className="relative w-full h-[550px] cursor-grab active:cursor-grabbing"
        style={{ perspective: 1500 }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
      >
        <div 
          className="relative w-full h-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {profiles.map((profile, index) => {
            const angle = index * cardAngle + currentRotation;
            const radian = (angle * Math.PI) / 180;
            const x = Math.sin(radian) * radius;
            const z = Math.cos(radian) * radius - radius;
            const isActive = index === activeIndex;
            const normalizedZ = (z + radius) / (radius * 2);
            const opacity = 0.3 + normalizedZ * 0.7;
            const scale = 0.7 + normalizedZ * 0.35;

            return (
              <motion.div
                key={profile.id}
                className="absolute left-1/2 top-1/2"
                style={{
                  x,
                  z,
                  zIndex: Math.round(normalizedZ * 100),
                }}
                onClick={() => !isDragging.current && setActiveIndex(index)}
              >
                <FlipCard
                  profile={profile}
                  isActive={isActive}
                  rotation={0}
                  zIndex={Math.round(normalizedZ * 100)}
                  opacity={opacity}
                  scale={scale}
                />
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Active profile name under carousel */}
      <motion.div
        key={activeIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="text-center mt-4 mb-2"
      >
        <h3 className="text-3xl md:text-4xl font-bold text-foreground">{profiles[activeIndex].name}</h3>
        <p className="text-lg text-muted-foreground">{profiles[activeIndex].role}</p>
      </motion.div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-5 mt-6">
        <button
          onClick={prevCard}
          className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {profiles.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-10 bg-primary shadow-lg shadow-primary/30"
                  : "w-2.5 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="w-14 h-14 rounded-full bg-background/80 backdrop-blur-md border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 shadow-lg"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Drag hint */}
      <motion.p
        className="text-sm text-muted-foreground/60 mt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        Drag to spin • Click to select
      </motion.p>
    </div>
  );
};

export default ProfileShowcase;
