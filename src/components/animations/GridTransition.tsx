import { motion } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

// Color palette for layered effect
const blockColors = [
  "hsl(var(--foreground))",
  "hsl(var(--sage))",
  "hsl(var(--muted))",
  "hsl(var(--foreground))",
  "hsl(var(--sage))",
];

const getRandomColor = () => blockColors[Math.floor(Math.random() * blockColors.length)];

// Grid overlay for page load - blocks fade out randomly
export const GridOverlay = () => {
  const [gridConfig, setGridConfig] = useState({ columns: 10, rows: 6, blockSize: 100 });
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / 80);
      const blockSize = window.innerWidth / columns;
      const rows = Math.ceil(window.innerHeight / blockSize);
      setGridConfig({ columns, rows, blockSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    
    // Hide after animation completes
    const timer = setTimeout(() => setIsVisible(false), 1200);
    
    return () => {
      window.removeEventListener("resize", calculateGrid);
      clearTimeout(timer);
    };
  }, []);

  const totalBlocks = gridConfig.columns * gridConfig.rows;

  // Generate random delays and colors
  const blockData = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => ({
      delay: Math.random() * 0.6,
      color: getRandomColor(),
    }));
  }, [totalBlocks]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
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
          animate={{ opacity: 0, scale: 0.8 }}
          transition={{
            duration: 0.15,
            delay: 0.1 + blockData[index].delay,
            ease: "easeOut",
          }}
          style={{ backgroundColor: blockData[index].color }}
        />
      ))}
    </motion.div>
  );
};

// Exit transition - blocks fade IN when navigating away
export const GridExitTransition = ({ 
  isActive, 
  onComplete 
}: { 
  isActive: boolean; 
  onComplete?: () => void;
}) => {
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

  const totalBlocks = gridConfig.columns * gridConfig.rows;

  // Generate random delays and colors
  const blockData = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => ({
      delay: Math.random() * 0.5,
      color: getRandomColor(),
    }));
  }, [totalBlocks]);

  // Trigger onComplete after animation
  useEffect(() => {
    if (isActive && onComplete) {
      const timer = setTimeout(onComplete, 700);
      return () => clearTimeout(timer);
    }
  }, [isActive, onComplete]);

  if (!isActive) return null;

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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.08,
            delay: blockData[index].delay,
            ease: "easeIn",
          }}
          style={{ backgroundColor: blockData[index].color }}
        />
      ))}
    </motion.div>
  );
};

export default GridOverlay;
