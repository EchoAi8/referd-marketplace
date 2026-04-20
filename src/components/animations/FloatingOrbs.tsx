import { useEffect, useRef, useState } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";

interface Orb {
  id: number;
  size: number;
  color: string;
  initialX: number;
  initialY: number;
  delay: number;
}

const FloatingOrbs = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [orbs] = useState<Orb[]>([
    { id: 1, size: 300, color: "hsl(var(--sage))", initialX: 20, initialY: 30, delay: 0 },
    { id: 2, size: 200, color: "hsl(var(--mustard))", initialX: 70, initialY: 60, delay: 0.1 },
    { id: 3, size: 250, color: "hsl(var(--rose))", initialX: 80, initialY: 20, delay: 0.2 },
    { id: 4, size: 180, color: "hsl(var(--sage))", initialX: 30, initialY: 70, delay: 0.15 },
  ]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring physics for mouse following
  const springConfig = { damping: 25, stiffness: 50, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Normalize mouse position to -1 to 1 range
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
          className="absolute rounded-full blur-3xl opacity-30"
          style={{
            width: orb.size,
            height: orb.size,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            left: `${orb.initialX}%`,
            top: `${orb.initialY}%`,
            x: smoothX.get() * (30 + orb.delay * 50),
            y: smoothY.get() * (30 + orb.delay * 50),
          }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: 0.4,
            scale: 1,
            x: smoothX.get() * (30 + orb.delay * 50),
            y: smoothY.get() * (30 + orb.delay * 50),
          }}
          transition={{ 
            opacity: { duration: 1, delay: orb.delay },
            scale: { duration: 1.5, delay: orb.delay },
          }}
        >
          <motion.div
            className="w-full h-full"
            style={{
              x: smoothX,
              y: smoothY,
            }}
            transformTemplate={({ x, y }) => {
              const xVal = typeof x === 'number' ? x : parseFloat(x as string) || 0;
              const yVal = typeof y === 'number' ? y : parseFloat(y as string) || 0;
              return `translate(${xVal * (40 + orb.id * 15)}px, ${yVal * (40 + orb.id * 15)}px)`;
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingOrbs;
