import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

const ScrollRevealSection = ({ children, className = "", delay = 0 }: ScrollRevealSectionProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollRevealSection;
