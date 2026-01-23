import { useRef, useEffect, ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DirectionalButtonProps {
  children: ReactNode;
  onClick?: () => void;
  theme?: "dark" | "light" | "primary" | "sage" | "mustard";
  className?: string;
  size?: "default" | "lg" | "xl";
}

const DirectionalButton = ({
  children,
  onClick,
  theme = "dark",
  className,
  size = "default",
}: DirectionalButtonProps) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    const circle = circleRef.current;
    if (!button || !circle) return;

    const handleHover = (event: MouseEvent) => {
      const buttonRect = button.getBoundingClientRect();
      const buttonWidth = buttonRect.width;
      const buttonHeight = buttonRect.height;
      const buttonCenterX = buttonRect.left + buttonWidth / 2;

      const mouseX = event.clientX;
      const mouseY = event.clientY;

      // Offset from the top-left corner in percentage
      const offsetXFromLeft = ((mouseX - buttonRect.left) / buttonWidth) * 100;
      const offsetYFromTop = ((mouseY - buttonRect.top) / buttonHeight) * 100;

      // Offset from the center in percentage
      let offsetXFromCenter = ((mouseX - buttonCenterX) / (buttonWidth / 2)) * 50;
      offsetXFromCenter = Math.abs(offsetXFromCenter);

      circle.style.left = `${offsetXFromLeft.toFixed(1)}%`;
      circle.style.top = `${offsetYFromTop.toFixed(1)}%`;
      circle.style.width = `${115 + offsetXFromCenter * 2}%`;
    };

    button.addEventListener("mouseenter", handleHover);
    button.addEventListener("mousemove", handleHover);

    return () => {
      button.removeEventListener("mouseenter", handleHover);
      button.removeEventListener("mousemove", handleHover);
    };
  }, []);

  const sizeClasses = {
    default: "h-14 px-8 text-base",
    lg: "h-16 px-10 text-lg",
    xl: "h-[4rem] sm:h-[4.5rem] md:h-20 px-8 sm:px-12 md:px-16 text-base sm:text-lg md:text-xl font-bold",
  };

  const themeStyles = {
    dark: {
      bg: "bg-[hsl(180,30%,8%)]",
      text: "text-[hsl(48,60%,96%)]",
      textHover: "group-hover:text-[hsl(180,30%,8%)]",
      circle: "bg-[hsl(80,100%,55%)]",
    },
    light: {
      bg: "bg-[hsl(48,30%,96%)]",
      text: "text-[hsl(180,30%,8%)]",
      textHover: "group-hover:text-[hsl(180,30%,8%)]",
      circle: "bg-[hsl(80,100%,55%)]",
    },
    primary: {
      bg: "bg-[hsl(80,100%,55%)]",
      text: "text-[hsl(180,30%,8%)]",
      textHover: "group-hover:text-[hsl(180,30%,8%)]",
      circle: "bg-[hsl(90,100%,65%)]",
    },
    sage: {
      // Vibrant lime green
      bg: "bg-[hsl(80,100%,55%)]",
      text: "text-[hsl(180,30%,8%)]",
      textHover: "group-hover:text-[hsl(80,100%,55%)]",
      circle: "bg-[hsl(180,30%,8%)]",
    },
    mustard: {
      // Bold warm yellow/gold
      bg: "bg-[hsl(45,100%,55%)]",
      text: "text-[hsl(180,30%,8%)]",
      textHover: "group-hover:text-[hsl(45,100%,55%)]",
      circle: "bg-[hsl(180,30%,8%)]",
    },
  };

  const currentTheme = themeStyles[theme];

  return (
    <motion.button
      ref={buttonRef}
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={cn(
        "group relative cursor-pointer rounded-full flex items-center justify-center overflow-hidden",
        sizeClasses[size],
        className
      )}
    >
      {/* Background */}
      <div
        className={cn(
          "absolute inset-0 rounded-full transition-all duration-300",
          currentTheme.bg
        )}
      />

      {/* Circle wrap with overflow hidden */}
      <div className="absolute inset-0 rounded-full overflow-hidden">
        {/* Animated circle */}
        <div
          ref={circleRef}
          className={cn(
            "absolute pointer-events-none rounded-full",
            "scale-0 group-hover:scale-100",
            "transition-transform duration-700 ease-[cubic-bezier(0.625,0.05,0,1)]",
            "-translate-x-1/2 -translate-y-1/2",
            currentTheme.circle
          )}
          style={{
            paddingTop: "100%",
            width: "115%",
          }}
        />
      </div>

      {/* Text */}
      <span
        className={cn(
          "relative z-10 font-heading font-bold whitespace-nowrap",
          "transition-colors duration-700 ease-[cubic-bezier(0.625,0.05,0,1)]",
          currentTheme.text,
          currentTheme.textHover
        )}
      >
        {children}
      </span>
    </motion.button>
  );
};

export default DirectionalButton;
