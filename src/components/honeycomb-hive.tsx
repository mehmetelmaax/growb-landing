"use client";

import React, { useState, useRef } from "react";
import { Sparkles, Hexagon, Grid } from "lucide-react";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";
import { HiveFormationView } from "@/components/honeycomb/hive-formation-view";
import { HiveDetailBox } from "@/components/honeycomb/hive-detail-box";

const SERVICE_ICONS: Record<string, { emoji: string }> = {
  "web-tasarim-yazilim": { emoji: "💻" },
  "google-harita-yerel-seo": { emoji: "📍" },
  "sosyal-medya-yonetimi": { emoji: "📱" },
  "grafik-tasarim-kurumsal-kimlik": { emoji: "🎨" },
  "meta-reklam-yonetimi": { emoji: "🎯" },
  "google-ads-reklamlari": { emoji: "🚀" },
  "video-reels-ai-produksiyon": { emoji: "🎬" },
  "icerik-yazarligi-satis-metni": { emoji: "✍️" },
  "seo-organik-gorunurluk": { emoji: "🔍" },
  "e-ticaret-satis-sistemleri": { emoji: "🛒" },
  "crm-whatsapp-takip": { emoji: "💬" },
  "rakip-pazar-analizi": { emoji: "📊" },
  "aylik-buyume-danismanligi": { emoji: "👑" },
};

export const HoneycombHive: React.FC = () => {
  const wing1Services = ALL_13_SERVICES_DETAILED.slice(0, 6);
  const centerService =
    ALL_13_SERVICES_DETAILED.find((s) => s.slug === "aylik-buyume-danismanligi") ??
    ALL_13_SERVICES_DETAILED[12]!;
  const wing2Services = ALL_13_SERVICES_DETAILED.slice(6, 12);

  const [selectedSlug, setSelectedSlug] = useState<string>(centerService.slug);
  const [viewMode, setViewMode] = useState<"formation" | "grid">("formation");

  const detailSectionRef = useRef<HTMLDivElement>(null);
  const formationTopRef = useRef<HTMLDivElement>(null);

  const handleSelectService = (slug: string) => {
    setSelectedSlug(slug);

    setTimeout(() => {
      if (detailSectionRef.current) {
        const yOffset = -90;
        const y =
          detailSectionRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 50);
  };

  const scrollToFormationTop = () => {
    if (formationTopRef.current) {
      const yOffset = -90;
      const y = formationTopRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const activeService =
    ALL_13_SERVICES_DETAILED.find((s) => s.slug === selectedSlug) ?? centerService;
  const activeIcon = SERVICE_ICONS[activeService.slug] ?? { emoji: "🐝" };

  return (
    <div className="relative w-full" ref={formationTopRef}>
      {/* Üst Mod Seçimi: 6-1-6 Kovan Formasyonu vs Kart Listesi */}
      <div className="mb-8 flex flex-col items-center justify-between gap-4 border-b border-white/10 pb-4 sm:flex-row">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-3.5 py-1.5 font-mono text-xs font-bold text-[#FFC300]">
            <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
            <span>6 - 1 - 6 KOVAN DİZİLİMİ</span>
          </div>
          <span className="hidden font-mono text-xs text-neutral-400 md:inline">
            (6 Varlık Peteği + 1 Merkez Kovan + 6 Büyüme Peteği)
          </span>
        </div>

        <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1">
          <button
            onClick={() => setViewMode("formation")}
            type="button"
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all ${
              viewMode === "formation"
                ? "scale-105 bg-[#FFC300] text-[#0A0A0A] shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Hexagon className="h-3.5 w-3.5" />
            <span>6 - 1 - 6 Formasyonu</span>
          </button>
          <button
            onClick={() => setViewMode("grid")}
            type="button"
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 font-mono text-xs font-bold transition-all ${
              viewMode === "grid"
                ? "scale-105 bg-[#FFC300] text-[#0A0A0A] shadow-md"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            <Grid className="h-3.5 w-3.5" />
            <span>Kart Listesi (13)</span>
          </button>
        </div>
      </div>

      {/* 6-1-6 FORMASYONU VEYA KART LİSTESİ */}
      <HiveFormationView
        viewMode={viewMode}
        wing1Services={wing1Services}
        centerService={centerService}
        wing2Services={wing2Services}
        allServices={ALL_13_SERVICES_DETAILED}
        selectedSlug={selectedSlug}
        serviceIcons={SERVICE_ICONS}
        onSelectService={handleSelectService}
      />

      {/* AŞAĞI BİLGİ BÖLÜMÜ / DETAY ÇEKMECESİ */}
      <HiveDetailBox
        activeService={activeService}
        activeIcon={activeIcon}
        detailSectionRef={detailSectionRef}
        scrollToFormationTop={scrollToFormationTop}
      />
    </div>
  );
};
