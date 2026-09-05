import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { CampaignPricing } from "./campaign-pricing";

export const Pricing: React.FC = () => {
  return (
    <section id="fiyatlar" className="py-8 sm:py-10 bg-[#0D0D0D] border-y border-white/5 relative">
      {/* Glow Center Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-accent/10 rounded-full blur-[170px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* 3 Kampanyalık Anchoring & Decoy Düzeni */}
        <CampaignPricing />

        {/* Tüm Fiyat Listesi & Düzenli Paketler Köprüsü */}
        <div className="mt-5 rounded-2xl p-6 sm:p-8 bg-[#121212] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-2xl bg-[#FFC300]/10 border border-[#FFC300]/30 flex items-center justify-center text-2xl shrink-0">
              📋
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-white mb-1">
                Tüm Standart Paketler & 12 Uzmanlık Alanının Tekil Fiyat Tarifesi
              </h4>
              <p className="text-xs sm:text-sm text-neutral-400">
                SEO, Google Ads, e-ticaret altyapısı, video prodüksiyon ve CRM otomasyonu dahil tüm kalemleri inceleyin.
              </p>
            </div>
          </div>

          <Link
            href="/fiyatlar"
            className="shrink-0 px-6 py-3.5 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-xs sm:text-sm uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 hover:scale-105"
          >
            <span>Tüm Fiyat Listesini Gör (15 Kalem)</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>
      </div>
    </section>
  );
};
