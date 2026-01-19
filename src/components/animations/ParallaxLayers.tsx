import { ReactNode } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";

interface ParallaxLayerProps {
  children: ReactNode;
  /** pixels of movement across a full viewport scroll */
  intensity?: number;
  className?: string;
}

// Global-scroll parallax (stable, avoids per-element re-measuring jitter)
export const ParallaxLayer = ({
  children,
  intensity = 0,
  className = "",
}: ParallaxLayerProps) => {
  const { scrollY } = useScroll();

  const yRaw = useTransform(scrollY, (v) => -(v * intensity) / 1000);
  const y = useSpring(yRaw, { stiffness: 120, damping: 40, restDelta: 0.001 });

  return (
    <motion.div className={className} style={{ y }}>
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
