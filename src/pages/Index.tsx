import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import HeroCarousel3D from "@/components/showcase/HeroCarousel3D";
import HeroCarouselCTAs from "@/components/showcase/HeroCarouselCTAs";

// Front layer - Main talent carousel with branding and video
const frontLayerPanels = [
  { id: 1, items: [
    { name: "Sarah Chen", role: "Senior Product Designer", company: "Stripe", image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Design", "Figma"] },
  ]},
  { id: 2, items: [
    { name: "Marcus Johnson", role: "Engineering Manager", company: "Vercel", image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["React", "TypeScript"] },
  ]},
  { id: 3, type: "branding" as const },
  { id: 4, items: [
    { name: "Elena Rodriguez", role: "VP of Marketing", company: "Notion", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Growth Marketing", "Brand"] },
  ]},
  { id: 5, type: "video" as const, title: "How It Works", subtitle: "See the magic" },
  { id: 6, items: [
    { name: "David Kim", role: "Principal Data Scientist", company: "OpenAI", image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Machine Learning", "Python"] },
  ]},
  { id: 7, items: [
    { name: "Aisha Patel", role: "Chief People Officer", company: "Canva", image: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["People Ops", "Culture"] },
  ]},
  { id: 8, items: [
    { name: "James Wright", role: "Head of Sales", company: "Stripe", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Enterprise Sales", "SaaS"] },
  ]},
  { id: 9, items: [
    { name: "Nina Kowalski", role: "Brand Strategist", company: "Airbnb", image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Branding", "Strategy"] },
  ]},
  { id: 10, items: [
    { name: "Alex Turner", role: "Tech Lead", company: "Figma", image: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["React", "Architecture"] },
  ]},
];

// Middle layer - Offset rotation for depth
const midLayerPanels = [
  { id: 101, items: [
    { name: "Sofia Garcia", role: "UX Researcher", company: "Google", image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["User Research", "Insights"] },
  ]},
  { id: 102, items: [
    { name: "Michael Chang", role: "Full Stack Dev", company: "Meta", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Node.js", "GraphQL"] },
  ]},
  { id: 103, items: [
    { name: "Emma Thompson", role: "Product Manager", company: "Spotify", image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Product Strategy", "Agile"] },
  ]},
  { id: 104, items: [
    { name: "Ryan Brooks", role: "DevOps Engineer", company: "Netflix", image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Kubernetes", "AWS"] },
  ]},
  { id: 105, items: [
    { name: "Olivia Martinez", role: "Content Lead", company: "TikTok", image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Content", "Social"] },
  ]},
  { id: 106, items: [
    { name: "Chris Anderson", role: "CTO", company: "Coinbase", image: "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Blockchain", "Leadership"] },
  ]},
];

// Back layer - Even more offset for maximum depth
const backLayerPanels = [
  { id: 201, items: [
    { name: "Jessica Liu", role: "AI Engineer", company: "Anthropic", image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["AI/ML", "Python"] },
  ]},
  { id: 202, items: [
    { name: "Tom Wilson", role: "Security Lead", company: "Cloudflare", image: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Security", "Networks"] },
  ]},
  { id: 203, items: [
    { name: "Amanda Chen", role: "Design Director", company: "Apple", image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: true, skills: ["Design Systems", "UI"] },
  ]},
  { id: 204, items: [
    { name: "Daniel Park", role: "Growth PM", company: "Uber", image: "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=600&fit=crop&crop=top", verified: true, topReferrer: false, skills: ["Growth", "Analytics"] },
  ]},
];

const Index = () => {
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
                {/* Hero Title with cinematic glow */}
                <div className="absolute top-[10vh] left-0 right-0 z-40 text-center pointer-events-none">
                  <h1 className="hero-title font-heading font-black text-4xl md:text-6xl lg:text-7xl text-white tracking-tight mb-3">
                    Referd<span className="text-talent">®</span>
                  </h1>
                  <p className="text-white/70 text-base md:text-lg lg:text-xl font-medium max-w-xl mx-auto px-4">
                    The People Powered <span className="text-talent font-semibold">Recruitment Marketplace</span>
                  </p>
                </div>

                {/* Multi-layer 3D Carousel Container */}
                <div className="hero-carousel-container">
                  {/* Back layer - slowest, smallest, most blurred */}
                  <HeroCarousel3D 
                    panels={backLayerPanels} 
                    layer="back" 
                    speedMultiplier={0.6}
                    radiusMultiplier={1.3}
                  />
                  
                  {/* Middle layer - medium speed and size */}
                  <HeroCarousel3D 
                    panels={midLayerPanels} 
                    layer="mid" 
                    speedMultiplier={0.8}
                    radiusMultiplier={1.15}
                  />
                  
                  {/* Front layer - main interactive carousel */}
                  <HeroCarousel3D 
                    panels={frontLayerPanels} 
                    layer="front" 
                    speedMultiplier={1}
                    radiusMultiplier={1}
                  />
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
