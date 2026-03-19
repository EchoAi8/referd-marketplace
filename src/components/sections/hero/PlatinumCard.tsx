import { motion } from "framer-motion";

const PlatinumCard = () => {
  return (
    <div className="relative w-[240px] sm:w-[270px] md:w-[300px] aspect-[1.586/1]">
      {/* Card body */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{
          background: `linear-gradient(135deg, 
            hsl(0 0% 15%) 0%, 
            hsl(0 0% 22%) 30%, 
            hsl(0 0% 18%) 60%, 
            hsl(0 0% 12%) 100%)`,
          boxShadow: `
            0 25px 60px -15px rgba(0,0,0,0.5),
            0 0 0 1px rgba(255,255,255,0.08),
            inset 0 1px 0 rgba(255,255,255,0.1)
          `,
        }}
      >
        {/* Metallic shimmer */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: `linear-gradient(105deg, transparent 20%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0.12) 40%, rgba(255,255,255,0.05) 50%, transparent 60%)`,
          }}
        />

        {/* Subtle pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,1) 2px, rgba(255,255,255,1) 3px)`,
          }}
        />

        {/* Card content */}
        <div className="relative h-full p-6 flex flex-col justify-between">
          {/* Top row */}
          <div className="flex justify-between items-start">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-background/40 font-medium">
                Referd
              </div>
              <div
                className="text-xs uppercase tracking-[0.2em] mt-1 font-semibold"
                style={{
                  background: `linear-gradient(135deg, hsl(var(--color-talent)) 0%, hsl(var(--color-referrer)) 50%, hsl(var(--color-brand)) 100%)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Platinum
              </div>
            </div>
            {/* Chip */}
            <div
              className="w-10 h-8 rounded-md"
              style={{
                background: `linear-gradient(135deg, hsl(48 70% 65%) 0%, hsl(48 50% 50%) 50%, hsl(48 70% 60%) 100%)`,
                boxShadow: `inset 0 0 2px rgba(0,0,0,0.2)`,
              }}
            />
          </div>

          {/* Amount */}
          <div>
            <div className="text-[10px] uppercase tracking-[0.2em] text-background/30 mb-1">
              Earnings to date
            </div>
            <div className="font-heading font-black text-3xl sm:text-4xl text-background tracking-tight">
              £47,250
            </div>
          </div>

          {/* Bottom row */}
          <div className="flex justify-between items-end">
            <div>
              <div className="text-[9px] uppercase tracking-[0.15em] text-background/30">Member since</div>
              <div className="text-sm text-background/70 font-medium tracking-wide">2024</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] uppercase tracking-[0.15em] text-background/30">Status</div>
              <div
                className="text-sm font-bold tracking-wide"
                style={{
                  background: `linear-gradient(90deg, hsl(var(--color-talent)), hsl(var(--color-talent-light)))`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Active
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <motion.div
        className="absolute -inset-8 rounded-3xl opacity-40 blur-3xl -z-10"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--color-talent) / 0.6), hsl(var(--color-referrer) / 0.3) 50%, transparent 80%)`,
        }}
      />
      <div
        className="absolute -inset-4 rounded-3xl opacity-25 blur-xl -z-10"
        style={{
          background: `radial-gradient(ellipse at center, hsl(var(--color-talent) / 0.5), transparent 60%)`,
        }}
      />
    </div>
  );
};

export default PlatinumCard;
