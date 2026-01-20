import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { useSoundEffects } from "@/hooks/use-sound-effects";

const SoundToggle = () => {
  const { enabled, toggle, playClick } = useSoundEffects();

  const handleToggle = () => {
    // Play click if we're enabling sounds
    if (!enabled) {
      // Brief delay to allow context to update
      setTimeout(() => playClick(), 50);
    }
    toggle();
  };

  return (
    <motion.button
      onClick={handleToggle}
      className="relative w-12 h-12 rounded-full bg-muted/50 hover:bg-muted flex items-center justify-center transition-colors cursor-hover overflow-hidden"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={enabled ? "Disable sound effects" : "Enable sound effects"}
    >
      {/* Background pulse when enabled */}
      {enabled && (
        <motion.div
          className="absolute inset-0 rounded-full bg-sage/20"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Sound waves animation */}
      <div className="relative">
        {/* Icon */}
        <motion.div
          animate={{
            scale: enabled ? 1 : 0.9,
          }}
          transition={{ duration: 0.2 }}
        >
          {enabled ? (
            <Volume2 className="w-5 h-5 text-foreground" />
          ) : (
            <VolumeX className="w-5 h-5 text-muted-foreground" />
          )}
        </motion.div>

        {/* Sound wave rings when enabled */}
        {enabled && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-sage/40"
                initial={{ width: 20, height: 20, opacity: 0 }}
                animate={{
                  width: [20, 40],
                  height: [20, 40],
                  opacity: [0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        )}
      </div>

      {/* Status indicator dot */}
      <motion.div
        className="absolute bottom-1.5 right-1.5 w-2 h-2 rounded-full"
        animate={{
          backgroundColor: enabled 
            ? "hsl(var(--sage))" 
            : "hsl(var(--muted-foreground) / 0.3)",
          scale: enabled ? 1 : 0.8,
        }}
        transition={{ duration: 0.2 }}
      />
    </motion.button>
  );
};

export default SoundToggle;
