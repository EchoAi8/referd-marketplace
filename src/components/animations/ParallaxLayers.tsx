import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  layer?: 1 | 2 | 3 | 4;
  className?: string;
}

// Individual layer component
export const ParallaxLayer = ({ 
  children, 
  layer = 1, 
  className = "" 
}: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Different speeds for different layers (matching GSAP values)
  const layerSpeeds: Record<number, number> = {
    1: 70,
    2: 55,
    3: 40,
    4: 10,
  };

  const yPercent = useTransform(
    scrollYProgress,
    [0, 1],
    [0, layerSpeeds[layer] || 0]
  );

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ y: useTransform(yPercent, (v) => `${v}%`) }}
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
    <div className={`relative overflow-hidden ${className}`}>
      {children}
    </div>
  );
};

export default ParallaxLayers;
