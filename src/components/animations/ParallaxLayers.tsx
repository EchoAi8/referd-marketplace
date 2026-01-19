import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -50 to 50, negative = move up on scroll, positive = move down
  className?: string;
}

// Individual layer component with smooth parallax
export const ParallaxLayer = ({ 
  children, 
  speed = 0, 
  className = "" 
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Smooth spring for buttery animation
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const y = useTransform(scrollYProgress, [0, 1], [-speed, speed]);
  const smoothY = useSpring(y, springConfig);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: smoothY }}
    >
      {children}
    </motion.div>
  );
};

interface ParallaxContainerProps {
  children: ReactNode;
  className?: string;
}

// Container that groups layers together
const ParallaxLayers = ({ children, className = "" }: ParallaxContainerProps) => {
  return (
    <div className={`relative ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxLayers;
