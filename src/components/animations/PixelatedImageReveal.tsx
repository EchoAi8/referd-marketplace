import { motion, useInView } from "framer-motion";
import { useRef, useMemo } from "react";

interface PixelatedImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  /** Number of tiles per row/column (default 5 for larger tiles) */
  gridSize?: number;
  staggerDuration?: number;
  delay?: number;
}

const BRAND_COLORS = [
  "hsl(var(--color-sage))",
  "hsl(var(--color-sage-dark))",
  "hsl(var(--color-rose))",
  "hsl(var(--foreground))",
];

const PixelatedImageReveal = ({
  src,
  alt,
  className = "",
  gridSize = 5,
  staggerDuration = 0.04,
  delay = 0,
}: PixelatedImageRevealProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const pixelSize = 100 / gridSize;

  // Generate random order and assign brand colors
  const pixelOrder = useMemo(() => {
    const indices = [];
    for (let row = 0; row < gridSize; row++) {
      for (let col = 0; col < gridSize; col++) {
        indices.push({
          row,
          col,
          order: Math.random(),
          color: BRAND_COLORS[Math.floor(Math.random() * BRAND_COLORS.length)],
        });
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

      {/* Pixel Grid Overlay with brand colors */}
      <div className="absolute inset-0 pointer-events-none">
        {pixelOrder.map(({ row, col, color }, index) => (
          <motion.div
            key={`${row}-${col}`}
            className="absolute"
            style={{
              width: `${pixelSize + 0.5}%`,
              height: `${pixelSize + 0.5}%`,
              left: `${col * pixelSize}%`,
              top: `${row * pixelSize}%`,
              backgroundColor: color,
            }}
            initial={{ opacity: 1 }}
            animate={isInView ? { opacity: 0 } : { opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: delay + index * staggerDuration,
              ease: "easeOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelatedImageReveal;
