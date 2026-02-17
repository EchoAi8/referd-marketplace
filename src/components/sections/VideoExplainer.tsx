import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import explainerVideo from "@/assets/referd-explainer-teaser.mp4";

const VideoExplainer = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Parallax overlap */}
      <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />

      <motion.div
        style={{ scale, opacity }}
        className="container mx-auto px-6"
      >
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-referrer/20 mb-6">
            <Play className="w-4 h-4 text-referrer fill-referrer" />
            <span className="text-xs uppercase tracking-[0.2em] text-referrer font-semibold">
              See It In Action
            </span>
          </div>

          <h2 className="text-fluid-4xl md:text-fluid-5xl font-heading font-bold leading-tight max-w-4xl mx-auto">
            How <span className="text-sage">Referd</span> works in{" "}
            <span className="text-referrer">60 seconds</span>
          </h2>
          <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            From referral to payday — see why thousands are ditching agencies.
          </p>
        </motion.div>

        {/* Video Container */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative rounded-3xl overflow-hidden bg-foreground shadow-2xl group">
            {/* Video element */}
            <video
              ref={videoRef}
              className="w-full aspect-video object-cover"
              loop
              muted={isMuted}
              playsInline
              poster="/placeholder.svg"
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            >
              {/* Explainer teaser — swap with full 60s video when ready */}
              <source src={explainerVideo} type="video/mp4" />
            </video>

            {/* Play overlay */}
            {!isPlaying && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-foreground/60 backdrop-blur-sm flex items-center justify-center cursor-pointer"
                onClick={togglePlay}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-sage flex items-center justify-center shadow-[0_0_60px_hsl(var(--color-sage)/0.5)]"
                >
                  <Play className="w-8 h-8 md:w-10 md:h-10 text-foreground fill-foreground ml-1" />
                </motion.div>
                <p className="absolute bottom-8 text-background/60 text-sm uppercase tracking-[0.2em]">
                  Watch the revolution
                </p>
              </motion.div>
            )}

            {/* Controls bar */}
            {isPlaying && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 right-4 flex gap-2"
              >
                <button
                  onClick={togglePlay}
                  className="w-10 h-10 rounded-full bg-foreground/80 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground transition-colors"
                >
                  <Pause className="w-4 h-4" />
                </button>
                <button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-foreground/80 backdrop-blur-sm flex items-center justify-center text-background hover:bg-foreground transition-colors"
                >
                  {isMuted ? (
                    <VolumeX className="w-4 h-4" />
                  ) : (
                    <Volume2 className="w-4 h-4" />
                  )}
                </button>
              </motion.div>
            )}
          </div>

          {/* Step bullets below video */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
            {[
              {
                step: "01",
                title: "Refer someone you know",
                desc: "Share a role with someone in your network who'd be perfect.",
                color: "text-referrer",
                borderColor: "border-referrer/30",
              },
              {
                step: "02",
                title: "They get hired",
                desc: "AI matching + human connections = faster, better hires.",
                color: "text-talent",
                borderColor: "border-talent/30",
              },
              {
                step: "03",
                title: "Everyone gets paid",
                desc: "35% referrer, 35% talent, 30% platform. No middlemen.",
                color: "text-sage",
                borderColor: "border-sage/30",
              },
            ].map((item, i) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1 }}
                className={`p-5 rounded-2xl border ${item.borderColor} bg-background`}
              >
                <span className={`text-xs font-mono font-bold ${item.color} uppercase tracking-wider`}>
                  Step {item.step}
                </span>
                <h4 className="font-heading font-bold text-lg mt-2">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground mt-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom overlap */}
      <div className="absolute -bottom-1 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
    </section>
  );
};

export default VideoExplainer;
