import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Scene timing configuration (in seconds)
const SCENE_TIMINGS = {
  pain: 5,
  agitation: 3,
  aspiration: 7,
  solution: 3,
  proof: 5,
  mechanism: 5,
  fomo: 4,
  close: 999, // stays on close indefinitely
};

const TOTAL_DURATION = Object.values(SCENE_TIMINGS).slice(0, -1).reduce((a, b) => a + b, 0);

type SceneType = keyof typeof SCENE_TIMINGS;

const HeroSection = () => {
  const [currentScene, setCurrentScene] = useState<SceneType>("pain");
  const [painPhase, setPainPhase] = useState(0);
  const [counter, setCounter] = useState(0);
  const [liveCounter, setLiveCounter] = useState(2847);

  // Scene progression
  useEffect(() => {
    const sceneOrder: SceneType[] = ["pain", "agitation", "aspiration", "solution", "proof", "mechanism", "fomo", "close"];
    let currentIndex = 0;
    
    const advanceScene = () => {
      currentIndex++;
      if (currentIndex < sceneOrder.length) {
        setCurrentScene(sceneOrder[currentIndex]);
      }
    };

    const timers: NodeJS.Timeout[] = [];
    let accumulatedTime = 0;

    sceneOrder.forEach((scene, index) => {
      if (index > 0) {
        accumulatedTime += SCENE_TIMINGS[sceneOrder[index - 1]] * 1000;
        const timer = setTimeout(() => {
          setCurrentScene(scene);
        }, accumulatedTime);
        timers.push(timer);
      }
    });

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  // Pain phase progression
  useEffect(() => {
    if (currentScene === "pain") {
      const interval = setInterval(() => {
        setPainPhase(p => (p < 2 ? p + 1 : p));
      }, 1600);
      return () => clearInterval(interval);
    }
  }, [currentScene]);

  // Counter animation for agitation
  useEffect(() => {
    if (currentScene === "agitation") {
      setCounter(0);
      const target = 25000;
      const duration = 1500;
      const steps = 60;
      const increment = target / steps;
      let current = 0;
      
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          setCounter(target);
          clearInterval(interval);
        } else {
          setCounter(Math.floor(current));
        }
      }, duration / steps);
      
      return () => clearInterval(interval);
    }
  }, [currentScene]);

  // Live counter for fomo
  useEffect(() => {
    if (currentScene === "fomo") {
      const interval = setInterval(() => {
        setLiveCounter(c => c + Math.floor(Math.random() * 3) + 1);
      }, 800);
      return () => clearInterval(interval);
    }
  }, [currentScene]);

  return (
    <section className="relative min-h-screen bg-white overflow-hidden">
      <AnimatePresence mode="wait">
        {/* SCENE 1: THE PAIN */}
        {currentScene === "pain" && (
          <PainScene phase={painPhase} key="pain" />
        )}

        {/* SCENE 2: THE AGITATION */}
        {currentScene === "agitation" && (
          <AgitationScene counter={counter} key="agitation" />
        )}

        {/* SCENE 3: THE ASPIRATION */}
        {currentScene === "aspiration" && (
          <AspirationScene key="aspiration" />
        )}

        {/* SCENE 4: THE SOLUTION */}
        {currentScene === "solution" && (
          <SolutionScene key="solution" />
        )}

        {/* SCENE 5: THE PROOF */}
        {currentScene === "proof" && (
          <ProofScene key="proof" />
        )}

        {/* SCENE 6: THE MECHANISM */}
        {currentScene === "mechanism" && (
          <MechanismScene key="mechanism" />
        )}

        {/* SCENE 7: THE FOMO */}
        {currentScene === "fomo" && (
          <FomoScene liveCounter={liveCounter} key="fomo" />
        )}

        {/* SCENE 8: THE CLOSE */}
        {currentScene === "close" && (
          <CloseScene key="close" />
        )}
      </AnimatePresence>
    </section>
  );
};

// ============ SCENE COMPONENTS ============

const PainScene = ({ phase }: { phase: number }) => {
  const painTexts = [
    { line1: "Ever uploaded a CV", line2: "nobody reads?" },
    { line1: "Ever paid an agency 20%", line2: "to do... what exactly?" },
    { line1: "Ever referred someone", line2: "and got nothing?" },
  ];

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* iPhone Mockup */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-[200px] md:w-[280px] h-[400px] md:h-[560px] bg-gray-100 rounded-[40px] border-8 border-gray-900 relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-gray-900 rounded-b-2xl" />
          <div className="w-full h-full bg-gradient-to-b from-gray-50 to-gray-100 flex items-center justify-center p-6">
            <AnimatePresence mode="wait">
              <motion.div
                key={phase}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="text-center"
              >
                {phase === 0 && (
                  <div className="space-y-2">
                    <div className="w-full h-4 bg-blue-100 rounded mb-2" />
                    <div className="w-3/4 h-4 bg-blue-100 rounded" />
                    <div className="w-1/2 h-4 bg-blue-100 rounded" />
                    <p className="text-xs text-gray-400 mt-4">LinkedIn Jobs</p>
                  </div>
                )}
                {phase === 1 && (
                  <div className="text-left space-y-2">
                    <p className="text-red-500 text-xs font-bold">REJECTED</p>
                    <p className="text-gray-600 text-xs">We regret to inform you...</p>
                    <div className="w-full h-2 bg-gray-200 rounded mt-4" />
                  </div>
                )}
                {phase === 2 && (
                  <div className="text-center">
                    <p className="text-gray-400 text-lg">👻</p>
                    <p className="text-gray-500 text-xs mt-2">No response</p>
                    <p className="text-gray-300 text-[10px] mt-1">Last seen: 3 weeks ago</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      {/* Pain Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={phase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-xl"
        >
          <h2 className="font-heading font-extrabold text-3xl md:text-5xl text-gray-900 leading-tight">
            {painTexts[phase].line1}
            <br />
            {painTexts[phase].line2}
          </h2>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const AgitationScene = ({ counter }: { counter: number }) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Counter */}
        <motion.p className="font-heading font-extrabold text-5xl md:text-7xl text-gray-900 mb-4">
          £{counter.toLocaleString()}
        </motion.p>
        <p className="text-gray-500 text-lg mb-8">Average agency fee</p>

        {/* Split */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 md:gap-8 justify-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <div className="text-center">
            <p className="font-heading font-bold text-2xl text-gray-400">£22,500</p>
            <p className="text-sm text-gray-400">→ Agency</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-2xl text-gray-400">£2,500</p>
            <p className="text-sm text-gray-400">→ Consultant</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-bold text-2xl text-gray-900">£0</p>
            <p className="text-sm text-gray-900 font-bold">→ You</p>
          </div>
        </motion.div>

        {/* Red Alert */}
        <motion.p
          className="text-red-500 font-heading font-bold text-xl md:text-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.5 }}
        >
          90% goes to middlemen
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

const AspirationScene = () => {
  const [aspirationPhase, setAspirationPhase] = useState(0);
  const aspirationTexts = [
    "Imagine...",
    "...your network\nbecoming your income",
    "...getting paid\njust for knowing someone",
    "...hiring someone great\nand keeping 70%",
    "...knowing exactly\nwhat you're worth",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setAspirationPhase(p => (p < aspirationTexts.length - 1 ? p + 1 : p));
    }, 1400);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Network Sphere Visual */}
      <motion.div
        className="relative w-64 h-64 md:w-80 md:h-80 mb-8"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      >
        {/* Nodes */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 md:w-4 md:h-4 rounded-full"
            style={{
              top: `${50 + 40 * Math.sin((i * Math.PI * 2) / 12)}%`,
              left: `${50 + 40 * Math.cos((i * Math.PI * 2) / 12)}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ backgroundColor: "#e5e7eb", scale: 0 }}
            animate={{
              backgroundColor: aspirationPhase >= Math.floor(i / 3) ? "#C5EA86" : "#e5e7eb",
              scale: 1,
              boxShadow: aspirationPhase >= Math.floor(i / 3) ? "0 0 20px rgba(197, 234, 134, 0.6)" : "none",
            }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          />
        ))}
        {/* Center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 md:w-12 md:h-12 rounded-full bg-sage"
          animate={{
            scale: [1, 1.2, 1],
            boxShadow: [
              "0 0 0 rgba(197, 234, 134, 0.4)",
              "0 0 40px rgba(197, 234, 134, 0.8)",
              "0 0 0 rgba(197, 234, 134, 0.4)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>

      {/* Aspiration Text */}
      <AnimatePresence mode="wait">
        <motion.div
          key={aspirationPhase}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-xl"
        >
          <h2 className="font-heading font-light text-2xl md:text-4xl text-gray-900 leading-relaxed whitespace-pre-line">
            {aspirationTexts[aspirationPhase]}
          </h2>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

const SolutionScene = () => {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setRevealed(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-black px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence mode="wait">
        {!revealed ? (
          <motion.h2
            key="dream"
            className="font-heading font-extrabold text-3xl md:text-5xl text-white text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            This isn't a dream.
          </motion.h2>
        ) : (
          <motion.div
            key="reveal"
            className="text-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              <span className="text-sage font-heading font-bold text-4xl md:text-6xl tracking-tight">
                REFERD
              </span>
            </motion.div>
            <motion.h2
              className="font-heading font-extrabold text-3xl md:text-5xl text-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              It's Referd.
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ProofScene = () => {
  const [stats, setStats] = useState({ paidOut: 0, people: 0, hires: 0 });

  useEffect(() => {
    const targets = { paidOut: 427000, people: 4293, hires: 856 };
    const duration = 2000;
    const steps = 60;
    let step = 0;

    const interval = setInterval(() => {
      step++;
      const progress = Math.min(step / steps, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      
      setStats({
        paidOut: Math.floor(targets.paidOut * eased),
        people: Math.floor(targets.people * eased),
        hires: Math.floor(targets.hires * eased),
      });

      if (step >= steps) clearInterval(interval);
    }, duration / steps);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* MacBook Mockup */}
      <motion.div
        className="relative mb-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-[300px] md:w-[500px] h-[200px] md:h-[320px] bg-gray-100 rounded-t-xl border-4 border-gray-800 relative overflow-hidden">
          <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-600 rounded-full" />
          <div className="w-full h-full p-4 md:p-6 bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 h-full">
              <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm flex flex-col justify-center">
                <p className="font-heading font-bold text-sm md:text-xl text-sage">£{stats.paidOut.toLocaleString()}</p>
                <p className="text-[8px] md:text-xs text-gray-500">paid out</p>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm flex flex-col justify-center">
                <p className="font-heading font-bold text-sm md:text-xl text-mustard">{stats.people.toLocaleString()}</p>
                <p className="text-[8px] md:text-xs text-gray-500">people earning</p>
              </div>
              <div className="bg-white rounded-lg p-2 md:p-4 shadow-sm flex flex-col justify-center">
                <p className="font-heading font-bold text-sm md:text-xl text-rose">{stats.hires.toLocaleString()}</p>
                <p className="text-[8px] md:text-xs text-gray-500">hires made</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[340px] md:w-[560px] h-3 md:h-4 bg-gray-300 rounded-b-lg mx-auto" />
      </motion.div>

      {/* Proof Text */}
      <motion.div
        className="text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <h2 className="font-heading font-extrabold text-2xl md:text-4xl text-gray-900">
          Real people.
          <br />
          Real money.
          <br />
          Right now.
        </h2>
      </motion.div>
    </motion.div>
  );
};

const MechanismScene = () => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-8 md:gap-16 max-w-4xl w-full">
        {/* Left: How it works */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="font-heading font-bold text-xl md:text-2xl text-gray-900 mb-6">How it works</h3>
          <div className="flex items-center justify-center md:justify-start gap-4 mb-4">
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-sage/20 flex items-center justify-center text-2xl"
              whileHover={{ scale: 1.1 }}
            >
              🎯
            </motion.div>
            <span className="text-gray-400">→</span>
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-mustard/20 flex items-center justify-center text-2xl"
              whileHover={{ scale: 1.1 }}
            >
              💼
            </motion.div>
            <span className="text-gray-400">→</span>
            <motion.div
              className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-rose/20 flex items-center justify-center text-2xl"
              whileHover={{ scale: 1.1 }}
            >
              🏢
            </motion.div>
          </div>
          <div className="flex justify-center md:justify-start gap-4 text-sm font-heading font-bold">
            <span className="text-sage">35%</span>
            <span className="text-gray-300">|</span>
            <span className="text-mustard">35%</span>
            <span className="text-gray-300">|</span>
            <span className="text-rose">30%</span>
          </div>
          <p className="text-gray-500 mt-2 text-sm">Everyone wins</p>
        </motion.div>

        {/* Right: Why it works */}
        <motion.div
          className="text-center md:text-left"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-heading font-bold text-xl md:text-2xl text-gray-900 mb-6">Why it works</h3>
          <div className="space-y-3">
            {[
              { icon: "🤖", text: "AI matching" },
              { icon: "📊", text: "ML optimization" },
              { icon: "🔗", text: "Network effects" },
              { icon: "✅", text: "Self-regulating" },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="flex items-center gap-3 justify-center md:justify-start"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-gray-700">{item.text}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Comparison */}
      <motion.div
        className="mt-8 md:mt-12 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="font-heading font-light text-lg md:text-xl text-gray-600">
          Uber to travel. Airbnb to hospitality.
          <br />
          <span className="font-bold text-gray-900">Referd to recruitment.</span>
        </p>
      </motion.div>
    </motion.div>
  );
};

const FomoScene = ({ liveCounter }: { liveCounter: number }) => {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center px-8"
      style={{
        background: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Animated Background Pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          background: [
            "linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
            "linear-gradient(135deg, #f5f5f5 0%, #e8e8e8 50%, #f5f5f5 100%)",
            "linear-gradient(135deg, #fafafa 0%, #f0f0f0 50%, #fafafa 100%)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 text-center">
        {/* Live Counter */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="font-heading font-extrabold text-4xl md:text-6xl text-gray-900"
            key={liveCounter}
          >
            {liveCounter.toLocaleString()}
          </motion.p>
          <p className="text-gray-500 text-lg">reports generated today</p>
        </motion.div>

        {/* Urgency Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <h2 className="font-heading font-bold text-2xl md:text-4xl text-gray-900 mb-4">
            The future of work
            <br />
            is being built now
          </h2>
        </motion.div>

        <motion.p
          className="font-heading font-light text-xl md:text-2xl text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          With or without you
        </motion.p>
      </div>
    </motion.div>
  );
};

const CloseScene = () => {
  const [showButtons, setShowButtons] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowButtons(true), 800);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-white px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Headline */}
        <h1 className="font-heading font-extrabold text-4xl md:text-6xl text-gray-900 leading-tight mb-8">
          Gather Your Herd.
          <br />
          Get Paid with Referd.
        </h1>

        {/* CTA Buttons */}
        <AnimatePresence>
          {showButtons && (
            <motion.div
              className="flex flex-col md:flex-row gap-4 justify-center mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.button
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-lg cursor-pointer px-8 py-4 rounded-full"
                style={{
                  background: "#C5EA86",
                  color: "#000000",
                  boxShadow: "0 4px 20px rgba(197, 234, 134, 0.4)",
                }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(197, 234, 134, 0.5)",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Discover Your Worth
              </motion.button>

              <motion.button
                className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-lg cursor-pointer px-8 py-4 rounded-full border-2 border-gray-900"
                style={{
                  background: "transparent",
                  color: "#000000",
                }}
                whileHover={{
                  scale: 1.05,
                  background: "#000000",
                  color: "#ffffff",
                }}
                whileTap={{ scale: 0.98 }}
              >
                Start Earning
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Social Proof */}
        <motion.p
          className="text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          Join 4,293 people building the future
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;
