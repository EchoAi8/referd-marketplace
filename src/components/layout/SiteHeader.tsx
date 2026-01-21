import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
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
  const { playClick, playWhoosh } = useSoundEffects();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isNavExpanded, setIsNavExpanded] = useState(false);

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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

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
        setTimeout(() => scrollToAnchor(`#${anchor}`), 900);
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

  const scrollToAnchor = (anchor: string) => {
    const el = document.querySelector(anchor);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLogoClick = () => {
    playClick();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
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
            
            {/* Mobile/Tablet Menu Toggle - AI-style orb dots */}
            <button
              onClick={() => {
                playClick();
                setIsMobileMenuOpen(!isMobileMenuOpen);
              }}
              className={`lg:hidden p-2.5 sm:p-3 rounded-full transition-all duration-300 ${
                isScrolled 
                  ? "bg-background/95 border border-border/50" 
                  : "bg-foreground/90 border border-background/10"
              }`}
              aria-label="Toggle menu"
            >
              <div className="relative w-5 h-5 flex items-center justify-center">
                {/* AI-style morphing dots */}
                <motion.div
                  animate={isMobileMenuOpen ? { rotate: 45, scale: 1.1 } : { rotate: 0, scale: 1 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <motion.span
                    animate={isMobileMenuOpen ? { x: 0, y: 0 } : { x: -4, y: -4 }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-foreground" : "bg-background"}`}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { x: 0, y: 0 } : { x: 4, y: -4 }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-foreground" : "bg-background"}`}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { x: 0, y: 0 } : { x: -4, y: 4 }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-foreground" : "bg-background"}`}
                  />
                  <motion.span
                    animate={isMobileMenuOpen ? { x: 0, y: 0 } : { x: 4, y: 4 }}
                    className={`absolute w-1.5 h-1.5 rounded-full ${isScrolled ? "bg-foreground" : "bg-background"}`}
                  />
                </motion.div>
                {/* X indicator when open */}
                {isMobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <X className={`w-4 h-4 ${isScrolled ? "text-foreground" : "text-background"}`} />
                  </motion.div>
                )}
              </div>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-foreground/60 backdrop-blur-sm z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="fixed top-0 right-0 bottom-0 w-full max-w-sm bg-background z-50 flex flex-col"
            >
              {/* Close Button */}
              <div className="flex justify-end p-6">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-foreground"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-2 px-8 flex-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleNav(link.href)}
                    className={`text-3xl font-heading font-semibold transition-colors text-left py-3 ${
                      location.pathname === link.href
                        ? "text-sage"
                        : "text-foreground hover:text-sage"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-8">
                <button 
                  onClick={() => handleNav("/opportunities")}
                  className="w-full btn-primary text-lg"
                >
                  Get Started
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
