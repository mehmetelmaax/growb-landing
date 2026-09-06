"use client";

import React from "react";
import Link from "next/link";
import { Lock, Unlock, Zap } from "lucide-react";
import { HIVE_POLLENS, getHexPath, HivePollen } from "@/data/hero-pollens-data";

interface HeroHoneycombProps {
  revealedCount: number;
  isCompleted: boolean;
  hoveredPollen: HivePollen | null;
  setHoveredPollen: (pollen: HivePollen | null) => void;
  completeInstantly?: () => void;
}

export const HeroHoneycomb: React.FC<HeroHoneycombProps> = ({
  revealedCount,
  isCompleted,
  hoveredPollen,
  setHoveredPollen,
  completeInstantly,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center lg:col-span-6">
      {/* Durum Rozeti: Kilit / Tamamlandı Bilgisi */}
      <div className="mb-3 flex w-full max-w-[520px] select-none items-center justify-between px-2 font-mono text-xs text-neutral-300">
        <div className="flex items-center gap-2">
          {isCompleted ? (
            <>
              <Unlock className="h-3.5 w-3.5 text-emerald-400" />
              <strong className="text-emerald-400">
                ✨ Kovan tamamlandı! Sayfa akışı serbest ↓
              </strong>
            </>
          ) : (
            <>
              <Lock className="h-3.5 w-3.5 animate-pulse text-[#FFC300]" />
              <span>
                🐝 GrowB Kovanı Örülüyor:{" "}
                <strong className="text-sm text-[#FFC300]">{revealedCount}/13</strong>{" "}
                <span className="text-neutral-400">(Aşağı kaydırın)</span>
              </span>
            </>
          )}
        </div>

        {!isCompleted && completeInstantly && (
          <button
            type="button"
            data-testid="hero-unlock-hive"
            onClick={completeInstantly}
            className="flex cursor-pointer items-center gap-1 text-[11px] font-bold text-[#FFC300] transition-colors hover:underline"
            title="Kovanı anında tamamla ve kilidi aç"
          >
            <Zap className="h-3 w-3 fill-current" />
            <span>Kovanı Doldur</span>
          </button>
        )}
      </div>

      {/* MASAÜSTÜ & MOBİL: 13 POLEN KOVAN ÇİZİMİ */}
      <div className="relative aspect-[520/450] w-full max-w-[520px]">
        <svg viewBox="0 0 520 450" className="h-full w-full select-none overflow-visible">
          <defs>
            {/* Merkez GrowB Kovanı Altın Gradyanı */}
            <radialGradient id="centerGrowbGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFF275" />
              <stop offset="60%" stopColor="#FFC300" />
              <stop offset="100%" stopColor="#E69500" />
            </radialGradient>

            {/* Altın Parıltı Efekti */}
            <filter id="pollenGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feDropShadow
                dx="0"
                dy="0"
                stdDeviation="6"
                floodColor="#FFC300"
                floodOpacity="0.45"
              />
              <feDropShadow
                dx="0"
                dy="4"
                stdDeviation="8"
                floodColor="#000000"
                floodOpacity="0.8"
              />
            </filter>
          </defs>

          {/* 1. Henüz Örülmemiş Polenlerin Taslak Çizgisi (Blueprint) */}
          {HIVE_POLLENS.map((pollen) => {
            if (pollen.order <= revealedCount) return null;
            const pathData = getHexPath(pollen.cx, pollen.cy, 44);
            return (
              <path
                key={`blueprint-${pollen.id}`}
                d={pathData}
                fill="rgba(255, 195, 0, 0.015)"
                stroke="rgba(255, 195, 0, 0.15)"
                strokeWidth="1"
                strokeDasharray="4 3"
                className="transition-opacity duration-300"
              />
            );
          })}

          {/* 2. Scroll ile Sırayla Gelen Polenler */}
          {HIVE_POLLENS.map((pollen) => {
            const isRevealed = pollen.order <= revealedCount;
            if (!isRevealed) return null;

            const isHovered = hoveredPollen?.id === pollen.id;
            const r = pollen.isCenter ? 48 : 44;
            const pathData = getHexPath(pollen.cx, pollen.cy, r);

            return (
              <Link
                key={pollen.id}
                href={`/hizmetler/${pollen.slug}`}
                aria-label={`${pollen.fullName} — hizmet ${pollen.order}/13`}
                className="group cursor-pointer"
                onMouseEnter={() => setHoveredPollen(pollen)}
                onMouseLeave={() => setHoveredPollen(null)}
              >
                <g
                  filter="url(#pollenGlow)"
                  style={{
                    transformOrigin: `${pollen.cx}px ${pollen.cy}px`,
                    animation: "popInPollen 0.38s cubic-bezier(0.16, 1, 0.3, 1) both",
                  }}
                  className="transition-transform duration-200 group-hover:scale-105"
                >
                  {/* Petek / Polen Gövdesi */}
                  <path
                    d={pathData}
                    fill={
                      pollen.isCenter
                        ? isHovered
                          ? "#FFFFFF"
                          : "url(#centerGrowbGrad)"
                        : isHovered
                          ? "#FFC300"
                          : "#141414"
                    }
                    stroke={
                      pollen.isCenter ? "#FFFFFF" : isHovered ? "#FFFFFF" : "rgba(255, 195, 0, 0.5)"
                    }
                    strokeWidth={pollen.isCenter ? "3" : isHovered ? "2.5" : "1.4"}
                    className="shadow-xl transition-colors duration-200"
                  />

                  {/* Polen İçi İçerik */}
                  {pollen.isCenter ? (
                    <>
                      <text
                        x={pollen.cx}
                        y={pollen.cy - 7}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#0A0A0A"
                        className="pointer-events-none select-none font-sans text-[20px] font-black"
                      >
                        Growb
                      </text>
                      <circle
                        cx={pollen.cx + 34}
                        cy={pollen.cy - 12}
                        r="3.5"
                        fill="#FFFFFF"
                        className="animate-pulse"
                      />
                      <text
                        x={pollen.cx}
                        y={pollen.cy + 16}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill="#1A1A1A"
                        className="pointer-events-none select-none font-mono text-[9px] font-black uppercase tracking-[0.16em]"
                      >
                        BÜYÜME MERKEZİ
                      </text>
                    </>
                  ) : (
                    <>
                      <text
                        x={pollen.cx}
                        y={pollen.cy - 9}
                        textAnchor="middle"
                        dominantBaseline="central"
                        className="pointer-events-none select-none text-[17px]"
                      >
                        {pollen.icon}
                      </text>
                      <text
                        x={pollen.cx}
                        y={pollen.cy + 14}
                        textAnchor="middle"
                        dominantBaseline="central"
                        fill={isHovered ? "#0A0A0A" : "#FFFFFF"}
                        className="pointer-events-none select-none font-mono text-[9.5px] font-bold transition-colors duration-200"
                      >
                        {pollen.shortName}
                      </text>
                    </>
                  )}
                </g>
              </Link>
            );
          })}
        </svg>
      </div>

      {/* Alt Kovan Açıklaması / Hover Bilgisi */}
      <div className="mt-3 min-h-[22px] text-center font-mono text-xs text-neutral-400">
        {hoveredPollen ? (
          <span className="text-white">
            👉 <strong className="text-[#FFC300]">{hoveredPollen.fullName}:</strong>{" "}
            {hoveredPollen.tagline}
          </span>
        ) : isCompleted ? (
          <span className="font-bold text-emerald-400">
            ✓ 13/13 Polen tamamlandı! Aşağı kaydırarak devam edebilirsiniz.
          </span>
        ) : (
          <span className="text-neutral-400">
            Fare tekerleğini aşağı kaydırın; her hamlede bir arı poleni eklenir (
            {13 - revealedCount} polen kaldı).
          </span>
        )}
      </div>
    </div>
  );
};
