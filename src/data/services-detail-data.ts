export interface ServiceDetail {
  slug: string;
  num: string;
  title: string;
  category: "DİJİTAL VARLIK & REKLAM" | "BÜYÜME & OTOMASYON";
  tagline: string;
  heroDesc: string;
  deliverables: string[];
  howItWorks: string[];
  metricsResult: string;
  badge: string;
  image: string;
}

export const ALL_13_SERVICES_DETAILED: ServiceDetail[] = [
  {
    slug: "web-tasarim-yazilim",
    num: "01",
    title: "Web Tasarım & Yazılım",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "1.2 saniyede açılan, mobil kusursuz ve doğrudan sıcak müşteri aratan modern satış siteleri.",
    heroDesc: "Yavaş açılan hazır temaları ve boşa harcanan bütçeleri unutun. Next.js ve Cloudflare altyapısıyla sıfırdan kodlanan, Google Haritalar ile entegre ve her ziyaretçiyi doğrudan telefon aramasına dönüştüren kapalı devre web motorları inşa ediyoruz.",
    deliverables: [
      "Next.js 14 & React altyapısıyla 1.2s ultrasonik açılış hızı",
      "Mobil öncelikli, tek tıkla arama ve WhatsApp yönlendirmeli UX tasarımı",
      "Google PageSpeed & Core Web Vitals 95+ yeşil skor garantisi",
      "SSL, Cloudflare kurumsal CDN ve DDoS koruması",
      "Resmi sözleşmeyle 1 yıl kesintisiz teknik destek ve bakım"
    ],
    howItWorks: [
      "1. Aşama: İşletmenizin hedef kitlesini ve rakiplerin zayıf noktalarını analiz ediyoruz.",
      "2. Aşama: Satın alma niyetindeki müşterileri ikna eden özel arayüzü tasarlıyoruz.",
      "3. Aşama: En güncel kod standartlarıyla 1.2 sn açılış hızında yayına alıyoruz."
    ],
    metricsResult: "+%80 Daha Fazla Telefon Araması",
    badge: "Ultrasonik Hız",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "google-harita-yerel-seo",
    num: "02",
    title: "Google Harita & Yerel SEO",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "Bölgenizdeki her aramada Google Haritalar'da 1. sıraya oturun, müşteriler doğrudan sizi arasın.",
    heroDesc: "Yerel işletmeler için en yüksek dönüşüm oranı Google Haritalar'dan gelir. Bölgenizde hizmetinizi arayan müşterilerin rakip dükkanlara değil, doğrudan size ulaşmasını sağlayan 3'lü yerel paket (Local Pack) optimizasyonu yapıyoruz.",
    deliverables: [
      "Google Benim İşletmem (GBP) profilinin A'dan Z'ye profesyonel kurulumu",
      "Bölgesel anahtar kelimelerde harita 1. sıra konumlandırması",
      "5.0 yıldızlı müşteri yorumu artırma ve itibar yönetim stratejisi",
      "NAP (İsim, Adres, Telefon) tutarlılığı ile yerel dizin kayıtları",
      "Haftalık ve aylık harita arama/yol tarifi performans raporları"
    ],
    howItWorks: [
      "1. Aşama: Bölgenizdeki arama hacimlerini ve rakiplerin harita sinyallerini tarıyoruz.",
      "2. Aşama: İşletme profilinizi eksiksiz optimize edip yerel otorite inşa ediyoruz.",
      "3. Aşama: 1. sıraya yükselen profilinizle telefonlarınızın çalmasını izliyoruz."
    ],
    metricsResult: "Google Harita 1. Sıra Hakimiyeti",
    badge: "Yerel Liderlik",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "sosyal-medya-yonetimi",
    num: "03",
    title: "Sosyal Medya Yönetimi",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "Marka prestijinizi zirveye taşıyan, güven veren ve düzenli içerik akışı.",
    heroDesc: "Sosyal medyada var olmak sadece resim paylaşmak değildir. Potansiyel müşterilerinizin güvenini kazanan, profilinizi ziyaret edeni anında müşteriye çeviren ve algoritmayı lehinize çalıştıran bir vitrin kuruyoruz.",
    deliverables: [
      "Aylık profesyonel içerik planı ve takvimi",
      "Kurumsal renklerinizle uyumlu premium post ve hikaye tasarımları",
      "Etkileşim odaklı metin yazarlığı ve hashtag stratejisi",
      "Gelen DM ve yorumların hızlıca satışa yönlendirilmesi",
      "Aylık büyüme ve etkileşim analiz raporu"
    ],
    howItWorks: [
      "1. Aşama: Marka dilinizi ve sektörünüze en uygun görsel tarzı belirliyoruz.",
      "2. Aşama: Düzenli ve kaliteli içeriklerle takipçileri sadık müşterilere dönüştürüyoruz.",
      "3. Aşama: Sürekli etkileşim analiziyle profilinizi canlı ve prestijli tutuyoruz."
    ],
    metricsResult: "3 Kat Artan Profil Ziyareti",
    badge: "Kurumsal İtibar",
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "grafik-tasarim-kurumsal-kimlik",
    num: "04",
    title: "Grafik Tasarım & Kurumsal Kimlik",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "Akılda kalıcı logo, güven veren renk paletleri ve kurumsal tasarım dili.",
    heroDesc: "İlk izlenim saniyeler içinde oluşur. İşletmenizi rakiplerinizden ayıran, kurumsal gücünüzü hissettiren ve müşterinizin zihninde silinmez iz bırakan bir marka kimliği tasarlıyoruz.",
    deliverables: [
      "Özgün, tescile uygun profesyonel logo tasarımı",
      "Kurumsal renk paleti ve tipografi rehberi",
      "Kartvizit, antetli kağıt, dosya ve kurumsal evrak tasarımları",
      "Sosyal medya profil ve kapak tasarımları",
      "Marka kimliği kullanım kılavuzu (Brandbook)"
    ],
    howItWorks: [
      "1. Aşama: Sektörünüzü, hedef kitlenizi ve marka vizyonunuzu analiz ediyoruz.",
      "2. Aşama: Farklı konsept tasarımlar hazırlayıp birlikte mükemmelleştiriyoruz.",
      "3. Aşama: Baskıya ve dijitale hazır tüm formatları teslim ediyoruz."
    ],
    metricsResult: "%100 Özgün Marka İmajı",
    badge: "Kreatif Tasarım",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "meta-reklam-yonetimi",
    num: "05",
    title: "Meta Reklam Yönetimi (Instagram & Facebook)",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "Boşa harcanan bütçelere son. Doğrudan WhatsApp ve arama getiren hedefli reklamlar.",
    heroDesc: "Instagram ve Facebook'ta 'gönderiyi öne çıkar' butonuyla para yakmaktan vazgeçin. Satın alma potansiyeli en yüksek kitleyi hedefleyen, yüksek ROAS sağlayan ve telefonu susmayan kapalı devre reklam kampanyaları yönetiyoruz.",
    deliverables: [
      "Meta Business Manager ve Dönüşüm API kurulumu",
      "Yüksek dönüşümlü görsel ve video reklam kreatifleri",
      "Yapay zeka destekli detaylı hedef kitle segmentasyonu",
      "Retargeting (yeniden pazarlama) ile kaçan müşterileri yakalama",
      "Günlük bütçe takibi ve haftalık şeffaf ROI raporlaması"
    ],
    howItWorks: [
      "1. Aşama: Hedef kitlenizin demografik ve davranışsal haritasını çıkarıyoruz.",
      "2. Aşama: Dikkat çeken reklam videoları ve metinleriyle kampanyaları başlatıyoruz.",
      "3. Aşama: A/B testleriyle maliyetleri düşürüp satış hacmini katlıyoruz."
    ],
    metricsResult: "4.8x Ortalama ROAS",
    badge: "Yüksek Satış",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "google-ads-reklamlari",
    num: "06",
    title: "Google Ads Arama & Harita Reklamları",
    category: "DİJİTAL VARLIK & REKLAM",
    tagline: "Müşteri tam satın alma anında arama yaptığında en tepede siz olun.",
    heroDesc: "İhtiyacı olan kişi Google'da arama yaptığı an karşısına çıkmak, dijitaldeki en sıcak satış fırsatıdır. Negatif anahtar kelimelerle korunan ve her tıklamayı doğrudan telefon aramasına bağlayan Google Ads kampanyaları kurguluyoruz.",
    deliverables: [
      "Google Arama Ağı ve Harita Reklamları kurulumu",
      "500+ negatif anahtar kelime filtresiyle bütçe koruması",
      "Tıklama başına maliyetleri (CPC) düşüren kalite puanı optimizasyonu",
      "Doğrudan 'Telefon Et' uzantıları ve dönüşüm izleme",
      "Haftalık şeffaf harcama ve arama performansı raporları"
    ],
    howItWorks: [
      "1. Aşama: Sektörünüzde en çok satın alma getiren yüksek niyetli kelimeleri seçiyoruz.",
      "2. Aşama: Reklamları sadece gerçek müşterilere görünecek şekilde kurguluyoruz.",
      "3. Aşama: Gereksiz aramaları engelleyerek bütçenizi en verimli şekilde kullanıyoruz."
    ],
    metricsResult: "%0 Boşa Harcanan Bütçe",
    badge: "Sıcak Satış",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "video-reels-ai-produksiyon",
    num: "07",
    title: "Video, Reels & AI Prodüksiyon",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Algoritmaları fetheden, kaydırıp geçilmeyen dinamik dikey videolar.",
    heroDesc: "Günümüzde en hızlı müşteri kazandıran format dikey videodur. İşletmenizi modern gösteren, güven aşılayan ve izleyeni anında harekete geçiren 4K Reels ve yapay zeka destekli video serileri üretiyoruz.",
    deliverables: [
      "Kanca (Hook) odaklı ilk 3 saniyeyi yakalayan senaryolar",
      "4K dikey video kurgusu, altyazı ve ses miksajı",
      "Trend müzikler ve algoritmaya uygun tempo",
      "Yapay zeka destekli görsel efektler ve seslendirmeler",
      "Instagram, TikTok ve YouTube Shorts için optimize edilmiş formatlar"
    ],
    howItWorks: [
      "1. Aşama: Sektörünüzde viral olan video dinamiklerini analiz ediyoruz.",
      "2. Aşama: İşletmenizin hizmetlerini en etkileyici şekilde senaryolaştırıyoruz.",
      "3. Aşama: Yüksek tempolu kurgularla yayınlayıp izlenme ve dönüşümü takip ediyoruz."
    ],
    metricsResult: "10 Kat Fazla Organik Erişim",
    badge: "Viral Etki",
    image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "icerik-yazarligi-satis-metni",
    num: "08",
    title: "İçerik Yazarlığı & Satış Metni (Copywriting)",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Ziyaretçiyi sayfada tutan ve tek tıkla satın almaya ikna eden kelimeler.",
    heroDesc: "Tasarım gözü çeker, kelimeler ise satış yaptırır. Ziyaretçilerinizin zihnindeki şüpheleri yok eden, güven inşa eden ve doğrudan harekete geçiren yüksek dönüşümlü satış metinleri yazıyoruz.",
    deliverables: [
      "Dönüşüm odaklı web sitesi ana sayfa ve hizmet metinleri",
      "Reklam kampanyaları için tıklama garantili başlıklar",
      "WhatsApp satış kapama şablonları",
      "Google SEO uyumlu, bilgi verici sektörel rehberler",
      "Müşteri itirazlarını peşinen çürüten SSS metinleri"
    ],
    howItWorks: [
      "1. Aşama: Müşterilerinizin en çok sorduğu soruları ve korkularını tespit ediyoruz.",
      "2. Aşama: İkna psikolojisi kurallarına göre metinleri kaleme alıyoruz.",
      "3. Aşama: Arayüzle birleştirerek ziyaretçileri doğrudan müşteriye çeviriyoruz."
    ],
    metricsResult: "+%65 Dönüşüm Oranı Artışı",
    badge: "Satış Metinleri",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "seo-organik-gorunurluk",
    num: "09",
    title: "SEO & Organik Görünürlük",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Reklam vermeyi bıraktığınızda bile durmayan kesintisiz müşteri akışı.",
    heroDesc: "Reklamlar para harcadıkça çalışır, SEO ise kalıcı bir servettir. Google'ın ilk sayfasında doğal olarak üst sıralara yerleşerek her gün ücretsiz ve kaliteli müşteri kazanmanızı sağlıyoruz.",
    deliverables: [
      "Site içi teknik SEO ve hız optimizasyonu",
      "Yüksek hacimli anahtar kelime haritası ve içerik stratejisi",
      "Kaliteli geri bağlantı (Backlink) ve otorite inşası",
      "Mobil uyumluluk ve yapılandırılmış veri (Schema) kurulumu",
      "Aylık anahtar kelime sıralama ve organik trafik raporu"
    ],
    howItWorks: [
      "1. Aşama: Sitenizin teknik SEO hatalarını tespit edip sıfırlıyoruz.",
      "2. Aşama: Sektörünüzde en çok aranan kelimeler için özel sayfalar oluşturuyoruz.",
      "3. Aşama: Otoriter bağlantılarla Google'da kalıcı olarak 1. sayfaya yerleşiyoruz."
    ],
    metricsResult: "Kalıcı ve Ücretsiz Müşteri Akışı",
    badge: "Organik Liderlik",
    image: "https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "e-ticaret-satis-sistemleri",
    num: "10",
    title: "E-Ticaret & Satış Sistemleri",
    category: "BÜYÜME & OTOMASYON",
    tagline: "7/24 online sipariş toplayan, kargo ve sanal POS entegreli mağaza motoru.",
    heroDesc: "Ürünlerinizi sadece dükkanda değil, tüm Türkiye'ye satmak için hızlı, güvenli ve sepet terk etme oranını minimuma indiren modern e-ticaret altyapıları kuruyoruz.",
    deliverables: [
      "Hızlı ödeme (Tek sayfa checkout) mimarisi",
      "İyzico, PayTR vb. tüm sanal POS ve taksit entegrasyonları",
      "Yurtiçi, Aras, MNG vb. otomatik kargo barkod sistemi",
      "Mobil uyumlu dinamik ürün filtreleme ve sepet hatırlatma",
      "Stok ve sipariş yönetim paneli eğitimi"
    ],
    howItWorks: [
      "1. Aşama: Ürün kataloğunuzu ve kategori yapınızı optimize ediyoruz.",
      "2. Aşama: Kolay alışveriş sağlayan modern mağaza arayüzünü kodluyoruz.",
      "3. Aşama: Ödeme ve kargo sistemlerini bağlayıp ilk siparişinizi alıyoruz."
    ],
    metricsResult: "7/24 Otomatik Satış",
    badge: "Online Mağaza",
    image: "https://images.unsplash.com/photo-1556742049-0a67c5574f73?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "crm-whatsapp-takip",
    num: "11",
    title: "CRM & WhatsApp Satış Takip",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Gece gelen talepler dahil tek bir müşteriyi bile kaçırmayan akıllı satış hattı.",
    heroDesc: "Reklamla müşteri getirmek işin yarısıdır; asıl para satışın hızlı kapatılmasında kazanılır. Gelen her talebi 3 saniyede karşılayan, temsilcinizin telefonuna bildiren ve takip eden otomasyonlar kuruyoruz.",
    deliverables: [
      "Resmi WhatsApp Business API entegrasyonu",
      "3 saniyede yanıt veren akıllı karşılama ve randevu botu",
      "Müşteri adaylarını takip eden basit ve güçlü CRM paneli",
      "Kaçan müşterileri geri kazandıran otomatik hatırlatma mesajları",
      "Satış temsilcisi performans takibi"
    ],
    howItWorks: [
      "1. Aşama: Müşteri iletişim akışınızı ve sık sorulan soruları haritalıyoruz.",
      "2. Aşama: WhatsApp botunu ve CRM tablosunu sisteme entegre ediyoruz.",
      "3. Aşama: Hiçbir müşterinin cevapsız kalmadığı kusursuz bir satış hattı işletiyoruz."
    ],
    metricsResult: "%0 Müşteri Kaybı",
    badge: "Akıllı Otomasyon",
    image: "https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "rakip-pazar-analizi",
    num: "12",
    title: "Pazar, Sektör & Rakip Analizi",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Rakiplerinizin nerelerden müşteri aldığını ve açıklarını ortaya çıkaran strateji.",
    heroDesc: "Karanlıkta kurşun sıkmayın. Bölgenizdeki ve sektörünüzdeki rakiplerin hangi kelimelerden para kazandığını, ne kadar reklam harcadığını ve zayıf yönlerini analiz ederek pazar payını elinizden almalarını engelliyoruz.",
    deliverables: [
      "Rakiplerin Google Ads anahtar kelime ve bütçe röntgeni",
      "Organik arama ve harita sıralama açıkları raporu",
      "Fiyat ve hizmet konumlandırma stratejisi",
      "Sektörünüzde hızla büyüyen yeni fırsat alanları dökümü",
      "Uygulanabilir 90 günlük agresif büyüme yol haritası"
    ],
    howItWorks: [
      "1. Aşama: En güçlü 5 rakibinizi profesyonel SEO araçlarıyla tarıyoruz.",
      "2. Aşama: Rakiplerin göremediği ve müşteri kaçırdığı noktaları listeliyoruz.",
      "3. Aşama: Bu açıkları kapatacak stratejiyle pazarda liderliğe oynuyoruz."
    ],
    metricsResult: "Net Pazar Hakimiyeti",
    badge: "Büyüme Stratejisi",
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1200&auto=format&fit=crop&q=80"
  },
  {
    slug: "aylik-buyume-danismanligi",
    num: "13",
    title: "Aylık Büyüme Danışmanlığı & Raporlama",
    category: "BÜYÜME & OTOMASYON",
    tagline: "Kuruşuna kadar şeffaf, ölçülebilir ve patronla birebir ilerleyen ROI ortaklığı.",
    heroDesc: "Biz bir kez iş yapıp kaybolanlardan değiliz. Sloganımızda dediğimiz gibi: 'Sadece ajans değil, büyüme ortağınız.' Her ay yapılan harcamaların ve gelen ciroların hesabını veriyor, birlikte büyüyoruz.",
    deliverables: [
      "Her ay kuruşu kuruşuna şeffaf ROI ve harcama tablosu",
      "Patronla aylık birebir görüntülü strateji ve durum değerlendirme seansı",
      "Telefon aramaları, WhatsApp formları ve satış metrikleri denetimi",
      "Bir sonraki ayın büyüme hedeflerinin belirlenmesi",
      "Acil durumlarda 7/24 doğrudan kurucu iletişim hattı"
    ],
    howItWorks: [
      "1. Aşama: Dijitaldeki tüm verileri tek bir anlaşılır gösterge panelinde topluyoruz.",
      "2. Aşama: Ay sonunda ne kadar harcandı, kaç telefon çaldı, ne kadar ciro üretildiğini raporluyoruz.",
      "3. Aşama: Sürekli iyileştirmeyle işletmenizi her ay bir önceki aydan daha karlı kılıyoruz."
    ],
    metricsResult: "Sürekli Büyüme & Şeffaflık",
    badge: "Büyüme Ortaklığı",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80"
  }
];
