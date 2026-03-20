import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

const words = [
  { text: "People", color: "text-referrer" },
  { text: "Powered", color: "text-background" },
  { text: "Recruitment", color: "text-background/70" },
];

const HeroTagline = () => (
  <>
    {/* Main tagline */}
    <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold leading-[1.1]">
      {words.map(({ text, color }, i) => (
        <motion.span
          key={text}
          initial={{ opacity: 0, y: 30, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.5 + i * 0.12, ease }}
          className={`inline-block mr-[0.25em] ${color}`}
        >
          {text}
        </motion.span>
      ))}
    </p>

    {/* Sub-copy — one line, punchy */}
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 1.0, ease }}
      className="mt-4 text-background/60 text-base sm:text-lg md:text-xl max-w-xl leading-relaxed"
    >
      Earn from your network. Know your worth. Everyone wins.
    </motion.p>
  </>
);

export default HeroTagline;
