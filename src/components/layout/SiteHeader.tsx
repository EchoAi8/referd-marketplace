import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import MagneticButton from "@/components/animations/MagneticButton";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

interface NavLink {
  label: string;
  /** Route path (e.g. "/work") OR anchor (e.g. "#about") OR route + anchor (e.g. "/#about") */
  href: string;
}

const navLinks: NavLink[] = [
  { label: "About", href: "/about" },
  { label: "Work", href: "/work" },
  { label: "Insights", href: "/#articles" },
  { label: "Contact", href: "/#contact" },
];

const SiteHeader = () => {
  const { navigateWithTransition } = useGridNavigation();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
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

  /**
   * Smart navigation logic:
   * - Pure route (/work, /about) => grid transition navigate
   * - Pure anchor (#contact) => scroll on current page or if we're not on home, navigate home first
   * - Composite (/#contact) => if already on that route, scroll; else navigate with transition
   */
  const handleNav = (href: string) => {
    setIsMobileMenuOpen(false);

    const isAbsolute = href.startsWith("/");
    const hasAnchor = href.includes("#");

    if (isAbsolute && hasAnchor) {
      // e.g. "/#contact"
      const [route, anchor] = href.split("#");
      const targetRoute = route || "/";
      if (location.pathname === targetRoute) {
        // same page, just scroll
        scrollToAnchor(`#${anchor}`);
      } else {
        // navigate with grid transition, then scroll after load
        navigateWithTransition(targetRoute);
        setTimeout(() => scrollToAnchor(`#${anchor}`), 800);
      }
      return;
    }

    if (isAbsolute) {
      // pure route
      if (location.pathname !== href) {
        navigateWithTransition(href);
      }
      return;
    }

    if (hasAnchor) {
      // pure anchor on current page (fallback)
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
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigateWithTransition("/");
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-background/70 backdrop-blur-xl shadow-lg shadow-foreground/5 py-3 border-b border-foreground/5"
            : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <MagneticButton
              onClick={handleLogoClick}
              className="text-xl font-heading font-bold text-foreground tracking-tight bg-transparent border-none"
              strength={0.2}
            >
              Referd
            </MagneticButton>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-10">
              {navLinks.map((link) => (
                <MagneticButton
                  key={link.label}
                  onClick={() => handleNav(link.href)}
                  className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group bg-transparent border-none"
                  strength={0.4}
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground group-hover:w-full transition-all duration-300" />
                </MagneticButton>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-4">
              <ThemeToggle />
              <MagneticButton
                className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                strength={0.3}
              >
                Get Started
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-foreground"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
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
                    className="text-3xl font-heading font-semibold text-foreground hover:text-sage transition-colors text-left py-3"
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* CTA */}
              <div className="p-8">
                <button className="w-full btn-primary text-lg">Get Started</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SiteHeader;
