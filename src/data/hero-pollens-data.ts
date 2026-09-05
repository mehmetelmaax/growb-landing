export interface HivePollen {
  id: string;
  slug: string;
  shortName: string;
  fullName: string;
  tagline: string;
  icon: string;
  cx: number;
  cy: number;
  order: number; // 1: Merkez Growb, 2-13: Sırayla eklenen polenler
  isCenter?: boolean;
}

export const HIVE_POLLENS: HivePollen[] = [
  // 1. MERKEZ KOVAN
  {
    id: "strateji",
    slug: "aylik-buyume-danismanligi",
    shortName: "Growb.",
    fullName: "GrowB Büyüme Stratejisi & Danışmanlık",
    tagline: "Kovanın yönetim merkezi: Kuruşuna kadar şeffaf ROI ve birebir ciro ortaklığı.",
    icon: "👑",
    cx: 260,
    cy: 230,
    order: 1,
    isCenter: true,
  },
  // 2. Polen: Google Ads
  {
    id: "google-ads",
    slug: "google-ads-reklamlari",
    shortName: "Google Ads",
    fullName: "Google Ads Arama & Harita Reklamları",
    tagline: "Satın alma anında en tepede çıkın; 500+ negatif filtreyle bütçe koruması.",
    icon: "🚀",
    cx: 260,
    cy: 148,
    order: 2,
  },
  // 3. Polen: Google Harita
  {
    id: "google-harita",
    slug: "google-harita-yerel-seo",
    shortName: "Google Harita",
    fullName: "Google Harita & Yerel SEO",
    tagline: "Bölgenizdeki her aramada haritalarda 1. sıraya oturun, doğrudan aranın.",
    icon: "📍",
    cx: 331,
    cy: 189,
    order: 3,
  },
  // 4. Polen: Meta Reklam
  {
    id: "meta",
    slug: "meta-reklam-yonetimi",
    shortName: "Meta Reklam",
    fullName: "Meta Reklam Yönetimi (Instagram & FB)",
    tagline: "Doğrudan WhatsApp mesajı ve sıcak müşteri getiren hedefli reklamlar.",
    icon: "🎯",
    cx: 331,
    cy: 271,
    order: 4,
  },
  // 5. Polen: SEO
  {
    id: "seo",
    slug: "seo-organik-gorunurluk",
    shortName: "SEO",
    fullName: "SEO & Organik Görünürlük",
    tagline: "Reklam vermeyi bıraktığınızda bile durmayan kesintisiz müşteri akışı.",
    icon: "🔍",
    cx: 260,
    cy: 312,
    order: 5,
  },
  // 6. Polen: CRM & WhatsApp
  {
    id: "crm",
    slug: "crm-whatsapp-takip",
    shortName: "CRM & WhatsApp",
    fullName: "CRM & WhatsApp Satış Otomasyonu",
    tagline: "Gece gelen müşteriyi bile kaçırmayan 7/24 akıllı karşılama botu.",
    icon: "💬",
    cx: 189,
    cy: 271,
    order: 6,
  },
  // 7. Polen: Video & Reels
  {
    id: "video",
    slug: "video-reels-ai-produksiyon",
    shortName: "Video & Reels",
    fullName: "Video, Reels & AI Prodüksiyon",
    tagline: "Algoritmaları fetheden, kaydırıp geçilmeyen dinamik dikey videolar.",
    icon: "🎬",
    cx: 189,
    cy: 189,
    order: 7,
  },
  // 8. Polen: E-Ticaret
  {
    id: "eticaret",
    slug: "e-ticaret-satis-sistemleri",
    shortName: "E-Ticaret",
    fullName: "E-Ticaret & Satış Sistemleri",
    tagline: "7/24 online sipariş toplayan, kargo ve sanal POS entegreli mağaza motoru.",
    icon: "🛒",
    cx: 402,
    cy: 230,
    order: 8,
  },
  // 9. Polen: İçerik Yazarlığı
  {
    id: "icerik",
    slug: "icerik-yazarligi-satis-metni",
    shortName: "İçerik Yazarlığı",
    fullName: "İçerik Yazarlığı & Satış Metni",
    tagline: "Ziyaretçiyi sayfada tutan ve tek tıkla satın almaya ikna eden metinler.",
    icon: "✍️",
    cx: 118,
    cy: 230,
    order: 9,
  },
  // 10. Polen: Rakip Analizi
  {
    id: "rakip",
    slug: "rakip-pazar-analizi",
    shortName: "Rakip Analizi",
    fullName: "Pazar, Sektör & Rakip Analizi",
    tagline: "Rakiplerinizin nerelerden müşteri aldığını ve açıklarını ortaya çıkaran röntgen.",
    icon: "📊",
    cx: 331,
    cy: 107,
    order: 10,
  },
  // 11. Polen: Grafik Tasarım
  {
    id: "grafik",
    slug: "grafik-tasarim-kurumsal-kimlik",
    shortName: "Grafik Tasarım",
    fullName: "Grafik Tasarım & Kurumsal Kimlik",
    tagline: "Akılda kalıcı profesyonel logo, renk paleti ve tescile hazır marka kimliği.",
    icon: "🎨",
    cx: 189,
    cy: 107,
    order: 11,
  },
  // 12. Polen: Web Tasarım
  {
    id: "web-tasarim",
    slug: "web-tasarim-yazilim",
    shortName: "Web Tasarım",
    fullName: "Web Tasarım & Satış Altyapısı",
    tagline: "1.1 saniyede açılan, mobil kusursuz ve doğrudan sıcak müşteri üreten siteler.",
    icon: "💻",
    cx: 189,
    cy: 353,
    order: 12,
  },
  // 13. Polen: Sosyal Medya
  {
    id: "sosyal-medya",
    slug: "sosyal-medya-yonetimi",
    shortName: "Sosyal Medya",
    fullName: "Sosyal Medya Yönetimi",
    tagline: "Marka prestijinizi zirveye taşıyan, güven veren düzenli içerik akışı.",
    icon: "📱",
    cx: 331,
    cy: 353,
    order: 13,
  },
];

export function getHexPath(cx: number, cy: number, r: number = 44): string {
  const points: [number, number][] = [];
  for (let i = 0; i < 6; i++) {
    const angle = (Math.PI / 180) * (60 * i - 30);
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    points.push([Math.round(x * 10) / 10, Math.round(y * 10) / 10]);
  }
  return `M ${points.map((p) => p.join(",")).join(" L ")} Z`;
}
