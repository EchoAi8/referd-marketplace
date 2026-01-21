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
        className="fixed top-4 left-4 right-4 z-50"
      >
        <motion.div
          layout
          className={`mx-auto transition-all duration-500 ease-out ${
            isScrolled
              ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-foreground/5 border border-foreground/5 rounded-full"
              : "bg-transparent"
          }`}
          style={{
            maxWidth: isNavExpanded ? "1200px" : "fit-content",
          }}
        >
          <div className={`flex items-center justify-between ${isScrolled ? "px-4 py-2" : "px-4 py-3"}`}>
            {/* Logo - Always visible, prominent */}
            <MagneticButton
              onClick={handleLogoClick}
              className="text-2xl md:text-3xl font-heading font-bold tracking-tight bg-transparent border-none"
              strength={0.2}
            >
              <span className="text-foreground transition-colors duration-300">
                Referd
              </span>
              <span className="text-sage text-lg align-super">®</span>
            </MagneticButton>

            {/* Desktop Navigation - Expands on scroll */}
            <AnimatePresence>
              {isNavExpanded && (
                <motion.nav
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: "auto" }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="hidden md:flex items-center gap-6 overflow-hidden"
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.label}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <MagneticButton
                        onClick={() => handleNav(link.href)}
                        className={`relative text-sm font-medium transition-colors duration-200 group bg-transparent border-none whitespace-nowrap ${
                          location.pathname === link.href
                            ? "text-sage"
                            : "text-muted-foreground hover:text-foreground"
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
                    </motion.div>
                  ))}
                </motion.nav>
              )}
            </AnimatePresence>

            {/* Right Side Actions */}
            <AnimatePresence>
              {isNavExpanded && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="hidden md:flex items-center gap-2"
                >
                  <SoundToggle />
                  <ThemeToggle />
                  <MagneticButton
                    onClick={() => handleNav("/opportunities")}
                    className="ml-2 px-5 py-2.5 bg-sage text-foreground rounded-full text-sm font-semibold hover:bg-sage/90 transition-colors"
                    strength={0.3}
                  >
                    Get Started
                  </MagneticButton>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              {isNavExpanded && (
                <>
                  <SoundToggle />
                  <ThemeToggle />
                </>
              )}
              <button
                onClick={() => {
                  playClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
                className="p-2 transition-colors text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </motion.div>
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
