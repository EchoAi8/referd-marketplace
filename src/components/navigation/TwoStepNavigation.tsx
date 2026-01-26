import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const TwoStepNavigation = () => {
  const [isActive, setIsActive] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(linksRef, { once: true, margin: "-50px" });

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
                        <motion.ul
                          className="twostep-nav__ul"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          <motion.li className="twostep-nav__li" variants={itemVariants}>
                            <Link to="/" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Home</span>
                            </Link>
                          </motion.li>
                          <motion.li className="twostep-nav__li" variants={itemVariants}>
                            <Link to="/work" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Portfolio</span>
                            </Link>
                          </motion.li>
                          <motion.li className="twostep-nav__li" variants={itemVariants}>
                            <Link to="/about" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">About us</span>
                            </Link>
                          </motion.li>
                          <motion.li className="twostep-nav__li" variants={itemVariants}>
                            <Link to="/how-it-works" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Services</span>
                            </Link>
                          </motion.li>
                        </motion.ul>
                        <motion.ul
                          className="twostep-nav__ul is--small"
                          variants={containerVariants}
                          initial="hidden"
                          animate={isActive ? "visible" : "hidden"}
                        >
                          <motion.li className="twostep-nav__li" variants={socialVariants}>
                            <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">Instagram</span>
                            </a>
                          </motion.li>
                          <motion.li className="twostep-nav__li" variants={socialVariants}>
                            <a
                              href="https://linkedin.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">LinkedIn</span>
                            </a>
                          </motion.li>
                          <motion.li className="twostep-nav__li" variants={socialVariants}>
                            <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">Twitter/X</span>
                            </a>
                          </motion.li>
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
                        <img
                          src="https://cdn.prod.website-files.com/6970c1684e330d82d41ba734/6970d4c112ff725efd1230ca_osmo-twostep-nav-image.avif"
                          alt="Navigation visual"
                          className="twostep-nav__visual-img"
                        />
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
