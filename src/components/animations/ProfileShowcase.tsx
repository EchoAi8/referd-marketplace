import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Award, TrendingUp, Star, ChevronLeft, ChevronRight, MapPin, X, ArrowUpRight, Pause, Play } from "lucide-react";

interface TimelineItem {
  year: string;
  title: string;
  company: string;
  type: "work" | "education" | "achievement" | "growth";
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
    skills: ["Figma", "Design Systems", "User Research"],
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
    location: "New York",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
    earnings: "£28,750",
    referrals: 14,
    rating: 5.0,
    skills: ["React", "TypeScript", "System Design"],
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
    location: "Austin",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&crop=face",
    earnings: "£45,200",
    referrals: 23,
    rating: 4.8,
    skills: ["Growth", "Brand Strategy", "Analytics"],
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
    location: "Seattle",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face",
    earnings: "£19,800",
    referrals: 11,
    rating: 4.7,
    skills: ["Python", "ML/AI", "TensorFlow"],
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
    location: "London",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
    earnings: "£32,100",
    referrals: 19,
    rating: 4.9,
    skills: ["Leadership", "Culture", "DEI"],
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
    location: "Chicago",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    earnings: "£52,300",
    referrals: 31,
    rating: 5.0,
    skills: ["Enterprise Sales", "Negotiation", "SaaS"],
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

// Clean, minimal profile card
const ProfileCard = ({ 
  profile, 
  isActive,
  opacity,
  scale,
  onClick,
}: { 
  profile: ProfileData; 
  isActive: boolean;
  opacity: number;
  scale: number;
  onClick: () => void;
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative cursor-pointer select-none"
      style={{ 
        width: 340,
        height: 460,
      }}
      animate={{
        opacity,
        scale,
      }}
      transition={{ type: "spring", stiffness: 120, damping: 20 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={onClick}
    >
      {/* Card */}
      <motion.div
        className="relative w-full h-full rounded-2xl overflow-hidden bg-background"
        animate={{
          boxShadow: isActive 
            ? isHovered
              ? "0 40px 100px -20px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.05)"
              : "0 30px 80px -20px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)"
            : "0 10px 40px -15px rgba(0,0,0,0.1), 0 0 0 1px rgba(0,0,0,0.03)",
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Image section - top 60% */}
        <div className="relative h-[60%] overflow-hidden">
          <motion.img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
          
          {/* Rating badge - top right */}
          <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 bg-background/90 backdrop-blur-sm rounded-full">
            <Star className="w-3.5 h-3.5 text-foreground fill-foreground" />
            <span className="text-sm font-semibold text-foreground">{profile.rating}</span>
          </div>

          {/* View indicator on hover */}
          <AnimatePresence>
            {isActive && isHovered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="absolute inset-0 flex items-center justify-center bg-foreground/10 backdrop-blur-[2px]"
              >
                <div className="flex items-center gap-2 px-4 py-2 bg-background rounded-full shadow-lg">
                  <span className="text-sm font-medium text-foreground">View Profile</span>
                  <ArrowUpRight className="w-4 h-4 text-foreground" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content section - bottom 40% */}
        <div className="relative h-[40%] p-5 flex flex-col justify-between">
          {/* Info */}
          <div>
            <h3 className="text-xl font-heading font-bold text-foreground tracking-tight">
              {profile.name}
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5">{profile.role}</p>
            <div className="flex items-center gap-1 mt-1.5 text-xs text-muted-foreground/70">
              <MapPin className="w-3 h-3" />
              <span>{profile.location}</span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex items-center gap-3">
            <div className="flex-1 py-2 px-3 bg-muted/50 rounded-lg text-center">
              <p className="text-lg font-bold text-foreground">{profile.earnings}</p>
              <p className="text-xs text-muted-foreground">Earned</p>
            </div>
            <div className="flex-1 py-2 px-3 bg-muted/50 rounded-lg text-center">
              <p className="text-lg font-bold text-foreground">{profile.referrals}</p>
              <p className="text-xs text-muted-foreground">Referrals</p>
            </div>
          </div>

          {/* Skills as minimal tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {profile.skills.slice(0, 3).map((skill) => (
              <span 
                key={skill} 
                className="px-2 py-0.5 text-xs font-medium text-muted-foreground bg-muted/40 rounded"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Active indicator line */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isActive ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
};

// Fullscreen Profile Modal
const ProfileModal = ({ 
  profile, 
  onClose 
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
          {/* Left - Image & Quick Info */}
          <div className="relative w-full md:w-2/5 h-64 md:h-auto">
            <img
              src={profile.image}
              alt={profile.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent md:bg-gradient-to-r" />
            
            {/* Overlay info on mobile */}
            <div className="absolute bottom-0 left-0 right-0 p-6 md:hidden">
              <h2 className="text-3xl font-heading font-bold text-foreground">{profile.name}</h2>
              <p className="text-lg text-muted-foreground">{profile.role}</p>
            </div>
          </div>

          {/* Right - Details */}
          <div className="flex-1 p-6 md:p-8 overflow-y-auto">
            {/* Header - desktop only */}
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

            {/* Stats grid */}
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
                  const Icon = typeIcons[item.type];
                  const isExpanded = expandedItem === idx;

                  return (
                    <motion.div
                      key={idx}
                      className="relative cursor-pointer"
                      onClick={() => setExpandedItem(isExpanded ? null : idx)}
                    >
                      <div className={`p-4 rounded-xl border transition-all duration-200 ${
                        isExpanded 
                          ? "bg-muted/50 border-foreground/10" 
                          : "bg-transparent border-foreground/5 hover:bg-muted/30"
                      }`}>
                        <div className="flex items-start gap-3">
                          {/* Icon */}
                          <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
                            {item.logo ? (
                              <img src={item.logo} alt={item.company} className="w-6 h-6 rounded object-cover" />
                            ) : (
                              <Icon className="w-5 h-5 text-muted-foreground" />
                            )}
                          </div>

                          {/* Content */}
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

const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isInteracting, setIsInteracting] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  
  const cardAngle = 360 / profiles.length;
  const radius = 420;

  // Smooth spring rotation
  const springRotation = useSpring(0, { stiffness: 80, damping: 25, mass: 1.2 });

  // Update rotation based on active index
  useEffect(() => {
    springRotation.set(-activeIndex * cardAngle);
  }, [activeIndex, cardAngle, springRotation]);

  // Auto-rotation
  useEffect(() => {
    if (isAutoPlaying && !isInteracting && !selectedProfile) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, isInteracting, selectedProfile]);

  // Pause on interaction
  const handleInteractionStart = useCallback(() => {
    setIsInteracting(true);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  }, []);

  const handleInteractionEnd = useCallback(() => {
    // Resume after a delay
    setTimeout(() => setIsInteracting(false), 3000);
  }, []);

  const nextCard = () => {
    handleInteractionStart();
    setActiveIndex((prev) => (prev + 1) % profiles.length);
    handleInteractionEnd();
  };

  const prevCard = () => {
    handleInteractionStart();
    setActiveIndex((prev) => (prev - 1 + profiles.length) % profiles.length);
    handleInteractionEnd();
  };

  const handleCardClick = (index: number) => {
    handleInteractionStart();
    if (index === activeIndex) {
      setSelectedProfile(profiles[index]);
    } else {
      setActiveIndex(index);
    }
    handleInteractionEnd();
  };

  // Subscribe to spring changes
  const [currentRotation, setCurrentRotation] = useState(0);
  useEffect(() => {
    const unsubscribe = springRotation.on("change", (v) => setCurrentRotation(v));
    return () => unsubscribe();
  }, [springRotation]);

  return (
    <>
      <div 
        className="relative w-full min-h-[80vh] flex flex-col items-center justify-center overflow-hidden py-8"
        onMouseEnter={handleInteractionStart}
        onMouseLeave={handleInteractionEnd}
      >
        {/* Subtle background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-gradient-radial from-muted/30 via-transparent to-transparent" />
        </div>

        {/* 3D Carousel */}
        <div
          ref={containerRef}
          className="relative w-full h-[520px]"
          style={{ perspective: 1800 }}
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
              const opacity = 0.25 + normalizedZ * 0.75;
              const scale = 0.75 + normalizedZ * 0.3;

              return (
                <motion.div
                  key={profile.id}
                  className="absolute left-1/2 top-1/2"
                  style={{
                    x: x - 170,
                    y: -230,
                    z,
                    zIndex: Math.round(normalizedZ * 100),
                  }}
                >
                  <ProfileCard
                    profile={profile}
                    isActive={isActive}
                    opacity={opacity}
                    scale={scale}
                    onClick={() => handleCardClick(index)}
                  />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Active profile name */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="text-center mt-2"
        >
          <h3 className="text-2xl md:text-3xl font-heading font-bold text-foreground">{profiles[activeIndex].name}</h3>
          <p className="text-muted-foreground">{profiles[activeIndex].role}</p>
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6 mt-8">
          <button
            onClick={prevCard}
            className="w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Dots */}
          <div className="flex gap-2">
            {profiles.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  handleInteractionStart();
                  setActiveIndex(index);
                  handleInteractionEnd();
                }}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "w-8 bg-foreground"
                    : "w-2 bg-foreground/20 hover:bg-foreground/40"
                }`}
              />
            ))}
          </div>

          <button
            onClick={nextCard}
            className="w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center text-foreground transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Auto-play toggle */}
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className="flex items-center gap-2 mt-4 px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          {isAutoPlaying ? (
            <>
              <Pause className="w-3.5 h-3.5" />
              <span>Pause</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5" />
              <span>Play</span>
            </>
          )}
        </button>
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
