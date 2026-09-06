"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, TrendingUp, Send, ArrowUpRight } from "lucide-react";
import { ServiceDetail } from "@/data/services-detail-data";

interface ServiceCardDisplayProps {
  activeService: ServiceDetail;
  direction: number;
  onOpenDetail: () => void;
}

export const ServiceCardDisplay: React.FC<ServiceCardDisplayProps> = ({
  activeService,
  onOpenDetail,
}) => {
  return (
    <div className="perspective-[1200px] relative w-full lg:col-span-6">
      <div
        key={activeService.slug}
        className="animate-in fade-in zoom-in-95 w-full select-text rounded-[24px] border-2 border-[#FFC300]/40 bg-[#121212] p-6 shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(255,195,0,0.06)] transition-all duration-200 hover:border-[#FFC300]/70 sm:rounded-3xl sm:p-8 lg:p-9"
      >
        {/* Kart Üst Satırı: [01] Kategori ve Yeşil Rozet */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <span className="rounded-lg bg-[#FFC300] px-2.5 py-1 font-mono text-xs font-black text-[#0A0A0A]">
              {activeService.num}
            </span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
              {activeService.category}
            </span>
          </div>

          <span className="rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-0.5 font-mono text-xs font-bold text-emerald-400 shadow-sm">
            {activeService.badge}
          </span>
        </div>

        {/* Hizmet Başlığı */}
        <h3 className="mb-3 font-sans text-xl font-black tracking-tight text-[#FFC300] sm:text-2xl lg:text-3xl">
          {activeService.title}
        </h3>

        {/* Hizmet Açıklama / Slogan */}
        <p className="mb-5 text-xs font-medium leading-relaxed text-neutral-200 sm:text-sm">
          {activeService.tagline}
        </p>

        {/* 3 Teslim Edilebilir Madde */}
        <div className="mb-6 space-y-2.5">
          {activeService.deliverables.slice(0, 3).map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300] sm:h-4 sm:w-4" />
              <span className="text-xs font-normal leading-snug text-neutral-300 sm:text-sm">
                {item}
              </span>
            </div>
          ))}
        </div>

        {/* Kart Alt Satırı: Hedef Metrik & Hizmeti İncele Buton Grubu */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FFC300] sm:text-sm">
            <TrendingUp className="h-4 w-4 text-[#FFC300]" />
            <span>Hedef: {activeService.metricsResult}</span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onOpenDetail}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full bg-[#FFC300] px-4 py-2.5 font-mono text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_4px_16px_rgba(255,195,0,0.3)] transition-all hover:scale-105 hover:bg-[#FFA000] active:scale-95 sm:px-5 sm:py-3"
            >
              <span>DETAY AL</span>
              <Send className="h-3.5 w-3.5 stroke-[2.5]" />
            </button>

            <Link
              href={`/hizmetler/${activeService.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-3.5 py-2.5 font-mono text-xs font-bold uppercase tracking-wider text-white shadow-sm transition-all hover:scale-105 hover:bg-white/20 sm:px-4 sm:py-3"
            >
              <span>İncele</span>
              <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
