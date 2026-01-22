import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef, useMemo } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

const WordReveal = ({ text, className = "", delay = 0 }: WordRevealProps) => {
  const containerRef = useRef<HTMLSpanElement>(null);
  
  // Single scroll hook for the entire paragraph - not per word
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "start 0.3"]
  });

  // Smooth the progress with a spring to eliminate jitter
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const words = useMemo(() => text.split(" "), [text]);

  return (
    <span ref={containerRef} className={`inline ${className}`}>
      {words.map((word, index) => {
        const totalWords = words.length;
        // Each word reveals based on its position + the delay prop
        const wordStart = (index / totalWords) * 0.5 + delay * 0.06;
        const wordEnd = wordStart + 0.2;
        
        return (
          <Word 
            key={index} 
            word={word} 
            start={Math.min(wordStart, 0.85)}
            end={Math.min(wordEnd, 1)}
            progress={smoothProgress}
          />
        );
      })}
    </span>
  );
};

interface WordProps {
  word: string;
  start: number;
  end: number;
  progress: ReturnType<typeof useSpring>;
}

const Word = ({ word, start, end, progress }: WordProps) => {
  // Simple opacity and y transform - GPU friendly
  const opacity = useTransform(progress, [start, end], [0.15, 1]);
  const y = useTransform(progress, [start, end], [6, 0]);
  
  return (
    <motion.span
      style={{ opacity, y }}
      className="inline-block mr-[0.25em] will-change-[opacity,transform]"
    >
      {word}
    </motion.span>
  );
};

export default WordReveal;
