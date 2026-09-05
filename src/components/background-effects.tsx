"use client";

import React from "react";

export const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* 1. Subtle Cyber Dot Grid Texture */}
      <div 
        className="absolute inset-0 opacity-[0.06]" 
        style={{
          backgroundImage: "radial-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 10%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 10%, black 40%, transparent 100%)",
        }}
      />

      {/* 2. Top-Center Warm Gold Hero Aurora Light */}
      <div className="absolute -top-[160px] left-1/2 -translate-x-1/2 w-[750px] sm:w-[1100px] h-[500px] sm:h-[650px] bg-gradient-to-b from-[#FFC300]/15 via-[#FFC300]/5 to-transparent rounded-full blur-[140px] animate-pulse-subtle" />

      {/* 3. Top-Right Subtle Golden Light Orb */}
      <div className="absolute top-[8%] -right-[120px] w-[500px] h-[500px] bg-amber-500/10 rounded-full blur-[160px] animate-float-slow" />

      {/* 4. Mid-Page Left Amber Ambient Glow */}
      <div className="absolute top-[40%] -left-[160px] w-[600px] h-[600px] bg-amber-600/8 rounded-full blur-[180px] animate-drift" />

      {/* 5. Bottom Warm Glow */}
      <div className="absolute bottom-[2%] left-1/2 -translate-x-1/2 w-[900px] h-[450px] bg-gradient-to-t from-[#FFC300]/10 to-transparent rounded-full blur-[160px]" />
    </div>
  );
};
