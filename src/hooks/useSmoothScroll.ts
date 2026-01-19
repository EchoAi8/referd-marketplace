import { useScroll, useSpring, MotionValue } from "framer-motion";
import { RefObject } from "react";

interface SmoothScrollOptions {
  target?: RefObject<HTMLElement>;
  offset?: [string, string];
  /** Spring stiffness (default 90) */
  stiffness?: number;
  /** Spring damping (default 28) */
  damping?: number;
}

/**
 * Provides a smoothed scrollYProgress value using a spring to eliminate jitter.
 * Use this across all scroll-driven animations for consistency.
 */
export function useSmoothScroll(options: SmoothScrollOptions = {}): {
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
} {
  const { target, offset, stiffness = 90, damping = 28 } = options;

  const { scrollYProgress } = useScroll({
    target,
    offset: offset as any,
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness,
    damping,
    restDelta: 0.0001,
  });

  return { scrollYProgress, smoothProgress };
}
