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
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const lastWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    let radius: number;

    const calcRadius = () => {
      // Larger radius for better 3D effect
      radius = Math.max(window.innerWidth * 0.6, 400);
    };

    const destroy = () => {
      draggableRef.current?.kill();
      observerRef.current?.kill();
      spinRef.current?.kill();
      introRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
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
      const dragDistance = window.innerWidth * 2; // More responsive drag
      let startProg = 0;
      const numPanels = panels.length;
      const angleIncrement = 360 / numPanels;

      // Position each panel in 3D space around a cylinder
      panels.forEach((panel, i) => {
        const angle = i * angleIncrement;
        gsap.set(panel, {
          rotationY: angle,
          transformOrigin: `50% 50% ${-radius}px`,
        });
      });

      // Infinite rotation of the entire list container
      spinRef.current = gsap.to(list, {
        rotationY: "-=360",
        duration: 25,
        ease: "none",
        repeat: -1,
      });

      // Start with some progress for buffer
      spinRef.current.progress(0.5);

      const [draggable] = Draggable.create(proxy, {
        trigger: wrap,
        type: "x",
        inertia: true,
        allowNativeTouchScrolling: false,
        onPress() {
          // Visual feedback on grab
          gsap.to(content, {
            clipPath: "inset(3%)",
            scale: 0.98,
            duration: 0.3,
            ease: "power4.out",
            overwrite: "auto",
          });
          // Stop auto-spin
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

      // Scroll-into-view intro animation
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
        .fromTo(
          wrap,
          { scale: 0.4, rotationX: 25 },
          { scale: 1, rotationX: 0, duration: 1.5 },
          "<"
        )
        .fromTo(
          content,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, stagger: { amount: 0.6, from: "random" } },
          "<0.2"
        );

      // Scroll velocity affects spin speed
      observerRef.current = Observer.create({
        target: window,
        type: "wheel,scroll,touch",
        onChangeY: (self) => {
          let v = gsap.utils.clamp(-30, 30, self.velocityY * 0.008);
          spinRef.current!.timeScale(v);
          const resting = v < 0 ? -1 : 1;

          gsap.to(spinRef.current, {
            timeScale: resting,
            duration: 1.5,
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

        {/* Carousel Wrapper with perspective */}
        <div
          ref={wrapRef}
          data-3d-carousel-wrap
          className="relative w-full h-[70vh] flex items-center justify-center cursor-grab active:cursor-grabbing"
          style={{
            perspective: "1200px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          {/* Rotating container */}
          <div
            ref={listRef}
            className="relative w-0 h-0 flex items-center justify-center"
            style={{
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

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
          <p className="text-sm text-background/60 font-medium">
            Grab to spin • Scroll to accelerate
          </p>
          <div className="flex gap-2">
            <div className="w-2 h-2 rounded-full bg-background/40 animate-pulse" />
            <div className="w-2 h-2 rounded-full bg-background/60 animate-pulse delay-100" />
            <div className="w-2 h-2 rounded-full bg-background/40 animate-pulse delay-200" />
          </div>
        </div>
      </section>

      {/* Spacer for scroll effect */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-fluid-4xl font-heading font-bold text-foreground mb-8">
            Keep scrolling
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The carousel responds to scroll velocity for a dynamic experience.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Showcase;
