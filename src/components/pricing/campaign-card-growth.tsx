"use client";

import React from "react";
import { Check, ArrowUpRight } from "lucide-react";

interface CardGrowthProps {
  getWaLink: (name: string, price: string) => string;
}

export const CampaignCardGrowth: React.FC<CardGrowthProps> = ({ getWaLink }) => (
  <div className="flex flex-col justify-between self-center rounded-3xl border border-white/10 bg-[#111111] p-6 shadow-xl transition-all duration-300 hover:border-white/20 sm:p-7 lg:col-span-4">
    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="font-mono text-xs font-bold uppercase tracking-wider text-amber-400">
          BÜYÜK MÜŞTERİ FIRSATI
        </span>
        <span className="rounded-full border border-red-500/30 bg-red-500/15 px-2.5 py-0.5 font-mono text-[10px] font-bold text-red-400">
          2 Marka ile Sınırlı
        </span>
      </div>

      <h3 className="mb-2 text-xl font-black tracking-tight text-white sm:text-2xl">
        Online satışa tam donanımlı başlayın.
      </h3>
      <p className="mb-5 text-xs leading-relaxed text-neutral-400">
        Mağazanız, markanız, reklamınız ve içeriğiniz hazır teslim edilir.
      </p>

      <div className="mb-5 rounded-2xl border border-white/5 bg-white/5 p-4">
        <div className="mb-1 flex items-center gap-2">
          <span className="font-mono text-sm text-neutral-400 line-through">₺89.900</span>
          <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
            -₺25.000 İndirim
          </span>
        </div>
        <div className="flex items-baseline gap-1 text-3xl font-black tracking-tight text-white">
          <span>₺64.900</span>
          <span className="font-mono text-xs font-normal text-neutral-400">+KDV</span>
        </div>
      </div>

      <div className="mb-4 rounded-xl border border-amber-500/25 bg-amber-500/10 p-3.5 text-xs font-medium leading-snug text-amber-200">
        ✨ <strong>₺25.000 indirim + ₺27.000 değerinde</strong> hediye hizmet.
      </div>

      <div className="mb-5 rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-[11px] leading-relaxed text-neutral-300">
        📌 <strong>Şart:</strong> 6 aylık Büyüme paketi (₺32.900/ay) ile birlikte geçerlidir.
      </div>

      <div
        tabIndex={0}
        role="region"
        aria-label="Kovan Tam Dolsun Paket İçeriği"
        className="mb-6 max-h-72 space-y-2 overflow-y-auto rounded-lg pr-1 text-xs text-neutral-300 focus-visible:ring-1 focus-visible:ring-[#FFC300]"
      >
        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-neutral-400">
          Paket İçeriği:
        </span>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>8-12 sayfa kurumsal web sitesi + blog altyapısı</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Kurumsal kimlik paketi (logo, renk-font kılavuzu, kartvizit)</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Google Harita kurulumu ve optimizasyonu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>WhatsApp otomatik yanıt sistemi kurulumu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>3 adet reels video prodüksiyonu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#FFC300]" />
          <span>Meta veya Google reklam hesabı kurulumu</span>
        </div>
      </div>
    </div>

    <a
      href={getWaLink("Kovan Tam Dolsun Büyük Müşteri Teklifi", "₺64.900")}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 py-3.5 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-[#FFC300] hover:bg-[#FFC300] hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:text-sm"
    >
      <span>Teklif Al & Başla</span>
      <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
    </a>
  </div>
);
