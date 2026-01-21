import { motion } from "framer-motion";

/**
 * Mini profile cards for faded hero background grid – matches the brand showcase aesthetic.
 * All styles use semantic tokens. Photos are greyscale + low opacity to avoid competing.
 */

const profileImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=200&fit=crop&crop=top",
  "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=150&h=200&fit=crop&crop=top",
];

const names = [
  "Sarah Chen",
  "Marcus Johnson",
  "Elena Rodriguez",
  "David Kim",
  "Priya Patel",
  "James Wilson",
  "Aisha Mohammed",
  "Ryan O'Connor",
];

const roles = [
  "Product Designer",
  "Engineering Manager",
  "VP Marketing",
  "Data Scientist",
  "UX Researcher",
  "DevOps Lead",
  "Growth Lead",
  "Tech Lead",
];

type Props = {
  className?: string;
};

const HeroProfileGridBackdrop = ({ className }: Props) => {
  // Generate 32 cards (repeat images/names as needed)
  const tiles = Array.from({ length: 32 }, (_, i) => ({
    image: profileImages[i % profileImages.length],
    name: names[i % names.length],
    role: roles[i % roles.length],
    verified: i % 3 === 0,
  }));

  return (
    <div
      className={
        "absolute inset-0 overflow-hidden pointer-events-none " + (className ?? "")
      }
      aria-hidden="true"
    >
      {/* Fade mask so cards never dominate hero content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/30 to-foreground/80 z-10" />

      <div className="absolute -inset-16 [mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)] z-0">
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 sm:gap-4 opacity-40">
          {tiles.map((tile, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.08 + (i % 8) * 0.04,
                ease: [0.22, 0.03, 0.26, 1],
              }}
              className="relative aspect-[3/4] rounded-xl overflow-hidden bg-muted/20 border border-border/30"
            >
              {/* Photo – greyscale + faded */}
              <img
                src={tile.image}
                alt=""
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover object-top filter grayscale opacity-60"
              />

              {/* Bottom gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-foreground/40 to-transparent" />

              {/* Mini info overlay */}
              <div className="absolute bottom-0 inset-x-0 p-2">
                <div className="flex items-center gap-1">
                  <span className="text-[9px] sm:text-[10px] font-semibold text-background truncate">
                    {tile.name}
                  </span>
                  {tile.verified && (
                    <span className="w-2.5 h-2.5 rounded-full bg-sage/60 flex-shrink-0" />
                  )}
                </div>
                <span className="text-[7px] sm:text-[8px] text-background/60 truncate block">
                  {tile.role}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroProfileGridBackdrop;
