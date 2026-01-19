import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  src: string;
  alt: string;
  className?: string;
  direction?: "left" | "right" | "top" | "bottom";
  delay?: number;
  duration?: number;
}

const ImageReveal = ({ 
  src, 
  alt, 
  className,
  direction = "left",
  delay = 0,
  duration = 1.2
}: ImageRevealProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [imageLoaded, setImageLoaded] = useState(false);

  const easeOut = [0.16, 1, 0.3, 1] as const;

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Image */}
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.3, opacity: 0 }}
        animate={isInView && imageLoaded ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
        transition={{ duration: duration * 0.8, delay, ease: easeOut }}
      >
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onLoad={() => setImageLoaded(true)}
        />
      </motion.div>

      {/* Primary curtain overlay */}
      <motion.div
        className="absolute inset-0 bg-sage"
        style={{ 
          originX: direction === "right" ? 1 : 0,
          transformOrigin: direction === "right" ? "right" : "left"
        }}
        initial={{ scaleX: 1 }}
        animate={isInView && imageLoaded ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration, delay: delay + 0.2, ease: easeOut }}
      />

      {/* Secondary curtain for depth effect */}
      <motion.div
        className="absolute inset-0 bg-foreground"
        style={{ 
          originX: direction === "right" ? 1 : 0,
          transformOrigin: direction === "right" ? "right" : "left"
        }}
        initial={{ scaleX: 1 }}
        animate={isInView && imageLoaded ? { scaleX: 0 } : { scaleX: 1 }}
        transition={{ duration, delay, ease: easeOut }}
      />
    </div>
  );
};

export default ImageReveal;
