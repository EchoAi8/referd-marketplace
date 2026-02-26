import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const TwoStepNavigation = () => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  const toggleNav = () => setIsActive(!isActive);
  const closeNav = () => setIsActive(false);

  // ESC closes
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isActive) closeNav();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isActive]);

  // Close on route change
  useEffect(() => {
    closeNav();
  }, [location.pathname]);

  // Animation variants for staggered entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const socialVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "How It Works", href: "/how-it-works" },
    { label: "Career Intelligence", href: "/career-intelligence" },
    { label: "Opportunities", href: "/opportunities" },
    { label: "Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Twitter/X", href: "https://twitter.com" },
    { label: "Instagram", href: "https://instagram.com" },
  ];

  return (
    <nav
      ref={navRef}
      data-twostep-nav
      data-nav-status={isActive ? "active" : "not-active"}
      className="twostep-nav"
    >
      {/* Background overlay */}
      <div
        data-nav-toggle="close"
        className="twostep-nav__bg"
        onClick={closeNav}
      />

      <div className="twostep-nav__wrap">
        <div className="twostep-nav__width">
          <div className="twostep-nav__bar">
            <div className="twostep-nav__back">
              <div className="twostep-nav__back-bg" />
            </div>

            <div className="twostep-nav__top">
              <Link to="/" className="twostep-nav__logo" onClick={closeNav}>
                <div className="flex items-center gap-1">
                  <span className="font-heading font-bold text-xl tracking-tight text-current">
                    Referd
                  </span>
                  <span className="text-sage text-xs align-super">®</span>
                </div>
              </Link>

              <button
                data-nav-toggle="toggle"
                className="twostep-nav__toggle"
                onClick={toggleNav}
                aria-label="Toggle navigation"
              >
                <div className="twostep-nav__toggle-bar" />
                <div className="twostep-nav__toggle-bar" />
              </button>

              <div className="twostep-nav__top-line" />
            </div>

            <div className="twostep-nav__bottom" ref={linksRef}>
              <div className="twostep-nav__bottom-overflow">
                <div className="twostep-nav__bottom-inner">
                  <div className="twostep-nav__bottom-row">
                    <div className="twostep-nav__bottom-col">
                      <div className="twostep-nav__info">
                        <motion.ul
                          className="twostep-nav__ul"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          {navLinks.map((link) => (
                            <motion.li key={link.href} className="twostep-nav__li" variants={itemVariants}>
                              <Link to={link.href} className="twostep-nav__link" onClick={closeNav}>
                                <span className={`twostep-nav__link-span ${location.pathname === link.href ? "text-sage" : ""}`}>
                                  {link.label}
                                </span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>
                        <motion.ul
                          className="twostep-nav__ul is--small"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          {socialLinks.map((link) => (
                            <motion.li key={link.label} className="twostep-nav__li" variants={socialVariants}>
                              <a
                                href={link.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="twostep-nav__link"
                              >
                                <span className="twostep-nav__link-eyebrow">{link.label}</span>
                              </a>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>
                    <motion.div
                      className="twostep-nav__bottom-col is--visual"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="twostep-nav__visual">
                        {/* Stats panel instead of image */}
                        <div className="w-full h-full bg-foreground rounded-md flex flex-col items-center justify-center p-6 gap-4">
                          <div className="text-center">
                            <p className="text-sage text-3xl font-heading font-bold">£2.4M+</p>
                            <p className="text-background/60 text-sm mt-1">Paid Out</p>
                          </div>
                          <div className="w-12 h-px bg-background/20" />
                          <div className="text-center">
                            <p className="text-referrer text-3xl font-heading font-bold">12,400+</p>
                            <p className="text-background/60 text-sm mt-1">People Earning</p>
                          </div>
                          <div className="w-12 h-px bg-background/20" />
                          <div className="text-center">
                            <p className="text-talent text-3xl font-heading font-bold">2,100+</p>
                            <p className="text-background/60 text-sm mt-1">Hires Made</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TwoStepNavigation;
