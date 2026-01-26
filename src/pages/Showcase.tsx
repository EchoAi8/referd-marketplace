import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import Matter from "matter-js";
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

const smileyTextures = [
  'https://cdn.prod.website-files.com/67f388c94c43e20cfb7ca732/67f394c931c1e6fc303e12ec_smiley-1.svg',
  'https://cdn.prod.website-files.com/67f388c94c43e20cfb7ca732/67f394c9718ec3640accf3d4_smiley-2.svg',
  'https://cdn.prod.website-files.com/67f388c94c43e20cfb7ca732/67f394c940dfb6d33af4c6d6_smiley-3.svg',
  'https://cdn.prod.website-files.com/67f388c94c43e20cfb7ca732/67f394c9ab4fc0301d56d8c5_smiley-4.svg',
  'https://cdn.prod.website-files.com/67f388c94c43e20cfb7ca732/67f394c9d9ee6112fdb67b89_smiley-5.svg'
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const scrambleLoadRef = useRef<HTMLHeadingElement>(null);
  const scrambleScrollRef = useRef<HTMLHeadingElement>(null);
  const scrambleAltRef = useRef<HTMLHeadingElement>(null);
  const scrambleHoverRef = useRef<HTMLAnchorElement>(null);
  const matterCanvasRef = useRef<HTMLDivElement>(null);
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

  // Matter.js Falling 2D Elements Effect
  useEffect(() => {
    const canvas = matterCanvasRef.current;
    if (!canvas) return;

    const { Engine, Render, Runner, Bodies, Composite, Mouse, MouseConstraint } = Matter;

    const canvasWidth = canvas.clientWidth + 2;
    const canvasHeight = canvas.clientHeight + 2;
    const canvasWallDepth = canvasWidth / 4;
    const smileyAmount = 15;
    const smileySize = canvasWidth / 7.5;
    const smileySizeTexture = 256;
    const smileySizeScale = smileySize / smileySizeTexture;
    const smileyRestitution = 0.75;
    const worldGravity = 2;

    // Create an engine
    const engine = Engine.create();
    engine.world.gravity.y = worldGravity;

    // Create a renderer
    const render = Render.create({
      element: canvas,
      engine: engine,
      options: {
        background: "transparent",
        wireframes: false,
        width: canvasWidth,
        height: canvasHeight,
        pixelRatio: 2,
      }
    });

    // Generate a random number between min (inclusive) and max (exclusive)
    const getRandomNumber = (min: number, max: number) => Math.random() * (max - min) + min;

    const min = smileySize / 2;
    const max = canvasWidth - (smileySize / 2);

    // Function to loop through all textures
    let textureIndex = 0;
    const getNextTexture = () => {
      const texture = smileyTextures[textureIndex];
      textureIndex = (textureIndex + 1) % smileyTextures.length;
      return texture;
    };

    // Create smiley
    const smileyCreate = () => {
      const smiley = Bodies.rectangle(
        getRandomNumber(min, max),
        smileySize,
        smileySize,
        smileySize,
        {
          chamfer: { radius: smileySize / 2 },
          restitution: smileyRestitution,
          render: {
            sprite: {
              texture: getNextTexture(),
              xScale: smileySizeScale,
              yScale: smileySizeScale
            }
          }
        }
      );
      Composite.add(engine.world, smiley);
    };

    // Create boundary boxes
    const boxTop = Bodies.rectangle(
      canvasWidth / 2 + (canvasWallDepth * 2),
      canvasHeight + canvasWallDepth,
      canvasWidth + (canvasWallDepth * 4),
      canvasWallDepth * 2,
      { isStatic: true, render: { visible: false } }
    );

    const boxLeft = Bodies.rectangle(
      canvasWallDepth * -1,
      canvasHeight / 2,
      canvasWallDepth * 2,
      canvasHeight,
      { isStatic: true, render: { visible: false } }
    );

    const boxRight = Bodies.rectangle(
      canvasWidth + canvasWallDepth,
      canvasHeight / 2,
      canvasWallDepth * 2,
      canvasHeight,
      { isStatic: true, render: { visible: false } }
    );

    const boxBottom = Bodies.rectangle(
      canvasWidth / 2 + (canvasWallDepth * 2),
      canvasWallDepth * -1,
      canvasWidth + (canvasWallDepth * 4),
      canvasWallDepth * 2,
      { isStatic: true, render: { visible: false } }
    );

    // Add all of the bodies to the world
    Composite.add(engine.world, [boxTop, boxLeft, boxRight, boxBottom]);

    // Run the renderer
    Render.run(render);

    // Create runner
    const runner = Runner.create();

    // Run the engine
    Runner.run(runner, engine);

    // Add smileys with delay
    let count = 0;
    const addSmiley = () => {
      if (count < smileyAmount) {
        smileyCreate();
        count++;
        setTimeout(addSmiley, 100);
      }
    };
    addSmiley();

    // Create mouse
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: { visible: false }
      }
    });

    Composite.add(engine.world, mouseConstraint);

    // Fix: Allow native page scroll
    mouseConstraint.mouse.element.removeEventListener("mousewheel", mouseConstraint.mouse.mousewheel);
    mouseConstraint.mouse.element.removeEventListener("DOMMouseScroll", mouseConstraint.mouse.mousewheel);

    // Fix: Scroll on touch devices
    mouseConstraint.mouse.element.removeEventListener('touchstart', mouseConstraint.mouse.mousedown);
    mouseConstraint.mouse.element.removeEventListener('touchmove', mouseConstraint.mouse.mousemove);
    mouseConstraint.mouse.element.removeEventListener('touchend', mouseConstraint.mouse.mouseup);

    mouseConstraint.mouse.element.addEventListener('touchstart', mouseConstraint.mouse.mousedown, { passive: true });
    mouseConstraint.mouse.element.addEventListener('touchmove', (e: TouchEvent) => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mousemove(e as unknown as MouseEvent);
      }
    });
    mouseConstraint.mouse.element.addEventListener('touchend', (e: TouchEvent) => {
      if (mouseConstraint.body) {
        mouseConstraint.mouse.mouseup(e as unknown as MouseEvent);
      }
    });

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return (
    <PageLayout>
      {/* 3D Image Carousel */}
      <div className="img-carousel__wrap">
        <div ref={wrapRef} data-3d-carousel-wrap="" className="img-carousel__list">
          {carouselImages.map((panel) => (
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

      {/* Matter.js Falling 2D Elements */}
      <section className="section-resource">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 1340 257" fill="none" className="resource-name__svg">
          <path d="M51.3731 251H0.952148V5.7551H66.8082L124.775 175.54H125.461L183.428 5.7551H249.627V251H198.863V84.3021H198.177L144.669 251H105.91L52.0592 84.3021H51.3731V251Z" fill="currentColor"></path>
          <path d="M325.377 256.145C290.734 256.145 268.782 235.908 268.782 205.381C268.782 167.994 298.623 154.617 338.411 146.728C360.363 142.269 383.687 139.182 383.687 122.032C383.687 111.056 376.141 103.167 356.59 103.167C332.923 103.167 323.319 112.085 321.604 131.636H276.328C278.043 98.0221 301.71 69.8961 358.648 69.8961C402.209 69.8961 429.306 87.7321 429.306 138.153V210.869C429.306 221.502 430.678 226.304 436.509 226.304C437.881 226.304 438.91 226.304 440.968 225.961V249.971C431.707 251.686 422.446 252.715 415.586 252.715C395.692 252.715 387.117 245.169 384.716 228.362H384.03C372.025 244.826 351.788 256.145 325.377 256.145ZM342.527 222.531C367.566 222.531 383.687 205.038 383.687 181.028V162.506C377.17 165.936 366.537 168.68 350.759 172.453C326.406 177.598 317.145 186.173 317.145 200.922C317.145 215.328 326.063 222.531 342.527 222.531Z" fill="currentColor"></path>
          <path d="M533.926 217.729C539.414 217.729 542.158 217.386 548.675 216.357V250.657C538.042 253.058 529.81 254.087 520.206 254.087C485.22 254.087 468.413 238.995 468.413 196.806V111.742H443.717V75.7271H468.413V23.9341H515.404V75.7271H546.96V111.742H515.404V196.463C515.404 214.985 521.921 217.729 533.926 217.729Z" fill="currentColor"></path>
          <path d="M645.307 217.729C650.795 217.729 653.539 217.386 660.056 216.357V250.657C649.423 253.058 641.191 254.087 631.587 254.087C596.601 254.087 579.794 238.995 579.794 196.806V111.742H555.098V75.7271H579.794V23.9341H626.785V75.7271H658.341V111.742H626.785V196.463C626.785 214.985 633.302 217.729 645.307 217.729Z" fill="currentColor"></path>
          <path d="M843.213 165.936V175.883H713.902C714.245 201.951 731.395 220.473 757.12 220.473C780.787 220.473 790.391 207.439 793.821 197.492H841.498C831.894 232.478 804.111 256.488 755.748 256.488C699.496 256.488 666.568 217.729 666.568 163.192C666.568 110.37 698.81 69.8961 755.748 69.8961C813.029 69.8961 843.213 105.225 843.213 165.936ZM713.902 144.67H795.536C795.536 120.317 780.101 105.225 755.405 105.225C732.081 105.225 715.96 119.974 713.902 144.67Z" fill="currentColor"></path>
          <path d="M953.806 73.3261C958.951 73.3261 963.41 73.3261 969.241 74.3551V116.544C964.782 115.858 961.695 115.515 957.922 115.515C930.825 115.515 908.53 134.037 908.53 165.936V251H861.539V75.7271H908.53V105.911H909.216C918.134 86.3601 932.883 73.3261 953.806 73.3261Z" fill="currentColor"></path>
          <path d="M1032.5 256.145C968.703 256.145 952.239 216.357 952.239 171.424V154.617H1000.26V171.424C1000.26 196.463 1005.4 212.584 1030.1 212.584C1054.8 212.584 1059.94 196.463 1059.94 171.424V5.7551H1113.11V171.424C1113.11 216.357 1096.3 256.145 1032.5 256.145Z" fill="currentColor"></path>
          <path d="M1244.79 256.145C1181.34 256.145 1134.69 223.903 1133.66 167.994H1187.51C1188.54 197.835 1209.46 212.927 1244.1 212.927C1272.92 212.927 1284.92 200.922 1284.92 184.458C1284.92 159.762 1260.57 154.617 1222.84 143.984C1181.68 131.979 1142.23 116.887 1142.23 72.2971C1142.23 22.9051 1180.65 0.610107 1233.47 0.610107C1290.41 0.610107 1331.91 30.1081 1334.31 79.8431H1280.81C1277.38 56.8621 1261.6 43.8281 1233.47 43.8281C1210.49 43.8281 1196.43 51.7171 1196.43 68.5241C1196.43 89.1041 1214.61 94.5921 1245.82 103.51C1292.81 116.544 1339.12 128.892 1339.12 179.999C1339.12 225.275 1306.19 256.145 1244.79 256.145Z" fill="currentColor"></path>
        </svg>
        <div className="canvas-matter">
          <div className="canvas-matter__before"></div>
          <div ref={matterCanvasRef} id="canvas-target" className="canvas-matter__target"></div>
        </div>
      </section>

      <style>{`
        /* 3D Carousel Styles */
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

        /* Matter.js Falling Elements Styles */
        .section-resource {
          justify-content: center;
          align-items: flex-start;
          width: 100%;
          height: 100svh;
          padding: 2vw;
          display: flex;
          overflow: hidden;
          position: relative;
          background: hsl(var(--background));
        }

        .resource-name__svg {
          width: 100%;
          color: hsl(var(--foreground));
        }

        .canvas-matter {
          width: 100%;
          margin-bottom: 0;
          position: absolute;
          bottom: 0%;
          left: 0%;
          overflow: hidden;
          pointer-events: none;
        }

        .canvas-matter__before {
          padding-top: 100%;
        }

        .canvas-matter__target {
          transform-style: preserve-3d;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
        }

        #canvas-target canvas {
          position: relative;
          top: -1px;
          left: -1px;
          right: -1px;
          bottom: -1px;
          max-width: unset;
          pointer-events: all;
          max-width: calc(100% + 2px);
          max-height: calc(100% + 2px);
          min-width: calc(100% + 2px);
          min-height: calc(100% + 2px);
        }
      `}</style>
    </PageLayout>
  );
};

export default Showcase;
