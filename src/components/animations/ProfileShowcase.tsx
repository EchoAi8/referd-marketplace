import { useRef, useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence, useSpring, PanInfo } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Award, 
  TrendingUp, 
  ChevronLeft, 
  ChevronRight, 
  MapPin, 
  X, 
  Pause, 
  Play,
  MessageCircle,
  Send,
  User,
  Mail,
  BadgeCheck,
  Users,
  Zap,
  ExternalLink,
  Clock,
  Building2,
  Video,
  Volume2,
  VolumeX
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface TimelineItem {
  year: string;
  endYear?: string;
  title: string;
  company: string;
  type: "work" | "education" | "achievement" | "training";
  description?: string;
  skills?: string[];
  logo?: string;
  current?: boolean;
}

interface ProfileData {
  id: number;
  name: string;
  handle: string;
  role: string;
  company: string;
  location: string;
  image: string;
  videoIntro?: string;
  coverGradient: string;
  bio: string;
  connections: number;
  endorsements: number;
  responseTime: string;
  verified: boolean;
  topReferrer: boolean;
  skills: string[];
  timeline: TimelineItem[];
}

const profiles: ProfileData[] = [
  {
    id: 0,
    name: "Sarah Chen",
    handle: "@sarahchen.design",
    role: "Senior Product Designer",
    company: "Stripe",
    location: "San Francisco, CA",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top",
    videoIntro: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-violet-500/20 via-fuchsia-500/10 to-pink-500/20",
    bio: "Crafting intuitive payment experiences. Previously @figma @airbnb. RISD '18. She/her 💜",
    connections: 847,
    endorsements: 156,
    responseTime: "< 2hrs",
    verified: true,
    topReferrer: false,
    skills: ["Product Design", "Figma", "Design Systems", "User Research"],
    timeline: [
      { year: "2023", title: "Design Lead", company: "Stripe", type: "work", current: true, description: "Leading checkout & payment links design", skills: ["Leadership", "Strategy"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2021", endYear: "2023", title: "Senior Designer", company: "Figma", type: "work", description: "FigJam & collaboration features", skills: ["Prototyping", "Design Systems"], logo: "https://logo.clearbit.com/figma.com" },
      { year: "2019", endYear: "2021", title: "Product Designer", company: "Airbnb", type: "work", description: "Experiences & trips team", logo: "https://logo.clearbit.com/airbnb.com" },
      { year: "2018", title: "MFA Industrial Design", company: "RISD", type: "education" },
    ],
  },
  {
    id: 1,
    name: "Marcus Johnson",
    handle: "@marcusj.dev",
    role: "Engineering Manager",
    company: "Vercel",
    location: "Brooklyn, NY",
    image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top",
    videoIntro: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-blue-500/20 via-cyan-500/10 to-teal-500/20",
    bio: "Building the future of web dev. React contributor. Speaker. Mentor. Open source enthusiast 🚀",
    connections: 2340,
    endorsements: 423,
    responseTime: "< 4hrs",
    verified: true,
    topReferrer: true,
    skills: ["React", "TypeScript", "Next.js", "System Design"],
    timeline: [
      { year: "2023", title: "Engineering Manager", company: "Vercel", type: "work", current: true, description: "Leading Next.js DX team", skills: ["Management", "Architecture"], logo: "https://logo.clearbit.com/vercel.com" },
      { year: "2020", endYear: "2023", title: "Staff Engineer", company: "Meta", type: "work", description: "React core team", skills: ["React", "Performance"], logo: "https://logo.clearbit.com/meta.com" },
      { year: "2019", title: "Top Contributor", company: "React Open Source", type: "achievement", description: "500+ contributions" },
      { year: "2017", endYear: "2020", title: "Senior Engineer", company: "Google", type: "work", description: "Chrome DevTools", logo: "https://logo.clearbit.com/google.com" },
    ],
  },
  {
    id: 2,
    name: "Elena Rodriguez",
    handle: "@elena.grows",
    role: "VP of Marketing",
    company: "Notion",
    location: "Austin, TX",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-orange-500/20 via-amber-500/10 to-yellow-500/20",
    bio: "Growth nerd. Content strategist. Podcast addict. Building brands that matter. Mom of 2 🌻",
    connections: 1560,
    endorsements: 287,
    responseTime: "< 1hr",
    verified: true,
    topReferrer: true,
    skills: ["Growth Marketing", "Brand Strategy", "Content", "Analytics"],
    timeline: [
      { year: "2023", title: "VP Marketing", company: "Notion", type: "work", current: true, description: "Global brand & growth", skills: ["Leadership", "Strategy"], logo: "https://logo.clearbit.com/notion.so" },
      { year: "2022", title: "Reforge Growth Series", company: "Reforge", type: "training", description: "Advanced growth certification" },
      { year: "2020", endYear: "2023", title: "Director of Growth", company: "Spotify", type: "work", description: "Podcast marketing", logo: "https://logo.clearbit.com/spotify.com" },
      { year: "2017", endYear: "2020", title: "Marketing Lead", company: "Netflix", type: "work", description: "Original content", logo: "https://logo.clearbit.com/netflix.com" },
    ],
  },
  {
    id: 3,
    name: "David Kim",
    handle: "@davidkim.ai",
    role: "Principal Data Scientist",
    company: "OpenAI",
    location: "Seattle, WA",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top",
    videoIntro: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-emerald-500/20 via-green-500/10 to-lime-500/20",
    bio: "ML researcher. Stanford PhD. Building AGI one model at a time. Coffee enthusiast ☕",
    connections: 923,
    endorsements: 198,
    responseTime: "< 6hrs",
    verified: true,
    topReferrer: false,
    skills: ["Machine Learning", "Python", "TensorFlow", "Research"],
    timeline: [
      { year: "2022", title: "Principal Data Scientist", company: "OpenAI", type: "work", current: true, description: "LLM research & fine-tuning", skills: ["GPT", "RLHF"], logo: "https://logo.clearbit.com/openai.com" },
      { year: "2020", endYear: "2022", title: "Lead Scientist", company: "DeepMind", type: "work", description: "Reinforcement learning", logo: "https://logo.clearbit.com/deepmind.com" },
      { year: "2020", title: "PhD in AI/ML", company: "Stanford University", type: "education" },
      { year: "2016", endYear: "2020", title: "Data Scientist", company: "Tesla", type: "work", description: "Autopilot team", logo: "https://logo.clearbit.com/tesla.com" },
    ],
  },
  {
    id: 4,
    name: "Aisha Patel",
    handle: "@aisha.people",
    role: "Chief People Officer",
    company: "Canva",
    location: "London, UK",
    image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-pink-500/20 via-rose-500/10 to-red-500/20",
    bio: "People-first leader. Culture architect. Harvard MBA. DEI advocate. Always learning 📚",
    connections: 1890,
    endorsements: 342,
    responseTime: "< 3hrs",
    verified: true,
    topReferrer: true,
    skills: ["People Ops", "Culture", "Leadership", "DEI"],
    timeline: [
      { year: "2022", title: "Chief People Officer", company: "Canva", type: "work", current: true, description: "Global people strategy", skills: ["Leadership", "Culture"], logo: "https://logo.clearbit.com/canva.com" },
      { year: "2022", title: "ICF Certified Coach", company: "ICF", type: "training" },
      { year: "2019", endYear: "2022", title: "VP People", company: "Shopify", type: "work", description: "Remote-first transformation", logo: "https://logo.clearbit.com/shopify.com" },
      { year: "2017", title: "MBA", company: "Harvard Business School", type: "education" },
    ],
  },
  {
    id: 5,
    name: "James Wright",
    handle: "@jamesw.sales",
    role: "Head of Sales",
    company: "Stripe",
    location: "Chicago, IL",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top",
    videoIntro: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top",
    coverGradient: "from-indigo-500/20 via-purple-500/10 to-violet-500/20",
    bio: "Enterprise sales leader. Quota crusher. Team builder. Golf on weekends ⛳",
    connections: 3420,
    endorsements: 521,
    responseTime: "< 1hr",
    verified: true,
    topReferrer: true,
    skills: ["Enterprise Sales", "Negotiation", "SaaS", "Leadership"],
    timeline: [
      { year: "2022", title: "Head of Sales", company: "Stripe", type: "work", current: true, description: "Enterprise & strategic accounts", skills: ["Strategy", "Team Building"], logo: "https://logo.clearbit.com/stripe.com" },
      { year: "2023", title: "Sandler Enterprise Selling", company: "Sandler Training", type: "training" },
      { year: "2019", endYear: "2022", title: "Sales Director", company: "Salesforce", type: "work", description: "Mid-market team lead", logo: "https://logo.clearbit.com/salesforce.com" },
      { year: "2016", endYear: "2019", title: "Account Executive", company: "Oracle", type: "work", description: "Cloud infrastructure", logo: "https://logo.clearbit.com/oracle.com" },
    ],
  },
];

const typeConfig = {
  work: { icon: Building2, color: "foreground", bgColor: "muted" },
  education: { icon: GraduationCap, color: "rose", bgColor: "rose" },
  achievement: { icon: Award, color: "mustard", bgColor: "mustard" },
  training: { icon: TrendingUp, color: "sage", bgColor: "sage" },
};

// Video Intro Modal
const VideoIntroModal = ({
  profile,
  onClose,
}: {
  profile: ProfileData;
  onClose: () => void;
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div className="absolute inset-0 bg-foreground/90 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-lg bg-background rounded-3xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Video Container */}
        <div className="relative aspect-[9/16] max-h-[70vh] bg-foreground/5">
          {/* Placeholder - In production, this would be actual video */}
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-b from-muted/50 to-muted">
            <div className="text-center">
              <div className="w-24 h-24 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <Video className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground">Video intro coming soon</p>
              <p className="text-xs text-muted-foreground/60 mt-1">30-second introduction</p>
            </div>
          </div>
          
          {/* Floating profile info */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-foreground/80 to-transparent">
            <div className="flex items-center gap-3">
              <img 
                src={profile.image} 
                alt={profile.name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-background/20"
              />
              <div className="text-background">
                <div className="flex items-center gap-1.5">
                  <h3 className="font-heading font-bold">{profile.name}</h3>
                  {profile.verified && <BadgeCheck className="w-4 h-4 text-sage" />}
                </div>
                <p className="text-sm text-background/70">{profile.role}</p>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className="w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/30 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <button 
              onClick={onClose}
              className="w-10 h-10 rounded-full bg-foreground/20 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Quick Contact Modal
const QuickContactModal = ({
  profile,
  onClose,
}: {
  profile: ProfileData;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all fields");
      return;
    }
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success(`Message sent to ${profile.name}!`);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div className="absolute inset-0 bg-foreground/70 backdrop-blur-sm" />
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="relative w-full max-w-md bg-background rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 pb-4 bg-gradient-to-b from-muted/50 to-transparent">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center text-muted-foreground hover:bg-foreground/10">
            <X className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-4">
            <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-full object-cover ring-2 ring-background" />
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-lg font-heading font-bold text-foreground">{profile.name}</h3>
                {profile.verified && <BadgeCheck className="w-4 h-4 text-sage fill-sage/20" />}
              </div>
              <p className="text-sm text-muted-foreground">{profile.handle}</p>
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Your Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="John Smith" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="pl-10 bg-muted/30 border-foreground/10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="email" placeholder="john@company.com" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="pl-10 bg-muted/30 border-foreground/10" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Message</label>
            <Textarea placeholder={`Hi ${profile.name.split(" ")[0]}, I'd love to connect...`} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} className="bg-muted/30 border-foreground/10 min-h-[100px] resize-none" />
          </div>
          <motion.button type="submit" disabled={isSubmitting} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full py-3 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 disabled:opacity-50">
            {isSubmitting ? <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }} className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full" /> : <><Send className="w-4 h-4" />Send Message</>}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

// Redesigned Candidate Profile Card
const FlipCard = ({
  profile,
  isActive,
  isFlipped,
  onFlip,
  onClick,
  onContactClick,
  onVideoClick,
}: {
  profile: ProfileData;
  isActive: boolean;
  isFlipped: boolean;
  onFlip: (flipped: boolean) => void;
  onClick: () => void;
  onContactClick: () => void;
  onVideoClick: () => void;
}) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className="relative cursor-pointer select-none touch-none"
      style={{ width: 320, height: 440, perspective: 2000 }}
      onMouseEnter={() => onFlip(true)}
      onMouseLeave={() => onFlip(false)}
      onClick={onClick}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20, mass: 0.8 }}
      >
        {/* FRONT - Clean Candidate Card */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-card border border-border/50"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
        >
          {/* Card glow effect for active state */}
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none z-20"
            animate={{
              boxShadow: isActive
                ? "0 20px 60px -15px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--border))"
                : "0 8px 30px -10px hsl(var(--foreground) / 0.08), 0 0 0 1px hsl(var(--border) / 0.5)",
            }}
          />

          {/* Top Referrer Badge */}
          {profile.topReferrer && (
            <div className="absolute top-4 left-4 z-30">
              <div className="flex items-center gap-1.5 px-3 py-1.5 bg-mustard rounded-full shadow-md">
                <Zap className="w-3.5 h-3.5 text-foreground" />
                <span className="text-[11px] font-bold text-foreground tracking-wide">Top Referrer</span>
              </div>
            </div>
          )}

          {/* Video Intro Button */}
          {profile.videoIntro && (
            <motion.button
              className="absolute top-4 right-4 z-30"
              onClick={(e) => { e.stopPropagation(); onVideoClick(); }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-10 h-10 bg-sage rounded-full flex items-center justify-center shadow-lg">
                <Play className="w-4 h-4 text-foreground ml-0.5" fill="currentColor" />
              </div>
            </motion.button>
          )}

          {/* Profile Photo - Top Half */}
          <div className="relative w-full h-[55%] overflow-hidden bg-muted">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-b from-muted to-muted/50 animate-pulse" />
            )}
            <motion.img
              src={profile.image}
              alt={profile.name}
              className={`w-full h-full object-cover object-top ${!imageLoaded ? 'opacity-0' : 'opacity-100'}`}
              style={{ 
                maskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 75%, transparent 100%)',
              }}
              onLoad={() => setImageLoaded(true)}
              draggable={false}
            />
          </div>

          {/* Content Section */}
          <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-card via-card to-transparent">
            {/* Name & Verification */}
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-lg font-heading font-bold text-foreground truncate">{profile.name}</h3>
              {profile.verified && <BadgeCheck className="w-5 h-5 text-sage flex-shrink-0" />}
            </div>

            {/* Role & Company */}
            <p className="text-sm font-medium text-foreground/80 truncate">{profile.role}</p>
            <div className="flex items-center gap-1.5 mt-1 text-muted-foreground">
              <Building2 className="w-3.5 h-3.5" />
              <span className="text-xs truncate">{profile.company}</span>
              <span className="text-xs">•</span>
              <MapPin className="w-3.5 h-3.5" />
              <span className="text-xs truncate">{profile.location}</span>
            </div>

            {/* Stats Row */}
            <div className="flex items-center gap-4 mt-4 pt-4 border-t border-border/50">
              <div className="flex-1 text-center">
                <p className="text-base font-bold text-foreground">{profile.connections.toLocaleString()}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Connections</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div className="flex-1 text-center">
                <p className="text-base font-bold text-foreground">{profile.endorsements}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Endorsements</p>
              </div>
              <div className="w-px h-8 bg-border/50" />
              <div className="flex-1 text-center">
                <p className="text-base font-bold text-sage">{profile.responseTime}</p>
                <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Response</p>
              </div>
            </div>

            {/* Skills Pills */}
            <div className="flex flex-wrap gap-1.5 mt-4">
              {profile.skills.slice(0, 4).map((skill) => (
                <span key={skill} className="px-2.5 py-1 text-[10px] font-semibold text-foreground/70 bg-muted/80 rounded-full">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* BACK - Career Timeline */}
        <motion.div
          className="absolute inset-0 rounded-3xl overflow-hidden bg-card border border-border/50"
          style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          {/* Border glow */}
          <div className="absolute inset-0 rounded-3xl pointer-events-none z-20" style={{ boxShadow: "0 20px 60px -15px hsl(var(--foreground) / 0.15), 0 0 0 1px hsl(var(--border))" }} />

          {/* Header with mini profile */}
          <div className="p-5 pb-4 border-b border-border/50 bg-muted/30">
            <div className="flex items-center gap-3">
              <div className="relative">
                <img src={profile.image} alt={profile.name} className="w-14 h-14 rounded-2xl object-cover object-top ring-2 ring-background" />
                {profile.videoIntro && (
                  <motion.button
                    className="absolute -bottom-1 -right-1 w-6 h-6 bg-sage rounded-full flex items-center justify-center shadow-md"
                    onClick={(e) => { e.stopPropagation(); onVideoClick(); }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Play className="w-3 h-3 text-foreground ml-0.5" fill="currentColor" />
                  </motion.button>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-heading font-bold text-foreground truncate">{profile.name}</h3>
                  {profile.verified && <BadgeCheck className="w-4 h-4 text-sage flex-shrink-0" />}
                </div>
                <p className="text-xs text-muted-foreground truncate">{profile.role} at {profile.company}</p>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="p-5 pt-4 h-[calc(100%-160px)] overflow-y-auto scrollbar-thin scrollbar-thumb-muted/50 scrollbar-track-transparent">
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-border via-border/50 to-transparent" />

              <div className="space-y-4">
                {profile.timeline.map((item, idx) => {
                  const config = typeConfig[item.type];
                  const Icon = config.icon;

                  return (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      className="relative flex gap-4 group"
                    >
                      {/* Node */}
                      <div className="relative z-10 flex-shrink-0">
                        <div 
                          className={`w-10 h-10 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                            item.current 
                              ? 'bg-sage/20 ring-2 ring-sage/40' 
                              : 'bg-muted'
                          }`}
                        >
                          {item.logo ? (
                            <img src={item.logo} alt={item.company} className="w-5 h-5 object-contain" />
                          ) : (
                            <Icon className={`w-4 h-4 ${item.type === 'education' ? 'text-rose' : item.type === 'training' ? 'text-sage' : item.type === 'achievement' ? 'text-mustard' : 'text-muted-foreground'}`} />
                          )}
                        </div>
                        {item.current && (
                          <motion.div 
                            className="absolute -top-1 -right-1 w-3 h-3 bg-sage rounded-full ring-2 ring-card"
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0 pb-1">
                        <div className="flex items-start justify-between gap-2">
                          <div className="min-w-0">
                            <h4 className="text-sm font-semibold text-foreground truncate">{item.title}</h4>
                            <p className="text-xs text-muted-foreground">{item.company}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <span className={`text-xs font-medium ${item.current ? 'text-sage' : 'text-muted-foreground'}`}>
                              {item.current ? 'Present' : item.year}
                            </span>
                            {item.endYear && !item.current && (
                              <span className="text-xs text-muted-foreground"> - {item.endYear}</span>
                            )}
                          </div>
                        </div>

                        {item.description && (
                          <p className="text-xs text-muted-foreground/80 mt-1 line-clamp-1">{item.description}</p>
                        )}

                        {item.skills && item.skills.length > 0 && (
                          <div className="flex gap-1 mt-2">
                            {item.skills.map((skill, i) => (
                              <span key={i} className="px-1.5 py-0.5 text-[10px] font-medium text-sage bg-sage/10 rounded">
                                {skill}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-5 pt-3 bg-gradient-to-t from-card via-card to-transparent">
            <motion.button
              onClick={(e) => { e.stopPropagation(); onContactClick(); }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-foreground text-background font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-foreground/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              Connect with {profile.name.split(" ")[0]}
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

// Main Carousel
const ProfileShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProfile, setSelectedProfile] = useState<ProfileData | null>(null);
  const [contactProfile, setContactProfile] = useState<ProfileData | null>(null);
  const [videoProfile, setVideoProfile] = useState<ProfileData | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [flippedIndex, setFlippedIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();

  const springX = useSpring(0, { stiffness: 60, damping: 20, mass: 1 });
  const cardWidth = 340;
  const cardGap = 20;

  useEffect(() => {
    springX.set(-activeIndex * (cardWidth + cardGap));
  }, [activeIndex, springX]);

  useEffect(() => {
    if (isAutoPlaying && !isHovering && !isDragging && !selectedProfile && !contactProfile && !videoProfile) {
      autoPlayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % profiles.length);
      }, 4000);
    }
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isAutoPlaying, isHovering, isDragging, selectedProfile, contactProfile, videoProfile]);

  const handleHoverStart = useCallback(() => { setIsHovering(true); if (autoPlayRef.current) clearInterval(autoPlayRef.current); }, []);
  const handleHoverEnd = useCallback(() => { setIsHovering(false); setFlippedIndex(null); }, []);

  const handleDragStart = () => { setIsDragging(true); setFlippedIndex(null); if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    setIsDragging(false);
    const threshold = cardWidth / 4;
    let direction = 0;
    if (Math.abs(info.velocity.x) > 500) direction = info.velocity.x > 0 ? -1 : 1;
    else if (Math.abs(info.offset.x) > threshold) direction = info.offset.x > 0 ? -1 : 1;
    if (direction !== 0) setActiveIndex(Math.max(0, Math.min(profiles.length - 1, activeIndex + direction)));
    else springX.set(-activeIndex * (cardWidth + cardGap));
  };

  const [currentX, setCurrentX] = useState(0);
  useEffect(() => { const unsub = springX.on("change", setCurrentX); return () => unsub(); }, [springX]);

  return (
    <>
      <div className="relative w-full py-6 pt-12 overflow-hidden" onMouseEnter={handleHoverStart} onMouseLeave={handleHoverEnd}>
        {/* Subtle background gradient */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-muted/20 via-transparent to-transparent" />
        </div>

        {/* Edge fade gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <motion.div ref={containerRef} className="relative h-[480px] flex items-center cursor-grab active:cursor-grabbing" drag="x" dragConstraints={{ left: 0, right: 0 }} dragElastic={0.1} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          <motion.div className="flex items-center gap-[20px] px-[calc(50vw-160px)]" style={{ x: currentX }}>
            {profiles.map((profile, index) => {
              const isActive = index === activeIndex;
              const distance = Math.abs(index - activeIndex);
              return (
                <motion.div
                  key={profile.id}
                  animate={{ opacity: isActive ? 1 : Math.max(0.4, 1 - distance * 0.25), scale: isActive ? 1 : Math.max(0.88, 1 - distance * 0.06), y: isActive ? -8 : 0 }}
                  transition={{ type: "spring", stiffness: 150, damping: 20 }}
                  style={{ zIndex: isActive ? 10 : 5 - distance }}
                >
                  <FlipCard
                    profile={profile}
                    isActive={isActive}
                    isFlipped={flippedIndex === index && isActive && !isDragging}
                    onFlip={(f) => { if (isActive && !isDragging) setFlippedIndex(f ? index : null); }}
                    onClick={() => { if (!isDragging) isActive ? setSelectedProfile(profile) : setActiveIndex(index); }}
                    onContactClick={() => setContactProfile(profile)}
                    onVideoClick={() => setVideoProfile(profile)}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>

        <motion.div className="flex items-center justify-center gap-2 text-muted-foreground mb-4 md:hidden" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          <ChevronLeft className="w-4 h-4" /><span className="text-sm">Swipe to explore</span><ChevronRight className="w-4 h-4" />
        </motion.div>

        <div className="flex items-center justify-center gap-6 mt-4">
          <motion.button onClick={() => setActiveIndex((p) => (p - 1 + profiles.length) % profiles.length)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-muted/50 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-muted transition-colors">
            <ChevronLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex items-center gap-2">
            {profiles.map((_, index) => (
              <button key={index} onClick={() => setActiveIndex(index)} className="group p-1">
                <motion.div animate={{ width: index === activeIndex ? 24 : 8, backgroundColor: index === activeIndex ? "hsl(var(--foreground))" : "hsl(var(--foreground) / 0.2)" }} transition={{ duration: 0.3 }} className="h-2 rounded-full" />
              </button>
            ))}
          </div>

          <motion.button onClick={() => setActiveIndex((p) => (p + 1) % profiles.length)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-12 h-12 rounded-full bg-muted/50 border border-foreground/10 flex items-center justify-center text-foreground hover:bg-muted transition-colors">
            <ChevronRight className="w-5 h-5" />
          </motion.button>

          <motion.button onClick={() => setIsAutoPlaying(!isAutoPlaying)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="w-10 h-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors ml-2">
            {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
          </motion.button>
        </div>
      </div>

      <AnimatePresence>
        {contactProfile && <QuickContactModal profile={contactProfile} onClose={() => setContactProfile(null)} />}
        {videoProfile && <VideoIntroModal profile={videoProfile} onClose={() => setVideoProfile(null)} />}
      </AnimatePresence>
    </>
  );
};

export default ProfileShowcase;
