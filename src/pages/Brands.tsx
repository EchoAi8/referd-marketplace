import { useEffect, useRef } from "react";
import PageLayout from "@/components/layout/PageLayout";
import { motion } from "framer-motion";

// Import GSAP dynamically to ensure plugins are available
declare global {
  interface Window {
    gsap: typeof import("gsap");
    ScrollTrigger: any;
    Flip: any;
    Observer: any;
  }
}

const Brands = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load GSAP and plugins from CDN
    const loadScripts = async () => {
      const gsapScript = document.createElement("script");
      gsapScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/gsap.min.js";
      document.head.appendChild(gsapScript);

      await new Promise((resolve) => (gsapScript.onload = resolve));

      const flipScript = document.createElement("script");
      flipScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/Flip.min.js";
      document.head.appendChild(flipScript);

      const scrollTriggerScript = document.createElement("script");
      scrollTriggerScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/ScrollTrigger.min.js";
      document.head.appendChild(scrollTriggerScript);

      const observerScript = document.createElement("script");
      observerScript.src = "https://cdn.jsdelivr.net/npm/gsap@3.14.1/dist/Observer.min.js";
      document.head.appendChild(observerScript);

      await Promise.all([
        new Promise((resolve) => (flipScript.onload = resolve)),
        new Promise((resolve) => (scrollTriggerScript.onload = resolve)),
        new Promise((resolve) => (observerScript.onload = resolve)),
      ]);

      // Initialize all animations
      initBackgroundZoom();
      initDraggableMarquee();
      initAcceleratingGlobe();
      initLogoWallCycle();
      initParallaxFooter();
    };

    loadScripts();

    return () => {
      // Cleanup
      if (window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((st: any) => st.kill());
      }
    };
  }, []);

  // Background Zoom Animation
  const initBackgroundZoom = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Flip = window.Flip;
    
    if (!gsap || !ScrollTrigger || !Flip) return;
    
    gsap.registerPlugin(ScrollTrigger, Flip);

    const containers = document.querySelectorAll("[data-bg-zoom-init]");
    if (!containers.length) return;

    let masterTimeline: any;

    const getScrollRange = ({ trigger, start, endTrigger, end }: any) => {
      const st = ScrollTrigger.create({ trigger, start, endTrigger, end });
      const range = Math.max(1, st.end - st.start);
      st.kill();
      return range;
    };

    const bgZoomTimeline = () => {
      if (masterTimeline) masterTimeline.kill();

      masterTimeline = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: containers[0].querySelector("[data-bg-zoom-start]") || containers[0],
          start: "clamp(top bottom)",
          endTrigger: containers[containers.length - 1],
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true
        }
      });

      containers.forEach((container) => {
        const startEl = container.querySelector("[data-bg-zoom-start]");
        const endEl = container.querySelector("[data-bg-zoom-end]");
        const contentEl = container.querySelector("[data-bg-zoom-content]") as HTMLElement;
        const darkEl = container.querySelector("[data-bg-zoom-dark]");
        const imgEl = container.querySelector("[data-bg-zoom-img]");
        if (!startEl || !endEl || !contentEl) return;

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
          end: "center center"
        });
        
        const afterScrollRange = getScrollRange({
          trigger: endEl,
          start: "center center",
          endTrigger: container,
          end: "bottom top"
        });
        
        masterTimeline.add(
          Flip.fit(contentEl, endEl, {
            duration: zoomScrollRange,
            ease: "none",
            scale: false,
          })
        );

        if (hasRadius) {
          masterTimeline.to(contentEl, { 
            borderRadius: endRadius, 
            duration: zoomScrollRange 
          }, "<");
        }
        
        masterTimeline.to(contentEl, {
          y: `+=${afterScrollRange}`,
          duration: afterScrollRange
        });
        
        if (darkEl) {
          gsap.set(darkEl, { opacity: 0 });
          masterTimeline.to(darkEl, { 
            opacity: 0.75, 
            duration: afterScrollRange * 0.25,
          }, "<");
        }

        if (imgEl) {
          gsap.set(imgEl, { scale: 1, transformOrigin: "50% 50%" });
          masterTimeline.to(imgEl, { 
            scale: 1.25, 
            yPercent: -10,
            duration: afterScrollRange 
          }, "<");
        }
      });

      ScrollTrigger.refresh();
    };

    bgZoomTimeline();

    let resizeTimer: any;
    window.addEventListener("resize", () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(bgZoomTimeline, 100);
    });
  };

  // Draggable Marquee Animation
  const initDraggableMarquee = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    const Observer = window.Observer;
    
    if (!gsap || !ScrollTrigger || !Observer) return;
    
    gsap.registerPlugin(ScrollTrigger, Observer);

    const wrappers = document.querySelectorAll("[data-draggable-marquee-init]");

    const getNumberAttr = (el: Element, name: string, fallback: number) => {
      const value = parseFloat(el.getAttribute(name) || "");
      return Number.isFinite(value) ? value : fallback;
    };

    wrappers.forEach((wrapper) => {
      if (wrapper.getAttribute("data-draggable-marquee-init") === "initialized") return;

      const collection = wrapper.querySelector("[data-draggable-marquee-collection]");
      const list = wrapper.querySelector("[data-draggable-marquee-list]");
      if (!collection || !list) return;

      const duration = getNumberAttr(wrapper, "data-duration", 20);
      const multiplier = getNumberAttr(wrapper, "data-multiplier", 40);
      const sensitivity = getNumberAttr(wrapper, "data-sensitivity", 0.01);

      const wrapperWidth = wrapper.getBoundingClientRect().width;
      const listWidth = (list as HTMLElement).scrollWidth || list.getBoundingClientRect().width;
      if (!wrapperWidth || !listWidth) return;

      const minRequiredWidth = wrapperWidth + listWidth + 2;
      while ((collection as HTMLElement).scrollWidth < minRequiredWidth) {
        const listClone = list.cloneNode(true) as Element;
        listClone.setAttribute("data-draggable-marquee-clone", "");
        listClone.setAttribute("aria-hidden", "true");
        collection.appendChild(listClone);
      }

      const wrapX = gsap.utils.wrap(-listWidth, 0);
      
      gsap.set(collection, { x: 0 });
      
      const marqueeLoop = gsap.to(collection, {
        x: -listWidth,
        duration,
        ease: "none",
        repeat: -1,
        onReverseComplete: () => marqueeLoop.progress(1),
        modifiers: {
          x: (x: string) => wrapX(parseFloat(x)) + "px"
        },
      });
      
      const initialDirectionAttr = (wrapper.getAttribute("data-direction") || "left").toLowerCase();
      const baseDirection = initialDirectionAttr === "right" ? -1 : 1;
      
      const timeScale = { value: 1 };
      
      timeScale.value = baseDirection;
      wrapper.setAttribute("data-direction", baseDirection < 0 ? "right" : "left");
      
      if (baseDirection < 0) marqueeLoop.progress(1);
      
      function applyTimeScale() {
        marqueeLoop.timeScale(timeScale.value);
        wrapper.setAttribute("data-direction", timeScale.value < 0 ? "right" : "left");
      }
      
      applyTimeScale();

      const marqueeObserver = Observer.create({
        target: wrapper,
        type: "pointer,touch",
        preventDefault: true,
        debounce: false,
        onChangeX: (observerEvent: any) => {
          let velocityTimeScale = observerEvent.velocityX * -sensitivity;
          velocityTimeScale = gsap.utils.clamp(-multiplier, multiplier, velocityTimeScale);

          gsap.killTweensOf(timeScale);

          const restingDirection = velocityTimeScale < 0 ? -1 : 1;

          gsap.timeline({ onUpdate: applyTimeScale })
            .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
            .to(timeScale, { value: restingDirection, duration: 1.0 });
        }
      });

      ScrollTrigger.create({
        trigger: wrapper,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable(); },
        onEnterBack: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable(); },
        onLeave: () => { marqueeLoop.pause(); marqueeObserver.disable(); },
        onLeaveBack: () => { marqueeLoop.pause(); marqueeObserver.disable(); }
      });
      
      wrapper.setAttribute("data-draggable-marquee-init", "initialized");
    });
  };

  // Accelerating Globe Animation
  const initAcceleratingGlobe = () => {
    const gsap = window.gsap;
    if (!gsap) return;

    document.querySelectorAll('[data-accelerating-globe]').forEach(function(globe) {
      const circles = globe.querySelectorAll('[data-accelerating-globe-circle]');
      if (circles.length < 8) return;

      const tl = gsap.timeline({
        repeat: -1,
        defaults: { duration: 1, ease: "none" }
      });

      const widths = [
        ["50%", "37.5%"],
        ["37.5%", "25%"],
        ["25%", "12.5%"],
        ["calc(12.5% + 1px)", "calc(0% + 1px)"],
        ["calc(0% + 1px)", "calc(12.5% + 1px)"],
        ["12.5%", "25%"],
        ["25%", "37.5%"],
        ["37.5%", "50%"]
      ];

      circles.forEach((el, i) => {
        const [fromW, toW] = widths[i];
        tl.fromTo(el, { width: fromW }, { width: toW }, i === 0 ? 0 : "<");
      });

      let lastY = window.scrollY;
      let lastT = performance.now();
      let stopTimeout: any;

      function onScroll() {
        const now = performance.now();
        const dy = window.scrollY - lastY;
        const dt = now - lastT;
        lastY = window.scrollY;
        lastT = now;

        const velocity = dt > 0 ? (dy / dt) * 1000 : 0;
        const boost = Math.abs(velocity * 0.005);
        const targetScale = boost + 1;

        tl.timeScale(targetScale);

        clearTimeout(stopTimeout);
        stopTimeout = setTimeout(() => {
          gsap.to(tl, {
            timeScale: 1,
            duration: 0.6,
            ease: "power2.out",
            overwrite: true
          });
        }, 100);
      }

      window.addEventListener("scroll", onScroll, { passive: true });
    });
  };

  // Logo Wall Cycle Animation
  const initLogoWallCycle = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;

    const loopDelay = 1.5;
    const duration = 0.9;

    document.querySelectorAll('[data-logo-wall-cycle-init]').forEach((root) => {
      const list = root.querySelector('[data-logo-wall-list]');
      if (!list) return;
      
      const items = Array.from(list.querySelectorAll('[data-logo-wall-item]'));

      const shuffleFront = root.getAttribute('data-logo-wall-shuffle') !== 'false';
      const originalTargets = items
        .map(item => item.querySelector('[data-logo-wall-target]'))
        .filter(Boolean) as Element[];

      let visibleItems: Element[] = [];
      let visibleCount = 0;
      let pool: Element[] = [];
      let pattern: number[] = [];
      let patternIndex = 0;
      let tl: any;

      function isVisible(el: Element) {
        return window.getComputedStyle(el).display !== 'none';
      }

      function shuffleArray<T>(arr: T[]): T[] {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      }

      function setup() {
        if (tl) {
          tl.kill();
        }
        visibleItems = items.filter(isVisible);
        visibleCount = visibleItems.length;

        pattern = shuffleArray(
          Array.from({ length: visibleCount }, (_, i) => i)
        );
        patternIndex = 0;

        items.forEach(item => {
          item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
        });

        pool = originalTargets.map(n => n.cloneNode(true) as Element);

        let front: Element[], rest: Element[];
        if (shuffleFront) {
          const shuffledAll = shuffleArray(pool);
          front = shuffledAll.slice(0, visibleCount);
          rest = shuffleArray(shuffledAll.slice(visibleCount));
        } else {
          front = pool.slice(0, visibleCount);
          rest = shuffleArray(pool.slice(visibleCount));
        }
        pool = front.concat(rest);

        for (let i = 0; i < visibleCount; i++) {
          const parent =
            visibleItems[i].querySelector('[data-logo-wall-target-parent]') ||
            visibleItems[i];
          const nextItem = pool.shift();
          if (nextItem) parent.appendChild(nextItem);
        }

        tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
        tl.call(swapNext);
        tl.play();
      }

      function swapNext() {
        const nowCount = items.filter(isVisible).length;
        if (nowCount !== visibleCount) {
          setup();
          return;
        }
        if (!pool.length) return;

        const idx = pattern[patternIndex % visibleCount];
        patternIndex++;

        const container = visibleItems[idx];
        const parent =
          container.querySelector('[data-logo-wall-target-parent]') ||
          container.querySelector('*:has(> [data-logo-wall-target])') ||
          container;
        const existing = parent.querySelectorAll('[data-logo-wall-target]');
        if (existing.length > 1) return;

        const current = parent.querySelector('[data-logo-wall-target]');
        const incoming = pool.shift();
        if (!incoming) return;

        gsap.set(incoming, { yPercent: 50, autoAlpha: 0 });
        parent.appendChild(incoming);

        if (current) {
          gsap.to(current, {
            yPercent: -50,
            autoAlpha: 0,
            duration,
            ease: "expo.inOut",
            onComplete: () => {
              current.remove();
              pool.push(current);
            }
          });
        }

        gsap.to(incoming, {
          yPercent: 0,
          autoAlpha: 1,
          duration,
          delay: 0.1,
          ease: "expo.inOut"
        });
      }

      setup();

      ScrollTrigger.create({
        trigger: root,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => tl.play(),
        onLeave: () => tl.pause(),
        onEnterBack: () => tl.play(),
        onLeaveBack: () => tl.pause()
      });

      document.addEventListener('visibilitychange', () =>
        document.hidden ? tl.pause() : tl.play()
      );
    });
  };

  // Parallax Footer Animation
  const initParallaxFooter = () => {
    const gsap = window.gsap;
    const ScrollTrigger = window.ScrollTrigger;
    
    if (!gsap || !ScrollTrigger) return;
    
    gsap.registerPlugin(ScrollTrigger);

    const footer = document.querySelector('[data-parallax-footer]');
    const footerContent = document.querySelector('[data-parallax-footer-content]');
    
    if (!footer || !footerContent) return;

    gsap.to(footerContent, {
      yPercent: -30,
      ease: "none",
      scrollTrigger: {
        trigger: footer,
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    });
  };

  const marqueeImages = [
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  ];

  const logoImages = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1611162616475-46b635cb6868?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1614680376408-81e91ffe3db7?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1636114673156-052a83459fc1?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1497215842964-222b430dc094?w=200&h=100&fit=crop",
    "https://images.unsplash.com/photo-1554469384-e58fac16e23a?w=200&h=100&fit=crop",
  ];

  return (
    <PageLayout>
      <div ref={containerRef} className="brands-page">
        {/* ============================================ */}
        {/* SECTION 1: Background Zoom Effect */}
        {/* ============================================ */}
        <section 
          data-bg-zoom-init
          className="relative flex flex-col items-center justify-center min-h-screen pt-[calc(50dvh-15em)] px-4 overflow-clip"
          style={{ backgroundColor: "hsl(var(--background))", color: "hsl(var(--foreground))" }}
        >
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center font-heading font-bold text-[clamp(3rem,10vw,7.5rem)] leading-[0.95] tracking-tight max-w-[7em] mb-[-0.375em]"
          >
            Hire <span className="text-muted-foreground">Smarter</span>
          </motion.h1>

          {/* Start Element - Circle */}
          <div 
            data-bg-zoom-start
            className="relative w-[16em] aspect-square rounded-full"
          >
            {/* Content that zooms */}
            <div 
              data-bg-zoom-content
              className="absolute top-0 left-0 w-full h-full rounded-[inherit] will-change-transform overflow-hidden"
              style={{ backgroundColor: "hsl(var(--muted))" }}
            >
              <img 
                data-bg-zoom-img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop"
                alt="Team collaboration"
                className="absolute w-full h-full object-cover"
              />
              <span 
                data-bg-zoom-pod
                className="absolute top-[1.25em] w-full text-center text-primary font-black text-[1.25em] leading-none tracking-tight"
              >
                REFERD
              </span>
              
              {/* Play button */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[4em] h-[4em]">
                <svg viewBox="0 0 64 64" className="w-full fill-background">
                  <circle cx="32" cy="32" r="32" fillOpacity="0.2" />
                  <polygon points="26,20 26,44 46,32" fill="currentColor" />
                </svg>
              </div>
              
              {/* Dark overlay */}
              <div 
                data-bg-zoom-dark
                className="absolute top-0 left-0 w-full h-full opacity-0"
                style={{ backgroundColor: "hsl(var(--foreground))" }}
              />
            </div>
          </div>

          {/* End Element - Full viewport */}
          <div data-bg-zoom-end className="w-screen h-screen" />

          {/* Text content after zoom */}
          <div className="relative flex flex-col items-center gap-8 w-full pb-[calc(50dvh-12em)]">
            <h2 className="text-center font-heading font-bold text-[clamp(2rem,8vw,6rem)] leading-[0.95] tracking-tight max-w-[7em]">
              This is the <span className="text-muted-foreground">future</span> of hiring
            </h2>
            <p className="text-xl text-muted-foreground">more...</p>
            <p className="text-xl text-muted-foreground">and more!</p>
            <span className="text-primary font-black text-[1.25em]">REFERD</span>
            <p className="text-xl text-muted-foreground mt-16">And we reached the end!</p>
          </div>
        </section>

        {/* After zoom section */}
        <section 
          className="relative flex items-center justify-center w-full min-h-screen px-4"
          style={{ backgroundColor: "hsl(var(--muted))", color: "hsl(var(--foreground))" }}
        >
          <span className="absolute bottom-[1.25em] w-full text-center text-primary font-black text-[1.25em]">
            REFERD
          </span>
        </section>

        {/* ============================================ */}
        {/* SECTION 2: Draggable Marquee */}
        {/* ============================================ */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">
              Our Talent Network
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Drag to explore our curated network of pre-vetted professionals
            </p>
          </div>
          
          <div 
            data-draggable-marquee-init
            data-duration="20"
            data-multiplier="40"
            data-sensitivity="0.01"
            data-direction="left"
            className="flex items-center justify-start w-full overflow-hidden cursor-grab active:cursor-grabbing"
          >
            <div 
              data-draggable-marquee-collection
              className="flex items-center flex-nowrap will-change-transform"
            >
              <div 
                data-draggable-marquee-list
                className="flex items-center flex-nowrap"
              >
                {marqueeImages.map((img, i) => (
                  <div 
                    key={i}
                    className="w-[15em] aspect-square rounded-[1.25em] mr-4 flex-none overflow-hidden"
                  >
                    <img 
                      src={img}
                      alt={`Talent ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Second marquee - opposite direction, round images */}
          <div 
            data-draggable-marquee-init
            data-duration="25"
            data-multiplier="40"
            data-sensitivity="0.01"
            data-direction="right"
            className="flex items-center justify-start w-full overflow-hidden cursor-grab active:cursor-grabbing mt-8"
          >
            <div 
              data-draggable-marquee-collection
              className="flex items-center flex-nowrap will-change-transform"
            >
              <div 
                data-draggable-marquee-list
                className="flex items-center flex-nowrap"
              >
                {marqueeImages.map((img, i) => (
                  <div 
                    key={i}
                    className="w-[15em] aspect-square rounded-full mr-4 flex-none overflow-hidden"
                  >
                    <img 
                      src={img}
                      alt={`Talent ${i + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 3: Accelerating Globe */}
        {/* ============================================ */}
        <section className="py-32 bg-foreground text-background flex items-center justify-center">
          <div className="container mx-auto px-4 flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 max-w-xl">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-6">
                Global Talent Network
              </h2>
              <p className="text-background/70 text-lg mb-8">
                Our network spans across continents, connecting you with the best talent wherever they are. 
                The globe accelerates as you scroll, representing our ever-expanding reach.
              </p>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">50K+</p>
                  <p className="text-sm text-background/60">Active Talent</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">120+</p>
                  <p className="text-sm text-background/60">Countries</p>
                </div>
                <div className="text-center">
                  <p className="text-4xl font-bold text-primary">98%</p>
                  <p className="text-sm text-background/60">Match Rate</p>
                </div>
              </div>
            </div>
            
            <div 
              data-accelerating-globe
              className="relative flex items-center justify-center w-[37.5vw] max-w-[400px]"
              style={{ color: "hsl(var(--primary))" }}
            >
              <div className="pt-[100%]" />
              
              {/* Back circles */}
              <div className="absolute w-full h-full rounded-full flex items-center justify-center overflow-hidden">
                <div className="absolute w-1/2 h-[16%] top-0 border border-current rounded-full" />
                <div className="absolute w-[87.5%] h-[24%] top-[14%] border border-current rounded-full" />
                <div className="absolute w-full h-[28%] top-[36%] border border-current rounded-full" />
                <div className="absolute w-[87.5%] h-[24%] top-[62%] border border-current rounded-full" />
                <div className="absolute w-1/2 h-[16%] top-[84%] border border-current rounded-full" />
              </div>
              
              {/* Animated front circles */}
              <div className="absolute w-full h-full">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={`front-${i}`}
                    data-accelerating-globe-circle
                    className="absolute w-1/2 h-full right-1/2 overflow-hidden"
                  >
                    <div className="absolute w-[200%] h-full border border-current rounded-full" />
                  </div>
                ))}
              </div>
              
              {/* Mirror circles */}
              <div className="absolute w-full h-full scale-x-[-1]">
                {[0, 1, 2, 3].map((i) => (
                  <div 
                    key={`mirror-${i}`}
                    data-accelerating-globe-circle
                    className="absolute w-1/2 h-full right-1/2 overflow-hidden"
                  >
                    <div className="absolute w-[200%] h-full border border-current rounded-full" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 4: Logo Wall Cycle */}
        {/* ============================================ */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-center text-foreground mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-muted-foreground text-center max-w-2xl mx-auto">
              Companies of all sizes trust Referd to find their next great hire
            </p>
          </div>
          
          <div 
            data-logo-wall-cycle-init
            data-logo-wall-shuffle="true"
            className="flex justify-center w-full"
          >
            <div className="w-full max-w-6xl">
              <div 
                data-logo-wall-list
                className="flex flex-wrap"
              >
                {logoImages.map((logo, i) => (
                  <div 
                    key={i}
                    data-logo-wall-item
                    className="w-1/4 md:w-1/4 relative"
                    style={{ display: i >= 8 ? 'none' : 'block' }}
                  >
                    <div className="relative flex items-center justify-center">
                      <div className="pt-[66.66%]" />
                      <div 
                        data-logo-wall-target-parent
                        className="absolute flex items-center justify-center w-[66.66%] h-[40%]"
                      >
                        <div 
                          data-logo-wall-target
                          className="w-full h-full max-h-full"
                        >
                          <img 
                            src={logo}
                            alt={`Partner ${i + 1}`}
                            className="w-full h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============================================ */}
        {/* SECTION 5: Parallax Footer */}
        {/* ============================================ */}
        <section 
          data-parallax-footer
          className="relative py-32 bg-foreground text-background overflow-hidden"
        >
          {/* Navigation bar */}
          <div className="absolute top-0 left-0 right-0 flex justify-between items-center px-8 py-6 border-b border-background/10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <span className="text-background font-bold">R</span>
              </div>
            </div>
            <span className="text-sm text-background/60">Navigation</span>
          </div>

          {/* Hero text */}
          <div className="container mx-auto px-4 py-16 text-center">
            <p className="text-lg text-background/60 max-w-2xl mx-auto">
              The footer marks the end of the scroll, but not the end of the story.
            </p>
          </div>

          {/* Concept explanation */}
          <div className="container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 border-t border-background/10">
            <div>
              <span className="text-sm text-background/40">( Concept )</span>
            </div>
            <div>
              <p className="text-lg text-background/80 mb-4">
                Parallax adds a sense of depth and motion that feels natural to the human eye. 
                By shifting elements at different speeds, we create a layered world that reacts to scroll. 
                It's subtle, but powerful — turning static sections into dynamic experiences.
              </p>
              <p className="text-sm text-background/40">Scroll down ↓</p>
            </div>
          </div>

          {/* Parallax content */}
          <div 
            data-parallax-footer-content
            className="relative"
          >
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
                alt="Office"
                className="w-full h-full object-cover opacity-20"
              />
            </div>
          </div>

          {/* Footer content */}
          <div className="container mx-auto px-4 pt-16">
            <div className="grid md:grid-cols-3 gap-12 border-t border-background/10 pt-16">
              <div>
                <span className="text-sm text-background/40 block mb-4">( Pages )</span>
                <nav className="flex flex-col gap-2">
                  {["Home", "Resources", "About", "Platform", "Login"].map((link) => (
                    <a key={link} href="#" className="text-background/70 hover:text-background transition-colors">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <span className="text-sm text-background/40 block mb-4">( Socials )</span>
                <nav className="flex flex-col gap-2">
                  {["LinkedIn", "Instagram", "X/Twitter"].map((link) => (
                    <a key={link} href="#" className="text-background/70 hover:text-background transition-colors">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
              <div>
                <span className="text-sm text-background/40 block mb-4">( Contact )</span>
                <nav className="flex flex-col gap-2">
                  <a href="mailto:hello@referd.com" className="text-background/70 hover:text-background transition-colors">
                    hello@referd.com
                  </a>
                  <span className="text-background/70">+44 20 1234 5678</span>
                </nav>
              </div>
            </div>
            
            <div className="mt-16 pt-8 border-t border-background/10 text-center">
              <h3 className="text-4xl md:text-6xl font-heading font-bold text-background/80">
                Not your typical platform
              </h3>
            </div>
          </div>
        </section>
      </div>
    </PageLayout>
  );
};

export default Brands;
