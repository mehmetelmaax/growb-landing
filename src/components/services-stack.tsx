"use client";

import React, { useState } from "react";
import { SERVICES_STACK_DATA } from "@/data/content";
import { TextSwapButton } from "./ui/text-swap-button";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

export const ServicesStack: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("all");

  const filterChips = [
    { id: "all", label: "Tüm Hizmetler" },
    { id: "hizmet-1", label: "Web Satış Siteleri" },
    { id: "hizmet-2", label: "Google Ads Reklam" },
    { id: "hizmet-3", label: "Yerel Harita SEO" },
    { id: "hizmet-4", label: "Lead Otomasyonu" },
  ];

  return (
    <section id="hizmetler" className="py-28 md:py-40 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              ● SÖZLEŞMELİ & GARANTİLİ BÜYÜME SİSTEMLERİ
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-cream tracking-tight">
              Büyüme Odaklı Ajans Hizmetlerimiz.
            </h2>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
            <p className="text-muted text-sm max-w-sm">
              Sadece kod yazmıyoruz; işletmenizi arayan müşterileri doğrudan satışa bağlayan kapalı devre sistemler kuruyoruz.
            </p>
            <TextSwapButton href="#iletisim" variant="outline" icon={<ArrowUpRight className="w-4 h-4" />}>
              Teklif İste
            </TextSwapButton>
          </div>
        </div>

        {/* Horizontal Filter / Anchor Chips */}
        <div className="flex items-center gap-2 overflow-x-auto pb-6 mb-12 no-scrollbar">
          {filterChips.map((chip) => (
            <button
              key={chip.id}
              onClick={() => {
                setActiveTab(chip.id);
                if (chip.id !== "all") {
                  const el = document.getElementById(`card-${chip.id}`);
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className={`px-5 py-2 rounded-full text-xs md:text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                activeTab === chip.id
                  ? "bg-accent text-[#0A0A0A] shadow-[0_0_15px_rgba(255,195,0,0.4)]"
                  : "bg-surface border border-white/10 text-muted hover:text-cream hover:border-accent/40"
              }`}
            >
              {chip.label}
            </button>
          ))}
        </div>

        {/* STICKY STACK CARDS */}
        <div className="relative flex flex-col gap-10 pb-20">
          {SERVICES_STACK_DATA.map((service, index) => {
            return (
              <div
                key={service.id}
                id={`card-${service.id}`}
                style={{ top: `calc(100px + ${index * 24}px)` }}
                className="sticky rounded-3xl bg-surface border border-white/15 p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.9)] overflow-hidden transition-all duration-300"
              >
                {/* Background Subtle Glow */}
                <div className="absolute top-0 right-0 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Mockup Image */}
                  <div className="lg:col-span-6 relative w-full h-[240px] sm:h-[320px] rounded-2xl overflow-hidden border border-white/10">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-[11px] font-mono text-accent font-bold">
                      {service.category}
                    </div>
                  </div>

                  {/* Right Column: Title + Description + Pill Tags */}
                  <div className="lg:col-span-6 flex flex-col justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-accent/50 font-mono mb-2">
                        {service.number}
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-extrabold text-cream tracking-tight mb-4">
                        {service.title}
                      </h3>
                      <p className="text-muted text-sm sm:text-base leading-relaxed mb-6 font-normal">
                        {service.description}
                      </p>

                      {/* Pill Tags */}
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.tags.map((tag, tagIdx) => (
                          <span
                            key={tagIdx}
                            className="px-3 py-1.5 rounded-full bg-surface-dark border border-white/10 text-xs font-medium text-cream/90"
                          >
                            ✓ {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <TextSwapButton
                        href="#iletisim"
                        variant="primary"
                        className="py-3 text-sm"
                        icon={<ArrowUpRight className="w-4 h-4" />}
                      >
                        Bu Hizmet İçin Teklif Al
                      </TextSwapButton>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
