"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles } from "lucide-react";

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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const el = containerRef.current;
          if (el) {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            // Ekrana girer girmez başlar, kullanıcı aşağı indikçe hızlı ve akıcı bir tempoyla gelir
            const startY = windowHeight * 0.95;
            const endY = windowHeight * 0.22;
            const rawP = Math.max(0, Math.min(1, (startY - rect.top) / (startY - endY)));

            // "Biraz hızlı gelsin": Akışın başını hızlandıran hafif ivmeli eğri (75% kaydırmada tamamı açılır)
            const acceleratedP = Math.min(1, Math.pow(rawP, 0.88) * 1.32);
            setProgress(acceleratedP);
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
      className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-24 sm:py-32"
    >
      {/* Arka Plan Altın Halo Efekti */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[450px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/[0.035] blur-[150px]" />

      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        {/* Üst Rozet */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-sm sm:mb-8">
          <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
          <span>BÜYÜME MANİFESTOSU // DİJİTAL DÖNÜŞÜM</span>
        </div>

        {/* Aşağı indikçe dinamik olarak gelen kinetik tipografi başlığı */}
        <h2 className="flex select-none flex-wrap justify-center gap-x-3 gap-y-2.5 text-2xl font-black leading-[1.18] tracking-tight sm:gap-x-4 sm:gap-y-3 sm:text-5xl md:text-6xl lg:text-7xl">
          {MANIFESTO_WORDS.map((word, index) => {
            // Her kelimenin sahneye giriş eşiği
            const step = 0.88 / totalWords;
            const start = index * step;
            const end = Math.min(1, start + step * 1.25);

            let wordOpacity = 0.08;
            let translateY = 14;
            let blur = 3;

            if (prefersReducedMotion) {
              wordOpacity = 1;
              translateY = 0;
              blur = 0;
            } else if (progress >= end) {
              wordOpacity = 1;
              translateY = 0;
              blur = 0;
            } else if (progress > start) {
              const ratio = (progress - start) / (end - start);
              wordOpacity = 0.08 + ratio * 0.92;
              translateY = 14 * (1 - ratio);
              blur = 3 * (1 - ratio);
            }

            const isHighlight =
              word === "BÜYÜME" ||
              word === "ORTAĞINIZIZ." ||
              word === "SATIŞ" ||
              word === "MAKİNESİ";

            const isWordActive = wordOpacity > 0.55;

            return (
              <span
                key={index}
                style={{
                  opacity: wordOpacity,
                  transform: `translateY(${translateY.toFixed(1)}px)`,
                  filter: blur > 0.3 ? `blur(${blur.toFixed(1)}px)` : "none",
                  color: isWordActive
                    ? isHighlight
                      ? "#FFC300"
                      : "#FFFDF5"
                    : "rgba(255, 253, 245, 0.15)",
                  textShadow:
                    isWordActive && isHighlight ? "0 0 24px rgba(255, 195, 0, 0.45)" : "none",
                }}
                className="inline-block transition-all duration-150 ease-out will-change-[transform,opacity,filter]"
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
