"use client";

import React from "react";
import { Flame } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { CampaignCardStarter } from "./pricing/campaign-card-starter";
import { CampaignCardHero } from "./pricing/campaign-card-hero";
import { CampaignCardGrowth } from "./pricing/campaign-card-growth";

export const CampaignPricing: React.FC = () => {
  const getWaLink = (campaignName: string, price: string) => {
    const msg = `Merhaba GrowB Dijital, "${campaignName}" kampanyanız (${price}) için başvurmak ve yerimi ayırtmak istiyorum.`;
    return SITE_CONFIG.getWhatsappUrl(msg);
  };

  return (
    <section id="kampanyalar" className="relative w-full py-4 sm:py-6">
      <div className="mx-auto mb-8 max-w-3xl text-center">
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/10 px-3.5 py-1.5 font-mono text-xs font-bold uppercase text-[#FFC300] shadow-sm">
          <Flame className="h-3.5 w-3.5 animate-pulse text-[#FFC300]" />
          <span>SINIRLI KONTENJAN // DÖNEMSEL TANIŞMA KAMPANYALARI</span>
        </div>
        <h2 className="mb-4 font-sans text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
          Büyümeye Hazır Markalar İçin{" "}
          <span className="text-[#FFC300] underline decoration-[#FFC300]/40 decoration-4">
            3 Özel Kampanya.
          </span>
        </h2>
        <p className="text-sm font-medium leading-relaxed text-neutral-300 sm:text-base">
          İlk peteğinizi riske girmeden örmeniz için maliyetleri düşürdük, hediye hizmetlerle
          değerini ikiye katladık.
        </p>
      </div>

      <div className="mx-auto mb-6 grid max-w-7xl grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
        <CampaignCardStarter getWaLink={getWaLink} />
        <CampaignCardHero getWaLink={getWaLink} />
        <CampaignCardGrowth getWaLink={getWaLink} />
      </div>
    </section>
  );
};
