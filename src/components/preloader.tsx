"use client";

import React, { useEffect, useState } from "react";

export const Preloader: React.FC = () => {
  const [mounted, setMounted] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // 2.0 saniye gösterim, ardından yumuşak 0.6s fade-out
    const fadeTimer = setTimeout(() => {
      setFading(true);
    }, 2000);
    const removeTimer = setTimeout(() => {
      setMounted(false);
    }, 2600);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[99999] flex select-none flex-col items-center justify-center bg-[#0A0A0A] transition-opacity duration-500 ease-out ${
        fading ? "opacity-0" : "opacity-100"
      }`}
    >
      <style>{`
        @keyframes preloaderLogo {
          0% { opacity: 0; transform: translateY(15px) scale(0.8); }
          25% { opacity: 1; transform: translateY(0) scale(1.05); }
          55% { opacity: 1; transform: translateY(0) scale(1); }
          80% { opacity: 1; transform: translateY(0) scale(1); }
          100% { opacity: 0; transform: translate(-120px, -150px) scale(0.5); }
        }
        @keyframes preloaderDot {
          0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0px #FFC300); }
          50% { transform: scale(1.25); filter: drop-shadow(0 0 16px #FFC300); }
        }
        @keyframes preloaderProgress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes preloaderSlogan {
          0% { opacity: 0; transform: translateY(10px); }
          30% { opacity: 0.9; transform: translateY(0); }
          75% { opacity: 0.9; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-10px); }
        }
      `}</style>

      {/* Parıldayan Altın Halo Arka Plan */}
      <div className="pointer-events-none absolute h-72 w-72 rounded-full bg-[#FFC300]/10 blur-[120px]" />

      {/* Logo */}
      <div
        style={{ animation: "preloaderLogo 2.2s cubic-bezier(0.16, 1, 0.3, 1) forwards" }}
        className="relative z-10 flex items-baseline font-sans text-6xl font-black tracking-tight text-white sm:text-8xl"
      >
        <span>Growb</span>
        <span
          style={{ animation: "preloaderDot 1.2s ease-in-out infinite" }}
          className="ml-0.5 inline-block text-7xl leading-none text-[#FFC300] sm:text-9xl"
        >
          .
        </span>
      </div>

      {/* Alt Slogan & İlerleme Çizgisi */}
      <div
        style={{ animation: "preloaderSlogan 2.0s ease-in-out forwards" }}
        className="relative z-10 mt-6 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-neutral-400">
          Büyüme Ortağınız
        </span>
        <div className="h-0.5 w-28 overflow-hidden rounded-full bg-white/10">
          <div
            style={{ animation: "preloaderProgress 1.7s ease-in-out forwards" }}
            className="h-full bg-[#FFC300]"
          />
        </div>
      </div>
    </div>
  );
};
