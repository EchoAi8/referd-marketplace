import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ShowcaseTalentCard from "./ShowcaseTalentCard";
import ReferdBrandingCard from "./ReferdBrandingCard";
import VideoShowcaseCard from "./VideoShowcaseCard";

gsap.registerPlugin(Draggable, Observer, ScrollTrigger);

interface TalentItem {
  name: string;
  role: string;
  company: string;
  image: string;
  verified: boolean;
  topReferrer: boolean;
  skills: string[];
}

interface CarouselPanel {
  id: number;
  type?: "branding" | "video";
  items?: TalentItem[];
  videoSrc?: string;
  title?: string;
  subtitle?: string;
}

interface HeroCarousel3DProps {
  panels: CarouselPanel[];
  layer?: "front" | "mid" | "back";
  speedMultiplier?: number;
  radiusMultiplier?: number;
}

const HeroCarousel3D = ({ 
  panels, 
  layer = "front",
  speedMultiplier = 1,
  radiusMultiplier = 1
}: HeroCarousel3DProps) => {
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

    const calcRadius = () => {
      radius = window.innerWidth * 0.55 * radiusMultiplier;
    };

    const destroy = () => {
      draggableInstance?.kill();
      observerInstance?.kill();
      spin?.kill();
      intro?.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === wrap) st.kill();
      });
      const carouselPanels = wrap.querySelectorAll('[data-3d-carousel-panel]');
      gsap.set(carouselPanels, { clearProps: 'transform' });
    };

    const create = () => {
      calcRadius();

      const carouselPanels = wrap.querySelectorAll<HTMLElement>('[data-3d-carousel-panel]');
      const content = wrap.querySelectorAll('[data-3d-carousel-content]');
      const proxy = document.createElement('div');
      const wrapProgress = gsap.utils.wrap(0, 1);
      const dragDistance = window.innerWidth * 3;
      let startProg = 0;

      // Scale based on layer for depth effect
      const layerScale = layer === "front" ? 1 : layer === "mid" ? 0.7 : 0.5;

      carouselPanels.forEach(p => {
        p.style.transformOrigin = `50% 50% ${-radius}px`;
      });

      const baseDuration = 35 / speedMultiplier;
      spin = gsap.fromTo(
        carouselPanels,
        { rotationY: (i: number) => (i * 360) / carouselPanels.length, scale: layerScale },
        { rotationY: '-=360', scale: layerScale, duration: baseDuration, ease: 'none', repeat: -1 }
      );

      spin.progress(1000);

      // Only enable dragging on front layer
      if (layer === "front") {
        const [draggable] = Draggable.create(proxy, {
          trigger: wrap,
          type: 'x',
          inertia: true,
          allowNativeTouchScrolling: true,
          onPress() {
            gsap.to(content, {
              clipPath: 'inset(5%)',
              duration: 0.3,
              ease: 'power4.out',
              overwrite: 'auto'
            });
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
      }

      // Only create ScrollTrigger intro on front layer to prevent multiple triggers
      if (layer === "front") {
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
          .fromTo(wrap, { scale: 0.5, rotation: 5 }, { scale: 1, rotation: 5, duration: 1.2 }, '<')
          .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, stagger: { amount: 0.8, from: 'random' } }, '<');
      } else {
        // For mid/back layers, just fade in the content without ScrollTrigger
        gsap.fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, duration: 1.5, delay: 0.5 });
      }

      // Only create scroll-velocity Observer on front layer to prevent competing animations
      if (layer === "front") {
        observerInstance = Observer.create({
          target: window,
          type: 'wheel,scroll,touch',
          onChangeY: self => {
            const v = gsap.utils.clamp(-60, 60, self.velocityY * 0.005);
            spin!.timeScale(v * speedMultiplier);
            const resting = (v < 0 ? -1 : 1) * speedMultiplier;

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
      }
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

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      destroy();
    };
  }, [layer, speedMultiplier, radiusMultiplier]);

  const layerClass = `img-carousel__wrap img-carousel__wrap--${layer}`;

  return (
    <div className={layerClass}>
      <div ref={wrapRef} data-3d-carousel-wrap="" className="img-carousel__list">
        {panels.map((panel) => (
          <div 
            key={panel.id} 
            data-3d-carousel-panel="" 
            className="img-carousel__panel"
          >
            {panel.type === 'branding' ? (
              <div data-3d-carousel-content="" className="img-carousel__item">
                <ReferdBrandingCard />
              </div>
            ) : panel.type === 'video' ? (
              <div data-3d-carousel-content="" className="img-carousel__item">
                <VideoShowcaseCard 
                  videoSrc={panel.videoSrc}
                  title={panel.title}
                  subtitle={panel.subtitle}
                />
              </div>
            ) : panel.items ? (
              panel.items.map((talent, itemIndex) => (
                <div key={itemIndex} data-3d-carousel-content="" className="img-carousel__item">
                  <ShowcaseTalentCard
                    name={talent.name}
                    role={talent.role}
                    company={talent.company}
                    image={talent.image}
                    verified={talent.verified}
                    topReferrer={talent.topReferrer}
                    skills={talent.skills}
                  />
                </div>
              ))
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel3D;
