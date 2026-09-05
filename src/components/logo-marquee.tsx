"use client";

import React from "react";
import Image from "next/image";

const MARQUEE_CLIENTS = [
  { name: "Öz Aksaray Express", city: "Aksaray", logo: "/clients/oz-aksaray.png" },
  { name: "Kırşehir Aybar Nakliyat", city: "Kırşehir", logo: "/clients/kirsehir-aybar.webp" },
  { name: "Konya Lider Nakliyat", city: "Konya", logo: "/clients/konya-lider.png" },
  { name: "Esen 26 Nakliyat", city: "Eskişehir", logo: "/clients/esen-26.png" },
  { name: "Esenler Eşya Depolama", city: "Adana", logo: "/clients/adana-depolama.png" },
  { name: "Esenler Asansörlü Nakliyat", city: "Adana", logo: "/clients/adana-asansorlu.png" },
  { name: "Uzman Eller Nakliyat", city: "Mersin", logo: "/clients/mersin-uzman-eller.png" },
];

export const LogoMarquee: React.FC = () => {
  return (
    <div className="w-full py-4 sm:py-5 bg-[#0D0D0D] border-y border-white/10 overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 mb-2 text-center">
        <span className="text-[11px] font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
          TÜRKİYE GENELİNDE SATIŞ SİSTEMİNİ KURDUĞUMUZ CANLI MARKALAR
        </span>
      </div>

      <div className="flex whitespace-nowrap overflow-hidden">
        <div className="flex items-center shrink-0 animate-marquee hover:[animation-play-state:paused] gap-12 sm:gap-16 pr-12">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <div className="relative w-28 h-10 grayscale hover:grayscale-0 transition-all">
                <Image src={client.logo} alt={client.name} fill className="object-contain" />
              </div>
              <span className="text-xs font-mono text-neutral-400">• {client.city}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center shrink-0 animate-marquee hover:[animation-play-state:paused] gap-12 sm:gap-16 pr-12" aria-hidden="true">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div key={idx} className="flex items-center gap-3 shrink-0 opacity-60 hover:opacity-100 transition-opacity">
              <div className="relative w-28 h-10 grayscale hover:grayscale-0 transition-all">
                <Image src={client.logo} alt={client.name} fill className="object-contain" />
              </div>
              <span className="text-xs font-mono text-neutral-400">• {client.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
