import { useEffect, useRef } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Orb {
  id: number;
  size: number;
  color: string;
  label: string;
  initialX: number;
  initialY: number;
  delay: number;
  drift: { x: number; y: number; duration: number };
}

/**
 * Floating orbs representing the three stakeholders in the Referd network:
 * 🟢 Sage/Green = Talent (candidates, job seekers)
 * 🩷 Rose/Pink = Referrers (anyone can refer)
 * 🟡 Mustard/Gold = Brands (companies, organisations)
 */
const FloatingOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 40, mass: 0.8 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Stakeholder-mapped orbs
  const orbs: Orb[] = [
    // Talent (Sage) — large, confident presence
    { id: 1, size: 380, color: "hsl(var(--color-talent))", label: "talent", initialX: 12, initialY: 25, delay: 0, drift: { x: 30, y: -20, duration: 18 } },
    // Referrer (Rose) — warm, expansive network
    { id: 2, size: 320, color: "hsl(var(--color-referrer))", label: "referrer", initialX: 65, initialY: 15, delay: 0.15, drift: { x: -25, y: 30, duration: 22 } },
    // Brand (Mustard) — bold accent
    { id: 3, size: 280, color: "hsl(var(--color-brand))", label: "brand", initialX: 78, initialY: 60, delay: 0.25, drift: { x: -20, y: -25, duration: 20 } },
    // Secondary Talent orb — smaller echo
    { id: 4, size: 200, color: "hsl(var(--color-talent-light))", label: "talent", initialX: 40, initialY: 70, delay: 0.1, drift: { x: 20, y: 15, duration: 16 } },
    // Secondary Referrer orb — subtle connection
    { id: 5, size: 160, color: "hsl(var(--color-referrer-light))", label: "referrer", initialX: 25, initialY: 55, delay: 0.2, drift: { x: 15, y: -20, duration: 24 } },
    // Secondary Brand orb — glow
    { id: 6, size: 140, color: "hsl(var(--color-brand-light))", label: "brand", initialX: 55, initialY: 40, delay: 0.3, drift: { x: -15, y: 20, duration: 19 } },
  ];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      mouseX.set(x);
      mouseY.set(y);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      aria-hidden="true"
    >
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className="absolute rounded-full"
          style={{
            width: orb.size,
            height: orb.size,
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            filter: `blur(${orb.size > 250 ? 80 : 60}px)`,
          }}
          initial={{ opacity: 0, scale: 0.3 }}
          animate={{
            opacity: [0, 0.25, 0.18, 0.25],
            scale: [0.3, 1, 1.08, 1],
            x: [0, orb.drift.x, -orb.drift.x * 0.5, 0],
            y: [0, orb.drift.y, -orb.drift.y * 0.5, 0],
          }}
          transition={{
            opacity: { duration: 1.5, delay: orb.delay, times: [0, 0.3, 0.7, 1] },
            scale: { duration: 2, delay: orb.delay, times: [0, 0.4, 0.7, 1] },
            x: { duration: orb.drift.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
            y: { duration: orb.drift.duration, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" },
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{ x: smoothX, y: smoothY }}
            transformTemplate={({ x, y }) => {
              const xVal = typeof x === "number" ? x : parseFloat(x as string) || 0;
              const yVal = typeof y === "number" ? y : parseFloat(y as string) || 0;
              const multiplier = 25 + orb.id * 10;
              return `translate(${xVal * multiplier}px, ${yVal * multiplier}px)`;
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingOrbs;
