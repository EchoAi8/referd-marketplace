import { motion } from "framer-motion";
import { useTilt } from "@/hooks/use-tilt";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  glare?: boolean;
}

const TiltCard = ({ children, className, intensity = 12, glare = true }: TiltCardProps) => {
  const { ref, tilt, handleMouseMove, handleMouseLeave } = useTilt(intensity);

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: tilt.rotateX,
        rotateY: tilt.rotateY,
        scale: tilt.scale,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 30 }}
      style={{ transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative", className)}
    >
      {children}
      
      {/* Glare effect */}
      {glare && (
        <motion.div
          className="absolute inset-0 rounded-[inherit] pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${50 + tilt.rotateY * 2}% ${50 - tilt.rotateX * 2}%, rgba(255,255,255,0.15) 0%, transparent 60%)`,
          }}
        />
      )}
    </motion.div>
  );
};

export default TiltCard;
