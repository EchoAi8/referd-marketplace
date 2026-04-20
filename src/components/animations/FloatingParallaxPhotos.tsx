import { motion } from "framer-motion";

/**
 * Soft, on-brand floating gradient orbs used as a background animation
 * behind the homepage sections. Pure decoration, non-interactive.
 */
const FloatingParallaxPhotos = () => {
  const orbs = [
    {
      color: "hsl(var(--color-sage) / 0.35)",
      size: "38rem",
      top: "4%",
      left: "-8%",
      duration: 22,
      x: [0, 60, -30, 0],
      y: [0, -40, 30, 0],
    },
    {
      color: "hsl(var(--color-referrer) / 0.30)",
      size: "32rem",
      top: "28%",
      right: "-10%",
      duration: 26,
      x: [0, -50, 40, 0],
      y: [0, 50, -30, 0],
    },
    {
      color: "hsl(var(--color-brand) / 0.28)",
      size: "34rem",
      top: "58%",
      left: "10%",
      duration: 30,
      x: [0, 70, -40, 0],
      y: [0, -50, 40, 0],
    },
    {
      color: "hsl(var(--color-talent) / 0.25)",
      size: "28rem",
      top: "82%",
      right: "5%",
      duration: 28,
      x: [0, -60, 30, 0],
      y: [0, 40, -50, 0],
    },
  ];

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden -z-10"
    >
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl will-change-transform"
          style={{
            width: orb.size,
            height: orb.size,
            top: orb.top,
            left: orb.left,
            right: orb.right,
            background: `radial-gradient(circle at 30% 30%, ${orb.color}, transparent 70%)`,
          }}
          animate={{ x: orb.x, y: orb.y }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

export default FloatingParallaxPhotos;
