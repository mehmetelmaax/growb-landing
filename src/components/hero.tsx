"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  ArrowRight, 
  Sparkles, 
  Phone 
} from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { HivePollen } from "@/data/hero-pollens-data";
import { HeroHoneycomb } from "@/components/hero/hero-honeycomb";
import { ConsultationModal } from "@/components/hero/consultation-modal";

export const Hero: React.FC = () => {
  // Başlangıçta sadece merkez Growb var (1/13) ve sayfa kilitli
  const [revealedCount, setRevealedCount] = useState<number>(1);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [hoveredPollen, setHoveredPollen] = useState<HivePollen | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  const revealedCountRef = useRef(1);
  const isCompletedRef = useRef(false);
  const lastWheelTimeRef = useRef(0);

  useEffect(() => {
    revealedCountRef.current = revealedCount;
  }, [revealedCount]);

  useEffect(() => {
    isCompletedRef.current = isCompleted;
  }, [isCompleted]);

  // HERO KİLİT MEKANİZMASI: 13 Polen Dolana Kadar Sayfa Kilitlidir
  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      if (window.scrollY > 0 && !isCompletedRef.current) {
        window.scrollTo(0, 0);
      }
    }

    const lock = () => {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
      document.documentElement.style.height = "100%";
      document.body.style.height = "100%";
    };

    const unlock = () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
      document.documentElement.style.height = "";
      document.body.style.height = "";
    };

    if (!isCompleted) {
      lock();
    } else {
      unlock();
    }

    const handleWheel = (e: WheelEvent) => {
      if (isCompletedRef.current) return;
      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastWheelTimeRef.current < 160) return;

      if (e.deltaY > 0) {
        lastWheelTimeRef.current = now;
        setRevealedCount((prev) => {
          const next = Math.min(13, prev + 1);
          if (next === 13) {
            setTimeout(() => {
              setIsCompleted(true);
              unlock();
            }, 400);
          }
          return next;
        });
      } else if (e.deltaY < 0) {
        lastWheelTimeRef.current = now;
        setRevealedCount((prev) => Math.max(1, prev - 1));
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isCompletedRef.current) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isCompletedRef.current) return;
      const deltaY = touchStartY - (e.changedTouches[0]?.clientY ?? 0);
      if (deltaY > 25) {
        setRevealedCount((prev) => {
          const next = Math.min(13, prev + 1);
          if (next === 13) {
            setTimeout(() => {
              setIsCompleted(true);
              unlock();
            }, 400);
          }
          return next;
        });
      } else if (deltaY < -25) {
        setRevealedCount((prev) => Math.max(1, prev - 1));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      if (isCompletedRef.current) {
        unlock();
      }
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [isCompleted]);

  const completeInstantly = () => {
    setRevealedCount(13);
    setIsCompleted(true);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.documentElement.style.height = "";
    document.body.style.height = "";
  };

  return (
    <section className="relative min-h-[92vh] sm:min-h-screen flex flex-col justify-center pt-24 sm:pt-28 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto overflow-hidden">
      {/* Ambient Arka Plan Işıkları */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[400px] bg-[#FFC300]/[0.06] rounded-full blur-[160px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-[#FFC300]/[0.04] rounded-full blur-[170px] pointer-events-none -z-10" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* SOL SÜTUN: METİNLER & AKSİYONLAR */}
        <div className="lg:col-span-6 flex flex-col items-start z-10">
          <div className="flex flex-wrap items-center gap-3 mb-5 sm:mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-[#FFC300]/30 text-xs font-mono font-bold tracking-wider text-[#FFC300] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#FFC300] animate-pulse" />
              <span>GROWB DİJİTAL BÜYÜME AJANSI</span>
            </div>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono text-emerald-400 hover:text-emerald-300 hover:border-emerald-500/50 transition-colors shadow-sm"
              title={`Doğrudan Arayın: ${SITE_CONFIG.phone}`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <Phone className="w-3 h-3 text-emerald-400" />
              <span className="font-bold text-white tracking-wide">{SITE_CONFIG.phone}</span>
            </a>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[4rem] font-black tracking-[-0.035em] leading-[1.08] text-white font-sans mb-5 sm:mb-6">
            Markanızı dijitalde{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
              büyütüyoruz.
            </span>
          </h1>

          <p className="text-sm sm:text-base lg:text-lg text-neutral-300 max-w-xl leading-relaxed font-normal mb-6 sm:mb-8 font-sans">
            Strateji, reklam yönetimi, içerik üretimi, SEO ve satış altyapısı.{" "}
            <strong className="text-white font-semibold">13 uzmanlık alanı tek çatı altında</strong> — ayrı ayrı tedarikçiyle uğraşmayın.
          </p>

          <div className="flex flex-wrap items-center gap-3.5 sm:gap-5 mb-8 sm:mb-10 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setIsAnalysisModalOpen(true)}
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-sm sm:text-base tracking-tight shadow-[0_10px_35px_rgba(255,195,0,0.35)] hover:scale-105 active:scale-95 transition-all cursor-pointer group"
            >
              <span>Ücretsiz Analiz İsteyin</span>
              <ArrowRight className="w-4 h-4 stroke-[3] group-hover:translate-x-1 transition-transform" />
            </button>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="inline-flex items-center gap-3 px-4 sm:px-5 py-3 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 hover:border-[#FFC300] text-white transition-all shadow-md group cursor-pointer hover:scale-105 active:scale-95"
            >
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FFC300] flex items-center justify-center text-[#0A0A0A] shadow-sm group-hover:rotate-12 transition-transform">
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="text-[9px] sm:text-[10px] uppercase font-mono tracking-wider text-neutral-400">Hemen Arayın / WhatsApp</span>
                <span className="text-xs sm:text-base font-black tracking-tight text-white group-hover:text-[#FFC300] transition-colors font-mono">
                  {SITE_CONFIG.phone}
                </span>
              </div>
            </a>

            <a
              href="#hizmetler"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-neutral-300 hover:text-[#FFC300] transition-colors group px-2 py-2"
            >
              <span>Hizmetleri görün</span>
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </div>

          <div className="pt-4 sm:pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 w-full text-xs font-mono text-neutral-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Türkiye&apos;nin her yerinden markalarla çalışıyoruz.</span>
            </div>
            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="inline-flex items-center gap-2 text-neutral-300 hover:text-[#FFC300] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>Doğrudan İletişim: <strong className="text-white">{SITE_CONFIG.phone}</strong></span>
            </a>
          </div>
        </div>

        {/* SAĞ SÜTUN: GROWB KOVANI (ALT MODÜL) */}
        <HeroHoneycomb
          revealedCount={revealedCount}
          isCompleted={isCompleted}
          hoveredPollen={hoveredPollen}
          setHoveredPollen={setHoveredPollen}
          completeInstantly={completeInstantly}
        />
      </div>

      {/* ÜCRETSİZ ANALİZ MODALI (ALT MODÜL) */}
      <ConsultationModal
        isOpen={isAnalysisModalOpen}
        onClose={() => setIsAnalysisModalOpen(false)}
      />
    </section>
  );
};
