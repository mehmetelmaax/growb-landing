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
  if (viewMode === "grid") {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8">
        {allServices.map((service) => {
          const iconData = serviceIcons[service.slug] ?? { emoji: "🐝" };
          const isSelected = selectedSlug === service.slug;

          return (
            <div
              key={service.slug}
              onClick={() => onSelectService(service.slug)}
              className={`p-6 sm:p-7 rounded-3xl bg-[#141414] border transition-all duration-300 cursor-pointer flex flex-col justify-between group select-text ${
                isSelected
                  ? "border-[#FFC300] shadow-[0_0_35px_rgba(255,195,0,0.25)] scale-[1.02]"
                  : "border-white/10 hover:border-[#FFC300]/50 hover:bg-[#181818]"
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="w-8 h-8 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-mono font-bold text-xs text-[#FFC300]">
                    {service.num}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold">
                    {service.badge}
                  </span>
                </div>

                <div className="text-3xl mb-3">{iconData.emoji}</div>

                <h3 className="text-lg sm:text-xl font-black text-white tracking-tight mb-2 group-hover:text-[#FFC300] transition-colors">
                  {service.title}
                </h3>

                <p className="text-xs text-neutral-400 leading-relaxed mb-4">
                  {service.tagline}
                </p>

                <ul className="space-y-2 mb-6 text-xs text-neutral-300">
                  {service.deliverables.slice(0, 3).map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#FFC300] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                <span className="text-[11px] font-mono font-bold text-[#FFC300]">
                  {service.metricsResult}
                </span>

                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 hover:bg-[#FFC300] text-white hover:text-[#0A0A0A] font-bold text-xs uppercase tracking-wider transition-all">
                  <span>Aşağı İndir</span>
                  <ArrowDown className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8 my-6">
      {/* İpucu Bildirimi */}
      <div className="text-center">
        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFC300]/10 border border-[#FFC300]/30 text-xs font-mono font-bold text-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.15)]">
          <span className="animate-bounce">👇</span>
          <span>İncelemek istediğiniz peteğe tıklayın; ekran otomatik olarak aşağıdaki bilgi bölümüne kayar.</span>
        </span>
      </div>

      {/* 1. KANAT (01 - 06) */}
      <div className="rounded-3xl bg-neutral-950/60 border border-white/5 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <span className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-wider flex items-center gap-2">
            <span>▲ 1. KANAT // 6 DİJİTAL VARLIK & REKLAM KANALI</span>
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            01 - 06 Numaralı Hizmetler
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2">
          {wing1Services.map((service, idx) => {
            const isSelected = selectedSlug === service.slug;
            const iconData = serviceIcons[service.slug] ?? { emoji: "🐝" };
            const floatClass = idx % 2 === 0 ? "hex-float-odd" : "hex-float-even";

            return (
              <div
                key={service.slug}
                onClick={() => onSelectService(service.slug)}
                className={`hex-cell w-[130px] h-[150px] sm:w-[155px] sm:h-[180px] md:w-[165px] md:h-[190px] ${floatClass} ${isSelected ? "active scale-105" : ""}`}
                role="button"
                tabIndex={0}
                title="Detayını görmek için tıklayın"
              >
                <div className="hex-cell-inner">
                  <span className="text-[10px] sm:text-xs font-mono font-black text-[#FFC300] tracking-widest mb-1">
                    #{service.num}
                  </span>
                  <div className="text-2xl sm:text-3xl mb-1">{iconData.emoji}</div>
                  <span className="text-[11px] sm:text-xs font-bold text-white leading-tight px-1 line-clamp-2">
                    {service.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#FFC300]/80 mt-1 uppercase tracking-tighter hidden sm:block">
                    {service.badge}
                  </span>
                  <div className="mt-1 flex items-center gap-0.5 text-[9px] font-mono text-white/50 group-hover:text-[#FFC300]">
                    <span>Detay</span>
                    <ArrowDown className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* MERKEZ (13) */}
      <div className="flex flex-col items-center justify-center my-6 relative py-4">
        <div className="w-px h-8 bg-gradient-to-b from-[#FFC300] to-transparent mb-2" />
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#FFC300]/20 border border-[#FFC300] text-xs font-mono font-black text-[#FFC300] uppercase tracking-widest mb-4 shadow-[0_0_20px_rgba(255,195,0,0.3)] animate-pulse">
          <Crown className="w-4 h-4 text-[#FFC300]" />
          <span>KOVANIN KALBİ // 1 MERKEZ YÖNETİM & STRATEJİ</span>
        </div>

        <div
          onClick={() => onSelectService(centerService.slug)}
          className={`hex-cell w-[170px] h-[195px] sm:w-[210px] sm:h-[240px] md:w-[230px] md:h-[265px] transition-all duration-300 ${
            selectedSlug === centerService.slug ? "active scale-110" : "scale-105"
          }`}
          role="button"
          tabIndex={0}
          title="Merkez Kovan Stratejisi"
        >
          <div className="hex-cell-inner !bg-[radial-gradient(circle_at_50%_25%,#3a2c00_0%,#1a1400_85%)] !border-2 !border-[#FFC300] shadow-[0_0_45px_rgba(255,195,0,0.4)]">
            <span className="text-xs sm:text-sm font-mono font-black text-[#FFC300] tracking-widest mb-1 flex items-center gap-1">
              <Crown className="w-3.5 h-3.5 text-[#FFC300]" />
              <span>#{centerService.num} MERKEZ</span>
            </span>
            <div className="text-3xl sm:text-4xl mb-1">👑</div>
            <span className="text-xs sm:text-sm font-black text-white leading-tight px-2 text-center">
              {centerService.title}
            </span>
            <span className="text-[10px] sm:text-xs font-mono text-[#FFC300] mt-1 font-bold">
              Birebir ROI Ortaklığı
            </span>
            <div className="mt-2 inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#FFC300] text-black text-[10px] font-black uppercase tracking-wider">
              <span>Detayı Gör</span>
              <ArrowDown className="w-3 h-3" />
            </div>
          </div>
        </div>
        <div className="w-px h-8 bg-gradient-to-t from-[#FFC300] to-transparent mt-4" />
      </div>

      {/* 2. KANAT (07 - 12) */}
      <div className="rounded-3xl bg-neutral-950/60 border border-white/5 p-4 sm:p-6 backdrop-blur-md relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
          <span className="text-xs font-mono font-black text-[#FFC300] uppercase tracking-wider flex items-center gap-2">
            <span>▼ 2. KANAT // 6 BÜYÜME, PRODÜKSİYON & OTOMASYON</span>
          </span>
          <span className="text-[11px] font-mono text-neutral-400">
            07 - 12 Numaralı Hizmetler
          </span>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 md:gap-5 lg:gap-6 py-2">
          {wing2Services.map((service, idx) => {
            const isSelected = selectedSlug === service.slug;
            const iconData = serviceIcons[service.slug] ?? { emoji: "🐝" };
            const floatClass = idx % 2 === 0 ? "hex-float-odd" : "hex-float-even";

            return (
              <div
                key={service.slug}
                onClick={() => onSelectService(service.slug)}
                className={`hex-cell w-[130px] h-[150px] sm:w-[155px] sm:h-[180px] md:w-[165px] md:h-[190px] ${floatClass} ${isSelected ? "active scale-105" : ""}`}
                role="button"
                tabIndex={0}
                title="Detayını görmek için tıklayın"
              >
                <div className="hex-cell-inner">
                  <span className="text-[10px] sm:text-xs font-mono font-black text-[#FFC300] tracking-widest mb-1">
                    #{service.num}
                  </span>
                  <div className="text-2xl sm:text-3xl mb-1">{iconData.emoji}</div>
                  <span className="text-[11px] sm:text-xs font-bold text-white leading-tight px-1 line-clamp-2">
                    {service.title}
                  </span>
                  <span className="text-[9px] font-mono text-[#FFC300]/80 mt-1 uppercase tracking-tighter hidden sm:block">
                    {service.badge}
                  </span>
                  <div className="mt-1 flex items-center gap-0.5 text-[9px] font-mono text-white/50 group-hover:text-[#FFC300]">
                    <span>Detay</span>
                    <ArrowDown className="w-2.5 h-2.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
