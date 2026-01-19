import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const WordReveal = ({ text, className = "", delay = 0 }: WordRevealProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "start 0.4"]
  });

  const words = text.split(" ");

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = start + (1 / words.length);
        
        return (
          <Word 
            key={index} 
            word={word} 
            range={[start, end]} 
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
  const opacity = useTransform(progress, range, [0.15, 1]);
  const y = useTransform(progress, range, [20, 0]);
  
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-transform"
    >
      {word}
    </motion.span>
  );
};

export default WordReveal;
