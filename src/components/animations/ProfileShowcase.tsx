import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";

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
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=800&fit=crop&crop=face",
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
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=800&fit=crop&crop=face",
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
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=800&fit=crop&crop=face",
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
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&h=800&fit=crop&crop=face",
    earnings: "£19,800",
    referrals: 11,
    timeline: [
      { year: "2024", title: "Principal DS", company: "OpenAI", type: "work" },
      { year: "2022", title: "Lead Scientist", company: "DeepMind", type: "work" },
      { year: "2020", title: "PhD AI/ML", company: "Stanford", type: "education" },
      { year: "2018", title: "Data Scientist", company: "Tesla", type: "work" },
    ],
  },
  {
    id: 4,
    name: "Aisha Patel",
    role: "Chief People Officer",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&h=800&fit=crop&crop=face",
    earnings: "£32,100",
    referrals: 19,
    timeline: [
      { year: "2024", title: "CPO", company: "Canva", type: "work" },
      { year: "2021", title: "VP People", company: "Shopify", type: "work" },
      { year: "2019", title: "HR Director", company: "Uber", type: "work" },
      { year: "2017", title: "MBA", company: "Harvard", type: "education" },
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
  const [rotation, setRotation] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef(0);
  const rotationStart = useRef(0);
  const animationRef = useRef<number>();
  const containerRef = useRef<HTMLDivElement>(null);

  const cardCount = profiles.length;
  const anglePerCard = 360 / cardCount;
  const radius = 400; // Distance from center

  // Auto-rotate
  useEffect(() => {
    if (isHovered || isDragging) return;

    const animate = () => {
      setRotation((prev) => {
        const newRotation = prev + 0.15; // Slow rotation speed
        return newRotation;
      });
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, isDragging]);

  // Calculate which card is in front
  useEffect(() => {
    const normalizedRotation = ((rotation % 360) + 360) % 360;
    const frontIndex = Math.round(normalizedRotation / anglePerCard) % cardCount;
    const adjustedIndex = (cardCount - frontIndex) % cardCount;
    setActiveIndex(adjustedIndex);
  }, [rotation, anglePerCard, cardCount]);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    rotationStart.current = rotation;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setRotation(rotationStart.current + deltaX * 0.3);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const goToProfile = (index: number) => {
    const targetRotation = -index * anglePerCard;
    const currentNormalized = rotation % 360;
    let diff = targetRotation - currentNormalized;
    
    // Take the shortest path
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;
    
    setRotation(rotation + diff);
  };

  const nextProfile = () => {
    goToProfile((activeIndex + 1) % cardCount);
  };

  const prevProfile = () => {
    goToProfile((activeIndex - 1 + cardCount) % cardCount);
  };

  const activeProfile = profiles[activeIndex];

  return (
    <div className="relative w-full min-h-[800px] flex flex-col items-center justify-center overflow-hidden">
      {/* 3D Carousel Container */}
      <div
        ref={containerRef}
        className="relative w-full h-[500px] perspective-[1200px] cursor-grab active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={() => { handleMouseUp(); setIsHovered(false); }}
        onMouseEnter={() => setIsHovered(true)}
        style={{ perspective: "1200px" }}
      >
        {/* Rotating carousel */}
        <div
          className="absolute left-1/2 top-1/2 w-0 h-0"
          style={{
            transform: `translateX(-50%) translateY(-50%) rotateY(${rotation}deg)`,
            transformStyle: "preserve-3d",
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {profiles.map((profile, index) => {
            const angle = index * anglePerCard;
            const isActive = index === activeIndex;
            
            return (
              <motion.div
                key={profile.id}
                className="absolute"
                style={{
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  transformStyle: "preserve-3d",
                }}
                onClick={() => goToProfile(index)}
              >
                {/* Profile Card */}
                <motion.div
                  className={`relative w-[280px] h-[380px] rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                    isActive 
                      ? "shadow-2xl shadow-primary/30 scale-110" 
                      : "shadow-xl opacity-70 scale-95"
                  }`}
                  whileHover={{ scale: isActive ? 1.15 : 1.02 }}
                  style={{
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* Profile Image */}
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />

                  {/* Glow effect for active card */}
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent animate-pulse" />
                  )}

                  {/* Name badge */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-foreground truncate">
                      {profile.name}
                    </h3>
                    <p className="text-sm text-muted-foreground truncate">
                      {profile.role}
                    </p>
                    
                    {/* Quick stats */}
                    <div className="flex gap-4 mt-2 text-xs">
                      <span className="text-primary font-semibold">{profile.earnings}</span>
                      <span className="text-muted-foreground">{profile.referrals} referrals</span>
                    </div>
                  </div>

                  {/* Border glow */}
                  <div className={`absolute inset-0 rounded-2xl border-2 transition-colors duration-300 ${
                    isActive ? "border-primary/50" : "border-foreground/10"
                  }`} />
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute left-1/2 top-1/2 -translate-y-1/2 w-full max-w-5xl px-4 flex justify-between pointer-events-none">
        <button
          onClick={prevProfile}
          className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextProfile}
          className="pointer-events-auto w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Profile dots indicator */}
      <div className="flex gap-2 mt-4">
        {profiles.map((_, index) => (
          <button
            key={index}
            onClick={() => goToProfile(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === activeIndex
                ? "w-8 bg-primary"
                : "w-2 bg-foreground/20 hover:bg-foreground/40"
            }`}
          />
        ))}
      </div>

      {/* CV 2.0 Timeline Panel - Shows below carousel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeProfile.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full max-w-3xl mt-8 px-4"
        >
          {/* Header with name and stats */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl md:text-3xl font-bold text-foreground">
                {activeProfile.name}
              </h3>
              <p className="text-muted-foreground">{activeProfile.role}</p>
            </div>
            <div className="flex gap-6 text-right">
              <div>
                <p className="text-2xl font-bold text-primary">{activeProfile.earnings}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Total Earned</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{activeProfile.referrals}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">Referrals</p>
              </div>
            </div>
          </div>

          {/* Horizontal Timeline */}
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-4 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-primary/50 to-primary/20" />
            
            {/* Timeline items */}
            <div className="grid grid-cols-4 gap-4">
              {activeProfile.timeline.map((item, index) => {
                const Icon = typeIcons[item.type];
                const colorClass = typeColors[item.type];

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + index * 0.08, duration: 0.3 }}
                    className="relative pt-8 group"
                  >
                    {/* Node */}
                    <div
                      className={`absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center transition-transform duration-300 group-hover:scale-125 z-10`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>

                    {/* Pulse ring */}
                    <motion.div
                      className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary/30"
                      animate={{
                        scale: [1, 1.8, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: index * 0.3,
                      }}
                    />

                    {/* Content */}
                    <div className="mt-4 text-center bg-foreground/5 rounded-xl p-3 border border-foreground/10 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-foreground/10">
                      <span className="text-xs font-bold text-primary block mb-1">
                        {item.year}
                      </span>
                      <p className="font-semibold text-foreground text-sm leading-tight">
                        {item.title}
                      </p>
                      <span className="text-xs text-muted-foreground">
                        {item.company}
                      </span>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Background ambient glow */}
      <div className="absolute -z-10 top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-primary/15 via-primary/5 to-transparent blur-3xl pointer-events-none" />
      
      {/* Secondary accent glow */}
      <div className="absolute -z-10 bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-radial from-primary/10 via-transparent to-transparent blur-2xl pointer-events-none" />
    </div>
  );
};

export default ProfileShowcase;
