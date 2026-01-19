import SiteHeader from "@/components/layout/SiteHeader";
import SiteFooter from "@/components/layout/SiteFooter";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import StatsSection from "@/components/sections/StatsSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import ArticlesSection from "@/components/sections/ArticlesSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      
      <main>
        <HeroSection />
        <section id="about">
          <AboutSection />
        </section>
        <StatsSection />
        <section id="projects">
          <ProjectsSection />
        </section>
        <section id="articles">
          <ArticlesSection />
        </section>
        <section id="contact">
          <ContactSection />
        </section>
      </main>

      <SiteFooter />
    </div>
  );
};

export default Index;
