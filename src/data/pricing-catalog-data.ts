export interface PricingItem {
  name: string;
  scope: string;
  price: string;
  period?: string;
  note?: string;
}

export interface StandaloneServicePricing {
  id: string;
  code: string;
  title: string;
  category: "DİJİTAL VARLIK & REKLAM" | "BÜYÜME & OTOMASYON";
  description: string;
  items: PricingItem[];
  extraRule?: string;
}

export interface PackageComparisonRow {
  label: string;
  serviceCode: string;
  temel: string;
  buyume: string;
  altin: string;
}

export const ESTABLISHMENT_PACKAGES = [
  {
    id: "temel-petek",
    name: "TEMEL PETEK",
    badge: "Hızlı Başlangıç",
    price: "₺39.900",
    rawPrice: 39900,
    originalValue: "₺52.000",
    savings: "₺12.100 Kazanç",
    description: "Dijitale güçlü bir giriş yapmak isteyen işletmeler için temel varlık paketi.",
    deliveryTime: "12 gün",
    revisions: "2 tur ücretsiz",
    maintenanceGift: "1 ay hediye bakım",
    isPopular: false,
    color: "neutral",
  },
  {
    id: "buyume-kovani",
    name: "BÜYÜME KOVANI",
    badge: "En Çok Tercih Edilen 🐝",
    price: "₺89.900",
    rawPrice: 89900,
    originalValue: "₺124.000",
    savings: "₺34.100 Kazanç",
    description: "Sektöründe liderliğe oynayan, ciro ve müşteri akışını katlamak isteyen işletmeler için tam kovan.",
    deliveryTime: "25 gün",
    revisions: "4 tur ücretsiz",
    maintenanceGift: "3 ay hediye bakım",
    isPopular: true,
    color: "gold",
  },
  {
    id: "altin-kovan",
    name: "ALTIN KOVAN",
    badge: "Maksimum Pazar Gücü",
    price: "₺169.900",
    rawPrice: 169900,
    originalValue: "₺238.000",
    savings: "₺68.100 Kazanç",
    description: "E-ticaret, marka dominasyonu ve agresif ciro büyümesi için A'dan Z'ye kapalı devre ekosistem.",
    deliveryTime: "45 gün",
    revisions: "6 tur ücretsiz",
    maintenanceGift: "6 ay hediye bakım",
    isPopular: false,
    color: "amber",
  },
];

export const ESTABLISHMENT_COMPARISON_ROWS: PackageComparisonRow[] = [
  {
    label: "Web Sitesi Altyapısı",
    serviceCode: "01",
    temel: "Başlangıç (5-6 sayfa, hazır tema özelleştirme, mobil uyumlu)",
    buyume: "Kurumsal (8-12 sayfa, özel tasarım, blog, hız optimizasyonu)",
    altin: "E-ticaret Profesyonel Mağaza (250 ürün, sanal POS, kargo/kupon)",
  },
  {
    label: "Marka Kimliği & Logo",
    serviceCode: "04",
    temel: "Logo Temel (2 konsept, 2 revizyon, PNG+JPG)",
    buyume: "Kurumsal Kimlik Standart (Logo Profesyonel + renk/font kılavuzu + kartvizit + antetli)",
    altin: "Kurumsal Kimlik Tam Kapsam (+ sosyal medya şablonları + araç/tabela + 40 sf kılavuz)",
  },
  {
    label: "Google Harita & Yerel SEO",
    serviceCode: "02",
    temel: "Kurulum (Profil açma, kategori/hizmet girişi, 20 fotoğraf)",
    buyume: "Kurulum + Optimizasyon (Rakip analizi, açıklama, ilk yorum stratejisi)",
    altin: "Kurulum + Optimizasyon (Liderlik konumlandırması)",
  },
  {
    label: "CRM & WhatsApp Entegrasyonu",
    serviceCode: "11",
    temel: "WhatsApp İletişim Butonu",
    buyume: "WhatsApp Otomatik Yanıt (Karşılama, menü, mesai dışı mesaj)",
    altin: "CRM + WhatsApp (Müşteri kayıt sistemi, etiketleme, randevu takibi)",
  },
  {
    label: "İçerik & Satış Metinleri",
    serviceCode: "08",
    temel: "Sayfa Metinleri",
    buyume: "Sayfa Metinleri + 10 Reklam Metni Varyantı",
    altin: "Tüm Sayfalar + 10 Reklam Metni + 40 Ürün Açıklaması",
  },
  {
    label: "Video & Reels Prodüksiyonu",
    serviceCode: "07",
    temel: "–",
    buyume: "3 Adet Profesyonel Reels",
    altin: "Tanıtım Videosu (Kurumsal) + 6 Adet Reels",
  },
  {
    label: "Rakip & Pazar Analizi",
    serviceCode: "12",
    temel: "–",
    buyume: "Hızlı Bakış (3 rakip karşılaştırması)",
    altin: "Detaylı Analiz (6 rakip + fırsat haritası)",
  },
  {
    label: "Reklam Hesabı Kurulumu",
    serviceCode: "05/06",
    temel: "–",
    buyume: "1 Kanal Kurulumu (Piksel/dönüşüm dahil)",
    altin: "2 Kanal Kurulumu (Meta + Google Piksel & Dönüşüm)",
  },
  {
    label: "Analitik & İzleme",
    serviceCode: "13",
    temel: "✓ GA4 & Temel İzleme",
    buyume: "✓ GA4, GTM, Piksel & Dönüşüm Hedefleri",
    altin: "✓ GA4, GTM, Gelişmiş E-ticaret Dönüşüm Hedefleri",
  },
  {
    label: "Danışmanlık & Eğitim",
    serviceCode: "13",
    temel: "1 saat teslim eğitimi",
    buyume: "3 saat strateji & büyüme danışmanlığı",
    altin: "12 aylık dijital büyüme yol haritası + 6 saat strateji",
  },
  {
    label: "Teslim Süresi",
    serviceCode: "–",
    temel: "12 gün",
    buyume: "25 gün",
    altin: "45 gün",
  },
  {
    label: "Ücretsiz Revizyon Hakkı",
    serviceCode: "–",
    temel: "2 tur",
    buyume: "4 tur",
    altin: "6 tur",
  },
  {
    label: "Bakım & Destek Hediyesi",
    serviceCode: "–",
    temel: "1 ay hediye",
    buyume: "3 ay hediye",
    altin: "6 ay hediye",
  },
];

export const MONTHLY_GROWTH_PACKAGES = [
  {
    id: "aylik-temel",
    name: "TEMEL",
    badge: "Düzenli Varlık",
    price: "₺14.900",
    period: "/ ay",
    originalValue: "₺19.500",
    description: "Dijital varlığını düzenli ve profesyonel tutmak isteyen yerel işletmeler için.",
    socialMedia: "2 platform, 12 içerik",
    reels: "2 Reels",
    localSeo: "✓ Sıralama ve yorum takibi",
    seo: "–",
    adsManagement: "–",
    content: "Post metinleri",
    crmSupport: "–",
    siteMaintenance: "✓ Güncelleme, yedek, güvenlik",
    reporting: "Aylık rapor",
    competitorTracking: "–",
    responseTime: "48 saat",
    isPopular: false,
  },
  {
    id: "aylik-buyume",
    name: "BÜYÜME",
    badge: "En Popüler 🚀",
    price: "₺32.900",
    period: "/ ay",
    originalValue: "₺45.500",
    description: "Ciro akışını her gün büyütmek ve düzenli sıcak müşteri kazanmak isteyen işletmeler için.",
    socialMedia: "3 platform, 20 içerik",
    reels: "5 Reels",
    localSeo: "✓ Sıralama ve aktif yorum yönetimi",
    seo: "Temel (Teknik bakım, 2 blog, 10 kelime)",
    adsManagement: "Tek Kanal Yönetimi (Meta veya Google)",
    content: "Post metinleri + 5 reklam metni",
    crmSupport: "Bakım & Destek",
    siteMaintenance: "✓ Güncelleme, yedek, güvenlik",
    reporting: "Aylık rapor + 1 saat strateji toplantısı",
    competitorTracking: "–",
    responseTime: "24 saat",
    isPopular: true,
  },
  {
    id: "aylik-pro",
    name: "PRO",
    badge: "Agresif Pazar Liderliği",
    price: "₺59.900",
    period: "/ ay",
    originalValue: "₺89.000",
    description: "Sektöründe mutlak hakimiyet kurmak isteyen ölçeklenmiş markalar için kapalı devre yönetim.",
    socialMedia: "4 platform, 30 içerik",
    reels: "10 Reels",
    localSeo: "✓ Tam kapsamlı yerel dominasyon",
    seo: "Kapsamlı (Teknik + on-sayfa, 4 blog, 30 kelime, backlink)",
    adsManagement: "Çift Kanal (Meta + Google)",
    content: "Post metinleri + 10 reklam metni + 2 blog",
    crmSupport: "Bakım + akış geliştirme",
    siteMaintenance: "✓ Öncelikli güncelleme & yedek",
    reporting: "2 haftalık rapor + canlı analitik dashboard",
    competitorTracking: "3 ayda bir detaylı analiz",
    responseTime: "Aynı gün",
    isPopular: false,
  },
];

export const STANDALONE_SERVICES_PRICING: StandaloneServicePricing[] = [
  {
    id: "web-tasarim",
    code: "01",
    title: "Web Tasarım & Yazılım",
    category: "DİJİTAL VARLIK & REKLAM",
    description: "1.2 saniyede açılan, mobil kusursuz, doğrudan satış ve arama odaklı modern web altyapıları.",
    items: [
      { name: "Başlangıç Paketi", scope: "5-6 sayfa, hazır tema özelleştirme, mobil uyumlu, iletişim formu", price: "₺24.000" },
      { name: "Kurumsal Paket", scope: "8-12 sayfa, özel tasarım, blog altyapısı, WhatsApp entegrasyonu, hız optimizasyonu", price: "₺45.000" },
      { name: "Premium Paket", scope: "15+ sayfa, tamamen özel tasarım, çoklu dil, animasyon, rezervasyon/randevu modülü", price: "₺78.000" },
      { name: "Landing Page", scope: "Tek sayfa, yüksek dönüşüm odaklı, A/B teste hazır satış sayfası", price: "₺11.000" },
      { name: "Ek Sayfa", scope: "Mevcut projeye ilave sayfa tasarımı ve kodlaması", price: "₺3.000" },
      { name: "Mevcut Site Yenileme", scope: "Tasarım revizyonu, hızlandırma ve içerik taşıma", price: "₺18.000'den başlayan" },
    ],
  },
  {
    id: "e-ticaret",
    code: "10",
    title: "E-Ticaret & Satış Sistemleri",
    category: "BÜYÜME & OTOMASYON",
    description: "7/24 online satış, sanal POS ve kargo entegrasyonlu güvenli online mağazalar.",
    items: [
      { name: "Mini Mağaza", scope: "50 ürüne kadar, sanal POS, tek kargo entegrasyonu", price: "₺58.000" },
      { name: "Profesyonel Mağaza", scope: "250 ürün, çoklu kargo, kupon/kampanya modülü, üyelik sistemi", price: "₺95.000" },
      { name: "Kurumsal Mağaza", scope: "Sınırsız ürün, pazaryeri entegrasyonu, ERP/muhasebe bağlantısı, B2B fiyatlandırma", price: "₺165.000" },
      { name: "Ürün Yükleme Paketi", scope: "20 ürün için profesyonel görsel işleme + SEO açıklama girişi", price: "₺4.500" },
      { name: "Pazaryeri Entegrasyonu", scope: "Trendyol ve Hepsiburada çift yönlü mağaza bağlantısı", price: "₺12.000" },
    ],
  },
  {
    id: "grafik-tasarim",
    code: "04",
    title: "Grafik Tasarım & Marka Kimliği",
    category: "DİJİTAL VARLIK & REKLAM",
    description: "Akılda kalıcı logo, kurumsal renk paleti ve güven veren görsel tasarım dili.",
    items: [
      { name: "Logo – Temel", scope: "2 konsept, 2 revizyon turu, PNG + JPG teslim", price: "₺7.500" },
      { name: "Logo – Profesyonel", scope: "4 konsept, 4 revizyon turu, vektör dosyalar, yatay/dikey/ikon varyantları", price: "₺15.000" },
      { name: "Logo – Premium", scope: "6 konsept, sınırsız revizyon, tüm varyantlar, animasyonlu logo, kullanım kılavuzu", price: "₺28.000" },
      { name: "Kurumsal Kimlik – Standart", scope: "Logo (Profesyonel) + renk/font kılavuzu + kartvizit + antetli kağıt", price: "₺32.000" },
      { name: "Kurumsal Kimlik – Tam Kapsam", scope: "Standart + sosyal medya şablonları + araç/tabela uygulaması + 40 sayfalık marka kılavuzu", price: "₺58.000" },
      { name: "Sosyal Medya Görseli (Tekil)", scope: "Tekil post veya story tasarımı", price: "₺750" },
      { name: "Katalog / Broşür Tasarımı", scope: "8-12 sayfa profesyonel ürün/hizmet kataloğu", price: "₺14.000" },
      { name: "Ambalaj / Etiket Tasarımı", scope: "Ürün başına özgün ambalaj veya etiket tasarımı", price: "₺9.000" },
    ],
  },
  {
    id: "google-harita",
    code: "02",
    title: "Google Harita & Yerel SEO",
    category: "DİJİTAL VARLIK & REKLAM",
    description: "Bölgesel aramalarda 1. sıraya çıkın, telefonlarınız doğrudan çalsın.",
    items: [
      { name: "Kurulum Paketi", scope: "Profil açma, kategori ve hizmet girişi, ilk 20 fotoğraf optimizasyonu", price: "₺7.500" },
      { name: "Kurulum + Optimizasyon", scope: "Kurulum + bölgesel rakip analizi, açıklama metni, ilk yorum stratejisi", price: "₺14.000" },
      { name: "Çoklu Şube Kurulumu", scope: "Şube başına merkezi yönetim paneli ve harita kurulumu", price: "₺5.500 / şube" },
      { name: "Aylık Yerel SEO Takibi", scope: "Sıralama takibi, yorum yönetimi, haftalık harita gönderisi", price: "₺7.500 / ay" },
    ],
  },
  {
    id: "sosyal-medya",
    code: "03",
    title: "Sosyal Medya Yönetimi",
    category: "DİJİTAL VARLIK & REKLAM",
    description: "Prestijinizi zirveye taşıyan, düzenli ve etkileyici içerik ve topluluk akışı.",
    items: [
      { name: "Temel Paket", scope: "2 platform, 8 post + 6 story", price: "₺11.000 / ay" },
      { name: "Standart Paket", scope: "3 platform, 16 post + 15 story + 4 reels", price: "₺22.000 / ay" },
      { name: "Pro Paket", scope: "4 platform, 26 post + günlük story + 10 reels + topluluk yönetimi", price: "₺38.000 / ay" },
      { name: "Ekstra Platform Ekleme", scope: "LinkedIn, Pinterest veya X yönetimi", price: "₺4.500 / ay" },
      { name: "Topluluk & Mesaj Yönetimi", scope: "DM ve yorumları mesai saatleri içinde hızlı yanıtlama", price: "₺6.500 / ay" },
    ],
  },
  {
    id: "reklam-yonetimi",
    code: "05 & 06",
    title: "Reklam Yönetimi (Meta & Google Ads)",
    category: "DİJİTAL VARLIK & REKLAM",
    description: "Doğrudan satış ve sıcak müşteri kazandıran, bütçeyi kuruşuna kadar koruyan reklam kurguları.",
    items: [
      { name: "Tek Kanal Yönetimi", scope: "Meta veya Google, 2 aktif kampanya, aylık şeffaf rapor", price: "₺9.500 / ay" },
      { name: "Çift Kanal Yönetimi", scope: "Meta + Google, 4 aktif kampanya, 2 haftalık rapor", price: "₺17.500 / ay" },
      { name: "Performans Paketi", scope: "3+ kanal, sınırsız kampanya, remarketing, dönüşüm optimizasyonu, haftalık rapor", price: "₺30.000 / ay" },
      { name: "Reklam Hesabı Kurulumu", scope: "Tek seferlik piksel, dönüşüm API ve analitik kurulumu", price: "₺6.500" },
    ],
    extraRule: "Bütçe komisyonu kuralı: Aylık reklam bütçesi ₺30.000'i aşarsa, aşan kısım üzerinden %12 ek yönetim ücreti uygulanır.",
  },
  {
    id: "seo-organik",
    code: "09",
    title: "SEO & Organik Görünürlük",
    category: "BÜYÜME & OTOMASYON",
    description: "Reklam bütçesine bağımlı kalmadan Google'da kalıcı, reklamsız müşteri akışı.",
    items: [
      { name: "Temel SEO", scope: "Teknik bakım, 2 blog yazısı, 10 anahtar kelime takibi, aylık rapor", price: "₺14.000 / ay" },
      { name: "Kapsamlı SEO", scope: "Teknik + on-sayfa optimizasyon, 4 blog, 30 kelime, backlink çalışması", price: "₺28.000 / ay" },
      { name: "Agresif SEO", scope: "Kapsamlı + 8 blog, 80 kelime, dijital PR, rakip içerik açığı analizi", price: "₺52.000 / ay" },
      { name: "SEO Teknik Denetim", scope: "Tek seferlik, 60+ maddelik kapsamlı teknik denetim raporu", price: "₺12.000" },
    ],
  },
  {
    id: "video-reels",
    code: "07",
    title: "Video, Reels & AI Prodüksiyon",
    category: "BÜYÜME & OTOMASYON",
    description: "Algoritmaları fetheden dinamik dikey videolar, reels ve yapay zekâ destekli kurgular.",
    items: [
      { name: "Reels – Kurgu Paketi", scope: "Müşteri çekimi ham görüntüler, kurgu + altyazı + müzik + efekt", price: "₺2.200 / adet" },
      { name: "Reels – Prodüksiyon", scope: "Yerinde çekim + profesyonel kurgu, tam paket", price: "₺4.500 / adet" },
      { name: "Reels – AI Prodüksiyon", scope: "Yapay zekâ görsel ve seslendirme ile sıfırdan içerik üretimi", price: "₺5.500 / adet" },
      { name: "Tanıtım Videosu – Kısa", scope: "Yarım gün çekim, kurgu, 60-90 saniye", price: "₺22.000" },
      { name: "Tanıtım Videosu – Kurumsal", scope: "Tam gün çekim, senaryo, drone hava çekimi, 2-3 dakika", price: "₺48.000" },
      { name: "Ürün Fotoğraf Çekimi", scope: "Günlük stüdyo/mekân çekimi, 20 ürün", price: "₺18.000" },
      { name: "Aylık Video Paketi", scope: "8 reels, düzenli aylık çekim günü", price: "₺28.000 / ay" },
    ],
  },
  {
    id: "icerik-yazarligi",
    code: "08",
    title: "İçerik Yazarlığı & Satış Metni",
    category: "BÜYÜME & OTOMASYON",
    description: "Ziyaretçiyi ikna eden, güven veren ve satın almaya yönlendiren profesyonel metinler.",
    items: [
      { name: "Blog Yazısı – Standart", scope: "800-1000 kelime, SEO ve anahtar kelime uyumlu", price: "₺1.800" },
      { name: "Blog Yazısı – Kapsamlı", scope: "1500-2000 kelime, görsel + iç linkleme stratejisi", price: "₺3.200" },
      { name: "Web Sitesi Metinleri", scope: "Sayfa başına psikolojik satış odaklı metin yazımı", price: "₺2.500 / sayfa" },
      { name: "Reklam Metni Seti", scope: "A/B test için 10 farklı ikna edici reklam varyantı", price: "₺3.500" },
      { name: "Ürün Açıklaması Paketi", scope: "20 ürün için ikna edici e-ticaret açıklaması", price: "₺4.000" },
      { name: "E-Posta / Newsletter", scope: "Kampanya başına e-posta satış bülteni kurgusu", price: "₺2.200" },
    ],
  },
  {
    id: "crm-whatsapp",
    code: "11",
    title: "CRM & WhatsApp Takip Otomasyonu",
    category: "BÜYÜME & OTOMASYON",
    description: "Müşteri adaylarını kaçırmayan akıllı karşılama, otomatik yanıt ve randevu takibi.",
    items: [
      { name: "WhatsApp Otomatik Yanıt", scope: "Karşılama, akıllı buton menü, mesai dışı mesaj kurulumu", price: "₺11.000" },
      { name: "CRM + WhatsApp Entegre", scope: "Müşteri kayıt sistemi, etiketleme, aşama ve randevu takibi", price: "₺24.000" },
      { name: "Tam Otomasyon Paketi", scope: "CRM + WhatsApp + form/reklam entegrasyonu + otomatik hatırlatma akışları", price: "₺42.000" },
      { name: "Aylık Bakım & Akış Geliştirme", scope: "Aylık otomasyon bakımı ve yeni mesaj senaryoları", price: "₺5.500 / ay" },
    ],
  },
  {
    id: "rakip-pazar",
    code: "12",
    title: "Rakip & Pazar Analizi",
    category: "BÜYÜME & OTOMASYON",
    description: "Sektördeki açıkları tespit eden, rakiplerin önüne geçiren stratejik büyüme haritası.",
    items: [
      { name: "Hızlı Bakış", scope: "3 rakip incelemesi, dijital varlık ve reklam karşılaştırması", price: "₺8.500" },
      { name: "Detaylı Analiz", scope: "6 rakip, reklam/SEO/sosyal medya kırılımı, fırsat haritası", price: "₺18.000" },
      { name: "Stratejik Rapor", scope: "10 rakip + pazar büyüklüğü + 12 aylık büyüme yol haritası", price: "₺35.000" },
    ],
  },
  {
    id: "raporlama-danismanlik",
    code: "13",
    title: "Raporlama & Danışmanlık",
    category: "BÜYÜME & OTOMASYON",
    description: "Kuruşuna kadar şeffaf, ölçülebilir ve sürekli ilerleyen büyüme rehberliği.",
    items: [
      { name: "Analitik Kurulumu", scope: "GA4, GTM, Meta Pixel ve dönüşüm hedefleri", price: "₺6.500" },
      { name: "Aylık Raporlama & Danışmanlık", scope: "Dashboard + detaylı rapor + 1 saat canlı strateji görüşmesi", price: "₺7.000 / ay" },
      { name: "Danışmanlık (Saatlik)", scope: "1 saatlik birebir dijital büyüme ve strateji seansı", price: "₺3.500" },
      { name: "Dijital Strateji & Yol Haritası", scope: "Tek seferlik, 3-6 aylık uygulama planı", price: "₺22.000" },
      { name: "Kurum İçi Eğitim", scope: "Yarım gün, 10 kişiye kadar kurumsal dijital pazarlama eğitimi", price: "₺25.000" },
      { name: "Web Sitesi Bakım & Hosting Desteği", scope: "Güncelleme, yedek alma, güvenlik koruması", price: "₺4.500 / ay" },
    ],
  },
];

export const COMMERCIAL_TERMS = [
  "Fiyatlar KDV hariçtir. Reklam bütçesi hizmet ücretine dahil değildir.",
  "Kuruluş paketlerinde ödeme: %50 başlangıç, %50 teslimde. ₺100.000 üzeri projelerde 3 taksit imkânı sunulur.",
  "Aylık paketlerde asgari taahhüt süresi 3 aydır; ödemeler ay başında peşin olarak tahsil edilir.",
  "Peşin Ödeme İndirimi: 6 ay peşin ödemede %5, 12 ay peşin ödemede %10 nakit indirim uygulanır.",
  "Kuruluş paketi alan müşterilerimiz, aylık büyüme paketlerine ilk 3 ay %15 indirimli geçiş hakkı kazanır.",
  "Belirtilen revizyon turları dışındaki talepler, saatlik danışmanlık ücreti (₺3.500/saat) üzerinden faturalandırılır. (Sınırsız revizyon güvencesi yalnızca Logo Premium paketine özeldir).",
  "Alan adı (domain), kurumsal hosting ve varsa harici üçüncü taraf lisans bedelleri müşteriye aittir (yıllık ortalama ₺4.000 - ₺8.000).",
  "Verilen tüm resmi fiyat teklifleri, teklif tarihinden itibaren 15 gün süreyle geçerlidir.",
];
