import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const WordReveal = ({ text, className = "", delay = 0 }: WordRevealProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Extended scroll range for slower, more cinematic reveal
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.35"]
  });

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, index) => {
        // Staggered timing with delay support
        const totalWords = words.length;
        const start = (index / totalWords) * 0.6 + delay * 0.08;
        const end = start + (0.6 / totalWords);
        
        return (
          <Word 
            key={index} 
            word={word} 
            range={[Math.min(start, 0.9), Math.min(end, 1)]} 
            progress={scrollYProgress}
          />
        );
      })}
    </span>
  );
};

interface WordProps {
  word: string;
  range: [number, number];
  progress: MotionValue<number>;
}

const Word = ({ word, range, progress }: WordProps) => {
  // Smooth opacity transition from muted grey to solid black
  const opacity = useTransform(progress, range, [0.15, 1]);
  // Subtle vertical movement for depth
  const y = useTransform(progress, range, [8, 0]);
  // Color transition from grey to black
  const color = useTransform(progress, range, ["hsl(0 0% 60%)", "hsl(0 0% 0%)"]);
  
  return (
    <motion.span
      style={{ 
        opacity, 
        y,
        color
      }}
      className="inline-block mr-[0.25em] will-change-transform"
    >
      {word}
    </motion.span>
  );
};

export default WordReveal;
