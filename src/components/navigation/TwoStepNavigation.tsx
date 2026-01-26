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
                  viewBox="0 0 1457 320"
                  fill="none"
                  className="twostep-nav__logo-svg"
                >
                  <path
                    d="M511.765 320C566.464 320 614.72 292.501 643.52 250.592C660.064 293.269 702.859 320 759.52 320C800.341 320 834.773 306.955 856.896 285.504L853.707 313.376H922.827L939.371 169.056L977.781 313.376H1046.97L1085.38 169.056L1101.91 313.376H1171.03L1163.63 248.768C1192.27 291.701 1241.13 320 1296.62 320C1384.85 320 1456.38 248.469 1456.38 160.235C1456.38 72 1384.83 0.469287 1296.6 0.469287C1228.14 0.469287 1169.76 43.5413 1147.02 104.043L1135.85 6.62395H1059.47L1012.35 183.659L965.237 6.62395H888.853L878.123 100.224C876.821 72.9919 865.643 48.32 846.357 30.4533C824.864 10.5386 794.837 0.0106201 759.509 0.0106201C726.411 0.0106201 697.888 9.43995 677.024 27.2853C661.643 40.448 651.573 57.4399 647.68 76.2879C619.531 30.7839 569.205 0.469287 511.765 0.469287C423.531 0.469287 352 72 352 160.235C352 248.469 423.531 320 511.765 320ZM1296.6 72.3626C1345.13 72.3626 1384.47 111.701 1384.47 160.235C1384.47 208.768 1345.13 248.107 1296.6 248.107C1248.06 248.107 1208.73 208.768 1208.73 160.235C1208.73 111.701 1248.06 72.3626 1296.6 72.3626ZM759.52 66.976C789.515 66.976 807.925 80.864 808.757 104.128L809.013 111.2H876.875L869.877 172.299C866.4 166.699 862.272 161.525 857.461 156.821C841.632 141.376 818.421 130.859 788.459 125.568L748.064 118.336C721.301 113.515 715.819 105.152 715.819 94.0799C715.819 91.3066 717.045 66.9653 759.52 66.9653V66.976ZM730.517 185.493L778.112 194.421C808.843 200.32 812.981 212.789 812.981 224.213C812.981 242.251 792.491 253.451 759.499 253.451C720.32 253.451 705.515 231.349 704.736 212.427L704.448 205.397H665.003C669.216 191.072 671.52 175.925 671.52 160.235C671.52 159.488 671.477 158.741 671.467 157.995C685.653 171.467 705.461 180.864 730.507 185.493H730.517ZM511.765 72.3626C560.299 72.3626 599.637 111.701 599.637 160.235C599.637 208.768 560.299 248.107 511.765 248.107C463.232 248.107 423.893 208.768 423.893 160.235C423.893 111.701 463.232 72.3626 511.765 72.3626Z"
                    fill="currentColor"
                  />
                  <path
                    d="M216.48 131.808L287.285 61.0027L258.997 32.7147L188.192 103.52C185.173 106.549 180 104.405 180 100.128V0H140V120.8C140 131.403 131.403 140 120.8 140H0V180H100.128C104.405 180 106.549 185.173 103.52 188.192L32.7253 258.997L61.0133 287.285L131.819 216.48C134.837 213.461 140.011 215.595 140.011 219.872V320H180.011V199.2C180.011 188.597 188.608 180 199.211 180H320.011V140H219.883C215.605 140 213.461 134.827 216.491 131.808H216.48Z"
                    fill="hsl(var(--primary))"
                  />
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
