"use client";

import React from "react";

interface CircularBadgeProps {
  text?: string;
  size?: number;
  className?: string;
  theme?: "dark" | "light" | "gold";
  centerContent?: React.ReactNode;
}

export const CircularBadge: React.FC<CircularBadgeProps> = ({
  text = "• BÜYÜME ORTAĞINIZ • DİJİTAL PAZARLAMA • GROWB ",
  size = 140,
  className = "",
  theme = "dark",
  centerContent,
}) => {
  const id = React.useId();
  const pathId = `circle-path-${id}`;

  const themeStyles = {
    dark: "text-cream fill-cream bg-[#0A0A0A] border border-white/15",
    light: "text-[#0A0A0A] fill-[#0A0A0A] bg-white border border-neutral-200",
    gold: "text-[#0A0A0A] fill-[#0A0A0A] bg-[#FFC300] border border-[#FFA000]",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center rounded-full select-none shadow-xl ${themeStyles[theme]} ${className}`}
      style={{ width: size, height: size }}
    >
      {/* 360-degree continuously rotating SVG text with calculated radius */}
      <svg
        className="w-full h-full animate-[spin_16s_linear_infinite]"
        viewBox="0 0 100 100"
      >
        <path
          id={pathId}
          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
          fill="none"
        />
        <text className="text-[8.5px] font-mono font-extrabold uppercase tracking-[0.16em]">
          <textPath href={`#${pathId}`} startOffset="0%">
            {text}
          </textPath>
        </text>
      </svg>

      {/* Center GrowB Logo: Growb. with gold dot */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {centerContent || (
          <div className="flex items-baseline font-black text-sm tracking-tight text-white">
            <span>Growb</span>
            <span className="text-[#FFC300] text-base leading-none">.</span>
          </div>
        )}
      </div>
    </div>
  );
};
