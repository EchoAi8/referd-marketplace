import { motion } from "framer-motion";

type Props = {
  className?: string;
};

/**
 * A subtle, low-contrast profile-card grid used as a hero background layer.
 * Uses semantic tokens only.
 */
const HeroProfileGridBackdrop = ({ className }: Props) => {
  const tiles = Array.from({ length: 42 });

  return (
    <div
      className={
        "absolute inset-0 overflow-hidden pointer-events-none " + (className ?? "")
      }
      aria-hidden="true"
    >
      {/* Soft fade mask so it never competes with content */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/10 to-background/40" />

      <div className="absolute -inset-24 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]">
        <div className="grid grid-cols-6 sm:grid-cols-8 lg:grid-cols-10 gap-4 opacity-35">
          {tiles.map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.05 + (i % 10) * 0.02, ease: [0.22, 0.03, 0.26, 1] }}
              className="rounded-2xl border border-border/50 bg-background/30 backdrop-blur-sm"
            >
              <div className="p-3">
                <div className="flex items-center gap-2">
                  <div className="h-7 w-7 rounded-full bg-muted/40" />
                  <div className="flex-1">
                    <div className="h-2.5 w-16 rounded bg-muted/40" />
                    <div className="mt-1 h-2 w-10 rounded bg-muted/30" />
                  </div>
                </div>
                <div className="mt-3 h-2 w-full rounded bg-muted/20" />
                <div className="mt-2 h-2 w-4/5 rounded bg-muted/20" />
                <div className="mt-3 flex gap-1.5">
                  <div className="h-4 w-10 rounded-full bg-muted/25" />
                  <div className="h-4 w-12 rounded-full bg-muted/25" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroProfileGridBackdrop;
