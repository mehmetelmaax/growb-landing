"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Cookie, X, Check } from "lucide-react";

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
    localStorage.setItem("growb_cookie_consent", "all");
    setIsVisible(false);
  };

  const handleAcceptNecessary = () => {
    localStorage.setItem("growb_cookie_consent", "necessary");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div
      role="region"
      aria-label="Çerez Onay Bildirimi"
      className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-[9999] p-5 rounded-2xl bg-[#141414]/95 backdrop-blur-xl border border-white/15 shadow-2xl text-white font-sans transition-all duration-300 animate-in fade-in slide-in-from-bottom-5"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-[#FFC300]/10 border border-[#FFC300]/30 flex items-center justify-center text-[#FFC300]">
            <Cookie className="w-4 h-4" />
          </div>
          <h4 className="text-sm font-bold text-white">Çerez Tercihleriniz</h4>
        </div>
        <button
          onClick={handleAcceptNecessary}
          className="text-neutral-400 hover:text-white transition-colors p-1"
          aria-label="Kapat"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-neutral-300 leading-relaxed mb-4">
        Deneyiminizi iyileştirmek, site güvenliğini sağlamak ve anonim performans verilerini ölçümlemek amacıyla çerezler kullanıyoruz. Detaylı bilgi için{" "}
        <Link
          href="/cerez-politikasi"
          className="text-[#FFC300] underline hover:text-[#FFD700] transition-colors"
        >
          Çerez Politikamızı
        </Link>{" "}
        inceleyebilirsiniz.
      </p>

      <div className="flex items-center gap-2 pt-1">
        <button
          onClick={handleAcceptAll}
          className="flex-1 py-2.5 px-3 rounded-xl bg-[#FFC300] hover:bg-[#e6b000] text-black font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-[#FFC300]/10"
        >
          <Check className="w-3.5 h-3.5" />
          <span>Tümünü Kabul Et</span>
        </button>
        <button
          onClick={handleAcceptNecessary}
          className="py-2.5 px-3 rounded-xl bg-[#1F1F1F] hover:bg-neutral-800 border border-white/10 text-neutral-300 hover:text-white text-xs font-semibold transition-colors"
        >
          Yalnızca Zorunlu
        </button>
      </div>
    </div>
  );
};
