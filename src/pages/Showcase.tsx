import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import ShowcaseTalentCard from "@/components/showcase/ShowcaseTalentCard";

gsap.registerPlugin(Draggable, Observer, ScrollTrigger);

// Referd talent data for the 3D carousel
const carouselTalent = [
  { id: 1, items: [
    { name: "Sarah Chen", role: "Senior Product Designer", company: "Stripe", location: "San Francisco", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Design", "Figma", "Design Systems"], connections: 847, endorsements: 156, responseTime: "< 2hrs" },
    { name: "Marcus Johnson", role: "Engineering Manager", company: "Vercel", location: "Brooklyn, NY", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["React", "TypeScript", "Next.js"], connections: 2340, endorsements: 423, responseTime: "< 4hrs" },
  ]},
  { id: 2, items: [
    { name: "Elena Rodriguez", role: "VP of Marketing", company: "Notion", location: "Austin, TX", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Growth Marketing", "Brand Strategy"], connections: 1560, endorsements: 287, responseTime: "< 1hr" },
  ]},
  { id: 3, items: [
    { name: "David Kim", role: "Principal Data Scientist", company: "OpenAI", location: "Seattle, WA", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Machine Learning", "Python", "TensorFlow"], connections: 923, endorsements: 198, responseTime: "< 6hrs" },
    { name: "Aisha Patel", role: "Chief People Officer", company: "Canva", location: "London, UK", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["People Ops", "Culture", "DEI"], connections: 1890, endorsements: 342, responseTime: "< 3hrs" },
  ]},
  { id: 4, items: [
    { name: "James Wright", role: "Head of Sales", company: "Stripe", location: "Chicago, IL", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Enterprise Sales", "SaaS"], connections: 3420, endorsements: 521, responseTime: "< 1hr" },
  ]},
  { id: 5, items: [
    { name: "Nina Kowalski", role: "Brand Strategist", company: "Airbnb", location: "Miami, FL", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Branding", "Strategy"], connections: 1120, endorsements: 234, responseTime: "< 2hrs" },
    { name: "Alex Turner", role: "Tech Lead", company: "Figma", location: "Portland, OR", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["React", "Architecture"], connections: 1890, endorsements: 312, responseTime: "< 3hrs" },
  ]},
  { id: 6, items: [
    { name: "Sofia Garcia", role: "UX Researcher", company: "Google", location: "NYC", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["User Research", "Insights"], connections: 780, endorsements: 145, responseTime: "< 4hrs" },
  ]},
  { id: 7, items: [
    { name: "Michael Chang", role: "Full Stack Dev", company: "Meta", location: "Menlo Park", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Node.js", "React", "GraphQL"], connections: 2100, endorsements: 389, responseTime: "< 2hrs" },
    { name: "Emma Thompson", role: "Product Manager", company: "Spotify", location: "Stockholm", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Strategy", "Agile"], connections: 1340, endorsements: 267, responseTime: "< 3hrs" },
  ]},
  { id: 8, items: [
    { name: "Carlos Mendez", role: "DevOps Engineer", company: "AWS", location: "Seattle", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Kubernetes", "Docker", "CI/CD"], connections: 1560, endorsements: 298, responseTime: "< 5hrs" },
  ]},
  { id: 9, items: [
    { name: "Mei Lin", role: "Creative Director", company: "Apple", location: "Cupertino", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Creative", "Design Leadership"], connections: 2890, endorsements: 567, responseTime: "< 1hr" },
    { name: "Jordan Blake", role: "Solutions Architect", company: "Salesforce", location: "Denver", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Cloud", "Enterprise"], connections: 1780, endorsements: 345, responseTime: "< 4hrs" },
  ]},
  { id: 10, items: [
    { name: "Priya Sharma", role: "Growth Lead", company: "Uber", location: "San Francisco", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Growth", "Analytics"], connections: 2340, endorsements: 412, responseTime: "< 2hrs" },
  ]},
  { id: 11, items: [
    { name: "Ryan O'Connor", role: "Frontend Developer", company: "Netflix", location: "Los Angeles", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["JavaScript", "CSS"], connections: 1120, endorsements: 189, responseTime: "< 3hrs" },
    { name: "Lena Müller", role: "Data Analyst", company: "Shopify", location: "Toronto", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["SQL", "Tableau"], connections: 890, endorsements: 156, responseTime: "< 4hrs" },
  ]},
  { id: 12, items: [
    { name: "Tom Anderson", role: "Backend Engineer", company: "Slack", location: "San Francisco", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Go", "Microservices"], connections: 1670, endorsements: 278, responseTime: "< 2hrs" },
  ]},
];

const crispSlideImages = [
  'https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d87de67d8f1795c60d_Contemplative%20Portrait%20with%20Bucket%20Hat.avif',
  'https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d819cbb2dbff9b2a64_Moonlit%20Rocky%20Landscape.avif',
  'https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8cc5908532a8fd8c6_Mysterious%20Balaclava%20Portrait.avif',
  'https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d819cbb2dbff9b2a80_Serene%20Wheat%20Field%20Landscape.avif',
  'https://cdn.prod.website-files.com/689201b6fcd75d4e39c1bf42/689204d8f2996c45c7f5ec3e_Modern%20House%20on%20Hillside.avif',
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrambleLoadRef = useRef<HTMLHeadingElement>(null);
  const scrambleScrollRef = useRef<HTMLHeadingElement>(null);
  const scrambleAltRef = useRef<HTMLHeadingElement>(null);
  const scrambleHoverRef = useRef<HTMLAnchorElement>(null);
  const crispHeaderRef = useRef<HTMLDivElement>(null);
  const [crispCurrentSlide, setCrispCurrentSlide] = useState(0);
  const [crispIsLoading, setCrispIsLoading] = useState(true);
  const crispAutoplayTimerRef = useRef<number | null>(null);
  const crispPausedRef = useRef(false);
  const crispAnimatingRef = useRef(false);
  const footerParallaxRef = useRef<HTMLDivElement>(null);
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
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === wrap) st.kill();
      });
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

  // Parallax Layers Effect
  useEffect(() => {
    const triggerElement = parallaxRef.current;
    if (!triggerElement) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start: "0% 0%",
        end: "100% 0%",
        scrub: 0
      }
    });

    const layers = [
      { layer: "1", yPercent: 70 },
      { layer: "2", yPercent: 55 },
      { layer: "3", yPercent: 40 },
      { layer: "4", yPercent: 10 }
    ];

    layers.forEach((layerObj, idx) => {
      tl.to(
        triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
        {
          yPercent: layerObj.yPercent,
          ease: "none"
        },
        idx === 0 ? undefined : "<"
      );
    });

    return () => {
      tl.kill();
    };
  }, []);

  // Scramble Text Effect - Custom implementation (ScrambleTextPlugin & SplitText are paid GSAP plugins)
  useEffect(() => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const altChars = '▯|◊∆';

    const scrambleText = (
      element: HTMLElement | null, 
      finalText: string, 
      duration: number = 1200, 
      charSet: string = chars
    ) => {
      if (!element) return;
      
      const length = finalText.length;
      const startTime = Date.now();
      
      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        let result = '';
        for (let i = 0; i < length; i++) {
          if (finalText[i] === ' ' || finalText[i] === '\n') {
            result += finalText[i];
          } else if (progress > (i / length) * 0.8) {
            result += finalText[i];
          } else {
            result += charSet[Math.floor(Math.random() * charSet.length)];
          }
        }
        
        element.textContent = result;
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          element.textContent = finalText;
        }
      };
      
      animate();
    };

    // Scramble on load
    if (scrambleLoadRef.current) {
      const text = scrambleLoadRef.current.getAttribute('data-original-text') || scrambleLoadRef.current.textContent || '';
      scrambleLoadRef.current.setAttribute('data-original-text', text);
      scrambleText(scrambleLoadRef.current, text, 1200, chars);
    }

    // Scramble on scroll
    const scrollTargets = [
      { ref: scrambleScrollRef.current, alt: false },
      { ref: scrambleAltRef.current, alt: true }
    ];

    scrollTargets.forEach(({ ref, alt }) => {
      if (!ref) return;
      
      const text = ref.getAttribute('data-original-text') || ref.textContent || '';
      ref.setAttribute('data-original-text', text);
      ref.textContent = '';
      
      ScrollTrigger.create({
        trigger: ref,
        start: 'top bottom',
        once: true,
        onEnter: () => {
          scrambleText(ref, text, 1400, alt ? altChars : chars);
        }
      });
    });

    // Scramble on hover
    const hoverEl = scrambleHoverRef.current;
    if (hoverEl) {
      const textEl = hoverEl.querySelector('[data-scramble-hover="target"]') as HTMLElement;
      if (textEl) {
        const originalText = textEl.textContent || '';
        const customHoverText = textEl.getAttribute('data-scramble-text') || originalText;
        
        hoverEl.addEventListener('mouseenter', () => {
          scrambleText(textEl, customHoverText, 1000, '◊▯∆|');
        });
        
        hoverEl.addEventListener('mouseleave', () => {
          scrambleText(textEl, originalText, 600, '◊▯∆');
        });
      }
    }
  }, []);

  // Crisp Loading Animation Effect
  useEffect(() => {
    const container = crispHeaderRef.current;
    if (!container) return;

    // Ensure we always start in loading state when entering /showcase
    setCrispIsLoading(true);

    // In the original effect, the moving "mini squares" are the direct children of the groups
    // (each .crisp-loader__single). We animate those, not the group wrappers.
    const revealImages = container.querySelectorAll<HTMLElement>('.crisp-loader__group > *');
    const isScaleUp = container.querySelectorAll<HTMLElement>('.crisp-loader__media.is--scaling');
    const isScaleDown = container.querySelectorAll<HTMLElement>('.crisp-loader__cover-img.is--scale-down');
    const isRadius = container.querySelectorAll<HTMLElement>('.crisp-loader__media.is--scaling.is--radius');
    const heading = container.querySelector<HTMLElement>('.crisp-header__h1');
    const smallElements = container.querySelectorAll<HTMLElement>('.crisp-header__top, .crisp-header__p');
    const sliderNav = container.querySelectorAll<HTMLElement>('.crisp-header__slider-nav > *');

    const tl = gsap.timeline({
      defaults: { ease: "expo.inOut" },
      onStart: () => {
        container.classList.remove('is--hidden');
      }
    });

    // Animate images scrolling through (mini tiles)
    if (revealImages.length) {
      tl.fromTo(
        revealImages,
        { xPercent: 500 },
        { xPercent: -500, duration: 2.5, stagger: 0.05 }
      );
    }

    // Scale down the images inside
    if (isScaleDown.length) {
      tl.to(isScaleDown, {
        scale: 0.5,
        duration: 2,
        stagger: { each: 0.05, from: "edges", ease: "none" },
        onComplete: () => {
          // Remove radius class after scale animation
          isRadius.forEach(el => el.classList.remove('is--radius'));
        }
      }, "-=0.1");
    }

    // Scale up loader media to full screen
    if (isScaleUp.length) {
      tl.fromTo(isScaleUp, 
        { width: "10em", height: "10em" }, 
        { width: "100vw", height: "100dvh", duration: 2 }
      , "< 0.5");
    }

    // Reveal slider nav
    if (sliderNav.length) {
      tl.from(sliderNav, {
        yPercent: 150,
        stagger: 0.05,
        ease: "expo.out",
        duration: 1
      }, "-=0.9");
    }

    // Reveal heading words
    if (heading) {
      const words = heading.querySelectorAll<HTMLElement>('.crisp-word');
      if (words.length) {
        gsap.set(words, { yPercent: 110 });
        tl.to(words, {
          yPercent: 0,
          stagger: 0.075,
          ease: "expo.out",
          duration: 1
        }, "< 0.1");
      }
    }

    // Fade in small elements
    if (smallElements.length) {
      tl.from(smallElements, {
        opacity: 0,
        ease: "power1.inOut",
        duration: 0.2
      }, "< 0.15");
    }

    // Remove loading state
    tl.call(() => {
      setCrispIsLoading(false);
    }, undefined, "+=0.45");

    return () => {
      tl.kill();
    };
  }, []);

  // Crisp Slideshow navigation
  const navigateCrispSlide = (direction: number, targetIndex?: number) => {
    if (crispAnimatingRef.current) return;

    const newIndex = targetIndex !== undefined 
      ? targetIndex 
      : direction === 1 
        ? (crispCurrentSlide < crispSlideImages.length - 1 ? crispCurrentSlide + 1 : 0)
        : (crispCurrentSlide > 0 ? crispCurrentSlide - 1 : crispSlideImages.length - 1);
    
    const slides = crispHeaderRef.current?.querySelectorAll<HTMLElement>('[data-slideshow="slide"]');
    const inner = crispHeaderRef.current?.querySelectorAll<HTMLElement>('[data-slideshow="parallax"]');
    
    if (!slides || !inner) return;

    const currentSlide = slides[crispCurrentSlide];
    const currentInner = inner[crispCurrentSlide];
    const upcomingSlide = slides[newIndex];
    const upcomingInner = inner[newIndex];

    crispAnimatingRef.current = true;

    gsap.timeline({
      defaults: { duration: 1.5, ease: "power3.inOut" },
      onStart: () => {
        upcomingSlide.classList.add('is--current');
      },
      onComplete: () => {
        currentSlide.classList.remove('is--current');
        setCrispCurrentSlide(newIndex);
        crispAnimatingRef.current = false;
      }
    })
      .to(currentSlide, { xPercent: -direction * 100 }, 0)
      .to(currentInner, { xPercent: direction * 75 }, 0)
      .fromTo(upcomingSlide, { xPercent: direction * 100 }, { xPercent: 0 }, 0)
      .fromTo(upcomingInner, { xPercent: -direction * 75 }, { xPercent: 0 }, 0);
  };

  // Crisp Slideshow autoplay (starts after the loading animation completes)
  useEffect(() => {
    const root = crispHeaderRef.current;
    if (!root) return;
    if (crispIsLoading) return;

    const clear = () => {
      if (crispAutoplayTimerRef.current) {
        window.clearInterval(crispAutoplayTimerRef.current);
        crispAutoplayTimerRef.current = null;
      }
    };

    const start = () => {
      clear();
      crispAutoplayTimerRef.current = window.setInterval(() => {
        if (crispPausedRef.current) return;
        navigateCrispSlide(1);
      }, 5000); // 4–6s target; using 5s default
    };

    const onEnter = () => {
      crispPausedRef.current = true;
    };
    const onLeave = () => {
      crispPausedRef.current = false;
    };

    root.addEventListener('mouseenter', onEnter);
    root.addEventListener('mouseleave', onLeave);

    start();
    return () => {
      root.removeEventListener('mouseenter', onEnter);
      root.removeEventListener('mouseleave', onLeave);
      clear();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [crispIsLoading, crispCurrentSlide]);

  // Footer Parallax Effect
  useEffect(() => {
    const el = footerParallaxRef.current;
    if (!el) return;

    const inner = el.querySelector('[data-footer-parallax-inner]');
    const dark = el.querySelector('[data-footer-parallax-dark]');

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'clamp(top bottom)',
        end: 'clamp(top top)',
        scrub: true
      }
    });

    if (inner) {
      tl.from(inner, {
        yPercent: -25,
        ease: 'linear'
      });
    }

    if (dark) {
      tl.from(dark, {
        opacity: 0.5,
        ease: 'linear'
      }, '<');
    }

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <TwoStepNavigation />
      {/* 3D Talent Carousel */}
      <div className="img-carousel__wrap">
        <div ref={wrapRef} data-3d-carousel-wrap="" className="img-carousel__list">
          {carouselTalent.map((panel) => (
            <div 
              key={panel.id} 
              data-3d-carousel-panel="" 
              className={`img-carousel__panel ${panel.items.length === 1 ? 'img-carousel__panel--single' : ''}`}
            >
              {panel.items.map((talent, itemIndex) => (
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
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Parallax Layers */}
      <div className="parallax">
        <section className="parallax__header">
          <div className="parallax__visuals">
            <div className="parallax__black-line-overflow"></div>
            <div ref={parallaxRef} data-parallax-layers className="parallax__layers">
              <img 
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795be09b462b2e8ebf71_osmo-parallax-layer-3.webp" 
                loading="eager" 
                width="800" 
                data-parallax-layer="1" 
                alt="" 
                className="parallax__layer-img"
              />
              <img 
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795b4d5ac529e7d3a562_osmo-parallax-layer-2.webp" 
                loading="eager" 
                width="800" 
                data-parallax-layer="2" 
                alt="" 
                className="parallax__layer-img"
              />
              <div data-parallax-layer="3" className="parallax__layer-title">
                <h2 className="parallax__title">Parallax</h2>
              </div>
              <img 
                src="https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/6717795bb5aceca85011ad83_osmo-parallax-layer-1.webp" 
                loading="eager" 
                width="800" 
                data-parallax-layer="4" 
                alt="" 
                className="parallax__layer-img"
              />
            </div>
            <div className="parallax__fade"></div>
          </div>
        </section>
        <section className="parallax__content">
          <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 160 160" fill="none" className="osmo-icon-svg">
            <path d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z" fill="currentColor"></path>
          </svg>
        </section>
      </div>

      {/* Scramble Text Demo */}
      <div className="demo-group">
        <div className="scramble-section">
          <h1 
            ref={scrambleLoadRef}
            data-scramble="load" 
            className="scramble-heading"
          >
            This heading will reveal with a basic scrambling effect on page load
          </h1>
        </div>
        <div className="scramble-section u--bg-light">
          <h2 
            ref={scrambleScrollRef}
            data-scramble="scroll" 
            className="scramble-heading"
          >
            this is an example of a heading that is triggered by a scrolltrigger
          </h2>
        </div>
        <div className="scramble-section">
          <h2 
            ref={scrambleAltRef}
            data-scramble-alt="" 
            data-scramble="scroll" 
            className="scramble-heading"
          >
            You can even control the characters that are used during scramble
          </h2>
        </div>
        <div className="scramble-section u--bg-light">
          <h2 className="scramble-heading">and here's how to work with scramble text on hover:</h2>
          <a 
            ref={scrambleHoverRef}
            data-scramble-hover="link" 
            href="#" 
            className="scramble-button"
            onClick={(e) => e.preventDefault()}
          >
            <p 
              data-scramble-text="this text can be custom too" 
              data-scramble-hover="target" 
              className="scramble-button-text"
            >
              How to scramble on hover
            </p>
          </a>
        </div>
      </div>

      {/* Crisp Loading Animation */}
      <div 
        ref={crispHeaderRef} 
        className={`crisp-header ${crispIsLoading ? 'is--loading' : ''}`}
      >
        {/* Loader */}
        <div className="crisp-loader">
          <div className="crisp-loader__wrap">
            <div className="crisp-loader__groups">
              <div className="crisp-loader__group is--relative">
                {crispSlideImages.map((src, i) => (
                  <div key={i} className="crisp-loader__single">
                    <div className="crisp-loader__media is--scaling is--radius">
                      <img src={src} alt="" className="crisp-loader__cover-img is--scale-down" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="crisp-loader__group is--duplicate">
                {crispSlideImages.map((src, i) => (
                  <div key={`dup-${i}`} className="crisp-loader__single">
                    <div className="crisp-loader__media is--scaling is--radius">
                      <img src={src} alt="" className="crisp-loader__cover-img is--scale-down" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="crisp-loader__fade" />
            <div className="crisp-loader__fade is--duplicate" />
          </div>
        </div>

        {/* Slider */}
        <div className="crisp-header__slider" data-slideshow="wrap">
          <div className="crisp-header__slider-list">
            {crispSlideImages.map((src, index) => (
              <div 
                key={index} 
                data-slideshow="slide" 
                className={`crisp-header__slider-slide ${index === crispCurrentSlide ? 'is--current' : ''}`}
              >
                <img 
                  src={src} 
                  alt="" 
                  data-slideshow="parallax" 
                  className="crisp-header__slider-slide-inner" 
                />
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="crisp-header__content">
          <div className="crisp-header__top">
            <a href="/" className="osmo-logo">
              <span className="font-heading font-bold text-xl tracking-tight">Referd</span>
              <span className="text-[hsl(var(--sage))] text-xs align-super ml-0.5">®</span>
            </a>
            <div className="crisp-header__hamburger">
              <div className="crisp-header__hamburger-bar" />
              <div className="crisp-header__hamburger-bar" />
            </div>
          </div>

          <div className="crisp-header__center">
            <h1 className="crisp-header__h1">
              <span className="crisp-word">We</span>{' '}
              <span className="crisp-word">just</span>{' '}
              <span className="crisp-word">love</span>{' '}
              <span className="crisp-word">pixels</span>
            </h1>
          </div>

          <div className="crisp-header__bottom">
            <div className="crisp-header__slider-nav">
              {crispSlideImages.map((src, index) => (
                <button
                  key={index}
                  data-slideshow="thumb"
                  className={`crisp-header__slider-nav-btn ${index === crispCurrentSlide ? 'is--current' : ''}`}
                  onClick={() => {
                    if (index !== crispCurrentSlide) {
                      navigateCrispSlide(index > crispCurrentSlide ? 1 : -1, index);
                    }
                  }}
                >
                  <img src={src} alt="" className="crisp-loader__cover-img" />
                </button>
              ))}
            </div>
            <p className="crisp-header__p">Crisp Loading Animation</p>
          </div>
        </div>
      </div>

      {/* Footer Parallax Demo */}
      <main className="demo-main">
        <section className="demo-header">
          <div className="demo-header__nav-row">
            <div className="demo-header__logo">
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1360 164" fill="none">
                <path d="M513.618 8.42969C525.002 8.42974 535.449 10.375 544.96 14.2656C554.471 18.0123 562.756 23.4166 569.817 30.4775C577.022 37.3943 582.57 45.6077 586.461 55.1182C590.352 64.4847 592.297 74.7167 592.297 85.8125C592.297 96.9081 590.352 107.211 586.461 116.722C582.57 126.088 577.022 134.302 569.817 141.363C562.757 148.28 554.47 153.684 544.96 157.574C535.449 161.321 525.002 163.194 513.618 163.194C502.378 163.194 491.93 161.321 482.275 157.574C472.621 153.684 464.191 148.28 456.986 141.363C449.925 134.302 444.378 126.088 440.343 116.722C440.224 116.432 440.108 116.142 439.993 115.852V161.465H401.086V101.375C401.086 94.4582 401.229 88.2619 401.518 82.7861C401.806 77.1663 402.022 72.6991 402.166 69.3848C402.452 65.951 402.597 64.2218 402.599 64.1973C402.591 64.219 402.014 65.8039 400.869 68.9521C399.716 72.1223 398.203 76.3734 396.33 81.7051C394.457 86.8926 392.224 92.6568 389.63 98.9971L364.556 161.465H336.673L311.599 98.9971C309.005 92.8009 306.772 87.0367 304.898 81.7051C303.025 76.3734 301.584 72.1224 300.575 68.9521C299.571 65.7969 299.066 64.2121 299.062 64.1973C299.063 64.221 299.135 65.9503 299.278 69.3848C299.567 72.6991 299.711 77.1663 299.711 82.7861C299.855 88.2619 299.927 94.3865 299.927 101.159V161.465H261.235V135.637C260.39 137.393 259.426 139.086 258.34 140.715C253.44 147.92 246.667 153.468 238.021 157.358C229.52 161.249 219.864 163.194 209.057 163.194C196.376 163.194 185.425 160.888 176.202 156.277C166.98 151.666 159.702 145.254 154.37 137.04C151.914 133.083 149.911 128.803 148.359 124.2C144.879 130.526 140.531 136.248 135.311 141.363C128.25 148.28 119.964 153.683 110.453 157.574C100.943 161.321 90.4952 163.194 79.1113 163.194C67.8715 163.194 57.4233 161.321 47.7686 157.574C38.1141 153.684 29.6844 148.28 22.4795 141.363C15.4185 134.302 9.87077 126.088 5.83594 116.722C1.94525 107.211 4.07364e-05 96.9081 0 85.8125C0 74.7167 1.94521 64.4847 5.83594 55.1182C9.87075 45.6077 15.4187 37.3943 22.4795 30.4775C29.6845 23.4167 38.1139 18.0122 47.7686 14.2656C57.4233 10.3749 67.8715 8.42969 79.1113 8.42969C90.4952 8.42973 100.943 10.3749 110.453 14.2656C119.964 18.0123 128.25 23.4166 135.311 30.4775C142.413 37.2964 147.904 45.3762 151.786 54.7158C151.78 54.3487 151.776 53.9785 151.776 53.6055C151.776 44.5271 154.227 36.6735 159.126 30.0449C164.169 23.2722 170.798 18.0122 179.012 14.2656C187.225 10.375 196.232 8.42975 206.03 8.42969C217.702 8.42969 227.718 10.3749 236.076 14.2656C244.434 18.0122 251.063 23.4884 255.962 30.6934C258.055 33.684 259.812 36.9608 261.235 40.5225V10.1592H314.625L339.698 72.4111C342.292 78.7514 344.382 84.5873 345.967 89.9189C347.696 95.2504 348.993 99.5734 349.857 102.888C350.722 106.058 351.154 107.644 351.154 107.644C351.154 107.644 351.587 106.058 352.451 102.888C353.316 99.5734 354.613 95.2505 356.342 89.9189C358.071 84.5872 360.233 78.8233 362.827 72.627L388.116 10.1592H439.993V55.9746C440.108 55.6885 440.225 55.4027 440.343 55.1182C444.378 45.6077 449.926 37.3943 456.986 30.4775C464.191 23.4167 472.621 18.0122 482.275 14.2656C491.93 10.3749 502.378 8.42969 513.618 8.42969Z" fill="currentColor"></path>
              </svg>
            </div>
            <p data-underline-link="" className="demo-header__nav-a">Navigation</p>
          </div>
          <div className="demo-header__title-row">
            <h1 className="demo-header__h1">The footer marks the end of the scroll, but not the end of the story.</h1>
          </div>
          <div className="demo-header__info-row">
            <div className="demo-header__col">
              <p className="demo-eyebrow">( Concept )</p>
            </div>
            <div className="demo-header__col">
              <p className="demo-p">Parallax adds a sense of depth and motion that feels natural to the human eye. By shifting elements at different speeds, we create a layered world that reacts to scroll.</p>
              <p data-underline-link="" className="demo-eyebrow">Scroll down ↓</p>
            </div>
            <div className="demo-header__col">
              <img src="https://cdn.prod.website-files.com/68ecabe37c9bd7423c65df4e/68ecc45be5d83f026c6c91d5_Freshly%20Baked%20Bread.avif" loading="lazy" alt="Bread" className="demo-header__img" />
            </div>
          </div>
        </section>
        <div ref={footerParallaxRef} data-footer-parallax="" className="footer-wrap">
          <footer data-footer-parallax-inner="" className="demo-footer">
            <div className="demo-footer__links-row">
              <div className="demo-footer__col">
                <p className="demo-eyebrow">( Pages )</p>
                <div className="demo-footer__links">
                  <a data-underline-link="" href="#" className="demo-footer__a">Home</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">Resources</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">About</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">Platform</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">Login</a>
                </div>
              </div>
              <div className="demo-footer__col">
                <p className="demo-eyebrow">( Socials )</p>
                <div className="demo-footer__links">
                  <a data-underline-link="" href="#" className="demo-footer__a">LinkedIn</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">Instagram</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">X/Twitter</a>
                </div>
              </div>
              <div className="demo-footer__col">
                <p className="demo-eyebrow">( Contact )</p>
                <div className="demo-footer__links">
                  <a data-underline-link="" href="#" className="demo-footer__a">hello@osmo.supply</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">+31 6 12 34 56 78</a>
                </div>
              </div>
            </div>
            <div className="demo-footer__logo-row">
              <p className="demo-eyebrow">Not your typical platform</p>
              <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1360 164" fill="none" className="demo-footer__logo-svg">
                <path d="M513.618 8.42969C525.002 8.42974 535.449 10.375 544.96 14.2656C554.471 18.0123 562.756 23.4166 569.817 30.4775C577.022 37.3943 582.57 45.6077 586.461 55.1182C590.352 64.4847 592.297 74.7167 592.297 85.8125C592.297 96.9081 590.352 107.211 586.461 116.722C582.57 126.088 577.022 134.302 569.817 141.363C562.757 148.28 554.47 153.684 544.96 157.574C535.449 161.321 525.002 163.194 513.618 163.194C502.378 163.194 491.93 161.321 482.275 157.574C472.621 153.684 464.191 148.28 456.986 141.363C449.925 134.302 444.378 126.088 440.343 116.722C440.224 116.432 440.108 116.142 439.993 115.852V161.465H401.086V101.375C401.086 94.4582 401.229 88.2619 401.518 82.7861C401.806 77.1663 402.022 72.6991 402.166 69.3848C402.452 65.951 402.597 64.2218 402.599 64.1973C402.591 64.219 402.014 65.8039 400.869 68.9521C399.716 72.1223 398.203 76.3734 396.33 81.7051C394.457 86.8926 392.224 92.6568 389.63 98.9971L364.556 161.465H336.673L311.599 98.9971C309.005 92.8009 306.772 87.0367 304.898 81.7051C303.025 76.3734 301.584 72.1224 300.575 68.9521C299.571 65.7969 299.066 64.2121 299.062 64.1973C299.063 64.221 299.135 65.9503 299.278 69.3848C299.567 72.6991 299.711 77.1663 299.711 82.7861C299.855 88.2619 299.927 94.3865 299.927 101.159V161.465H261.235V135.637C260.39 137.393 259.426 139.086 258.34 140.715C253.44 147.92 246.667 153.468 238.021 157.358C229.52 161.249 219.864 163.194 209.057 163.194C196.376 163.194 185.425 160.888 176.202 156.277C166.98 151.666 159.702 145.254 154.37 137.04C151.914 133.083 149.911 128.803 148.359 124.2C144.879 130.526 140.531 136.248 135.311 141.363C128.25 148.28 119.964 153.683 110.453 157.574C100.943 161.321 90.4952 163.194 79.1113 163.194C67.8715 163.194 57.4233 161.321 47.7686 157.574C38.1141 153.684 29.6844 148.28 22.4795 141.363C15.4185 134.302 9.87077 126.088 5.83594 116.722C1.94525 107.211 4.07364e-05 96.9081 0 85.8125C0 74.7167 1.94521 64.4847 5.83594 55.1182C9.87075 45.6077 15.4187 37.3943 22.4795 30.4775C29.6845 23.4167 38.1139 18.0122 47.7686 14.2656C57.4233 10.3749 67.8715 8.42969 79.1113 8.42969C90.4952 8.42973 100.943 10.3749 110.453 14.2656C119.964 18.0123 128.25 23.4166 135.311 30.4775C142.413 37.2964 147.904 45.3762 151.786 54.7158C151.78 54.3487 151.776 53.9785 151.776 53.6055C151.776 44.5271 154.227 36.6735 159.126 30.0449C164.169 23.2722 170.798 18.0122 179.012 14.2656C187.225 10.375 196.232 8.42975 206.03 8.42969C217.702 8.42969 227.718 10.3749 236.076 14.2656C244.434 18.0122 251.063 23.4884 255.962 30.6934C258.055 33.684 259.812 36.9608 261.235 40.5225V10.1592H314.625L339.698 72.4111C342.292 78.7514 344.382 84.5873 345.967 89.9189C347.696 95.2504 348.993 99.5734 349.857 102.888C350.722 106.058 351.154 107.644 351.154 107.644C351.154 107.644 351.587 106.058 352.451 102.888C353.316 99.5734 354.613 95.2505 356.342 89.9189C358.071 84.5872 360.233 78.8233 362.827 72.627L388.116 10.1592H439.993V55.9746C440.108 55.6885 440.225 55.4027 440.343 55.1182C444.378 45.6077 449.926 37.3943 456.986 30.4775C464.191 23.4167 472.621 18.0122 482.275 14.2656C491.93 10.3749 502.378 8.42969 513.618 8.42969Z" fill="currentColor"></path>
              </svg>
            </div>
          </footer>
          <div data-footer-parallax-dark="" className="footer-wrap__dark"></div>
        </div>
      </main>

      <style>{`
        /* Pulsing Glow Animation for Showcase Cards */
        @keyframes pulseGlow {
          0%, 100% {
            box-shadow: 0 0 25px rgba(255,255,255,0.2), 0 0 50px rgba(255,255,255,0.1), 0 0 80px rgba(255,255,255,0.05), inset 0 0 0 1px rgba(255,255,255,0.15);
          }
          50% {
            box-shadow: 0 0 35px rgba(255,255,255,0.35), 0 0 70px rgba(255,255,255,0.2), 0 0 100px rgba(255,255,255,0.1), inset 0 0 0 1px rgba(255,255,255,0.25);
          }
        }

        .showcase-card {
          animation: pulseGlow 3s ease-in-out infinite;
        }

        /* 3D Carousel Styles */
        .img-carousel__wrap {
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          padding-top: 12vh;
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
          height: 45vw;
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
          width: 12em;
          height: 32em;
          gap: 0.8em;
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
          aspect-ratio: 3/4;
          width: 100%;
          position: relative;
          overflow: hidden;
          border-radius: 0.8em;
        }

        .img-carousel__img {
          object-fit: cover;
          width: 100%;
          max-width: none;
          height: 100%;
          position: absolute;
          inset: 0%;
        }

        /* Parallax Styles */
        .parallax {
          width: 100%;
          position: relative;
          overflow: hidden;
        }

        .parallax__content {
          padding: 10em 1em;
          justify-content: center;
          align-items: center;
          min-height: 100svh;
          display: flex;
          position: relative;
          background: #000;
        }

        .parallax__layers {
          object-fit: cover;
          width: 100%;
          max-width: none;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        .parallax__title {
          pointer-events: auto;
          text-align: center;
          text-transform: none;
          margin-top: 0;
          margin-bottom: .1em;
          margin-right: .075em;
          font-size: 10em;
          font-weight: 700;
          line-height: 1;
          position: relative;
          color: #fff;
        }

        .parallax__black-line-overflow {
          z-index: 20;
          background-color: #000;
          width: 100%;
          height: 2px;
          position: absolute;
          bottom: -1px;
          left: 0;
        }

        .parallax__layer-img {
          pointer-events: none;
          object-fit: cover;
          width: 100%;
          max-width: none;
          height: 117.5%;
          position: absolute;
          top: -17.5%;
          left: 0;
        }

        .parallax__fade {
          z-index: 30;
          object-fit: cover;
          background-image: linear-gradient(#0000, #000);
          width: 100%;
          max-width: none;
          height: 20%;
          position: absolute;
          bottom: 0;
          left: 0;
        }

        .parallax__header {
          z-index: 2;
          padding: 10em 1em;
          justify-content: center;
          align-items: center;
          min-height: 100svh;
          display: flex;
          position: relative;
        }

        .parallax__visuals {
          object-fit: cover;
          width: 100%;
          max-width: none;
          height: 120%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .parallax__layer-title {
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100svh;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
        }

        .osmo-icon-svg {
          width: 160px;
          height: 160px;
          color: #fff;
        }

        /* Scramble Text Styles */
        .demo-group {
          width: 100%;
        }

        .scramble-section {
          grid-column-gap: 2em;
          grid-row-gap: 2em;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100vh;
          display: flex;
          background: #131313;
        }

        .scramble-section.u--bg-light {
          background-color: #efeeec;
        }

        .scramble-section.u--bg-light .scramble-heading {
          color: #131313;
        }

        .scramble-heading {
          text-align: center;
          letter-spacing: -.03em;
          text-transform: uppercase;
          max-width: 12em;
          margin: 0 auto;
          font-family: monospace;
          font-size: 3em;
          font-weight: 400;
          line-height: .9;
          color: #fff;
        }

        .scramble-button {
          color: #131313;
          text-transform: uppercase;
          border: 1px dotted #000;
          border-radius: .3125em;
          padding: .5em 1em;
          font-family: monospace;
          font-size: 1em;
          font-weight: 400;
          text-decoration: none;
          display: inline-block;
          cursor: pointer;
        }

        .scramble-button:hover {
          background: rgba(0,0,0,0.05);
        }

        .scramble-button-text {
          margin: 0;
        }

        /* Crisp Loading Animation Styles */
        .crisp-header {
          background-color: #eaeaea;
          justify-content: center;
          align-items: center;
          display: flex;
          position: relative;
          overflow: hidden;
          min-height: 100dvh;
        }

        .crisp-header.is--loading .crisp-header__slider {
          display: none;
        }

        .crisp-header.is--loading .crisp-loader {
          display: flex;
        }

        .crisp-loader {
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          font-size: 1vw;
          display: none;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        .crisp-loader__wrap {
          font-size: var(--size-font, 16px);
          justify-content: center;
          align-items: center;
          display: flex;
          position: relative;
        }

        .crisp-loader__groups {
          position: relative;
          overflow: hidden;
        }

        .crisp-loader__group {
          border-radius: .5em;
          justify-content: center;
          align-items: center;
          display: flex;
          position: relative;
        }

        .crisp-loader__single {
          padding-left: 1em;
          padding-right: 1em;
          position: relative;
        }

        .crisp-loader__media {
          border-radius: .5em;
          justify-content: center;
          align-items: center;
          width: 10em;
          height: 10em;
          display: flex;
          position: relative;
        }

        .crisp-loader__media.is--scaling {
          will-change: transform;
          border-radius: 0;
          transition: border-radius .5s cubic-bezier(1, 0, 0, 1);
          display: flex;
        }

        .crisp-loader__cover-img {
          object-fit: cover;
          border-radius: inherit;
          width: 100%;
          height: 100%;
          position: absolute;
        }

        .crisp-loader__media.is--scaling.is--radius {
          border-radius: .5em;
        }

        .crisp-loader__group.is--relative {
          position: relative;
          left: 100%;
        }

        .crisp-loader__group.is--duplicate {
          position: absolute;
          top: 0;
          left: 0;
        }

        .crisp-loader__cover-img.is--scale-down {
          will-change: transform;
        }

        .crisp-loader__fade {
          pointer-events: none;
          background-image: linear-gradient(90deg, #eaeaea 20%, transparent);
          width: 5em;
          height: calc(100% + 2px);
          position: absolute;
          top: -1px;
          left: -1px;
        }

        .crisp-loader__fade.is--duplicate {
          left: auto;
          right: -1px;
          transform: scaleX(-1);
        }

        .crisp-header__content {
          color: #f4f4f4;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 100%;
          min-height: 100dvh;
          padding: 2.5em;
          display: flex;
          position: relative;
          z-index: 10;
        }

        .crisp-header__top {
          justify-content: space-between;
          align-items: center;
          width: 100%;
          display: flex;
        }

        .crisp-header__center {
          width: 100%;
          padding: 1.5em;
          position: absolute;
          left: 0;
        }

        .crisp-header__bottom {
          gap: 2em;
          flex-flow: column;
          align-items: center;
          margin-top: auto;
          display: flex;
        }

        .osmo-logo {
          color: unset;
          width: 8em;
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .crisp-header__hamburger {
          gap: .375em;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 2em;
          height: 2em;
          display: flex;
        }

        .crisp-header__hamburger-bar {
          background-color: currentColor;
          width: 1.875em;
          height: .125em;
        }

        .crisp-header__slider-list {
          grid-template-rows: 100%;
          grid-template-columns: 100%;
          place-items: center;
          width: 100%;
          height: 100%;
          display: grid;
          overflow: hidden;
        }

        .crisp-header__slider-nav {
          gap: .5em;
          padding: 1em;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .crisp-header__slider-nav-btn {
          cursor: pointer;
          border: 1px solid transparent;
          border-radius: .25em;
          width: 3.5em;
          height: 3.5em;
          position: relative;
          transition: border-color 0.75s cubic-bezier(0.625, 0.05, 0, 1);
          overflow: hidden;
          background: none;
          padding: 0;
        }

        .crisp-header__slider-nav-btn img {
          transform: scale(1);
          transition: transform 0.75s cubic-bezier(0.625, 0.05, 0, 1);
        }

        .crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) img {
          transform: scale(0.825);
        }

        .crisp-header__slider-nav:has(.crisp-header__slider-nav-btn:hover) .crisp-header__slider-nav-btn:hover img {
          transform: scale(1);
        }

        .crisp-header__slider-nav-btn.is--current {
          border-color: #f4f4f4;
        }

        .crisp-header__p {
          text-align: center;
          font-size: 1.125em;
        }

        .crisp-header__slider {
          gap: 1rem;
          border-radius: .5em;
          justify-content: center;
          align-items: flex-end;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
        }

        .crisp-header__slider-slide {
          opacity: 0;
          pointer-events: none;
          will-change: transform, opacity;
          grid-area: 1 / 1 / -1 / -1;
          place-items: center;
          width: 100%;
          height: 100%;
          display: grid;
          position: relative;
          overflow: hidden;
        }

        .crisp-header__slider-slide.is--current {
          opacity: 1;
          pointer-events: auto;
        }

        .crisp-header__slider-slide-inner {
          object-fit: cover;
          will-change: transform;
          width: 100%;
          height: 100%;
          position: absolute;
        }

        .crisp-header__h1 {
          text-align: center;
          letter-spacing: -.04em;
          margin-top: 0;
          margin-bottom: .125em;
          font-size: calc(5vw + 5dvh);
          font-weight: 400;
          line-height: .95;
        }

        .crisp-header__h1 > * {
          margin: -0.1em -0.05em;
          padding: 0.1em 0.05em;
          display: inline-block;
          overflow: hidden;
        }

        .crisp-word {
          display: inline-block;
        }

        /* Footer Parallax Styles */
        .demo-main {
          overflow: clip;
        }

        .demo-eyebrow {
          opacity: .5;
          margin-bottom: 0;
          font-size: 1.3125em;
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .demo-p {
          max-width: 19em;
          margin-bottom: 0;
          font-size: 1.3125em;
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .demo-header {
          grid-column-gap: 7.5em;
          grid-row-gap: 7.5em;
          letter-spacing: -.02em;
          border-bottom: 1px solid hsl(var(--foreground) / 0.15);
          flex-flow: column;
          justify-content: space-between;
          width: 100%;
          min-height: 100svh;
          padding: 2.5em;
          font-weight: 600;
          display: flex;
          position: relative;
          background: hsl(var(--background));
        }

        .demo-header__nav-row {
          justify-content: space-between;
          align-items: flex-start;
          display: flex;
        }

        .demo-header__title-row {
          grid-column-gap: 2.5em;
          grid-row-gap: 2.5em;
          padding-left: calc(33.3333% + .833333em);
          display: flex;
        }

        .demo-header__info-row {
          grid-column-gap: 2.5em;
          grid-row-gap: 2.5em;
          display: flex;
        }

        .demo-header__col {
          grid-column-gap: 3em;
          grid-row-gap: 3em;
          flex-flow: column;
          justify-content: space-between;
          width: calc(33.3333% - 1.66667em);
          display: flex;
        }

        .demo-header__h1 {
          letter-spacing: -.03em;
          max-width: 11em;
          font-size: 4em;
          font-weight: 600;
          line-height: .95;
          color: hsl(var(--foreground));
        }

        .demo-header__img {
          aspect-ratio: 3 / 2;
          object-fit: cover;
          width: 100%;
        }

        .demo-header__logo {
          width: 15em;
          color: hsl(var(--foreground));
        }

        .demo-header__nav-a {
          margin-bottom: 0;
          font-size: 1.3125em;
          font-weight: 600;
          color: hsl(var(--foreground));
        }

        .footer-wrap {
          position: relative;
          overflow: hidden;
        }

        .demo-footer {
          grid-column-gap: 7.5em;
          grid-row-gap: 7.5em;
          letter-spacing: -.02em;
          flex-flow: column;
          justify-content: space-between;
          min-height: 100svh;
          padding: 2.5em;
          font-weight: 600;
          display: flex;
          position: relative;
          background: hsl(var(--muted));
        }

        .demo-footer__links-row {
          grid-column-gap: 2.5em;
          grid-row-gap: 2.5em;
          display: flex;
        }

        .demo-footer__logo-row {
          grid-column-gap: 1em;
          grid-row-gap: 1em;
          flex-flow: column;
          display: flex;
        }

        .demo-footer__col {
          grid-column-gap: 3em;
          grid-row-gap: 3em;
          flex-flow: column;
          width: calc(33.3333% - 1.66667em);
          display: flex;
        }

        .demo-footer__links {
          grid-column-gap: .25em;
          grid-row-gap: .25em;
          flex-flow: column;
          align-items: flex-start;
          display: flex;
        }

        .demo-footer__a {
          color: hsl(var(--foreground));
          font-size: 2.75em;
          line-height: 1;
          text-decoration: none;
        }

        .demo-footer__logo-svg {
          width: 100%;
          color: hsl(var(--foreground));
        }

        .footer-wrap__dark {
          opacity: 0;
          pointer-events: none;
          background-color: hsl(var(--foreground));
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        [data-underline-link] {
          text-decoration: none;
          position: relative;
          cursor: pointer;
        }

        [data-underline-link]::before {
          content: "";
          position: absolute;
          bottom: -0.0625em;
          left: 0;
          width: 100%;
          height: 0.1em;
          background-color: currentColor;
          transition: transform 0.735s cubic-bezier(0.625, 0.05, 0, 1);
          transform-origin: right;
          transform: scaleX(0) rotate(0.001deg);
        }

        [data-underline-link]:hover::before {
          transform-origin: left;
          transform: scaleX(1) rotate(0.001deg);
        }

        @media screen and (max-width: 991px) {
          .demo-header__title-row {
            padding-left: 0;
          }

          .demo-header__info-row {
            flex-flow: column;
          }

          .demo-header__col {
            width: 100%;
          }

          .demo-header__logo {
            width: 50vw;
          }

          .demo-footer__links-row {
            flex-flow: column;
          }

          .demo-footer__logo-row {
            grid-column-gap: 1.5em;
            grid-row-gap: 1.5em;
          }

          .demo-footer__col {
            width: 100%;
          }
        }

        @media screen and (max-width: 767px) {
          .demo-header {
            grid-column-gap: 5em;
            grid-row-gap: 5em;
            padding-left: 1em;
            padding-right: 1em;
          }

          .demo-footer {
            padding-left: 1em;
            padding-right: 1em;
          }

          .demo-footer__col {
            grid-column-gap: 1em;
            grid-row-gap: 1em;
          }

          .demo-footer__a {
            font-size: 1.75em;
          }

          .demo-header__info-row {
            grid-column-gap: 1em;
            grid-row-gap: 1em;
          }

          .demo-header__h1 {
            font-size: 3em;
          }

          .demo-header__nav-a {
            max-width: 100%;
            font-size: 1em;
          }

          .demo-eyebrow {
            font-size: 1em;
          }

          .demo-p {
            max-width: 100%;
            font-size: 1.25em;
          }
        }


        /* Two-Step Navigation Styles */
        [data-twostep-nav] {
          --cubic-default: cubic-bezier(0.625, 0.05, 0, 1);
          --animation-ease: 0.2s ease;
          --duration-default: 0.5s;
          --duration-default-long: 0.75s;
          --duration-default-half: 0.25s;
          --animation-default: var(--duration-default) var(--cubic-default);
          --animation-default-long: var(--duration-default-long) var(--cubic-default);
          --animation-default-half: var(--duration-default-half) var(--cubic-default);
        }

        .twostep-nav {
          z-index: 100;
          pointer-events: none;
          position: fixed;
          inset: 0;
        }

        .twostep-nav__bg {
          z-index: 0;
          opacity: 0;
          pointer-events: auto;
          visibility: hidden;
          background-color: rgba(0, 0, 0, 0.3);
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0% auto auto 0%;
          transition: opacity var(--animation-default), visibility var(--animation-default);
        }

        [data-nav-status="active"] .twostep-nav__bg {
          opacity: 1;
          visibility: visible;
        }

        .twostep-nav__wrap {
          justify-content: center;
          align-items: stretch;
          width: 100%;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
        }

        .twostep-nav__width {
          flex-flow: column;
          flex: none;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          max-width: 48em;
          padding-top: 1.25em;
          padding-left: 1.25em;
          padding-right: 1.25em;
          display: flex;
        }

        .twostep-nav__bar {
          pointer-events: auto;
          color: hsl(var(--foreground));
          width: 100%;
          max-width: 25em;
          position: relative;
          transition: max-width var(--animation-default-long) 0.2s;
        }

        [data-nav-status="active"] .twostep-nav__bar {
          transition: max-width var(--animation-default) 0s;
          max-width: 100%;
        }

        .twostep-nav__back {
          z-index: 0;
          position: absolute;
          inset: 0%;
          transition: all var(--animation-default);
          inset: 0em;
        }

        [data-nav-status="active"] .twostep-nav__back {
          inset: -0.25em;
        }

        .twostep-nav__back-bg {
          background-color: hsl(var(--muted));
          border-radius: 0.5em;
          width: 100%;
          height: 100%;
          position: absolute;
          inset: 0%;
        }

        .twostep-nav__top {
          z-index: 1;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 4em;
          padding: 1.25em;
          display: flex;
          position: relative;
        }

        .twostep-nav__logo {
          justify-content: flex-start;
          align-items: center;
          width: 6em;
          height: 100%;
          display: flex;
          text-decoration: none;
        }

        .twostep-nav__logo-svg {
          height: 100%;
        }

        .twostep-nav__toggle {
          pointer-events: auto;
          cursor: pointer;
          background-color: transparent;
          border: none;
          justify-content: center;
          align-items: center;
          width: 2.5em;
          height: 2.5em;
          padding: 0;
          display: flex;
          position: relative;
        }

        .twostep-nav__toggle-bar {
          background-color: hsl(var(--foreground));
          width: 1.875em;
          height: 0.125em;
          position: absolute;
          transition: transform var(--animation-default);
          transform: translateY(-0.25em) rotate(0.001deg);
        }

        .twostep-nav__toggle:hover .twostep-nav__toggle-bar {
          transform: translateY(0.25em) rotate(0.001deg);
        }

        .twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
          transform: translateY(0.15em) rotate(0.001deg);
        }

        .twostep-nav__toggle:hover .twostep-nav__toggle-bar:nth-child(2) {
          transform: translateY(-0.15em) rotate(0.001deg);
        }

        [data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar {
          transform: translateY(0em) rotate(45deg);
        }

        [data-nav-status="active"] .twostep-nav__toggle .twostep-nav__toggle-bar:nth-child(2) {
          transform: translateY(0em) rotate(-45deg);
        }

        .twostep-nav__top-line {
          z-index: 2;
          background-color: rgba(0, 0, 0, 0.1);
          height: 1px;
          position: absolute;
          bottom: 0;
          left: 0.5em;
          right: 0.5em;
          transition: all var(--animation-default) 0s;
          opacity: 0;
        }

        [data-nav-status="active"] .twostep-nav__top-line {
          transition: all var(--animation-default) 0.1s;
          opacity: 1;
        }

        .twostep-nav__bottom {
          grid-template-rows: 0fr;
          width: 100%;
          display: grid;
          position: relative;
          overflow: hidden;
          transition: grid-template-rows var(--animation-default) 0s;
        }

        [data-nav-status="active"] .twostep-nav__bottom {
          transition: grid-template-rows var(--animation-default-long) 0.25s;
          grid-template-rows: 1fr;
        }

        .twostep-nav__bottom-overflow {
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          height: 100%;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .twostep-nav__bottom-inner {
          flex-flow: column;
          justify-content: flex-start;
          align-items: center;
          width: 100%;
          padding: 1.5em;
          display: flex;
          position: relative;
        }

        .twostep-nav__bottom-row {
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          display: flex;
        }

        .twostep-nav__bottom-row > * {
          transition: all var(--animation-default) 0s;
          transform: translateY(2em);
          opacity: 0;
        }

        .twostep-nav__bottom-row > *:nth-child(2) {
          transition-delay: 0.075s;
        }

        [data-nav-status="active"] .twostep-nav__bottom-row > * {
          transition: all var(--animation-default-long) 0.5s;
          transform: translateY(0em);
          opacity: 1;
        }

        [data-nav-status="active"] .twostep-nav__bottom-row > *:nth-child(2) {
          transition-delay: 0.575s;
        }

        .twostep-nav__bottom-col {
          flex: 1;
          min-height: 100%;
          display: flex;
        }

        .twostep-nav__bottom-col.is--visual {
          display: flex;
        }

        .twostep-nav__info {
          gap: 2em;
          flex-flow: column;
          justify-content: space-between;
          align-items: flex-start;
          width: 100%;
          display: flex;
        }

        .twostep-nav__ul {
          flex-flow: column;
          justify-content: flex-start;
          align-items: stretch;
          width: 100%;
          margin-bottom: 0;
          padding-left: 0;
          list-style: none;
          display: flex;
        }

        .twostep-nav__ul.is--small {
          gap: 0.25em 1em;
          flex-flow: wrap;
          justify-content: flex-start;
          align-items: flex-start;
        }

        .twostep-nav__li {
          list-style: none;
        }

        .twostep-nav__link {
          color: inherit;
          width: 100%;
          padding-top: 0.375em;
          padding-bottom: 0.375em;
          text-decoration: none;
          position: relative;
          display: block;
        }

        .twostep-nav__link-span {
          letter-spacing: -0.04em;
          font-size: 2.125em;
          font-weight: 400;
          line-height: 1;
        }

        .twostep-nav__link-eyebrow {
          opacity: 0.7;
          letter-spacing: -0.02em;
          font-size: 1em;
          font-weight: 400;
          line-height: 1;
        }

        .twostep-nav__visual {
          aspect-ratio: 1;
          border-radius: 0.375em;
          width: 100%;
          overflow: hidden;
        }

        .twostep-nav__visual-img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }

        @media screen and (max-width: 767px) {
          .twostep-nav__bottom-col.is--visual {
            display: none;
          }

          .twostep-nav__top-line {
            bottom: -0.5em;
            left: 1em;
            right: 1em;
          }

          [data-nav-status="active"] .twostep-nav__top-line {
            transition: all var(--animation-default) 0.2s;
            inset: auto 0em -0.5em;
          }

          [data-nav-status="active"] .twostep-nav__back {
            inset: -1.25em;
          }

          .twostep-nav__bottom {
            transition: grid-template-rows var(--animation-default) 0s, transform var(--animation-default) 0s;
            transform: translateY(-0.625em);
          }

          [data-nav-status="active"] .twostep-nav__bottom {
            transition: grid-template-rows var(--animation-default-long) 0.25s, transform var(--animation-default) 0.25s;
            transform: translateY(0em);
          }
        }
      `}</style>
      <SiteFooter />
    </div>
  );
};

export default Showcase;
