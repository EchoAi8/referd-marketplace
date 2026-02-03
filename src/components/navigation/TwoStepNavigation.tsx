import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Linkedin, Twitter, Instagram } from "lucide-react";

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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isActive) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isActive]);

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
    { label: "Opportunities", href: "/opportunities" },
    { label: "For Brands", href: "/brands" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  const socialLinks = [
    { label: "LinkedIn", href: "https://linkedin.com/company/referd", icon: Linkedin },
    { label: "Twitter/X", href: "https://twitter.com/referd", icon: Twitter },
    { label: "Instagram", href: "https://instagram.com/referd", icon: Instagram },
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
                {/* Referd Wordmark */}
                <div className="flex items-center gap-1">
                  <span className="font-heading font-bold text-xl tracking-tight text-current">
                    Referd
                  </span>
                  <span className="text-[hsl(var(--sage))] text-xs align-super">®</span>
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
                        {/* Main Navigation Links */}
                        <motion.ul
                          className="twostep-nav__ul"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          {navLinks.map((link) => (
                            <motion.li key={link.href} className="twostep-nav__li" variants={itemVariants}>
                              <Link 
                                to={link.href} 
                                className={`twostep-nav__link ${location.pathname === link.href ? 'is--active' : ''}`}
                                onClick={closeNav}
                              >
                                <span className="twostep-nav__link-span">{link.label}</span>
                              </Link>
                            </motion.li>
                          ))}
                        </motion.ul>

                        {/* Social Media Links */}
                        <motion.ul
                          className="twostep-nav__ul is--small"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          {socialLinks.map((social) => (
                            <motion.li key={social.label} className="twostep-nav__li" variants={socialVariants}>
                              <a
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="twostep-nav__link twostep-nav__social-link"
                              >
                                <social.icon className="w-4 h-4" />
                                <span className="twostep-nav__link-eyebrow">{social.label}</span>
                              </a>
                            </motion.li>
                          ))}
                        </motion.ul>
                      </div>
                    </div>

                    {/* Signup Visual */}
                    <motion.div
                      className="twostep-nav__bottom-col is--visual"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                      transition={{ duration: 0.6, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                      <div className="twostep-nav__signup-card">
                        {/* Background gradient */}
                        <div className="twostep-nav__signup-bg" />
                        
                        {/* Content */}
                        <div className="twostep-nav__signup-content">
                          <div className="twostep-nav__signup-badge">
                            <span>Early Access</span>
                          </div>
                          
                          <h3 className="twostep-nav__signup-title">
                            Kill the recruiter fee
                          </h3>
                          
                          <p className="twostep-nav__signup-desc">
                            Join 10,000+ professionals earning referral rewards. Zero middlemen. 35% to you.
                          </p>

                          {/* Stats row */}
                          <div className="twostep-nav__signup-stats">
                            <div className="twostep-nav__signup-stat">
                              <span className="twostep-nav__signup-stat-value">£2.4M</span>
                              <span className="twostep-nav__signup-stat-label">Paid Out</span>
                            </div>
                            <div className="twostep-nav__signup-stat">
                              <span className="twostep-nav__signup-stat-value">847</span>
                              <span className="twostep-nav__signup-stat-label">Placements</span>
                            </div>
                          </div>

                          {/* CTA Button */}
                          <Link 
                            to="/auth" 
                            className="twostep-nav__signup-cta"
                            onClick={closeNav}
                          >
                            <span>Get Started Free</span>
                            <ArrowRight className="w-4 h-4" />
                          </Link>

                          {/* Trust line */}
                          <p className="twostep-nav__signup-trust">
                            No credit card required • Free forever for talent
                          </p>
                        </div>

                        {/* Decorative elements */}
                        <div className="twostep-nav__signup-glow" />
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
