"use client";

import React from "react";
import { Check, ArrowUpRight } from "lucide-react";

interface CardStarterProps {
  getWaLink: (name: string, price: string) => string;
}

export const CampaignCardStarter: React.FC<CardStarterProps> = ({ getWaLink }) => (
  <div className="flex flex-col justify-between self-center rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:border-white/20 sm:p-7 lg:col-span-4">
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
          GİRİŞ TEKLİFİ
        </span>
        <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-neutral-300">
          5 Günde Teslim
        </span>
      </div>

      <h3 className="mb-2 text-xl font-black tracking-tight text-white sm:text-2xl">
        Küçük başlayın, sonra büyütün.
      </h3>
      <p className="mb-5 text-xs leading-relaxed text-neutral-400">
        Tek sayfa, 5 günde. Beğenirseniz tam siteye geçin, ödediğiniz düşülsün.
      </p>

      <div className="mb-5 rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="flex items-baseline gap-1 text-3xl font-black tracking-tight text-white">
          <span>₺15.000</span>
          <span className="font-mono text-xs font-normal text-neutral-400">+KDV</span>
        </div>
        <span className="mt-1 block font-mono text-[11px] text-neutral-400">
          Tek seferlik kurulum bedeli
        </span>
      </div>

      <div className="mb-5 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs font-medium leading-snug text-amber-200">
        💡 <strong>3 ay içinde</strong> tam siteye geçerseniz ödediğiniz <strong>₺15.000</strong>{" "}
        fiyattan düşülür.
      </div>

      <div className="mb-6 space-y-2.5 text-xs text-neutral-300">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Paket İçeriği:
        </span>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Tek sayfa dönüşüm odaklı site (hizmetler, referanslar, iletişim)</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Google Harita profili kurulumu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>WhatsApp butonu ve iletişim formu entegrasyonu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Google Analytics kurulumu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>5 iş gününde anahtar teslim</span>
        </div>
      </div>
    </div>

    <a
      href={getWaLink("Vitrin Peteği Giriş Teklifi", "₺15.000")}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#FFC300] hover:bg-[#FFC300] hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:text-sm"
    >
      <span>Teklif Al & Başla</span>
      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
    </a>
  </div>
);
