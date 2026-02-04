import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const ParallaxClosingSection = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 },
    ];

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      layers.forEach((layerObj, idx) => {
        const elements = section.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
        if (elements.length > 0) {
          tl.to(
            elements,
            { yPercent: layerObj.yPercent, ease: "none" },
            idx === 0 ? undefined : "<"
          );
        }
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      data-parallax-layers
      className="parallax-closing"
    >
      {/* Visual Layers */}
      <div className="parallax-closing__visuals">
        {/* Background layer - slowest */}
        <div className="parallax-closing__layer" data-parallax-layer="1">
          <div className="parallax-closing__bg-gradient" />
        </div>

        {/* Geometric shapes layer */}
        <div className="parallax-closing__layer" data-parallax-layer="2">
          <div className="parallax-closing__shape parallax-closing__shape--1" />
          <div className="parallax-closing__shape parallax-closing__shape--2" />
        </div>

        {/* Mid layer - decorative elements */}
        <div className="parallax-closing__layer" data-parallax-layer="3">
          <div className="parallax-closing__glow parallax-closing__glow--left" />
          <div className="parallax-closing__glow parallax-closing__glow--right" />
        </div>
      </div>

      {/* Content - fastest layer */}
      <div className="parallax-closing__content" data-parallax-layer="4">
        <div className="parallax-closing__inner">
          <span className="parallax-closing__eyebrow">Join the Movement</span>
          
          <h2 className="parallax-closing__title">
            Not your typical
            <br />
            <span className="text-talent">recruitment platform</span>
          </h2>

          <p className="parallax-closing__desc">
            The future of hiring is decentralized. Join 10,000+ professionals
            already earning through referrals.
          </p>

          <div className="parallax-closing__ctas">
            <Link to="/auth" className="parallax-closing__cta parallax-closing__cta--primary">
              <span>Get Started Free</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/how-it-works" className="parallax-closing__cta parallax-closing__cta--secondary">
              Learn More
            </Link>
          </div>

          {/* Stats row */}
          <div className="parallax-closing__stats">
            <div className="parallax-closing__stat">
              <span className="parallax-closing__stat-value">£2.4M+</span>
              <span className="parallax-closing__stat-label">Paid to Referrers</span>
            </div>
            <div className="parallax-closing__stat-divider" />
            <div className="parallax-closing__stat">
              <span className="parallax-closing__stat-value">847</span>
              <span className="parallax-closing__stat-label">Successful Placements</span>
            </div>
            <div className="parallax-closing__stat-divider" />
            <div className="parallax-closing__stat">
              <span className="parallax-closing__stat-value">35%</span>
              <span className="parallax-closing__stat-label">Referrer Earnings</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade to footer */}
      <div className="parallax-closing__fade" />
    </section>
  );
};

export default ParallaxClosingSection;
