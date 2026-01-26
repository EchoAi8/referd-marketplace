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
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const spinRef = useRef<gsap.core.Tween | null>(null);
  const introRef = useRef<gsap.core.Timeline | null>(null);
  const draggableRef = useRef<Draggable | null>(null);
  const observerRef = useRef<Observer | null>(null);
  const lastWidthRef = useRef(window.innerWidth);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    let radius: number;

    const calcRadius = () => {
      radius = window.innerWidth * 0.5;
    };

    const destroy = () => {
      draggableRef.current?.kill();
      observerRef.current?.kill();
      spinRef.current?.kill();
      introRef.current?.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      const panels = wrap.querySelectorAll("[data-3d-carousel-panel]");
      gsap.set(panels, { clearProps: "transform" });
    };

    const create = () => {
      calcRadius();

      const panels = wrap.querySelectorAll<HTMLElement>("[data-3d-carousel-panel]");
      const content = wrap.querySelectorAll("[data-3d-carousel-content]");
      const proxy = document.createElement("div");
      const wrapProgress = gsap.utils.wrap(0, 1);
      const dragDistance = window.innerWidth * 3;
      let startProg = 0;

      // Position panels in 3D space
      panels.forEach((p) => {
        p.style.transformOrigin = `50% 50% ${-radius}px`;
      });

      // Infinite rotation of all panels
      spinRef.current = gsap.fromTo(
        panels,
        { rotationY: (i) => (i * 360) / panels.length },
        { rotationY: "-=360", duration: 30, ease: "none", repeat: -1 }
      );

      // Buffer for scrolling
      spinRef.current.progress(1000);

      const [draggable] = Draggable.create(proxy, {
        trigger: wrap,
        type: "x",
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          gsap.to(content, {
            clipPath: "inset(5%)",
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
            gsap.to(spinRef.current, { timeScale: 1, duration: 0.1 });
          }
          gsap.to(content, {
            clipPath: "inset(0%)",
            duration: 0.5,
            ease: "power4.out",
            overwrite: "auto",
          });
        },
        onThrowComplete() {
          gsap.to(spinRef.current, { timeScale: 1, duration: 0.1 });
        },
      });

      draggableRef.current = draggable;

      // Scroll-into-view animation
      introRef.current = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: "top 80%",
          end: "bottom top",
          scrub: false,
          toggleActions: "play resume play play",
        },
        defaults: { ease: "expo.inOut" },
      });

      introRef.current
        .fromTo(spinRef.current, { timeScale: 15 }, { timeScale: 1, duration: 2 })
        .fromTo(wrap, { scale: 0.5, rotation: 12 }, { scale: 1, rotation: 5, duration: 1.2 }, "<")
        .fromTo(
          content,
          { autoAlpha: 0 },
          { autoAlpha: 1, stagger: { amount: 0.8, from: "random" } },
          "<"
        );

      // While-scrolling feedback
      observerRef.current = Observer.create({
        target: window,
        type: "wheel,scroll,touch",
        onChangeY: (self) => {
          let v = gsap.utils.clamp(-60, 60, self.velocityY * 0.005);
          spinRef.current!.timeScale(v);
          const resting = v < 0 ? -1 : 1;

          gsap.fromTo(
            { value: v },
            { value: v },
            {
              value: resting,
              duration: 1.2,
              onUpdate() {
                spinRef.current!.timeScale(this.targets()[0].value);
              },
            }
          );
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
      <section className="min-h-[60vh] flex items-center justify-center bg-background">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-fluid-5xl md:text-fluid-6xl font-heading font-bold text-foreground mb-6">
            3D Carousel
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Drag, scroll, or let it spin. Experience an immersive 3D image gallery.
          </p>
        </div>
      </section>

      {/* 3D Carousel Section */}
      <section className="relative min-h-screen bg-foreground overflow-hidden py-32">
        <div className="container mx-auto px-6 mb-16 text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-background/50 mb-4">
            Interactive Experience
          </p>
          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold text-background">
            Explore Our Work
          </h2>
        </div>

        {/* Carousel Wrapper */}
        <div
          ref={wrapRef}
          data-3d-carousel-wrap
          className="relative w-full h-[60vh] flex items-center justify-center"
          style={{
            perspective: "1000px",
            perspectiveOrigin: "50% 50%",
          }}
        >
          <div
            className="relative w-full h-full flex items-center justify-center"
            style={{ transformStyle: "preserve-3d" }}
          >
            {carouselImages.map((image, index) => (
              <div
                key={image.id}
                data-3d-carousel-panel
                className="absolute w-[300px] md:w-[400px] lg:w-[500px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl"
                style={{
                  backfaceVisibility: "hidden",
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <p className="text-xl font-heading font-semibold text-white">
                      {image.title}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <p className="text-sm text-background/50">Scroll or drag to explore</p>
          <div className="w-6 h-10 rounded-full border-2 border-background/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 rounded-full bg-background/50 animate-bounce" />
          </div>
        </div>
      </section>

      {/* Additional Content Section */}
      <section className="py-32 bg-background">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-fluid-4xl font-heading font-bold text-foreground mb-8">
            Scroll to see more effects
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The carousel responds to your scroll velocity, creating a dynamic and engaging experience.
          </p>
        </div>
      </section>
    </PageLayout>
  );
};

export default Showcase;
