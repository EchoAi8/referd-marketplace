import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VideoIntroProps {
  onComplete: () => void;
}

const VideoIntro = ({ onComplete }: VideoIntroProps) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Frame timings in milliseconds
  const frameDurations = [
    1000,  // 0: Intro text
    1000,  // 1: iPhone appears
    1000,  // 2: Pain 1
    1000,  // 3: Pain 2
    1000,  // 4: Pain 3
    1000,  // 5: Shift
    1000,  // 6: Solution 1
    1000,  // 7: Solution 2
    1000,  // 8: Solution 3
    2000,  // 9: Desktop intro
    2000,  // 10: Desktop feature
    2000,  // 11: Model
    1000,  // 12: Stats
    1000,  // 13: Positioning
    1000,  // 14: Brand
    5000,  // 15: CTA (longer, waits for interaction)
  ];

  // Auto-advance frames
  useEffect(() => {
    if (!isVisible || prefersReducedMotion) return;
    if (currentFrame >= frameDurations.length - 1) return;

    const timer = setTimeout(() => {
      setCurrentFrame((prev) => prev + 1);
    }, frameDurations[currentFrame]);

    return () => clearTimeout(timer);
  }, [currentFrame, isVisible, prefersReducedMotion]);

  // Auto-complete after final frame
  useEffect(() => {
    if (currentFrame === frameDurations.length - 1) {
      const timer = setTimeout(() => {
        handleComplete();
      }, frameDurations[frameDurations.length - 1]);
      return () => clearTimeout(timer);
    }
  }, [currentFrame]);

  const handleComplete = useCallback(() => {
    setIsVisible(false);
    setTimeout(onComplete, 500);
  }, [onComplete]);

  const handleSkip = useCallback(() => {
    handleComplete();
  }, [handleComplete]);

  // If reduced motion, show static version
  if (prefersReducedMotion) {
    return (
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-white flex flex-col items-center justify-center"
          >
            <div className="text-center px-8">
              <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-black mb-4">
                Referd
              </h1>
              <p className="text-lg text-gray-500 mb-8">People-powered recruitment</p>
              <button
                onClick={handleComplete}
                className="font-heading font-semibold text-lg bg-sage text-black px-8 py-4 rounded-full hover:scale-105 transition-transform"
              >
                Enter Site
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[10000] bg-white overflow-hidden"
          style={{ width: "100vw", height: "100vh" }}
          role="region"
          aria-label="Introduction video"
        >
          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            onClick={handleSkip}
            className="fixed top-8 right-8 z-[10001] font-heading text-sm text-gray-400 hover:text-black hover:underline transition-colors focus:outline-none focus:ring-2 focus:ring-sage rounded"
            tabIndex={0}
          >
            Skip →
          </motion.button>

          {/* Screen reader text */}
          <div className="sr-only" aria-live="polite">
            Referd - People-powered recruitment. Get paid for your network.
          </div>

          {/* Frame Container */}
          <div className="w-full h-full flex items-center justify-center">
            <AnimatePresence mode="wait">
              {currentFrame === 0 && <IntroFrame key="intro" />}
              {currentFrame === 1 && <DeviceIntroFrame key="device" />}
              {currentFrame === 2 && <PainFrame1 key="pain1" />}
              {currentFrame === 3 && <PainFrame2 key="pain2" />}
              {currentFrame === 4 && <PainFrame3 key="pain3" />}
              {currentFrame === 5 && <ShiftFrame key="shift" />}
              {currentFrame === 6 && <SolutionFrame1 key="sol1" />}
              {currentFrame === 7 && <SolutionFrame2 key="sol2" />}
              {currentFrame === 8 && <SolutionFrame3 key="sol3" />}
              {currentFrame === 9 && <DesktopIntroFrame key="desktop" />}
              {currentFrame === 10 && <DesktopFeatureFrame key="desktopFeat" />}
              {currentFrame === 11 && <ModelFrame key="model" />}
              {currentFrame === 12 && <StatsFrame key="stats" />}
              {currentFrame === 13 && <PositioningFrame key="pos" />}
              {currentFrame === 14 && <BrandFrame key="brand" />}
              {currentFrame === 15 && <CTAFrame onAction={handleComplete} key="cta" />}
            </AnimatePresence>
          </div>

          {/* Progress Bar */}
          <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-sage rounded-full"
              initial={{ width: "0%" }}
              animate={{ width: `${((currentFrame + 1) / frameDurations.length) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════
// DEVICE MOCKUP COMPONENTS
// ═══════════════════════════════════════════════════════════════

const IPhoneMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`} style={{ willChange: "transform" }}>
    {/* Device Frame */}
    <div className="relative bg-[#1a1a1a] rounded-[44px] p-[10px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25),0_30px_60px_-30px_rgba(0,0,0,0.3)]">
      {/* Dynamic Island */}
      <div className="absolute top-[18px] left-1/2 -translate-x-1/2 w-[90px] h-[28px] bg-black rounded-full z-10" />
      {/* Screen */}
      <div className="bg-white rounded-[34px] overflow-hidden w-[240px] h-[520px] md:w-[280px] md:h-[600px]">
        {children}
      </div>
    </div>
    {/* Side Button */}
    <div className="absolute right-[-2px] top-[120px] w-[3px] h-[60px] bg-[#2a2a2a] rounded-r" />
    <div className="absolute left-[-2px] top-[100px] w-[3px] h-[30px] bg-[#2a2a2a] rounded-l" />
    <div className="absolute left-[-2px] top-[140px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l" />
    <div className="absolute left-[-2px] top-[200px] w-[3px] h-[50px] bg-[#2a2a2a] rounded-l" />
  </div>
);

const MacBookMockup = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={`relative ${className}`} style={{ willChange: "transform" }}>
    {/* Screen Bezel */}
    <div className="bg-[#1a1a1a] rounded-t-xl p-[8px] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)]">
      {/* Camera */}
      <div className="absolute top-[4px] left-1/2 -translate-x-1/2 w-[6px] h-[6px] bg-[#3a3a3a] rounded-full" />
      {/* Inner Bezel */}
      <div className="bg-[#0a0a0a] rounded-lg p-1">
        {/* Screen */}
        <div className="bg-white rounded-md overflow-hidden w-[360px] h-[225px] md:w-[480px] md:h-[300px]">
          {children}
        </div>
      </div>
    </div>
    {/* Bottom Hinge */}
    <div className="bg-[#c0c0c0] h-[12px] rounded-b-lg mx-[-4px] shadow-inner" />
    {/* Base */}
    <div className="bg-gradient-to-b from-[#d0d0d0] to-[#a8a8a8] h-[8px] rounded-b-xl mx-4" />
  </div>
);

// ═══════════════════════════════════════════════════════════════
// SCREEN CONTENT COMPONENTS
// ═══════════════════════════════════════════════════════════════

const LinkedInJobsScreen = () => (
  <div className="h-full bg-white p-4 font-body">
    <div className="bg-[#0077B5] text-white text-xs font-semibold px-3 py-2 rounded mb-4 flex items-center gap-2">
      <span className="text-base">in</span> Jobs
    </div>
    <div className="space-y-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="border border-gray-100 rounded-lg p-3 hover:shadow-sm transition-shadow">
          <div className="flex gap-3">
            <div className="w-10 h-10 bg-gray-100 rounded" />
            <div className="flex-1">
              <div className="h-3 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="h-2 bg-gray-100 rounded w-1/2" />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const RejectionEmailScreen = () => (
  <div className="h-full bg-gray-50 p-4 font-body">
    <div className="text-xs font-semibold text-gray-500 mb-4">Inbox</div>
    <div className="space-y-2">
      {[
        "Unfortunately, we won't be...",
        "We regret to inform you...",
        "After careful consideration...",
        "Thank you for applying, but..."
      ].map((text, i) => (
        <div key={i} className="bg-white border-l-4 border-red-400 rounded-r-lg p-3 shadow-sm">
          <div className="flex items-start gap-2">
            <div className="w-2 h-2 bg-red-400 rounded-full mt-1 flex-shrink-0" />
            <div>
              <div className="text-[10px] font-medium text-gray-700 truncate">{text}</div>
              <div className="text-[8px] text-gray-400 mt-1">Today</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AgencyFeeScreen = () => (
  <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6 font-body">
    <div className="text-sm text-gray-500 mb-2">Recruitment Agency</div>
    <div className="text-5xl font-extrabold text-red-500 mb-2">20-25%</div>
    <div className="text-xs text-gray-400">of annual salary</div>
    <div className="mt-4 text-center">
      <div className="text-2xl font-bold text-gray-300">= £25,000</div>
      <div className="text-[10px] text-gray-400">for a £100k hire</div>
    </div>
  </div>
);

const DeadJobBoardScreen = () => (
  <div className="h-full bg-white p-4 font-body">
    <div className="text-xs font-semibold text-gray-400 mb-4">Job Board</div>
    <div className="space-y-3 opacity-60">
      {[1, 2, 3].map((i) => (
        <div key={i} className="border border-gray-200 rounded-lg p-3 relative">
          <div className="absolute top-2 right-2 text-[8px] text-red-500 font-semibold bg-red-50 px-2 py-0.5 rounded">
            EXPIRED
          </div>
          <div className="h-3 bg-gray-200 rounded w-2/3 mb-2" />
          <div className="h-2 bg-gray-100 rounded w-1/2" />
        </div>
      ))}
    </div>
    <div className="text-center mt-6 text-xs text-gray-400">
      Last updated: 3 weeks ago
    </div>
  </div>
);

const SalaryReportScreen = () => (
  <div className="h-full bg-gradient-to-br from-sage/10 to-white flex flex-col items-center justify-center p-6 font-body">
    <div className="w-16 h-16 rounded-full bg-sage/20 flex items-center justify-center mb-4">
      <svg className="w-8 h-8 text-sage" fill="currentColor" viewBox="0 0 20 20">
        <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm0 14a6 6 0 110-12 6 6 0 010 12zm1-9H9v2h2V7zm0 4H9v4h2v-4z" />
      </svg>
    </div>
    <div className="text-xs text-gray-500 mb-2">Your Market Value</div>
    <div className="text-4xl font-extrabold text-forest mb-4">£95K</div>
    <div className="w-full max-w-[160px] bg-gray-200 rounded-full h-2 mb-2">
      <div className="bg-sage h-2 rounded-full w-3/4" />
    </div>
    <div className="text-[10px] text-gray-500">Top 25% in your field</div>
  </div>
);

const ReferralConfirmScreen = () => (
  <div className="h-full bg-white flex flex-col items-center justify-center p-6 font-body">
    <div className="w-20 h-20 rounded-full bg-sage/20 flex items-center justify-center mb-4">
      <svg className="w-10 h-10 text-sage" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
      </svg>
    </div>
    <div className="text-sm font-semibold text-gray-800 mb-1">Referral Submitted!</div>
    <div className="text-xs text-gray-500 mb-4">You referred Sarah Chen</div>
    <div className="bg-sage/10 rounded-xl px-6 py-3 text-center">
      <div className="text-[10px] text-gray-500">Potential Earnings</div>
      <div className="text-2xl font-extrabold text-sage">£3,500</div>
    </div>
  </div>
);

const EarningsDashboardScreen = () => (
  <div className="h-full bg-gradient-to-br from-mustard/10 to-white p-4 font-body">
    <div className="text-sm font-semibold text-gray-800 mb-4">Your Earnings</div>
    <div className="bg-white rounded-xl p-4 shadow-sm mb-4">
      <div className="text-xs text-gray-500 mb-1">Total Earned</div>
      <div className="text-3xl font-extrabold text-forest">£12,400</div>
    </div>
    <div className="grid grid-cols-2 gap-2">
      <div className="bg-sage/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-sage">4</div>
        <div className="text-[9px] text-gray-500">Successful</div>
      </div>
      <div className="bg-mustard/10 rounded-lg p-3 text-center">
        <div className="text-xl font-bold text-mustard">2</div>
        <div className="text-[9px] text-gray-500">Pending</div>
      </div>
    </div>
  </div>
);

const BrandDashboardScreen = () => (
  <div className="h-full bg-gray-50 p-4 font-body">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-8 h-8 rounded-lg bg-sage flex items-center justify-center text-white text-sm font-bold">R</div>
      <div>
        <div className="text-sm font-semibold">Referd Dashboard</div>
        <div className="text-[10px] text-gray-500">Brand Account</div>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-2 mb-4">
      <div className="bg-white rounded-lg p-2 text-center shadow-sm">
        <div className="text-lg font-bold text-sage">12</div>
        <div className="text-[8px] text-gray-500">Active Roles</div>
      </div>
      <div className="bg-white rounded-lg p-2 text-center shadow-sm">
        <div className="text-lg font-bold text-mustard">47</div>
        <div className="text-[8px] text-gray-500">Candidates</div>
      </div>
      <div className="bg-white rounded-lg p-2 text-center shadow-sm">
        <div className="text-lg font-bold text-forest">£8K</div>
        <div className="text-[8px] text-gray-500">Saved</div>
      </div>
    </div>
    <div className="bg-white rounded-lg p-3 shadow-sm">
      <div className="text-xs font-semibold mb-2">Recent Activity</div>
      <div className="space-y-2">
        {[1, 2].map((i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gray-100 rounded-full" />
            <div className="flex-1">
              <div className="h-2 bg-gray-100 rounded w-3/4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const JobPostingScreen = () => (
  <div className="h-full bg-white p-4 font-body">
    <div className="text-sm font-semibold text-gray-800 mb-4">Post a Role</div>
    <div className="space-y-3">
      <div className="border border-gray-200 rounded-lg p-3">
        <div className="text-[10px] text-gray-500 mb-1">Role Title</div>
        <div className="text-sm font-medium">Senior Developer</div>
      </div>
      <div className="border border-sage rounded-lg p-3 bg-sage/5">
        <div className="text-[10px] text-gray-500 mb-1">Your Fee (vs Agency)</div>
        <div className="flex items-baseline gap-2">
          <span className="text-lg font-bold text-sage">£5,000</span>
          <span className="text-xs text-gray-400 line-through">£25,000</span>
        </div>
        <div className="text-[10px] text-sage font-medium mt-1">Save 80%</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-gray-50 rounded-lg p-2 text-center">
          <div className="text-xl font-bold text-gray-800">23</div>
          <div className="text-[9px] text-gray-500">Applicants</div>
        </div>
        <div className="bg-sage/10 rounded-lg p-2 text-center">
          <div className="text-xl font-bold text-sage">5</div>
          <div className="text-[9px] text-gray-500">Shortlisted</div>
        </div>
      </div>
    </div>
  </div>
);

// ═══════════════════════════════════════════════════════════════
// FRAME COMPONENTS
// ═══════════════════════════════════════════════════════════════

const frameVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

const IntroFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
    className="text-center px-8"
  >
    <h1 className="font-heading font-semibold text-[clamp(1.5rem,5vw,2.5rem)] text-black leading-tight">
      Ever feel like<br />recruitment is broken?
    </h1>
  </motion.div>
);

const DeviceIntroFrame = () => (
  <motion.div
    initial={{ opacity: 0, x: 200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <LinkedInJobsScreen />
    </IPhoneMockup>
  </motion.div>
);

const PainFrame1 = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <RejectionEmailScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      CVs no one reads
    </motion.p>
  </motion.div>
);

const PainFrame2 = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <AgencyFeeScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Agencies taking 30%
    </motion.p>
  </motion.div>
);

const PainFrame3 = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <DeadJobBoardScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Dead-end job boards
    </motion.p>
  </motion.div>
);

const ShiftFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.3 }}
    className="text-center px-8"
  >
    <h2 className="font-heading font-semibold text-[clamp(2rem,6vw,3rem)] text-black">
      There's a better way
    </h2>
  </motion.div>
);

const SolutionFrame1 = () => (
  <motion.div
    initial={{ opacity: 0, x: -200 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <SalaryReportScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Know your worth
    </motion.p>
  </motion.div>
);

const SolutionFrame2 = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <ReferralConfirmScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Get paid for referrals
    </motion.p>
  </motion.div>
);

const SolutionFrame3 = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    transition={{ duration: 0.2 }}
    className="flex flex-col items-center"
  >
    <IPhoneMockup>
      <EarningsDashboardScreen />
    </IPhoneMockup>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Turn networks into income
    </motion.p>
  </motion.div>
);

const DesktopIntroFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex flex-col items-center"
  >
    <div className="flex items-center gap-4 md:gap-8 scale-[0.65] md:scale-75">
      <motion.div
        initial={{ x: 0, scale: 1 }}
        animate={{ x: -40, scale: 0.8 }}
        transition={{ duration: 0.5 }}
      >
        <IPhoneMockup>
          <EarningsDashboardScreen />
        </IPhoneMockup>
      </motion.div>
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
      >
        <MacBookMockup>
          <BrandDashboardScreen />
        </MacBookMockup>
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Works everywhere
    </motion.p>
  </motion.div>
);

const DesktopFeatureFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="flex flex-col items-center"
  >
    <div className="flex items-center gap-4 md:gap-8 scale-[0.65] md:scale-75">
      <motion.div
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.3 }}
        className="hidden md:block"
      >
        <IPhoneMockup>
          <EarningsDashboardScreen />
        </IPhoneMockup>
      </motion.div>
      <motion.div
        initial={{ scale: 1 }}
        animate={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <MacBookMockup>
          <JobPostingScreen />
        </MacBookMockup>
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="mt-8 font-heading font-semibold text-[1.75rem] text-black"
    >
      Brands save 60%
    </motion.p>
  </motion.div>
);

const ModelFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="text-center px-8"
  >
    <div className="space-y-3 mb-6">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="font-heading font-bold text-2xl text-sage"
      >
        35% Referrer
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="font-heading font-bold text-2xl text-mustard"
      >
        35% Talent
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        className="font-heading font-bold text-2xl text-forest"
      >
        30% Platform
      </motion.div>
    </div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="font-heading text-lg text-gray-500"
    >
      Everyone wins
    </motion.p>
  </motion.div>
);

// Animated Counter Hook
const useAnimatedCounter = (target: number, duration: number = 500) => {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const steps = 30;
    const increment = target / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    
    return () => clearInterval(timer);
  }, [target, duration]);
  
  return count;
};

const StatsFrame = () => {
  const paidOut = useAnimatedCounter(427000, 600);
  const people = useAnimatedCounter(4293, 600);
  const hires = useAnimatedCounter(856, 600);
  
  return (
    <motion.div
      variants={frameVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="text-center px-8 space-y-4"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="font-heading font-extrabold text-[clamp(1.5rem,5vw,2.5rem)] text-black"
      >
        £{paidOut.toLocaleString()} paid out
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="font-heading font-extrabold text-[clamp(1.5rem,5vw,2.5rem)] text-black"
      >
        {people.toLocaleString()} people earning
      </motion.div>
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="font-heading font-extrabold text-[clamp(1.5rem,5vw,2.5rem)] text-black"
      >
        {hires.toLocaleString()} hires made
      </motion.div>
    </motion.div>
  );
};

const PositioningFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="text-center px-8 space-y-3"
  >
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="font-heading font-semibold text-xl text-gray-400"
    >
      Uber → Travel
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      className="font-heading font-semibold text-xl text-gray-400"
    >
      Airbnb → Hospitality
    </motion.div>
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="font-heading font-semibold text-xl text-black"
    >
      Referd → Recruitment
    </motion.div>
  </motion.div>
);

const BrandFrame = () => (
  <motion.div
    variants={frameVariants}
    initial="initial"
    animate="animate"
    exit="exit"
    className="text-center"
  >
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="font-heading font-extrabold text-[clamp(3rem,10vw,4rem)] text-sage mb-4"
    >
      REFERD
    </motion.div>
    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3 }}
      className="font-heading text-lg text-gray-500"
    >
      People-powered recruitment
    </motion.p>
  </motion.div>
);

const CTAFrame = ({ onAction }: { onAction: () => void }) => {
  const [shouldPulse, setShouldPulse] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setShouldPulse(true), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <motion.div
      variants={frameVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="text-center px-8"
    >
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
        className="font-heading font-extrabold text-[clamp(2.5rem,8vw,3.5rem)] text-forest mb-8"
      >
        REFERD
      </motion.div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row gap-4 justify-center mb-6"
      >
        <motion.button
          animate={shouldPulse ? { scale: [1, 1.03, 1] } : {}}
          transition={shouldPulse ? { duration: 1, repeat: Infinity } : {}}
          onClick={onAction}
          className="font-heading font-semibold text-lg bg-sage text-black px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          Check My Worth
        </motion.button>
        <motion.button
          animate={shouldPulse ? { scale: [1, 1.03, 1] } : {}}
          transition={shouldPulse ? { duration: 1, repeat: Infinity, delay: 0.5 } : {}}
          onClick={onAction}
          className="font-heading font-semibold text-lg bg-black text-white px-8 py-4 rounded-full hover:scale-105 transition-transform shadow-lg"
        >
          Start Earning
        </motion.button>
      </motion.div>
      
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="font-heading text-sm text-gray-400"
      >
        Join 4,293 people building the future
      </motion.p>
    </motion.div>
  );
};

export default VideoIntro;
