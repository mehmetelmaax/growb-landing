"use client";

import React, { useRef, useState, useEffect } from "react";

const MANIFESTO_WORDS = [
  "BİZ",
  "MASRAF",
  "DEĞİL;",
  "TELEFONUNUZU",
  "VE",
  "SATIŞLARINIZI",
  "DÜZENLİ",
  "ÇALDIRAN",
  "BİR",
  "SATIŞ",
  "MAKİNESİ",
  "KURUYORUZ.",
  "SADECE",
  "AJANS",
  "DEĞİL,",
  "BÜYÜME",
  "ORTAĞINIZIZ.",
];

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const total = windowHeight + rect.height;
            const current = windowHeight - rect.top;
            const p = Math.max(0, Math.min(1, current / total));
            setProgress(p);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalWords = MANIFESTO_WORDS.length;

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-32"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="flex select-none flex-wrap justify-center gap-x-3.5 gap-y-2 text-3xl font-black leading-[1.15] tracking-tight sm:gap-x-5 sm:text-5xl md:text-6xl lg:text-7xl">
          {MANIFESTO_WORDS.map((word, index) => {
            const start = (index / totalWords) * 0.7;
            const end = Math.min(1, ((index + 1) / totalWords) * 0.7 + 0.1);
            let wordOpacity = 0.18;
            if (progress >= end) {
              wordOpacity = 1;
            } else if (progress > start) {
              wordOpacity = 0.18 + ((progress - start) / (end - start)) * 0.82;
            }
            return (
              <span
                key={index}
                style={{
                  opacity: wordOpacity,
                  color: wordOpacity > 0.6 ? "#FFFDF5" : "rgba(255, 253, 245, 0.18)",
                }}
                className="transition-colors duration-150"
              >
                {word}
              </span>
            );
          })}
        </h2>
      </div>
    </section>
  );
};
