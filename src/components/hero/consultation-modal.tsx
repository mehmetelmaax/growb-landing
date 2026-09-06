"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, X, Calendar, MessageSquare } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { trackLead } from "@/lib/analytics";
import { ConsultationModalFields, type ConsultationFormData } from "./consultation-modal-fields";
import { ConsultationModalSuccess } from "./consultation-modal-success";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen: propsIsOpen,
  onClose: propsOnClose,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = propsIsOpen || internalOpen;

  const handleClose = () => {
    setInternalOpen(false);
    propsOnClose();
  };

  useEffect(() => {
    const handleOpenEvent = () => setInternalOpen(true);
    window.addEventListener("open-appointment-modal", handleOpenEvent);
    return () => window.removeEventListener("open-appointment-modal", handleOpenEvent);
  }, []);

  const [formData, setFormData] = useState<ConsultationFormData>({
    siteUrl: "",
    sector: "",
    phone: "",
    contactName: "",
    website: "",
    appointmentDate: "Yarın",
    appointmentTime: "14:00 - 15:00",
    meetingType: "Telefon Görüşmesi",
  });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [errorWhatsappUrl, setErrorWhatsappUrl] = useState<string | null>(null);
  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `hero_${Date.now()}_${Math.random()}`
  );

  const modalRef = useFocusTrap(isOpen, handleClose);
  const { onFieldFocus, onFieldBlur, markSubmitted } = useFormAbandonment({
    formId: "hero_consultation_modal",
    isSubmitted,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingLead || !formData.phone || !kvkkConsent) return;
    setIsSubmittingLead(true);
    setErrorMessage(null);
    setErrorWhatsappUrl(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "RANDEVU",
          name: formData.contactName || "Yetkili",
          phone: formData.phone,
          siteUrl: formData.siteUrl || "Belirtilmedi",
          sector: formData.sector || "Belirtilmedi",
          source: "15 Dk Büyüme & Randevu Modalı",
          appointmentDate: formData.appointmentDate,
          appointmentTime: formData.appointmentTime,
          meetingType: formData.meetingType,
          kvkkConsent: true,
          idempotencyKey,
          website: formData.website,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        markSubmitted();
        trackLead({
          formId: "hero_consultation_modal",
          source: "Hero Randevu Modalı",
          service: formData.sector || "Strateji Randevusu",
        });
      } else {
        setErrorMessage(data.error || "Randevu iletilemedi. Lütfen bilgilerinizi kontrol ediniz.");
        if (data.whatsappUrl) {
          setErrorWhatsappUrl(data.whatsappUrl);
        }
      }
    } catch (err) {
      console.error("Hero lead error:", err);
      setErrorMessage("Bağlantı hatası oluştu. Lütfen doğrudan WhatsApp üzerinden ulaşınız.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center p-4 duration-200">
      <div
        onClick={handleClose}
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        className="animate-in zoom-in-95 slide-in-from-bottom-5 relative z-10 max-h-[92vh] w-full max-w-lg select-text overflow-y-auto rounded-3xl border border-white/15 bg-[#111111] p-5 shadow-2xl duration-200 sm:p-7"
      >
        <button
          type="button"
          onClick={handleClose}
          className="absolute right-4 top-4 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase text-[#FFC300]">
              <Sparkles className="h-4 w-4" />
              <span>15 DAKİKALIK BÜYÜME STRATEJİSİ // ÜCRETSİZ RANDEVU</span>
            </div>
            <h3 id="consultation-modal-title" className="mb-1 text-2xl font-black text-white">
              Büyüme Görüşmenizi Planlayın
            </h3>
            <p className="mb-4 text-xs text-neutral-400 sm:text-sm">
              İşletmenizin ciro artışını, Google Harita dominasyonunu ve reklam açıklarını
              kurucularımızla canlı değerlendirin.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300"
              >
                <p>{errorMessage}</p>
                {errorWhatsappUrl && (
                  <a
                    href={errorWhatsappUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-2 inline-flex items-center gap-1.5 rounded-lg bg-[#25D366] px-3 py-1.5 font-bold text-black hover:bg-[#20bd5a]"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>WhatsApp ile Randevuyu Hemen Gönder</span>
                  </a>
                )}
              </div>
            )}

            <form onSubmit={handleFormSubmit} aria-busy={isSubmittingLead} className="space-y-3.5">
              <ConsultationModalFields
                formData={formData}
                setFormData={setFormData}
                kvkkConsent={kvkkConsent}
                setKvkkConsent={setKvkkConsent}
                onFieldFocus={onFieldFocus}
                onFieldBlur={onFieldBlur}
              />

              <button
                type="submit"
                disabled={isSubmittingLead || !kvkkConsent}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FFC300] py-3.5 text-sm font-black tracking-tight text-[#0A0A0A] shadow-lg transition-all hover:bg-[#FFA000] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmittingLead ? (
                  <span>Randevu Talebi Telegram&apos;a İletiliyor...</span>
                ) : (
                  <>
                    <Calendar className="h-4 w-4" />
                    <span>Randevu Talebini Gönder (Telegram&apos;a Düşer)</span>
                  </>
                )}
              </button>
            </form>
          </div>
        ) : (
          <ConsultationModalSuccess formData={formData} />
        )}
      </div>
    </div>
  );
};
