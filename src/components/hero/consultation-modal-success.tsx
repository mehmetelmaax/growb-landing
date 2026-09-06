"use client";

import React from "react";
import { CheckCircle2, MessageSquare, Phone, CalendarCheck } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";
import { trackWhatsAppClick, trackPhoneClick } from "@/lib/analytics";
import type { ConsultationFormData } from "./consultation-modal-fields";

interface ConsultationModalSuccessProps {
  formData: ConsultationFormData;
}

export const ConsultationModalSuccess: React.FC<ConsultationModalSuccessProps> = ({ formData }) => {
  const waUrl = SITE_CONFIG.getWhatsappUrl(
    `Merhaba GrowB Dijital, ${formData.appointmentDate || "yakın bir gün"} (${formData.appointmentTime || "uygun saat"}) için 15 dakikalık büyüme görüşmesi randevusu oluşturdum.\n\n👤 Yetkili: ${formData.contactName || "Yetkili"}\n📱 Tel: ${formData.phone}\n🌐 İşletme/Web: ${formData.siteUrl || "Belirtilmedi"}\n📞 Kanal: ${formData.meetingType || "Telefon"}`
  );

  return (
    <div role="alert" className="select-none py-4 text-center sm:py-6">
      <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
        <CheckCircle2 className="h-7 w-7" />
      </div>
      <h3 className="mb-1 text-2xl font-black text-white">Randevunuz Alındı!</h3>
      <p className="mb-4 text-sm leading-relaxed text-neutral-300">
        Görüşme talebiniz Telegram üzerinden kurucularımıza iletildi.
      </p>

      {/* Randevu Bilgi Kartı */}
      <div className="mb-5 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-left font-mono text-xs text-neutral-300">
        <div className="mb-2 flex items-center gap-2 font-bold text-[#FFC300]">
          <CalendarCheck className="h-4 w-4" />
          <span>Planlanan Görüşme Detayı</span>
        </div>
        <div className="space-y-1">
          <p>
            🗓️ <strong>Tarih & Saat:</strong> {formData.appointmentDate} •{" "}
            {formData.appointmentTime}
          </p>
          <p>
            📞 <strong>Kanal:</strong> {formData.meetingType}
          </p>
          <p>
            👤 <strong>Yetkili:</strong> {formData.contactName || "Belirtilmedi"} ({formData.phone})
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <a
          href={waUrl}
          target="_blank"
          rel="noreferrer"
          onClick={() => trackWhatsAppClick("hero_modal_success", formData.sector)}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] py-3.5 text-sm font-black tracking-wide text-black shadow-lg transition-all hover:scale-[1.02] hover:bg-[#20bd5a]"
        >
          <MessageSquare className="h-4 w-4" />
          <span>WhatsApp ile Randevuyu Teyit Et 💬</span>
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
