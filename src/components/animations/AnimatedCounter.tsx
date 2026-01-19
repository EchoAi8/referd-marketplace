import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  delay?: number;
  className?: string;
  formatNumber?: boolean;
}

const AnimatedCounter = ({
  value,
  prefix = "",
  suffix = "",
  duration = 2,
  delay = 0,
  className = "",
  formatNumber = true,
}: AnimatedCounterProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [hasStarted, setHasStarted] = useState(false);

  const spring = useSpring(0, {
    mass: 1,
    stiffness: 75,
    damping: 30,
  });

  const display = useTransform(spring, (current) => {
    const rounded = Math.round(current);
    if (formatNumber) {
      return rounded.toLocaleString();
    }
    return rounded.toString();
  });

  useEffect(() => {
    if (isInView && !hasStarted) {
      const timeout = setTimeout(() => {
        setHasStarted(true);
        spring.set(value);
      }, delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, hasStarted, value, spring, delay]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      <motion.span>{display}</motion.span>
      {suffix}
    </span>
  );
};

export default AnimatedCounter;
