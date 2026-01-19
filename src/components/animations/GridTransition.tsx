import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Color palette for layered effect (design-system tokens)
const blockColors = [
  "hsl(var(--foreground))",
  "hsl(var(--muted))",
  "hsl(var(--color-sage))",
  "hsl(var(--color-mustard))",
  "hsl(var(--color-rose))",
];

const getRandomColor = () => blockColors[Math.floor(Math.random() * blockColors.length)];

// Hook to calculate grid dimensions
const useGridConfig = () => {
  const [gridConfig, setGridConfig] = useState({ columns: 10, rows: 6, blockSize: 100 });

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / 80);
      const blockSize = window.innerWidth / columns;
      const rows = Math.ceil(window.innerHeight / blockSize);
      setGridConfig({ columns, rows, blockSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  return gridConfig;
};

// Grid overlay for page load - blocks fade out randomly
export const GridOverlay = () => {
  const gridConfig = useGridConfig();
  const [isVisible, setIsVisible] = useState(true);
  const totalBlocks = gridConfig.columns * gridConfig.rows;

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 1400);
    return () => clearTimeout(timer);
  }, []);

  // Generate random delays and colors
  const blockData = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => ({
      delay: Math.random() * 0.7,
      color: getRandomColor(),
    }));
  }, [totalBlocks]);

  if (!isVisible) return null;

  return (
    <motion.div
      className="fixed inset-0 z-[300] pointer-events-none"
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${gridConfig.columns}, ${gridConfig.blockSize}px)`,
        gridTemplateRows: `repeat(${gridConfig.rows}, ${gridConfig.blockSize}px)`,
      }}
    >
      {Array.from({ length: totalBlocks }).map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 0.85 }}
          transition={{
            duration: 0.2,
            delay: 0.15 + blockData[index].delay,
            ease: [0.4, 0, 0.2, 1],
          }}
          style={{ backgroundColor: blockData[index].color }}
        />
      ))}
    </motion.div>
  );
};

// Exit transition - blocks fade IN when navigating away (smoother)
export const GridExitTransition = ({
  isActive,
  onComplete,
}: {
  isActive: boolean;
  onComplete?: () => void;
}) => {
  const gridConfig = useGridConfig();
  const totalBlocks = gridConfig.columns * gridConfig.rows;

  // Generate random delays and colors - regenerate when activated
  const blockData = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => ({
      delay: Math.random() * 0.55,
      color: getRandomColor(),
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalBlocks, isActive]);

  // Track animation completion and trigger route change
  useEffect(() => {
    if (isActive && onComplete) {
      // Wait for all blocks to animate in before navigating
      const maxDelay = Math.max(...blockData.map((b) => b.delay));
      const animationDuration = 0.12; // matches transition duration
      const totalTime = (maxDelay + animationDuration) * 1000 + 100; // + buffer

      const timer = setTimeout(onComplete, Math.min(totalTime, 800));
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete, blockData]);

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
          className="fixed inset-0 z-[300] pointer-events-none"
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${gridConfig.columns}, ${gridConfig.blockSize}px)`,
            gridTemplateRows: `repeat(${gridConfig.rows}, ${gridConfig.blockSize}px)`,
          }}
        >
          {Array.from({ length: totalBlocks }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.12,
                delay: blockData[index].delay,
                ease: [0.4, 0, 0.2, 1],
              }}
              style={{ backgroundColor: blockData[index].color }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GridOverlay;
