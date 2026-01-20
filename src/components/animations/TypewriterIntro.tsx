import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TypewriterIntroProps {
  onComplete: () => void;
}

// Word animation configurations
interface WordConfig {
  text: string;
  className?: string;
  animation?: "drop" | "pop" | "rotate" | "fade" | "slide" | "scale";
  delay?: number;
}

interface SequenceConfig {
  words: WordConfig[];
  duration: number;
  layout?: "center" | "stacked" | "scattered";
}

const sequences: SequenceConfig[] = [
  {
    words: [{ text: "You know", animation: "fade" }, { text: "great people.", animation: "pop", className: "text-sage" }],
    duration: 1800,
    layout: "center",
  },
  {
    words: [{ text: "They know", animation: "slide" }, { text: "you.", animation: "scale", className: "font-bold" }],
    duration: 1600,
    layout: "center",
  },
  {
    words: [{ text: "That's", animation: "fade" }, { text: "valuable.", animation: "rotate", className: "text-mustard" }],
    duration: 1800,
    layout: "center",
  },
  {
    words: [{ text: "Agencies charge", animation: "drop", className: "text-muted-foreground" }],
    duration: 1200,
    layout: "center",
  },
  {
    words: [{ text: "20-25%", animation: "pop", className: "text-rose text-6xl md:text-8xl font-bold" }],
    duration: 1600,
    layout: "center",
  },
  {
    words: [{ text: "You get", animation: "fade" }, { text: "nothing.", animation: "drop", className: "text-muted-foreground line-through" }],
    duration: 1400,
    layout: "center",
  },
  {
    words: [{ text: "Until now.", animation: "scale", className: "text-foreground font-bold text-5xl md:text-7xl" }],
    duration: 1800,
    layout: "center",
  },
  {
    words: [
      { text: "Refer.", animation: "pop", className: "text-sage" },
      { text: "Earn.", animation: "pop", className: "text-mustard", delay: 0.15 },
      { text: "Repeat.", animation: "pop", className: "text-rose", delay: 0.3 },
    ],
    duration: 2200,
    layout: "center",
  },
  {
    words: [{ text: "Referd", animation: "scale", className: "text-7xl md:text-9xl font-bold tracking-tight" }],
    duration: 2000,
    layout: "center",
  },
];

const WordAnimation = ({ word, index }: { word: WordConfig; index: number }) => {
  const baseDelay = word.delay || index * 0.12;
  
  const getAnimation = () => {
    switch (word.animation) {
      case "drop":
        return {
          initial: { opacity: 0, y: -60, rotateX: -90 },
          animate: { opacity: 1, y: 0, rotateX: 0 },
          exit: { opacity: 0, y: 60, rotateX: 90 },
        };
      case "pop":
        return {
          initial: { opacity: 0, scale: 0, rotate: -10 },
          animate: { opacity: 1, scale: 1, rotate: 0 },
          exit: { opacity: 0, scale: 0.8, rotate: 10 },
        };
      case "rotate":
        return {
          initial: { opacity: 0, rotate: -180, scale: 0.5 },
          animate: { opacity: 1, rotate: 0, scale: 1 },
          exit: { opacity: 0, rotate: 180, scale: 0.5 },
        };
      case "slide":
        return {
          initial: { opacity: 0, x: -100 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 100 },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.3 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.5 },
        };
      case "fade":
      default:
        return {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
        };
    }
  };

  const animation = getAnimation();

  return (
    <motion.span
      className={`inline-block ${word.className || ""}`}
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={{
        duration: 0.6,
        delay: baseDelay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {word.text}
    </motion.span>
  );
};

const TypewriterIntro = ({ onComplete }: TypewriterIntroProps) => {
  const [currentSequence, setCurrentSequence] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Auto-advance sequences
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
    if (currentSequence >= sequences.length) return;

    const timer = setTimeout(() => {
      if (currentSequence < sequences.length - 1) {
        setCurrentSequence((prev) => prev + 1);
      } else {
        // Final sequence complete
        handleComplete();
      }
    }, sequences[currentSequence].duration);

    return () => clearTimeout(timer);
  }, [currentSequence, isVisible, prefersReducedMotion]);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    setTimeout(onComplete, 600);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  // Reduced motion fallback
  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-background flex flex-col items-center justify-center"
          >
            <h1 className="font-heading font-bold text-6xl text-foreground mb-4">Referd</h1>
            <p className="text-lg text-muted-foreground mb-8">People-powered recruitment</p>
            <button
              onClick={handleComplete}
              className="font-heading font-semibold bg-sage text-foreground px-8 py-4 rounded-full hover:scale-105 transition-transform"
            >
              Enter Site
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  const currentSeq = sequences[currentSequence];

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[10000] bg-background overflow-hidden"
        >
          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            onClick={handleSkip}
            className="fixed top-8 right-8 z-[10001] font-heading text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Skip →
          </motion.button>

          {/* Main Content Area */}
          <div className="w-full h-full flex items-center justify-center px-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSequence}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="font-heading text-3xl md:text-5xl lg:text-6xl text-foreground flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
                  {currentSeq.words.map((word, idx) => (
                    <WordAnimation key={`${currentSequence}-${idx}`} word={word} index={idx} />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Progress Dots */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {sequences.map((_, idx) => (
              <motion.div
                key={idx}
                className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                  idx === currentSequence ? "bg-foreground" : idx < currentSequence ? "bg-foreground/40" : "bg-foreground/10"
                }`}
                animate={idx === currentSequence ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
              />
            ))}
          </div>

          {/* Subtle ambient motion */}
          <motion.div
            className="absolute top-1/4 -left-32 w-64 h-64 rounded-full bg-sage/5 blur-3xl pointer-events-none"
            animate={{
              x: [0, 100, 0],
              y: [0, 50, 0],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-1/4 -right-32 w-64 h-64 rounded-full bg-mustard/5 blur-3xl pointer-events-none"
            animate={{
              x: [0, -100, 0],
              y: [0, -50, 0],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TypewriterIntro;
