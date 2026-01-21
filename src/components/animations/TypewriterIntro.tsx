import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundEffects } from "@/hooks/use-sound-effects";
import { getActiveSequence, type WordConfig, type SequenceConfig } from "@/config/intro-sequences";

interface TypewriterIntroProps {
  onComplete: () => void;
}

// Typewriter letter-by-letter animation with cursor
const TypewriterText = ({ 
  text, 
  className, 
  onComplete,
  playClick 
}: { 
  text: string; 
  className?: string; 
  onComplete?: () => void;
  playClick: () => void;
}) => {
  const [displayedLetters, setDisplayedLetters] = useState(0);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (displayedLetters < text.length) {
      const timer = setTimeout(() => {
        setDisplayedLetters((prev) => prev + 1);
        playClick();
      }, 80 + Math.random() * 40); // Variable typing speed for realism
      return () => clearTimeout(timer);
    } else {
      // Hide cursor after typing complete
      const cursorTimer = setTimeout(() => {
        setShowCursor(false);
        onComplete?.();
      }, 500);
      return () => clearTimeout(cursorTimer);
    }
  }, [displayedLetters, text.length, onComplete, playClick]);

  // Cursor blink effect
  useEffect(() => {
    if (displayedLetters >= text.length) return;
    const blinkInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 530);
    return () => clearInterval(blinkInterval);
  }, [displayedLetters, text.length]);

  return (
    <motion.span
      className={`inline-block ${className || ""}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      {text.slice(0, displayedLetters)}
      <motion.span
        className="inline-block w-[3px] h-[1em] bg-foreground ml-1 align-middle"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
        style={{ verticalAlign: "text-bottom" }}
      />
    </motion.span>
  );
};

// Standard word animations
const WordAnimation = ({ 
  word, 
  index,
  playSound
}: { 
  word: WordConfig; 
  index: number;
  playSound: () => void;
}) => {
  const baseDelay = word.delay || index * 0.12;

  useEffect(() => {
    const timer = setTimeout(playSound, baseDelay * 1000);
    return () => clearTimeout(timer);
  }, [baseDelay, playSound]);

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
          initial: { opacity: 0, rotate: -15, scale: 0.8 },
          animate: { opacity: 1, rotate: 3, scale: 1 },
          exit: { opacity: 0, rotate: 15, scale: 0.8 },
        };
      case "slide":
        return {
          initial: { opacity: 0, x: -80 },
          animate: { opacity: 1, x: 0 },
          exit: { opacity: 0, x: 80 },
        };
      case "scale":
        return {
          initial: { opacity: 0, scale: 0.3 },
          animate: { opacity: 1, scale: 1 },
          exit: { opacity: 0, scale: 1.5 },
        };
      case "shake":
        return {
          initial: { opacity: 0, x: -20 },
          animate: { 
            opacity: 1, 
            x: [0, -8, 8, -6, 6, -3, 3, 0],
          },
          exit: { opacity: 0, scale: 0.9 },
        };
      case "bounce":
        return {
          initial: { opacity: 0, y: -100, scale: 0.5 },
          animate: { 
            opacity: 1, 
            y: [0, -30, 0, -15, 0, -5, 0],
            scale: 1,
          },
          exit: { opacity: 0, y: 50 },
        };
      case "glitch":
        return {
          initial: { opacity: 0, skewX: 20 },
          animate: { 
            opacity: 1,
            skewX: [20, -5, 3, 0],
            x: [10, -5, 3, 0],
          },
          exit: { opacity: 0, skewX: -20 },
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
  const config = useMemo(() => getActiveSequence(), []);
  const sequences = config.sequences;
  
  const [currentSequence, setCurrentSequence] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [typewriterComplete, setTypewriterComplete] = useState(false);

  const { playClick, playHover, playWhoosh, playSuccess, playToggle, enabled: soundEnabled, setEnabled } = useSoundEffects();

  // Enable sound for intro experience (Apple keynote style)
  useEffect(() => {
    // Auto-enable sound for the intro if not explicitly disabled
    const stored = localStorage.getItem("sound-effects");
    if (stored === null) {
      setEnabled(true);
    }
  }, [setEnabled]);

  // Sound effect mapper - always play during intro for impact
  const playSequenceSound = useCallback((sound: SequenceConfig["sound"]) => {
    switch (sound) {
      case "whoosh":
        playWhoosh();
        break;
      case "pop":
        playToggle();
        break;
      case "click":
        playClick();
        break;
      case "success":
        playSuccess();
        break;
    }
  }, [playWhoosh, playToggle, playClick, playSuccess]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Play sound when sequence changes
  useEffect(() => {
    if (currentSequence < sequences.length) {
      playSequenceSound(sequences[currentSequence].sound);
    }
  }, [currentSequence, sequences, playSequenceSound]);

  // Auto-advance sequences
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
    if (currentSequence >= sequences.length) return;

    const currentSeq = sequences[currentSequence];
    const isTypewriter = currentSeq.words.some((w) => w.animation === "typewriter");

    // For typewriter, wait for completion callback
    if (isTypewriter && !typewriterComplete) return;

    const timer = setTimeout(() => {
      if (currentSequence < sequences.length - 1) {
        setCurrentSequence((prev) => prev + 1);
        setTypewriterComplete(false);
      } else {
        handleComplete();
      }
    }, isTypewriter ? 800 : currentSeq.duration);

    return () => clearTimeout(timer);
  }, [currentSequence, isVisible, prefersReducedMotion, sequences, typewriterComplete]);

  const handleComplete = useCallback(() => {
    playSuccess();
    setIsVisible(false);
    setTimeout(onComplete, 600);
  }, [onComplete, playSuccess]);

  const handleSkip = useCallback(() => {
    playClick();
    handleComplete();
  }, [handleComplete, playClick]);

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
  const hasTypewriter = currentSeq?.words.some((w) => w.animation === "typewriter");

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
            onMouseEnter={playHover}
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
                  {currentSeq?.words.map((word, idx) =>
                    word.animation === "typewriter" ? (
                      <TypewriterText
                        key={`${currentSequence}-${idx}`}
                        text={word.text}
                        className={word.className}
                        onComplete={() => setTypewriterComplete(true)}
                        playClick={playClick}
                      />
                    ) : (
                      <WordAnimation
                        key={`${currentSequence}-${idx}`}
                        word={word}
                        index={idx}
                        playSound={() => {}}
                      />
                    )
                  )}
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
                  idx === currentSequence
                    ? "bg-foreground"
                    : idx < currentSequence
                    ? "bg-foreground/40"
                    : "bg-foreground/10"
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
