import { motion } from "framer-motion";

/**
 * An animated grid of mini profile cards for the hero background.
 * Cards scroll slowly to the left in an infinite loop, with a gentle scale pulse.
 * All greyscale + faded so it doesn't compete with hero content.
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
  // Generate 40 cards (5 rows × 8 cols duplicated for seamless scroll)
  const tiles = Array.from({ length: 40 }, (_, i) => ({
    image: profileImages[i % profileImages.length],
    name: names[i % names.length],
    role: roles[i % roles.length],
    verified: i % 3 === 0,
  }));

  // Double for seamless infinite scroll
  const allTiles = [...tiles, ...tiles];

  return (
    <div
      className={
        "absolute inset-0 overflow-hidden pointer-events-none " + (className ?? "")
      }
      aria-hidden="true"
    >
      {/* Fade mask so cards never dominate hero content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-foreground/20 to-foreground/60 z-10" />

      <div className="absolute -inset-16 [mask-image:radial-gradient(ellipse_at_center,black_25%,transparent_65%)] z-0">
        {/* Animated infinite scroll wrapper */}
        <motion.div
          className="flex flex-col gap-3"
          animate={{ y: [0, -20, 0] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {/* Row 1 - scrolls left */}
          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 60,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allTiles.slice(0, 16).map((tile, i) => (
              <ProfileCard key={`row1-${i}`} tile={tile} index={i} />
            ))}
          </motion.div>

          {/* Row 2 - scrolls right (reversed) */}
          <motion.div
            className="flex gap-3"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 70,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allTiles.slice(16, 32).map((tile, i) => (
              <ProfileCard key={`row2-${i}`} tile={tile} index={i + 16} />
            ))}
          </motion.div>

          {/* Row 3 - scrolls left (slower) */}
          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 80,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allTiles.slice(32, 48).map((tile, i) => (
              <ProfileCard key={`row3-${i}`} tile={tile} index={i + 32} />
            ))}
          </motion.div>

          {/* Row 4 - scrolls right */}
          <motion.div
            className="flex gap-3"
            animate={{ x: ["-50%", "0%"] }}
            transition={{
              duration: 65,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allTiles.slice(48, 64).map((tile, i) => (
              <ProfileCard key={`row4-${i}`} tile={tile} index={i + 48} />
            ))}
          </motion.div>

          {/* Row 5 - scrolls left */}
          <motion.div
            className="flex gap-3"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              duration: 75,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {allTiles.slice(64, 80).map((tile, i) => (
              <ProfileCard key={`row5-${i}`} tile={tile} index={i + 64} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

interface ProfileCardProps {
  tile: {
    image: string;
    name: string;
    role: string;
    verified: boolean;
  };
  index: number;
}

const ProfileCard = ({ tile, index }: ProfileCardProps) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{
      duration: 1.2,
      delay: 0.02 * (index % 16),
      ease: [0.22, 0.03, 0.26, 1],
    }}
    className="relative w-24 sm:w-28 lg:w-32 aspect-[3/4] rounded-xl overflow-hidden bg-muted/20 border border-border/20 flex-shrink-0"
  >
    {/* Photo – greyscale + faded */}
    <img
      src={tile.image}
      alt=""
      loading="lazy"
      className="absolute inset-0 w-full h-full object-cover object-top filter grayscale opacity-50"
    />

    {/* Bottom gradient overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

    {/* Mini info overlay */}
    <div className="absolute bottom-0 inset-x-0 p-1.5 sm:p-2">
      <div className="flex items-center gap-1">
        <span className="text-[8px] sm:text-[9px] font-semibold text-background truncate">
          {tile.name}
        </span>
        {tile.verified && (
          <span className="w-2 h-2 rounded-full bg-sage/50 flex-shrink-0" />
        )}
      </div>
      <span className="text-[6px] sm:text-[7px] text-background/50 truncate block">
        {tile.role}
      </span>
    </div>
  </motion.div>
);

export default HeroProfileGridBackdrop;
