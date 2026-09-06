import React from "react";
import { CheckCircle2, MessageSquare, Phone } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";

interface ConsultationModalSuccessProps {
  formData: {
    siteUrl: string;
    sector: string;
    phone: string;
    contactName: string;
  };
}

export const ConsultationModalSuccess: React.FC<ConsultationModalSuccessProps> = ({ formData }) => {
  const waUrl = SITE_CONFIG.getWhatsappUrl(
    `Merhaba GrowB Dijital, sitem ve sektörüm için Ücretsiz Analiz Raporu talep ediyorum.\n\n🌐 Web: ${formData.siteUrl}\n🏢 Sektör: ${formData.sector || "Genel"}\n📞 Tel: ${formData.phone}\n👤 İsim: ${formData.contactName || "Yetkili"}`
  );

  return (
    <div role="alert" className="py-6 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="mb-2 text-2xl font-black text-white">Talebiniz Alındı!</h3>
      <p className="mb-6 text-sm leading-relaxed text-neutral-300">
        Web siteniz ve pazar analiziniz sıraya alındı. Büyüme danışmanımız en geç 15 dakika içinde
        analizinizi hazırlayacaktır.
      </p>
      <div className="space-y-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick("hero_modal_success", formData.sector)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black tracking-wide text-black shadow-lg transition-all hover:scale-[1.02] hover:bg-[#20bd5a]"
        >
          <MessageSquare className="h-4 w-4" />
          <span>WhatsApp ile Hızlı Bağlan 💬</span>
        </a>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          <a
            href={SITE_CONFIG.getPhoneUrl()}
            onClick={() => trackPhoneClick("hero_modal_success_call_mehmet")}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/15"
          >
            <Phone className="h-3.5 w-3.5 text-[#FFC300]" />
            <span>Mehmet Elma ({SITE_CONFIG.phone})</span>
          </a>
          <a
            href={SITE_CONFIG.getBilgePhoneUrl()}
            onClick={() => trackPhoneClick("hero_modal_success_call_bilge")}
            className="inline-flex w-full items-center justify-center gap-1.5 rounded-xl border border-white/10 bg-white/10 py-2.5 text-xs font-bold text-white transition-all hover:bg-white/15"
          >
            <Phone className="h-3.5 w-3.5 text-[#FFC300]" />
            <span>Bilge Taşyürek ({SITE_CONFIG.bilgePhone})</span>
          </a>
        </div>
      </div>
    </div>
  );
};
