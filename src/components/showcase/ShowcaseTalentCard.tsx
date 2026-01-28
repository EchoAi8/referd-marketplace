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
 * Uses Referd branding with the floating head aesthetic.
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
    <div className="relative w-full h-full bg-gradient-to-b from-card via-card to-muted/50 rounded-2xl overflow-hidden border border-border/50 shadow-xl">
      {/* Top Referrer Badge */}
      {topReferrer && (
        <div className="absolute top-3 right-3 z-20 flex items-center gap-1 px-2 py-1 bg-mustard/90 rounded-full">
          <Sparkles className="w-3 h-3 text-foreground" />
          <span className="text-[10px] font-semibold text-foreground">Top Referrer</span>
        </div>
      )}

      {/* Floating Profile Photo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[85%] aspect-[3/4] z-10">
        <div 
          className="w-full h-full"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
          }}
        >
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-top"
            loading="lazy"
            draggable={false}
          />
        </div>
      </div>

      {/* Content Overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-gradient-to-t from-card via-card/95 to-transparent pt-16">
        {/* Name & Verification */}
        <div className="flex items-center gap-1.5 mb-1">
          <h3 className="font-heading font-bold text-sm text-foreground truncate">
            {name}
          </h3>
          {verified && (
            <BadgeCheck className="w-4 h-4 text-sage flex-shrink-0" />
          )}
        </div>

        {/* Role & Company */}
        <p className="text-xs text-muted-foreground truncate mb-2">
          {role} <span className="text-muted-foreground/50">•</span> {company}
        </p>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {skills.slice(0, 3).map((skill, i) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[9px] font-medium bg-muted/80 text-muted-foreground rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Decorative gradient border glow */}
      <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-foreground/5 pointer-events-none" />
    </div>
  );
};

export default ShowcaseTalentCard;
