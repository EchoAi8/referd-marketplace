import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 500);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[10000] bg-foreground flex flex-col items-center justify-center"
        >
          {/* Brand Logo */}
          <div className="relative mb-12">
            <motion.h1 
              className="text-[12vw] md:text-[8vw] font-heading font-bold text-background leading-none tracking-tight"
            >
              {"Referd".split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 60, rotateX: -90 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ 
                    duration: 0.8, 
                    delay: 0.1 + (i * 0.08), 
                    ease: [0.16, 1, 0.3, 1] 
                  }}
                  className="inline-block"
                  style={{ transformOrigin: "bottom" }}
                >
                  {char}
                </motion.span>
              ))}
              <motion.span 
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="text-sage"
              >
                ®
              </motion.span>
            </motion.h1>
          </div>

          {/* Progress Bar */}
          <motion.div 
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "200px" }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="relative h-[2px] bg-background/20 rounded-full overflow-hidden"
          >
            <motion.div
              className="absolute inset-y-0 left-0 bg-sage"
              initial={{ width: "0%" }}
              animate={{ width: `${Math.min(progress, 100)}%` }}
              transition={{ duration: 0.3 }}
            />
          </motion.div>

          {/* Loading Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mt-6 text-xs uppercase tracking-[0.3em] text-background/50"
          >
            Loading experience
          </motion.p>

          {/* Progress Percentage */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-2 text-sm font-heading font-bold text-background/30"
          >
            {Math.round(Math.min(progress, 100))}%
          </motion.p>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            transition={{ delay: 0.3 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage rounded-full blur-[120px]" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-mustard rounded-full blur-[100px]" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
