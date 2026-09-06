# GrowB Dijital Varlık ve Görsel Şeması (ASSET_SCHEMA.md)

Bu doküman, GrowB Landing projesinde Unsplash placeholder görsellerinin yerine geçecek gerçek marka ve referans varlıklarının (assets) dosya yapısını, beklenen ölçülerini, format standartlarını ve etiketleme yönergelerini belirler.

---

## 1. Format ve Optimizasyon Kuralları

1. **Format**: Tüm görseller modern sıkıştırma standartlarına uygun **WebP** (`.webp`) veya **AVIF** (`.avif`) formatında teslim edilmelidir.
2. **Renk Uzayı**: sRGB, Web uyumlu.
3. **Kalite / Sıkıştırma Seviyesi**: %80 - %85 kalite (lossy/visually lossless), görsel başına maksimum **150 KB** (banner/hero için maks 200 KB, avatarlar için maks 25 KB).
4. **Dizin Standartı**:
   - `public/works/services/`: 13 Hizmet kartı ve modalı detay görselleri
   - `public/works/team/`: Ekip ve kurucu avatarları
   - `public/works/general/`: Navbar, footer ve genel arayüz önizlemeleri

---

## 2. Beklenen Varlıklar Tablosu (15 Adet `TODO_CONTENT`)

| #      | Dosya Yolu                                                     | Hedef Konum / Bileşen                                               | Boyut (px) | Maks Boyut | Açıklama                                                                             |
| ------ | -------------------------------------------------------------- | ------------------------------------------------------------------- | ---------- | ---------- | ------------------------------------------------------------------------------------ |
| **01** | `public/works/general/navbar-services-preview.webp`            | `src/components/navbar.tsx:145`                                     | 640 × 360  | 60 KB      | Navbar hizmetler açılır menüsündeki canlı vaka/ajans çalışma alanı önizlemesi.       |
| **02** | `public/works/team/founders-growb.webp`                        | `src/lib/site-config.ts`                                            | 200 × 200  | 25 KB      | Kurucular Mehmet Elma & Bilge Taşyürek vesikalık/portre görseli.                     |
| **03** | `public/works/services/01-web-tasarim-yazilim.webp`            | `src/data/services-detail-data.ts (web-tasarim-yazilim)`            | 1200 × 800 | 140 KB     | Hizmet 01: Modern web geliştirme, kod editörü ve responsive mockup görseli.          |
| **04** | `public/works/services/02-google-harita-yerel-seo.webp`        | `src/data/services-detail-data.ts (google-harita-yerel-seo)`        | 1200 × 800 | 140 KB     | Hizmet 02: Google Haritalar, Local 3-Pack ve konum optimizasyonu görseli.            |
| **05** | `public/works/services/03-sosyal-medya-yonetimi.webp`          | `src/data/services-detail-data.ts (sosyal-medya-yonetimi)`          | 1200 × 800 | 140 KB     | Hizmet 03: Sosyal medya içerik takvimi, Instagram feed tasarımı ve etkileşim paneli. |
| **06** | `public/works/services/04-grafik-tasarim-kurumsal-kimlik.webp` | `src/data/services-detail-data.ts (grafik-tasarim-kurumsal-kimlik)` | 1200 × 800 | 140 KB     | Hizmet 04: Kurumsal kimlik kılavuzu, tipografi kartı ve logo mockup sunumu.          |
| **07** | `public/works/services/05-meta-reklam-yonetimi.webp`           | `src/data/services-detail-data.ts (meta-reklam-yonetimi)`           | 1200 × 800 | 140 KB     | Hizmet 05: Meta Ads Manager, Instagram Sponsorlu reklam dönüşüm paneli.              |
| **08** | `public/works/services/06-google-ads-reklamlari.webp`          | `src/data/services-detail-data.ts (google-ads-reklamlari)`          | 1200 × 800 | 140 KB     | Hizmet 06: Google Ads kampanya yönetim paneli ve tıklama/satış grafiği.              |
| **09** | `public/works/services/07-video-reels-ai-produksiyon.webp`     | `src/data/services-detail-data.ts (video-reels-ai-produksiyon)`     | 1200 × 800 | 140 KB     | Hizmet 07: 4K dikey video kamera seti, stüdyo ve Reels kurgu masası.                 |
| **10** | `public/works/services/08-icerik-yazarligi-satis-metni.webp`   | `src/data/services-detail-data.ts (icerik-yazarligi-satis-metni)`   | 1200 × 800 | 140 KB     | Hizmet 08: Dönüşüm odaklı copywriting ve satış metni taslağı.                        |
| **11** | `public/works/services/09-seo-organik-gorunurluk.webp`         | `src/data/services-detail-data.ts (seo-organik-gorunurluk)`         | 1200 × 800 | 140 KB     | Hizmet 09: Organik arama grafikleri, Semrush/Ahrefs anahtar kelime haritası.         |
| **12** | `public/works/services/10-e-ticaret-satis-sistemleri.webp`     | `src/data/services-detail-data.ts (e-ticaret-satis-sistemleri)`     | 1200 × 800 | 140 KB     | Hizmet 10: E-ticaret sipariş/sepet paneli ve ciro artış raporu.                      |
| **13** | `public/works/services/11-crm-whatsapp-takip.webp`             | `src/data/services-detail-data.ts (crm-whatsapp-takip)`             | 1200 × 800 | 140 KB     | Hizmet 11: Satış hunisi, CRM müşteri akışı ve WhatsApp otomatik bildirim akışı.      |
| **14** | `public/works/services/12-rakip-pazar-analizi.webp`            | `src/data/services-detail-data.ts (rakip-pazar-analizi)`            | 1200 × 800 | 140 KB     | Hizmet 12: Pazar hacmi, rakip açıkları ve sektörel penetrasyon analiz tablosu.       |
| **15** | `public/works/services/13-aylik-buyume-danismanligi.webp`      | `src/data/services-detail-data.ts (aylik-buyume-danismanligi)`      | 1200 × 800 | 140 KB     | Hizmet 13: Büyüme metrikleri, haftalık sprint takvimi ve ciro büyüme paneli.         |

---

## 3. Görseller Eklendiğinde Yapılacak İşlemler (Diff Hazırlığı)

Tüm 15 görsel belirtilen dosya yollarına yerleştirildikten sonra:

1. `src/data/services-detail-data.ts` dosyasındaki `image` alanları `/works/services/...webp` yerel yollarına güncellenecektir.
2. `src/components/navbar.tsx` satır 145 `/works/general/navbar-services-preview.webp` ile güncellenecektir.
3. `src/lib/site-config.ts` kurucu görseli `/works/team/founders-growb.webp` ile güncellenecektir.
4. `next.config.js` dosyasından `images.unsplash.com` `remotePatterns` bloğu güvenle tamamen kaldırılacaktır:

```diff
  images: {
    formats: ["image/avif", "image/webp"],
-   remotePatterns: [
-     {
-       protocol: "https",
-       hostname: "images.unsplash.com",
-     },
-   ],
  },
```
