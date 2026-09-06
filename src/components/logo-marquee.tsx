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
    <div className="pointer-events-none w-full select-none overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-4 sm:py-5">
      <div className="mx-auto mb-2 max-w-7xl px-4 text-center">
        <span className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-neutral-400">
          TÜRKİYE GENELİNDE SATIŞ SİSTEMİNİ KURDUĞUMUZ CANLI MARKALAR
        </span>
      </div>

      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex shrink-0 items-center gap-12 pr-12 hover:[animation-play-state:paused] sm:gap-16">
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-3 transition-opacity">
              <div className="relative h-10 w-28 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image src={client.logo} alt={client.name} fill className="object-contain" />
              </div>
              <span className="font-mono text-xs text-neutral-300">• {client.city}</span>
            </div>
          ))}
        </div>
        <div
          className="animate-marquee flex shrink-0 items-center gap-12 pr-12 hover:[animation-play-state:paused] sm:gap-16"
          aria-hidden="true"
        >
          {MARQUEE_CLIENTS.map((client, idx) => (
            <div key={idx} className="flex shrink-0 items-center gap-3 transition-opacity">
              <div className="relative h-10 w-28 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
                <Image src={client.logo} alt={client.name} fill className="object-contain" />
              </div>
              <span className="font-mono text-xs text-neutral-300">• {client.city}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
