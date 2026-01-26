import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const TwoStepNavigation = () => {
  const [isActive, setIsActive] = useState(false);

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

  return (
    <nav
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
              <Link to="/" className="twostep-nav__logo">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="100%"
                  viewBox="0 0 512 512"
                  fill="none"
                  className="twostep-nav__logo-svg"
                >
                  <path
                    d="M256 0C114.615 0 0 114.615 0 256s114.615 256 256 256 256-114.615 256-256S397.385 0 256 0zm0 472c-119.103 0-216-96.897-216-216S136.897 40 256 40s216 96.897 216 216-96.897 216-216 216z"
                    fill="currentColor"
                  />
                  <path
                    d="M256 96c-88.366 0-160 71.634-160 160s71.634 160 160 160 160-71.634 160-160S344.366 96 256 96zm0 280c-66.274 0-120-53.726-120-120s53.726-120 120-120 120 53.726 120 120-53.726 120-120 120z"
                    fill="hsl(var(--primary))"
                  />
                  <text
                    x="256"
                    y="280"
                    textAnchor="middle"
                    fontSize="140"
                    fontWeight="bold"
                    fontFamily="system-ui, -apple-system, sans-serif"
                    fill="currentColor"
                  >
                    R
                  </text>
                </svg>
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

            <div className="twostep-nav__bottom">
              <div className="twostep-nav__bottom-overflow">
                <div className="twostep-nav__bottom-inner">
                  <div className="twostep-nav__bottom-row">
                    <div className="twostep-nav__bottom-col">
                      <div className="twostep-nav__info">
                        <ul className="twostep-nav__ul">
                          <li className="twostep-nav__li">
                            <Link to="/" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Home</span>
                            </Link>
                          </li>
                          <li className="twostep-nav__li">
                            <Link to="/work" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Portfolio</span>
                            </Link>
                          </li>
                          <li className="twostep-nav__li">
                            <Link to="/about" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">About us</span>
                            </Link>
                          </li>
                          <li className="twostep-nav__li">
                            <Link to="/how-it-works" className="twostep-nav__link" onClick={closeNav}>
                              <span className="twostep-nav__link-span">Services</span>
                            </Link>
                          </li>
                        </ul>
                        <ul className="twostep-nav__ul is--small">
                          <li className="twostep-nav__li">
                            <a
                              href="https://instagram.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">Instagram</span>
                            </a>
                          </li>
                          <li className="twostep-nav__li">
                            <a
                              href="https://linkedin.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">LinkedIn</span>
                            </a>
                          </li>
                          <li className="twostep-nav__li">
                            <a
                              href="https://twitter.com"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="twostep-nav__link"
                            >
                              <span className="twostep-nav__link-eyebrow">Twitter/X</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="twostep-nav__bottom-col is--visual">
                      <div className="twostep-nav__visual">
                        <img
                          src="https://cdn.prod.website-files.com/6970c1684e330d82d41ba734/6970d4c112ff725efd1230ca_osmo-twostep-nav-image.avif"
                          alt="Navigation visual"
                          className="twostep-nav__visual-img"
                        />
                      </div>
                    </div>
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
