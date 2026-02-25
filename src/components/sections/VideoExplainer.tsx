import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useEffect, useCallback, useState } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Minimize, Loader2 } from "lucide-react";
import VimeoPlayer from "@vimeo/player";

/**
 * ─────────────────────────────────────────────
 * CONFIG — swap the Vimeo video ID here
 * ─────────────────────────────────────────────
 */
const VIMEO_VIDEO_ID = "1019191082"; // Replace with your actual Vimeo video ID

const secondsToTimestamp = (s: number) => {
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec < 10 ? "0" + sec : sec}`;
};

const VideoExplainer = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<VimeoPlayer | null>(null);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout>>();

  // Data-attribute–driven state (mirrors the CSS pattern)
  const [activated, setActivated] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [muted, setMuted] = useState(true);
  const [hovering, setHovering] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [pausedByUser, setPausedByUser] = useState(false);

  // Parallax scroll
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.95]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // ── Init Vimeo Player ──
  useEffect(() => {
    if (!playerContainerRef.current) return;

    const iframe = playerContainerRef.current.querySelector("iframe");
    if (!iframe) return;

    iframe.src = `https://player.vimeo.com/video/${VIMEO_VIDEO_ID}?api=1&background=1&autoplay=0&loop=0&muted=1`;

    const player = new VimeoPlayer(iframe);
    playerRef.current = player;

    player.setVolume(0);

    player.on("play", () => {
      setLoaded(true);
      setPlaying(true);
    });

    player.on("pause", () => {
      setPlaying(false);
    });

    player.on("timeupdate", (data: { seconds: number }) => {
      setCurrentTime(data.seconds);
    });

    player.on("ended", () => {
      // Restart for autoplay, otherwise reset
      setActivated(false);
      setPlaying(false);
      player.unload();
    });

    player.getDuration().then((d: number) => setDuration(d));

    return () => {
      player.destroy();
      playerRef.current = null;
    };
  }, []);

  // ── Scroll-based autoplay ──
  useEffect(() => {
    if (pausedByUser || !playerContainerRef.current) return;

    let playPromise: Promise<void> | null = null;

    const checkVisibility = () => {
      if (!playerContainerRef.current || !playerRef.current) return;
      const rect = playerContainerRef.current.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (inView && !playing) {
        vimeoPlay();
      } else if (!inView && playing) {
        // Avoid interrupting a pending play()
        if (playPromise) {
          playPromise.then(() => playerRef.current?.pause()).catch(() => {});
        } else {
          playerRef.current.pause().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", checkVisibility, { passive: true });
    checkVisibility();

    return () => window.removeEventListener("scroll", checkVisibility);
  }, [pausedByUser, playing]);

  // ── Fullscreen change listener ──
  useEffect(() => {
    const handleChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener("fullscreenchange", handleChange);
    return () => document.removeEventListener("fullscreenchange", handleChange);
  }, []);

  // ── Actions ──
  const vimeoPlay = useCallback(() => {
    if (!playerRef.current) return;
    setActivated(true);
    setPlaying(true);
    playerRef.current.setVolume(0).then(() => {
      playerRef.current!.play().catch(() => {
        // Silently handle interrupted play requests
      });
      if (!muted) playerRef.current!.setVolume(1);
    }).catch(() => {});
  }, [muted]);

  const vimeoPause = useCallback(() => {
    playerRef.current?.pause();
  }, []);

  const handlePlay = useCallback(() => {
    vimeoPlay();
  }, [vimeoPlay]);

  const handlePause = useCallback(() => {
    vimeoPause();
    setPausedByUser(true);
  }, [vimeoPause]);

  const handleMuteToggle = useCallback(() => {
    if (!playerRef.current) return;
    if (muted) {
      playerRef.current.setVolume(1);
      setMuted(false);
    } else {
      playerRef.current.setVolume(0);
      setMuted(true);
    }
  }, [muted]);

  const handleFullscreen = useCallback(() => {
    if (!playerContainerRef.current) return;
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      playerContainerRef.current.requestFullscreen();
    }
  }, []);

  const handleTimelineChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const val = parseFloat(e.target.value);
      setCurrentTime(val);
      playerRef.current?.setCurrentTime(val);
    },
    []
  );

  // ── Hover timer (hide controls after 3s) ──
  const handleMouseMove = useCallback(() => {
    setHovering(true);
    clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => setHovering(false), 3000);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 bg-muted/30 overflow-hidden"
    >
      {/* Top gradient overlap */}
      <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/50 to-transparent pointer-events-none z-10" />

      <motion.div style={{ scale, opacity }} className="container mx-auto px-6">
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

        {/* ── Vimeo Player ── */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div
            ref={playerContainerRef}
            className="vimeo-player"
            data-vimeo-activated={String(activated)}
            data-vimeo-playing={String(playing)}
            data-vimeo-loaded={String(loaded)}
            data-vimeo-muted={String(muted)}
            data-vimeo-hover={String(hovering)}
            data-vimeo-fullscreen={String(isFullscreen)}
            onMouseMove={handleMouseMove}
          >
            {/* Aspect ratio spacer */}
            <div className="vimeo-player__before" />

            {/* Vimeo iframe */}
            <div className="vimeo-player__iframe">
              <iframe
                title="Referd Explainer"
                allow="autoplay; fullscreen; picture-in-picture"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </div>

            {/* Placeholder poster */}
            <img
              className="vimeo-player__placeholder"
              src="/placeholder.svg"
              alt="Video thumbnail"
            />

            {/* Dark overlay */}
            <div className="vimeo-player__dark" />

            {/* Loading spinner */}
            <div className="vimeo-player__loading">
              <Loader2 className="vimeo-player__loading-svg animate-spin" />
            </div>

            {/* Play button */}
            <div className="vimeo-player__play" onClick={handlePlay}>
              <div className="vimeo-player__btn">
                <Play className="vimeo-player__btn-play-svg" />
              </div>
            </div>

            {/* Pause button */}
            <div className="vimeo-player__pause" onClick={handlePause}>
              <div className="vimeo-player__btn">
                <Pause className="vimeo-player__btn-pause-svg" />
              </div>
            </div>

            {/* Interface / Controls */}
            <div className="vimeo-player__interface">
              <div className="vimeo-player__interface-bottom">
                {/* Timeline */}
                <div className="vimeo-player__timeline">
                  <input
                    type="range"
                    className="vimeo-player__timeline-input"
                    min={0}
                    max={duration}
                    step={0.1}
                    value={currentTime}
                    onChange={handleTimelineChange}
                  />
                  <progress
                    className="vimeo-player__timeline-progress"
                    max={duration}
                    value={currentTime}
                  />
                </div>

                {/* Duration */}
                <div className="vimeo-player__duration">
                  <span className="vimeo-player__duration-span text-xs font-mono">
                    {secondsToTimestamp(currentTime)}
                  </span>
                </div>

                {/* Mute */}
                <div className="vimeo-player__mute" onClick={handleMuteToggle}>
                  <Volume2 className="vimeo-player__volume-up-svg" />
                  <VolumeX className="vimeo-player__volume-mute-svg" />
                </div>

                {/* Fullscreen */}
                <div className="vimeo-player__fullscreen" onClick={handleFullscreen}>
                  <Maximize className="vimeo-player__fullscreen-scale-svg" />
                  <Minimize className="vimeo-player__fullscreen-shrink-svg" />
                </div>
              </div>
            </div>
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
                <span
                  className={`text-xs font-mono font-bold ${item.color} uppercase tracking-wider`}
                >
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
