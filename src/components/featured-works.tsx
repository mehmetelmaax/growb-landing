"use client";

import React, { useState, useEffect } from "react";
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
    summary: "Aksaray ve tüm Türkiye genelinde 7/24 sigortalı, modern asansörlü evden eve nakliyat ve kurumsal lojistik hizmeti sunan lider taşıma firması.",
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
    summary: "Kırşehir merkezli, sabit fiyat garantisi ve marangozlu paketleme desteğiyle müşterilerine stressiz taşınma deneyimi sunan lider nakliyat markası.",
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
    summary: "Konya'nın Selçuklu, Meram ve Karatay ilçeleri başta olmak üzere 81 ile sigortalı evden eve ve ofis taşıma hizmeti veren profesyonel filo.",
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
    summary: "Eskişehir'den 81 ile sigortalı, modern asansör filosuyla kurumsal ofis ve evden eve taşımacılık gerçekleştiren köklü taşıma firması.",
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
    summary: "Adana genelinde nem, toz ve haşereye karşı yalıtımlı, 7/24 güvenlik kameralı kilitli oda tipi eşya depolama çözümleri.",
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
    summary: "Adana ve Çukurova bölgesinde yüksek katlı rezidans ve binalara özel hidrolik dış cephe asansörüyle hasarsız ev taşıma.",
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
    summary: "Mersin'in Yenişehir ve Mezitli ilçeleri başta olmak üzere Akdeniz bölgesinde sigortalı, asansörlü ev ve ofis taşımacılığı.",
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
    <section id="projeler" className="py-10 sm:py-12 bg-[#0A0A0A] text-cream relative overflow-hidden border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase mb-2.5">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>GERÇEK MÜŞTERİLERİMİZ // CANLI BÜYÜME REFERANSLARI</span>
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-cream tracking-tight font-sans">
              Yayında Olan Canlı Projelerimiz.
            </h2>
          </div>

          <div className="text-xs text-neutral-400 max-w-sm md:text-right font-mono">
            *Detayları görmek için <strong>İncele</strong> butonuna tıklayabilir, doğrudan canlı siteyi ziyaret edebilirsiniz.
          </div>
        </div>

        {/* Compact Grid of Real Clients */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {REAL_CLIENT_REFERENCES.map((client) => {
            return (
              <div
                key={client.id}
                onClick={() => handleClientClick(client)}
                className="group relative bg-[#121212] rounded-2xl p-4 sm:p-5 border border-white/10 hover:border-accent/60 transition-all duration-200 flex flex-col justify-between hover:-translate-y-1 shadow-lg cursor-pointer"
              >
                {/* Top Row: Category Pill & Metric Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-mono font-medium text-neutral-300">
                    {client.industryLabel}
                  </span>

                  <span className="text-[10px] font-mono text-accent font-bold px-2 py-0.5 rounded bg-accent/10 border border-accent/20 truncate max-w-[130px]">
                    {client.badge}
                  </span>
                </div>

                {/* Pure White Background Logo Container (Logos are 100% visible and sharp) */}
                {/* Pure White Background Logo Container: Hover ile doğal renklerine kavuşur */}
                <div 
                  className="relative w-full h-24 sm:h-28 rounded-xl bg-white border border-neutral-200 group-hover:border-[#FFC300]/60 flex items-center justify-center p-3 mb-3.5 overflow-hidden shadow-inner transition-all duration-300"
                >
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="max-h-full max-w-full object-contain filter grayscale group-hover:grayscale-0 opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  />
                </div>

                {/* Project Title & Category */}
                <div className="mb-3.5">
                  <h3 className="text-sm sm:text-base font-bold text-cream group-hover:text-accent transition-colors tracking-tight line-clamp-1">
                    {client.name}
                  </h3>
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                    {client.category}
                  </p>
                </div>

                {/* Bottom Row: City + Click to Inspect + Live Visit */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-1 text-accent font-bold text-[11px]">
                    <MapPin className="w-3.5 h-3.5 text-accent shrink-0" />
                    <span>{client.city}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedClient(client);
                      }}
                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/5 hover:bg-accent hover:text-[#0A0A0A] border border-white/10 hover:border-accent text-[11px] font-bold text-cream transition-all"
                    >
                      <span>İncele</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>

                    <a
                      href={client.url}
                      target="_blank"
                      rel="noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-accent/15 hover:bg-accent hover:text-[#0A0A0A] text-accent text-[11px] font-bold transition-colors"
                      title="Canlı Siteye Git"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
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
              className="absolute inset-0 bg-black/85 backdrop-blur-md cursor-pointer"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-2xl bg-[#141414] border border-white/20 rounded-[28px] p-6 sm:p-8 shadow-[0_30px_90px_rgba(0,0,0,0.9)] z-10 max-h-[90vh] overflow-y-auto"
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedClient(null)}
                className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-neutral-300 hover:text-white transition-colors cursor-pointer"
                aria-label="Kapat"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Modal Header */}
              <div className="flex items-start gap-4 mb-6 pr-8">
                <div className="w-20 h-16 rounded-2xl bg-white border border-neutral-200 flex items-center justify-center p-2.5 shrink-0 shadow-sm">
                  <img
                    src={selectedClient.logo}
                    alt={selectedClient.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono font-bold text-accent uppercase">
                      {selectedClient.industryLabel}
                    </span>
                    <span className="text-neutral-600">•</span>
                    <span className="text-xs font-mono text-neutral-400 flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-accent" />
                      {selectedClient.city}
                    </span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {selectedClient.name}
                  </h3>
                </div>
              </div>

              {/* 3 Core Results Metrics */}
              <div className="grid grid-cols-3 gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 mb-6 text-center">
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Açılış Hızı</span>
                  <span className="text-base sm:text-lg font-black text-accent">{selectedClient.metrics.speed}</span>
                </div>
                <div className="border-x border-white/10">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Müşteri / Çağrı</span>
                  <span className="text-base sm:text-lg font-black text-emerald-400">{selectedClient.metrics.calls}</span>
                </div>
                <div>
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Google Sırası</span>
                  <span className="text-xs sm:text-sm font-bold text-white leading-tight block mt-0.5">{selectedClient.metrics.seoRank}</span>
                </div>
              </div>

              {/* Project Summary */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-neutral-400 uppercase mb-2">
                  Proje Detayı
                </h4>
                <p className="text-sm text-neutral-300 leading-relaxed">
                  {selectedClient.summary}
                </p>
              </div>

              {/* What We Did Checklist */}
              <div className="mb-6">
                <h4 className="text-xs font-mono font-bold text-accent uppercase mb-3">
                  Bu Projede Neler Yaptık?
                </h4>
                <ul className="space-y-2.5">
                  {selectedClient.whatWeDid.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-neutral-300">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Modal Footer Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={selectedClient.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent hover:bg-accent-hover text-[#0A0A0A] font-black text-xs uppercase tracking-wide transition-all shadow-md hover:scale-105"
                >
                  <span>Canlı Siteyi Ziyaret Et</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>

                <button
                  type="button"
                  onClick={() => setSelectedClient(null)}
                  className="px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-400 hover:text-white text-xs font-semibold transition-colors"
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
