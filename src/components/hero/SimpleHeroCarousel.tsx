import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Observer } from "gsap/Observer";
import ShowcaseTalentCard from "@/components/showcase/ShowcaseTalentCard";
import ReferdBrandingCard from "@/components/showcase/ReferdBrandingCard";
import VideoShowcaseCard from "@/components/showcase/VideoShowcaseCard";
import demoVideo from "@/assets/market-value-xray-demo.mp4";

gsap.registerPlugin(Observer);

interface TalentItem {
  name: string;
  role: string;
  company: string;
  image: string;
  verified?: boolean;
  topReferrer?: boolean;
  skills?: string[];
}

interface PanelConfig {
  id: number;
  type?: "branding" | "video";
  items?: TalentItem[];
  videoSrc?: string;
  title?: string;
  subtitle?: string;
}

const panels: PanelConfig[] = [
  { id: 1, items: [{ name: "Sarah Chen", role: "Senior Product Designer", company: "Stripe", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top", verified: true, skills: ["Product Design", "Figma"] }]},
  { id: 2, items: [{ name: "Marcus Johnson", role: "Engineering Manager", company: "Vercel", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["React", "TypeScript"] }]},
  { id: 3, type: "branding" },
  { id: 4, items: [{ name: "Elena Rodriguez", role: "VP of Marketing", company: "Notion", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Growth Marketing", "Brand"] }]},
  { id: 5, type: "video", videoSrc: demoVideo, title: "How It Works", subtitle: "See the magic" },
  { id: 6, items: [{ name: "David Kim", role: "Principal Data Scientist", company: "OpenAI", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top", verified: true, skills: ["Machine Learning", "Python"] }]},
  { id: 7, items: [{ name: "Aisha Patel", role: "Chief People Officer", company: "Canva", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["People Ops", "Culture"] }]},
  { id: 8, items: [{ name: "James Wright", role: "Head of Sales", company: "Stripe", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Enterprise Sales", "SaaS"] }]},
];

const SimpleHeroCarousel = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const list = listRef.current;
    if (!wrap || !list) return;

    const panelElements = list.querySelectorAll<HTMLElement>("[data-carousel-panel]");
    if (panelElements.length === 0) return;

    const radius = window.innerWidth * 0.5;
    let spin: gsap.core.Tween;
    let observer: Observer;

    // Position panels in 3D cylinder
    panelElements.forEach((panel) => {
      panel.style.transformOrigin = `50% 50% ${-radius}px`;
    });

    // Create infinite spin animation
    spin = gsap.fromTo(
      panelElements,
      { rotationY: (i) => (i * 360) / panelElements.length },
      { rotationY: "-=360", duration: 40, ease: "none", repeat: -1 }
    );

    // Add buffer for scroll
    spin.progress(1000);

    // Scroll velocity observer
    observer = Observer.create({
      target: window,
      type: "wheel,scroll,touch",
      onChangeY: (self) => {
        const velocity = gsap.utils.clamp(-60, 60, self.velocityY * 0.005);
        spin.timeScale(velocity);

        // Smoothly return to normal speed
        gsap.fromTo(
          { value: velocity },
          { value: velocity },
          {
            value: velocity < 0 ? -1 : 1,
            duration: 1.2,
            onUpdate() {
              spin.timeScale(this.targets()[0].value);
            },
          }
        );
      },
    });

    return () => {
      spin?.kill();
      observer?.kill();
    };
  }, []);

  const renderPanel = (panel: PanelConfig) => {
    if (panel.type === "branding") {
      return <ReferdBrandingCard />;
    }
    if (panel.type === "video") {
      return (
        <VideoShowcaseCard
          videoSrc={panel.videoSrc}
          title={panel.title}
          subtitle={panel.subtitle}
        />
      );
    }
    if (panel.items?.[0]) {
      const talent = panel.items[0];
      return (
        <ShowcaseTalentCard
          name={talent.name}
          role={talent.role}
          company={talent.company}
          image={talent.image}
          verified={talent.verified}
          topReferrer={talent.topReferrer}
          skills={talent.skills}
        />
      );
    }
    return null;
  };

  return (
    <div ref={wrapRef} className="simple-carousel__wrap">
      <div ref={listRef} className="simple-carousel__list" style={{ perspective: "90vw" }}>
        {panels.map((panel) => (
          <div key={panel.id} data-carousel-panel className="simple-carousel__panel">
            <div className="simple-carousel__item">{renderPanel(panel)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimpleHeroCarousel;
