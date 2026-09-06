"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

// 1. Ana Çarpıcı Giriş (Punchline)
const MANIFESTO_HEADLINE = [
  "CİRONUZU",
  "ARTIRAN",
  "SATIŞ",
  "SİSTEMLERİ",
  "TESADÜFEN",
  "OLMAZ.",
  "BİZ",
  "İŞİMİZİ",
  "ASLA",
  "ŞANSA",
  "BIRAKMIYORUZ.",
];

// 2. Temel Büyüme Manifestosu (Core Manifesto)
const MANIFESTO_BODY = [
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
  const containerRef = useRef<HTMLElement>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const totalWords = MANIFESTO_HEADLINE.length + MANIFESTO_BODY.length;

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      setRevealedCount(totalWords);
      setIsComplete(true);
      return;
    }

    // Doğrudan #manifesto hash bağlantısı ile gelinmişse hemen başlat
    if (window.location.hash === "#manifesto") {
      setHasStarted(true);
      return;
    }

    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        // Bölüm ekranda görünmeye başladığı an (%20+ görünürlük) hızlı daktilo başlar
        if (entry && (entry.isIntersecting || entry.intersectionRatio >= 0.2)) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: [0.1, 0.2, 0.35] }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [totalWords]);

  useEffect(() => {
    if (!hasStarted || prefersReducedMotion) return;

    let current = 0;
    // Her kelime 32ms aralıkla seri dökülür (~900ms'de tüm metin açılır)
    const timer = setInterval(() => {
      current += 1;
      setRevealedCount(current);
      if (current >= totalWords) {
        clearInterval(timer);
        setIsComplete(true);
      }
    }, 32);

    return () => clearInterval(timer);
  }, [hasStarted, prefersReducedMotion, totalWords]);

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative flex min-h-[85vh] w-full items-center justify-center border-y border-white/5 bg-[#0A0A0A] px-4 py-20 sm:px-6 sm:py-28 lg:px-8"
    >
      {/* Ortam Altın Işıltısı */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/[0.035] blur-[160px]" />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Üst Rozet */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-sm sm:mb-8">
          <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
          <span>GROWB BÜYÜME MANİFESTOSU // KANITLANMIŞ SİSTEMLER</span>
        </div>

        {/* 1. BÖLÜM: BÜYÜK VURUCU BAŞLIK */}
        <h2 className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-2xl font-black leading-[1.18] tracking-tight text-white sm:gap-x-4 sm:gap-y-3 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
          {MANIFESTO_HEADLINE.map((word, index) => {
            const isWritten = isComplete || revealedCount > index;
            const isCurrent = revealedCount === index + 1;
            const isGold =
              word === "SATIŞ" ||
              word === "SİSTEMLERİ" ||
              word === "ŞANSA" ||
              word === "BIRAKMIYORUZ.";

            return (
              <span
                key={`headline-${index}`}
                style={{
                  opacity: isWritten ? 1 : 0.18,
                  transform: isWritten
                    ? isCurrent
                      ? "translateY(-1px) scale(1.03)"
                      : "translateY(0)"
                    : "translateY(3px)",
                  color: isWritten ? (isGold ? "#FFC300" : "#FFFFFF") : "rgba(255, 255, 255, 0.22)",
                  textShadow:
                    isWritten && (isGold || isCurrent) ? "0 0 24px rgba(255, 195, 0, 0.5)" : "none",
                }}
                className="inline-block transition-all duration-150 ease-out will-change-[transform,opacity,color]"
              >
                {word}
              </span>
            );
          })}
        </h2>

        {/* 2. BÖLÜM: BÜYÜME MANİFESTOSU GÖVDE METNİ */}
        <div className="mt-8 max-w-4xl sm:mt-10">
          <p className="flex flex-wrap justify-center gap-x-2.5 gap-y-2 text-lg font-bold leading-relaxed tracking-normal sm:gap-x-3.5 sm:text-2xl md:text-3xl lg:text-[2rem]">
            {MANIFESTO_BODY.map((word, index) => {
              const wordAbsIndex = MANIFESTO_HEADLINE.length + index;
              const isWritten = isComplete || revealedCount > wordAbsIndex;
              const isCurrent = revealedCount === wordAbsIndex + 1;
              const isHighlight =
                word === "SATIŞ" ||
                word === "MAKİNESİ" ||
                word === "BÜYÜME" ||
                word === "ORTAĞINIZIZ.";

              return (
                <span
                  key={`body-${index}`}
                  style={{
                    opacity: isWritten ? 1 : 0.16,
                    transform: isWritten
                      ? isCurrent
                        ? "translateY(-1px) scale(1.02)"
                        : "translateY(0)"
                      : "translateY(2px)",
                    color: isWritten
                      ? isHighlight
                        ? "#FFC300"
                        : "#E5E5E5"
                      : "rgba(255, 255, 255, 0.2)",
                    textShadow:
                      isWritten && (isHighlight || isCurrent)
                        ? "0 0 20px rgba(255, 195, 0, 0.45)"
                        : "none",
                  }}
                  className="inline-block transition-all duration-150 ease-out will-change-[transform,opacity,color]"
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* 3. BÖLÜM: GÜVEN VURGUSU & ONAY ROZETİ */}
        <div className="mt-10 flex items-center justify-center sm:mt-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-xs font-semibold text-neutral-400 backdrop-blur-sm sm:text-sm">
            <CheckCircle2
              className={`h-4 w-4 transition-colors duration-300 ${
                isComplete ? "text-[#FFC300]" : "text-neutral-500"
              }`}
            />
            <span
              className={`transition-colors duration-300 ${
                isComplete ? "font-medium text-neutral-200" : "text-neutral-400"
              }`}
            >
              Ölçülebilir Satış Sistemleri & Kanıtlanmış Büyüme Modeli
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
