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
                  className={`relative text-sm transition-colors duration-200 group bg-transparent border-none ${
                    location.pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  strength={0.4}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                      location.pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </MagneticButton>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="hidden md:flex items-center gap-3">
              <SoundToggle />
              <ThemeToggle />
              <MagneticButton
                className="px-5 py-2.5 bg-foreground text-background rounded-full text-sm font-medium hover:bg-foreground/90 transition-colors"
                strength={0.3}
              >
                Get Started
              </MagneticButton>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center gap-2">
              <SoundToggle />
              <ThemeToggle />
              <button
                onClick={() => {
                  playClick();
                  setIsMobileMenuOpen(!isMobileMenuOpen);
                }}
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
