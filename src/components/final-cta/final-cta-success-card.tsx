"use client";

import React from "react";
import { CheckCircle2, MessageSquare, PhoneCall } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

interface FinalCtaSuccessCardProps {
  name: string;
  sector: string;
  selectedServices: string[];
}

export const FinalCtaSuccessCard: React.FC<FinalCtaSuccessCardProps> = ({
  name,
  sector,
  selectedServices,
}) => {
  const getWaSuccessUrl = () => {
    const msg = `Merhaba GrowB, az önce web sitenizden teklif formu ilettim.\n\n👤 İsim: ${name || "Yetkili"}\n🏢 Sektör: ${sector || "Genel"}\n🎯 Alanlar: ${selectedServices.join(", ")}\n\n15 dakikalık büyüme görüşmesi için hazır mısınız?`;
    return SITE_CONFIG.getWhatsappUrl(msg);
  };

  return (
    <div
      role="alert"
      className="rounded-2xl border border-[#FFC300]/40 bg-[#FFC300]/10 p-8 text-center"
    >
      <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#FFC300]" />
      <h3 className="text-xl font-bold text-white">Talebiniz Alındı!</h3>
      <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-neutral-300">
        Seçtiğiniz uzmanlık alanları inceleniyor. 15 dakika içinde telefon veya WhatsApp üzerinden
        büyüme planınızı paylaşacağız.
      </p>
      <div className="mt-6 flex flex-col items-center justify-center gap-2.5 sm:flex-row sm:flex-wrap">
        <a
          href={getWaSuccessUrl()}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick("final_cta_success", selectedServices[0])}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-black text-black shadow-lg transition-all hover:bg-[#20bd5a] sm:w-auto"
        >
          <MessageSquare className="h-4 w-4" />
          <span>WhatsApp&apos;tan Şimdi Yazın 💬</span>
        </a>
        <a
          href={SITE_CONFIG.getPhoneUrl()}
          onClick={() => trackPhoneClick("final_cta_success_call_mehmet")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/20 sm:w-auto"
        >
          <PhoneCall className="h-3.5 w-3.5 text-[#FFC300]" />
          <span>Mehmet Elma ({SITE_CONFIG.phone})</span>
        </a>
        <a
          href={SITE_CONFIG.getBilgePhoneUrl()}
          onClick={() => trackPhoneClick("final_cta_success_call_bilge")}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-3 text-xs font-bold text-white transition-all hover:bg-white/20 sm:w-auto"
        >
          <PhoneCall className="h-3.5 w-3.5 text-[#FFC300]" />
          <span>Bilge Taşyürek ({SITE_CONFIG.bilgePhone})</span>
        </a>
      </div>
    </div>
  );
};
