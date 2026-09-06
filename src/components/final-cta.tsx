"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FINAL_CTA_DATA } from "@/data/content";
import { Send, ShieldCheck, Sparkles } from "lucide-react";
import { FinalCtaServiceSelector } from "./final-cta/final-cta-service-selector";
import { FinalCtaSuccessCard } from "./final-cta/final-cta-success-card";
import { FinalCtaInputFields } from "./final-cta/final-cta-input-fields";
import { useFormAbandonment } from "@/hooks/use-form-abandonment";
import { trackLead } from "@/lib/analytics";

export const FinalCta: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "🌐 Satış Odaklı Web Sitesi & Yazılım",
    "🚀 Google & Meta Reklamları + Harita SEO",
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [notes, setNotes] = useState("");
  const [website, setWebsite] = useState("");
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [idempotencyKey] = useState(() =>
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID()
      : `cta_${Date.now()}_${Math.random()}`
  );

  const { onFieldFocus, onFieldBlur, markSubmitted } = useFormAbandonment({
    formId: "final_cta_form",
    isSubmitted: formSubmitted,
  });

  const toggleService = (title: string) => {
    if (selectedServices.includes(title)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter((s) => s !== title));
      }
    } else {
      setSelectedServices([...selectedServices, title]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || !phone || !kvkkConsent) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PROJE_BASLAT",
          name: name || "Belirtilmedi",
          phone,
          sector: sector || "Belirtilmedi",
          service: selectedServices.join(" + "),
          notes: notes || "",
          website,
          source: "Ana Sayfa Proje Başlat (#iletisim)",
          kvkkConsent: true,
          idempotencyKey,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSubmitted(true);
        markSubmitted();
        trackLead({
          formId: "final_cta_form",
          source: "Ana Sayfa Proje Başlat",
          service: selectedServices[0] || "Genel Büyüme",
        });
      } else {
        setErrorMessage(data.error || "Form gönderilemedi. Lütfen bilgilerinizi kontrol ediniz.");
      }
    } catch (err) {
      console.error("Lead submission error:", err);
      setErrorMessage("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="iletisim" className="relative overflow-hidden bg-[#0A0A0A] py-12 sm:py-16">
      <div id="randevu-al" className="pointer-events-none absolute -top-24 left-0" />
      <div id="randevu" className="pointer-events-none absolute -top-24 left-0" />
      <div id="gorusme-planla" className="pointer-events-none absolute -top-24 left-0" />
      <div id="gorusme" className="pointer-events-none absolute -top-24 left-0" />
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute bottom-0 left-1/2 h-[450px] w-[700px] -translate-x-1/2 rounded-full bg-[#FFC300]/[0.06] blur-[160px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 sm:px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[#FFC300]/30 bg-[#121212] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.8)] sm:p-10 md:p-12">
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FFC300]/30 bg-[#FFC300]/15 px-4 py-1.5 font-mono text-xs font-bold tracking-wider text-[#FFC300]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>{FINAL_CTA_DATA.scarcityBadge}</span>
            </div>

            <h2 className="max-w-3xl font-sans text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
              {FINAL_CTA_DATA.title}
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-neutral-300 sm:text-base">
              İhtiyacınız olan alanları seçin, kurucumuzla 15 dakikalık büyüme stratejinizi
              başlatalım.
            </p>

            <div className="mt-8 w-full max-w-2xl sm:mt-10">
              {formSubmitted ? (
                <FinalCtaSuccessCard
                  name={name}
                  sector={sector}
                  selectedServices={selectedServices}
                />
              ) : (
                <form
                  onSubmit={handleSubmit}
                  aria-busy={isSubmitting}
                  className="flex flex-col gap-6 text-left"
                >
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    className="pointer-events-none absolute -z-10 h-0 w-0 overflow-hidden opacity-0"
                  />
                  <FinalCtaServiceSelector
                    selectedServices={selectedServices}
                    onToggleService={toggleService}
                  />

                  {errorMessage && (
                    <div
                      role="alert"
                      className="rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-xs text-red-300"
                    >
                      {errorMessage}
                    </div>
                  )}

                  <FinalCtaInputFields
                    name={name}
                    setName={setName}
                    phone={phone}
                    setPhone={setPhone}
                    sector={sector}
                    setSector={setSector}
                    notes={notes}
                    setNotes={setNotes}
                    onFieldFocus={onFieldFocus}
                    onFieldBlur={onFieldBlur}
                  />

                  <div className="flex select-none items-start gap-2.5 text-xs text-neutral-400">
                    <input
                      id="kvkk-consent-final"
                      type="checkbox"
                      required
                      checked={kvkkConsent}
                      onChange={(e) => setKvkkConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 cursor-pointer rounded border border-white/20 bg-white/5 text-[#FFC300] accent-[#FFC300] focus:ring-[#FFC300]"
                    />
                    <label htmlFor="kvkk-consent-final" className="cursor-pointer">
                      <Link
                        href="/kvkk-aydinlatma-metni"
                        target="_blank"
                        className="text-white underline hover:text-[#FFC300]"
                      >
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza
                      veriyorum. *
                    </label>
                  </div>

                  {phone.trim().length > 3 && !kvkkConsent && (
                    <p className="rounded-xl border border-[#FFC300]/30 bg-[#FFC300]/10 px-4 py-2.5 text-center font-mono text-xs text-[#FFC300]">
                      ⚡ Görüşme planlamak için lütfen yukarıdaki KVKK onay kutusunu işaretleyiniz.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !kvkkConsent}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#FFC300] py-4 text-sm font-extrabold tracking-tight text-[#0A0A0A] shadow-[0_10px_25px_rgba(255,195,0,0.35)] transition-all hover:scale-[1.01] hover:bg-[#FFA000] focus-visible:ring-2 focus-visible:ring-white disabled:opacity-50 sm:text-base"
                  >
                    {isSubmitting ? (
                      <span>Gönderiliyor...</span>
                    ) : (
                      <>
                        <span>{FINAL_CTA_DATA.ctaText}</span>
                        <Send className="h-4 w-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 pt-1 font-mono text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="h-3.5 w-3.5 text-[#FFC300]" />
                      <span>{FINAL_CTA_DATA.guaranteeText}</span>
                    </span>
                    <span>•</span>
                    <span>10 Saniye Bildirim</span>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
