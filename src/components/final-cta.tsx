"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FINAL_CTA_DATA, SITE_CONFIG } from "@/data/content";
import { Send, CheckCircle2, ShieldCheck, Sparkles, PhoneCall } from "lucide-react";
import { FinalCtaServiceSelector } from "./final-cta/final-cta-service-selector";

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
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
    if (!phone || !kvkkConsent) return;
    setIsSubmitting(true);
    setErrorMessage(null);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "PROJE_BASLAT",
          name: name || "Belirtilmedi",
          phone: phone,
          sector: sector || "Belirtilmedi",
          service: selectedServices.join(" + "),
          notes: notes || "",
          source: "Ana Sayfa Proje Başlat (#iletisim)",
          kvkkConsent: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setFormSubmitted(true);
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
                <div
                  role="alert"
                  className="rounded-2xl border border-[#FFC300]/40 bg-[#FFC300]/10 p-8 text-center"
                >
                  <CheckCircle2 className="mx-auto mb-3 h-12 w-12 text-[#FFC300]" />
                  <h3 className="text-xl font-bold text-white">
                    Talebiniz 10 Saniye İçinde Alındı!
                  </h3>
                  <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-neutral-300">
                    Seçtiğiniz alanlar doğrultusunda yetkili ekibimiz numaranızı arayacak veya
                    WhatsApp üzerinden büyüme planınızı iletecektir.
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FFC300] px-7 py-3 text-sm font-bold text-[#0A0A0A] shadow-lg transition-all hover:scale-105 focus-visible:ring-2 focus-visible:ring-white"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Hemen Şimdi Arayın: {SITE_CONFIG.phone}</span>
                  </a>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  aria-busy={isSubmitting}
                  className="flex flex-col gap-6 text-left"
                >
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

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                      <label
                        htmlFor="final-name"
                        className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
                      >
                        Yetkili Adı Soyadı
                      </label>
                      <input
                        id="final-name"
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Mehmet Demir"
                        className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="final-phone"
                        className="mb-1.5 block font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]"
                      >
                        Telefon Numarası *
                      </label>
                      <input
                        id="final-phone"
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0541 484 24 26"
                        className="w-full rounded-xl border border-[#FFC300]/50 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="final-sector"
                      className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
                    >
                      Sektörünüz / İşletmeniz
                    </label>
                    <input
                      id="final-sector"
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="Örn: Evden Eve Nakliyat, Diş Kliniği, Butik Otel..."
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="final-notes"
                      className="mb-1.5 block font-mono text-xs uppercase tracking-wider text-neutral-400"
                    >
                      Eklemek İstediğiniz Not (Opsiyonel)
                    </label>
                    <textarea
                      id="final-notes"
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Örn: Mevcut sitemiz var ancak Google Haritalarda çıkmıyoruz..."
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-neutral-500 transition-colors focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

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
