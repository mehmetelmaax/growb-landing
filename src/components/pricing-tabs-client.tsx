"use client";

import React, { useState } from "react";
import { TabEstablishment } from "./pricing/tab-establishment";
import { TabMonthly } from "./pricing/tab-monthly";
import { TabStandalone } from "./pricing/tab-standalone";
import { TabCommercialTerms } from "./pricing/tab-commercial-terms";

type PricingTabKey = "kurulus" | "aylik" | "tekil" | "kosullar";

const TABS: { id: PricingTabKey; label: string }[] = [
  { id: "kurulus", label: "🐝 Kuruluş Paketleri (3 Kovan)" },
  { id: "aylik", label: "🚀 Aylık Büyüme Paketleri" },
  { id: "tekil", label: "📋 12 Uzmanlık Tekil Tarifesi" },
  { id: "kosullar", label: "⚖️ Ticari Koşullar" },
];

export const PricingTabsClient: React.FC = () => {
  const [activeTab, setActiveTab] = useState<PricingTabKey>("kurulus");

  return (
    <>
      <div
        role="tablist"
        aria-label="Fiyat ve Paket Seçenekleri"
        className="mx-auto mb-12 flex max-w-4xl flex-wrap items-center justify-center gap-2.5 rounded-2xl border border-white/10 bg-white/5 p-2 sm:gap-4 sm:rounded-full"
      >
        {TABS.map((tab) => {
          const isSelected = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 rounded-xl px-5 py-3 font-mono text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-[#FFC300] sm:rounded-full sm:text-sm ${
                isSelected
                  ? "scale-105 bg-[#FFC300] text-[#0A0A0A] shadow-[0_0_25px_rgba(255,195,0,0.4)]"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab === "kurulus" && <TabEstablishment />}
      {activeTab === "aylik" && <TabMonthly />}
      {activeTab === "tekil" && <TabStandalone />}
      {activeTab === "kosullar" && <TabCommercialTerms />}
    </>
  );
};
