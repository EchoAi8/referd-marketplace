import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo } from "react";

interface GridTransitionProps {
  isVisible: boolean;
  onComplete?: () => void;
}

const GridTransition = ({ isVisible, onComplete }: GridTransitionProps) => {
  const [gridConfig, setGridConfig] = useState({ columns: 10, rows: 6, blockSize: 100 });

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / 100);
      const blockSize = window.innerWidth / columns;
      const rows = Math.ceil(window.innerHeight / blockSize);
      setGridConfig({ columns, rows, blockSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const totalBlocks = gridConfig.columns * gridConfig.rows;

  // Generate random delays for staggered effect
  const randomDelays = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => Math.random() * 0.5);
  }, [totalBlocks]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1, delay: 0.8 }}
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
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              transition={{
                duration: 0.1,
                delay: 0.3 + randomDelays[index],
                ease: "linear",
              }}
              className="bg-foreground"
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Overlay version for route transitions
export const GridOverlay = () => {
  const [gridConfig, setGridConfig] = useState({ columns: 10, rows: 6, blockSize: 100 });

  useEffect(() => {
    const calculateGrid = () => {
      const columns = Math.ceil(window.innerWidth / 100);
      const blockSize = window.innerWidth / columns;
      const rows = Math.ceil(window.innerHeight / blockSize);
      setGridConfig({ columns, rows, blockSize });
    };

    calculateGrid();
    window.addEventListener("resize", calculateGrid);
    return () => window.removeEventListener("resize", calculateGrid);
  }, []);

  const totalBlocks = gridConfig.columns * gridConfig.rows;

  // Generate random delays
  const randomDelays = useMemo(() => {
    return Array.from({ length: totalBlocks }, () => Math.random() * 0.5);
  }, [totalBlocks]);

  return (
    <>
      {/* Entry animation - blocks fade out randomly */}
      <motion.div
        initial={{ display: "grid" }}
        animate={{ display: "none" }}
        transition={{ delay: 1 }}
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
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{
              duration: 0.08,
              delay: 0.2 + randomDelays[index],
              ease: "linear",
            }}
            className="bg-foreground"
          />
        ))}
      </motion.div>
    </>
  );
};

export default GridTransition;
