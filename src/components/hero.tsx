"use client";

import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { ArrowRight, Sparkles, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import type { HivePollen } from "@/data/hero-pollens-data";
import {
  getABVariant,
  HERO_EXPERIMENT,
  HERO_COPY_VARIANTS,
  HeroVariantKey,
} from "@/lib/ab-testing";
import { trackPhoneClick } from "@/lib/analytics";

const HeroHoneycomb = dynamic(
  () => import("@/components/hero/hero-honeycomb").then((mod) => mod.HeroHoneycomb),
  { ssr: false }
);

const ConsultationModal = dynamic(
  () => import("@/components/hero/consultation-modal").then((mod) => mod.ConsultationModal),
  { ssr: false }
);

export const Hero: React.FC = () => {
  const [variant, setVariant] = useState<HeroVariantKey>("control");
  const [revealedCount, setRevealedCount] = useState<number>(13);
  const [isCompleted, setIsCompleted] = useState<boolean>(true);
  const [hoveredPollen, setHoveredPollen] = useState<HivePollen | null>(null);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);

  useEffect(() => {
    setVariant(getABVariant(HERO_EXPERIMENT));
  }, []);

  const copy = HERO_COPY_VARIANTS[variant];

  const completeInstantly = () => {
    setRevealedCount(13);
    setIsCompleted(true);
  };

  return (
    <section className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center overflow-hidden px-4 pb-8 pt-24 sm:min-h-screen sm:px-6 sm:pb-12 sm:pt-28 lg:px-8">
      {/* Ambient Arka Plan Işıkları */}
      <div className="pointer-events-none absolute left-1/4 top-1/4 -z-10 h-[400px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFC300]/[0.06] blur-[160px]" />
      <div className="pointer-events-none absolute right-10 top-1/3 -z-10 h-[450px] w-[450px] rounded-full bg-[#FFC300]/[0.04] blur-[170px]" />

      <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12">
        {/* SOL SÜTUN: METİNLER & AKSİYONLAR */}
        <div className="z-10 flex flex-col items-start lg:col-span-6">
          <div className="mb-5 flex flex-wrap items-center gap-3 sm:mb-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-white/5 px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300] shadow-sm">
              <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#FFC300]" />
              <span>{copy.badge}</span>
            </div>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              onClick={() => trackPhoneClick("hero_badge_pill")}
              className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1.5 font-mono text-xs text-emerald-400 shadow-sm transition-colors hover:border-emerald-500/50 hover:text-emerald-300"
              title={`Doğrudan Arayın: ${SITE_CONFIG.phone}`}
            >
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <Phone className="h-3 w-3 text-emerald-400" />
              <span className="font-bold tracking-wide text-white">{SITE_CONFIG.phone}</span>
            </a>
          </div>

          <h1 className="mb-5 font-sans text-3xl font-black leading-[1.08] tracking-[-0.035em] text-white sm:mb-6 sm:text-5xl lg:text-[4rem]">
            {copy.headline.split(" ").slice(0, 2).join(" ")}{" "}
            <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
              {copy.headline.split(" ").slice(2).join(" ")}
            </span>
          </h1>

          <p className="mb-6 max-w-xl font-sans text-sm font-normal leading-relaxed text-neutral-300 sm:mb-8 sm:text-base lg:text-lg">
            {copy.subtitle}
          </p>

          <div className="mb-8 flex w-full flex-wrap items-center gap-3.5 sm:mb-10 sm:w-auto sm:gap-5">
            <button
              type="button"
              onClick={() => setIsAnalysisModalOpen(true)}
              className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FFC300] px-6 py-3.5 text-sm font-black tracking-tight text-[#0A0A0A] shadow-[0_10px_35px_rgba(255,195,0,0.35)] transition-all hover:scale-105 hover:bg-[#FFA000] active:scale-95 sm:px-7 sm:py-4 sm:text-base"
            >
              <span>{copy.ctaPrimary}</span>
              <ArrowRight className="h-4 w-4 stroke-[3] transition-transform group-hover:translate-x-1" />
            </button>

            <a
              href={SITE_CONFIG.getPhoneUrl()}
              onClick={() => trackPhoneClick("hero_cta_phone")}
              className="group inline-flex cursor-pointer items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-3 text-white shadow-md transition-all hover:scale-105 hover:border-[#FFC300] hover:bg-white/15 active:scale-95 sm:px-5 sm:py-3.5"
            >
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#FFC300] text-[#0A0A0A] shadow-sm transition-transform group-hover:rotate-12 sm:h-8 sm:w-8">
                <Phone className="h-3.5 w-3.5 fill-current sm:h-4 sm:w-4" />
              </div>
              <div className="flex flex-col text-left leading-tight">
                <span className="font-mono text-[9px] uppercase tracking-wider text-neutral-400 sm:text-[10px]">
                  Hemen Arayın / WhatsApp
                </span>
                <span className="font-mono text-xs font-black tracking-tight text-white transition-colors group-hover:text-[#FFC300] sm:text-base">
                  {SITE_CONFIG.phone}
                </span>
              </div>
            </a>

            <a
              href="#hizmetler"
              className="group inline-flex items-center gap-1.5 px-2 py-2 text-xs font-bold text-neutral-300 transition-colors hover:text-[#FFC300] sm:text-sm"
            >
              <span>Hizmetleri görün</span>
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </a>
          </div>

          <div className="flex w-full flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4 font-mono text-xs text-neutral-400 sm:pt-5">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              <span>Türkiye&apos;nin her yerinden markalarla çalışıyoruz.</span>
            </div>
            <a
              href={SITE_CONFIG.getPhoneUrl()}
              className="inline-flex items-center gap-2 text-neutral-300 transition-colors hover:text-[#FFC300]"
            >
              <Phone className="h-3.5 w-3.5 text-[#FFC300]" />
              <span>
                Doğrudan İletişim: <strong className="text-white">{SITE_CONFIG.phone}</strong>
              </span>
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
