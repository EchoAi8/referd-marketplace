import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X, Play, Pause, Volume2, VolumeX } from "lucide-react";
import salaryDashboardImage from "@/assets/salary-intelligence-dashboard.jpg";
import demoVideo from "@/assets/market-value-xray-demo.mp4";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const SalaryIntelligenceZoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { navigateWithTransition } = useGridNavigation();
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

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
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-rose/20 border border-rose/30 rounded-full mb-4 text-rose text-sm font-bold"
          >
            🔥 LIMITED ACCESS
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight max-w-[10em] mx-auto">
            Market Value
            <span className="text-sage"> X-Ray™</span>
          </h2>
          <p className="mt-4 text-background/60 text-lg max-w-xl mx-auto">
            The #1 salary intelligence tool used by 50,000+ professionals
          </p>
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
            {/* AI Generated Dashboard Image */}
            <img
              data-bg-zoom-img=""
              src={salaryDashboardImage}
              alt="Salary Intelligence Dashboard Analytics"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Badge */}
            <p className="absolute top-5 w-full text-center text-mustard text-lg font-black tracking-tight drop-shadow-lg">
              REFERD®
            </p>

            {/* Interactive Play Button */}
            <button
              onClick={() => setShowVideoModal(true)}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 group cursor-pointer z-10"
            >
              {/* Pulsing ring */}
              <span className="absolute inset-0 rounded-full bg-background/20 animate-ping" />
              <span className="absolute inset-2 rounded-full bg-background/30 animate-pulse" />
              
              {/* Button */}
              <span className="relative flex items-center justify-center w-full h-full rounded-full bg-background shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <Play className="w-8 h-8 text-foreground ml-1" fill="currentColor" />
              </span>
            </button>

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
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-mustard/20 border border-mustard/30 rounded-full mb-6 text-mustard text-sm font-bold"
          >
            ⚡ FREE FOR A LIMITED TIME
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight mb-6">
            Stop Leaving Money On The Table
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join 50,000+ professionals who discovered they were being underpaid.
            Our AI analyzes millions of data points to reveal your true worth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-sage via-sage to-forest text-foreground rounded-full font-bold text-lg shadow-[0_0_30px_rgba(139,164,133,0.7),0_0_60px_rgba(139,164,133,0.4)] hover:shadow-[0_0_40px_rgba(139,164,133,0.9),0_0_80px_rgba(139,164,133,0.5)] transition-all duration-300"
              strength={0.4}
              onClick={() => navigateWithTransition("/salary-intelligence")}
            >
              🔥 Get Your Free X-Ray Report
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

      {/* Video Demo Modal */}
      <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
        <DialogContent className="max-w-4xl p-0 bg-foreground border-foreground/20 overflow-hidden">
          <div className="relative aspect-video bg-foreground">
            {/* Close button */}
            <button
              onClick={() => setShowVideoModal(false)}
              className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center rounded-full bg-background/10 hover:bg-background/20 transition-colors"
            >
              <X className="w-5 h-5 text-background" />
            </button>

            {/* Actual Demo Video */}
            <video
              ref={videoRef}
              src={demoVideo}
              className="absolute inset-0 w-full h-full object-cover"
              autoPlay
              loop
              muted={isMuted}
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />

            {/* Video Controls Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Play/Pause */}
                  <button
                    onClick={() => {
                      if (videoRef.current) {
                        if (isPlaying) {
                          videoRef.current.pause();
                        } else {
                          videoRef.current.play();
                        }
                      }
                    }}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause className="w-5 h-5 text-background" fill="currentColor" />
                    ) : (
                      <Play className="w-5 h-5 text-background ml-0.5" fill="currentColor" />
                    )}
                  </button>

                  {/* Mute/Unmute */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-background/20 hover:bg-background/30 transition-colors"
                  >
                    {isMuted ? (
                      <VolumeX className="w-5 h-5 text-background" />
                    ) : (
                      <Volume2 className="w-5 h-5 text-background" />
                    )}
                  </button>
                </div>

                <div className="text-right">
                  <h3 className="text-background font-heading font-bold text-lg">
                    Market Value X-Ray™ Demo
                  </h3>
                  <p className="text-background/60 text-sm">
                    See your salary intelligence in action
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Overlay */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2, duration: 0.5 }}
              className="absolute top-4 left-4 z-10"
            >
              <MagneticButton
                className="px-4 py-2 bg-sage text-foreground rounded-full font-semibold text-sm shadow-lg"
                strength={0.3}
                onClick={() => {
                  setShowVideoModal(false);
                  navigateWithTransition("/salary-intelligence");
                }}
              >
                🔥 Try It Free
              </MagneticButton>
            </motion.div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SalaryIntelligenceZoom;