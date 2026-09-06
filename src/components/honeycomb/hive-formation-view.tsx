"use client";

import React from "react";
import { ArrowDown, Crown, CheckCircle2 } from "lucide-react";
import { ServiceDetail } from "@/data/services-detail-data";

interface HiveFormationViewProps {
  viewMode: "formation" | "grid";
  wing1Services: ServiceDetail[];
  centerService: ServiceDetail;
  wing2Services: ServiceDetail[];
  allServices: ServiceDetail[];
  selectedSlug: string;
  serviceIcons: Record<string, { emoji: string }>;
  onSelectService: (slug: string) => void;
}

export const HiveFormationView: React.FC<HiveFormationViewProps> = ({
  viewMode,
  wing1Services,
  centerService,
  wing2Services,
  allServices,
  selectedSlug,
  serviceIcons,
  onSelectService,
}) => {
  const handleKeySelect = (e: React.KeyboardEvent, slug: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelectService(slug);
    }
  };

  if (viewMode === "grid") {
    return (
      <div className="my-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {allServices.map((service) => {
          const iconData = serviceIcons[service.slug] ?? { emoji: "🐝" };
          const isSelected = selectedSlug === service.slug;

          return (
            <div
              key={service.slug}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${service.title} hizmetini seç`}
              onClick={() => onSelectService(service.slug)}
              onKeyDown={(e) => handleKeySelect(e, service.slug)}
              className={`group flex cursor-pointer select-text flex-col justify-between rounded-3xl border bg-[#141414] p-6 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:p-7 ${
                isSelected
                  ? "scale-[1.02] border-[#FFC300] shadow-[0_0_35px_rgba(255,195,0,0.25)]"
                  : "border-white/10 hover:border-[#FFC300]/50 hover:bg-[#181818]"
              }`}
            >
              <div>
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl border border-white/10 bg-white/5 font-mono text-xs font-bold text-[#FFC300]">
                    {service.num}
                  </span>
                  <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-[10px] font-bold text-emerald-400">
                    {service.badge}
                  </span>
                </div>

                <div className="mb-3 text-3xl">{iconData.emoji}</div>

                <h3 className="mb-2 text-lg font-black tracking-tight text-white transition-colors group-hover:text-[#FFC300] sm:text-xl">
                  {service.title}
                </h3>

                <p className="mb-4 text-xs leading-relaxed text-neutral-400">{service.tagline}</p>

                <ul className="mb-6 space-y-2 text-xs text-neutral-300">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
                <span className="font-mono text-[11px] font-bold text-[#FFC300]">
                  {service.metricsResult}
                </span>

                <span className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FFC300] hover:text-[#0A0A0A]">
                  <span>Aşağı İndir</span>
                  <ArrowDown className="h-3.5 w-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const renderWing = (services: ServiceDetail[], title: string, subtitle: string) => (
    <div className="relative overflow-hidden rounded-3xl border border-white/5 bg-neutral-950/60 p-4 backdrop-blur-md sm:p-6">
      <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-2">
        <span className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-wider text-[#FFC300]">
          <span>{title}</span>
        </span>
        <span className="font-mono text-[11px] text-neutral-400">{subtitle}</span>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3 py-2 sm:gap-4 md:gap-5 lg:gap-6">
        {services.map((service, idx) => {
          const isSelected = selectedSlug === service.slug;
          const iconData = serviceIcons[service.slug] ?? { emoji: "🐝" };
          const floatClass = idx % 2 === 0 ? "hex-float-odd" : "hex-float-even";

          return (
            <div
              key={service.slug}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-label={`${service.title} hizmetini seç`}
              onClick={() => onSelectService(service.slug)}
              onKeyDown={(e) => handleKeySelect(e, service.slug)}
              className={`hex-cell h-[150px] w-[130px] focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:h-[180px] sm:w-[155px] md:h-[190px] md:w-[165px] ${floatClass} ${isSelected ? "active scale-105" : ""}`}
              title="Detayını görmek için tıklayın"
            >
              <div className="hex-cell-inner">
                <span className="mb-1 font-mono text-[10px] font-black tracking-widest text-[#FFC300] sm:text-xs">
                  #{service.num}
                </span>
                <div className="mb-1 text-2xl sm:text-3xl">{iconData.emoji}</div>
                <span className="line-clamp-2 px-1 text-[11px] font-bold leading-tight text-white sm:text-xs">
                  {service.title}
                </span>
                <span className="mt-1 hidden font-mono text-[9px] uppercase tracking-tighter text-[#FFC300]/80 sm:block">
                  {service.badge}
                </span>
                <div className="mt-1 flex items-center gap-0.5 font-mono text-[9px] text-white/50 group-hover:text-[#FFC300]">
                  <span>Detay</span>
                  <ArrowDown className="h-2.5 w-2.5" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="my-6 space-y-6 sm:space-y-8">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-4 py-2 font-mono text-xs font-bold text-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.15)]">
          <span className="animate-bounce">👇</span>
          <span>
            İncelemek istediğiniz peteğe tıklayın; ekran otomatik olarak bilgi bölümüne kayar.
          </span>
        </span>
      </div>

      {renderWing(
        wing1Services,
        "▲ 1. KANAT // 6 DİJİTAL VARLIK & REKLAM KANALI",
        "01 - 06 Numaralı Hizmetler"
      )}

      {/* MERKEZ (13) */}
      <div className="relative my-6 flex flex-col items-center justify-center py-4">
        <div className="mb-2 h-8 w-px bg-gradient-to-b from-[#FFC300] to-transparent" />
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300] bg-black/80 px-4 py-1 font-mono text-xs font-black uppercase tracking-widest text-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.3)]">
          <Crown className="h-4 w-4 text-[#FFC300]" />
          <span>KOVANIN KALBİ // 1 MERKEZ YÖNETİM & STRATEJİ</span>
        </div>

        <div
          role="button"
          tabIndex={0}
          aria-pressed={selectedSlug === centerService.slug}
          aria-label={`${centerService.title} merkez hizmetini seç`}
          onClick={() => onSelectService(centerService.slug)}
          onKeyDown={(e) => handleKeySelect(e, centerService.slug)}
          className={`hex-cell h-[195px] w-[170px] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:h-[240px] sm:w-[210px] md:h-[265px] md:w-[230px] ${
            selectedSlug === centerService.slug ? "active scale-110" : "scale-105"
          }`}
          title="Merkez Kovan Stratejisi"
        >
          <div className="hex-cell-inner !border-2 !border-[#FFC300] !bg-[radial-gradient(circle_at_50%_25%,#3a2c00_0%,#1a1400_85%)] shadow-[0_0_45px_rgba(255,195,0,0.4)]">
            <span className="mb-1 flex items-center gap-1 font-mono text-xs font-black tracking-widest text-[#FFC300] sm:text-sm">
              <Crown className="h-3.5 w-3.5 text-[#FFC300]" />
              <span>#{centerService.num} MERKEZ</span>
            </span>
            <div className="mb-1 text-3xl sm:text-4xl">👑</div>
            <span className="px-2 text-center text-xs font-black leading-tight text-white sm:text-sm">
              {centerService.title}
            </span>
            <span className="mt-1 font-mono text-[10px] font-bold text-[#FFC300] sm:text-xs">
              Birebir ROI Ortaklığı
            </span>
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFC300] px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-black">
              <span>Detayı Gör</span>
              <ArrowDown className="h-3 w-3" />
            </div>
          </div>
        </div>
        <div className="mt-4 h-8 w-px bg-gradient-to-t from-[#FFC300] to-transparent" />
      </div>

      {renderWing(
        wing2Services,
        "▼ 2. KANAT // 6 BÜYÜME, PRODÜKSİYON & OTOMASYON",
        "07 - 12 Numaralı Hizmetler"
      )}
    </div>
  );
};
