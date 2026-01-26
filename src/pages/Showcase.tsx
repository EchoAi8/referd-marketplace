import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import PageLayout from "@/components/layout/PageLayout";

// Register only FREE GSAP plugins - InertiaPlugin is a paid Club plugin
gsap.registerPlugin(ScrollTrigger, Draggable, Observer);

const carouselImages = [
  { id: 1, src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=90", title: "Team Collaboration" },
  { id: 2, src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=90", title: "Product Launch" },
  { id: 3, src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=90", title: "Strategy Session" },
  { id: 4, src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=90", title: "Board Meeting" },
  { id: 5, src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&auto=format&fit=crop&q=90", title: "Creative Workshop" },
  { id: 6, src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=90", title: "Office Culture" },
  { id: 7, src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=90", title: "Brainstorming" },
  { id: 8, src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=90", title: "Tech Innovation" },
];

const horizontalPanels = [
  { id: 1, title: "Discovery", description: "We start by understanding your vision and goals.", color: "talent" },
  { id: 2, title: "Strategy", description: "Building a roadmap tailored to your success.", color: "referrer" },
  { id: 3, title: "Design", description: "Crafting experiences that captivate and convert.", color: "brand" },
  { id: 4, title: "Development", description: "Bringing ideas to life with cutting-edge tech.", color: "primary" },
  { id: 5, title: "Launch", description: "Deploying with precision and measuring impact.", color: "secondary" },
];

const logoData = [
  { id: 1, name: "Stripe", icon: "💳" },
  { id: 2, name: "Notion", icon: "📝" },
  { id: 3, name: "Slack", icon: "💬" },
  { id: 4, name: "Figma", icon: "🎨" },
  { id: 5, name: "Linear", icon: "📊" },
  { id: 6, name: "Vercel", icon: "▲" },
  { id: 7, name: "GitHub", icon: "🐙" },
  { id: 8, name: "Discord", icon: "🎮" },
  { id: 9, name: "Spotify", icon: "🎵" },
  { id: 10, name: "Airbnb", icon: "🏠" },
  { id: 11, name: "Uber", icon: "🚗" },
  { id: 12, name: "Netflix", icon: "🎬" },
  { id: 13, name: "Amazon", icon: "📦" },
  { id: 14, name: "Google", icon: "🔍" },
  { id: 15, name: "Apple", icon: "🍎" },
  { id: 16, name: "Meta", icon: "∞" },
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const logoWallRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const draggableRef = useRef<Draggable[] | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const lastWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  // 3D Carousel Effect - Fixed without InertiaPlugin
  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    let radius: number;
    const calcRadius = () => {
      radius = Math.max(window.innerWidth * 0.5, 350);
    };

    const destroy = () => {
      if (draggableRef.current) {
        draggableRef.current.forEach(d => d.kill());
        draggableRef.current = null;
      }
      observerRef.current?.kill();
      spinRef.current?.kill();
      introRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrap) st.kill();
      });
      gsap.set(wrap.querySelectorAll("[data-3d-carousel-panel]"), { clearProps: "all" });
      gsap.set(list, { clearProps: "all" });
    };

    const create = () => {
      calcRadius();
      const panels = wrap.querySelectorAll<HTMLElement>("[data-3d-carousel-panel]");
      const content = wrap.querySelectorAll("[data-3d-carousel-content]");
      const proxy = document.createElement("div");
      const wrapProgress = gsap.utils.wrap(0, 1);
      const dragDistance = window.innerWidth * 2;
      let startProg = 0;
      let lastX = 0;
      let velocity = 0;
      const angleIncrement = 360 / panels.length;

      // Position panels in 3D cylinder
      panels.forEach((panel, i) => {
        gsap.set(panel, {
          rotationY: i * angleIncrement,
          transformOrigin: `50% 50% ${-radius}px`,
        });
      });

      // Continuous spin animation
      spinRef.current = gsap.to(list, {
        rotationY: "-=360",
        duration: 30,
        ease: "none",
        repeat: -1,
      });
      spinRef.current.progress(0.5);

      // Manual momentum dragging (replaces InertiaPlugin)
      draggableRef.current = Draggable.create(proxy, {
        trigger: wrap,
        type: "x",
        allowNativeTouchScrolling: false,
        onPress() {
          gsap.to(content, {
            clipPath: "inset(3%)",
            scale: 0.98,
            duration: 0.3,
            ease: "power4.out",
            overwrite: "auto",
          });
          gsap.killTweensOf(spinRef.current);
          spinRef.current!.timeScale(0);
          startProg = spinRef.current!.progress();
          velocity = 0;
          lastX = this.x;
        },
        onDrag() {
          velocity = this.x - lastX;
          lastX = this.x;
          spinRef.current!.progress(
            wrapProgress(startProg + (this.startX - this.x) / dragDistance)
          );
        },
        onRelease() {
          gsap.to(content, {
            clipPath: "inset(0%)",
            scale: 1,
            duration: 0.5,
            ease: "power4.out",
            overwrite: "auto",
          });

          // Manual momentum simulation (replaces InertiaPlugin)
          const throwVelocity = velocity * 12;
          let currentProgress = spinRef.current!.progress();

          if (Math.abs(throwVelocity) > 5) {
            gsap.to({ val: 0 }, {
              val: 1,
              duration: 1.5,
              ease: "power2.out",
              onUpdate: function () {
                const easeProgress = this.progress();
                const delta = (throwVelocity * (1 - easeProgress) * 0.008) / dragDistance;
                currentProgress = wrapProgress(currentProgress - delta);
                spinRef.current!.progress(currentProgress);
              },
              onComplete: () => {
                gsap.to(spinRef.current, { timeScale: 1, duration: 0.8 });
              },
            });
          } else {
            gsap.to(spinRef.current, { timeScale: 1, duration: 0.8 });
          }
        },
      });

      // Intro animation on scroll into view
      introRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 85%",
          end: "bottom top",
          scrub: false,
          toggleActions: "play resume play play",
        },
        defaults: { ease: "expo.out" },
      });
      introRef.current
        .fromTo(spinRef.current, { timeScale: 6 }, { timeScale: 1, duration: 2 })
        .fromTo(wrap, { scale: 0.5, rotationX: 20 }, { scale: 1, rotationX: 0, duration: 1.2 }, "<")
        .fromTo(
          content,
          { autoAlpha: 0, scale: 0.85 },
          { autoAlpha: 1, scale: 1, stagger: { amount: 0.5, from: "random" } },
          "<0.15"
        );

      // Scroll velocity affects spin speed
      observerRef.current = Observer.create({
        target: window,
        type: "wheel,scroll,touch",
        onChangeY: (self) => {
          const v = gsap.utils.clamp(-20, 20, self.velocityY * 0.006);
          spinRef.current!.timeScale(v);
          gsap.to(spinRef.current, {
            timeScale: v < 0 ? -1 : 1,
            duration: 1.2,
            ease: "power2.out",
          });
        },
      });
    };

    create();

    const debounce = (fn: () => void, ms: number) => {
      let t: NodeJS.Timeout;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, ms);
      };
    };
    const handleResize = debounce(() => {
      if (window.innerWidth !== lastWidthRef.current) {
        lastWidthRef.current = window.innerWidth;
        destroy();
        create();
        ScrollTrigger.refresh();
      }
    }, 200);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      destroy();
    };
  }, []);

  // Parallax Layers Effect - Fixed with z-indexing
  useEffect(() => {
    const parallaxSection = parallaxRef.current;
    if (!parallaxSection) return;

    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 },
    ];

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: parallaxSection,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0.5,
      },
    });

    layers.forEach((layerObj, idx) => {
      tl.to(
        parallaxSection.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        { yPercent: layerObj.yPercent, ease: "none" },
        idx === 0 ? undefined : "<"
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Horizontal Scrolling Effect - Fixed layout
  useEffect(() => {
    const wrap = horizontalRef.current;
    if (!wrap) return;

    const mm = gsap.matchMedia();

    mm.add(
      {
        isMobile: "(max-width:479px)",
        isMobileLandscape: "(max-width:767px)",
        isTablet: "(max-width:991px)",
        isDesktop: "(min-width:992px)",
      },
      (context) => {
        const { isMobile } = context.conditions || {};
        if (isMobile) return;

        const panels = gsap.utils.toArray<HTMLElement>("[data-horizontal-scroll-panel]", wrap);
        if (panels.length < 2) return;

        const totalWidth = wrap.scrollWidth - window.innerWidth;

        gsap.to(panels, {
          x: () => -totalWidth,
          ease: "none",
          scrollTrigger: {
            trigger: wrap,
            start: "top top",
            end: () => "+=" + totalWidth,
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        return () => {
          ScrollTrigger.getAll().forEach((st) => {
            if (st.trigger === wrap) st.kill();
          });
        };
      }
    );

    return () => {
      mm.revert();
    };
  }, []);

  // Logo Wall Cycle Effect - Fixed with RAF initialization
  useEffect(() => {
    const root = logoWallRef.current;
    if (!root) return;

    const loopDelay = 1.5;
    const duration = 0.9;

    let tl: gsap.core.Timeline;
    let scrollTriggerInstance: ScrollTrigger;

    // Use requestAnimationFrame for proper DOM timing
    const rafId = requestAnimationFrame(() => {
      const list = root.querySelector("[data-logo-wall-list]");
      if (!list) return;

      const items = Array.from(list.querySelectorAll("[data-logo-wall-item]")) as HTMLElement[];
      const originalTargets = items
        .map((item) => item.querySelector("[data-logo-wall-target]"))
        .filter(Boolean) as HTMLElement[];

      if (originalTargets.length === 0) return;

      let visibleItems: HTMLElement[] = [];
      let visibleCount = 0;
      let pool: HTMLElement[] = [];
      let pattern: number[] = [];
      let patternIndex = 0;

      const isVisible = (el: HTMLElement) => window.getComputedStyle(el).display !== "none";

      const shuffleArray = <T,>(arr: T[]): T[] => {
        const a = arr.slice();
        for (let i = a.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [a[i], a[j]] = [a[j], a[i]];
        }
        return a;
      };

      const swapNext = () => {
        const nowCount = items.filter(isVisible).length;
        if (nowCount !== visibleCount) {
          setup();
          return;
        }
        if (!pool.length) return;

        const idx = pattern[patternIndex % visibleCount];
        patternIndex++;

        const container = visibleItems[idx];
        if (!container) return;

        const parent =
          container.querySelector("[data-logo-wall-target-parent]") ||
          container.querySelector("*:has(> [data-logo-wall-target])") ||
          container;
        const existing = parent.querySelectorAll("[data-logo-wall-target]");
        if (existing.length > 1) return;

        const current = parent.querySelector("[data-logo-wall-target]");
        const incoming = pool.shift()!;

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
              pool.push(current as HTMLElement);
            },
          });
        }

        gsap.to(incoming, {
          yPercent: 0,
          autoAlpha: 1,
          duration,
          delay: 0.1,
          ease: "expo.inOut",
        });
      };

      const setup = () => {
        if (tl) tl.kill();

        visibleItems = items.filter(isVisible);
        visibleCount = visibleItems.length;

        if (visibleCount === 0) return;

        pattern = shuffleArray(Array.from({ length: visibleCount }, (_, i) => i));
        patternIndex = 0;

        items.forEach((item) => {
          item.querySelectorAll("[data-logo-wall-target]").forEach((old) => old.remove());
        });

        pool = originalTargets.map((n) => n.cloneNode(true) as HTMLElement);

        const shuffledAll = shuffleArray(pool);
        const front = shuffledAll.slice(0, visibleCount);
        const rest = shuffleArray(shuffledAll.slice(visibleCount));
        pool = front.concat(rest);

        for (let i = 0; i < visibleCount; i++) {
          const parent =
            visibleItems[i].querySelector("[data-logo-wall-target-parent]") || visibleItems[i];
          const logo = pool.shift();
          if (logo) parent.appendChild(logo);
        }

        tl = gsap.timeline({ repeat: -1, repeatDelay: loopDelay });
        tl.call(swapNext);
        tl.play();
      };

      setup();

      scrollTriggerInstance = ScrollTrigger.create({
        trigger: root,
        start: "top bottom",
        end: "bottom top",
        onEnter: () => tl?.play(),
        onLeave: () => tl?.pause(),
        onEnterBack: () => tl?.play(),
        onLeaveBack: () => tl?.pause(),
      });

      const handleVisibility = () => (document.hidden ? tl?.pause() : tl?.play());
      document.addEventListener("visibilitychange", handleVisibility);

      return () => {
        tl?.kill();
        scrollTriggerInstance?.kill();
        document.removeEventListener("visibilitychange", handleVisibility);
      };
    });

    return () => {
      cancelAnimationFrame(rafId);
      tl?.kill();
      scrollTriggerInstance?.kill();
    };
  }, []);

  const colorClasses: Record<string, { bg: string; text: string; border: string }> = {
    talent: { bg: "bg-talent/20", text: "text-talent", border: "border-talent/30" },
    referrer: { bg: "bg-referrer/20", text: "text-referrer", border: "border-referrer/30" },
    brand: { bg: "bg-brand/20", text: "text-brand", border: "border-brand/30" },
    primary: { bg: "bg-primary/20", text: "text-primary", border: "border-primary/30" },
    secondary: { bg: "bg-secondary/20", text: "text-secondary", border: "border-secondary/30" },
  };

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center bg-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-foreground mb-6">
            Effect Showcase
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Scroll through to experience each GSAP-powered animation.
          </p>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <section className="relative min-h-[120vh] bg-foreground overflow-hidden py-24">
        <div className="container mx-auto px-6 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">Effect 01</p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            3D Carousel
          </h2>
        </div>

        <div
          ref={wrapRef}
          data-3d-carousel-wrap
          className="relative w-full h-[70vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{ perspective: "1200px", perspectiveOrigin: "50% 50%" }}
        >
          <div
            ref={listRef}
            className="relative flex items-center justify-center"
            style={{
              width: "420px",
              height: "560px",
              transformStyle: "preserve-3d",
            }}
          >
            {carouselImages.map((image) => (
              <div
                key={image.id}
                data-3d-carousel-panel
                className="absolute w-[280px] md:w-[350px] lg:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden"
                style={{
                  backfaceVisibility: "hidden",
                  boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                }}
              >
                <div
                  data-3d-carousel-content
                  className="relative w-full h-full"
                  style={{ clipPath: "inset(0%)" }}
                >
                  <img
                    src={image.src}
                    alt={image.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-lg md:text-xl font-heading font-semibold text-white">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-sm text-background/60 font-medium">
            Grab to spin • Scroll to accelerate
          </p>
        </div>
      </section>

      {/* Parallax Layers Section - Fixed z-indexing */}
      <section
        ref={parallaxRef}
        data-parallax-layers
        className="relative min-h-[150vh] bg-background overflow-hidden"
      >
        <div className="container mx-auto px-6 pt-24 text-center relative z-50">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">Effect 02</p>
        </div>

        {/* Layer 1 - Background blur (slowest) */}
        <div
          data-parallax-layer="1"
          className="absolute inset-0 flex items-center justify-center z-10"
        >
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
        </div>

        {/* Layer 2 - Decorative cards */}
        <div
          data-parallax-layer="2"
          className="absolute inset-0 flex items-start justify-center pt-32 z-20"
        >
          <div className="grid grid-cols-3 gap-8 max-w-5xl px-6">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-talent/30 to-talent/10 backdrop-blur-sm" />
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-referrer/30 to-referrer/10 backdrop-blur-sm mt-24" />
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand/30 to-brand/10 backdrop-blur-sm" />
          </div>
        </div>

        {/* Layer 3 - Images */}
        <div
          data-parallax-layer="3"
          className="absolute inset-0 flex items-center justify-center z-30"
        >
          <div className="grid grid-cols-2 gap-12 max-w-4xl px-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=90"
                alt="Parallax 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mt-32">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=90"
                alt="Parallax 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Layer 4 - Text (fastest, foreground) */}
        <div
          data-parallax-layer="4"
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-40"
        >
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-foreground mb-6">
              Parallax Layers
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Four layers at different speeds.
            </p>
          </div>
        </div>
      </section>

      {/* Horizontal Scroll Section - Fixed structure */}
      <section className="bg-foreground">
        <div className="py-24 container mx-auto px-6 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">Effect 03</p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            Horizontal Scroll
          </h2>
        </div>

        <div
          ref={horizontalRef}
          data-horizontal-scroll-wrap
          className="flex w-max min-h-screen"
        >
          {horizontalPanels.map((panel, index) => {
            const colors = colorClasses[panel.color] || colorClasses.primary;
            return (
              <div
                key={panel.id}
                data-horizontal-scroll-panel
                className="flex items-center justify-center w-screen h-screen flex-shrink-0 px-6"
              >
                <div
                  className={`relative max-w-2xl w-full p-12 rounded-3xl border ${colors.border} ${colors.bg} backdrop-blur-sm`}
                >
                  <span
                    className={`text-8xl font-heading font-bold ${colors.text} opacity-20 absolute top-6 right-8`}
                  >
                    0{index + 1}
                  </span>
                  <h3 className={`text-fluid-4xl font-heading font-bold ${colors.text} mb-4`}>
                    {panel.title}
                  </h3>
                  <p className="text-xl text-background/80">{panel.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Logo Wall Section */}
      <section
        ref={logoWallRef}
        data-logo-wall-cycle-init
        data-logo-wall-shuffle="true"
        className="py-32 bg-background"
      >
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground mb-4">
              Effect 04
            </p>
            <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-foreground mb-4">
              Logo Wall Cycle
            </h2>
            <p className="text-xl text-muted-foreground">
              Logos swap in and out with smooth animations.
            </p>
          </div>

          <div data-logo-wall-list className="grid grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-6">
            {logoData.map((logo) => (
              <div
                key={logo.id}
                data-logo-wall-item
                className="relative aspect-square flex items-center justify-center rounded-2xl border border-border bg-muted/30 overflow-hidden [&:nth-child(n+9)]:hidden lg:[&:nth-child(n+9)]:flex [&:nth-child(n+7)]:hidden md:[&:nth-child(n+7)]:flex"
              >
                <div
                  data-logo-wall-target-parent
                  className="relative w-full h-full flex items-center justify-center"
                >
                  <div
                    data-logo-wall-target
                    className="flex flex-col items-center justify-center gap-2"
                  >
                    <span className="text-4xl">{logo.icon}</span>
                    <span className="text-sm font-medium text-foreground/70">{logo.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer spacer */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-fluid-4xl font-heading font-bold text-foreground mb-8">
            All Effects Complete
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            3D Carousel • Parallax Layers • Horizontal Scroll • Logo Wall
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Showcase;
