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

// Flip Card component with dramatic 3D depth
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
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle mouse move for 3D tilt effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsFlipped(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative flex-shrink-0 cursor-pointer"
      style={{ 
        width: 400,
        height: 520,
        perspective: 2000,
      }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={handleMouseLeave}
      onClick={onActivate}
      animate={{
        scale: isActive ? 1.12 : 0.88,
        opacity: isActive ? 1 : 0.5,
        filter: isActive ? "brightness(1)" : "brightness(0.6)",
        z: isActive ? 100 : 0,
      }}
      transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
    >
      {/* Dramatic Spotlight effect for active card */}
      {isActive && (
        <>
          {/* Outer glow ring */}
          <motion.div
            className="absolute -inset-16 rounded-[3rem]"
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.4) 0%, hsl(var(--primary) / 0.1) 40%, transparent 70%)",
            }}
            animate={{
              opacity: [0.6, 1, 0.6],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Inner spotlight cone */}
          <motion.div
            className="absolute -inset-6 rounded-3xl"
            style={{
              background: "conic-gradient(from 0deg at 50% 0%, transparent 30%, hsl(var(--primary) / 0.3) 50%, transparent 70%)",
              filter: "blur(20px)",
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Ground reflection */}
          <motion.div
            className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-20"
            style={{
              background: "radial-gradient(ellipse at center, hsl(var(--primary) / 0.5) 0%, transparent 70%)",
              filter: "blur(15px)",
            }}
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scaleX: [0.9, 1.1, 0.9],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Floating particles - more dramatic */}
          {[...Array(20)].map((_, i) => (
            <FloatingParticle
              key={i}
              delay={i * 0.15}
              duration={2.5 + Math.random() * 2}
              size={3 + Math.random() * 8}
              x={-80 + Math.random() * 560}
              y={450 + Math.random() * 100}
            />
          ))}
        </>
      )}

      {/* Card container with 3D flip and tilt */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ 
          rotateY: isFlipped ? 180 : mousePos.x * 15,
          rotateX: isFlipped ? 0 : -mousePos.y * 15,
        }}
        transition={{ 
          rotateY: { duration: 0.7, ease: [0.23, 1, 0.32, 1] },
          rotateX: { duration: 0.1, ease: "linear" },
        }}
      >
        {/* Dynamic shadow based on flip state */}
        <motion.div
          className="absolute inset-0 rounded-3xl"
          style={{ transform: "translateZ(-50px)" }}
          animate={{
            boxShadow: isFlipped
              ? "30px 30px 60px rgba(0,0,0,0.5), -30px 30px 60px rgba(0,0,0,0.3)"
              : isActive
                ? "0 25px 80px rgba(0,0,0,0.6), 0 10px 30px hsl(var(--primary) / 0.3)"
                : "0 15px 40px rgba(0,0,0,0.3)",
          }}
          transition={{ duration: 0.5 }}
        />

        {/* FRONT - Profile Image Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden border border-foreground/20"
          style={{ 
            backfaceVisibility: "hidden",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
          animate={{
            boxShadow: isActive 
              ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 2px hsl(var(--primary) / 0.5)"
              : "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Full-bleed profile image */}
          <img
            src={profile.image}
            alt={profile.name}
            className="w-full h-full object-cover transition-transform duration-500"
            style={{ transform: `scale(${isActive ? 1.05 : 1})` }}
            loading="lazy"
          />

          {/* Premium gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent opacity-0 transition-opacity duration-500" 
               style={{ opacity: isActive ? 0.8 : 0 }} />

          {/* Glossy shine effect on flip */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 55%, transparent 60%)",
            }}
            initial={{ x: "-200%", opacity: 0 }}
            animate={isFlipped ? { x: "200%", opacity: 1 } : { x: "-200%", opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          />

          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-7">
            {/* Rating stars - larger */}
            <div className="flex items-center gap-1.5 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(profile.rating) ? "text-amber-400 fill-amber-400 drop-shadow-[0_0_6px_rgba(251,191,36,0.5)]" : "text-foreground/20"}`}
                />
              ))}
              <span className="ml-2 text-base font-bold text-foreground">{profile.rating}</span>
            </div>

            {/* Name & Role - larger typography */}
            <h3 className="text-3xl font-bold text-foreground mb-2 tracking-tight">
              {profile.name}
            </h3>
            <p className="text-lg text-muted-foreground mb-4 font-medium">
              {profile.role}
            </p>

            {/* Quick stats - enhanced */}
            <div className="flex gap-3">
              <div className="bg-primary/25 backdrop-blur-md rounded-xl px-4 py-2 border border-primary/40 shadow-lg shadow-primary/10">
                <span className="text-primary font-bold text-xl">{profile.earnings}</span>
              </div>
              <div className="bg-foreground/10 backdrop-blur-md rounded-xl px-4 py-2 border border-foreground/20">
                <span className="text-foreground font-semibold text-lg">{profile.referrals} referrals</span>
              </div>
            </div>
          </div>

          {/* Animated flip hint */}
          <motion.div 
            className="absolute top-5 right-5 bg-background/70 backdrop-blur-md rounded-full px-4 py-1.5 text-sm text-muted-foreground border border-foreground/10 flex items-center gap-2"
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.span
              animate={{ rotateY: [0, 180, 360] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{ display: "inline-block" }}
            >
              ↻
            </motion.span>
            Hover to flip
          </motion.div>

          {/* Active ring effect */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: [
                  "inset 0 0 0 2px hsl(var(--primary) / 0.4), 0 0 30px 0 hsl(var(--primary) / 0.2)",
                  "inset 0 0 0 3px hsl(var(--primary) / 0.6), 0 0 50px 0 hsl(var(--primary) / 0.4)",
                  "inset 0 0 0 2px hsl(var(--primary) / 0.4), 0 0 30px 0 hsl(var(--primary) / 0.2)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>

        {/* BACK - Timeline Side */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-gradient-to-br from-background via-background to-muted/20 border border-foreground/20"
          style={{ 
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
          animate={{
            boxShadow: isActive 
              ? "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 0 2px hsl(var(--primary) / 0.5)"
              : "inset 0 1px 0 rgba(255,255,255,0.1)",
          }}
        >
          {/* Animated pattern background */}
          <div className="absolute inset-0 opacity-[0.03]">
            <motion.div 
              className="absolute inset-0" 
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--foreground)) 1px, transparent 0)`,
                backgroundSize: "24px 24px",
              }}
              animate={{ backgroundPosition: ["0 0", "24px 24px"] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
          </div>

          {/* Header - enhanced */}
          <div className="p-6 border-b border-foreground/10 bg-gradient-to-r from-primary/5 to-transparent">
            <div className="flex items-center gap-4">
              <div className="relative">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-primary/50"
                />
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-primary"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <div>
                <h4 className="font-bold text-lg text-foreground">{profile.name}</h4>
                <p className="text-sm text-muted-foreground">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Sexy Vertical Timeline - enhanced */}
          <div className="relative p-6 h-[calc(100%-100px)] overflow-hidden">
            {/* Glowing timeline line - thicker */}
            <div className="absolute left-9 top-0 bottom-0 w-1">
              <div className="absolute inset-0 bg-gradient-to-b from-primary via-primary/50 to-primary/10 rounded-full" />
              <motion.div
                className="absolute inset-0 bg-gradient-to-b from-primary via-primary/70 to-transparent rounded-full"
                animate={{ opacity: [0.3, 1, 0.3], scaleY: [0.98, 1, 0.98] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>

            {/* Timeline items - larger */}
            <div className="space-y-5 ml-4">
              {profile.timeline.map((item, idx) => {
                const Icon = typeIcons[item.type];
                const colorClass = typeColors[item.type];

                return (
                  <motion.div
                    key={idx}
                    className="relative flex items-start gap-4 group"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.12 + 0.2, ease: [0.23, 1, 0.32, 1] }}
                  >
                    {/* Node - larger */}
                    <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full ${colorClass} flex items-center justify-center border-2 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg`}>
                      <Icon className="w-5 h-5" />
                      
                      {/* Pulse effect */}
                      <motion.div
                        className="absolute inset-0 rounded-full bg-current opacity-30"
                        animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity, delay: idx * 0.4 }}
                      />
                    </div>

                    {/* Content - enhanced card */}
                    <div className="flex-1 bg-foreground/5 rounded-xl p-4 border border-foreground/10 transition-all duration-300 group-hover:border-primary/40 group-hover:bg-foreground/10 group-hover:translate-x-1">
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-sm font-bold text-primary">{item.year}</span>
                        <span className="text-xs text-muted-foreground font-medium">{item.company}</span>
                      </div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom stats - enhanced */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-background via-background/95 to-transparent">
              <div className="flex justify-between items-end">
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary drop-shadow-[0_0_10px_hsl(var(--primary)/0.5)]">{profile.earnings}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Total Earned</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{profile.referrals}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Referrals</p>
                </div>
                <div className="text-center flex flex-col items-center">
                  <div className="flex items-center gap-1.5">
                    <Star className="w-6 h-6 text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                    <span className="text-2xl font-bold text-foreground">{profile.rating}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">Rating</p>
                </div>
              </div>
            </div>
          </div>

          {/* Active ring effect */}
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-3xl"
              animate={{
                boxShadow: [
                  "inset 0 0 0 2px hsl(var(--primary) / 0.4), 0 0 30px 0 hsl(var(--primary) / 0.2)",
                  "inset 0 0 0 3px hsl(var(--primary) / 0.6), 0 0 50px 0 hsl(var(--primary) / 0.4)",
                  "inset 0 0 0 2px hsl(var(--primary) / 0.4), 0 0 30px 0 hsl(var(--primary) / 0.2)",
                ],
              }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            />
          )}
        </motion.div>
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

  const cardWidth = 400;
  const cardGap = 48;
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
