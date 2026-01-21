import { motion } from "framer-motion";
import { ReactNode, useState, useEffect } from "react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

interface HapticButtonProps {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

const HapticButton = ({ children, onClick, className = "", disabled = false }: HapticButtonProps) => {
  const { enabled, lastSoundTime } = useSoundEffects();
  const [isPulsing, setIsPulsing] = useState(false);
  const [pulseKey, setPulseKey] = useState(0);

  // Trigger pulse animation when sound plays
  useEffect(() => {
    if (enabled && lastSoundTime > 0) {
      setIsPulsing(true);
      setPulseKey(prev => prev + 1);
      const timer = setTimeout(() => setIsPulsing(false), 300);
      return () => clearTimeout(timer);
    }
  }, [lastSoundTime, enabled]);

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      className={`relative ${className}`}
      whileTap={{ scale: 0.95 }}
    >
      {/* Haptic pulse ring */}
      {isPulsing && enabled && (
        <motion.div
          key={pulseKey}
          className="absolute inset-0 rounded-full border-2 border-sage/50 pointer-events-none"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        />
      )}
      {children}
    </motion.button>
  );
};

export default HapticButton;
