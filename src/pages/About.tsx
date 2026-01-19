import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import PageTransition from "@/components/layout/PageTransition";
import { GridOverlay } from "@/components/animations/GridTransition";
import AboutSection from "@/components/sections/AboutSection";

const About = () => {
  return (
    <>
      <GridOverlay />
      <PageTransition>
        <div className="min-h-screen bg-background">
          <SiteHeader />
          <main>
            <section className="pt-28">
              <AboutSection />
            </section>
          </main>
          <SiteFooter />
        </div>
      </PageTransition>
    </>
  );
};

export default About;
