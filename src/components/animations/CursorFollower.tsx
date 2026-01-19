import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";

const CursorFollower = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverText, setHoverText] = useState("");
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 400 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
    setIsVisible(true);
  }, [cursorX, cursorY]);

  const handleMouseLeave = useCallback(() => {
    setIsVisible(false);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    document.body.addEventListener("mouseleave", handleMouseLeave);

    // Track interactive elements
    const handleElementHover = () => {
      const interactiveElements = document.querySelectorAll(
        'a, button, [data-cursor="hover"], .cursor-hover'
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", () => {
          setIsHovering(true);
          const text = el.getAttribute("data-cursor-text") || "";
          setHoverText(text);
        });
        el.addEventListener("mouseleave", () => {
          setIsHovering(false);
          setHoverText("");
        });
      });
    };

    // Run after a short delay to ensure DOM is ready
    const timer = setTimeout(handleElementHover, 500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      clearTimeout(timer);
    };
  }, [handleMouseMove, handleMouseLeave]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovering ? 2.5 : 1, 
                opacity: 1 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative flex items-center justify-center"
              style={{ transform: "translate(-50%, -50%)" }}
            >
              {/* Cursor dot */}
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{
                  scale: isHovering ? 0.5 : 1,
                }}
                transition={{ duration: 0.2 }}
              />
              
              {/* Hover text */}
              <AnimatePresence>
                {hoverText && (
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute whitespace-nowrap text-xs font-medium text-white"
                  >
                    {hoverText}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Cursor ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        <AnimatePresence>
          {isVisible && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: isHovering ? 1.5 : 1, 
                opacity: isHovering ? 0.5 : 0.3 
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-10 h-10 border border-sage rounded-full"
              style={{ transform: "translate(-50%, -50%)" }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default CursorFollower;
