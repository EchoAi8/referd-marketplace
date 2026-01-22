import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const SalaryIntelligenceZoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { navigateWithTransition } = useGridNavigation();

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let masterTimeline: gsap.core.Timeline;

    const getScrollRange = ({
      trigger,
      start,
      endTrigger,
      end,
    }: {
      trigger: Element;
      start: string;
      endTrigger: Element;
      end: string;
    }) => {
      const st = ScrollTrigger.create({ trigger, start, endTrigger, end });
      const range = Math.max(1, st.end - st.start);
      st.kill();
      return range;
    };

    const bgZoomTimeline = () => {
      if (masterTimeline) masterTimeline.kill();

      const startEl = container.querySelector("[data-bg-zoom-start]");
      const endEl = container.querySelector("[data-bg-zoom-end]");
      const contentEl = container.querySelector("[data-bg-zoom-content]") as HTMLElement;
      const darkEl = container.querySelector("[data-bg-zoom-dark]");
      const imgEl = container.querySelector("[data-bg-zoom-img]");

      if (!startEl || !endEl || !contentEl) return;

      masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: startEl,
          start: "clamp(top bottom)",
          endTrigger: container,
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      const startRadius = getComputedStyle(startEl).borderRadius;
      const endRadius = getComputedStyle(endEl).borderRadius;
      const hasRadius = startRadius !== "0px" || endRadius !== "0px";

      contentEl.style.overflow = hasRadius ? "hidden" : "";
      if (hasRadius) gsap.set(contentEl, { borderRadius: startRadius });

      Flip.fit(contentEl, startEl, { scale: false });

      // Part 1 - Move from Start to End position
      const zoomScrollRange = getScrollRange({
        trigger: startEl,
        start: "clamp(top bottom)",
        endTrigger: endEl,
        end: "center center",
      });

      // Part 2 - End position to out of view
      const afterScrollRange = getScrollRange({
        trigger: endEl,
        start: "center center",
        endTrigger: container,
        end: "bottom top",
      });

      // Master Timeline - Flip.fit returns a tween
      const flipTween = Flip.fit(contentEl, endEl, {
        duration: zoomScrollRange,
        ease: "none",
        scale: false,
      }) as gsap.core.Tween;
      
      masterTimeline.add(flipTween);

      // Border Radius
      if (hasRadius) {
        masterTimeline.to(
          contentEl,
          {
            borderRadius: endRadius,
            duration: zoomScrollRange,
          },
          "<"
        );
      }

      // Content Y Position
      masterTimeline.to(contentEl, {
        y: `+=${afterScrollRange}`,
        duration: afterScrollRange,
      });

      // Dark Overlay
      if (darkEl) {
        gsap.set(darkEl, { opacity: 0 });
        masterTimeline.to(
          darkEl,
          {
            opacity: 0.75,
            duration: afterScrollRange * 0.25,
          },
          "<"
        );
      }

      // Image scale
      if (imgEl) {
        gsap.set(imgEl, { scale: 1, transformOrigin: "50% 50%" });
        masterTimeline.to(
          imgEl,
          {
            scale: 1.25,
            yPercent: -10,
            duration: afterScrollRange,
          },
          "<"
        );
      }

      ScrollTrigger.refresh();
    };

    // Small delay to ensure DOM is ready
    const initTimeout = setTimeout(bgZoomTimeline, 100);

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(bgZoomTimeline, 100);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(initTimeout);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", handleResize);
      if (masterTimeline) masterTimeline.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return (
    <>
      <section
        ref={containerRef}
        data-bg-zoom-init=""
        className="relative flex flex-col items-center justify-center min-h-screen overflow-clip px-4 bg-foreground text-background"
        style={{ paddingTop: "calc(50dvh - 15em)" }}
      >
        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight max-w-[7em] mx-auto">
            Salary Intelligence
            <span className="text-sage"> Portal</span>
          </h2>
        </div>

        {/* Start Element - The Circle */}
        <div
          data-bg-zoom-start=""
          className="relative aspect-square w-64 rounded-[16em]"
        >
          {/* Content that will zoom */}
          <div
            data-bg-zoom-content=""
            className="absolute inset-0 rounded-[inherit] bg-sage will-change-transform overflow-hidden"
          >
            {/* Image */}
            <img
              data-bg-zoom-img=""
              src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1200&auto=format&fit=crop"
              alt="Salary Intelligence Analytics"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Badge */}
            <p className="absolute top-5 w-full text-center text-mustard text-lg font-black tracking-tight">
              REFERD®
            </p>

            {/* Play Button */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
                viewBox="0 0 66 66"
                fill="none"
              >
                <circle cx="33" cy="33" r="33" fill="hsl(var(--background))" />
                <path
                  d="M25.5 33V26.0785C25.5 24.1544 27.5826 22.9515 29.2493 23.9131L35.25 27.375L41.2465 30.8345C42.9141 31.7966 42.9141 34.2034 41.2465 35.1655L35.25 38.625L29.2493 42.0869C27.5826 43.0485 25.5 41.8456 25.5 39.9215V33Z"
                  fill="hsl(var(--foreground))"
                />
              </svg>
            </div>

            {/* Dark Overlay */}
            <div
              data-bg-zoom-dark=""
              className="absolute inset-0 bg-foreground opacity-0"
            />
          </div>
        </div>

        {/* End Element - Full Screen Target */}
        <div data-bg-zoom-end="" className="w-screen h-screen" />

        {/* Text Content */}
        <div className="relative flex flex-col items-center gap-8 w-full pb-[calc(50dvh-12em)]">
          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em]">
            Know Your
            <br />
            <span className="text-sage">True Market Value</span>
          </h3>

          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em] mt-[33dvh]">
            AI-Powered
            <br />
            <span className="text-mustard">Salary Insights</span>
          </h3>

          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em] mt-[33dvh]">
            Benchmark Against
            <br />
            <span className="text-rose">Industry Leaders</span>
          </h3>
        </div>
      </section>

      {/* After Section - CTA */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-background text-foreground px-4">
        <p className="absolute bottom-5 w-full text-center text-sage text-lg font-black tracking-tight">
          REFERD®
        </p>

        <div className="text-center max-w-4xl">
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight mb-6">
            Ready to Discover Your Worth?
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Our AI-powered intelligence engine analyzes millions of data points
            to give you the most accurate salary benchmarks in the industry.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              className="btn-primary shadow-[0_0_25px_rgba(139,164,133,0.6)] hover:shadow-[0_0_35px_rgba(139,164,133,0.8)]"
              strength={0.4}
              onClick={() => navigateWithTransition("/salary-intelligence")}
            >
              Get Your Free Report
            </MagneticButton>
            <MagneticButton
              className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:bg-foreground/5 transition-all"
              strength={0.4}
              onClick={() => navigateWithTransition("/how-it-works")}
            >
              Learn More
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default SalaryIntelligenceZoom;
