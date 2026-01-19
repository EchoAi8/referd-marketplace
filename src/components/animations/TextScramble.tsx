import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TextScrambleProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
}

const chars = "!<>-_\\/[]{}—=+*^?#________";

const TextScramble = ({ 
  text, 
  className, 
  delay = 0,
  duration = 1.5 
}: TextScrambleProps) => {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [displayText, setDisplayText] = useState(text);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (!isInView || hasAnimated) return;
    
    setHasAnimated(true);
    let iteration = 0;
    const totalIterations = text.length * 3;
    
    const delayTimeout = setTimeout(() => {
      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (char === " ") return " ";
              
              // Characters that have been revealed
              if (index < iteration / 3) {
                return text[index];
              }
              
              // Scramble remaining characters
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("")
        );
        
        iteration += 1;
        
        if (iteration >= totalIterations) {
          clearInterval(interval);
          setDisplayText(text);
        }
      }, (duration * 1000) / totalIterations);
      
      return () => clearInterval(interval);
    }, delay * 1000);
    
    return () => clearTimeout(delayTimeout);
  }, [isInView, text, delay, duration, hasAnimated]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0 }}
      animate={isInView ? { opacity: 1 } : {}}
      transition={{ duration: 0.3 }}
      className={cn("inline-block font-mono", className)}
    >
      {displayText}
    </motion.span>
  );
};

export default TextScramble;
