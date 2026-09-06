"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sparkles, CheckCircle2 } from "lucide-react";

export const Manifesto: React.FC = () => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "50px" }
    );

    observer.observe(el);

    // Emniyet: Her halükarda 800ms sonra görünür yap (sıfır boş ekran riski)
    const fallback = setTimeout(() => setIsVisible(true), 800);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section
      id="manifesto"
      ref={ref}
      className="relative w-full overflow-hidden border-y border-white/10 bg-[#0A0A0A] px-4 pb-4 pt-10 sm:px-6 sm:pb-6 sm:pt-12 lg:px-8"
    >
      {/* Ortam Altın Aura & Spot Efekti */}
      <div
        className={`pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[360px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/[0.045] blur-[120px] transition-opacity duration-1000 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
        {/* Üst Rozet: Shimmer Pill */}
        <div
          className={`mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/25 bg-gradient-to-r from-white/[0.07] to-white/[0.02] px-4 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.12)] backdrop-blur-md transition-all duration-700 sm:mb-6 ${
            isVisible ? "translate-y-0 scale-100 opacity-100" : "-translate-y-4 scale-95 opacity-0"
          }`}
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#FFC300]" />
          <span>GROWB BÜYÜME MANİFESTOSU // KANITLANMIŞ SİSTEMLER</span>
        </div>

        {/* 1. BÖLÜM: BÜYÜK VURUCU BAŞLIK (3D Perspective Blur-Up) */}
        <h2
          style={{ perspective: "1000px" }}
          className={`max-w-4xl text-2xl font-black leading-[1.2] tracking-tight text-white transition-all delay-100 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:text-4xl md:text-5xl lg:text-[3.1rem] ${
            isVisible
              ? "rotate-x-0 translate-y-0 opacity-100 blur-none"
              : "translate-y-7 opacity-0 blur-sm [transform:rotateX(12deg)]"
          }`}
        >
          CİRONUZU ARTIRAN{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#FFC300] via-[#FFF3B0] to-[#FFC300] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,195,0,0.45)]">
            SATIŞ SİSTEMLERİ
          </span>{" "}
          TESADÜFEN OLMAZ.
          <br className="hidden sm:inline" /> BİZ İŞİMİZİ ASLA{" "}
          <span className="relative inline-block bg-gradient-to-r from-[#FFC300] via-[#FFF3B0] to-[#FFC300] bg-clip-text text-transparent drop-shadow-[0_0_28px_rgba(255,195,0,0.45)]">
            ŞANSA BIRAKMIYORUZ.
          </span>
        </h2>

        {/* Luminous Gold Ayırıcı Işın Çizgisi (Expanding Laser Beam) */}
        <div
          className={`my-5 h-[2px] rounded-full bg-gradient-to-r from-transparent via-[#FFC300] to-transparent shadow-[0_0_12px_#FFC300] transition-all delay-200 duration-1000 ease-out sm:my-6 ${
            isVisible ? "w-28 opacity-100 sm:w-40" : "w-0 opacity-0"
          }`}
        />

        {/* 2. BÖLÜM: BÜYÜME MANİFESTOSU GÖVDE METNİ (Koyu Cam Panel & Altın Vurgular) */}
        <div
          className={`max-w-3xl rounded-2xl border border-white/10 bg-white/[0.02] p-5 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] backdrop-blur-sm transition-all delay-300 duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-7 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
          }`}
        >
          <p className="text-base font-bold leading-relaxed text-neutral-300 sm:text-xl md:text-2xl lg:text-[1.55rem]">
            BİZ MASRAF DEĞİL; TELEFONUNUZU VE SATIŞLARINIZI DÜZENLİ ÇALDIRAN BİR{" "}
            <span className="font-extrabold text-[#FFC300] underline decoration-[#FFC300]/40 underline-offset-4 drop-shadow-[0_0_16px_rgba(255,195,0,0.3)]">
              SATIŞ MAKİNESİ
            </span>{" "}
            KURUYORUZ. SADECE AJANS DEĞİL,{" "}
            <span className="text-white drop-shadow-[0_0_16px_rgba(255,255,255,0.25)]">
              BÜYÜME ORTAĞINIZIZ.
            </span>
          </p>
        </div>

        {/* 3. BÖLÜM: GÜVEN VURGUSU & ONAY ROZETİ */}
        <div
          className={`delay-400 mt-4 flex items-center justify-center transition-all duration-700 sm:mt-5 ${
            isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-1.5 text-xs font-semibold text-neutral-300 backdrop-blur-sm transition-colors hover:border-[#FFC300]/40 sm:text-sm">
            <CheckCircle2 className="h-4 w-4 text-[#FFC300]" />
            <span className="font-medium text-neutral-200">
              Ölçülebilir Satış Sistemleri & Kanıtlanmış Büyüme Modeli
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
