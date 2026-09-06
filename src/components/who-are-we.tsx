"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
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
      className="relative overflow-hidden border-t border-neutral-200 bg-white px-4 py-10 text-[#0A0A0A] sm:px-8 sm:py-14 lg:px-14"
    >
      {/* Hafif Arka Plan Deseni */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: "radial-gradient(#000 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Üst Kategori Etiketi & Dönen Mühür */}
        <div className="mb-6 flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-neutral-100 px-3 py-1.5 font-mono text-xs font-bold uppercase tracking-wider text-neutral-900">
            <span className="h-2 w-2 animate-ping rounded-full bg-amber-500" />
            <span>BİZ KİMİZ? // TAM TEŞEKKÜLLÜ DİJİTAL PAZARLAMA AJANSI</span>
          </div>

          <div className="shrink-0 pt-2">
            <CircularBadge
              size={135}
              theme="dark"
              text="• BÜYÜME ORTAĞINIZ • DİJİTAL PAZARLAMA • GROWB "
              centerContent={
                <div className="flex items-baseline text-sm font-black tracking-tight text-white">
                  <span>Growb</span>
                  <span className="text-base leading-none text-[#FFC300]">.</span>
                </div>
              }
            />
          </div>
        </div>

        {/* MOUSE AŞAĞI İNDİKÇE SAYFA ORTASINDA TAMAMI OKUNUR HALE GELEN KİNETİK BAŞLIK */}
        <div ref={textContainerRef} className="mb-16 max-w-5xl sm:mb-20">
          <h2 className="flex flex-wrap items-baseline gap-x-3 gap-y-2 font-sans text-3xl font-black leading-[1.12] tracking-[-0.04em] text-[#0A0A0A] sm:gap-x-4 sm:gap-y-3 sm:text-5xl lg:text-[4rem]">
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
        <div className="mb-14 grid grid-cols-1 items-start gap-8 border-t border-neutral-200 pt-8 lg:grid-cols-12 lg:gap-12">
          <div className="space-y-5 text-base font-medium leading-relaxed text-neutral-700 sm:text-lg lg:col-span-7">
            <p>
              Tek bir parçayla dijitalde büyüme olmaz. Biz işletmelerin{" "}
              <strong className="font-extrabold text-neutral-950">
                A&apos;dan Z&apos;ye tüm dijital pazarlama operasyonunu
              </strong>{" "}
              üstlenen, sonuca ve net ciroya odaklı tam kapsamlı bir dijital pazarlama ajansıyız.
            </p>
            <p>
              Google Arama Ağı ve Meta (Instagram/Facebook) reklamlarından yerel harita
              dominasyonuna, 4K dikey video ve Reels prodüksiyonundan WhatsApp satış otomasyonuna
              kadar her kanalı birbiriyle konuşturan kapalı devre bir{" "}
              <span className="font-bold text-neutral-950 underline decoration-[#FFC300] decoration-4">
                büyüme sistemi
              </span>{" "}
              kuruyoruz.
            </p>
          </div>

          {/* Alıntı Kartı */}
          <div className="relative overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-950 p-6 text-white shadow-2xl sm:p-8 lg:col-span-5">
            <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-[#FFC300]/10 blur-2xl" />
            <div className="mb-3 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-wider text-[#FFC300]">
              <PhoneCall className="h-4 w-4 text-[#FFC300]" />
              <span>En Sevdiğimiz Müşteri Telefonu:</span>
            </div>
            <blockquote className="mb-4 text-base font-bold italic leading-snug text-white sm:text-lg">
              &ldquo;GrowB ekibi, reklamlar ve harita sayesinde telefonlar hiç susmuyor! Yeni
              personel alıyoruz, bütçeyi biraz kısalım mı?&rdquo;
            </blockquote>
            <div className="flex items-center justify-between border-t border-white/10 pt-4 text-xs text-neutral-400">
              <span className="font-mono text-neutral-300">
                İşte biz tam olarak bu sonuç için çalışıyoruz.
              </span>
              <span className="font-bold text-[#FFC300]">#TamKapsamlıPazarlama</span>
            </div>
          </div>
        </div>

        {/* 3 Pazarlama Sütunu */}
        <div className="grid grid-cols-1 gap-6 border-t border-neutral-200 pt-6 md:grid-cols-3">
          <div className="group rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 transition-all hover:border-neutral-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 font-mono text-sm font-bold text-[#FFC300] shadow-md transition-transform group-hover:scale-110">
              01
            </div>
            <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-neutral-950">
              Yüksek ROAS & Satış Reklamları
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Google Ads ve Meta reklamlarını boşa harcamadan, doğrudan satın alma niyetindeki sıcak
              müşterilere yönlendirerek paranızın hakkını veren kampanyalar kurguluyoruz.
            </p>
          </div>

          <div className="group rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 transition-all hover:border-neutral-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 font-mono text-sm font-bold text-[#FFC300] shadow-md transition-transform group-hover:scale-110">
              02
            </div>
            <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-neutral-950">
              Harita & Organik SEO Hakimiyeti
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Bölgenizdeki her yerel aramada Google Haritalar'da 1. sıraya yerleşerek, arayan
              müşterilerin doğrudan sizin dükkanınızı veya telefonunuzu aramasını sağlıyoruz.
            </p>
          </div>

          <div className="group rounded-2xl border border-neutral-200/80 bg-neutral-50 p-6 transition-all hover:border-neutral-900">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-950 font-mono text-sm font-bold text-[#FFC300] shadow-md transition-transform group-hover:scale-110">
              03
            </div>
            <h3 className="mb-2 text-lg font-black uppercase tracking-tight text-neutral-950">
              Video, İçerik & Otomasyon
            </h3>
            <p className="text-sm leading-relaxed text-neutral-600">
              Algoritmaları fetheden dikey Reels videoları, ikna edici satış metinleri ve gece gelen
              müşteriyi bile kaçırmayan 7/24 WhatsApp CRM satış otomasyonları inşa ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface KineticWordProps {
  word: WordItem;
  progress: MotionValue<number>;
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
