"use client";

import React from "react";
import { COMMERCIAL_TERMS } from "@/data/pricing-catalog-data";

export const TabCommercialTerms: React.FC = () => {
  return (
    <div
      id="tabpanel-kosullar"
      role="tabpanel"
      aria-labelledby="tab-kosullar"
      className="mx-auto max-w-4xl space-y-8"
    >
      <div className="rounded-3xl border border-white/10 bg-[#121212] p-6 shadow-2xl sm:p-10">
        <div className="mb-8">
          <span className="mb-1 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
            // RESMİ TİCARİ ÇERÇEVE
          </span>
          <h3 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Çalışma Esasları, Ödeme ve Sözleşme Şartları
          </h3>
          <p className="mt-2 text-xs text-neutral-400 sm:text-sm">
            Tüm müşterilerimizle kurumsal sözleşme imzalayarak hem iş takvimini hem de haklarınızı
            yasal güvenceye alıyoruz.
          </p>
        </div>

        <div className="space-y-4">
          {COMMERCIAL_TERMS.map((term, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-2xl border border-white/5 bg-white/5 p-4 transition-colors hover:border-white/10"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[#FFC300]/10 font-mono text-xs font-bold text-[#FFC300]">
                {String(index + 1).padStart(2, "0")}
              </div>
              <p className="text-sm font-medium leading-relaxed text-neutral-200">{term}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 font-sans text-xs leading-relaxed text-amber-200">
          <strong className="mb-1 block font-bold text-[#FFC300]">
            📌 Revizyon Politikası Hakkında Bilgilendirme:
          </strong>
          Süreçlerin zamanında ve aksamadan teslim edilebilmesi için tüm paketlerde belirlenen
          revizyon tur sayıları uygulanır. "Sınırsız revizyon" güvencesi yalnızca{" "}
          <strong>Logo – Premium</strong> paketimize özeldir; diğer paketlerde kapsam dışı ek
          talepler saatlik danışmanlık tarifemizden faturalandırılır.
        </div>
      </div>
    </div>
  );
};
