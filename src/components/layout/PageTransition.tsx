import { motion } from "framer-motion";
import { ReactNode } from "react";

interface PageTransitionProps {
  children: ReactNode;
}

const pageVariants = {
  initial: {
    opacity: 0,
    y: 40,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    scale: 0.98,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

// Overlay that wipes away
const overlayVariants = {
  initial: {
    scaleY: 1,
  },
  animate: {
    scaleY: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
  exit: {
    scaleY: 1,
    transition: {
      duration: 0.5,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
    },
  },
};

const PageTransition = ({ children }: PageTransitionProps) => {
  return (
    <>
      {/* Curtain overlay */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={overlayVariants}
        className="fixed inset-0 z-[200] bg-foreground origin-top pointer-events-none"
      />
      
      {/* Second layer for depth */}
      <motion.div
        initial={{ scaleY: 1 }}
        animate={{ 
          scaleY: 0,
          transition: { 
            duration: 0.8, 
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
            delay: 0.1 
          }
        }}
        exit={{ 
          scaleY: 1,
          transition: { 
            duration: 0.5, 
            ease: [0.76, 0, 0.24, 1] as [number, number, number, number]
          }
        }}
        className="fixed inset-0 z-[199] bg-sage origin-top pointer-events-none"
      />
      
      {/* Page content */}
      <motion.div
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        {children}
      </motion.div>
    </>
  );
};

export default PageTransition;
