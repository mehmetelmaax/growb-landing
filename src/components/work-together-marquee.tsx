"use client";

import React from "react";
import { ArrowUpRight } from "lucide-react";

export const WorkTogetherMarquee: React.FC = () => {
  return (
    <section className="relative w-full select-none overflow-hidden border-y border-white/10 bg-[#0D0D0D] py-5 text-white sm:py-7">
      {/* Top Header Label */}
      <div className="mx-auto mb-3 flex max-w-7xl items-center justify-between px-6 sm:px-12">
        <div className="flex items-center gap-3">
          <span className="h-2.5 w-2.5 animate-ping rounded-full bg-[#FFC300]" />
          <span className="font-mono text-xs font-bold uppercase tracking-[0.2em] text-neutral-400">
            YENİ PROJELER & SATIŞ ODAKLI BÜYÜME İÇİN MÜSAİT
          </span>
        </div>
        <span className="hidden font-mono text-xs font-semibold text-neutral-400 md:inline-block">
          SADECE AJANS DEĞİL • BÜYÜME ORTAĞINIZ
        </span>
      </div>

      {/* DUAL RUNNING MARQUEE CONTAINER (Never freezes on hover) */}
      <div className="relative flex flex-col gap-3 sm:gap-6">
        {/* ROW 1: Slides Leftwards continuously without pausing */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee flex shrink-0 items-center">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r1-a-${i}`}
                href="#iletisim"
                className="inline-flex items-center pr-8 font-sans text-[15vw] font-bold leading-none tracking-[-0.04em] text-white transition-colors hover:text-[#FFC300] sm:pr-14 sm:text-[13vw] md:text-[11vw]"
              >
                <span>
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    çalışalım.
                  </strong>{" "}
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    büyüyelim.
                  </strong>
                </span>
                <span className="mx-6 inline-block h-4 w-4 self-center rounded-full bg-[#FFC300] sm:mx-10 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
          <div className="animate-marquee flex shrink-0 items-center" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r1-b-${i}`}
                href="#iletisim"
                tabIndex={-1}
                className="inline-flex items-center pr-8 font-sans text-[15vw] font-bold leading-none tracking-[-0.04em] text-white transition-colors hover:text-[#FFC300] sm:pr-14 sm:text-[13vw] md:text-[11vw]"
              >
                <span>
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    çalışalım.
                  </strong>{" "}
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    büyüyelim.
                  </strong>
                </span>
                <span className="mx-6 inline-block h-4 w-4 self-center rounded-full bg-[#FFC300] sm:mx-10 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* ROW 2: Slides Rightwards continuously without pausing */}
        <div className="flex overflow-hidden whitespace-nowrap">
          <div className="animate-marquee-reverse flex shrink-0 items-center">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r2-a-${i}`}
                href="#iletisim"
                className="inline-flex items-center pr-8 font-sans text-[15vw] font-bold tracking-[-0.04em] text-neutral-400 transition-colors hover:text-white sm:pr-14 sm:text-[13vw] md:text-[11vw]"
              >
                <span>
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    büyüyelim.
                  </strong>{" "}
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    kazanalım.
                  </strong>
                </span>
                <span className="mx-6 inline-block h-4 w-4 self-center rounded-full bg-[#FFC300] sm:mx-10 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
          <div className="animate-marquee-reverse flex shrink-0 items-center" aria-hidden="true">
            {[1, 2, 3, 4].map((i) => (
              <a
                key={`r2-b-${i}`}
                href="#iletisim"
                tabIndex={-1}
                className="inline-flex items-center pr-8 font-sans text-[15vw] font-bold tracking-[-0.04em] text-neutral-400 transition-colors hover:text-white sm:pr-14 sm:text-[13vw] md:text-[11vw]"
              >
                <span>
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    büyüyelim.
                  </strong>{" "}
                  Birlikte{" "}
                  <strong className="text-[#FFC300] underline decoration-[#FFC300]/40">
                    kazanalım.
                  </strong>
                </span>
                <span className="mx-6 inline-block h-4 w-4 self-center rounded-full bg-[#FFC300] sm:mx-10 sm:h-6 sm:w-6" />
              </a>
            ))}
          </div>
        </div>

        {/* Center Floating Round Badge - Continuously Rotating, No 'BAŞLA' text, Goes to #randevu-al */}
        <a
          href="#randevu-al"
          onClick={(e) => {
            if (typeof window !== "undefined") {
              e.preventDefault();
              window.dispatchEvent(new CustomEvent("open-appointment-modal"));
            }
          }}
          aria-label="Randevu Al & Görüşme Planla"
          className="group absolute left-1/2 top-1/2 z-30 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border-2 border-black/15 bg-[#FFC300] text-[#0A0A0A] shadow-[0_20px_60px_rgba(255,195,0,0.5)] transition-all duration-300 hover:scale-110 hover:bg-[#FFA000] active:scale-95 sm:h-32 sm:w-32 md:h-40 md:w-40"
        >
          {/* Sürekli Dönen Dairesel Metin (Hover'da bile kilitlenmez, kesintisiz 360 derece döner) */}
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full animate-[spin_10s_linear_infinite]"
            viewBox="0 0 100 100"
          >
            <path
              id="marqueeCirclePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="fill-[#0A0A0A] font-mono text-[9px] font-black uppercase tracking-[0.22em]">
              <textPath href="#marqueeCirclePath" startOffset="0%">
                • RANDEVU AL • BİRLİKTE BÜYÜYELİM • GROWB
              </textPath>
            </text>
          </svg>

          {/* Merkezde Sadece Ok Simgesi (BAŞLA yazısı tamamen kaldırıldı) */}
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0A0A0A] text-[#FFC300] shadow-md transition-transform group-hover:scale-110 sm:h-14 sm:w-14 md:h-16 md:w-16">
            <ArrowUpRight className="h-5 w-5 stroke-[2.5] sm:h-7 sm:w-7 md:h-8 md:w-8" />
          </div>
        </a>
      </div>
    </section>
  );
};
