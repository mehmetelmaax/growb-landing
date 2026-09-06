"use client";

import React from "react";
import Image from "next/image";
import { X, Sparkles, CheckCircle2, ExternalLink, MapPin } from "lucide-react";
import { ClientReference } from "@/data/featured-works-data";
import { useFocusTrap } from "@/hooks/use-focus-trap";

interface FeaturedWorkModalProps {
  client: ClientReference | null;
  onClose: () => void;
}

export const FeaturedWorkModal: React.FC<FeaturedWorkModalProps> = ({ client, onClose }) => {
  const modalRef = useFocusTrap(!!client, onClose);

  if (!client) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-50 flex items-center justify-center p-4 duration-200 sm:p-6 lg:p-8">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
      />

      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="featured-work-title"
        className="animate-in zoom-in-95 slide-in-from-bottom-5 relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/20 bg-[#141414] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)] duration-200 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-white/15 hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-2">
            <Image
              src={client.logo}
              alt={client.name}
              width={64}
              height={64}
              className="max-h-full max-w-full object-contain"
            />
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h3
                id="featured-work-title"
                className="text-xl font-bold tracking-tight text-white sm:text-2xl"
              >
                {client.name}
              </h3>
              <span className="rounded-full bg-[#FFC300]/15 px-2.5 py-0.5 font-mono text-[11px] font-bold text-[#FFC300]">
                {client.badge}
              </span>
            </div>
            <div className="mt-1 flex items-center gap-2 font-mono text-xs text-neutral-400">
              <MapPin className="h-3.5 w-3.5 text-[#FFC300]" />
              <span>{client.city}</span>
              <span>•</span>
              <span>{client.category}</span>
            </div>
          </div>
        </div>

        <p className="mb-6 text-sm leading-relaxed text-neutral-300">{client.summary}</p>

        <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-center">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Mobil Açılış
            </span>
            <span className="text-base font-black text-[#FFC300] sm:text-lg">
              {client.metrics.speed}
            </span>
          </div>
          <div className="border-x border-white/10">
            <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Müşteri Çağrısı
            </span>
            <span className="text-base font-black text-white sm:text-lg">
              {client.metrics.calls}
            </span>
          </div>
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400">
              Arama Sırası
            </span>
            <span className="text-xs font-bold text-emerald-400 sm:text-sm">
              {client.metrics.seoRank}
            </span>
          </div>
        </div>

        <div className="mb-6">
          <h4 className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-neutral-400">
            <Sparkles className="h-3.5 w-3.5 text-[#FFC300]" />
            <span>Bu Projede Ne Yaptık?</span>
          </h4>
          <ul className="space-y-2">
            {client.whatWeDid.map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-xs text-neutral-300 sm:text-sm">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-[#FFC300]" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
          <a
            href={client.url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-[#FFC300] px-5 py-2.5 text-xs font-bold text-[#0A0A0A] shadow-md transition-all hover:bg-[#e6b000] focus-visible:ring-2 focus-visible:ring-white"
          >
            <span>Canlı Siteyi Ziyaret Et</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
};
