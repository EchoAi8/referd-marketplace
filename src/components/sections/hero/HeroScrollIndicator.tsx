import { motion } from "framer-motion";

const HeroScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, delay: 2.0 }}
    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
  >
    <span className="text-[10px] uppercase tracking-[0.3em] text-background/30 font-medium">
      Scroll
    </span>
    <motion.div
      animate={{ y: [0, 8, 0] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      className="w-[1px] h-8 bg-gradient-to-b from-background/40 to-transparent"
    />
  </motion.div>
);

export default HeroScrollIndicator;
