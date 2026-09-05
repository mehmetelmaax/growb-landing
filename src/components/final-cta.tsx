"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { FINAL_CTA_DATA, SITE_CONFIG } from "@/data/content";
import { Send, CheckCircle2, ShieldCheck, Sparkles, PhoneCall, Check } from "lucide-react";

// =========================================================================
// 1. KULLANICI TALEBİ: Formda kalem kalem detay yazma, sadece 3-4 net seçenek koy
// =========================================================================
const SERVICE_OPTIONS = [
  {
    id: "web-tasarim",
    title: "🌐 Satış Odaklı Web Sitesi & Yazılım",
    desc: "1.1 sn ultra hızlı açılış, mobil öncelikli arayüz ve e-ticaret altyapısı",
  },
  {
    id: "reklam-harita",
    title: "🚀 Google & Meta Reklamları + Harita SEO",
    desc: "Doğrudan telefon çaldıran satış reklamları ve Google Haritalar'da 1. sıra",
  },
  {
    id: "video-sosyal",
    title: "🎬 4K Dikey Reels Video & Sosyal Medya",
    desc: "Algoritmayı fetheden dikey videolar, kurumsal kimlik ve marka prestiji",
  },
  {
    id: "crm-danismanlik",
    title: "📈 Büyüme Danışmanlığı & WhatsApp CRM",
    desc: "7/24 müşteri kaçırmayan satış hattı ve kurucuyla birebir aylık ciro ortaklığı",
  },
];

export const FinalCta: React.FC = () => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "🌐 Satış Odaklı Web Sitesi & Yazılım",
    "🚀 Google & Meta Reklamları + Harita SEO"
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sector, setSector] = useState("");
  const [notes, setNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    if (!phone) return;
    setIsSubmitting(true);
    try {
      await fetch("/api/lead", {
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
        }),
      });
    } catch (err) {
      console.error("Lead submission error:", err);
    } finally {
      setIsSubmitting(false);
      setFormSubmitted(true);
    }
  };

  return (
    <section id="iletisim" className="py-12 sm:py-16 relative overflow-hidden bg-[#0A0A0A]">
      <div id="randevu-al" className="absolute -top-24 left-0 pointer-events-none" />
      <div id="randevu" className="absolute -top-24 left-0 pointer-events-none" />

      {/* Arka Plan Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-[#FFC300]/[0.06] rounded-full blur-[160px]" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="bg-[#121212] border border-[#FFC300]/30 rounded-3xl p-6 sm:p-10 md:p-12 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
          
          <div className="relative z-10 flex flex-col items-center text-center">
            
            {/* Rozet */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFC300]/15 border border-[#FFC300]/30 text-[#FFC300] text-xs font-mono font-bold tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{FINAL_CTA_DATA.scarcityBadge}</span>
            </div>

            {/* Başlık */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight max-w-3xl font-sans">
              {FINAL_CTA_DATA.title}
            </h2>

            {/* Açıklama */}
            <p className="mt-4 text-sm sm:text-base text-neutral-300 max-w-2xl leading-relaxed">
              İhtiyacınız olan alanları seçin, kurucumuzla 15 dakikalık büyüme stratejinizi başlatalım.
            </p>

            {/* Form Alanı */}
            <div className="w-full max-w-2xl mt-8 sm:mt-10">
              {formSubmitted ? (
                <div className="bg-[#FFC300]/10 border border-[#FFC300]/40 rounded-2xl p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-[#FFC300] mx-auto mb-3" />
                  <h3 className="text-xl font-bold text-white">Talebiniz 10 Saniye İçinde Alındı!</h3>
                  <p className="text-sm text-neutral-300 mt-2 max-w-lg mx-auto leading-relaxed">
                    Seçtiğiniz alanlar doğrultusunda yetkili ekibimiz numaranızı arayacak veya WhatsApp üzerinden büyüme planınızı iletecektir.
                  </p>
                  <a
                    href={`tel:${SITE_CONFIG.phone.replace(/\s+/g, "")}`}
                    className="inline-flex items-center gap-2 mt-6 px-7 py-3 rounded-full bg-[#FFC300] text-[#0A0A0A] font-bold text-sm shadow-lg hover:scale-105 transition-all"
                  >
                    <PhoneCall className="w-4 h-4" />
                    <span>Hemen Şimdi Arayın: {SITE_CONFIG.phone}</span>
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-6 text-left">
                  
                  {/* SADE VE NET 4 SEÇENEK */}
                  <div>
                    <label className="block text-xs font-mono font-bold text-[#FFC300] mb-3 uppercase tracking-wider">
                      1. İHTİYACINIZ OLAN HİZMET ALANLARINI SEÇİN (ÇOKLU SEÇEBİLİRSİNİZ):
                    </label>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {SERVICE_OPTIONS.map((opt) => {
                        const isSelected = selectedServices.includes(opt.title);
                        return (
                          <button
                            type="button"
                            key={opt.id}
                            onClick={() => toggleService(opt.title)}
                            className={`flex items-start gap-3 p-4 rounded-2xl text-left transition-all duration-200 border cursor-pointer ${
                              isSelected
                                ? "bg-[#FFC300]/15 border-[#FFC300] shadow-[0_0_20px_rgba(255,195,0,0.15)]"
                                : "bg-white/[0.03] border-white/10 text-neutral-300 hover:border-white/20 hover:bg-white/[0.05]"
                            }`}
                          >
                            <div className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 border transition-colors ${
                              isSelected ? "bg-[#FFC300] border-[#FFC300] text-black" : "border-white/30 bg-white/5"
                            }`}>
                              {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                            </div>
                            <div className="flex-1">
                              <span className={`text-xs sm:text-sm font-bold block leading-snug ${
                                isSelected ? "text-[#FFC300]" : "text-white"
                              }`}>
                                {opt.title}
                              </span>
                              <span className="text-[11px] text-neutral-400 block mt-1 leading-normal font-sans">
                                {opt.desc}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* 2. İletişim Bilgileri */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                        Yetkili Adı Soyadı
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Örn: Mehmet Demir"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFC300] transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-[#FFC300] mb-1.5 uppercase tracking-wider font-bold">
                        Telefon Numarası *
                      </label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="0541 484 24 26"
                        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-[#FFC300]/50 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFC300] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Sektörünüz / İşletmeniz
                    </label>
                    <input
                      type="text"
                      value={sector}
                      onChange={(e) => setSector(e.target.value)}
                      placeholder="Örn: Evden Eve Nakliyat, Diş Kliniği, Butik Otel..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFC300] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-neutral-400 mb-1.5 uppercase tracking-wider">
                      Eklemek İstediğiniz Not (Opsiyonel)
                    </label>
                    <textarea
                      rows={2}
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Örn: Mevcut sitemiz var ancak Google Haritalarda çıkmıyoruz..."
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-neutral-500 text-sm focus:outline-none focus:border-[#FFC300] transition-colors resize-none"
                    />
                  </div>

                  {/* Gönder Butonu */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-full bg-[#FFC300] hover:bg-[#FFA000] text-[#0A0A0A] font-extrabold text-sm sm:text-base tracking-tight transition-all shadow-[0_10px_25px_rgba(255,195,0,0.35)] hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>Gönderiliyor...</span>
                    ) : (
                      <>
                        <span>{FINAL_CTA_DATA.ctaText}</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-4 text-xs font-mono text-neutral-400 pt-1">
                    <span className="flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#FFC300]" />
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
