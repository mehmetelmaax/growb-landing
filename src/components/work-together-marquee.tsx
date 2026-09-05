import React from "react";
import { ArrowUpRight } from "lucide-react";

export const WorkTogetherMarquee: React.FC = () => {
  return (
    <section className="relative w-full bg-[#0D0D0D] text-white py-5 sm:py-7 overflow-hidden select-none border-y border-white/10">
      {/* Top Header Label */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFC300] animate-ping" />
          <span className="text-xs font-mono font-bold tracking-[0.2em] text-neutral-400 uppercase">
            YENİ PROJELER & SATIŞ ODAKLI BÜYÜME İÇİN MÜSAİT
          </span>
        </div>
        <span className="text-xs font-mono text-neutral-500 hidden md:inline-block font-semibold">
          SADECE AJANS DEĞİL • BÜYÜME ORTAĞINIZ
        </span>
      </div>

      {/* DUAL RUNNING MARQUEE CONTAINER (Never freezes on hover) */}
      <div className="relative flex flex-col gap-3 sm:gap-6">
        
        {/* ROW 1: Slides Leftwards continuously without pausing */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex items-center shrink-0 animate-marquee">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r1-a-${i}`}
                href="#iletisim"
                className="inline-flex items-center text-[15vw] sm:text-[13vw] md:text-[11vw] font-bold tracking-[-0.04em] text-white leading-none hover:text-[#FFC300] transition-colors pr-8 sm:pr-14 font-sans"
              >
                <span>Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">çalışalım.</strong> Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">büyüyelim.</strong></span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#FFC300] mx-6 sm:mx-10 self-center" />
              </a>
            ))}
          </div>
          <div className="flex items-center shrink-0 animate-marquee" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r1-b-${i}`}
                href="#iletisim"
                className="inline-flex items-center text-[15vw] sm:text-[13vw] md:text-[11vw] font-bold tracking-[-0.04em] text-white leading-none hover:text-[#FFC300] transition-colors pr-8 sm:pr-14 font-sans"
              >
                <span>Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">çalışalım.</strong> Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">büyüyelim.</strong></span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#FFC300] mx-6 sm:mx-10 self-center" />
              </a>
            ))}
          </div>
        </div>

        {/* ROW 2: Slides Rightwards continuously without pausing */}
        <div className="flex whitespace-nowrap overflow-hidden">
          <div className="flex items-center shrink-0 animate-marquee-reverse">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r2-a-${i}`}
                href="#iletisim"
                className="inline-flex items-center text-[15vw] sm:text-[13vw] md:text-[11vw] font-bold tracking-[-0.04em] text-neutral-500 hover:text-white transition-colors pr-8 sm:pr-14 font-sans"
              >
                <span>Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">büyüyelim.</strong> Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">kazanalım.</strong></span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#FFC300] mx-6 sm:mx-10 self-center" />
              </a>
            ))}
          </div>
          <div className="flex items-center shrink-0 animate-marquee-reverse" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r2-b-${i}`}
                href="#iletisim"
                className="inline-flex items-center text-[15vw] sm:text-[13vw] md:text-[11vw] font-bold tracking-[-0.04em] text-neutral-500 hover:text-white transition-colors pr-8 sm:pr-14 font-sans"
              >
                <span>Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">büyüyelim.</strong> Birlikte <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">kazanalım.</strong></span>
                <span className="inline-block w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-[#FFC300] mx-6 sm:mx-10 self-center" />
              </a>
            ))}
          </div>
        </div>

        {/* Center Floating Round Badge - Continuously Rotating, No 'BAŞLA' text, Goes to #randevu-al */}
        <a
          href="#randevu-al"
          aria-label="Randevu Al & Görüşme Planla"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] flex items-center justify-center shadow-[0_20px_60px_rgba(255,195,0,0.5)] hover:scale-110 active:scale-95 transition-all duration-300 z-30 cursor-pointer border-2 border-black/15 group"
        >
          {/* Sürekli Dönen Dairesel Metin (Hover'da bile kilitlenmez, kesintisiz 360 derece döner) */}
          <svg
            className="absolute inset-0 w-full h-full animate-[spin_10s_linear_infinite] pointer-events-none"
            viewBox="0 0 100 100"
          >
            <path
              id="marqueeCirclePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="text-[9px] font-mono font-black uppercase tracking-[0.22em] fill-[#0A0A0A]">
              <textPath href="#marqueeCirclePath" startOffset="0%">
                • RANDEVU AL • BİRLİKTE BÜYÜYELİM • GROWB 
              </textPath>
            </text>
          </svg>

          {/* Merkezde Sadece Ok Simgesi (BAŞLA yazısı tamamen kaldırıldı) */}
          <div className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-[#0A0A0A] text-[#FFC300] flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
            <ArrowUpRight className="w-5 h-5 sm:w-7 sm:h-7 md:w-8 md:h-8 stroke-[2.5]" />
          </div>
        </a>
      </div>
    </section>
  );
};
