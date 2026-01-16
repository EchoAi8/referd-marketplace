import { motion, type Transition } from "framer-motion";
import { ChevronDown } from "lucide-react";

interface AnimatedWord {
  text: string;
  animate: {
    rotate?: number[];
    scale?: number[];
    opacity?: number[];
    x?: string[];
    y?: string[];
  };
  transition: Transition;
  position: string;
}

const AnimatedBackgroundText = () => {
  const words: AnimatedWord[] = [
    {
      text: "REFER",
      animate: { rotate: [0, 360] },
      transition: { duration: 20, repeat: Infinity, ease: "linear" as const },
      position: "top-[10%] left-[5%]"
    },
    {
      text: "EARN",
      animate: { scale: [0.8, 1.2, 0.8] },
      transition: { duration: 15, repeat: Infinity, ease: "easeInOut" as const },
      position: "top-[20%] right-[10%]"
    },
    {
      text: "£5,000",
      animate: { opacity: [0.1, 0.25, 0.1] },
      transition: { duration: 10, repeat: Infinity, ease: "easeInOut" as const },
      position: "top-[45%] left-[15%]"
    },
    {
      text: "NETWORK",
      animate: { x: ["-100%", "100%"] },
      transition: { duration: 25, repeat: Infinity, ease: "linear" as const },
      position: "top-[60%] left-0"
    },
    {
      text: "CONNECT",
      animate: { y: ["100%", "-100%"] },
      transition: { duration: 18, repeat: Infinity, ease: "linear" as const },
      position: "top-[30%] right-[5%]"
    },
    {
      text: "YOUR HERD",
      animate: { scale: [1, 1.1, 1] },
      transition: { duration: 12, repeat: Infinity, ease: "easeInOut" as const },
      position: "bottom-[25%] left-[25%]"
    }
  ];

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={`absolute ${word.position} font-heading font-extrabold text-sage whitespace-nowrap select-none hidden md:block`}
          style={{
            fontSize: "clamp(6rem, 15vw, 12rem)",
            opacity: 0.15,
            willChange: "transform, opacity"
          }}
          animate={word.animate}
          transition={word.transition}
        >
          {word.text}
        </motion.span>
      ))}
      {/* Mobile: Show fewer words */}
      {words.slice(0, 3).map((word, index) => (
        <motion.span
          key={`mobile-${index}`}
          className={`absolute ${word.position} font-heading font-extrabold text-sage whitespace-nowrap select-none md:hidden`}
          style={{
            fontSize: "clamp(3rem, 12vw, 6rem)",
            opacity: 0.1,
            willChange: "transform, opacity"
          }}
          animate={word.animate}
          transition={word.transition}
        >
          {word.text}
        </motion.span>
      ))}
    </div>
  );
};

const LiveTicker = () => {
  const earnings = [
    "Sarah L. earned £5,000",
    "Marcus J. earned £3,200",
    "Emma W. earned £4,100",
    "David K. earned £2,800",
    "Lisa M. earned £5,500"
  ];

  const tickerContent = [...earnings, ...earnings, ...earnings].join(" | ") + " | ";

  return (
    <div className="absolute bottom-0 left-0 right-0 bg-[#0A0A0A] py-4 overflow-hidden">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: ["0%", "-33.33%"] }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear" as const
        }}
        style={{ willChange: "transform" }}
      >
        <span className="text-mustard font-body font-medium text-base px-4">
          {tickerContent}
        </span>
        <span className="text-mustard font-body font-medium text-base px-4">
          {tickerContent}
        </span>
      </motion.div>
    </div>
  );
};

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-24 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 0.6 }}
    transition={{ delay: 2, duration: 0.8 }}
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
    >
      <ChevronDown className="w-6 h-6 text-white" />
    </motion.div>
    <span className="text-white text-sm font-body">Scroll to explore</span>
  </motion.div>
);

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-black flex items-center justify-center px-4 py-8 md:px-8 md:py-16 overflow-hidden">
      {/* Animated Background Text */}
      <AnimatedBackgroundText />

      {/* Logo */}
      <motion.div
        className="absolute top-6 left-6 md:top-8 md:left-8 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="w-20 h-10 md:w-[120px] md:h-[60px] bg-sage/20 rounded-md flex items-center justify-center">
          <span className="text-sage font-heading font-bold text-lg md:text-xl">
            referd
          </span>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 max-w-[900px] mx-auto text-center px-4">
        {/* Headline */}
        <motion.h1
          className="font-heading font-extrabold text-white text-fluid-6xl leading-[1.1] mb-6 md:mb-8"
          style={{ letterSpacing: "-0.02em" }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Gather Your Herd, Get Paid with Referd
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-body font-normal text-[#999999] text-fluid-xl max-w-[700px] mx-auto mb-8 md:mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          The marketplace disrupting recruitment. 35% for you. 35% for them. 30% for progress.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <motion.button
            className="btn-primary flex items-center gap-2 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>💰</span>
            <span>Check My Market Value</span>
          </motion.button>

          <motion.button
            className="btn-secondary flex items-center gap-2 w-full sm:w-auto justify-center"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>🚀</span>
            <span>Start Referring</span>
          </motion.button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <ScrollIndicator />

      {/* Live Ticker */}
      <LiveTicker />
    </section>
  );
};

export default HeroSection;
