export interface ServiceItem {
  id: string;
  number: string;
  category: string;
  title: string;
  description: string;
  tags: string[];
  image: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  year: string;
  tags: string[];
  image1: string;
  image2: string;
  stats?: string;
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  logo: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const SITE_CONFIG = {
  name: "Growb.",
  subName: "DİJİTAL PAZARLAMA AJANSI",
  location: "NEVŞEHİR",
  tagline: "Dijitaldeki tüm işlerinizi yöneten büyüme ortağınız.",
  phone: "0541 484 24 26",
  phoneRaw: "05414842426",
  phoneInternational: "+905414842426",
  whatsappNumber: "905414842426",
  email: "info@growbdijital.com",
  address: "Online & Türkiye Geneli Kesintisiz Dijital Hizmet",
  addressLocality: "Nevşehir",
  addressRegion: "Kapadokya",
  addressCountry: "TR",
  taxInfo: "Nevşehir V.D. 381 049 2910",
  founder: "Mehmet Demir",
  founderRole: "Ajans Kurucusu & Büyüme Danışmanı",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com",
  socials: {
    whatsapp: "https://wa.me/905414842426",
    instagram: "https://www.instagram.com/growb.dijital/",
  },
  instagramHandle: "@growb.dijital",
  getWhatsappUrl: (message?: string) => {
    return message
      ? `https://wa.me/905414842426?text=${encodeURIComponent(message)}`
      : "https://wa.me/905414842426";
  },
  getPhoneUrl: () => "tel:05414842426",
  getMailtoUrl: () => "mailto:info@growbdijital.com",
};

export const NAV_LINKS = [
  { name: "Manifesto", href: "#manifesto" },
  { name: "Hizmetler", href: "#hizmetler" },
  { name: "Süreç", href: "#surec" },
  { name: "Metrikler", href: "#metrikler" },
  { name: "Fiyatlandırma", href: "#fiyatlar" },
  { name: "Projeler", href: "#projeler" },
  { name: "Hız & SEO", href: "#skor-ogren" },
  { name: "SSS", href: "#sss" },
];

export const HERO_DATA = {
  badge: "TÜM DİJİTAL İŞLERİNİZ İÇİN TEK AJANS",
  titleLine1: "Dijitaldeki Tüm İşlerinizi Üstlenen",
  titleLine2: "Tam Kapsamlı Dijital Pazarlama Ajansı.",
  description:
    "Google & Meta reklamlarından yerel harita dominasyonuna, 4K Reels prodüksiyonundan WhatsApp CRM satış otomasyonuna kadar tüm dijital işlerinizi sözleşmeli büyüme ve operasyonel KPI taahhüdüyle yönetiyoruz.",
  ctaText: "15 Dk Görüşme Planla",
  ctaHref: "#iletisim",
  pricingHref: "#fiyatlar",
  mockups: [
    { title: "Evden Eve Nakliyat Portalı", img: "https://picsum.photos/seed/growb1/600/400" },
    { title: "Klinik & Sağlık Randevu Sistemi", img: "https://picsum.photos/seed/growb2/600/400" },
    { title: "Oto Kurtarma Acil Çağrı Arayüzü", img: "https://picsum.photos/seed/growb3/600/400" },
    { title: "Bölgesel Harita Liderliği Paneli", img: "https://picsum.photos/seed/growb4/600/400" },
    { title: "Kapadokya Turizm Rezervasyon", img: "https://picsum.photos/seed/growb5/600/400" },
    { title: "WhatsApp CRM & Lead Dönüşümü", img: "https://picsum.photos/seed/growb6/600/400" },
  ],
};

export const CLIENT_LOGOS = [
  { name: "GrowB Güvencesi", label: "TESCİLLİ METODOLOJİ" },
  { name: "Evim Güvende Nakliyat", label: "LOJİSTİK LİDERİ" },
  { name: "Dalaman Yiğit Kurtarma", label: "7/24 YOL YARDIM" },
  { name: "Nevşehir Çözüm Tesisat", label: "ACİL SERVİS" },
  { name: "Kapadokya Cave Retreat", label: "BUTİK TURİZM" },
  { name: "Anadolu Vinç & Taşıma", label: "AĞIR HİZMET" },
];

export const MANIFESTO_WORDS = [
  "TÜRKİYE'DE",
  "HER",
  "GÜN",
  "BİNLERCE",
  "MÜŞTERİ",
  "TELEFONDAN",
  "HİZMET",
  "VE",
  "USTA",
  "ARIYOR.",
  "FAKAT",
  "YAVAŞ",
  "SİTELER,",
  "TELEFONA",
  "ÇIKMAYAN",
  "FREELANCER'LAR",
  "VE",
  "BOŞA",
  "GİDEN",
  "REKLAM",
  "BÜTÇELERİ",
  "İŞLETMELERİN",
  "PARASINI",
  "YUTUYOR.",
  "BİZ",
  "MASRAF",
  "DEĞİL;",
  "BÜYÜME",
  "ORTAĞINIZIZ",
  "TELEFONUNUZU",
  "HER",
  "GÜN",
  "DÜZENLİ",
  "ÇALDIRAN",
  "BİR",
  "SATIŞ",
  "MAKİNESİ",
  "KURUYORUZ.",
];

export const METRICS_DATA = [
  {
    target: 1.2,
    decimals: 1,
    prefix: "< ",
    suffix: " sn",
    label: "Açılış Hızı (Mobil & Core Web Vitals)",
    desc: "GrowB saf Next.js mimarisinde 95+ Core Web Vitals hedefiyle müşteriyi bekletmeden doğrudan aksiyona geçiren satış motoru.",
  },
  {
    target: 10,
    decimals: 0,
    prefix: "",
    suffix: " sn",
    label: "Telegram & WhatsApp Anlık Bildirim",
    desc: "Web sitenizden form veya çağrı geldiğinde kurucunun ve ekibin cebine anında düşen lead iletimi.",
  },
  {
    target: 84,
    decimals: 0,
    prefix: "%",
    suffix: "",
    label: "İlk Ay Çağrı ve Talep Artışı",
    desc: "Ölçülen vaka ortalamalarında önceki hazır şablon sitelere kıyasla gelen müşteri çağrılarındaki artış oranı.",
  },
  {
    target: 1,
    decimals: 0,
    prefix: "",
    suffix: " Yıl",
    label: "Kesintisiz Kod & Destek Güvencesi",
    desc: "GrowB Güvencesi resmi sözleşmemizle yazılım ve barındırma desteği veriyoruz.",
  },
];

export const SERVICES_STACK: ServiceItem[] = [
  {
    id: "hizmet-1",
    number: "01",
    category: "WEB YAZILIM & ALTYAPI",
    title: "1.2 Saniyede Açılan Mobil Satış Siteleri",
    description:
      "WordPress veya hantal hazır temalar kullanmıyoruz. Next.js ve modern teknolojilerle 1.2 saniyenin altında açılan, Core Web Vitals optimizasyonlu ve doğrudan arama & WhatsApp butonlarına yönlendiren satış makineleri kodluyoruz.",
    tags: ["Next.js 14", "Tailwind CSS", "1.2s Açılış", "Mobil Öncelikli"],
    image: "https://picsum.photos/seed/webdesign/800/600",
  },
  {
    id: "hizmet-2",
    number: "02",
    category: "GOOGLE ADS PERFORMANS",
    title: "Sadece Alıcı Müşteriyi Çeken Reklamlar",
    description:
      "Boşa harcanan tık bütçelerine son veriyoruz. 500+ negatif kelime filtresi, hedefli coğrafi yarıçap ve telefon araması odaklı Google Ads kurgularıyla sadece hemen hizmet satın almak isteyen sıcak müşterileri sitenize çekiyoruz.",
    tags: ["Google Ads", "Negatif Kelime Filtresi", "Arama Odaklı", "Yüksek Dönüşüm"],
    image: "https://picsum.photos/seed/googleads/800/600",
  },
  {
    id: "hizmet-3",
    number: "03",
    category: "YEREL SEO & HARİTALAR",
    title: "Google Haritalar'da İlk 3 Sıra Hakimiyeti",
    description:
      "Nevşehir, Kapadokya veya tüm Türkiye genelinde; 'en yakın oto çekici', 'evden eve nakliyat', 'acil usta' aramalarında Google Harita 3'lü paketinde (Local Pack) ilk sıraya çıkmanızı sağlayan 9 aşamalı yerel SEO sistemi.",
    tags: ["Google Business Profile", "Harita Sıralaması", "Yerel SEO", "NAP Tutarlılığı"],
    image: "https://picsum.photos/seed/localseo/800/600",
  },
  {
    id: "hizmet-4",
    number: "04",
    category: "OTOMASYON & DÖNÜŞÜM",
    title: "10 Saniyede WhatsApp & Telegram Lead Motoru",
    description:
      "Müşteri web sitenizdeki formu doldurduğunda veya arama butonuna tıkladığında; 10 saniye içinde doğrudan telefonunuza ve satış ekibinize detaylı bildirim düşer. Müşteriyi soğutmadan 1 dakikada geri dönün, satışı kapatın.",
    tags: ["WhatsApp Webhook", "Telegram Botu", "Anlık Bildirim", "CRM Entegrasyonu"],
    image: "https://picsum.photos/seed/automation/800/600",
  },
];

export const SERVICES_STACK_DATA = SERVICES_STACK;

export const FEATURED_WORKS: ProjectItem[] = [
  {
    id: "work-1",
    title: "Evim Güvende Evden Eve Nakliyat",
    category: "Lojistik & Taşıma Platformu",
    year: "2025",
    tags: ["Web Geliştirme", "Google Ads", "WhatsApp CRM"],
    image1: "https://picsum.photos/seed/proj1a/800/600",
    image2: "https://picsum.photos/seed/proj1b/800/600",
    stats: "Haftada 40+ Sıcak Taşıma Talebi",
  },
  {
    id: "work-2",
    title: "Dalaman Yiğit Oto Çekici & Yol Yardım",
    category: "Acil Çağrı & Konum Sistemi",
    year: "2025",
    tags: ["1.1s Açılış", "Doğrudan Arama", "Harita Paketi"],
    image1: "https://picsum.photos/seed/proj2a/800/600",
    image2: "https://picsum.photos/seed/proj2b/800/600",
    stats: "Çağrı Başı Maliyet %45 Düştü",
  },
  {
    id: "work-3",
    title: "Kapadokya Cave Retreat Hotel",
    category: "Turizm & Butik Otel Portalı",
    year: "2024",
    tags: ["Çok Dilli Altyapı", "Komisyonsuz Rezervasyon", "SEO"],
    image1: "https://picsum.photos/seed/proj3a/800/600",
    image2: "https://picsum.photos/seed/proj3b/800/600",
    stats: "Doğrudan Rezervasyon Oranı %68 Arttı",
  },
  {
    id: "work-4",
    title: "Nevşehir Çözüm Sıhhi Tesisat",
    category: "Yerel Esnaf Çağrı Sistemi",
    year: "2025",
    tags: ["Yerel SEO", "Google Harita İlk Sıra", "Mobil UI"],
    image1: "https://picsum.photos/seed/proj4a/800/600",
    image2: "https://picsum.photos/seed/proj4b/800/600",
    stats: "Günlük Ortalama 8-12 Acil Çağrı",
  },
];

export const FEATURED_WORKS_DATA = FEATURED_WORKS;

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: "test-1",
    quote:
      "GrowB ile site kurulduktan 48 saat sonra Google Ads'i başlattık; ilk hafta 14 şehirler arası nakliyat işi aldık. Verdikleri garanti sözde değil, sözleşmede.",
    author: "Mehmet Demir",
    role: "Şirket Sahibi",
    company: "Evim Güvende Lojistik",
    avatar: "https://picsum.photos/seed/user1/120/120",
    logo: "📦 EVİM GÜVENDE",
  },
  {
    id: "test-2",
    quote:
      "Çekici sektöründe her saniye hayatidir. Sayfa 1 saniyede açılıyor, müşteri doğrudan arıyor veya WhatsApp'tan konum atıyor. 10 saniye içinde telefonumuza bildirim düşmesi işimizi ikiye katladı.",
    author: "Yiğit Kaya",
    role: "Kurucu Ortak",
    company: "Dalaman Yiğit Oto Kurtarma",
    avatar: "https://picsum.photos/seed/user2/120/120",
    logo: "🚜 YİĞİT KURTARMA",
  },
  {
    id: "test-3",
    quote:
      "Kapadokya'da otelimize yabancı misafir çekmek için rezervasyon motoru kurdular. Aracı komisyon sitelerinden kurtulduk. Doğrudan kurucu ile muhatap olabilmek esnaf için en büyük lüks.",
    author: "Selin Arslan",
    role: "Genel Müdür",
    company: "Kapadokya Cave Retreat",
    avatar: "https://picsum.photos/seed/user3/120/120",
    logo: "🏛️ CAVE RETREAT",
  },
];

export const PRICING_DATA = {
  category: "KOMPLE DİJİTAL MOTOR",
  planName: "Anahtar Teslim Büyüme Paketi",
  description:
    "Web altyapısı, Google Ads arama ağı kurulumu, yerel harita sıralaması ve anlık WhatsApp lead otomasyonunun tamamını kapsayan hepsi-bir-arada büyüme sistemi.",
  price: "20.000 ₺",
  priceSub: "(başlangıç / tek seferlik kurulum bedeli)",
  ctaText: "Bu Paketi Başlatın",
  ctaHref: "#iletisim",
  featuresCol1: [
    "1.2 sn Mobil Satış Sitesi Altyapısı",
    "1 Yıl Kesintisiz Kod & Hata Garantisi",
    "Google İşletme Profili 9 Bölge Optimizasyonu",
    "Google Ads Arama Ağı & Negatif Kelime Kurulumu",
    "10 Saniye Telegram/WhatsApp Bildirim Entegrasyonu",
  ],
  featuresCol2: [
    "%50 Canlı Test Onayı Sonrası Ödeme",
    "İlk 14 Gün Reklam Yönetimi Hediye",
    "GrowB Güvencesi Kurumsal Sözleşmesi",
    "Aylık Şeffaf Çağrı ve ROI Raporu",
    "Doğrudan Kurucu ile 7/24 Teknik Muhataplık",
  ],
};

export const FAQ_DATA: FaqItem[] = [
  {
    id: "faq-1",
    question: "Sistem kaç günde canlıya alınıyor ve telefonlar çalmaya başlıyor?",
    answer:
      "Web altyapısı ve reklam stratejiniz sözleşme onayından sonra ortalama 10-14 iş günü içinde tamamen canlıya alınır. Canlıya çıktığımız gün reklam motoru aktif edilir ve ilk müşteri aramaları telefonunuza düşmeye başlar.",
  },
  {
    id: "faq-2",
    question: "Hazır şablon (WordPress vb.) sitelerden ve diğer ajanslardan farkınız nedir?",
    answer:
      "Biz hantal hazır temalar satmıyoruz. 1.2 saniyenin altında açılan, sıfır kod fazlalığına sahip modern altyapılar kodluyoruz. Ayrıca sadece 'site yapıp kaybolan' bir ekip değiliz; haritalar, reklamlar ve WhatsApp lead otomasyonu ile telefonunuzu her gün çaldıran bir sistem teslim ediyoruz.",
  },
  {
    id: "faq-3",
    question: "Ödeme modeli nasıl işliyor? Param güvende mi?",
    answer:
      "Esnafımızın güvenini korumak için %50 / %50 modeliyle çalışıyoruz. Bütçenin ilk yarısı sözleşmeyle alınır, kalan %50'si ise ancak sistem canlıya geçip test çağrısı kendi cep telefonunuza başarıyla düştüğünde tahsil edilir.",
  },
  {
    id: "faq-4",
    question: "Google Haritalar'da ilk 3'e çıkmak ne kadar sürer?",
    answer:
      "İşletmenizin mevcut durumuna göre 9 temel yerel SEO optimizasyonu ilk hafta tamamlanır. Bölgesel rekabete bağlı olarak 3 ila 6 hafta içinde aramalarda 'Yerel 3'lü Harita Paketi'nde belirgin sıralama artışı sağlanır.",
  },
  {
    id: "faq-5",
    question: "Gelen müşteri talepleri telefonuma tam olarak nasıl ulaşıyor?",
    answer:
      "Sitenizdeki teklif formu veya arama butonu tetiklendiği anda, sistem özel webhook motorumuz üzerinden 10 saniye içinde kurucunun ve satış ekibinizin Telegram / WhatsApp hattına müşterinin adı, telefonu ve seçtiği hizmet bilgisiyle anlık bildirim atar.",
  },
  {
    id: "faq-6",
    question: "Resmi şirket misiniz, sözleşme yapıyor muyuz?",
    answer:
      "Evet. GrowB Dijital; Türkiye geneli hizmet veren, resmi sözleşmeli ve garantili çalışan profesyonel bir büyüme ajansıdır. Her proje başlamadan önce yazılı maddelerle resmi sözleşmeye bağlanır ve %50 test onayından sonra teslim edilir.",
  },
  {
    id: "faq-7",
    question: "Aylık yönetim neleri kapsıyor, her ay ödeme yapmak zorunda mıyım?",
    answer:
      "Web sitesi kurulumundan sonra sitenizin mülkiyeti tamamen sizindir. Aylık yönetim; Google reklamlarınızı her hafta optimize edip boşa tıklamaları elemek, harita sıralamanızı zirvede tutmak ve sunucu güvenliğini sağlamak için isteğe bağlı olarak sunulan bir retainer modelidir.",
  },
  {
    id: "faq-8",
    question: "İş bittikten sonra bir sorun çıkarsa muhatap bulabilecek miyim?",
    answer:
      "Kesinlikle evet. Aracı sekreter veya çağrı merkezi yoktur. Kurucumuz Mehmet Demir'in doğrudan cep telefonu (0541 484 24 26) tüm müşterilerimize açıktır ve 1 yıl boyunca kesintisiz yazılım desteği sunulmaktadır.",
  },
];

export const FINAL_CTA_DATA = {
  scarcityBadge: "🔥 BU AY İÇİN KALAN KONTENJAN: 2 İŞLETME",
  title: "Dükkanınızın Telefonunu Çaldırmaya Hazır mısınız?",
  description:
    "15 dakikalık ücretsiz strateji görüşmesi planlayın; bölgenizdeki pazar potansiyelini, rakip açıklarını ve işletmenize özel büyüme yol haritasını birlikte netleştirelim.",
  ctaText: "15 Dk Görüşme Planla",
  ctaHref: "#iletisim",
  guaranteeText:
    "🔒 %100 Resmi Sözleşmeli Hizmet • %50 Canlı Test Onayı Güvencesi • 1 Yıl Yazılım Desteği",
};
