import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

interface NavItem {
  label: string;
  href: string;
  icon: string;
}

const navItems: NavItem[] = [
  { label: "Home", href: "/", icon: "🏠" },
  { label: "About", href: "/about", icon: "ℹ️" },
  { label: "Work", href: "/work", icon: "💼" },
  { label: "Contact", href: "/contact", icon: "✉️" },
];

const DockNavigation = () => {
  const { navigateWithTransition } = useGridNavigation();
  const location = useLocation();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const getScale = useCallback((index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.25;
    if (distance === 2) return 1.1;
    return 1;
  }, [hoveredIndex]);

  const handleNav = (href: string) => {
    if (location.pathname !== href) {
      navigateWithTransition(href);
    }
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, delay: 1, ease: [0.16, 1, 0.3, 1] }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex items-end gap-1 px-4 py-3 bg-background/80 backdrop-blur-xl rounded-2xl border border-foreground/10 shadow-2xl">
        {navItems.map((item, index) => (
          <motion.button
            key={item.label}
            onClick={() => handleNav(item.href)}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
            animate={{
              scale: getScale(index),
              y: hoveredIndex === index ? -8 : 0,
            }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 25,
            }}
            className={`relative flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-colors ${
              location.pathname === item.href
                ? "bg-sage/20"
                : "hover:bg-foreground/5"
            }`}
            style={{ transformOrigin: "bottom center" }}
          >
            <span className="text-2xl">{item.icon}</span>
            
            {/* Tooltip */}
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: hoveredIndex === index ? 1 : 0,
                y: hoveredIndex === index ? -8 : 10,
              }}
              transition={{ duration: 0.2 }}
              className="absolute -top-10 px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg whitespace-nowrap pointer-events-none"
            >
              {item.label}
              <span className="absolute left-1/2 -translate-x-1/2 -bottom-1 w-2 h-2 bg-foreground rotate-45" />
            </motion.span>

            {/* Active indicator */}
            {location.pathname === item.href && (
              <motion.span
                layoutId="dock-indicator"
                className="absolute -bottom-1 w-1 h-1 rounded-full bg-sage"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default DockNavigation;
