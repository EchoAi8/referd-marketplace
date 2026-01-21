import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from "framer-motion";
import { X } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import SoundToggle from "@/components/ui/SoundToggle";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Opportunities", href: "/opportunities" },
  { label: "Brands", href: "/brands" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const SiteHeader = () => {
  const { navigateWithTransition } = useGridNavigation();
  const { playClick, playWhoosh, enabled, lastSoundTime } = useSoundEffects();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);
  const [isPulsing, setIsPulsing] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  
  // Swipe gesture for mobile menu
  const swipeX = useMotionValue(0);
  const menuOpacity = useTransform(swipeX, [-200, 0], [0, 1]);
  const touchStartX = useRef(0);
  const isSwipingFromEdge = useRef(false);
  
  // Show swipe hint on mobile after initial load
  useEffect(() => {
    const isMobile = window.innerWidth < 1024;
    const hasSeenHint = sessionStorage.getItem("swipe-hint-seen");
    
    if (isMobile && !hasSeenHint) {
      const timer = setTimeout(() => {
        setShowSwipeHint(true);
        sessionStorage.setItem("swipe-hint-seen", "true");
        // Auto-hide after 3 seconds
        setTimeout(() => setShowSwipeHint(false), 3000);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);

  // Haptic pulse feedback when sounds play
  useEffect(() => {
    if (enabled && lastSoundTime > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [lastSoundTime, enabled]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 100;
      setIsScrolled(scrolled);
      // Auto-expand nav after scrolling past hero
      setIsNavExpanded(scrolled);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
      document.body.dataset.menuOpen = "true";
    } else {
      document.body.style.overflow = "";
      document.body.dataset.menuOpen = "false";
    }
    return () => {
      document.body.style.overflow = "";
      delete document.body.dataset.menuOpen;
    };
  }, [isMobileMenuOpen]);

  // Handle swipe from right edge to open menu
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      const touch = e.touches[0];
      touchStartX.current = touch.clientX;
      // Detect swipe from right edge (within 30px of screen edge)
      const screenWidth = window.innerWidth;
      isSwipingFromEdge.current = touch.clientX > screenWidth - 30;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSwipingFromEdge.current && !isMobileMenuOpen) return;
      
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartX.current;
      
      // Swipe left from right edge to open
      if (isSwipingFromEdge.current && deltaX < -50 && !isMobileMenuOpen) {
        setIsMobileMenuOpen(true);
        playClick();
        isSwipingFromEdge.current = false;
      }
    };

    const handleTouchEnd = () => {
      isSwipingFromEdge.current = false;
    };

    // Only add listeners on mobile/tablet
    if (window.innerWidth < 1024) {
      document.addEventListener("touchstart", handleTouchStart, { passive: true });
      document.addEventListener("touchmove", handleTouchMove, { passive: true });
      document.addEventListener("touchend", handleTouchEnd, { passive: true });
    }

    return () => {
      document.removeEventListener("touchstart", handleTouchStart);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isMobileMenuOpen, playClick]);

  const handleNav = (href: string) => {
    setIsMobileMenuOpen(false);
    playClick();

    const isAbsolute = href.startsWith("/");
    const hasAnchor = href.includes("#");

    if (isAbsolute && hasAnchor) {
      const [route, anchor] = href.split("#");
      const targetRoute = route || "/";
      if (location.pathname === targetRoute) {
        scrollToAnchor(`#${anchor}`);
      } else {
        playWhoosh();
        navigateWithTransition(targetRoute);
         // Match the slower, premium page transition cadence
         setTimeout(() => scrollToAnchor(`#${anchor}`), 1200);
      }
      return;
    }

    if (isAbsolute) {
      if (location.pathname !== href) {
        playWhoosh();
        navigateWithTransition(href);
      }
      return;
    }

    if (hasAnchor) {
      scrollToAnchor(href);
    }
  };

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  const smoothScrollTo = (targetY: number, durationMs = 2000) => {
    if (typeof window === "undefined") return;
    if (prefersReducedMotion) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const startY = window.scrollY;
    const delta = targetY - startY;
    const start = performance.now();

    // Premium ease: smooth acceleration/deceleration
    const easeInOutCubic = (t: number) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const prev = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "auto";

    const tick = (now: number) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / durationMs);
      const eased = easeInOutCubic(t);
      window.scrollTo(0, startY + delta * eased);

      if (t < 1) {
        requestAnimationFrame(tick);
      } else {
        document.documentElement.style.scrollBehavior = prev;
      }
    };

    requestAnimationFrame(tick);
  };

  const scrollToAnchor = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      const headerOffset = 96; // keep section titles clear of the floating header
      const y =
        el.getBoundingClientRect().top + window.scrollY - headerOffset;
      smoothScrollTo(Math.max(0, y), 2200);
    }
  };

  const handleLogoClick = () => {
    playClick();
    if (location.pathname === "/") {
      smoothScrollTo(0, 1800);
    } else {
      playWhoosh();
      navigateWithTransition("/");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 z-50"
      >
        <div className="flex items-center justify-between gap-2">
          {/* Left: Logo Pill with nav that expands on scroll */}
          <motion.div
            layout
            className={`flex items-center rounded-full transition-all duration-500 ease-out ${
              isScrolled
                ? "bg-background/95 backdrop-blur-xl shadow-lg border border-border/50"
                : "bg-foreground/90 backdrop-blur-md border border-background/10"
            }`}
          >
            <div className="flex items-center px-3 py-2 sm:px-4 sm:py-2.5">
              {/* Logo */}
              <MagneticButton
                onClick={handleLogoClick}
                className="text-lg sm:text-xl md:text-2xl font-heading font-bold tracking-tight bg-transparent border-none"
                strength={0.2}
              >
                <span className={`transition-colors duration-300 ${isScrolled ? "text-foreground" : "text-background"}`}>
                  Referd
                </span>
                <span className="text-sage text-xs sm:text-sm align-super">®</span>
              </MagneticButton>

              {/* Desktop Navigation - Always visible on desktop, expands smoothly */}
              <motion.nav 
                initial={false}
              animate={{
                  width: isNavExpanded ? "auto" : 0,
                  opacity: isNavExpanded ? 1 : 0,
                  marginLeft: isNavExpanded ? 12 : 0
                }}
                transition={{ duration: 1.2, ease: [0.22, 0.03, 0.26, 1] }}
                className="hidden lg:flex items-center gap-3 xl:gap-4 overflow-hidden"
              >
                {navLinks.map((link) => (
                  <MagneticButton
                    key={link.label}
                    onClick={() => handleNav(link.href)}
                    className={`relative text-sm font-medium transition-colors duration-200 group bg-transparent border-none whitespace-nowrap ${
                      location.pathname === link.href
                        ? "text-sage"
                        : isScrolled 
                          ? "text-muted-foreground hover:text-foreground"
                          : "text-background/70 hover:text-background"
                    }`}
                    strength={0.4}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-sage transition-all duration-300 ${
                        location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </MagneticButton>
                ))}
                
                {/* Get Started CTA inside nav pill */}
                <MagneticButton
                  onClick={() => handleNav("/opportunities")}
                  className="ml-1 px-3 py-1.5 bg-sage text-foreground rounded-full text-sm font-semibold hover:bg-sage/90 transition-colors"
                  strength={0.3}
                >
                  Get Started
                </MagneticButton>
              </motion.nav>
            </div>
          </motion.div>

          {/* Right: Toggles - Separate pill */}
          <div className="flex items-center gap-1 sm:gap-2">
            <div className={`hidden sm:flex items-center gap-1 rounded-full px-2 py-1.5 ${
              isScrolled 
                ? "bg-background/95 backdrop-blur-xl border border-border/50" 
                : "bg-foreground/90 backdrop-blur-md border border-background/10"
            }`}>
              <SoundToggle />
              <ThemeToggle />
            </div>
            
            {/* R Button - Visible on all screens, opens menu */}
            <motion.button
              onClick={() => {
                playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-300 flex items-center justify-center bg-sage border-2 border-sage shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Toggle menu"
            >
              {/* Pulsing glow effect */}
              <motion.div
                className="absolute inset-0 rounded-full bg-sage/50"
                animate={{ 
                  scale: [1, 1.4, 1],
                  opacity: [0.6, 0, 0.6]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full bg-sage/30"
                animate={{ 
                  scale: [1, 1.6, 1],
                  opacity: [0.4, 0, 0.4]
                }}
                transition={{ 
                  duration: 2.5, 
                  repeat: Infinity, 
                  ease: "easeInOut",
                  delay: 0.3
                }}
              />
              
              {/* Haptic pulse ring */}
              {isPulsing && enabled && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-sage"
                  initial={{ scale: 1, opacity: 0.8 }}
                  animate={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              )}
              
              {/* R Logo / X toggle */}
              <AnimatePresence mode="wait">
                {isMobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-5 h-5 text-foreground" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="logo"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="font-heading font-bold text-lg text-foreground relative z-10"
                  >
                    R
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Swipe Hint Indicator - Mobile only with ripple effect */}
      <AnimatePresence>
        {showSwipeHint && !isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed right-0 top-1/2 -translate-y-1/2 z-40 lg:hidden pointer-events-none"
          >
            {/* Ripple effects radiating from hint */}
            <motion.div
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-sage/40"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 2, 2.5], opacity: [0, 0.6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            />
            <motion.div
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-sage/30"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 2, 2.5], opacity: [0, 0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.5 }}
            />
            <motion.div
              className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full border border-sage/20"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: [0.5, 2, 2.5], opacity: [0, 0.3, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 1 }}
            />
            
            <div className="relative flex items-center gap-2 bg-sage/90 backdrop-blur-sm rounded-l-full pl-3 pr-1 py-2 shadow-lg">
              <span className="text-foreground text-xs font-medium whitespace-nowrap">
                Swipe to open menu
              </span>
              <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: [0.25, 0.1, 0.25, 1] }}
                className="w-6 h-6 rounded-full bg-foreground/20 flex items-center justify-center"
              >
                <span className="text-foreground text-sm">←</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Immersive Full-Screen Mobile Menu with swipe-to-close */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            // iOS-style spring physics for native feel
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
              mass: 0.8,
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            // Rubber-banding: resist left swipe, allow right swipe with bounce
            dragElastic={{ left: 0.05, right: 0.4 }}
            dragTransition={{
              // Momentum + spring snap-back
              bounceStiffness: 400,
              bounceDamping: 25,
              power: 0.3,
              timeConstant: 200,
            }}
            onDragEnd={(_, info: PanInfo) => {
              // Velocity-sensitive close threshold (feels more native)
              const shouldClose = info.velocity.x > 200 || info.offset.x > 80;
              if (shouldClose) {
                playClick();
                setIsMobileMenuOpen(false);
              }
            }}
            className="fixed inset-0 z-40 overflow-hidden touch-pan-y"
          >
            {/* Animated background */}
            <div className="absolute inset-0 bg-foreground">
              {/* Floating orbs */}
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full bg-sage/10"
                  style={{
                    width: Math.random() * 300 + 100,
                    height: Math.random() * 300 + 100,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ 
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                    x: [0, Math.random() * 50 - 25, 0],
                    y: [0, Math.random() * 50 - 25, 0],
                  }}
                  transition={{
                    duration: 8 + Math.random() * 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 0.2,
                  }}
                />
              ))}
              
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-foreground via-foreground/95 to-foreground" />
            </div>

            {/* Content */}
            <div className="relative z-10 h-full flex flex-col">
              {/* Header with close and toggles */}
              <div className="flex items-center justify-between p-4 sm:p-6">
                {/* Logo */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-2xl font-heading font-bold text-background"
                >
                  Referd<span className="text-sage text-sm align-super">®</span>
                </motion.div>
                
                <div className="flex items-center gap-2">
                  {/* Mobile toggles */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="flex items-center gap-1 bg-background/10 rounded-full px-2 py-1"
                  >
                    <SoundToggle />
                    <ThemeToggle />
                  </motion.div>
                  
                  {/* Close button */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    onClick={() => {
                      playClick();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-10 h-10 rounded-full bg-background/10 flex items-center justify-center text-background"
                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.2)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X className="w-5 h-5" />
                  </motion.button>
                </div>
              </div>

              {/* Nav Links - Staggered animation */}
              <nav className="flex-1 flex flex-col justify-center px-8 sm:px-12 gap-2">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 50 }}
                    transition={{
                      delay: 0.2 + index * 0.09,
                      duration: 0.65,
                      ease: [0.22, 0.03, 0.26, 1],
                    }}
                    onClick={() => handleNav(link.href)}
                    className={`group text-left py-3 sm:py-4 relative overflow-hidden ${
                      location.pathname === link.href
                        ? "text-sage"
                        : "text-background/80 hover:text-background"
                    }`}
                  >
                    {/* Link text with hover effect */}
                    <span className="relative z-10 text-3xl sm:text-4xl md:text-5xl font-heading font-bold tracking-tight transition-transform duration-300 group-hover:translate-x-4 inline-block">
                      {link.label}
                    </span>
                    
                    {/* Hover highlight bar */}
                    <motion.div
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-sage rounded-full"
                      whileHover={{ height: "60%" }}
                      transition={{ duration: 0.35, ease: [0.22, 0.03, 0.26, 1] }}
                    />
                    
                    {/* Haptic pulse on active */}
                    {location.pathname === link.href && (
                      <motion.div
                        className="absolute -left-2 top-1/2 -translate-y-1/2 w-2 h-2 bg-sage rounded-full"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    )}
                  </motion.button>
                ))}
              </nav>

              {/* Bottom CTA */}
              <motion.div 
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="p-8 sm:p-12"
              >
                <motion.button 
                  onClick={() => handleNav("/opportunities")}
                  className="w-full py-4 sm:py-5 bg-sage text-foreground rounded-full text-lg sm:text-xl font-heading font-bold relative overflow-hidden group"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10">Get Started</span>
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full"
                    animate={{ translateX: ["100%", "-100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
