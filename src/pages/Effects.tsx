import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import { Observer } from "gsap/Observer";

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

// Logo SVGs for logo wall
const logoSvgs = Array.from({ length: 16 }, (_, i) => (
  <svg key={i} viewBox="0 0 120 40" className="logo-wall__logo-img">
    <rect width="120" height="40" fill="transparent" />
    <text x="60" y="25" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
      BRAND {i + 1}
    </text>
  </svg>
));

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

    // Delay setup to ensure DOM is ready
    requestAnimationFrame(() => {
      setup();
    });

    const scrollTriggerInstance = ScrollTrigger.create({
      trigger: root,
      start: 'top bottom',
      end: 'bottom top',
      onEnter: () => tl?.play(),
      onLeave: () => tl?.pause(),
      onEnterBack: () => tl?.play(),
      onLeaveBack: () => tl?.pause()
    });

    const handleVisibility = () => document.hidden ? tl?.pause() : tl?.play();
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      tl?.kill();
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
      {/* 1. Background Zoom Effect - Exact structure from original */}
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
            <p className="background-zoom__pod">PØDRICK</p>
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
          <p className="background-zoom__p">more...</p>
          <p className="background-zoom__p">and more!</p>
        </div>
      </section>

      {/* After section for bg zoom */}
      <section className="background-zoom-after">
        <p className="background-zoom-after__h">
          PØDRICK
        </p>
        <p className="background-zoom-after__sub">And we reached the end!</p>
        <p className="background-zoom-after__pod">PØDRICK</p>
      </section>

      {/* 2. Draggable Marquee - Exact structure */}
      <section className="draggable-marquee-section">
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

      {/* 3. Accelerating Globe - Exact structure */}
      <section className="globe-section">
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

      {/* 4. Logo Wall Cycle - Exact structure */}
      <section className="logo-wall-section">
        <div ref={logoWallRef} data-logo-wall-cycle-init data-logo-wall-shuffle="true" className="logo-wall">
          <div className="logo-wall__collection">
            <div data-logo-wall-list className="logo-wall__list">
              {Array.from({ length: 16 }, (_, i) => (
                <div key={i} data-logo-wall-item className="logo-wall__item">
                  <div data-logo-wall-target-parent className="logo-wall__logo">
                    <div className="logo-wall__logo-before" />
                    <div data-logo-wall-target className="logo-wall__logo-target">
                      <svg viewBox="0 0 120 40" className="logo-wall__logo-img">
                        <rect width="120" height="40" fill="transparent" />
                        <text x="60" y="25" textAnchor="middle" fill="currentColor" fontSize="12" fontWeight="bold">
                          BRAND {i + 1}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. Footer Parallax - Exact structure */}
      <main className="footer-parallax-main">
        <section className="footer-parallax-header">
          <div className="footer-parallax-header__nav-row">
            <div className="footer-parallax-header__logo">
              <svg viewBox="0 0 30 22" fill="currentColor" style={{ width: '1.875em', height: '1.375em' }}>
                <path d="M 14.203 21.25 L 0 21.25 L 0 0.75 L 6.484 0.75 L 6.484 15.766 L 14.203 15.766 Z M 23.516 21.25 L 23.516 15.766 L 30 15.766 L 30 0.75 L 14.203 0.75 L 14.203 6.234 L 23.516 6.234 L 23.516 10.281 L 19.859 10.281 L 19.859 15.766 L 19.859 21.25 Z" />
              </svg>
            </div>
            <p className="footer-parallax-header__nav-link">Navigation</p>
          </div>
          <div className="footer-parallax-header__title-row">
            <h1 className="footer-parallax-header__h1">The footer marks the end of the scroll, but not the end of the story.</h1>
          </div>
          <div className="footer-parallax-header__info-row">
            <div className="footer-parallax-header__col">
              <p className="footer-parallax-eyebrow">( Concept )</p>
            </div>
            <div className="footer-parallax-header__col">
              <p className="footer-parallax-p">Parallax adds a sense of depth and motion that feels natural to the human eye. By shifting elements at different speeds, we create a layered world that reacts to scroll. It's subtle, but powerful — turning static sections into dynamic experiences.</p>
              <p className="footer-parallax-eyebrow">Scroll down ↓</p>
            </div>
            <div className="footer-parallax-header__col">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=300&fit=crop"
                loading="lazy"
                alt=""
                className="footer-parallax-header__img"
              />
            </div>
          </div>
        </section>

        <div ref={footerParallaxRef} data-footer-parallax className="footer-parallax-wrap">
          <div data-footer-parallax-dark className="footer-parallax-dark" />
          <footer data-footer-parallax-inner className="footer-parallax-footer">
            <div className="footer-parallax-footer__links-row">
              <div className="footer-parallax-footer__col">
                <p className="footer-parallax-eyebrow">( Pages )</p>
                <div className="footer-parallax-footer__links">
                  <a href="/" className="footer-parallax-footer__a">Home</a>
                  <a href="/about" className="footer-parallax-footer__a">Resources</a>
                  <a href="/work" className="footer-parallax-footer__a">About</a>
                  <a href="/brands" className="footer-parallax-footer__a">Platform</a>
                  <a href="/auth" className="footer-parallax-footer__a">Login</a>
                </div>
              </div>
              <div className="footer-parallax-footer__col">
                <p className="footer-parallax-eyebrow">( Socials )</p>
                <div className="footer-parallax-footer__links">
                  <a href="#" className="footer-parallax-footer__a">LinkedIn</a>
                  <a href="#" className="footer-parallax-footer__a">Instagram</a>
                  <a href="#" className="footer-parallax-footer__a">X/Twitter</a>
                </div>
              </div>
              <div className="footer-parallax-footer__col">
                <p className="footer-parallax-eyebrow">( Contact )</p>
                <div className="footer-parallax-footer__links">
                  <a href="mailto:hello@osmo.supply" className="footer-parallax-footer__a">hello@osmo.supply</a>
                  <a href="tel:+31612345678" className="footer-parallax-footer__a">+31 6 12 34 56 78</a>
                </div>
              </div>
            </div>
            <div className="footer-parallax-footer__logo-row">
              <p className="footer-parallax-eyebrow">Not your typical platform</p>
              <span className="footer-parallax-footer__logo-text">REFERD</span>
            </div>
          </footer>
        </div>
      </main>
    </div>
  );
};

export default Effects;
