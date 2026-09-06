"use client";

import React from "react";
import { Check } from "lucide-react";

export interface ServiceOption {
  id: string;
  title: string;
  desc: string;
}

export const FINAL_CTA_SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "web-tasarim",
    title: "🌐 Satış Odaklı Web Sitesi & Yazılım",
    desc: "1.1 sn ultra hızlı açılış, mobil öncelikli arayüz ve e-ticaret altyapısı",
  },
  {
    id: "reklam-harita",
    title: "🚀 Google & Meta Reklamları + Harita SEO",
    desc: "Doğrudan telefon çaldıran satış reklamları ve Google Haritalar'da 1. sıra",
  },
  {
    id: "video-sosyal",
    title: "🎬 4K Dikey Reels Video & Sosyal Medya",
    desc: "Algoritmayı fetheden dikey videolar, kurumsal kimlik ve marka prestiji",
  },
  {
    id: "crm-danismanlik",
    title: "📈 Büyüme Danışmanlığı & WhatsApp CRM",
    desc: "7/24 müşteri kaçırmayan satış hattı ve kurucuyla birebir aylık ciro ortaklığı",
  },
];

interface FinalCtaServiceSelectorProps {
  selectedServices: string[];
  onToggleService: (title: string) => void;
}

export const FinalCtaServiceSelector: React.FC<FinalCtaServiceSelectorProps> = ({
  selectedServices,
  onToggleService,
}) => {
  return (
    <div>
      <span
        id="service-options-label"
        className="mb-3 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]"
      >
        1. İHTİYACINIZ OLAN HİZMET ALANLARINI SEÇİN (ÇOKLU SEÇEBİLİRSİNİZ):
      </span>

      <div
        role="group"
        aria-labelledby="service-options-label"
        className="grid grid-cols-1 gap-3 sm:grid-cols-2"
      >
        {FINAL_CTA_SERVICE_OPTIONS.map((opt) => {
          const isSelected = selectedServices.includes(opt.title);
          return (
            <button
              type="button"
              key={opt.id}
              role="checkbox"
              aria-checked={isSelected}
              onClick={() => onToggleService(opt.title)}
              className={`flex cursor-pointer items-start gap-3 rounded-2xl border p-4 text-left transition-all duration-200 focus-visible:ring-2 focus-visible:ring-[#FFC300] ${
                isSelected
                  ? "border-[#FFC300] bg-[#FFC300]/15 shadow-[0_0_20px_rgba(255,195,0,0.15)]"
                  : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]"
              }`}
            >
              <div
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${
                  isSelected
                    ? "border-[#FFC300] bg-[#FFC300] text-black"
                    : "border-white/30 bg-white/5"
                }`}
              >
                {isSelected && <Check className="h-3.5 w-3.5 stroke-[3]" />}
              </div>
              <div className="flex-1">
                <span
                  className={`block text-xs font-bold leading-snug sm:text-sm ${
                    isSelected ? "text-[#FFC300]" : "text-white"
                  }`}
                >
                  {opt.title}
                </span>
                <span className="mt-1 block font-sans text-[11px] leading-normal text-neutral-400">
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
