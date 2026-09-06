"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Sparkles, X, Send } from "lucide-react";
import { useFocusTrap } from "@/hooks/use-focus-trap";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { trackLead } from "@/lib/analytics";
import { ConsultationModalSuccess } from "./consultation-modal-success";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    siteUrl: "",
    sector: "",
    phone: "",
    contactName: "",
    website: "",
  });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `hero_${Date.now()}_${Math.random()}`
  );

  const modalRef = useFocusTrap(isOpen, onClose);
  const { onFieldFocus, onFieldBlur, markSubmitted } = useFormAbandonment({
    formId: "hero_consultation_modal",
    isSubmitted,
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingLead || !formData.siteUrl || !formData.phone || !kvkkConsent) return;
    setIsSubmittingLead(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DETAY_AL",
          name: formData.contactName || "Yetkili",
          phone: formData.phone,
          siteUrl: formData.siteUrl,
          sector: formData.sector || "Belirtilmedi",
          source: "Hero Ekranı",
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
          source: "Hero Ekranı",
          service: formData.sector || "Dijital Analiz",
        });
      } else {
        setErrorMessage(data.error || "Form iletilemedi. Lütfen bilgilerinizi kontrol ediniz.");
      }
    } catch (err) {
      console.error("Hero lead error:", err);
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center p-4 duration-200">
      <div
        onClick={onClose}
        aria-hidden="true"
        className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="consultation-modal-title"
        className="animate-in zoom-in-95 slide-in-from-bottom-5 relative z-10 w-full max-w-lg select-text rounded-3xl border border-white/15 bg-[#111111] p-6 shadow-2xl duration-200 sm:p-8"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white focus-visible:ring-2 focus-visible:ring-[#FFC300]"
          aria-label="Kapat"
        >
          <X className="h-4 w-4" />
        </button>

        {!isSubmitted ? (
          <div>
            <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase text-[#FFC300]">
              <Sparkles className="h-4 w-4" />
              <span>ÜCRETSİZ DİJİTAL ANALİZ RAPORU</span>
            </div>
            <h3 id="consultation-modal-title" className="mb-2 text-2xl font-black text-white">
              Sitenizi & Rakiplerinizi İnceleyelim
            </h3>
            <p className="mb-6 text-sm text-neutral-400">
              Web sitenizin hız, Google Harita SEO ve reklam açıklarını 15 dakikada tespit edip
              WhatsApp üzerinden ücretsiz raporlayalım.
            </p>

            {errorMessage && (
              <div
                role="alert"
                className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300"
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleFormSubmit} aria-busy={isSubmittingLead} className="space-y-4">
              <input
                type="text"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
              />
              <div>
                <label
                  htmlFor="hero-site-url"
                  className="mb-1 block font-mono text-xs text-neutral-300"
                >
                  Web Siteniz veya İşletme Adınız *
                </label>
                <input
                  id="hero-site-url"
                  type="text"
                  required
                  placeholder="örn: www.ornekisletme.com veya Güven Nakliyat"
                  value={formData.siteUrl}
                  onFocus={() => onFieldFocus("siteUrl")}
                  onBlur={() => onFieldBlur("siteUrl")}
                  onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="hero-sector"
                    className="mb-1 block font-mono text-xs text-neutral-300"
                  >
                    Sektörünüz
                  </label>
                  <input
                    id="hero-sector"
                    type="text"
                    placeholder="örn: Klinik, Nakliyat"
                    value={formData.sector}
                    onFocus={() => onFieldFocus("sector")}
                    onBlur={() => onFieldBlur("sector")}
                    onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="hero-name"
                    className="mb-1 block font-mono text-xs text-neutral-300"
                  >
                    Yetkili Adı
                  </label>
                  <input
                    id="hero-name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    value={formData.contactName}
                    onFocus={() => onFieldFocus("contactName")}
                    onBlur={() => onFieldBlur("contactName")}
                    onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="hero-phone"
                  className="mb-1 block font-mono text-xs text-neutral-300"
                >
                  WhatsApp Telefon Numaranız *
                </label>
                <input
                  id="hero-phone"
                  type="tel"
                  required
                  placeholder="05XX XXX XX XX"
                  value={formData.phone}
                  onFocus={() => onFieldFocus("phone")}
                  onBlur={() => onFieldBlur("phone")}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                />
              </div>

              <div className="flex select-none items-start gap-2 pt-1 text-xs text-neutral-400">
                <input
                  id="kvkk-consent-modal"
                  type="checkbox"
                  required
                  checked={kvkkConsent}
                  onChange={(e) => setKvkkConsent(e.target.checked)}
                  className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-white/20 bg-white/5 text-[#FFC300] accent-[#FFC300] focus:ring-[#FFC300]"
                />
                <label htmlFor="kvkk-consent-modal" className="cursor-pointer">
                  <Link
                    href="/kvkk-aydinlatma-metni"
                    target="_blank"
                    className="text-white underline hover:text-[#FFC300]"
                  >
                    KVKK Aydınlatma Metni
                  </Link>
                  &apos;ni okudum, iletişim kurulmasına rıza veriyorum. *
                </label>
              </div>

              {formData.phone.trim().length > 3 && !kvkkConsent && (
                <p className="rounded-lg border border-[#FFC300]/20 bg-[#FFC300]/5 px-3 py-2 text-center font-mono text-xs text-[#FFC300]">
                  ⚡ Lütfen yukarıdaki KVKK onay kutusunu işaretleyiniz.
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmittingLead || !kvkkConsent}
                className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FFC300] py-3.5 text-sm font-black tracking-tight text-[#0A0A0A] shadow-lg transition-all hover:bg-[#FFA000] active:scale-[0.98] disabled:opacity-50"
              >
                {isSubmittingLead ? (
                  <span>Rapor Talebi Alınıyor...</span>
                ) : (
                  <>
                    <span>Ücretsiz Analiz Raporunu İlet</span>
                    <Send className="h-4 w-4" />
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
