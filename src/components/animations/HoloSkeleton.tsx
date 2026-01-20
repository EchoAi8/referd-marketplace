import { motion } from "framer-motion";

interface HoloSkeletonProps {
  className?: string;
  variant?: "card" | "text" | "circle" | "image";
  width?: number | string;
  height?: number | string;
}

const HoloSkeleton = ({ 
  className = "", 
  variant = "card",
  width,
  height,
}: HoloSkeletonProps) => {
  const baseClasses = "relative overflow-hidden bg-muted/30";
  
  const variantClasses = {
    card: "rounded-2xl",
    text: "rounded-md",
    circle: "rounded-full",
    image: "rounded-xl",
  };

  return (
    <div 
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      style={{ width, height }}
    >
      {/* Scan lines */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            hsl(var(--foreground) / 0.03) 2px,
            hsl(var(--foreground) / 0.03) 4px
          )`,
        }}
      />

      {/* Holographic gradient sweep */}
      <motion.div
        className="absolute inset-0"
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ 
          x: ["100%", "-100%"],
          opacity: [0, 0.6, 0.6, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 0.5,
          ease: "easeInOut",
        }}
        style={{
          background: `linear-gradient(
            90deg,
            transparent 0%,
            hsl(var(--sage) / 0.2) 20%,
            hsl(var(--sage) / 0.4) 50%,
            hsl(var(--sage) / 0.2) 80%,
            transparent 100%
          )`,
        }}
      />

      {/* Data stream particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-0.5 bg-gradient-to-b from-transparent via-sage/40 to-transparent"
            style={{
              left: `${10 + i * 12}%`,
              height: "30%",
            }}
            initial={{ y: "-30%", opacity: 0 }}
            animate={{ 
              y: ["130%", "-30%"],
              opacity: [0, 1, 1, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.15,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* Corner brackets - tech aesthetic */}
      <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-sage/30" />
      <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-sage/30" />
      <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-sage/30" />
      <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-sage/30" />

      {/* Center pulse dot */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-sage/50"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Profile card specific skeleton
export const ProfileCardSkeleton = () => {
  return (
    <div className="relative w-[340px] h-[460px] rounded-2xl overflow-hidden bg-background border border-border/50">
      {/* Image area skeleton */}
      <div className="relative h-[60%] overflow-hidden bg-muted/20">
        <HoloSkeleton variant="image" className="w-full h-full rounded-none" />
        
        {/* Rating badge skeleton */}
        <div className="absolute top-4 right-4 w-16 h-7 rounded-full bg-muted/30 backdrop-blur-sm">
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            style={{
              background: "linear-gradient(90deg, transparent, hsl(var(--sage) / 0.2), transparent)",
            }}
          />
        </div>
      </div>

      {/* Content area */}
      <div className="p-6 space-y-4">
        {/* Name skeleton */}
        <HoloSkeleton variant="text" height={28} width="70%" />
        
        {/* Role skeleton */}
        <HoloSkeleton variant="text" height={20} width="50%" />
        
        {/* Location skeleton */}
        <HoloSkeleton variant="text" height={16} width="40%" />

        {/* Stats row */}
        <div className="flex gap-4 pt-2">
          <HoloSkeleton variant="text" height={40} width={80} />
          <HoloSkeleton variant="text" height={40} width={80} />
        </div>
      </div>

      {/* Active indicator line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-1 bg-sage/20"
        animate={{
          scaleX: [0, 1, 0],
          originX: [0, 0.5, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

export default HoloSkeleton;
