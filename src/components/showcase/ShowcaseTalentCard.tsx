import { BadgeCheck, Sparkles, Building2, MapPin } from "lucide-react";

interface ShowcaseTalentCardProps {
  name: string;
  role: string;
  company: string;
  location?: string;
  image: string;
  verified?: boolean;
  topReferrer?: boolean;
  skills?: string[];
  connections?: number;
  endorsements?: number;
  responseTime?: string;
}

/**
 * A talent card for the 3D rotating carousel on the Showcase page.
 * Features full-bleed photos with gradient overlay for Referd branding.
 */
const ShowcaseTalentCard = ({
  name,
  role,
  company,
  location = "",
  image,
  verified = false,
  topReferrer = false,
  skills = [],
  connections = 0,
  endorsements = 0,
  responseTime = "",
}: ShowcaseTalentCardProps) => {
  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-border/50 shadow-xl bg-card">
      {/* Top Referrer Badge */}
      {topReferrer && (
        <div className="absolute top-3 left-3 z-30 flex items-center gap-1.5 px-2.5 py-1 bg-mustard rounded-full shadow-md">
          <Sparkles className="w-3 h-3 text-foreground" />
          <span className="text-[10px] font-bold text-foreground tracking-wide">Top Referrer</span>
        </div>
      )}

      {/* Full-bleed Profile Photo */}
      <div className="absolute inset-0">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-top"
          loading="lazy"
          draggable={false}
        />
        {/* Gradient overlay for content readability */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-card via-card/70 to-transparent" 
          style={{ top: '35%' }} 
        />
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
        {/* Name & Verification */}
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="font-heading font-bold text-base text-foreground truncate">
            {name}
          </h3>
          {verified && (
            <BadgeCheck className="w-4 h-4 text-sage flex-shrink-0" />
          )}
        </div>

        {/* Role & Company */}
        <p className="text-xs font-medium text-foreground/90 truncate">{role}</p>
        <div className="flex items-center gap-1.5 mt-0.5 text-muted-foreground">
          <Building2 className="w-3 h-3" />
          <span className="text-[10px] truncate">{company}</span>
          {location && (
            <>
              <span className="text-[10px]">•</span>
              <MapPin className="w-3 h-3" />
              <span className="text-[10px] truncate">{location}</span>
            </>
          )}
        </div>

        {/* Stats Row */}
        {(connections > 0 || endorsements > 0 || responseTime) && (
          <div className="flex items-center gap-2 mt-3 pt-2 border-t border-foreground/10">
            {connections > 0 && (
              <div className="flex-1 text-center">
                <p className="text-xs font-bold text-foreground">{connections.toLocaleString()}</p>
                <p className="text-[8px] text-muted-foreground uppercase tracking-wide">Connections</p>
              </div>
            )}
            {endorsements > 0 && (
              <>
                <div className="w-px h-5 bg-foreground/10" />
                <div className="flex-1 text-center">
                  <p className="text-xs font-bold text-foreground">{endorsements}</p>
                  <p className="text-[8px] text-muted-foreground uppercase tracking-wide">Endorsements</p>
                </div>
              </>
            )}
            {responseTime && (
              <>
                <div className="w-px h-5 bg-foreground/10" />
                <div className="flex-1 text-center">
                  <p className="text-xs font-bold text-sage">{responseTime}</p>
                  <p className="text-[8px] text-muted-foreground uppercase tracking-wide">Response</p>
                </div>
              </>
            )}
          </div>
        )}

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] font-semibold bg-background/60 backdrop-blur-sm text-foreground/80 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Decorative border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5 pointer-events-none" />
    </div>
  );
};

export default ShowcaseTalentCard;
