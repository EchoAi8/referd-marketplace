import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface PixelatedImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  gridSize?: number;
  staggerDuration?: number;
  delay?: number;
}

const PixelatedImageReveal = ({
  src,
  alt,
  className = "",
  gridSize = 7,
  staggerDuration = 0.03,
  delay = 0,
}: PixelatedImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pixelSize = 100 / gridSize;

  // Generate random order for pixel reveal
  const pixelOrder = useMemo(() => {
    const indices = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        indices.push({ row, col, order: Math.random() });
      }
    }
    return indices.sort((a, b) => a.order - b.order);
  }, [gridSize]);

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Base Image */}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ scale: 1.1 }}
        animate={isInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 1.2, delay: delay + 0.5, ease: [0.16, 1, 0.3, 1] }}
      />

      {/* Pixel Grid Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {pixelOrder.map(({ row, col }, index) => (
          <motion.div
            key={`${row}-${col}`}
            className="absolute bg-foreground"
            style={{
              width: `${pixelSize + 0.5}%`,
              height: `${pixelSize + 0.5}%`,
              left: `${col * pixelSize}%`,
              top: `${row * pixelSize}%`,
            }}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.4,
              delay: delay + index * staggerDuration,
              ease: "easeOut",
            }}
          />
        ))}
      </div>

      {/* Subtle gradient overlay for polish */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-sage/10 to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.8, delay: delay + 1.5 }}
      />
    </div>
  );
};

export default PixelatedImageReveal;
