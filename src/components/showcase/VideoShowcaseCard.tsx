import { Play } from "lucide-react";
import { useState, useRef } from "react";

interface VideoShowcaseCardProps {
  videoSrc?: string;
  posterImage?: string;
  title?: string;
  subtitle?: string;
}

/**
 * A cinematic video card for the 3D rotating carousel.
 * Features auto-play on hover and Referd Green glow effects.
 */
const VideoShowcaseCard = ({
  videoSrc = "/placeholder.svg",
  posterImage,
  title = "Watch Demo",
  subtitle = "See how it works",
}: VideoShowcaseCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (videoRef.current && videoSrc) {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div 
      className="video-showcase-card relative rounded-2xl overflow-hidden bg-black"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated Referd Green Glow Effect */}
      <div 
        className="absolute -inset-3 rounded-2xl opacity-60 blur-3xl pointer-events-none animate-pulse"
        style={{ 
          background: 'radial-gradient(circle, hsl(150 60% 70% / 0.5) 0%, hsl(150 60% 45% / 0.25) 50%, transparent 70%)',
          zIndex: 0
        }}
      />
      
      {/* Card Container */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-talent/40 bg-black">
        {/* Video or Poster */}
        {videoSrc && videoSrc !== "/placeholder.svg" ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterImage}
            className="absolute inset-0 w-full h-full object-cover"
            loop
            muted
            playsInline
            preload="metadata"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900">
            {/* Animated grid pattern */}
            <div 
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `linear-gradient(hsl(var(--color-talent) / 0.3) 1px, transparent 1px),
                                  linear-gradient(90deg, hsl(var(--color-talent) / 0.3) 1px, transparent 1px)`,
                backgroundSize: '30px 30px',
                animation: 'gridMove 20s linear infinite'
              }}
            />
          </div>
        )}
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent" />
        
        {/* Play button indicator */}
        <div className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
          <div className="w-16 h-16 rounded-full bg-talent/20 border-2 border-talent/60 flex items-center justify-center backdrop-blur-sm">
            <Play className="w-6 h-6 text-talent fill-talent/30 ml-1" />
          </div>
        </div>
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5 z-20">
          <h3 className="font-heading font-bold text-lg text-white mb-1">
            {title}
          </h3>
          <p className="text-sm text-white/70">
            {subtitle}
          </p>
        </div>
        
        {/* Inner glow ring */}
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-talent/20 pointer-events-none" />
      </div>
    </div>
  );
};

export default VideoShowcaseCard;
