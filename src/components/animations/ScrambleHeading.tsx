import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState, ElementType } from "react";
import { cn } from "@/lib/utils";

interface ScrambleHeadingProps {
  children: string;
  as?: ElementType;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const ScrambleHeading = ({ 
  children,
  as: Component = "h2",
  className, 
  delay = 0,
  duration = 0.8
}: ScrambleHeadingProps) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState(children);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    let iteration = 0;
    const totalIterations = children.length * 2;
    
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          children
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              
              // Characters that have been revealed
              if (index < iteration / 2) {
                return children[index];
              }
              
              // Scramble remaining characters
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        iteration += 1;
        
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(children);
        }
      }, (duration * 1000) / totalIterations);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(delayTimeout);
  }, [isInView, children, delay, duration, hasAnimated]);

  return (
    <motion.div
      ref={ref as React.RefObject<HTMLDivElement>}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Component className={cn(className)}>
        {displayText}
      </Component>
    </motion.div>
  );
};

export default ScrambleHeading;
