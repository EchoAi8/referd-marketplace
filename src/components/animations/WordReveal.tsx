import { motion, useScroll, useTransform } from "framer-motion";
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
    offset: ["start 0.95", "start 0.25"]
  });

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, index) => {
        // Staggered timing with delay support
        const totalWords = words.length;
        const start = (index / totalWords) * 0.7 + delay * 0.1;
        const end = start + (0.7 / totalWords);
        
        return (
          <Word 
            key={index} 
            word={word} 
            range={[Math.min(start, 0.95), Math.min(end, 1)]} 
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
  progress: any;
}

const Word = ({ word, range, progress }: WordProps) => {
  // More dramatic opacity transition - start very dim
  const opacity = useTransform(progress, range, [0.08, 1]);
  // Subtle vertical movement for depth
  const y = useTransform(progress, range, [12, 0]);
  // Slight blur for that cinematic reveal
  const blur = useTransform(progress, range, [2, 0]);
  
  return (
    <motion.span
      style={{ 
        opacity, 
        y,
        filter: blur.get() > 0.5 ? `blur(${blur.get()}px)` : 'none'
      }}
      className="inline-block mr-[0.25em] will-change-transform transition-[filter] duration-100"
    >
      {word}
    </motion.span>
  );
};

export default WordReveal;
