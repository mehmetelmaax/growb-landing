"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Sparkles, ArrowUpRight, ExternalLink, MapPin } from "lucide-react";
import { REAL_CLIENT_REFERENCES, ClientReference } from "@/data/featured-works-data";
import { FeaturedWorkModal } from "./works/featured-work-modal";

export const FeaturedWorks: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientReference | null>(null);

  return (
    <section
      id="projeler"
      className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] py-10 text-cream sm:py-12"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2.5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>GERÇEK MÜŞTERİLERİMİZ // CANLI BÜYÜME REFERANSLARI</span>
            </div>
            <h2 className="font-sans text-2xl font-black tracking-tight text-cream sm:text-4xl lg:text-5xl">
              Yayında Olan Canlı Projelerimiz.
            </h2>
          </div>

          <div className="max-w-sm font-mono text-xs text-neutral-400 md:text-right">
            *Detayları görmek için <strong>İncele</strong> butonuna tıklayabilir, doğrudan canlı
            siteyi ziyaret edebilirsiniz.
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {REAL_CLIENT_REFERENCES.map((client) => {
            return (
              <div
                key={client.id}
                className="group relative flex flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 sm:p-5"
              >
                <div>
                  <div className="mb-3 flex items-center justify-between gap-2">
                    <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-medium text-neutral-300">
                      {client.industryLabel}
                    </span>

                    <span className="max-w-[130px] truncate rounded border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                      {client.badge}
                    </span>
                  </div>

                  <div className="relative mb-3.5 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-inner transition-all duration-300 group-hover:border-[#FFC300]/60 sm:h-28">
                    <Image
                      src={client.logo}
                      alt={client.name}
                      width={180}
                      height={70}
                      className="max-h-full max-w-full object-contain filter transition-all duration-300 group-hover:scale-105"
                    />
                  </div>

                  <div className="mb-3.5">
                    <h3 className="line-clamp-1 text-sm font-bold tracking-tight text-cream transition-colors group-hover:text-accent sm:text-base">
                      {client.name}
                    </h3>
                    <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-400">
                      {client.category}
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{client.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setSelectedClient(client)}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-cream transition-all hover:border-accent hover:bg-accent hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-[#FFC300]"
                    >
                      <span>İncele</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>

                    <a
                      href={client.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[11px] font-bold text-accent transition-colors hover:bg-accent hover:text-[#0A0A0A] focus-visible:ring-2 focus-visible:ring-white"
                      title="Canlı Siteye Git"
                      aria-label={`${client.name} web sitesine git`}
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <p className="font-mono text-[11px] text-neutral-500">
            * Belirtilen çağrı ve performans verileri, portföyümüzdeki işletmelerin önceki web
            altyapıları ile GrowB yayını sonrasındaki ilk 90 günlük ölçüm karşılaştırmalarına
            dayanmaktadır.
          </p>
        </div>
      </div>

      <FeaturedWorkModal client={selectedClient} onClose={() => setSelectedClient(null)} />
    </section>
  );
};
