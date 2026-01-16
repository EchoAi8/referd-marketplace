import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  const [currentTime, setCurrentTime] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showStaticHero, setShowStaticHero] = useState(false);
  const [ctaIdleTime, setCtaIdleTime] = useState(0);

  // Timer logic - runs every 100ms for smooth timing
  useEffect(() => {
    if (!isPlaying || showStaticHero) return;
    
    const interval = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= 20) {
          return 20;
        }
        return prev + 0.1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isPlaying, showStaticHero]);

  // CTA idle detection - after 5s of inactivity at end, show static hero
  useEffect(() => {
    if (currentTime >= 18) {
      const idleTimer = setInterval(() => {
        setCtaIdleTime((prev) => {
          if (prev >= 5) {
            setShowStaticHero(true);
            return prev;
          }
          return prev + 1;
        });
      }, 1000);
      return () => clearInterval(idleTimer);
    }
  }, [currentTime]);

  const shouldPulse = currentTime >= 20 && ctaIdleTime >= 2;

  // Animated counter component
  const AnimatedCounter = ({ value, duration = 1 }: { value: number; duration?: number }) => {
    const [count, setCount] = useState(0);
    
    useEffect(() => {
      const steps = 30;
      const increment = value / steps;
      let current = 0;
      const timer = setInterval(() => {
        current += increment;
        if (current >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(current));
        }
      }, (duration * 1000) / steps);
      return () => clearInterval(timer);
    }, [value, duration]);
    
    return <>{count.toLocaleString()}</>;
  };

  // iPhone Mockup Component
  const IPhoneMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative ${className}`}>
      <div className="relative bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
        <div className="bg-white rounded-[2.5rem] overflow-hidden w-[280px] h-[580px]">
          {children}
        </div>
      </div>
    </div>
  );

  // MacBook Mockup Component
  const MacBookMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
    <div className={`relative ${className}`}>
      <div className="bg-gray-800 rounded-t-xl p-1 shadow-2xl">
        <div className="bg-gray-900 rounded-t-lg p-2">
          <div className="flex gap-1.5 mb-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="bg-white rounded-md overflow-hidden w-[400px] h-[250px]">
            {children}
          </div>
        </div>
      </div>
      <div className="bg-gray-700 h-4 rounded-b-lg w-[440px] mx-auto" />
      <div className="bg-gray-600 h-2 rounded-b-xl w-[480px] mx-auto" />
    </div>
  );

  // Screen content components
  const LinkedInScreen = () => (
    <div className="h-full bg-white p-4">
      <div className="bg-blue-600 text-white text-xs p-2 rounded mb-3">LinkedIn Jobs</div>
      <div className="space-y-2">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="border rounded p-2">
            <div className="h-2 bg-gray-300 rounded w-3/4 mb-1" />
            <div className="h-2 bg-gray-200 rounded w-1/2" />
          </div>
        ))}
      </div>
    </div>
  );

  const RejectionScreen = () => (
    <div className="h-full bg-white p-4">
      <div className="text-xs font-bold mb-3">Inbox</div>
      <div className="space-y-2">
        {["Unfortunately...", "We regret to...", "After review..."].map((text, i) => (
          <div key={i} className="border border-red-200 bg-red-50 rounded p-2">
            <div className="text-[10px] text-red-600">{text}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const AgencyScreen = () => (
    <div className="h-full bg-gradient-to-b from-gray-100 to-white p-4 flex flex-col items-center justify-center">
      <div className="text-2xl font-bold text-gray-800 mb-2">Agency Fee</div>
      <div className="text-4xl font-black text-red-600">20-25%</div>
      <div className="text-xs text-gray-500 mt-2">of annual salary</div>
    </div>
  );

  const DeadJobsScreen = () => (
    <div className="h-full bg-white p-4">
      <div className="text-xs font-bold mb-3 text-gray-400">Job Board</div>
      <div className="space-y-2 opacity-50">
        {[1, 2, 3].map((i) => (
          <div key={i} className="border border-gray-300 rounded p-2">
            <div className="flex justify-between">
              <div className="h-2 bg-gray-300 rounded w-1/2" />
              <span className="text-[8px] text-red-500">Expired</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const SalaryReportScreen = () => (
    <div className="h-full bg-gradient-to-b from-sage/20 to-white p-4 flex flex-col items-center justify-center">
      <div className="text-xs text-gray-600 mb-2">Your Market Value</div>
      <div className="text-4xl font-black text-forest">£95K</div>
      <div className="mt-4 w-full bg-sage/30 rounded-full h-2">
        <div className="bg-sage h-2 rounded-full w-3/4" />
      </div>
      <div className="text-[10px] text-gray-500 mt-2">Top 25% in your field</div>
    </div>
  );

  const ReferralScreen = () => (
    <div className="h-full bg-white p-4 flex flex-col items-center justify-center">
      <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-3">
        <span className="text-2xl">✓</span>
      </div>
      <div className="text-sm font-bold">You referred Sarah</div>
      <div className="text-xs text-gray-500 mt-1">Potential earnings</div>
      <div className="text-2xl font-black text-sage mt-1">£3,500</div>
    </div>
  );

  const EarningsScreen = () => (
    <div className="h-full bg-gradient-to-b from-mustard/20 to-white p-4 flex flex-col items-center justify-center">
      <div className="text-xs text-gray-600 mb-2">Total Earned</div>
      <div className="text-4xl font-black text-forest">£12,400</div>
      <div className="mt-4 flex gap-2">
        <div className="bg-sage/20 rounded px-2 py-1 text-[10px]">4 referrals</div>
        <div className="bg-mustard/20 rounded px-2 py-1 text-[10px]">2 pending</div>
      </div>
    </div>
  );

  const BrandDashboard = () => (
    <div className="h-full bg-white p-3">
      <div className="flex items-center gap-2 mb-3">
        <div className="w-8 h-8 rounded bg-sage flex items-center justify-center text-white text-xs font-bold">R</div>
        <span className="text-sm font-bold">Referd Dashboard</span>
      </div>
      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-sage/10 rounded p-2 text-center">
          <div className="text-lg font-bold">12</div>
          <div className="text-[8px]">Active Roles</div>
        </div>
        <div className="bg-mustard/10 rounded p-2 text-center">
          <div className="text-lg font-bold">47</div>
          <div className="text-[8px]">Candidates</div>
        </div>
        <div className="bg-rose/10 rounded p-2 text-center">
          <div className="text-lg font-bold">£8K</div>
          <div className="text-[8px]">Saved</div>
        </div>
      </div>
    </div>
  );

  const JobPostingScreen = () => (
    <div className="h-full bg-white p-3">
      <div className="text-sm font-bold mb-3">Post a Role</div>
      <div className="space-y-2">
        <div className="border rounded p-2">
          <div className="text-[10px] text-gray-500">Role Title</div>
          <div className="text-xs">Senior Developer</div>
        </div>
        <div className="border rounded p-2">
          <div className="text-[10px] text-gray-500">Referral Fee</div>
          <div className="text-xs text-sage font-bold">£5,000 (save 60%)</div>
        </div>
        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-sage/10 rounded p-1">
            <div className="text-lg font-bold">23</div>
            <div className="text-[8px]">Applicants</div>
          </div>
          <div className="bg-mustard/10 rounded p-1">
            <div className="text-lg font-bold">5</div>
            <div className="text-[8px]">Shortlisted</div>
          </div>
        </div>
      </div>
    </div>
  );

  // Determine current scene based on time
  const getScene = () => {
    if (currentTime < 1) return "intro";
    if (currentTime < 2) return "deviceIntro";
    if (currentTime < 3) return "pain1";
    if (currentTime < 4) return "pain2";
    if (currentTime < 5) return "pain3";
    if (currentTime < 6) return "shift";
    if (currentTime < 7) return "solution1";
    if (currentTime < 8) return "solution2";
    if (currentTime < 9) return "solution3";
    if (currentTime < 11) return "transition";
    if (currentTime < 13) return "desktopFeature";
    if (currentTime < 15) return "model";
    if (currentTime < 16) return "proof";
    if (currentTime < 17) return "positioning";
    if (currentTime < 18) return "brand";
    return "cta";
  };

  const scene = getScene();

  // Static hero fallback
  if (showStaticHero) {
    return (
      <section className="min-h-screen bg-white flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="text-6xl font-black text-forest mb-6" style={{ fontFamily: 'Syne, sans-serif' }}>
            Referd
          </div>
          <p className="text-xl text-gray-600 mb-8">People-powered recruitment</p>
          <div className="flex flex-col gap-4">
            <Button variant="mustard" size="cta" className="w-full">
              Check My Worth
            </Button>
            <Button variant="outline" size="cta" className="w-full border-2 border-forest text-forest hover:bg-forest hover:text-white">
              Start Earning
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-6">Join 4,293 people building the future</p>
          <button 
            onClick={() => {
              setShowStaticHero(false);
              setCurrentTime(0);
              setCtaIdleTime(0);
            }}
            className="text-xs text-sage mt-4 underline"
          >
            Replay video
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-white flex items-center justify-center overflow-hidden">
      {/* 9:16 Aspect Ratio Container */}
      <div className="relative w-full max-w-md mx-auto aspect-[9/16] bg-white flex items-center justify-center">
        
        <AnimatePresence mode="wait">
          
          {/* [0:00-0:01] INTRO */}
          {scene === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center px-8"
            >
              <h1 
                className="text-2xl md:text-3xl font-semibold text-black leading-tight"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Ever feel like<br />recruitment is broken?
              </h1>
            </motion.div>
          )}

          {/* [0:01-0:02] DEVICE INTRO */}
          {scene === "deviceIntro" && (
            <motion.div
              key="deviceIntro"
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <LinkedInScreen />
              </IPhoneMockup>
            </motion.div>
          )}

          {/* [0:02-0:03] PAIN POINT 1 */}
          {scene === "pain1" && (
            <motion.div
              key="pain1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <RejectionScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                CVs no one reads
              </motion.p>
            </motion.div>
          )}

          {/* [0:03-0:04] PAIN POINT 2 */}
          {scene === "pain2" && (
            <motion.div
              key="pain2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <AgencyScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Agencies taking 30%
              </motion.p>
            </motion.div>
          )}

          {/* [0:04-0:05] PAIN POINT 3 */}
          {scene === "pain3" && (
            <motion.div
              key="pain3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <DeadJobsScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Dead-end job boards
              </motion.p>
            </motion.div>
          )}

          {/* [0:05-0:06] THE SHIFT */}
          {scene === "shift" && (
            <motion.div
              key="shift"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center px-8"
            >
              <h2 
                className="text-3xl md:text-4xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                There's a better way
              </h2>
            </motion.div>
          )}

          {/* [0:06-0:07] SOLUTION 1 */}
          {scene === "solution1" && (
            <motion.div
              key="solution1"
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <SalaryReportScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Know your worth
              </motion.p>
            </motion.div>
          )}

          {/* [0:07-0:08] SOLUTION 2 */}
          {scene === "solution2" && (
            <motion.div
              key="solution2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <ReferralScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Get paid for referrals
              </motion.p>
            </motion.div>
          )}

          {/* [0:08-0:09] SOLUTION 3 */}
          {scene === "solution3" && (
            <motion.div
              key="solution3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col items-center"
            >
              <IPhoneMockup>
                <EarningsScreen />
              </IPhoneMockup>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Turn networks into income
              </motion.p>
            </motion.div>
          )}

          {/* [0:09-0:11] TRANSITION TO DESKTOP */}
          {scene === "transition" && (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="flex items-center gap-4 scale-75">
                <motion.div
                  initial={{ x: 0 }}
                  animate={{ x: -20, scale: 0.7 }}
                  transition={{ duration: 0.5 }}
                >
                  <IPhoneMockup>
                    <EarningsScreen />
                  </IPhoneMockup>
                </motion.div>
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <MacBookMockup>
                    <BrandDashboard />
                  </MacBookMockup>
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Works everywhere
              </motion.p>
            </motion.div>
          )}

          {/* [0:11-0:13] DESKTOP FEATURE */}
          {scene === "desktopFeature" && (
            <motion.div
              key="desktopFeature"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="scale-90">
                <MacBookMockup>
                  <JobPostingScreen />
                </MacBookMockup>
              </div>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-xl font-semibold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Brands save 60%
              </motion.p>
            </motion.div>
          )}

          {/* [0:13-0:15] THE MODEL */}
          {scene === "model" && (
            <motion.div
              key="model"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-8"
            >
              <div 
                className="text-2xl font-bold text-black space-y-2"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-sage"
                >
                  35% Referrer
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-mustard"
                >
                  35% Talent
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-forest"
                >
                  30% Platform
                </motion.div>
              </div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-6 text-lg text-gray-600"
              >
                Everyone wins
              </motion.p>
            </motion.div>
          )}

          {/* [0:15-0:16] SOCIAL PROOF */}
          {scene === "proof" && (
            <motion.div
              key="proof"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-8 space-y-4"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-2xl font-extrabold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                £<AnimatedCounter value={427000} /> paid out
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-2xl font-extrabold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <AnimatedCounter value={4293} /> people earning
              </motion.div>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-2xl font-extrabold text-black"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                <AnimatedCounter value={856} /> hires made
              </motion.div>
            </motion.div>
          )}

          {/* [0:16-0:17] POSITIONING */}
          {scene === "positioning" && (
            <motion.div
              key="positioning"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center px-8 space-y-3"
              style={{ fontFamily: 'Syne, sans-serif' }}
            >
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xl font-semibold text-gray-400"
              >
                Uber → Travel
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-gray-400"
              >
                Airbnb → Hospitality
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl font-semibold text-black"
              >
                Referd → Recruitment
              </motion.div>
            </motion.div>
          )}

          {/* [0:17-0:18] BRAND MOMENT */}
          {scene === "brand" && (
            <motion.div
              key="brand"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <motion.div
                className="text-6xl font-black text-sage mb-4"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Referd
              </motion.div>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-lg text-gray-600"
              >
                People-powered recruitment
              </motion.p>
            </motion.div>
          )}

          {/* [0:18-0:20] CTA */}
          {scene === "cta" && (
            <motion.div
              key="cta"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center px-8"
            >
              <motion.div
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-5xl font-black text-forest mb-8"
                style={{ fontFamily: 'Syne, sans-serif' }}
              >
                Referd
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4 mb-6"
              >
                <Button 
                  variant="mustard" 
                  size="cta"
                  className={`w-full ${shouldPulse ? 'animate-pulse' : ''}`}
                >
                  Check My Worth
                </Button>
                <Button 
                  variant="outline" 
                  size="cta"
                  className={`w-full border-2 border-forest text-forest hover:bg-forest hover:text-white ${shouldPulse ? 'animate-pulse' : ''}`}
                >
                  Start Earning
                </Button>
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-gray-500"
              >
                Join 4,293 people building the future
              </motion.p>
            </motion.div>
          )}

        </AnimatePresence>

        {/* Progress indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-sage rounded-full"
            style={{ width: `${(currentTime / 20) * 100}%` }}
          />
        </div>

        {/* Replay button (appears at end) */}
        {currentTime >= 20 && (
          <button
            onClick={() => {
              setCurrentTime(0);
              setCtaIdleTime(0);
            }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 text-xs text-sage underline"
          >
            Replay
          </button>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
