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
    <div className="w-full select-none overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-5 sm:py-6">
      <div className="mx-auto mb-4 max-w-7xl px-4 text-center">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFC300]">
          TÜRKİYE GENELİNDE SATIŞ SİSTEMİNİ KURDUĞUMUZ CANLI MARKALAR
        </span>
      </div>

      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex shrink-0 items-center gap-6 pr-6 hover:[animation-play-state:paused] sm:gap-8 sm:pr-8">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-2 shadow-sm transition-all hover:border-[#FFC300]/50 hover:bg-white/[0.09]"
            >
              <div className="relative flex h-9 w-28 items-center justify-center rounded-xl bg-white px-2 py-1 shadow-sm sm:h-10 sm:w-32">
                <Image src={client.logo} alt={client.name} fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-xs font-bold text-white">{client.name}</span>
                <span className="font-mono text-[11px] font-medium text-[#FFC300]">
                  • {client.city}
                </span>
              </div>
            </div>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-6 pr-6 hover:[animation-play-state:paused] sm:gap-8 sm:pr-8"
          aria-hidden="true"
        >
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div
              key={idx}
              className="flex shrink-0 items-center gap-3.5 rounded-2xl border border-white/15 bg-white/[0.05] px-4 py-2 shadow-sm transition-all hover:border-[#FFC300]/50 hover:bg-white/[0.09]"
            >
              <div className="relative flex h-9 w-28 items-center justify-center rounded-xl bg-white px-2 py-1 shadow-sm sm:h-10 sm:w-32">
                <Image src={client.logo} alt={client.name} fill className="object-contain p-1" />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-sans text-xs font-bold text-white">{client.name}</span>
                <span className="font-mono text-[11px] font-medium text-[#FFC300]">
                  • {client.city}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
