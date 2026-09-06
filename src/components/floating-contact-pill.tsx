"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

export const FloatingContactPill: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 250);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`group fixed bottom-6 right-6 z-50 flex select-none items-center gap-3.5 rounded-full border border-neutral-200 bg-white p-2 pl-3 pr-2 text-neutral-950 shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-300 hover:shadow-[0_25px_60px_rgba(0,0,0,0.5)] ${
        visible
          ? "pointer-events-auto translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-8 scale-95 opacity-0"
      }`}
    >
      {/* Avatar with Online Pulse Badge */}
      <div className="relative">
        <div className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-full border-2 border-white bg-neutral-100 shadow-sm">
          {/* TODO_CONTENT: [CEO Görseli Bekleniyor - Floating Contact Pill Avatar] */}
          <Image
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80"
            alt="Mehmet Demir - GrowB Dijital Büyüme Danışmanı"
            width={44}
            height={44}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white bg-emerald-500 shadow-sm" />
      </div>

      {/* Name & Role */}
      <div className="flex hidden flex-col pr-1 text-left sm:flex">
        <span className="text-sm font-bold leading-tight text-neutral-950">Mehmet Demir</span>
        <span className="text-[11px] font-medium text-neutral-500">Ajans Kurucusu</span>
      </div>

      {/* Action Button */}
      <a
        href="#iletisim"
        className="flex items-center gap-1.5 rounded-full bg-[#0A0A0A] px-5 py-2.5 text-xs font-bold uppercase tracking-wider text-white shadow-md transition-colors hover:bg-neutral-800"
      >
        <span>GÖRÜŞME BAŞLAT</span>
      </a>
    </div>
  );
};
