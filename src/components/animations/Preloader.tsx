import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface PreloaderProps {
  onComplete?: () => void;
}

// Particle that assembles into the logo
const AssemblyParticle = ({ 
  index, 
  total, 
  progress 
}: { 
  index: number; 
  total: number; 
  progress: number;
}) => {
  const angle = (index / total) * Math.PI * 2;
  const radius = 300 + Math.random() * 200;
  
  const startX = Math.cos(angle) * radius;
  const startY = Math.sin(angle) * radius;
  
  // Target position forms a grid pattern
  const gridCols = 12;
  const targetX = ((index % gridCols) - gridCols / 2) * 20;
  const targetY = (Math.floor(index / gridCols) - 3) * 20;

  const currentX = startX + (targetX - startX) * Math.min(progress / 80, 1);
  const currentY = startY + (targetY - startY) * Math.min(progress / 80, 1);
  const opacity = progress > 70 ? 0 : Math.min(progress / 30, 1);

  return (
    <motion.div
      className="absolute w-1 h-1 rounded-full bg-sage"
      style={{
        left: `calc(50% + ${currentX}px)`,
        top: `calc(50% + ${currentY}px)`,
        opacity,
      }}
    />
  );
};

// Scan line effect
const ScanLine = ({ delay }: { delay: number }) => (
  <motion.div
    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-sage/50 to-transparent"
    initial={{ top: "-2px", opacity: 0 }}
    animate={{ 
      top: ["0%", "100%"],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 2.5,
      delay,
      repeat: Infinity,
      repeatDelay: 1,
      ease: "linear",
    }}
  />
);

// Data stream column
const DataStream = ({ index }: { index: number }) => {
  const chars = useMemo(() => 
    [...Array(20)].map(() => 
      String.fromCharCode(33 + Math.floor(Math.random() * 94))
    ), []
  );
  
  return (
    <motion.div
      className="absolute text-[10px] font-mono text-sage/30 leading-tight"
      style={{ left: `${5 + index * 8}%` }}
      initial={{ y: "-100%", opacity: 0 }}
      animate={{ 
        y: ["100%", "-100%"],
        opacity: [0, 0.3, 0.3, 0],
      }}
      transition={{
        duration: 4,
        delay: index * 0.3,
        repeat: Infinity,
        ease: "linear",
      }}
    >
      {chars.map((char, i) => (
        <div key={i}>{char}</div>
      ))}
    </motion.div>
  );
};

// Glitch text effect
const GlitchText = ({ text, isComplete }: { text: string; isComplete: boolean }) => {
  const [glitchText, setGlitchText] = useState(text);
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  useEffect(() => {
    if (isComplete) {
      setGlitchText(text);
      return;
    }

    const interval = setInterval(() => {
      setGlitchText(prev => 
        text.split("").map((char, i) => {
          if (char === " ") return " ";
          if (Math.random() > 0.7) {
            return chars[Math.floor(Math.random() * chars.length)];
          }
          return prev[i] || char;
        }).join("")
      );
    }, 50);

    return () => clearInterval(interval);
  }, [text, isComplete]);

  return (
    <span className="relative">
      <span className="relative z-10">{isComplete ? text : glitchText}</span>
      {!isComplete && (
        <>
          <motion.span
            className="absolute inset-0 text-rose/50"
            animate={{ x: [-2, 2, -2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {glitchText}
          </motion.span>
          <motion.span
            className="absolute inset-0 text-sage/50"
            animate={{ x: [2, -2, 2] }}
            transition={{ duration: 0.1, repeat: Infinity }}
          >
            {glitchText}
          </motion.span>
        </>
      )}
    </span>
  );
};

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"particles" | "reveal" | "complete">("particles");

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setPhase("complete");
          // Longer delay before exit for smoother transition
          setTimeout(() => {
            setIsLoading(false);
            onComplete?.();
          }, 1200);
          return 100;
        }
        // Slower progression near the end for smoother finish
        const remaining = 100 - prev;
        const increment = remaining > 20 
          ? Math.random() * 12 
          : Math.random() * 3 + 1;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress > 70) setPhase("reveal");
  }, [progress]);

  const particles = useMemo(() => [...Array(60)], []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            transition: { 
              duration: 1.2, 
              ease: [0.22, 1, 0.36, 1],
            }
          }}
          className="fixed inset-0 z-[10000] bg-foreground flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Matrix-style data streams */}
          <div className="absolute inset-0 overflow-hidden opacity-40">
            {[...Array(12)].map((_, i) => (
              <DataStream key={i} index={i} />
            ))}
          </div>

          {/* Scan lines */}
          <ScanLine delay={0} />
          <ScanLine delay={1.2} />

          {/* Grid overlay */}
          <div 
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `
                linear-gradient(hsl(var(--sage) / 0.1) 1px, transparent 1px),
                linear-gradient(90deg, hsl(var(--sage) / 0.1) 1px, transparent 1px)
              `,
              backgroundSize: "50px 50px",
            }}
          />

          {/* Assembly particles */}
          {phase === "particles" && (
            <div className="absolute inset-0">
              {particles.map((_, i) => (
                <AssemblyParticle key={i} index={i} total={60} progress={progress} />
              ))}
            </div>
          )}

          {/* Brand Logo with reveal */}
          <motion.div 
            className="relative z-10"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: phase !== "particles" ? 1 : progress > 30 ? 0.3 : 0,
            }}
            transition={{ duration: 0.6 }}
          >
            {/* Glowing backdrop */}
            <motion.div
              className="absolute inset-0 blur-3xl"
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{
                background: "radial-gradient(circle, hsl(var(--sage) / 0.4) 0%, transparent 70%)",
              }}
            />

            <h1 className="text-[15vw] md:text-[10vw] font-heading font-bold text-background leading-none tracking-tighter">
              <GlitchText text="Referd" isComplete={phase === "complete"} />
              <motion.span 
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5, type: "spring" }}
                className="text-sage"
              >
                ®
              </motion.span>
            </h1>
          </motion.div>

          {/* Tech-style progress section */}
          <motion.div
            className="relative z-10 mt-16 flex flex-col items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Progress bar container */}
            <div className="relative w-64 h-[3px] bg-background/10 overflow-hidden">
              {/* Progress fill */}
              <motion.div
                className="absolute inset-y-0 left-0 bg-sage"
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.2 }}
              />
              {/* Scanning overlay */}
              <motion.div
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ left: ["-32px", "256px"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Progress text */}
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-background/50">
              <motion.div
                className="w-2 h-2 rounded-full bg-sage"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              />
              <span className="uppercase tracking-[0.3em]">
                {phase === "complete" ? "Initialized" : "Loading Assets"}
              </span>
              <span className="text-sage font-bold">
                {Math.round(Math.min(progress, 100))}%
              </span>
            </div>

            {/* Tech readout */}
            <motion.div
              className="mt-4 font-mono text-[10px] text-background/30 tracking-wider"
              animate={{ opacity: [0.3, 0.6, 0.3] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              SYS.INIT &gt; CACHE.LOAD &gt; RENDER.PREP
            </motion.div>
          </motion.div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-sage/30" />
          <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-sage/30" />
          <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-sage/30" />
          <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-sage/30" />

          {/* Subtle noise texture */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
