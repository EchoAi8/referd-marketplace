import { BadgeCheck, Sparkles } from "lucide-react";

interface ShowcaseTalentCardProps {
  name: string;
  role: string;
  company: string;
  image: string;
  verified?: boolean;
  topReferrer?: boolean;
  skills?: string[];
}

/**
 * A compact talent card designed for the 3D rotating carousel on the Showcase page.
 * Uses Referd branding with monochromatic dark aesthetic and full-bleed photos.
 */
const ShowcaseTalentCard = ({
  name,
  role,
  company,
  image,
  verified = false,
  topReferrer = false,
  skills = [],
}: ShowcaseTalentCardProps) => {
  return (
    <div 
      className="relative w-full h-full overflow-hidden rounded-2xl"
      style={{
        background: 'linear-gradient(to bottom, hsl(var(--card)), hsl(var(--foreground) / 0.95))',
        boxShadow: '0 0 30px 5px rgba(255,255,255,0.15), 0 0 60px 10px rgba(255,255,255,0.08), 0 0 100px 20px rgba(255,255,255,0.05)',
      }}
    >
      {/* Inner white glow ring */}
      <div 
        className="absolute inset-0 rounded-2xl pointer-events-none z-30"
        style={{
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.2), inset 0 0 20px rgba(255,255,255,0.05)',
        }}
      />

      {/* Top Referrer Badge */}
      {topReferrer && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 bg-mustard/90 rounded-full">
          <Sparkles className="w-3 h-3 text-foreground" />
          <span className="text-[10px] font-semibold text-foreground">Top Referrer</span>
        </div>
      )}

      {/* Full-Bleed Profile Photo */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
        {/* Dark gradient overlay for text readability - keeps face visible */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
          style={{ top: '45%' }}
        />
      </div>

      {/* Content Overlay - Bottom aligned */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        {/* Name & Verification */}
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-heading font-bold text-base text-white truncate">
            {name}
          </h3>
          {verified && (
            <BadgeCheck className="w-4 h-4 text-sage flex-shrink-0" />
          )}
        </div>

        {/* Role & Company */}
        <p className="text-xs text-white/80 truncate mb-2">
          {role} <span className="text-white/40">•</span> {company}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] font-medium bg-white/10 text-white/90 rounded-full backdrop-blur-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowcaseTalentCard;
