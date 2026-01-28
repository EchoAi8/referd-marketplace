import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Draggable } from "gsap/Draggable";
import { Observer } from "gsap/Observer";
import { motion } from "framer-motion";
import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import { Button } from "@/components/ui/button";
import { CheckCircle, Users, TrendingUp, Zap, Heart, Shield } from "lucide-react";

gsap.registerPlugin(Draggable, Observer, ScrollTrigger);

// Talent profiles for the 3D carousel
const talentProfiles = [
  {
    id: 1,
    name: "Sarah Chen",
    role: "Product Designer",
    company: "Ex-Google",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£95K",
  },
  {
    id: 2,
    name: "Marcus Johnson",
    role: "Engineering Manager",
    company: "Ex-Meta",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£145K",
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    role: "VP Marketing",
    company: "Ex-Stripe",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£160K",
  },
  {
    id: 4,
    name: "David Kim",
    role: "Data Scientist",
    company: "Ex-Netflix",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=top",
    verified: false,
    salary: "£110K",
  },
  {
    id: 5,
    name: "Priya Patel",
    role: "UX Researcher",
    company: "Ex-Airbnb",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£85K",
  },
  {
    id: 6,
    name: "James Wilson",
    role: "DevOps Lead",
    company: "Ex-AWS",
    image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£130K",
  },
  {
    id: 7,
    name: "Aisha Mohammed",
    role: "Growth Lead",
    company: "Ex-Spotify",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£105K",
  },
  {
    id: 8,
    name: "Ryan O'Connor",
    role: "Tech Lead",
    company: "Ex-Apple",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=top",
    verified: false,
    salary: "£140K",
  },
  {
    id: 9,
    name: "Nina Volkov",
    role: "Brand Director",
    company: "Ex-Nike",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£125K",
  },
  {
    id: 10,
    name: "Alex Turner",
    role: "CTO",
    company: "Ex-Shopify",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£200K",
  },
  {
    id: 11,
    name: "Maya Santos",
    role: "Product Manager",
    company: "Ex-Uber",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£115K",
  },
  {
    id: 12,
    name: "Tom Harris",
    role: "Solutions Architect",
    company: "Ex-Microsoft",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=top",
    verified: true,
    salary: "£150K",
  },
];

const stats = [
  { value: "£427K+", label: "Paid to our community" },
  { value: "4,293", label: "Active talent profiles" },
  { value: "856", label: "Successful placements" },
  { value: "60%", label: "Avg. hiring cost saved" },
];

const features = [
  {
    icon: Users,
    title: "People-Powered Network",
    description: "Tap into a community of professionals who refer talent they personally vouch for.",
    color: "talent",
  },
  {
    icon: TrendingUp,
    title: "Know Your Worth",
    description: "Get real-time salary intelligence based on your skills, experience, and market demand.",
    color: "referrer",
  },
  {
    icon: Zap,
    title: "Instant Matching",
    description: "AI-powered matching connects you with opportunities that fit your career goals.",
    color: "brand",
  },
  {
    icon: Heart,
    title: "Fair Revenue Split",
    description: "35% to referrer, 35% to talent, 30% to platform. Everyone wins.",
    color: "talent",
  },
  {
    icon: Shield,
    title: "Verified Profiles",
    description: "Every candidate is verified through our trusted referral network.",
    color: "referrer",
  },
  {
    icon: CheckCircle,
    title: "Quality Guaranteed",
    description: "Only work with pre-vetted talent recommended by industry insiders.",
    color: "brand",
  },
];

const Showcase = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const lastWidthRef = useRef(typeof window !== "undefined" ? window.innerWidth : 0);

  // 3D Talent Card Carousel Effect
  useEffect(() => {
    let radius: number;
    let draggableInstance: Draggable | null = null;
    let observerInstance: Observer | null = null;
    let spin: gsap.core.Tween | null = null;
    let intro: gsap.core.Timeline | null = null;

    const wrap = wrapRef.current;
    if (!wrap) return;

    const calcRadius = () => {
      radius = window.innerWidth * 0.6;
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
        { rotationY: '-=360', duration: 40, ease: 'none', repeat: -1 }
      );

      spin.progress(1000);

      const [draggable] = Draggable.create(proxy, {
        trigger: wrap,
        type: 'x',
        inertia: true,
        allowNativeTouchScrolling: true,
        onPress() {
          gsap.to(content, {
            clipPath: 'inset(3%)',
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
        .fromTo(spin, { timeScale: 10 }, { timeScale: 1, duration: 2 })
        .fromTo(wrap, { scale: 0.6, rotation: 8 }, { scale: 1, rotation: 3, duration: 1.2 }, '<')
        .fromTo(content, { autoAlpha: 0 }, { autoAlpha: 1, stagger: { amount: 0.8, from: 'random' } }, '<');

      observerInstance = Observer.create({
        target: window,
        type: 'wheel,scroll,touch',
        onChangeY: self => {
          const v = gsap.utils.clamp(-40, 40, self.velocityY * 0.004);
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

  // Stats counter animation
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        el.querySelectorAll('[data-stat-value]').forEach((stat, i) => {
          gsap.fromTo(stat, 
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, delay: i * 0.1, ease: 'power3.out' }
          );
        });
      }
    });
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <TwoStepNavigation />

      {/* Hero Section with 3D Talent Carousel */}
      <section ref={heroRef} className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-muted/50 via-background to-background pointer-events-none" />
        
        {/* Hero Content */}
        <div className="relative z-10 text-center px-6 pt-24 pb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-sage/20 text-sage-dark text-sm font-medium mb-6">
              The Future of Hiring
            </span>
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-heading font-bold text-fluid-5xl md:text-fluid-6xl text-foreground tracking-tight max-w-4xl mx-auto mb-6"
          >
            Meet the talent your{" "}
            <span className="text-sage">network</span> trusts
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-fluid-lg text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Pre-vetted professionals, referred by industry insiders. 
            Skip the noise, hire with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="mustard" size="cta" className="text-lg px-8">
              Browse Talent
            </Button>
            <Button variant="outline" size="cta" className="text-lg px-8 border-2 border-forest text-forest hover:bg-forest hover:text-white">
              For Companies
            </Button>
          </motion.div>
        </div>

        {/* 3D Talent Carousel */}
        <div className="talent-carousel__wrap">
          <div ref={wrapRef} data-3d-carousel-wrap className="talent-carousel__list">
            {talentProfiles.map((profile) => (
              <div 
                key={profile.id} 
                data-3d-carousel-panel 
                className="talent-carousel__panel"
              >
                <div data-3d-carousel-content className="talent-carousel__card">
                  {/* Profile Image */}
                  <div className="talent-carousel__image-wrap">
                    <img 
                      src={profile.image} 
                      alt={profile.name}
                      className="talent-carousel__image"
                    />
                    <div className="talent-carousel__image-overlay" />
                  </div>
                  
                  {/* Profile Info */}
                  <div className="talent-carousel__info">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-heading font-semibold text-lg text-white truncate">
                        {profile.name}
                      </span>
                      {profile.verified && (
                        <CheckCircle className="w-4 h-4 text-sage flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-white/80 truncate">{profile.role}</p>
                    <p className="text-xs text-white/60 truncate">{profile.company}</p>
                    <div className="mt-2 inline-block px-2 py-0.5 rounded bg-mustard/90 text-forest text-xs font-semibold">
                      {profile.salary}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
        >
          <span className="text-sm">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2"
          >
            <motion.div className="w-1.5 h-1.5 bg-sage rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-24 bg-forest text-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <div 
                key={i} 
                data-stat-value 
                className="text-center opacity-0"
              >
                <div className="font-heading font-bold text-4xl md:text-5xl text-sage mb-2">
                  {stat.value}
                </div>
                <div className="text-white/70 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-background">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-1.5 rounded-full bg-referrer/20 text-referrer-dark text-sm font-medium mb-4"
            >
              Why Referd
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="font-heading font-bold text-fluid-4xl text-foreground tracking-tight mb-4"
            >
              Hiring, reimagined
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              Traditional recruitment is broken. We're fixing it with a people-first approach 
              that rewards everyone in the process.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group p-6 rounded-2xl bg-card border border-border/50 hover:border-sage/50 hover:shadow-lg transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 
                  ${feature.color === 'talent' ? 'bg-talent/20 text-talent-dark' : ''}
                  ${feature.color === 'referrer' ? 'bg-referrer/20 text-referrer-dark' : ''}
                  ${feature.color === 'brand' ? 'bg-brand/20 text-brand-dark' : ''}
                `}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-semibold text-xl text-foreground mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Fair Split Section */}
      <section className="py-24 bg-muted/30">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand/20 text-brand-dark text-sm font-medium mb-4"
          >
            Revenue Share
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-fluid-4xl text-foreground tracking-tight mb-4"
          >
            The fair split
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground text-lg mb-12"
          >
            When a hire is made, everyone shares in the success.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col md:flex-row justify-center gap-8"
          >
            {[
              { label: "Referrer", value: "35%", color: "referrer", description: "For making the introduction" },
              { label: "Talent", value: "35%", color: "talent", description: "For being awesome" },
              { label: "Platform", value: "30%", color: "brand", description: "For making it happen" },
            ].map((split, i) => (
              <div 
                key={i}
                className="flex-1 p-8 rounded-2xl bg-card border border-border/50 text-center"
              >
                <div className={`font-heading font-bold text-5xl mb-2
                  ${split.color === 'referrer' ? 'text-referrer' : ''}
                  ${split.color === 'talent' ? 'text-talent' : ''}
                  ${split.color === 'brand' ? 'text-brand' : ''}
                `}>
                  {split.value}
                </div>
                <div className="font-heading font-semibold text-lg text-foreground mb-1">
                  {split.label}
                </div>
                <div className="text-sm text-muted-foreground">
                  {split.description}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-forest text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading font-bold text-fluid-4xl tracking-tight mb-6"
          >
            Ready to join the movement?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/80 text-lg mb-8 max-w-2xl mx-auto"
          >
            Whether you're looking for your next role, want to monetize your network, 
            or need to hire exceptional talent — Referd is for you.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button variant="mustard" size="cta" className="text-lg px-8">
              Check My Worth
            </Button>
            <Button variant="outline" size="cta" className="text-lg px-8 border-2 border-white text-white hover:bg-white hover:text-forest">
              Start Referring
            </Button>
          </motion.div>
        </div>
      </section>

      <SiteFooter />

      <style>{`
        /* Talent Card 3D Carousel Styles */
        .talent-carousel__wrap {
          perspective: 1200px;
          width: 100%;
          height: 50vh;
          min-height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          overflow: visible;
        }

        .talent-carousel__list {
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .talent-carousel__panel {
          position: absolute;
          backface-visibility: hidden;
          transform-style: preserve-3d;
        }

        .talent-carousel__card {
          width: 220px;
          height: 320px;
          border-radius: 16px;
          overflow: hidden;
          position: relative;
          background: hsl(var(--card));
          box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .talent-carousel__card:hover {
          transform: scale(1.02);
          box-shadow: 0 25px 50px -15px rgba(0, 0, 0, 0.4);
        }

        .talent-carousel__image-wrap {
          position: absolute;
          inset: 0;
        }

        .talent-carousel__image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top;
        }

        .talent-carousel__image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            hsl(var(--color-forest)) 0%,
            hsl(var(--color-forest) / 0.8) 30%,
            transparent 70%
          );
        }

        .talent-carousel__info {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 16px;
        }

        @media (max-width: 768px) {
          .talent-carousel__card {
            width: 180px;
            height: 260px;
          }

          .talent-carousel__wrap {
            height: 40vh;
            min-height: 320px;
          }
        }
      `}</style>
    </div>
  );
};

export default Showcase;
