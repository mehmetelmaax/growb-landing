"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";
import { updateConsent } from "@/lib/analytics";

export const CookieBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Sadece tarayici ortaminda ve henuz onay verilmemisse goster
    const consent = localStorage.getItem("growb_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    updateConsent("all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    updateConsent("necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Çerez Onay Bildirimi"
      className="animate-in fade-in slide-in-from-bottom-5 fixed bottom-4 left-4 right-4 z-[9999] rounded-2xl border border-white/15 bg-[#141414]/95 p-5 font-sans text-white shadow-2xl backdrop-blur-xl transition-all duration-300 sm:left-6 sm:right-auto sm:max-w-md"
    >
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#FFC300]/30 bg-[#FFC300]/10 text-[#FFC300]">
            <Cookie className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Çerez Tercihleriniz</h4>
        </div>
        <button
          onClick={handleAcceptNecessary}
          className="p-1 text-neutral-400 transition-colors hover:text-white"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <p className="mb-4 text-xs leading-relaxed text-neutral-300">
        Deneyiminizi iyileştirmek, site güvenliğini sağlamak ve anonim performans verilerini
        ölçümlemek amacıyla çerezler kullanıyoruz. Detaylı bilgi için{" "}
        <Link
          href="/cerez-politikasi"
          className="text-[#FFC300] underline transition-colors hover:text-[#FFD700]"
        >
          Çerez Politikamızı
        </Link>{" "}
        inceleyebilirsiniz.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-[#FFC300] px-3 py-2.5 text-xs font-bold text-black shadow-lg shadow-[#FFC300]/10 transition-colors hover:bg-[#e6b000]"
        >
          <Check className="h-3.5 w-3.5" />
          <span>Tümünü Kabul Et</span>
        </button>
        <button
          onClick={handleAcceptNecessary}
          className="rounded-xl border border-white/10 bg-[#1F1F1F] px-3 py-2.5 text-xs font-semibold text-neutral-300 transition-colors hover:bg-neutral-800 hover:text-white"
        >
          Yalnızca Zorunlu
        </button>
      </div>
    </div>
  );
};
