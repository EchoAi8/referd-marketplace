import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { InertiaPlugin } from "gsap/InertiaPlugin";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(ScrollTrigger, Draggable, Observer, InertiaPlugin);

const carouselImages = [
  {
    id: 1,
    src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&auto=format&fit=crop&q=90",
    title: "Team Collaboration",
  },
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&auto=format&fit=crop&q=90",
    title: "Product Launch",
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop&q=90",
    title: "Strategy Session",
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&auto=format&fit=crop&q=90",
    title: "Board Meeting",
  },
  {
    id: 5,
    src: "https://images.unsplash.com/photo-1531973576160-7125cd663d86?w=800&auto=format&fit=crop&q=90",
    title: "Creative Workshop",
  },
  {
    id: 6,
    src: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop&q=90",
    title: "Office Culture",
  },
  {
    id: 7,
    src: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop&q=90",
    title: "Brainstorming",
  },
  {
    id: 8,
    src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&auto=format&fit=crop&q=90",
    title: "Tech Innovation",
  },
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  // 3D Carousel Effect
  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    let radius: number;

    const calcRadius = () => {
      radius = Math.max(window.innerWidth * 0.6, 400);
    };

    const destroy = () => {
      draggableRef.current?.kill();
      observerRef.current?.kill();
      spinRef.current?.kill();
      introRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === wrap) st.kill();
      });
      const panels = wrap.querySelectorAll("[data-3d-carousel-panel]");
      gsap.set(panels, { clearProps: "all" });
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
      const numPanels = panels.length;
      const angleIncrement = 360 / numPanels;

      panels.forEach((panel, i) => {
        const angle = i * angleIncrement;
        gsap.set(panel, {
          rotationY: angle,
          transformOrigin: `50% 50% ${-radius}px`,
        });
      });

      spinRef.current = gsap.to(list, {
        rotationY: "-=360",
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      spinRef.current.progress(0.5);

      const [draggable] = Draggable.create(proxy, {
        trigger: wrap,
        type: "x",
        inertia: true,
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
        },
        onDrag() {
          const p = startProg + (this.startX - this.x) / dragDistance;
          spinRef.current!.progress(wrapProgress(p));
        },
        onThrowUpdate() {
          const p = startProg + (this.startX - this.x) / dragDistance;
          spinRef.current!.progress(wrapProgress(p));
        },
        onRelease() {
          if (!this.tween || !this.tween.isActive()) {
            gsap.to(spinRef.current, { timeScale: 1, duration: 0.5 });
          }
          gsap.to(content, {
            clipPath: "inset(0%)",
            scale: 1,
            duration: 0.5,
            ease: "power4.out",
            overwrite: "auto",
          });
        },
        onThrowComplete() {
          gsap.to(spinRef.current, { timeScale: 1, duration: 0.5 });
        },
      });

      draggableRef.current = draggable;

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
        .fromTo(spinRef.current, { timeScale: 8 }, { timeScale: 1, duration: 2.5 })
        .fromTo(wrap, { scale: 0.4, rotationX: 25 }, { scale: 1, rotationX: 0, duration: 1.5 }, "<")
        .fromTo(
          content,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, stagger: { amount: 0.6, from: "random" } },
          "<0.2"
        );

      observerRef.current = Observer.create({
        target: window,
        type: "wheel,scroll,touch",
        onChangeY: (self) => {
          let v = gsap.utils.clamp(-30, 30, self.velocityY * 0.008);
          spinRef.current!.timeScale(v);
          const resting = v < 0 ? -1 : 1;
          gsap.to(spinRef.current, { timeScale: resting, duration: 1.5, ease: "power2.out" });
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
      const newWidth = window.innerWidth;
      if (newWidth !== lastWidthRef.current) {
        lastWidthRef.current = newWidth;
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

  // Parallax Layers Effect
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
        scrub: 0,
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

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="min-h-[50vh] flex items-center justify-center bg-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-foreground mb-6">
            3D Carousel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Grab and spin. Scroll to accelerate. Experience immersive 3D.
          </p>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <section className="relative min-h-[120vh] bg-foreground overflow-hidden py-24">
        <div className="container mx-auto px-6 mb-12 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
            Interactive Experience
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            Explore Our Work
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
            className="relative w-0 h-0 flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {carouselImages.map((image) => (
              <div
                key={image.id}
                data-3d-carousel-panel
                className="absolute w-[280px] md:w-[350px] lg:w-[420px] aspect-[3/4] rounded-2xl overflow-hidden"
                style={{ backfaceVisibility: "hidden", boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)" }}
              >
                <div data-3d-carousel-content className="relative w-full h-full" style={{ clipPath: "inset(0%)" }}>
                  <img src={image.src} alt={image.title} className="w-full h-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-lg md:text-xl font-heading font-semibold text-white">{image.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-sm text-background/60 font-medium">Grab to spin • Scroll to accelerate</p>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-background/40 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-background/60 animate-pulse" style={{ animationDelay: "100ms" }} />
            <div className="w-2 h-2 rounded-full bg-background/40 animate-pulse" style={{ animationDelay: "200ms" }} />
          </div>
        </div>
      </section>

      {/* Parallax Layers Section */}
      <section
        ref={parallaxRef}
        data-parallax-layers
        className="relative min-h-[150vh] bg-background overflow-hidden"
      >
        {/* Layer 1 - Slowest (Background) */}
        <div
          data-parallax-layer="1"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
        </div>

        {/* Layer 2 */}
        <div
          data-parallax-layer="2"
          className="absolute inset-0 flex items-start justify-center pt-32"
        >
          <div className="grid grid-cols-3 gap-8 max-w-5xl px-6">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-talent/30 to-talent/10 backdrop-blur-sm" />
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-referrer/30 to-referrer/10 backdrop-blur-sm mt-24" />
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-brand/30 to-brand/10 backdrop-blur-sm" />
          </div>
        </div>

        {/* Layer 3 */}
        <div
          data-parallax-layer="3"
          className="absolute inset-0 flex items-center justify-center"
        >
          <div className="grid grid-cols-2 gap-12 max-w-4xl px-6">
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&auto=format&fit=crop&q=90"
                alt="Parallax Image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl mt-32">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=90"
                alt="Parallax Image 2"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Layer 4 - Fastest (Foreground Text) */}
        <div
          data-parallax-layer="4"
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="text-center max-w-4xl px-6">
            <h2 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-foreground mb-6">
              Parallax Depth
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground">
              Four layers moving at different speeds create an immersive sense of depth.
            </p>
          </div>
        </div>

        {/* Decorative elements */}
        <div data-parallax-layer="1" className="absolute top-1/4 left-10">
          <div className="w-20 h-20 rounded-full border-2 border-primary/20" />
        </div>
        <div data-parallax-layer="2" className="absolute bottom-1/3 right-16">
          <div className="w-32 h-32 rounded-full border-2 border-secondary/20" />
        </div>
        <div data-parallax-layer="3" className="absolute top-1/2 left-1/4">
          <div className="w-16 h-16 rounded-xl bg-accent/10 rotate-45" />
        </div>
      </section>

      {/* Footer spacer */}
      <section className="py-32 bg-muted/30">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-fluid-4xl font-heading font-bold text-foreground mb-8">
            Scroll Effects Complete
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Experience 3D carousel + multi-layer parallax depth in one seamless page.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Showcase;
