"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { CircularBadge } from "./ui/circular-badge";
import { PhoneCall } from "lucide-react";

interface WordItem {
  text: string;
  type?: "strike" | "highlight" | "bold" | "normal";
}

const MANIFESTO_WORDS: WordItem[] = [
  { text: "Biz", type: "normal" },
  { text: "dijitaldeki", type: "bold" },
  { text: "tüm", type: "bold" },
  { text: "işlerinizi", type: "bold" },
  { text: "yöneten,", type: "bold" },
  { text: "işletmenizin", type: "highlight" },
  { text: "kasasına", type: "highlight" },
  { text: "her", type: "highlight" },
  { text: "gün", type: "highlight" },
  { text: "ciro", type: "highlight" },
  { text: "akıtan", type: "highlight" },
  { text: "tam", type: "bold" },
  { text: "kapsamlı", type: "bold" },
  { text: "dijital", type: "bold" },
  { text: "pazarlama", type: "bold" },
  { text: "ajansıyız.", type: "bold" },
];

export const WhoAreWe: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  
  // Ekranın ortasına ulaştığında yazının tamamını net ve okunur hale getiren scroll progress
  const { scrollYProgress } = useScroll({
    target: textContainerRef,
    offset: ["start 0.9", "center 0.5"],
  });

  return (
    <section 
      id="about" 
      ref={containerRef}
      className="bg-white text-[#0A0A0A] py-10 sm:py-14 px-4 sm:px-8 lg:px-14 border-t border-neutral-200 relative overflow-hidden"
    >
      {/* Hafif Arka Plan Deseni */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Üst Kategori Etiketi & Dönen Mühür */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono font-bold tracking-wider text-neutral-900 uppercase">
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
            <span>BİZ KİMİZ? // TAM TEŞEKKÜLLÜ DİJİTAL PAZARLAMA AJANSI</span>
          </div>

          <div className="shrink-0 pt-2">
            <CircularBadge
              size={135}
              theme="dark"
              text="• BÜYÜME ORTAĞINIZ • DİJİTAL PAZARLAMA • GROWB "
              centerContent={
                <div className="flex items-baseline font-black text-sm tracking-tight text-white">
                  <span>Growb</span>
                  <span className="text-[#FFC300] text-base leading-none">.</span>
                </div>
              }
            />
          </div>
        </div>

        {/* MOUSE AŞAĞI İNDİKÇE SAYFA ORTASINDA TAMAMI OKUNUR HALE GELEN KİNETİK BAŞLIK */}
        <div ref={textContainerRef} className="max-w-5xl mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-5xl lg:text-[4rem] font-black text-[#0A0A0A] tracking-[-0.04em] leading-[1.12] font-sans flex flex-wrap gap-x-3 sm:gap-x-4 gap-y-2 sm:gap-y-3 items-baseline">
            {MANIFESTO_WORDS.map((word, idx) => {
              const totalWords = MANIFESTO_WORDS.length;
              const step = 0.8 / totalWords;
              const start = idx * step;
              const end = Math.min(1, start + step * 2);

              return (
                <KineticWord
                  key={idx}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </h2>
        </div>

        {/* Anlatım Bölümü: Dijital Pazarlama Kimliği */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-14 items-start pt-8 border-t border-neutral-200">
          <div className="lg:col-span-7 space-y-5 text-base sm:text-lg text-neutral-700 leading-relaxed font-medium">
            <p>
              Tek bir parçayla dijitalde büyüme olmaz. Biz işletmelerin <strong className="text-neutral-950 font-extrabold">A&apos;dan Z&apos;ye tüm dijital pazarlama operasyonunu</strong> üstlenen, sonuca ve net ciroya odaklı tam kapsamlı bir dijital pazarlama ajansıyız.
            </p>
            <p>
              Google Arama Ağı ve Meta (Instagram/Facebook) reklamlarından yerel harita dominasyonuna, 4K dikey video ve Reels prodüksiyonundan WhatsApp satış otomasyonuna kadar her kanalı birbiriyle konuşturan kapalı devre bir <span className="text-neutral-950 font-bold underline decoration-[#FFC300] decoration-4">büyüme sistemi</span> kuruyoruz.
            </p>
          </div>

          {/* Alıntı Kartı */}
          <div className="lg:col-span-5 bg-neutral-950 text-white rounded-3xl p-6 sm:p-8 border border-neutral-800 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFC300]/10 rounded-full blur-2xl pointer-events-none" />
            <div className="flex items-center gap-2 text-xs font-mono text-[#FFC300] font-bold uppercase tracking-wider mb-3">
              <PhoneCall className="w-4 h-4 text-[#FFC300]" />
              <span>En Sevdiğimiz Müşteri Telefonu:</span>
            </div>
            <blockquote className="text-base sm:text-lg font-bold text-white leading-snug mb-4 italic">
              &ldquo;GrowB ekibi, reklamlar ve harita sayesinde telefonlar hiç susmuyor! Yeni personel alıyoruz, bütçeyi biraz kısalım mı?&rdquo;
            </blockquote>
            <div className="flex items-center justify-between pt-4 border-t border-white/10 text-xs text-neutral-400">
              <span className="font-mono text-neutral-300">İşte biz tam olarak bu sonuç için çalışıyoruz.</span>
              <span className="text-[#FFC300] font-bold">#TamKapsamlıPazarlama</span>
            </div>
          </div>
        </div>

        {/* 3 Pazarlama Sütunu */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-neutral-200">
          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-[#FFC300] flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-md">
              01
            </div>
            <h3 className="text-lg font-black text-neutral-950 uppercase tracking-tight mb-2">
              Yüksek ROAS & Satış Reklamları
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Google Ads ve Meta reklamlarını boşa harcamadan, doğrudan satın alma niyetindeki sıcak müşterilere yönlendirerek paranızın hakkını veren kampanyalar kurguluyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-[#FFC300] flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-md">
              02
            </div>
            <h3 className="text-lg font-black text-neutral-950 uppercase tracking-tight mb-2">
              Harita & Organik SEO Hakimiyeti
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Bölgenizdeki her yerel aramada Google Haritalar'da 1. sıraya yerleşerek, arayan müşterilerin doğrudan sizin dükkanınızı veya telefonunuzu aramasını sağlıyoruz.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 hover:border-neutral-900 transition-all group">
            <div className="w-10 h-10 rounded-xl bg-neutral-950 text-[#FFC300] flex items-center justify-center font-mono font-bold text-sm mb-4 group-hover:scale-110 transition-transform shadow-md">
              03
            </div>
            <h3 className="text-lg font-black text-neutral-950 uppercase tracking-tight mb-2">
              Video, İçerik & Otomasyon
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              Algoritmaları fetheden dikey Reels videoları, ikna edici satış metinleri ve gece gelen müşteriyi bile kaçırmayan 7/24 WhatsApp CRM satış otomasyonları inşa ediyoruz.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

interface KineticWordProps {
  word: WordItem;
  progress: any;
  range: [number, number];
}

const KineticWord: React.FC<KineticWordProps> = ({ word, progress, range }) => {
  // Yavaşça mouse indikçe yukarıdan aşağıya süzülerek inme hareketi
  const y = useTransform(progress, range, [-15, 0]);
  // Sayfa ortasında netleşen yüksek kontrastlı açılma
  const opacity = useTransform(progress, range, [0.28, 1]);

  let wordStyle = "text-[#0A0A0A]";
  if (word.type === "highlight") {
    wordStyle = "text-amber-600 underline decoration-[#FFC300] decoration-4";
  } else if (word.type === "strike") {
    wordStyle = "text-neutral-500 line-through decoration-neutral-400 decoration-2";
  } else if (word.type === "bold") {
    wordStyle = "text-[#0A0A0A] font-black";
  }

  return (
    <motion.span 
      style={{ y, opacity }}
      className={`inline-block transition-colors duration-150 ${wordStyle}`}
    >
      {word.text}
    </motion.span>
  );
};
