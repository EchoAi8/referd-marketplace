import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import { GridOverlay } from "@/components/animations/GridTransition";
import HeroSection from "@/components/sections/HeroSection";
import ImpactSection from "@/components/sections/ImpactSection";
import SolutionReveal from "@/components/sections/SolutionReveal";
import JoinTheHerdCounter from "@/components/sections/JoinTheHerdCounter";
import FAQSection from "@/components/sections/FAQSection";
import PricingSection from "@/components/sections/PricingSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingCTABar from "@/components/sections/FloatingCTABar";
import SocialShareMenu from "@/components/ui/SocialShareMenu";

import brandsClip from "@/assets/referd-brands-clip.mp4";
import referrersClip from "@/assets/referd-referrers-clip.mp4";
import talentClip from "@/assets/referd-talent-clip.mp4";

const Index = () => {
  return (
    <>
      <GridOverlay key="home-grid" />
      <TwoStepNavigation />
      <CursorFollower />
      <SocialShareMenu />
      <FloatingCTABar />
      <PageTransition>
        <div className="min-h-screen bg-foreground">
          <div className="site-shell">
            <main>
              {/* 1. Hero — Full-screen video with Referd branding */}
              <HeroSection />

              {/* 2. The 35/35/30 Solution */}
              <SolutionReveal />

              {/* 3. Impact: Brands */}
              <ImpactSection
                videoSrc={brandsClip}
                label="For Brands"
                headline="Hire better."
                highlight="Pay less."
                description="Stop bleeding 30% to agencies. Access pre-vetted, referred talent at a fraction of the cost. AI-matched, human-trusted."
                stats={[
                  { value: "60%", label: "Cost savings" },
                  { value: "856", label: "Hires made" },
                  { value: "12 days", label: "Avg time to hire" },
                ]}
                ctaLabel="Start Hiring"
                ctaLink="/brands"
                theme="brand"
              />

              {/* 4. Impact: Referrers */}
              <ImpactSection
                videoSrc={referrersClip}
                label="For Referrers"
                headline="Your network."
                highlight="Your income."
                description="Know someone perfect for a role? Refer them and earn 35% of the placement fee. No recruiter licence needed."
                stats={[
                  { value: "£427K+", label: "Paid out" },
                  { value: "35%", label: "Your share" },
                  { value: "4,293", label: "Earning now" },
                ]}
                ctaLabel="Start Earning"
                ctaLink="/opportunities"
                theme="referrer"
                reverse
              />

              {/* 5. Impact: Talent */}
              <ImpactSection
                videoSrc={talentClip}
                label="For Talent"
                headline="Know your"
                highlight="worth."
                description="Get paid when you get hired — 35% of the fee goes directly to you. Plus free salary intelligence powered by AI."
                stats={[
                  { value: "35%", label: "You keep" },
                  { value: "Free", label: "Salary intel" },
                  { value: "100%", label: "Transparent" },
                ]}
                ctaLabel="Know Your Worth"
                ctaLink="/career-intelligence"
                theme="talent"
              />

              {/* 6. Join the Herd */}
              <JoinTheHerdCounter />

              {/* 7. FAQ */}
              <section id="faq">
                <FAQSection />
              </section>

              {/* 8. Pricing */}
              <section id="pricing">
                <PricingSection />
              </section>

              {/* 9. Contact */}
              <section id="contact">
                <ContactSection />
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
