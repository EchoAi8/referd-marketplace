import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Flip } from "gsap/Flip";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import MagneticButton from "@/components/animations/MagneticButton";
import { useGridNavigation } from "@/hooks/use-grid-navigation";
import { BarChart3, TrendingUp, Zap, Shield } from "lucide-react";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, Flip);

const MarketPulseZoom = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { navigateWithTransition } = useGridNavigation();
  const animationRef = useRef<number>();

  // Canvas animation for the portal
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    updateSize();

    let time = 0;

    const animate = () => {
      time += 0.015;
      const rect = canvas.getBoundingClientRect();
      ctx.clearRect(0, 0, rect.width, rect.height);

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const maxRadius = Math.min(rect.width, rect.height) / 2;

      // Concentric rings with data visualization feel
      for (let i = 0; i < 8; i++) {
        const radius = maxRadius * (0.3 + i * 0.1);
        const alpha = 0.1 + Math.sin(time + i * 0.5) * 0.05;
        
        ctx.strokeStyle = i % 2 === 0 
          ? `rgba(139, 164, 133, ${alpha})` 
          : `rgba(199, 165, 95, ${alpha * 0.7})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Rotating data segments
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2 + time * 0.5;
        const length = maxRadius * (0.4 + Math.sin(time * 2 + i) * 0.1);
        
        const x1 = centerX + Math.cos(angle) * maxRadius * 0.25;
        const y1 = centerY + Math.sin(angle) * maxRadius * 0.25;
        const x2 = centerX + Math.cos(angle) * length;
        const y2 = centerY + Math.sin(angle) * length;

        const gradient = ctx.createLinearGradient(x1, y1, x2, y2);
        gradient.addColorStop(0, "rgba(139, 164, 133, 0.8)");
        gradient.addColorStop(1, "rgba(139, 164, 133, 0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Data point at end
        ctx.fillStyle = `rgba(199, 165, 95, ${0.5 + Math.sin(time * 3 + i) * 0.3})`;
        ctx.beginPath();
        ctx.arc(x2, y2, 3, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center glow
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, maxRadius * 0.3
      );
      glowGradient.addColorStop(0, "rgba(139, 164, 133, 0.3)");
      glowGradient.addColorStop(0.5, "rgba(139, 164, 133, 0.1)");
      glowGradient.addColorStop(1, "rgba(139, 164, 133, 0)");
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, maxRadius * 0.3, 0, Math.PI * 2);
      ctx.fill();

      // Pulsing center core
      const pulseScale = 1 + Math.sin(time * 3) * 0.1;
      ctx.fillStyle = "#8BA485";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 8 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = "#FAFAFA";
      ctx.beginPath();
      ctx.arc(centerX, centerY, 4 * pulseScale, 0, Math.PI * 2);
      ctx.fill();

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener("resize", updateSize);

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", updateSize);
    };
  }, []);

  // GSAP Zoom Effect
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

      const zoomScrollRange = getScrollRange({
        trigger: startEl,
        start: "clamp(top bottom)",
        endTrigger: endEl,
        end: "center center",
      });

      const afterScrollRange = getScrollRange({
        trigger: endEl,
        start: "center center",
        endTrigger: container,
        end: "bottom top",
      });

      const flipTween = Flip.fit(contentEl, endEl, {
        duration: zoomScrollRange,
        ease: "none",
        scale: false,
      }) as gsap.core.Tween;
      
      masterTimeline.add(flipTween);

      if (hasRadius) {
        masterTimeline.to(
          contentEl,
          { borderRadius: endRadius, duration: zoomScrollRange },
          "<"
        );
      }

      masterTimeline.to(contentEl, {
        y: `+=${afterScrollRange}`,
        duration: afterScrollRange,
      });

      if (darkEl) {
        gsap.set(darkEl, { opacity: 0 });
        masterTimeline.to(darkEl, { opacity: 0.85, duration: afterScrollRange * 0.25 }, "<");
      }

      ScrollTrigger.refresh();
    };

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
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 border border-sage/30 rounded-full mb-4"
          >
            <motion.span 
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-sage"
            />
            <span className="text-sage text-sm font-mono">LIVE DATA STREAM</span>
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight max-w-[10em] mx-auto">
            Market
            <span className="text-sage"> Pulse</span>
            <span className="text-mustard">™</span>
          </h2>
          <p className="mt-4 text-background/60 text-lg max-w-xl mx-auto">
            Real-time salary benchmarking powered by ML analysis
          </p>
        </div>

        {/* Start Element - The Circle with Canvas */}
        <div
          data-bg-zoom-start=""
          className="relative aspect-square w-64 rounded-[16em]"
        >
          <div
            data-bg-zoom-content=""
            className="absolute inset-0 rounded-[inherit] bg-foreground will-change-transform overflow-hidden"
          >
            {/* Canvas Animation */}
            <canvas
              ref={canvasRef}
              className="absolute inset-0 w-full h-full"
            />

            {/* Badge */}
            <p className="absolute top-5 w-full text-center text-mustard text-lg font-black tracking-tight drop-shadow-lg z-10">
              REFERD®
            </p>

            {/* Center CTA */}
            <button
              onClick={() => navigateWithTransition("/salary-intelligence")}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 group cursor-pointer z-10"
            >
              <span className="absolute inset-0 rounded-full bg-sage/20 animate-ping" />
              <span className="absolute inset-2 rounded-full bg-sage/30 animate-pulse" />
              <span className="relative flex items-center justify-center w-full h-full rounded-full bg-background shadow-2xl group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-8 h-8 text-foreground" />
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
            ML-Powered
            <br />
            <span className="text-mustard">Salary Analysis</span>
          </h3>

          <h3 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-[0.95] tracking-tight text-center max-w-[9em] mt-[33dvh]">
            Benchmark Against
            <br />
            <span className="text-sage">500K+ Data Points</span>
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-sage/20 border border-sage/30 rounded-full mb-6"
          >
            <Shield className="w-4 h-4 text-sage" />
            <span className="text-sage text-sm font-mono">ENCRYPTED • FREE ACCESS</span>
          </motion.span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight tracking-tight mb-6">
            Stop Guessing Your Worth
          </h2>
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join professionals who discovered they were being underpaid.
            Our ML pipeline analyzes real compensation data in real-time.
          </p>
          
          {/* Trust Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-10">
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <BarChart3 className="w-5 h-5 text-sage" />
                <span className="text-3xl font-heading font-bold text-foreground">500K+</span>
              </div>
              <span className="text-muted-foreground text-sm">Data Points</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Zap className="w-5 h-5 text-mustard" />
                <span className="text-3xl font-heading font-bold text-foreground">10s</span>
              </div>
              <span className="text-muted-foreground text-sm">Analysis Time</span>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Shield className="w-5 h-5 text-sage" />
                <span className="text-3xl font-heading font-bold text-foreground">120+</span>
              </div>
              <span className="text-muted-foreground text-sm">Industries</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <MagneticButton
              className="relative overflow-hidden px-8 py-4 bg-gradient-to-r from-sage via-sage to-forest text-foreground rounded-full font-bold text-lg shadow-[0_0_30px_rgba(139,164,133,0.5)] hover:shadow-[0_0_40px_rgba(139,164,133,0.7)] transition-all duration-300"
              strength={0.4}
              onClick={() => navigateWithTransition("/salary-intelligence")}
            >
              <Zap className="w-5 h-5 inline mr-2" />
              Run Free Analysis
            </MagneticButton>
            <MagneticButton
              className="px-8 py-4 border-2 border-foreground/20 text-foreground rounded-full font-semibold hover:bg-foreground/5 transition-all"
              strength={0.4}
              onClick={() => navigateWithTransition("/how-it-works")}
            >
              How It Works
            </MagneticButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default MarketPulseZoom;
