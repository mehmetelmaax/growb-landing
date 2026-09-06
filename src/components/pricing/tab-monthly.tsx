"use client";

import React from "react";
import { MONTHLY_GROWTH_PACKAGES } from "@/data/pricing-catalog-data";
import { Check, ArrowUpRight } from "lucide-react";
import { SITE_CONFIG } from "@/lib/site-config";

export const TabMonthly: React.FC = () => {
  return (
    <div id="tabpanel-aylik" role="tabpanel" aria-labelledby="tab-aylik" className="space-y-12">
      <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#FFC300]/30 bg-[#FFC300]/10 p-4 text-center sm:flex-row sm:p-5 sm:text-left">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🎉</span>
          <p className="text-xs font-medium text-neutral-200 sm:text-sm">
            <strong className="font-bold text-[#FFC300]">Özel Avantaj:</strong> Kuruluş paketi alan
            müşterilerimiz, aylık büyüme paketlerine{" "}
            <strong className="font-bold text-white">ilk 3 ay %15 indirimli</strong> geçiş yapar.
          </p>
        </div>
        <span className="shrink-0 rounded-full bg-[#FFC300] px-3 py-1 font-mono text-xs font-black text-[#0A0A0A]">
          %15 İNDİRİM HAKKI
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {MONTHLY_GROWTH_PACKAGES.map((pkg) => (
          <div
            key={pkg.id}
            className={`relative flex flex-col justify-between rounded-3xl p-6 transition-all duration-300 sm:p-8 ${
              pkg.isPopular
                ? "border-2 border-[#FFC300] bg-gradient-to-b from-[#181818] to-[#0D0D0D] shadow-[0_20px_60px_rgba(255,195,0,0.2)] lg:-translate-y-2"
                : "border border-white/10 bg-[#121212] shadow-xl hover:border-white/25"
            }`}
          >
            <div>
              <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-[#FFC300]">
                {pkg.badge}
              </span>
              <h3 className="mb-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
                {pkg.name}
              </h3>
              <p className="mb-6 text-xs leading-relaxed text-neutral-400 sm:text-sm">
                {pkg.description}
              </p>

              <div className="mb-6 rounded-2xl border border-white/5 bg-white/5 p-4">
                <div className="flex items-baseline gap-1 text-3xl font-black tracking-tight text-white sm:text-4xl">
                  <span>{pkg.price}</span>
                  <span className="font-mono text-xs font-normal text-neutral-400">
                    {pkg.period} +KDV
                  </span>
                </div>
                <div className="mt-2 border-t border-white/10 pt-2 text-xs text-neutral-400">
                  Tekil Kalem Değeri: <span className="line-through">{pkg.originalValue}</span>
                </div>
              </div>

              <div className="mb-8 space-y-3 text-xs text-neutral-300">
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Sosyal Medya:</strong> {pkg.socialMedia}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Reels Videosu:</strong> {pkg.reels}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Google Harita:</strong> {pkg.localSeo}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Organik SEO:</strong> {pkg.seo}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Reklam Yönetimi:</strong> {pkg.adsManagement}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>İçerik Metinleri:</strong> {pkg.content}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>CRM & WhatsApp:</strong> {pkg.crmSupport}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Site Bakımı:</strong> {pkg.siteMaintenance}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Raporlama:</strong> {pkg.reporting}
                  </span>
                </div>
                <div className="flex items-start gap-2.5">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                  <span>
                    <strong>Yanıt Süresi:</strong> {pkg.responseTime}
                  </span>
                </div>
              </div>
            </div>

            <a
              href={SITE_CONFIG.getWhatsappUrl(
                `Merhaba GrowB Dijital, Aylık Büyüme Paketi (${pkg.name} - ${pkg.price}/ay) hakkında bilgi almak ve başlamak istiyorum.`
              )}
              target="_blank"
              rel="noreferrer"
              className={`flex w-full items-center justify-center gap-2 rounded-full py-4 text-xs font-black uppercase tracking-wider shadow-md transition-all focus-visible:ring-2 focus-visible:ring-white sm:text-sm ${
                pkg.isPopular
                  ? "bg-[#FFC300] text-[#0A0A0A] hover:scale-105 hover:bg-[#FFA000]"
                  : "bg-white/10 text-white hover:bg-[#FFC300] hover:text-[#0A0A0A]"
              }`}
            >
              <span>Aylık Yönetimi Başlat</span>
              <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
            </a>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFC300]/10 font-mono text-lg font-bold text-[#FFC300]">
            %5
          </span>
          <div>
            <h4 className="text-sm font-bold text-white">6 Ay Peşin Ödeme İndirimi</h4>
            <p className="text-xs text-neutral-400">
              6 aylık sözleşmeyi peşin ödeyen müşterilerimize net %5 nakit indirim.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-6">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFC300]/10 font-mono text-lg font-bold text-[#FFC300]">
            %10
          </span>
          <div>
            <h4 className="text-sm font-bold text-white">12 Ay Peşin Ödeme İndirimi</h4>
            <p className="text-xs text-neutral-400">
              Yıllık sözleşmeyi peşin ödeyen müşterilerimize net %10 nakit indirim.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
