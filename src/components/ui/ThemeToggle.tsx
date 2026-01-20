import { motion } from "framer-motion";
import { useTheme } from "@/hooks/use-theme";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();
  const { playToggle } = useSoundEffects();
  const isDark = theme === "dark";

  const handleToggle = () => {
    playToggle();
    toggleTheme();
  };

  // Sun rays animation
  const rayVariants = {
    light: (i: number) => ({
      scale: 1,
      opacity: 1,
      rotate: i * 45,
      transition: { delay: i * 0.02, duration: 0.3 },
    }),
    dark: (i: number) => ({
      scale: 0,
      opacity: 0,
      rotate: i * 45 + 45,
      transition: { delay: i * 0.02, duration: 0.2 },
    }),
  };

  // Moon craters/stars
  const starVariants = {
    light: { scale: 0, opacity: 0 },
    dark: { scale: 1, opacity: 1 },
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors cursor-hover overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
    >
      {/* Background glow */}
      <motion.div
        className="absolute inset-0 rounded-full"
        animate={{
          background: isDark 
            ? "radial-gradient(circle, hsl(var(--sage) / 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, hsl(48 100% 50% / 0.2) 0%, transparent 70%)",
        }}
        transition={{ duration: 0.5 }}
      />

      {/* Morphing celestial body */}
      <motion.div
        className="relative w-5 h-5"
        animate={{
          rotate: isDark ? 0 : 360,
        }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Main circle (sun/moon body) */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            backgroundColor: isDark 
              ? "hsl(var(--foreground))" 
              : "hsl(48 100% 50%)",
            scale: isDark ? 0.85 : 1,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Moon mask/crater (clips into circle for moon shape) */}
        <motion.div
          className="absolute rounded-full bg-muted"
          animate={{
            width: isDark ? "14px" : "0px",
            height: isDark ? "14px" : "0px",
            top: isDark ? "-3px" : "10px",
            right: isDark ? "-5px" : "10px",
            opacity: isDark ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        />

        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute left-1/2 top-1/2 w-0.5 h-2 -ml-[1px] origin-bottom rounded-full"
            style={{
              background: "hsl(48 100% 50%)",
            }}
            custom={i}
            variants={rayVariants}
            animate={isDark ? "dark" : "light"}
            initial={false}
          />
        ))}

        {/* Stars around moon */}
        {[
          { x: -10, y: -8, size: 2, delay: 0 },
          { x: 12, y: -6, size: 1.5, delay: 0.1 },
          { x: -8, y: 10, size: 1.5, delay: 0.15 },
          { x: 10, y: 8, size: 2, delay: 0.05 },
        ].map((star, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-foreground"
            style={{
              width: star.size,
              height: star.size,
              left: `calc(50% + ${star.x}px)`,
              top: `calc(50% + ${star.y}px)`,
            }}
            variants={starVariants}
            animate={isDark ? "dark" : "light"}
            transition={{ delay: star.delay, duration: 0.3 }}
          />
        ))}
      </motion.div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full"
        initial={{ scale: 0, opacity: 0.5 }}
        animate={{ scale: 0, opacity: 0 }}
        whileTap={{ 
          scale: 2, 
          opacity: [0.3, 0],
          transition: { duration: 0.4 }
        }}
        style={{
          backgroundColor: isDark ? "hsl(var(--sage))" : "hsl(48 100% 50%)",
        }}
      />
    </motion.button>
  );
};

export default ThemeToggle;
