import TwoStepNavigation from "@/components/navigation/TwoStepNavigation";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import CursorFollower from "@/components/animations/CursorFollower";
import { GridOverlay } from "@/components/animations/GridTransition";
import HeroSection from "@/components/sections/HeroSection";
import RecruitmentIndustry from "@/components/sections/RecruitmentIndustry";
import RecruitmentBroken from "@/components/sections/RecruitmentBroken";
import PowerOfReferrals from "@/components/sections/PowerOfReferrals";
import TheReferdWay from "@/components/sections/TheReferdWay";
import AboutSection from "@/components/sections/AboutSection";
import FeaturePills from "@/components/sections/FeaturePills";
import UserJourneyVisualization from "@/components/sections/UserJourneyVisualization";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";
import FloatingCTABar from "@/components/sections/FloatingCTABar";
import SocialShareMenu from "@/components/ui/SocialShareMenu";

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

              {/* 2. Recruitment is massive - Industry stats */}
              <RecruitmentIndustry />

              {/* 3. But is recruitment broken? */}
              <RecruitmentBroken />

              {/* 4. The power of referrals - Facts & figures */}
              <PowerOfReferrals />

              {/* 5. The Referd Way - 35/35/30 + Stakeholder breakdown */}
              <TheReferdWay />

              {/* 6. The Movement - Word reveal */}
              <section id="about">
                <AboutSection />
              </section>

              {/* 7. Why Referd Works */}
              <FeaturePills />

              {/* 8. How It All Connects - Ecosystem */}
              <UserJourneyVisualization />

              {/* 9. Common Questions */}
              <section id="faq">
                <FAQSection />
              </section>

              {/* 10. Get Started */}
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
