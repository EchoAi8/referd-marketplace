import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const AnimatedBackgroundText = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Element 1: REFER - rotating */}
      <motion.span
        className="absolute font-heading font-extrabold select-none"
        style={{
          top: "10%",
          left: "-5%",
          fontSize: "15vw",
          color: "#C5EA86",
          opacity: 0.08,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        REFER
      </motion.span>

      {/* Element 2: EARN - scaling */}
      <motion.span
        className="absolute font-heading font-extrabold select-none"
        style={{
          top: "15%",
          left: "80%",
          fontSize: "12vw",
          color: "#FFCE00",
          opacity: 0.08,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        EARN
      </motion.span>

      {/* Element 3: £5,000 - opacity pulse (hidden on mobile) */}
      <motion.span
        className="absolute font-heading font-extrabold select-none hidden md:block"
        style={{
          top: "45%",
          left: "-10%",
          fontSize: "18vw",
          color: "#FFACD1",
          willChange: "opacity",
          backfaceVisibility: "hidden",
        }}
        animate={{ opacity: [0.03, 0.1, 0.03] }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        £5,000
      </motion.span>

      {/* Element 4: NETWORK - horizontal scroll (hidden on mobile) */}
      <motion.span
        className="absolute font-heading font-extrabold select-none hidden md:block"
        style={{
          top: "70%",
          left: "5%",
          fontSize: "10vw",
          color: "#C5EA86",
          opacity: 0.08,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ x: ["-20%", "120%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        NETWORK
      </motion.span>

      {/* Element 5: CONNECT - vertical scroll */}
      <motion.span
        className="absolute font-heading font-extrabold select-none"
        style={{
          top: "50%",
          left: "75%",
          fontSize: "13vw",
          color: "#FFCE00",
          opacity: 0.08,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ y: ["100%", "-100%"] }}
        transition={{
          duration: 35,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        CONNECT
      </motion.span>

      {/* Element 6: YOUR HERD - scale pulse (hidden on mobile) */}
      <motion.span
        className="absolute font-heading font-extrabold select-none hidden md:block"
        style={{
          top: "80%",
          left: "60%",
          fontSize: "8vw",
          color: "#FFACD1",
          opacity: 0.08,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        YOUR HERD
      </motion.span>

      {/* Mobile: reduced opacity versions */}
      <motion.span
        className="absolute font-heading font-extrabold select-none md:hidden"
        style={{
          top: "10%",
          left: "-5%",
          fontSize: "20vw",
          color: "#C5EA86",
          opacity: 0.05,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        REFER
      </motion.span>

      <motion.span
        className="absolute font-heading font-extrabold select-none md:hidden"
        style={{
          top: "50%",
          left: "60%",
          fontSize: "15vw",
          color: "#FFCE00",
          opacity: 0.05,
          willChange: "transform",
          backfaceVisibility: "hidden",
        }}
        animate={{ scale: [0.9, 1.1, 0.9] }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        EARN
      </motion.span>
    </div>
  );
};

const LiveTicker = () => {
  const tickerText = "Sarah L. earned £5,000  •  Marcus J. earned £3,200  •  Emma W. earned £4,100  •  David K. earned £2,800  •  Lisa M. earned £5,500  •  ";
  const repeatedContent = tickerText.repeat(4);

  return (
    <div 
      className="absolute bottom-0 left-0 w-full h-[60px] flex items-center overflow-hidden"
      style={{
        background: "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(10,10,10,1) 100%)",
        borderTop: "1px solid rgba(255, 255, 255, 0.05)",
      }}
    >
      <motion.div
        className="inline-flex whitespace-nowrap"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      >
        <span className="font-heading font-medium text-base md:text-base text-[0.875rem] text-mustard px-2">
          {repeatedContent}
        </span>
        <span className="font-heading font-medium text-base md:text-base text-[0.875rem] text-mustard px-2">
          {repeatedContent}
        </span>
      </motion.div>
    </div>
  );
};

const ScrollIndicator = () => (
  <motion.div
    className="absolute bottom-24 left-1/2 flex flex-col items-center gap-2"
    initial={{ opacity: 0 }}
    animate={{ 
      opacity: 1,
      y: [0, 10, 0],
    }}
    transition={{
      opacity: { delay: 1.5, duration: 0.8 },
      y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
    }}
    style={{ transform: "translateX(-50%)" }}
  >
    <ChevronDown 
      className="w-6 h-6" 
      style={{ color: "rgba(255, 255, 255, 0.5)" }} 
    />
    <span 
      className="text-sm font-normal uppercase tracking-widest hidden md:block"
      style={{ color: "rgba(255, 255, 255, 0.4)" }}
    >
      Scroll to explore
    </span>
  </motion.div>
);

const Logo = () => (
  <motion.div
    className="fixed top-6 left-6 md:top-8 md:left-8 z-[100]"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
  >
    <div 
      className="w-[90px] md:w-[140px] h-[45px] md:h-[60px] flex items-center justify-center"
      style={{ transition: "all 0.3s ease" }}
    >
      <span className="text-sage font-heading font-bold text-2xl md:text-3xl tracking-tight">
        REFERD
      </span>
    </div>
  </motion.div>
);


const HeroSection = () => {
  return (
    <section 
      className="relative h-screen bg-black flex items-center justify-center overflow-hidden"
    >
      {/* Animated Background Layer */}
      <AnimatedBackgroundText />

      {/* Logo */}
      <Logo />

      {/* Content Layer */}
      <div className="relative z-10 max-w-[1000px] mx-auto px-8 md:px-16 text-center flex flex-col gap-8 md:gap-12 items-center">
        {/* Main Headline */}
        <motion.h1
          className="font-heading font-extrabold text-white text-center mx-auto max-w-[900px]"
          style={{
            fontSize: "clamp(3rem, 8vw, 6rem)",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.4, 0, 0.2, 1] as const }}
        >
          Gather Your Herd,
          <br />
          Get Paid with Referd
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          className="font-heading font-normal text-center mx-auto max-w-[650px]"
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            lineHeight: 1.6,
            color: "#A3A3A3",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.4, 0, 0.2, 1] as const }}
        >
          The marketplace disrupting recruitment.
          <br />
          35% for you. 35% for them. 30% for progress.
        </motion.p>

        {/* CTA Container */}
        <motion.div
          className="flex flex-col md:flex-row gap-4 justify-center flex-wrap w-full md:w-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.4, 0, 0.2, 1] as const }}
        >
          {/* Primary Button */}
          <motion.button
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-lg border-none cursor-pointer w-full md:w-auto max-w-[320px] mx-auto md:mx-0"
            style={{
              background: "#C5EA86",
              color: "#000000",
              padding: "1.125rem 2.5rem",
              borderRadius: "100px",
              boxShadow: "0 4px 12px rgba(197, 234, 134, 0.3)",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              boxShadow: "0 8px 20px rgba(197, 234, 134, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>💰</span>
            <span>Check My Market Value</span>
          </motion.button>

          {/* Secondary Button */}
          <motion.button
            className="inline-flex items-center justify-center gap-2 font-heading font-semibold text-lg cursor-pointer w-full md:w-auto max-w-[320px] mx-auto md:mx-0"
            style={{
              background: "transparent",
              color: "#C5EA86",
              border: "2px solid #C5EA86",
              padding: "calc(1.125rem - 2px) calc(2.5rem - 2px)",
              borderRadius: "100px",
              transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            whileHover={{
              scale: 1.05,
              y: -2,
              background: "#C5EA86",
              color: "#000000",
            }}
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
