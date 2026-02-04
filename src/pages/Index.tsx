import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import ShowcaseTalentCard from "@/components/showcase/ShowcaseTalentCard";
import ReferdBrandingCard from "@/components/showcase/ReferdBrandingCard";
import HeroCarouselCTAs from "@/components/showcase/HeroCarouselCTAs";

gsap.registerPlugin(Draggable, Observer, ScrollTrigger);

// Referd talent data for the 3D carousel
const carouselTalent = [
  { id: 1, items: [
    { name: "Sarah Chen", role: "Senior Product Designer", company: "Stripe", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Design", "Figma"] },
  ]},
  { id: 2, items: [
    { name: "Marcus Johnson", role: "Engineering Manager", company: "Vercel", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["React", "TypeScript"] },
  ]},
  { id: 3, type: "branding" }, // Referd Branding Card
  { id: 4, items: [
    { name: "Elena Rodriguez", role: "VP of Marketing", company: "Notion", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Growth Marketing", "Brand"] },
  ]},
  { id: 5, items: [
    { name: "David Kim", role: "Principal Data Scientist", company: "OpenAI", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Machine Learning", "Python"] },
  ]},
  { id: 6, items: [
    { name: "Aisha Patel", role: "Chief People Officer", company: "Canva", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["People Ops", "Culture"] },
  ]},
  { id: 7, items: [
    { name: "James Wright", role: "Head of Sales", company: "Stripe", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Enterprise Sales", "SaaS"] },
  ]},
  { id: 8, items: [
    { name: "Nina Kowalski", role: "Brand Strategist", company: "Airbnb", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Branding", "Strategy"] },
  ]},
  { id: 9, items: [
    { name: "Alex Turner", role: "Tech Lead", company: "Figma", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["React", "Architecture"] },
  ]},
  { id: 10, items: [
    { name: "Sofia Garcia", role: "UX Researcher", company: "Google", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["User Research", "Insights"] },
  ]},
  { id: 11, items: [
    { name: "Michael Chang", role: "Full Stack Dev", company: "Meta", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Node.js", "GraphQL"] },
  ]},
  { id: 12, items: [
    { name: "Emma Thompson", role: "Product Manager", company: "Spotify", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Strategy", "Agile"] },
  ]},
];

const Index = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  // 3D Carousel Effect
  useEffect(() => {
    let radius: number;
    let draggableInstance: Draggable | null = null;
    let observerInstance: Observer | null = null;
    let spin: gsap.core.Tween | null = null;
    let intro: gsap.core.Timeline | null = null;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const calcRadius = () => {
      radius = window.innerWidth * 0.55;
    };

    const destroy = () => {
      draggableInstance && draggableInstance.kill();
      observerInstance && observerInstance.kill();
      spin && spin.kill();
      intro && intro.kill();
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === wrap) st.kill();
      });
      const panels = wrap.querySelectorAll('[data-3d-carousel-panel]');
      gsap.set(panels, { clearProps: 'transform' });
    };

    const create = () => {
      calcRadius();

      const panels = wrap.querySelectorAll<HTMLElement>('[data-3d-carousel-panel]');
      const content = wrap.querySelectorAll('[data-3d-carousel-content]');
      const proxy = document.createElement('div');
      const wrapProgress = gsap.utils.wrap(0, 1);
      const dragDistance = window.innerWidth * 3;
      let startProg = 0;

      panels.forEach(p => {
        p.style.transformOrigin = `50% 50% ${-radius}px`;
      });

      spin = gsap.fromTo(
        panels,
        { rotationY: (i: number) => (i * 360) / panels.length },
        { rotationY: '-=360', duration: 35, ease: 'none', repeat: -1 }
      );

      spin.progress(1000);

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

      observerInstance = Observer.create({
        target: window,
        type: 'wheel,scroll,touch',
        onChangeY: self => {
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
  }, []);

  return (
    <>
      <GridOverlay key="home-grid" />
      <PageTransition>
        <div className="min-h-screen bg-foreground">
          <TwoStepNavigation />

          <div className="menu-vignette" aria-hidden="true" />

          <div className="site-shell">
            <main>
              {/* Hero 3D Carousel Section */}
              <section className="hero-carousel-section">
                {/* 3D Talent Carousel */}
                <div className="img-carousel__wrap">
                  <div ref={wrapRef} data-3d-carousel-wrap="" className="img-carousel__list">
                    {carouselTalent.map((panel) => (
                      <div 
                        key={panel.id} 
                        data-3d-carousel-panel="" 
                        className="img-carousel__panel img-carousel__panel--single"
                      >
                        {'type' in panel && panel.type === 'branding' ? (
                          <div data-3d-carousel-content="" className="img-carousel__item">
                            <ReferdBrandingCard />
                          </div>
                        ) : 'items' in panel && panel.items ? (
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

                {/* CTAs */}
                <HeroCarouselCTAs />
              </section>
            </main>

            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
