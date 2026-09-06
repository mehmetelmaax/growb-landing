"use client";

import React from "react";
import { ESTABLISHMENT_PACKAGES, ESTABLISHMENT_COMPARISON_ROWS } from "@/data/pricing-catalog-data";
import { Clock, RefreshCw, Gift, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const TabEstablishment: React.FC = () => {
  return (
    <div id="tabpanel-kurulus" role="tabpanel" aria-labelledby="tab-kurulus" className="space-y-16">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {ESTABLISHMENT_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-8 ${
              pkg.isPopular
                ? "border-2 border-[#FFC300] bg-gradient-to-b from-[#181818] to-[#0D0D0D] shadow-[0_20px_60px_rgba(255,195,0,0.2)] lg:-translate-y-2"
                : "border border-white/10 bg-[#121212] shadow-xl hover:border-white/25"
            }`}
          >
            {pkg.isPopular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 rounded-full bg-[#FFC300] px-4 py-1 font-mono text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-md">
                {pkg.badge}
              </div>
            )}

            <div>
              {!pkg.isPopular && (
                <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
                  {pkg.badge}
                </span>
              )}
              <h3 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {pkg.name}
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                {pkg.description}
              </p>

              <div className="mb-6 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-baseline gap-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  <span>{pkg.price}</span>
                  <span className="font-mono text-xs font-normal text-neutral-400">+KDV</span>
                </div>
                <div className="mt-2 flex items-center justify-between border-t border-white/10 pt-2 text-xs">
                  <span className="text-neutral-400 line-through">
                    Tekil Değeri: {pkg.originalValue}
                  </span>
                  <span className="rounded-full bg-emerald-500/20 px-2.5 py-0.5 font-mono font-bold text-emerald-400">
                    {pkg.savings}
                  </span>
                </div>
              </div>

              <div className="mb-8 space-y-2.5 font-mono text-xs text-neutral-300">
                <div className="flex items-center justify-between border-b border-white/5 py-1">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Clock className="h-3.5 w-3.5 text-[#FFC300]" /> Teslim Süresi:
                  </span>
                  <span className="font-bold text-white">{pkg.deliveryTime}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-1">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <RefreshCw className="h-3.5 w-3.5 text-[#FFC300]" /> Ücretsiz Revizyon:
                  </span>
                  <span className="font-bold text-white">{pkg.revisions}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 py-1">
                  <span className="flex items-center gap-1.5 text-neutral-400">
                    <Gift className="h-3.5 w-3.5 text-[#FFC300]" /> Bakım Hediyesi:
                  </span>
                  <span className="font-bold text-[#FFC300]">{pkg.maintenanceGift}</span>
                </div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.getWhatsappUrl(
                `Merhaba GrowB Dijital, ${pkg.name} (${pkg.price}) hakkında teklif ve sözleşme detaylarını görüşmek istiyorum.`
              )}
              target="_blank"
              rel="noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-black uppercase tracking-wider shadow-md transition-all focus-visible:ring-2 focus-visible:ring-white sm:text-sm ${
                pkg.isPopular
                  ? "bg-[#FFC300] text-[#0A0A0A] hover:scale-105 hover:bg-[#FFA000]"
                  : "bg-white/10 text-white hover:bg-[#FFC300] hover:text-[#0A0A0A]"
              }`}
            >
              <span>Projeyi Başlat & Teklif Al</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        ))}
      </div>

      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl sm:p-10">
        <div className="mb-8">
          <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            // EKSİKSİZ ŞEFFAFLIK
          </span>
          <h3 className="text-xl font-black tracking-tight text-white sm:text-3xl">
            Kuruluş Paketleri Ayrıntılı Kapsam Matrisi
          </h3>
        </div>

        <div
          tabIndex={0}
          role="region"
          aria-label="Kuruluş Paketleri Kapsam Matrisi Tablosu"
          className="overflow-x-auto rounded-xl focus-visible:ring-1 focus-visible:ring-[#FFC300]"
        >
          <table className="w-full border-collapse text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-white/15 font-mono text-xs uppercase text-neutral-400">
                <th className="px-4 py-4 font-bold">Hizmet / Modül</th>
                <th className="px-4 py-4 font-bold text-neutral-200">TEMEL PETEK (₺39.900)</th>
                <th className="px-4 py-4 font-bold text-[#FFC300]">BÜYÜME KOVANI (₺89.900)</th>
                <th className="px-4 py-4 font-bold text-amber-400">ALTIN KOVAN (₺169.900)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {ESTABLISHMENT_COMPARISON_ROWS.map((row, idx) => (
                <tr key={idx} className="transition-colors hover:bg-white/[0.02]">
                  <td className="flex items-center gap-2 px-4 py-4 font-bold text-white">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-white/5 font-mono text-[10px] text-[#FFC300]">
                      {row.serviceCode}
                    </span>
                    <span>{row.label}</span>
                  </td>
                  <td className="px-4 py-4 font-medium leading-relaxed text-neutral-300">
                    {row.temel}
                  </td>
                  <td className="bg-[#FFC300]/[0.03] px-4 py-4 font-semibold leading-relaxed text-[#FFC300]">
                    {row.buyume}
                  </td>
                  <td className="px-4 py-4 font-semibold leading-relaxed text-amber-200">
                    {row.altin}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
