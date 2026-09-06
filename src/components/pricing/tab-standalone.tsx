"use client";

import React, { useState } from "react";
import { STANDALONE_SERVICES_PRICING } from "@/data/pricing-catalog-data";
import { ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const TabStandalone: React.FC = () => {
  const [standaloneCategory, setStandaloneCategory] = useState<string>("all");

  const filteredStandalone =
    standaloneCategory === "all"
      ? STANDALONE_SERVICES_PRICING
      : STANDALONE_SERVICES_PRICING.filter((s) => s.category === standaloneCategory);

  return (
    <div id="tabpanel-tekil" role="tabpanel" aria-labelledby="tab-tekil" className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <span className="font-mono text-xs font-bold uppercase text-neutral-400">
          12 Uzmanlık Alanından İhtiyacınız Olan Hizmeti Seçin:
        </span>
        <div className="flex flex-wrap gap-2">
          {[
            { id: "all", label: "Tümü (12 Alan)" },
            { id: "DİJİTAL VARLIK & REKLAM", label: "Varlık & Reklam" },
            { id: "BÜYÜME & OTOMASYON", label: "Büyüme & Otomasyon" },
          ].map((f) => (
            <button
              key={f.id}
              onClick={() => setStandaloneCategory(f.id)}
              className={`rounded-full px-3.5 py-1.5 font-mono text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#FFC300] ${
                standaloneCategory === f.id
                  ? "bg-[#FFC300] text-[#0A0A0A] shadow-sm"
                  : "border border-white/10 bg-white/5 text-neutral-400 hover:text-white"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        {filteredStandalone.map((service) => (
          <div
            key={service.id}
            className="flex flex-col justify-between rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-xl transition-all hover:border-white/20 sm:p-8"
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-xs font-bold text-[#FFC300]">
                  #{service.code}
                </span>
                <span className="font-mono text-[10px] uppercase text-neutral-400">
                  {service.category}
                </span>
              </div>

              <h3 className="mb-2 text-xl font-black tracking-tight text-white sm:text-2xl">
                {service.title}
              </h3>
              <p className="mb-6 text-xs font-medium leading-relaxed text-neutral-400">
                {service.description}
              </p>

              <div
                tabIndex={0}
                role="region"
                aria-label={`${service.title} Fiyat Listesi Tablosu`}
                className="mb-6 overflow-x-auto rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFC300]"
              >
                <table className="w-full border-collapse text-left text-xs">
                  <thead>
                    <tr className="border-b border-white/10 font-mono text-[11px] uppercase text-neutral-400">
                      <th className="pb-2">Paket / Kalem</th>
                      <th className="pb-2">Kapsam</th>
                      <th className="pb-2 text-right">Fiyat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    {service.items.map((item, i) => (
                      <tr key={i} className="hover:bg-white/[0.02]">
                        <td className="whitespace-nowrap py-2.5 pr-2 font-bold text-white">
                          {item.name}
                        </td>
                        <td className="px-2 py-2.5 text-neutral-300">{item.scope}</td>
                        <td className="whitespace-nowrap py-2.5 pl-2 text-right font-mono font-bold text-[#FFC300]">
                          {item.price}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {service.extraRule && (
                <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 font-mono text-[11px] leading-relaxed text-amber-300">
                  ⚠️ {service.extraRule}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-4">
              <span className="font-mono text-[11px] text-neutral-400">
                Sözleşmeli & Taahhütlü Teslim
              </span>
              <a
                href={SITE_CONFIG.getWhatsappUrl(
                  `Merhaba GrowB Dijital, #${service.code} ${service.title} hizmetiniz için teklif almak istiyorum.`
                )}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-[#FFC300] hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
              >
                <span>Teklif Al</span>
                <ArrowUpRight className="h-3.5 w-3.5 stroke-[2.5]" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
