"use client";

import React, { useState } from "react";
import Link from "next/link";
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
    <>
      {isOpen && (
        <div className="animate-in fade-in fixed inset-0 z-[99999] flex items-center justify-center p-4 duration-200">
          <div
            onClick={onClose}
            className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
          />

          <div className="animate-in zoom-in-95 slide-in-from-bottom-5 relative z-10 w-full max-w-lg select-text rounded-3xl border border-white/15 bg-[#111111] p-6 shadow-2xl duration-200 sm:p-8">
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-white/10 text-neutral-300 transition-colors hover:bg-white/20 hover:text-white"
              aria-label="Kapat"
            >
              <X className="h-4 w-4" />
            </button>

            {!isDetailSubmitted ? (
              <div>
                <div className="mb-2 flex items-center gap-2 font-mono text-xs uppercase text-[#FFC300]">
                  <Sparkles className="h-4 w-4" />
                  <span>HİZMET DETAYI & TEKLİF FORMU</span>
                </div>
                <h3 className="mb-2 text-2xl font-black text-white">{service.title}</h3>
                <p className="mb-6 text-sm text-neutral-400">
                  Bu uzmanlık alanımız hakkında detaylı bilgi, kapsam ve işletmenize özel teklif
                  almak için numaranızı iletin.
                </p>

                <form onSubmit={handleDetailSubmit} className="space-y-4">
                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      Yetkili Adı Soyadı
                    </label>
                    <input
                      type="text"
                      placeholder="Adınız ve Soyadınız"
                      value={detailForm.name}
                      onChange={(e) => setDetailForm({ ...detailForm, name: e.target.value })}
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
                      value={detailForm.phone}
                      onChange={(e) => setDetailForm({ ...detailForm, phone: e.target.value })}
                      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block font-mono text-xs text-neutral-300">
                      Varsa Özel Notunuz
                    </label>
                    <textarea
                      rows={2}
                      placeholder="İşletmeniz veya beklentiniz hakkında kısa not..."
                      value={detailForm.note}
                      onChange={(e) => setDetailForm({ ...detailForm, note: e.target.value })}
                      className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white transition-colors placeholder:text-neutral-500 focus:border-[#FFC300] focus:outline-none"
                    />
                  </div>

                  {/* KVKK Onay Kutusu */}
                  <label className="flex cursor-pointer select-none items-start gap-2 pt-1 text-xs text-neutral-400">
                    <input
                      type="checkbox"
                      required
                      checked={kvkkConsent}
                      onChange={(e) => setKvkkConsent(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border border-white/20 bg-white/5 text-[#FFC300] accent-[#FFC300] focus:ring-[#FFC300]"
                    />
                    <span>
                      <Link
                        href="/kvkk-aydinlatma-metni"
                        target="_blank"
                        className="text-white underline hover:text-[#FFC300]"
                      >
                        KVKK Aydınlatma Metni
                      </Link>
                      &apos;ni okudum, iletişim kurulması amacıyla verilerimin işlenmesine açık rıza
                      veriyorum. *
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={isDetailSubmitting || !kvkkConsent}
                    className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-[#FFC300] py-3.5 text-sm font-black tracking-tight text-[#0A0A0A] shadow-lg transition-all hover:scale-[1.02] hover:bg-[#FFA000] active:scale-[0.98] disabled:opacity-50"
                  >
                    {isDetailSubmitting ? (
                      <span>İletiliyor...</span>
                    ) : (
                      <>
                        <span>Detay ve Teklif İste</span>
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
                  <strong>{service.title}</strong> talebiniz doğrudan yetkili ekibimize iletildi. En
                  kısa sürede WhatsApp veya telefon ile geri dönüş yapılacaktır.
                </p>
                <a
                  href={getWaServiceUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3.5 text-sm font-bold tracking-tight text-white shadow-lg transition-all hover:bg-emerald-400"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>WhatsApp ile Hızlı Bağlan</span>
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
