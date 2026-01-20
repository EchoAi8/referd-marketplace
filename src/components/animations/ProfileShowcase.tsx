import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, GraduationCap, Award, TrendingUp, Star, ChevronLeft, ChevronRight } from "lucide-react";

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
  rating: number;
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
    rating: 4.9,
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
    rating: 5.0,
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
    rating: 4.8,
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
    rating: 4.7,
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
    rating: 4.9,
    timeline: [
      { year: "2024", title: "CPO", company: "Canva", type: "work" },
      { year: "2021", title: "VP People", company: "Shopify", type: "work" },
      { year: "2019", title: "HR Director", company: "Uber", type: "work" },
      { year: "2017", title: "MBA", company: "Harvard", type: "education" },
    ],
  },
  {
    id: 5,
    name: "James Wright",
    role: "Head of Sales",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=800&fit=crop&crop=face",
    earnings: "£52,300",
    referrals: 31,
    rating: 5.0,
    timeline: [
      { year: "2024", title: "Head of Sales", company: "Stripe", type: "work" },
      { year: "2022", title: "Sales Director", company: "Salesforce", type: "work" },
      { year: "2020", title: "30+ Referrals", company: "Milestone", type: "growth" },
      { year: "2018", title: "Account Exec", company: "Oracle", type: "work" },
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
    className="absolute rounded-full bg-primary/60"
    style={{ width: size, height: size }}
    initial={{ x, y, opacity: 0, scale: 0 }}
    animate={{
      x: [x, x + (Math.random() - 0.5) * 100, x],
      y: [y, y - 150 - Math.random() * 100, y],
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  />
);

// Flip Card component
const FlipCard = ({ 
  profile, 
  isActive, 
  index,
  onActivate 
}: { 
  profile: ProfileData; 
  isActive: boolean;
  index: number;
  onActivate: () => void;
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative flex-shrink-0 cursor-pointer"
      style={{ 
        width: 340,
        height: 480,
        perspective: 1500,
      }}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onClick={onActivate}
      animate={{
        scale: isActive ? 1.08 : 0.92,
        opacity: isActive ? 1 : 0.6,
        filter: isActive ? "brightness(1)" : "brightness(0.7)",
      }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Spotlight effect for active card */}
      {isActive && (
        <>
          {/* Main spotlight glow */}
          <motion.div
            className="absolute -inset-8 rounded-3xl bg-gradient-radial from-primary/40 via-primary/10 to-transparent blur-2xl"
            animate={{
              opacity: [0.5, 0.8, 0.5],
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating particles */}
          {[...Array(12)].map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.2}
              duration={2 + Math.random() * 2}
              size={4 + Math.random() * 6}
              x={-50 + Math.random() * 440}
              y={400 + Math.random() * 80}
            />
          ))}
        </>
      )}

      {/* Card container with 3D flip */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* FRONT - Profile Image Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden border-2 border-foreground/10"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Full-bleed profile image */}
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

          {/* Shine effect on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
            initial={{ x: "-100%", opacity: 0 }}
            animate={isFlipped ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ duration: 0.6 }}
          />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            {/* Rating stars */}
            <div className="flex items-center gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(profile.rating) ? "text-amber-400 fill-amber-400" : "text-foreground/20"}`}
                />
              ))}
              <span className="ml-2 text-sm font-semibold text-foreground">{profile.rating}</span>
            </div>

            {/* Name & Role */}
            <h3 className="text-2xl font-bold text-foreground mb-1">
              {profile.name}
            </h3>
            <p className="text-base text-muted-foreground mb-3">
              {profile.role}
            </p>

            {/* Quick stats */}
            <div className="flex gap-4">
              <div className="bg-primary/20 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-primary/30">
                <span className="text-primary font-bold text-lg">{profile.earnings}</span>
              </div>
              <div className="bg-foreground/10 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-foreground/20">
                <span className="text-foreground font-medium">{profile.referrals} referrals</span>
              </div>
            </div>
          </div>

          {/* Flip hint */}
          <div className="absolute top-4 right-4 bg-background/60 backdrop-blur-sm rounded-full px-3 py-1 text-xs text-muted-foreground border border-foreground/10">
            Hover to flip
          </div>

          {/* Active border glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary/60"
              animate={{
                boxShadow: ["0 0 20px 0 hsl(var(--primary) / 0.3)", "0 0 40px 0 hsl(var(--primary) / 0.5)", "0 0 20px 0 hsl(var(--primary) / 0.3)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>

        {/* BACK - Timeline Side */}
        <div
          className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-background via-background to-muted/30 border-2 border-foreground/10"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Pattern background */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
              backgroundSize: "20px 20px",
            }} />
          </div>

          {/* Header */}
          <div className="p-5 border-b border-foreground/10">
            <div className="flex items-center gap-3">
              <img
                src={profile.image}
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover border-2 border-primary/50"
              />
              <div>
                <h4 className="font-bold text-foreground">{profile.name}</h4>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Sexy Vertical Timeline */}
          <div className="relative p-5 h-[calc(100%-84px)] overflow-hidden">
            {/* Glowing timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-primary/20" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary to-transparent"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Timeline items */}
            <div className="space-y-4 ml-4">
              {profile.timeline.map((item, idx) => {
                const Icon = typeIcons[item.type];
                const colorClass = typeColors[item.type];

                return (
                  <motion.div
                    key={idx}
                    className="relative flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 + 0.3 }}
                  >
                    {/* Node */}
                    <div className={`relative z-10 flex-shrink-0 w-8 h-8 rounded-full ${colorClass} flex items-center justify-center border transition-transform duration-300 group-hover:scale-125`}>
                      <Icon className="w-4 h-4" />
                      
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-primary/30"
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity, delay: idx * 0.3 }}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-foreground/5 rounded-xl p-3 border border-foreground/10 transition-all duration-300 group-hover:border-primary/30 group-hover:bg-foreground/10">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs font-bold text-primary">{item.year}</span>
                        <span className="text-xs text-muted-foreground">{item.company}</span>
                      </div>
                      <p className="font-semibold text-foreground text-sm">{item.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom stats */}
            <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-background via-background/90 to-transparent">
              <div className="flex justify-between">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{profile.earnings}</p>
                  <p className="text-xs text-muted-foreground">Total Earned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{profile.referrals}</p>
                  <p className="text-xs text-muted-foreground">Referrals</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-amber-400 fill-amber-400" />
                    <span className="text-2xl font-bold text-foreground">{profile.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active border glow */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-2xl border-2 border-primary/60"
              animate={{
                boxShadow: ["0 0 20px 0 hsl(var(--primary) / 0.3)", "0 0 40px 0 hsl(var(--primary) / 0.5)", "0 0 20px 0 hsl(var(--primary) / 0.3)"],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isHovered, setIsHovered] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const scrollPosition = useRef(0);

  const cardWidth = 340;
  const cardGap = 32;
  const totalWidth = profiles.length * (cardWidth + cardGap);

  // Auto-scroll conveyor belt
  useEffect(() => {
    if (isHovered) return;

    const animate = () => {
      scrollPosition.current += 0.5;
      if (scrollPosition.current > totalWidth) {
        scrollPosition.current = 0;
      }

      if (scrollRef.current) {
        scrollRef.current.scrollLeft = scrollPosition.current;
      }

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isHovered, totalWidth]);

  const scrollToCard = (index: number) => {
    setActiveIndex(index);
    if (scrollRef.current) {
      const targetScroll = index * (cardWidth + cardGap) - (scrollRef.current.offsetWidth / 2) + (cardWidth / 2);
      scrollPosition.current = targetScroll;
      scrollRef.current.scrollTo({ left: targetScroll, behavior: "smooth" });
    }
  };

  const nextCard = () => {
    const next = (activeIndex + 1) % profiles.length;
    scrollToCard(next);
  };

  const prevCard = () => {
    const prev = (activeIndex - 1 + profiles.length) % profiles.length;
    scrollToCard(prev);
  };

  return (
    <div 
      className="relative w-full py-16 overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background ambient glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[800px] bg-gradient-radial from-primary/20 via-primary/5 to-transparent blur-3xl" />
      </div>

      {/* Section header */}
      <div className="text-center mb-12 px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-primary font-medium mb-2"
        >
          CV 2.0 — The Future of Hiring
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-bold text-foreground mb-4"
        >
          Meet Our Top Referrers
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground max-w-xl mx-auto"
        >
          Hover over any profile to reveal their dynamic career timeline
        </motion.p>
      </div>

      {/* Conveyor belt container */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Scrolling container */}
        <div
          ref={scrollRef}
          className="flex gap-8 px-16 py-8 overflow-x-auto scrollbar-hide"
          style={{ scrollBehavior: "auto" }}
        >
          {/* Duplicate cards for infinite scroll effect */}
          {[...profiles, ...profiles].map((profile, index) => (
            <FlipCard
              key={`${profile.id}-${index}`}
              profile={profile}
              isActive={index % profiles.length === activeIndex}
              index={index}
              onActivate={() => setActiveIndex(index % profiles.length)}
            />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-center gap-4 mt-8">
        <button
          onClick={prevCard}
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Dots */}
        <div className="flex gap-2">
          {profiles.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToCard(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "w-8 bg-primary"
                  : "w-2 bg-foreground/20 hover:bg-foreground/40"
              }`}
            />
          ))}
        </div>

        <button
          onClick={nextCard}
          className="w-12 h-12 rounded-full bg-background/80 backdrop-blur-sm border border-foreground/10 flex items-center justify-center text-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>
    </div>
  );
};

export default ProfileShowcase;
