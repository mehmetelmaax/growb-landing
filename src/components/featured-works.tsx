"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, MapPin, CheckCircle2, X, ExternalLink, Sparkles } from "lucide-react";

export interface ClientReference {
  id: string;
  name: string;
  city: string;
  industryLabel: string;
  url: string;
  logo: string;
  category: string;
  badge: string;
  summary: string;
  metrics: {
    speed: string;
    calls: string;
    seoRank: string;
  };
  whatWeDid: string[];
}

const REAL_CLIENT_REFERENCES: ClientReference[] = [
  {
    id: "oz-aksaray",
    name: "Öz Aksaray Express",
    city: "Aksaray",
    industryLabel: "Evden Eve Nakliyat",
    url: "https://ozaksarayexpress.com/",
    logo: "/clients/oz-aksaray.png",
    category: "Asansörlü Şehirlerarası Nakliyat",
    badge: "Harita 1. Sıra",
    summary:
      "Aksaray ve tüm Türkiye genelinde 7/24 sigortalı, modern asansörlü evden eve nakliyat ve kurumsal lojistik hizmeti sunan lider taşıma firması.",
    metrics: {
      speed: "1.1 sn",
      calls: "Günde 30+",
      seoRank: "Aksaray Harita 1. Sıra",
    },
    whatWeDid: [
      "1.1 saniyede açılan, mobil öncelikli satış sitesi sıfırdan kodlandı.",
      "Aksaray genelinde 'evden eve nakliyat' aramalarında Google Harita ilk sıraya çıkarıldı.",
      "Müşteriyi bekletmeden doğrudan telefon aramasına ve WhatsApp fiyat teklifine bağlayan butonlar kuruldu.",
      "Negatif kelime filtresiyle Google Ads bütçesi sadece taşınacak gerçek müşterilere harcandı.",
    ],
  },
  {
    id: "kirsehir-aybar",
    name: "Kırşehir Aybar Nakliyat",
    city: "Kırşehir",
    industryLabel: "Asansörlü Taşımacılık",
    url: "https://www.kirsehiraybarnakliyat.com.tr/",
    logo: "/clients/kirsehir-aybar.webp",
    category: "Sabit Fiyat Garantili Taşıma",
    badge: "%92 Çağrı Artışı",
    summary:
      "Kırşehir merkezli, sabit fiyat garantisi ve marangozlu paketleme desteğiyle müşterilerine stressiz taşınma deneyimi sunan lider nakliyat markası.",
    metrics: {
      speed: "1.2 sn",
      calls: "+%92 Çağrı",
      seoRank: "Kırşehir Bölge 1. Sıra",
    },
    whatWeDid: [
      "Şeffaf sabit fiyat politikasını öne çıkaran kurumsal güven tasarımı yapıldı.",
      "Kırşehir ve çevre ilçeler için bölgesel NAP tutarlılığı ve Google Business harita liderliği sağlandı.",
      "Form doldurulduğu anda 10 saniye içinde temsilcinin telefonuna düşen WhatsApp bildirim motoru entegre edildi.",
    ],
  },
  {
    id: "konya-lider",
    name: "Konya Lider Nakliyat",
    city: "Konya",
    industryLabel: "Asansörlü Evden Eve",
    url: "https://www.konyaliderevdeneve.com/",
    logo: "/clients/konya-lider.png",
    category: "Konya Geneli Asansörlü Ev Taşıma",
    badge: "1.0 sn Açılış Hızı",
    summary:
      "Konya'nın Selçuklu, Meram ve Karatay ilçeleri başta olmak üzere 81 ile sigortalı evden eve ve ofis taşıma hizmeti veren profesyonel filo.",
    metrics: {
      speed: "1.0 sn",
      calls: "+%78 Çağrı",
      seoRank: "Selçuklu & Meram Lideri",
    },
    whatWeDid: [
      "Konya nakliyat pazarında 1.0 sn açılış hızına sahip modern altyapı kuruldu.",
      "Selçuklu, Meram ve Karatay bölgesel açılış sayfalarıyla yerel arama hacminden %100 pay alındı.",
      "Tıklama başına maliyetleri düşüren arama hedefli Google Ads reklam kurguları yapılandırıldı.",
    ],
  },
  {
    id: "esen-26",
    name: "Esen 26 Nakliyat",
    city: "Eskişehir",
    industryLabel: "Şehirlerarası Taşıma",
    url: "https://www.esen26nakliyat.com/",
    logo: "/clients/esen-26.png",
    category: "Eskişehir & Şehirlerarası Nakliye",
    badge: "Sözleşmeli Garanti",
    summary:
      "Eskişehir'den 81 ile sigortalı, modern asansör filosuyla kurumsal ofis ve evden eve taşımacılık gerçekleştiren köklü taşıma firması.",
    metrics: {
      speed: "1.1 sn",
      calls: "+%85 Çağrı",
      seoRank: "Eskişehir 1. Sıra",
    },
    whatWeDid: [
      "Eskişehir genelinde yüksek Google Haritalar görünürlüğü sağlandı.",
      "Ziyaretçiyi doğrudan canlı telefon aramasına bağlayan çağrı aksiyon butonları tasarlandı.",
      "Şeffaf sözleşme ve kasko poliçesi rozetleriyle müşteri güveni maksimuma çıkarıldı.",
    ],
  },
  {
    id: "adana-depolama",
    name: "Adana Eşya Depolama",
    city: "Adana",
    industryLabel: "Eşya Depolama",
    url: "https://www.adanaesyadepolamaa.com.tr/",
    logo: "/clients/adana-depolama.png",
    category: "7/24 Güvenlikli Kiralık Depo",
    badge: "Adana 1. Sıra",
    summary:
      "Adana genelinde nem, toz ve haşereye karşı yalıtımlı, 7/24 güvenlik kameralı kilitli oda tipi eşya depolama çözümleri.",
    metrics: {
      speed: "1.1 sn",
      calls: "+%110 Talep",
      seoRank: "Adana Depolama 1. Sıra",
    },
    whatWeDid: [
      "Oda tipi depo seçeneklerini ve fiyat hesaplama cetvelini sunan interaktif web sitesi geliştirildi.",
      "'Adana kiralık eşya deposu' aramalarında Google Haritalar ilk sıraya sabitlendi.",
      "Depo doluluk oranını %95 seviyesine çıkaran hedefli Google Ads reklamları yönetildi.",
    ],
  },
  {
    id: "adana-asansorlu",
    name: "Adana Evden Eve Asansörlü",
    city: "Adana",
    industryLabel: "Asansörlü Taşıma",
    url: "https://www.adanaevdeneveasansorlunakliyat.com.tr/",
    logo: "/clients/adana-asansorlu.png",
    category: "25. Kata Kadar Mobil Asansör",
    badge: "Çukurova Lideri",
    summary:
      "Adana ve Çukurova bölgesinde yüksek katlı rezidans ve binalara özel hidrolik dış cephe asansörüyle hasarsız ev taşıma.",
    metrics: {
      speed: "1.2 sn",
      calls: "+%88 Çağrı",
      seoRank: "Seyhan & Çukurova 1. Sıra",
    },
    whatWeDid: [
      "Yüksek binalara özel asansörlü taşımayı belgeleyen görsel vitrin tasarlandı.",
      "Tek dokunuşla WhatsApp konum paylaşımı ve araç yönlendirme altyapısı entegre edildi.",
      "Yerel SEO optimizasyonu ile Seyhan ve Çukurova ilçelerinde arama liderliği alındı.",
    ],
  },
  {
    id: "mersin-uzman",
    name: "Mersin Uzman Eller Nakliyat",
    city: "Mersin",
    industryLabel: "Asansörlü Nakliyat",
    url: "https://www.mersinuzmaneller.com/",
    logo: "/clients/mersin-uzman-eller.png",
    category: "Sahil Şeridi & Kurumsal Lojistik",
    badge: "Günlük Sıcak Çağrı",
    summary:
      "Mersin'in Yenişehir ve Mezitli ilçeleri başta olmak üzere Akdeniz bölgesinde sigortalı, asansörlü ev ve ofis taşımacılığı.",
    metrics: {
      speed: "1.1 sn",
      calls: "Haftalık 40+",
      seoRank: "Yenişehir & Mezitli 1. Sıra",
    },
    whatWeDid: [
      "Mersin'in sahil şeridi ve yüksek binalarına özel asansörlü taşıma arayüzü kodlandı.",
      "Yenişehir ve Mezitli aramalarında Google Haritalar ilk sıra sıralama hakimiyeti kuruldu.",
      "Haftalık 40'tan fazla doğrulanmış müşteri telefonu sağlayan çağrı altyapısı devreye alındı.",
    ],
  },
];

export const FeaturedWorks: React.FC = () => {
  const [selectedClient, setSelectedClient] = useState<ClientReference | null>(null);

  const handleClientClick = (client: ClientReference) => {
    setSelectedClient(client);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedClient(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <section
      id="projeler"
      className="relative overflow-hidden border-t border-white/10 bg-[#0A0A0A] py-10 text-cream sm:py-12"
    >
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-6 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-2.5 flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>GERÇEK MÜŞTERİLERİMİZ // CANLI BÜYÜME REFERANSLARI</span>
            </div>
            <h2 className="font-sans text-2xl font-black tracking-tight text-cream sm:text-4xl lg:text-5xl">
              Yayında Olan Canlı Projelerimiz.
            </h2>
          </div>

          <div className="max-w-sm font-mono text-xs text-neutral-400 md:text-right">
            *Detayları görmek için <strong>İncele</strong> butonuna tıklayabilir, doğrudan canlı
            siteyi ziyaret edebilirsiniz.
          </div>
        </div>

        {/* Compact Grid of Real Clients */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
          {REAL_CLIENT_REFERENCES.map((client) => {
            return (
              <div
                key={client.id}
                onClick={() => handleClientClick(client)}
                className="group relative flex cursor-pointer flex-col justify-between rounded-2xl border border-white/10 bg-[#121212] p-4 shadow-lg transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 sm:p-5"
              >
                {/* Top Row: Category Pill & Metric Badge */}
                <div className="mb-3 flex items-center justify-between gap-2">
                  <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] font-medium text-neutral-300">
                    {client.industryLabel}
                  </span>

                  <span className="max-w-[130px] truncate rounded border border-accent/20 bg-accent/10 px-2 py-0.5 font-mono text-[10px] font-bold text-accent">
                    {client.badge}
                  </span>
                </div>

                {/* Pure White Background Logo Container (Logos are 100% visible and sharp) */}
                {/* Pure White Background Logo Container: Hover ile doğal renklerine kavuşur */}
                <div className="relative mb-3.5 flex h-24 w-full items-center justify-center overflow-hidden rounded-xl border border-neutral-200 bg-white p-3 shadow-inner transition-all duration-300 group-hover:border-[#FFC300]/60 sm:h-28">
                  <Image
                    src={client.logo}
                    alt={client.name}
                    width={180}
                    height={70}
                    className="max-h-full max-w-full object-contain opacity-70 grayscale filter transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0"
                  />
                </div>

                {/* Project Title & Category */}
                <div className="mb-3.5">
                  <h3 className="line-clamp-1 text-sm font-bold tracking-tight text-cream transition-colors group-hover:text-accent sm:text-base">
                    {client.name}
                  </h3>
                  <p className="mt-0.5 line-clamp-1 text-[11px] text-neutral-400">
                    {client.category}
                  </p>
                </div>

                {/* Bottom Row: City + Click to Inspect + Live Visit */}
                <div className="flex items-center justify-between border-t border-white/10 pt-3 font-mono text-xs">
                  <div className="flex items-center gap-1 text-[11px] font-bold text-accent">
                    <MapPin className="h-3.5 w-3.5 shrink-0 text-accent" />
                    <span>{client.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-bold text-cream transition-all hover:border-accent hover:bg-accent hover:text-[#0A0A0A]"
                    >
                      <span>İncele</span>
                      <ArrowUpRight className="h-3 w-3" />
                    </button>

                    <a
                      href={client.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 rounded-full bg-accent/15 px-2 py-1 text-[11px] font-bold text-accent transition-colors hover:bg-accent hover:text-[#0A0A0A]"
                      title="Canlı Siteye Git"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Hukuki Metrik Dipnotu */}
        <div className="mt-8 text-center">
          <p className="font-mono text-[11px] text-neutral-500">
            * Belirtilen çağrı ve performans verileri, portföyümüzdeki işletmelerin önceki web
            altyapıları ile GrowB yayını sonrasındaki ilk 90 günlük ölçüm karşılaştırmalarına
            dayanmaktadır.
          </p>
        </div>
      </div>

      {/* DETAIL MODAL (Opened ONLY upon clicking "İncele" or clicking the card) */}
      <AnimatePresence>
        {selectedClient && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedClient(null)}
              className="absolute inset-0 cursor-pointer bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-[28px] border border-white/20 bg-[#141414] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.9)] sm:p-8"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="absolute right-5 top-5 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-300 transition-colors hover:bg-white/15 hover:text-white"
                aria-label="Kapat"
              >
                <X className="h-4 w-4" />
              </button>

              {/* Modal Header */}
              <div className="mb-6 flex items-start gap-4 pr-8">
                <div className="flex h-16 w-20 shrink-0 items-center justify-center rounded-2xl border border-neutral-200 bg-white p-2.5 shadow-sm">
                  <Image
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    width={70}
                    height={50}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-xs font-bold uppercase text-accent">
                      {selectedClient.industryLabel}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="flex items-center gap-1 font-mono text-xs text-neutral-400">
                      <MapPin className="h-3 w-3 text-accent" />
                      {selectedClient.city}
                    </span>
                  </div>
                  <h3 className="text-xl font-black text-white sm:text-2xl">
                    {selectedClient.name}
                  </h3>
                </div>
              </div>

              {/* 3 Core Results Metrics */}
              <div className="mb-6 grid grid-cols-3 gap-3 rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center">
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-400">
                    Açılış Hızı
                  </span>
                  <span className="text-base font-black text-accent sm:text-lg">
                    {selectedClient.metrics.speed}
                  </span>
                </div>
                <div className="border-x border-white/10">
                  <span className="block font-mono text-[10px] uppercase text-neutral-400">
                    Müşteri / Çağrı
                  </span>
                  <span className="text-base font-black text-emerald-400 sm:text-lg">
                    {selectedClient.metrics.calls}
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase text-neutral-400">
                    Google Sırası
                  </span>
                  <span className="mt-0.5 block text-xs font-bold leading-tight text-white sm:text-sm">
                    {selectedClient.metrics.seoRank}
                  </span>
                </div>
              </div>

              {/* Project Summary */}
              <div className="mb-6">
                <h4 className="mb-2 font-mono text-xs font-bold uppercase text-neutral-400">
                  Proje Detayı
                </h4>
                <p className="text-sm leading-relaxed text-neutral-300">{selectedClient.summary}</p>
              </div>

              {/* What We Did Checklist */}
              <div className="mb-6">
                <h4 className="mb-3 font-mono text-xs font-bold uppercase text-accent">
                  Bu Projede Neler Yaptık?
                </h4>
                <ul className="space-y-2.5">
                  {selectedClient.whatWeDid.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-neutral-300 sm:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
                <a
                  href={selectedClient.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-xs font-black uppercase tracking-wide text-[#0A0A0A] shadow-md transition-all hover:scale-105 hover:bg-accent-hover"
                >
                  <span>Canlı Siteyi Ziyaret Et</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="rounded-full bg-white/5 px-4 py-2 text-xs font-semibold text-neutral-400 transition-colors hover:bg-white/10 hover:text-white"
                >
                  Kapat
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
