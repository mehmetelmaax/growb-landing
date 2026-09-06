"use client";

import React, { useRef, useState, useEffect } from "react";
import { Sparkles, CheckCircle2, ChevronDown } from "lucide-react";

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
            const totalScrollable = rect.height - window.innerHeight;
            if (totalScrollable > 0) {
              const currentScroll = -rect.top;
              const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
              setProgress(p);
            }
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

  // 1. Yazılma Aşaması: 0.00 -> 0.45 (Kelimeler pürüzsüz ve net aydınlanır)
  const WRITE_PHASE_END = 0.45;
  const isFullyWritten = prefersReducedMotion || progress >= WRITE_PHASE_END;

  // Başlık kelimelerinin ilerleme aralığı (0.00 -> 0.22)
  const headlineWords = MANIFESTO_HEADLINE.length;
  const headlineEndProgress = 0.22;

  // Gövde kelimelerinin ilerleme aralığı (0.22 -> 0.45)
  const bodyWords = MANIFESTO_BODY.length;
  const bodyStartProgress = 0.22;

  // 2. Rahat Okuma Aşaması: 0.45 -> 0.70 (Metin ekranda tam sabit ve okunur)
  const READ_PHASE_END = 0.7;

  // 3. Aşağı İndirme Animasyonu: 0.70 -> 1.00 (Kullanıcı aşağı indikçe sahne yumuşakça aşağı iner)
  const exitProgress = prefersReducedMotion
    ? 0
    : Math.max(0, Math.min(1, (progress - READ_PHASE_END) / (1 - READ_PHASE_END)));

  const exitTranslateY = exitProgress * 160;
  const exitOpacity = 1 - exitProgress * 0.95;
  const exitScale = 1 - exitProgress * 0.04;

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative min-h-[195vh] border-y border-white/5 bg-[#0A0A0A] sm:min-h-[210vh]"
    >
      {/* Sabitlenen Sahne */}
      <div className="sticky top-0 flex min-h-screen w-full select-none flex-col items-center justify-center overflow-hidden px-4 py-12 sm:px-6 lg:px-8">
        {/* Ortam Altın Işıltısı */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/[0.035] blur-[160px]" />

        {/* Kinetik Aşağı İnen İç Sahne Kartı */}
        <div
          style={{
            transform: `translate3d(0, ${exitTranslateY}px, 0) scale(${exitScale})`,
            opacity: exitOpacity,
          }}
          className="mx-auto flex w-full max-w-5xl flex-col items-center text-center transition-transform duration-75 ease-out will-change-[transform,opacity]"
        >
          {/* Üst Rozet */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-sm sm:mb-8">
            <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
            <span>GROWB BÜYÜME MANİFESTOSU // KANITLANMIŞ SİSTEMLER</span>
          </div>

          {/* 1. BÖLÜM: BÜYÜK VURUCU ÇAĞRI (Aşağı indikçe pürüzsüzce aydınlanan başlık) */}
          <h2 className="flex flex-wrap justify-center gap-x-3 gap-y-2 text-2xl font-black leading-[1.18] tracking-tight text-white sm:gap-x-4 sm:gap-y-3 sm:text-4xl md:text-5xl lg:text-[3.25rem]">
            {MANIFESTO_HEADLINE.map((word, index) => {
              const step = headlineEndProgress / headlineWords;
              const wordStart = index * step;
              const wordEnd = wordStart + step * 0.85;

              const isWritten = isFullyWritten || progress >= wordEnd;
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
                    transform: isWritten ? "translateY(0)" : "translateY(4px)",
                    color: isWritten
                      ? isGold
                        ? "#FFC300"
                        : "#FFFFFF"
                      : "rgba(255, 255, 255, 0.22)",
                    textShadow: isWritten && isGold ? "0 0 24px rgba(255, 195, 0, 0.45)" : "none",
                  }}
                  className="inline-block transition-all duration-200 ease-out will-change-[transform,opacity,color]"
                >
                  {word}
                </span>
              );
            })}
          </h2>

          {/* 2. BÖLÜM: BÜYÜME MANİFESTOSU METNİ (Başlığın ardından pürüzsüzce aydınlanır) */}
          <div className="mt-8 max-w-4xl sm:mt-10">
            <p className="flex flex-wrap justify-center gap-x-2.5 gap-y-2 text-lg font-bold leading-relaxed tracking-normal sm:gap-x-3.5 sm:text-2xl md:text-3xl lg:text-[2rem]">
              {MANIFESTO_BODY.map((word, index) => {
                const step = (WRITE_PHASE_END - bodyStartProgress) / bodyWords;
                const wordStart = bodyStartProgress + index * step;
                const wordEnd = wordStart + step * 0.85;

                const isWritten = isFullyWritten || progress >= wordEnd;
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
                      transform: isWritten ? "translateY(0)" : "translateY(3px)",
                      color: isWritten
                        ? isHighlight
                          ? "#FFC300"
                          : "#E5E5E5"
                        : "rgba(255, 255, 255, 0.2)",
                      textShadow:
                        isWritten && isHighlight ? "0 0 20px rgba(255, 195, 0, 0.4)" : "none",
                    }}
                    className="inline-block transition-all duration-200 ease-out will-change-[transform,opacity,color]"
                  >
                    {word}
                  </span>
                );
              })}
            </p>
          </div>

          {/* 3. BÖLÜM: OKUMA GÜVENCESİ & İLERLEME ÇUBUĞU */}
          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <div className="flex items-center gap-2 font-mono text-xs text-neutral-400">
              {exitProgress > 0 ? (
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <ChevronDown className="h-4 w-4 animate-bounce text-[#FFC300]" />
                  <span>Aşağı kaydırılıyor...</span>
                </span>
              ) : isFullyWritten ? (
                <span className="flex items-center gap-1.5 font-bold text-[#FFC300]">
                  <CheckCircle2 className="h-4 w-4 text-[#FFC300]" />
                  <span>Manifesto tamamlandı • Aşağı kaydırarak devam edin ↓</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5 text-neutral-400">
                  <span className="inline-block h-2 w-2 animate-ping rounded-full bg-[#FFC300]" />
                  <span>Aşağı kaydırarak okumaya devam edin...</span>
                </span>
              )}
            </div>

            {/* İlerleme Çizgisi */}
            <div className="h-1 w-44 overflow-hidden rounded-full bg-white/10 sm:w-64">
              <div
                className="h-full bg-gradient-to-r from-[#FFC300]/80 to-[#FFC300] transition-all duration-100 ease-out"
                style={{ width: `${Math.round(progress * 100)}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
