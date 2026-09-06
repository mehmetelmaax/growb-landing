"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, X, Send, MessageSquare } from "lucide-react";
import { SITE_CONFIG } from "@/data/content";

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ siteUrl: "", sector: "", phone: "", contactName: "" });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmittingLead, setIsSubmittingLead] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.siteUrl || !formData.phone || !kvkkConsent) return;
    setIsSubmittingLead(true);
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
          source: "Hero Ekranı (Ücretsiz Analiz & Detay Al Modalı)",
          kvkkConsent: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
      } else {
        alert(data.error || "Form iletilemedi. Lütfen bilgilerinizi kontrol ediniz.");
      }
    } catch (err) {
      console.error("Hero lead submission error:", err);
      alert("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsSubmittingLead(false);
    }
  };

  const getWaReportUrl = () => {
    const msg = `Merhaba GrowB Dijital, sitem ve sektörüm için Ücretsiz Analiz Raporu talep ediyorum.\n\n🌐 Web Sitesi / İşletme: ${formData.siteUrl}\n🏢 Sektör: ${formData.sector || "Belirtilmedi"}\n📞 Telefon: ${formData.phone}\n👤 Yetkili: ${formData.contactName || "Yetkili"}`;
    return SITE_CONFIG.getWhatsappUrl(msg);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/85 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative z-10 w-full max-w-lg select-text rounded-3xl border border-white/15 bg-[#111111] p-6 shadow-2xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white"
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
                <h3 className="mb-2 text-2xl font-black text-white">
                  Sitenizi & Rakiplerinizi İnceleyelim
                </h3>
                <p className="mb-6 text-sm text-neutral-400">
                  Web sitenizin hız, Google Harita SEO ve reklam açıklarını 15 dakikada tespit edip
                  WhatsApp üzerinden ücretsiz raporlayalım.
                </p>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      Web Siteniz veya İşletme Adınız *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="örn: www.ornekisletme.com veya Güven Nakliyat"
                      value={formData.siteUrl}
                      onChange={(e) => setFormData({ ...formData, siteUrl: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      Sektörünüz
                    </label>
                    <input
                      type="text"
                      placeholder="örn: Nakliyat, Klinik, Avukat, E-Ticaret"
                      value={formData.sector}
                      onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      Yetkili Adı Soyadı
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız ve Soyadınız"
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      WhatsApp Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  {/* KVKK Onay Kutusu */}
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
                      &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza
                      veriyorum. *
                    </label>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmittingLead || !kvkkConsent}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FFC300] py-3.5 text-sm font-black tracking-tight text-[#0A0A0A] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#FFA000] active:scale-[0.98] disabled:opacity-50"
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
              <div className="py-6 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/20 text-emerald-400">
                  <CheckCircle2 className="h-7 w-7" />
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">Talebiniz Alındı!</h3>
                <p className="mb-6 text-sm leading-relaxed text-neutral-300">
                  İşletmenizin web ve dijital varlığı analiz sırasına alındı. Beklemek
                  istemiyorsanız doğrudan kurucumuzla WhatsApp üzerinden görüşebilirsiniz.
                </p>
                <a
                  href={getWaReportUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold tracking-tight text-white shadow-lg transition-all hover:bg-emerald-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp ile Hızlı Bağlan</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
