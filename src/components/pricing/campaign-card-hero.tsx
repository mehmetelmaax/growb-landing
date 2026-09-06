"use client";

import React from "react";
import { Check, Sparkles, ArrowUpRight, Flame } from "lucide-react";

interface CardHeroProps {
  getWaLink: (name: string, price: string) => string;
}

export const CampaignCardHero: React.FC<CardHeroProps> = ({ getWaLink }) => (
  <div className="relative z-10 flex scale-105 flex-col justify-between overflow-hidden rounded-3xl border-2 border-[#FFC300] bg-gradient-to-b from-[#1c1705] via-[#141208] to-[#0d0d0d] p-7 shadow-[0_0_50px_rgba(255,195,0,0.25)] transition-all duration-300 sm:p-8 lg:col-span-4">
    <div className="pointer-events-none absolute right-0 top-0 h-48 w-48 rounded-full bg-[#FFC300]/20 blur-3xl" />

    <div>
      <div className="mb-3 flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC300] px-3 py-1 font-mono text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-md">
          <Flame className="h-3.5 w-3.5" />
          <span>EN ÇOK TERCİH EDİLEN</span>
        </div>
        <span className="animate-pulse rounded-full border border-red-500/40 bg-red-500/20 px-2.5 py-1 font-mono text-xs font-bold text-red-400">
          Son 3 Kontenjan
        </span>
      </div>

      <h3 className="mb-2 font-sans text-2xl font-black tracking-tight text-white sm:text-3xl">
        Yeni tanışıyoruz. İlk peteğinizi biz örelim.
      </h3>
      <p className="mb-6 text-xs font-medium leading-relaxed text-neutral-300 sm:text-sm">
        Markanızın dijital temeli tek seferde kuruluyor: web siteniz, logonuz, Google Harita
        profiliniz ve WhatsApp altyapınız. 12 günde teslim.
      </p>

      <div className="relative mb-5 overflow-hidden rounded-2xl border border-[#FFC300]/40 bg-black/60 p-5">
        <div className="mb-1 flex items-center gap-3">
          <span className="font-mono text-base text-neutral-400 line-through">₺39.900</span>
          <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 font-mono text-xs font-bold text-emerald-400">
            -₺15.000 İndirim
          </span>
        </div>
        <div className="flex items-baseline gap-1 text-4xl font-black tracking-tight text-[#FFC300] sm:text-5xl">
          <span>₺24.900</span>
          <span className="font-mono text-xs font-normal text-neutral-400">+KDV</span>
        </div>
      </div>

      <div className="mb-4 flex items-center gap-2.5 rounded-xl border border-[#FFC300]/50 bg-gradient-to-r from-[#FFC300]/20 to-amber-500/10 p-4 text-xs font-bold leading-snug text-[#FFC300] shadow-sm sm:text-sm">
        <Sparkles className="h-5 w-5 shrink-0 text-[#FFC300]" />
        <span>₺28.500 değerinde ek hizmet hediye.</span>
      </div>

      <div className="mb-6 rounded-xl border border-white/10 bg-white/5 p-3 font-mono text-[11px] leading-relaxed text-neutral-300">
        📌 <strong>Şart:</strong> 3 aylık Temel büyüme paketi (₺14.900/ay) ile birlikte geçerlidir.
      </div>

      <div className="mb-8 space-y-2.5 text-xs text-neutral-200">
        <span className="block font-mono text-[10px] font-bold uppercase tracking-wider text-[#FFC300]">
          Dahil Olan Tüm Hizmetler:
        </span>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>
            <strong>5-6 sayfa</strong> mobil uyumlu web sitesi
          </span>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-[#FFC300]/20 bg-[#FFC300]/10 p-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>
            <strong>Profesyonel logo tasarımı</strong> (
            <em>ücretsiz yükseltme, ₺7.500 değerinde</em>)
          </span>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-[#FFC300]/20 bg-[#FFC300]/10 p-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>
            <strong>Google Harita profili kurulumu</strong> (<em>hediye, ₺7.500 değerinde</em>)
          </span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>WhatsApp ve iletişim formu entegrasyonu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>Google Analytics ve Meta Pixel kurulumu</span>
        </div>
        <div className="flex items-start gap-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>Sayfa satış metinlerinin profesyonel yazımı</span>
        </div>
        <div className="flex items-start gap-2 rounded-lg border border-[#FFC300]/20 bg-[#FFC300]/10 p-2">
          <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
          <span>
            <strong>3 ay ücretsiz site bakımı</strong> (<em>hediye, ₺13.500 değerinde</em>)
          </span>
        </div>
      </div>
    </div>

    <a
      href={getWaLink("İlk Petek Tanışma Fırsatı", "₺24.900")}
      target="_blank"
      rel="noreferrer"
      className="flex w-full items-center justify-center gap-2 rounded-full bg-[#FFC300] py-4 text-xs font-black uppercase tracking-wider text-[#0A0A0A] shadow-[0_10px_30px_rgba(255,195,0,0.35)] transition-all hover:scale-105 hover:bg-[#FFA000] focus-visible:ring-2 focus-visible:ring-white sm:text-sm"
    >
      <span>Yerimi Ayırt</span>
      <ArrowUpRight className="h-4 w-4 stroke-[3]" />
    </a>
  </div>
);
