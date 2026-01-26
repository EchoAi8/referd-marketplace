import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import PageLayout from "@/components/layout/PageLayout";

gsap.registerPlugin(Draggable, Observer, ScrollTrigger);

const carouselImages = [
  { id: 1, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d87de67d8f1795c60d_Contemplative%20Portrait%20with%20Bucket%20Hat.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d83a1a3815a26f7bd6_Mysterious%20Urban%20Portrait.avif"
  ]},
  { id: 2, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d819cbb2dbff9b2a64_Moonlit%20Rocky%20Landscape.avif"
  ]},
  { id: 3, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8cc5908532a8fd8c6_Mysterious%20Balaclava%20Portrait.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8da35115879d4da77_Futuristic%20Mask%20Portrait.avif"
  ]},
  { id: 4, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d819cbb2dbff9b2a80_Serene%20Wheat%20Field%20Landscape.avif"
  ]},
  { id: 5, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d84ab87177abc40d52_Solitude%20in%20White.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8bcd829c22ae071e4_Mysterious%20Portrait.avif"
  ]},
  { id: 6, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8f2996c45c7f5ec3e_Modern%20House%20on%20Hillside.avif"
  ]},
  { id: 7, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d83b775bc909a4914f_Cylindrical%20Tube%20with%20Oranges.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d89daf4fb3b1b6dbcf_Contemplative%20Urban%20Portrait.avif"
  ]},
  { id: 8, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8cb1cc611680f5233_White%20Bucket%20Hat%20on%20Rocky%20Surface.avif"
  ]},
  { id: 9, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d82ea2b65ee2abfc33_Urban%20Anonymity.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d880f185d08576afa9_Futuristic%20Masked%20Individual.avif"
  ]},
  { id: 10, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d847d26653710d42aa_Regal%20Portrait%20with%20Crown.avif"
  ]},
  { id: 11, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8d7f5ef9c36c91701_Window%20View%20of%20Vibrant%20Sky.avif",
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d87b92b30ee718d99d_White%20Baseball%20Cap%20with%20Dried%20Plants.avif"
  ]},
  { id: 12, items: [
    "https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d85f8f425e2f133bba_Urban%20Chic%20Portrait.avif"
  ]},
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  useEffect(() => {
    let radius: number;
    let draggableInstance: Draggable | null = null;
    let observerInstance: Observer | null = null;
    let spin: gsap.core.Tween | null = null;
    let intro: gsap.core.Timeline | null = null;

    const wrap = wrapRef.current;
    if (!wrap) return;

    // Define the radius of your cylinder here
    const calcRadius = () => {
      radius = window.innerWidth * 0.5;
    };

    // Destroy function to reset everything on resize
    const destroy = () => {
      draggableInstance && draggableInstance.kill();
      observerInstance && observerInstance.kill();
      spin && spin.kill();
      intro && intro.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
      const panels = wrap.querySelectorAll('[data-3d-carousel-panel]');
      gsap.set(panels, { clearProps: 'transform' });
    };

    // Create function that sets the spin, drag, and rotation
    const create = () => {
      calcRadius();

      const panels = wrap.querySelectorAll<HTMLElement>('[data-3d-carousel-panel]');
      const content = wrap.querySelectorAll('[data-3d-carousel-content]');
      const proxy = document.createElement('div');
      const wrapProgress = gsap.utils.wrap(0, 1);
      const dragDistance = window.innerWidth * 3; // Control the snapiness on drag
      let startProg = 0;

      // Position panels in 3D space
      panels.forEach(p => {
        p.style.transformOrigin = `50% 50% ${-radius}px`;
      });

      // Infinite rotation of all panels
      spin = gsap.fromTo(
        panels,
        { rotationY: (i: number) => (i * 360) / panels.length },
        { rotationY: '-=360', duration: 30, ease: 'none', repeat: -1 }
      );

      // cheeky workaround to create some 'buffer' when scrolling back up
      spin.progress(1000);

      const [draggable] = Draggable.create(proxy, {
        trigger: wrap,
        type: 'x',
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          // Subtle feedback on touch/mousedown of the wrap
          gsap.to(content, {
            clipPath: 'inset(5%)',
            duration: 0.3,
            ease: 'power4.out',
            overwrite: 'auto'
          });
          // Stop automatic spinning to prepare for drag
          gsap.killTweensOf(spin);
          spin!.timeScale(0);
          startProg = spin!.progress();
        },
        onDrag() {
          const p = startProg + (this.startX - this.x) / dragDistance;
          spin!.progress(wrapProgress(p));
        },
        onThrowUpdate() {
          const p = startProg + (this.startX - this.x) / dragDistance;
          spin!.progress(wrapProgress(p));
        },
        onRelease() {
          if (!this.tween || !this.tween.isActive()) {
            gsap.to(spin, { timeScale: 1, duration: 0.1 });
          }
          gsap.to(content, {
            clipPath: 'inset(0%)',
            duration: 0.5,
            ease: 'power4.out',
            overwrite: 'auto'
          });
        },
        onThrowComplete() {
          gsap.to(spin, { timeScale: 1, duration: 0.1 });
        }
      });
      draggableInstance = draggable;

      // Scroll-into-view animation
      intro = gsap.timeline({
        scrollTrigger: {
          trigger: wrap,
          start: 'top 80%',
          end: 'bottom top',
          scrub: false,
          toggleActions: 'play resume play play'
        },
        defaults: { ease: 'expo.inOut' }
      });
      intro
        .fromTo(spin, { timeScale: 15 }, { timeScale: 1, duration: 2 })
        .fromTo(wrap, { scale: 0.5, rotation: 12 }, { scale: 1, rotation: 5, duration: 1.2 }, '<')
        .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, stagger: { amount: 0.8, from: 'random' } }, '<');

      // While-scrolling feedback
      observerInstance = Observer.create({
        target: window,
        type: 'wheel,scroll,touch',
        onChangeY: self => {
          // Control how much scroll speed affects the rotation on scroll
          const v = gsap.utils.clamp(-60, 60, self.velocityY * 0.005);
          spin!.timeScale(v);
          const resting = v < 0 ? -1 : 1;

          gsap.fromTo(
            { value: v },
            { value: v },
            {
              value: resting,
              duration: 1.2,
              onUpdate() {
                spin!.timeScale(this.targets()[0].value);
              }
            }
          );
        }
      });
    };

    // First create on function call
    create();

    // Debounce function to use on resize events
    const debounce = (fn: () => void, ms: number) => {
      let t: NodeJS.Timeout;
      return () => {
        clearTimeout(t);
        t = setTimeout(fn, ms);
      };
    };

    // Whenever window resizes, first destroy, then re-init it all
    const handleResize = debounce(() => {
      const newWidth = window.innerWidth;
      if (newWidth !== lastWidthRef.current) {
        lastWidthRef.current = newWidth;
        destroy();
        create();
        ScrollTrigger.refresh();
      }
    }, 200);

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroy();
    };
  }, []);

  return (
    <PageLayout>
      {/* 3D Image Carousel */}
      <div className="img-carousel__wrap">
        <div ref={wrapRef} data-3d-carousel-wrap="" className="img-carousel__list">
          {carouselImages.map((panel, panelIndex) => (
            <div 
              key={panel.id} 
              data-3d-carousel-panel="" 
              className={`img-carousel__panel ${panel.items.length === 1 ? 'img-carousel__panel--single' : ''}`}
            >
              {panel.items.map((src, itemIndex) => (
                <div key={itemIndex} data-3d-carousel-content="" className="img-carousel__item">
                  <img src={src} alt="" className="img-carousel__img" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .img-carousel__wrap {
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          display: flex;
          background: hsl(var(--foreground));
        }

        .img-carousel__list {
          z-index: 1;
          perspective: 90vw;
          perspective-origin: 50%;
          transform-style: preserve-3d;
          justify-content: center;
          align-items: center;
          width: 80vw;
          height: 50vw;
          margin-left: auto;
          margin-right: auto;
          font-size: 1vw;
          display: flex;
          position: relative;
        }

        .img-carousel__panel {
          z-index: 0;
          flex-direction: column;
          flex: none;
          justify-content: space-between;
          align-items: stretch;
          width: 13em;
          height: 39em;
          display: flex;
          position: absolute;
        }

        .img-carousel__panel:nth-of-type(even) {
          justify-content: center;
        }

        .img-carousel__panel--single {
          justify-content: center;
        }

        .img-carousel__item {
          aspect-ratio: 1;
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .img-carousel__img {
          object-fit: cover;
          width: 100%;
          max-width: none;
          height: 100%;
          position: absolute;
          inset: 0%;
        }
      `}</style>
    </PageLayout>
  );
};

export default Showcase;
