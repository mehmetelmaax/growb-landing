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

export const REAL_CLIENT_REFERENCES: ClientReference[] = [
  {
    id: "aybar-nakliyat",
    name: "Kırşehir Aybar Nakliyat",
    city: "Kırşehir",
    industryLabel: "Evden Eve & Asansörlü",
    url: "https://www.kirsehiraybarnakliyat.com.tr/",
    logo: "/clients/kirsehir-aybar.webp",
    category: "Kırşehir Evden Eve Nakliyat",
    badge: "1.2 sn Açılış Hızı",
    summary:
      "Kırşehir merkez ve ilçelerinde 10 yılı aşkın süredir sigortalı, modern asansörlü evden eve nakliyat ve ofis taşıma hizmeti veren bölge lideri.",
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
    industryLabel: "30. Kata Kadar Asansör",
    url: "https://www.adanaasansorlutasimacilik.com.tr/",
    logo: "/clients/adana-asansorlu.png",
    category: "Mobil Dış Cephe Asansörü",
    badge: "Yüksek Kat Uzmanı",
    summary:
      "Çukurova, Seyhan ve Yüreğir ilçelerinde yüksek katlı binalar için 30. kata kadar uzanan hidrolik dış cephe asansör kiralama ve nakliyat.",
    metrics: {
      speed: "1.2 sn",
      calls: "+%65 Çağrı",
      seoRank: "Çukurova Bölgesi Lider",
    },
    whatWeDid: [
      "Asansör vinç filosunun teknik kapasitesini ve yükseklik tablosunu sergileyen mobil arayüz kodlandı.",
      "İnşaat firmaları ve nakliyecilere yönelik B2B kiralama açılış sayfaları hazırlandı.",
      "Bölgesel aramalarda 1. sıraya oturan yerel SEO harita sinyalleri güçlendirildi.",
    ],
  },
  {
    id: "mersin-uzman-eller",
    name: "Uzman Eller Nakliyat",
    city: "Mersin",
    industryLabel: "Liman & Ev Taşımacılığı",
    url: "https://www.mersinasansorlutasimacilik.com.tr/",
    logo: "/clients/mersin-uzman-eller.png",
    category: "Mersin & Mezitli Nakliyat",
    badge: "1.3 sn Açılış Hızı",
    summary:
      "Mersin genelinde Mezitli, Yenişehir ve Toroslar başta olmak üzere marinaya ve sitelere özel asansörlü nakliye hizmeti.",
    metrics: {
      speed: "1.3 sn",
      calls: "+%70 Çağrı",
      seoRank: "Mezitli & Yenişehir 1. Sıra",
    },
    whatWeDid: [
      "Mersin'in sahil şeridindeki rezidanslara uygun modüler asansör çözümlerini anlatan sayfa yapısı kuruldu.",
      "Kullanıcının tek tuşla WhatsApp üzerinden fotoğraf atarak fiyat alabileceği hızlı ekspertiz kanalı entegre edildi.",
      "Google Haritalar profili 4.9 yıldız ve 140+ gerçek müşteri yorumuyla güçlendirildi.",
    ],
  },
  {
    id: "oz-aksaray",
    name: "Öz Aksaray Ekspres",
    city: "Aksaray",
    industryLabel: "Şehirlerarası & Depolama",
    url: "https://www.ozaksarayekspres.com.tr/",
    logo: "/clients/oz-aksaray.png",
    category: "Aksaray Evden Eve & Lojistik",
    badge: "1.1 sn Açılış Hızı",
    summary:
      "Aksaray merkez ve İç Anadolu genelinde modern araç filosuyla sigortalı evden eve, ofis taşıma ve depolama hizmeti.",
    metrics: {
      speed: "1.1 sn",
      calls: "+%88 Çağrı",
      seoRank: "Aksaray 1. Sıra",
    },
    whatWeDid: [
      "Bölgesel harita aramalarında ilk sıraya yükselten yerel SEO optimizasyonu tamamlandı.",
      "Müşterilerin hızlı WhatsApp ekspertiz fiyatı almasını sağlayan dönüşüm odaklı tasarım yapıldı.",
      "Google Ads arama ağı reklamlarıyla müşteri edinme maliyeti %40 düşürüldü.",
    ],
  },
];
