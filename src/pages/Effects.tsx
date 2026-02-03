import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";
import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";

gsap.registerPlugin(ScrollTrigger, Flip, Observer);

// Marquee images
const marqueeImages = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
];

// Logo images for logo wall
const logoImages = [
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae93e3accd4e1dc3cc_google-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae3a3e64e8a49b8a1c_apple-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae2e19cd5115bb2bf4_meta-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae9a2be422de3ddc63_amazon-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eaea73f4e0f4a93f5e0_microsoft-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae9f5fb21f39c1e8e1_netflix-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae9a5ec5a3eb8ed2f2_spotify-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eaef91f2a8de8cb2a85_stripe-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae9b6eb03c2f4ca53f_slack-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae63e8b3a40b2f7e4d_airbnb-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae4b0f9ec2f3f8d2a1_uber-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae7e2c5d8a0f3b9e2c_figma-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae1d6e8f3a7b2c4d5e_notion-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae8f7a2b3c4d5e6f70_vercel-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae9a0b1c2d3e4f5a6b_linear-logo.svg",
  "https://cdn.prod.website-files.com/671752cd4027f01b1b8f1c7f/678a1eae2c3d4e5f6a7b8c9d_framer-logo.svg",
];

const Effects = () => {
  const bgZoomContainerRef = useRef<HTMLDivElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const globeRef = useRef<HTMLDivElement>(null);
  const logoWallRef = useRef<HTMLDivElement>(null);
  const footerParallaxRef = useRef<HTMLDivElement>(null);

  // Background Zoom Effect
  useEffect(() => {
    const containers = document.querySelectorAll("[data-bg-zoom-init]");
    if (!containers.length) return;

    let masterTimeline: gsap.core.Timeline | null = null;

    const getScrollRange = ({ trigger, start, endTrigger, end }: {
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

        // Flip.fit returns object, we need to handle it differently
        const flipTween = Flip.fit(contentEl, endEl, {
          duration: zoomScrollRange,
          ease: "none",
          scale: false,
        }) as gsap.core.Tween;
        masterTimeline!.add(flipTween);

        if (hasRadius) {
          masterTimeline!.to(contentEl, {
            borderRadius: endRadius,
            duration: zoomScrollRange
          }, "<");
        }

        masterTimeline!.to(contentEl, {
          y: `+=${afterScrollRange}`,
          duration: afterScrollRange
        });

        if (darkEl) {
          gsap.set(darkEl, { opacity: 0 });
          masterTimeline!.to(darkEl, {
            opacity: 0.75,
            duration: afterScrollRange * 0.25,
          }, "<");
        }

        if (imgEl) {
          gsap.set(imgEl, { scale: 1, transformOrigin: "50% 50%" });
          masterTimeline!.to(imgEl, {
            scale: 1.25,
            yPercent: -10,
            duration: afterScrollRange
          }, "<");
        }
      });

      ScrollTrigger.refresh();
    };

    bgZoomTimeline();

    let resizeTimer: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(bgZoomTimeline, 100);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (masterTimeline) masterTimeline.kill();
    };
  }, []);

  // Draggable Marquee Effect
  useEffect(() => {
    const wrapper = marqueeRef.current;
    if (!wrapper) return;

    const collection = wrapper.querySelector("[data-draggable-marquee-collection]") as HTMLElement;
    const list = wrapper.querySelector("[data-draggable-marquee-list]") as HTMLElement;
    if (!collection || !list) return;

    const duration = 20;
    const multiplier = 40;
    const sensitivity = 0.01;

    const wrapperWidth = wrapper.getBoundingClientRect().width;
    const listWidth = list.scrollWidth || list.getBoundingClientRect().width;
    if (!wrapperWidth || !listWidth) return;

    const minRequiredWidth = wrapperWidth + listWidth + 2;
    while (collection.scrollWidth < minRequiredWidth) {
      const listClone = list.cloneNode(true) as HTMLElement;
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

    const baseDirection = 1;
    const timeScale = { value: baseDirection };
    wrapper.setAttribute("data-direction", "left");

    function applyTimeScale() {
      marqueeLoop.timeScale(timeScale.value);
      wrapper?.setAttribute("data-direction", timeScale.value < 0 ? "right" : "left");
    }
    applyTimeScale();

    const marqueeObserver = Observer.create({
      target: wrapper,
      type: "pointer,touch",
      preventDefault: true,
      debounce: false,
      onChangeX: (observerEvent) => {
        let velocityTimeScale = observerEvent.velocityX * -sensitivity;
        velocityTimeScale = gsap.utils.clamp(-multiplier, multiplier, velocityTimeScale);

        gsap.killTweensOf(timeScale);

        const restingDirection = velocityTimeScale < 0 ? -1 : 1;

        gsap.timeline({ onUpdate: applyTimeScale })
          .to(timeScale, { value: velocityTimeScale, duration: 0.1, overwrite: true })
          .to(timeScale, { value: restingDirection, duration: 1.0 });
      }
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: wrapper,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable(); },
      onEnterBack: () => { marqueeLoop.resume(); applyTimeScale(); marqueeObserver.enable(); },
      onLeave: () => { marqueeLoop.pause(); marqueeObserver.disable(); },
      onLeaveBack: () => { marqueeLoop.pause(); marqueeObserver.disable(); }
    });

    return () => {
      marqueeLoop.kill();
      marqueeObserver.kill();
      scrollTriggerInstance.kill();
    };
  }, []);

  // Accelerating Globe Effect
  useEffect(() => {
    const globe = globeRef.current;
    if (!globe) return;

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
    let stopTimeout: NodeJS.Timeout;

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

    return () => {
      window.removeEventListener("scroll", onScroll);
      tl.kill();
    };
  }, []);

  // Logo Wall Cycle Effect
  useEffect(() => {
    const root = logoWallRef.current;
    if (!root) return;

    const loopDelay = 1.5;
    const duration = 0.9;

    const list = root.querySelector('[data-logo-wall-list]');
    const items = Array.from(root.querySelectorAll('[data-logo-wall-item]')) as HTMLElement[];

    const originalTargets = items
      .map(item => item.querySelector('[data-logo-wall-target]'))
      .filter(Boolean) as HTMLElement[];

    let visibleItems: HTMLElement[] = [];
    let visibleCount = 0;
    let pool: HTMLElement[] = [];
    let pattern: number[] = [];
    let patternIndex = 0;
    let tl: gsap.core.Timeline;

    function isVisible(el: HTMLElement) {
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
      if (tl) tl.kill();
      visibleItems = items.filter(isVisible);
      visibleCount = visibleItems.length;

      pattern = shuffleArray(Array.from({ length: visibleCount }, (_, i) => i));
      patternIndex = 0;

      items.forEach(item => {
        item.querySelectorAll('[data-logo-wall-target]').forEach(old => old.remove());
      });

      pool = originalTargets.map(n => n.cloneNode(true) as HTMLElement);

      const shuffledAll = shuffleArray(pool);
      const front = shuffledAll.slice(0, visibleCount);
      const rest = shuffleArray(shuffledAll.slice(visibleCount));
      pool = front.concat(rest);

      for (let i = 0; i < visibleCount; i++) {
        const parent = visibleItems[i].querySelector('[data-logo-wall-target-parent]') || visibleItems[i];
        parent.appendChild(pool.shift()!);
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
      const parent = container.querySelector('[data-logo-wall-target-parent]') ||
        container.querySelector('*:has(> [data-logo-wall-target])') ||
        container;
      const existing = parent.querySelectorAll('[data-logo-wall-target]');
      if (existing.length > 1) return;

      const current = parent.querySelector('[data-logo-wall-target]');
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

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tl.play(),
      onLeave: () => tl.pause(),
      onEnterBack: () => tl.play(),
      onLeaveBack: () => tl.pause()
    });

    const handleVisibility = () => document.hidden ? tl.pause() : tl.play();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      tl.kill();
      scrollTriggerInstance.kill();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  // Footer Parallax Effect
  useEffect(() => {
    const footerWrap = footerParallaxRef.current;
    if (!footerWrap) return;

    const footerInner = footerWrap.querySelector('[data-footer-parallax-inner]');
    const footerDark = footerWrap.querySelector('[data-footer-parallax-dark]');
    if (!footerInner) return;

    const ctx = gsap.context(() => {
      gsap.set(footerInner, { yPercent: -30 });
      if (footerDark) gsap.set(footerDark, { autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: footerWrap,
          start: "top bottom",
          end: "top top",
          scrub: true
        }
      })
        .to(footerInner, { yPercent: 0, ease: "none" });

      if (footerDark) {
        gsap.timeline({
          scrollTrigger: {
            trigger: footerWrap,
            start: "top 80%",
            end: "top 20%",
            scrub: true
          }
        })
          .to(footerDark, { autoAlpha: 1, ease: "none" });
      }
    }, footerWrap);

    return () => ctx.revert();
  }, []);

  return (
    <div className="effects-page">
      {/* Navigation */}
      <TwoStepNavigation />

      {/* 1. Background Zoom Effect */}
      <section data-bg-zoom-init className="background-zoom" ref={bgZoomContainerRef}>
        <h2 className="background-zoom__h">
          Image to Background <span className="background-zoom__h1-span">(Zoom)</span>
        </h2>

        <div data-bg-zoom-start className="background-zoom__start">
          <div data-bg-zoom-content className="background-zoom__content">
            <img
              data-bg-zoom-img
              src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1920&h=1080&fit=crop"
              alt=""
              className="background-zoom__img"
            />
            <p className="background-zoom__pod">REFERD</p>
            <div className="background-zoom__play">
              <svg viewBox="0 0 64 64" fill="none" className="background-zoom__play-svg">
                <circle cx="32" cy="32" r="31" stroke="currentColor" strokeWidth="2" />
                <polygon points="26,20 26,44 46,32" fill="currentColor" />
              </svg>
            </div>
            <div data-bg-zoom-dark className="background-zoom__dark" />
          </div>
        </div>

        <div data-bg-zoom-end className="background-zoom__end" />

        <div className="background-zoom__text">
          <p className="background-zoom__h is--margin-top">
            This is the after phase of the <span className="background-zoom__h1-span">(Zoom)</span>
          </p>
          <p className="text-2xl text-foreground/60">more...</p>
          <p className="text-2xl text-foreground/60">and more!</p>
        </div>
      </section>

      {/* After section */}
      <section className="background-zoom-after">
        <p className="text-4xl md:text-6xl font-heading font-bold text-center">
          And we reached the end!
        </p>
        <p className="background-zoom-after__pod">REFERD</p>
      </section>

      {/* 2. Draggable Marquee */}
      <section className="py-32 bg-background">
        <h2 className="text-center text-3xl md:text-5xl font-heading font-bold mb-16 px-6">
          Draggable Marquee
        </h2>
        <div
          ref={marqueeRef}
          data-draggable-marquee-init
          data-duration="20"
          data-multiplier="40"
          data-sensitivity="0.01"
          data-direction="left"
          className="draggable-marquee"
        >
          <div data-draggable-marquee-collection className="draggable-marquee__collection">
            <div data-draggable-marquee-list className="draggable-marquee__list">
              {marqueeImages.map((src, i) => (
                <div key={i} className="draggable-marquee__item is--round">
                  <img src={src} alt="" className="draggable-marquee__item-img" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Accelerating Globe */}
      <section className="py-32 bg-foreground text-background flex flex-col items-center justify-center">
        <h2 className="text-center text-3xl md:text-5xl font-heading font-bold mb-16 px-6">
          Accelerating Globe
        </h2>
        <p className="text-center text-muted-foreground mb-8">Scroll to accelerate the rotation</p>
        <div ref={globeRef} data-accelerating-globe className="globe">
          <div className="globe__before" />
          <div className="globe__back">
            <div className="globe__back-circle is--1" />
            <div className="globe__back-circle is--2" />
            <div className="globe__back-circle is--3" />
            <div className="globe__back-circle is--4" />
            <div className="globe__back-circle is--5" />
          </div>
          <div className="globe__front">
            <div className="globe__mirror">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="globe__circle">
                  <div data-accelerating-globe-circle className="globe__circle-inner" />
                </div>
              ))}
            </div>
            <div className="globe__mirror is--duplicate">
              {[4, 5, 6, 7].map((i) => (
                <div key={i} className="globe__circle">
                  <div data-accelerating-globe-circle className="globe__circle-inner" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Logo Wall Cycle */}
      <section className="py-32 bg-muted/30">
        <h2 className="text-center text-3xl md:text-5xl font-heading font-bold mb-16 px-6">
          Logo Wall Cycle
        </h2>
        <div ref={logoWallRef} data-logo-wall-cycle-init data-logo-wall-shuffle="true" className="logo-wall">
          <div className="logo-wall__collection">
            <div data-logo-wall-list className="logo-wall__list">
              {logoImages.map((src, i) => (
                <div key={i} data-logo-wall-item className="logo-wall__item">
                  <div data-logo-wall-target-parent className="logo-wall__logo">
                    <div className="logo-wall__logo-before" />
                    <div data-logo-wall-target className="logo-wall__logo-target">
                      <img src={src} alt="" className="logo-wall__logo-img" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer Parallax */}
      <main className="demo-main">
        <section className="demo-header">
          <div className="demo-header__nav-row">
            <div className="demo-header__logo">
              <span className="font-heading font-bold text-4xl">Referd</span>
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
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop"
                loading="lazy"
                alt=""
                className="demo-header__img"
              />
            </div>
          </div>
        </section>

        <div ref={footerParallaxRef} data-footer-parallax className="footer-wrap">
          <div data-footer-parallax-dark className="footer-dark-overlay" />
          <footer data-footer-parallax-inner className="demo-footer">
            <div className="demo-footer__links-row">
              <div className="demo-footer__col">
                <p className="demo-eyebrow">( Pages )</p>
                <div className="demo-footer__links">
                  <a data-underline-link="" href="/" className="demo-footer__a">Home</a>
                  <a data-underline-link="" href="/about" className="demo-footer__a">About</a>
                  <a data-underline-link="" href="/work" className="demo-footer__a">Work</a>
                  <a data-underline-link="" href="/brands" className="demo-footer__a">Brands</a>
                  <a data-underline-link="" href="/auth" className="demo-footer__a">Login</a>
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
                  <a data-underline-link="" href="mailto:hello@referd.com" className="demo-footer__a">hello@referd.com</a>
                  <a data-underline-link="" href="#" className="demo-footer__a">Book a Demo</a>
                </div>
              </div>
            </div>
            <div className="demo-footer__logo-row">
              <p className="demo-eyebrow">Not your typical platform</p>
              <span className="demo-footer__logo-text">REFERD</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Effects;
