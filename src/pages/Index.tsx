import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import { GridOverlay } from "@/components/animations/GridTransition";
import ScrollRevealSection from "@/components/animations/ScrollRevealSection";
import HeroSection from "@/components/sections/HeroSection";
import RecruitmentIndustry from "@/components/sections/RecruitmentIndustry";
import RecruitmentBroken from "@/components/sections/RecruitmentBroken";
import PowerOfReferrals from "@/components/sections/PowerOfReferrals";
import TheReferdWay from "@/components/sections/TheReferdWay";
import AboutSection from "@/components/sections/AboutSection";
import FeaturePills from "@/components/sections/FeaturePills";
import UserJourneyVisualization from "@/components/sections/UserJourneyVisualization";
import FAQSection from "@/components/sections/FAQSection";
import SocialProofTicker from "@/components/sections/SocialProofTicker";
import ContactSection from "@/components/sections/ContactSection";
import FloatingCTABar from "@/components/sections/FloatingCTABar";
import SocialShareMenu from "@/components/ui/SocialShareMenu";
import FloatingParallaxPhotos from "@/components/animations/FloatingParallaxPhotos";

const Index = () => {
  return (
    <>
      <GridOverlay key="home-grid" />
      <TwoStepNavigation />
      <CursorFollower />
      <SocialShareMenu />
      <FloatingCTABar />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <div className="site-shell">
            <main>
              {/* 1. Hero - The Hook */}
              <HeroSection />

              {/* Sections with floating parallax photos overlapping across boundaries */}
              <div className="relative">
                <FloatingParallaxPhotos />

                {/* 2. Recruitment is massive - Industry stats */}
                <ScrollRevealSection>
                  <RecruitmentIndustry />
                </ScrollRevealSection>

                {/* 3. But is recruitment broken? */}
                <ScrollRevealSection delay={0.1}>
                  <RecruitmentBroken />
                </ScrollRevealSection>

                {/* 4. The power of referrals - Facts & figures */}
                <ScrollRevealSection>
                  <PowerOfReferrals />
                </ScrollRevealSection>

                {/* 5. The Referd Way - 35/35/30 + Stakeholder breakdown */}
                <ScrollRevealSection delay={0.1}>
                  <TheReferdWay />
                </ScrollRevealSection>

                {/* 6. The Movement - Word reveal */}
                <ScrollRevealSection>
                  <section id="about">
                    <AboutSection />
                  </section>
                </ScrollRevealSection>
              </div>

              {/* 7. Why Referd Works */}
              <ScrollRevealSection delay={0.1}>
                <FeaturePills />
              </ScrollRevealSection>

              {/* 8. How It All Connects - Ecosystem */}
              <ScrollRevealSection>
                <UserJourneyVisualization />
              </ScrollRevealSection>

              {/* 9. Common Questions */}
              <ScrollRevealSection>
                <section id="faq">
                  <FAQSection />
                </section>
              </ScrollRevealSection>

              {/* 9.5 Social Proof - Live Ticker */}
              <SocialProofTicker />

              {/* 10. Get Started */}
              <ScrollRevealSection delay={0.1}>
                <section id="contact">
                  <ContactSection />
                </section>
              </ScrollRevealSection>
            </main>

            <SiteFooter />
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default Index;
