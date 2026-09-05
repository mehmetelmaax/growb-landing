"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, X, Send, MessageSquare } from "lucide-react";
import { ServiceDetail } from "@/data/services-detail-data";
import { SITE_CONFIG } from "@/data/content";

interface ServiceDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: ServiceDetail;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  isOpen,
  onClose,
  service,
}) => {
  const [detailForm, setDetailForm] = useState({ name: "", phone: "", note: "" });
  const [kvkkConsent, setKvkkConsent] = useState(false);
  const [isDetailSubmitted, setIsDetailSubmitted] = useState(false);
  const [isDetailSubmitting, setIsDetailSubmitting] = useState(false);

  const handleDetailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!detailForm.phone || !kvkkConsent) return;
    setIsDetailSubmitting(true);
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "DETAY_AL",
          name: detailForm.name || "Belirtilmedi",
          phone: detailForm.phone,
          service: service.title,
          notes: detailForm.note || "",
          source: `Hizmetler Bölümü (#${service.num} ${service.title} Detay Al Modalı)`,
          kvkkConsent: true,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsDetailSubmitted(true);
      } else {
        alert(data.error || "Form iletilemedi. Lütfen bilgilerinizi kontrol ediniz.");
      }
    } catch (err) {
      console.error("Detail lead submission error:", err);
      alert("Bağlantı hatası oluştu. Lütfen tekrar deneyiniz.");
    } finally {
      setIsDetailSubmitting(false);
    }
  };

  const getWaServiceUrl = () => {
    const msg = `Merhaba GrowB Dijital, "${service.title}" hizmetiniz hakkında detaylı bilgi ve teklif almak istiyorum.\n\n👤 Yetkili: ${detailForm.name || "Yetkili"}\n📞 Tel: ${detailForm.phone || ""}`;
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
            className="relative w-full max-w-lg bg-[#111111] border border-white/15 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 select-text"
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Kapat"
            >
              <X className="w-4 h-4" />
            </button>

            {!isDetailSubmitted ? (
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-[#FFC300] uppercase mb-2">
                  <Sparkles className="w-4 h-4" />
                  <span>HİZMET DETAYI & TEKLİF FORMU</span>
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  {service.title}
                </h3>
                <p className="text-sm text-neutral-400 mb-6">
                  Bu uzmanlık alanımız hakkında detaylı bilgi, kapsam ve işletmenize özel teklif almak için numaranızı iletin.
                </p>

                <form onSubmit={handleDetailSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Yetkili Adı Soyadı
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız ve Soyadınız"
                      value={detailForm.name}
                      onChange={(e) => setDetailForm({ ...detailForm, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      WhatsApp Telefon Numaranız *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="05XX XXX XX XX"
                      value={detailForm.phone}
                      onChange={(e) => setDetailForm({ ...detailForm, phone: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-300 mb-1">
                      Varsa Özel Notunuz
                    </label>
                    <textarea
                      rows={2}
                      placeholder="İşletmeniz veya beklentiniz hakkında kısa not..."
                      value={detailForm.note}
                      onChange={(e) => setDetailForm({ ...detailForm, note: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-neutral-500 text-sm focus:border-[#FFC300] focus:outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* KVKK Onay Kutusu */}
                  <label className="flex items-start gap-2 text-xs text-neutral-400 cursor-pointer select-none pt-1">
                    <input
                      type="checkbox"
                      required
                      checked={kvkkConsent}
                      onChange={(e) => setKvkkConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded bg-white/5 border border-white/20 text-[#FFC300] focus:ring-[#FFC300] accent-[#FFC300]"
                    />
                    <span>
                      <Link href="/kvkk-aydinlatma-metni" target="_blank" className="text-white underline hover:text-[#FFC300]">
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza veriyorum. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isDetailSubmitting || !kvkkConsent}
                    className="w-full py-3.5 rounded-xl bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-black text-sm tracking-tight transition-all shadow-lg hover:scale-[1.02] active:scale-[0.98] cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isDetailSubmitting ? (
                      <span>İletiliyor...</span>
                    ) : (
                      <>
                        <span>Detay ve Teklif İste</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </form>
              </div>
            ) : (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">Talebiniz Alındı!</h3>
                <p className="text-sm text-neutral-300 mb-6 leading-relaxed">
                  <strong>{service.title}</strong> talebiniz doğrudan yetkili ekibimize iletildi. En kısa sürede WhatsApp veya telefon ile geri dönüş yapılacaktır.
                </p>
                <a
                  href={getWaServiceUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white font-bold text-sm tracking-tight transition-all shadow-lg"
                >
                  <MessageSquare className="w-4 h-4" />
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
