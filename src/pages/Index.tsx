import { useState } from "react";
import HeroSection from "@/components/HeroSection";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import VideoIntro from "@/components/VideoIntro";

const Index = () => {
  const [showIntro, setShowIntro] = useState(true);

  return (
    <>
      {/* Video Intro Overlay */}
      {showIntro && (
        <VideoIntro onComplete={() => setShowIntro(false)} />
      )}

      {/* Main Site Content */}
      <div className="min-h-screen bg-white">
        <Navigation />
        <HeroSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
