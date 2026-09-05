# GrowB Landing — Satış Odaklı Dijital Büyüme Ajansı Platformu

> **GrowB Dijital Pazarlama & Yazılım Ajansı** için yüksek dönüşümlü, Google Core Web Vitals yeşil skor hedefli, ultra hızlı ve mobil öncelikli kurumsal web platformu.

---

## 🚀 Teknolojik Mimari & Yığın (Stack)

- **Çerçeve**: [Next.js 14](https://nextjs.org/) (App Router, Server Components & React 18)
- **Dil**: [TypeScript](https://www.typescriptlang.org/) (Strict Mode, `noUncheckedIndexedAccess`, `ES2020`)
- **Stil & Tasarım**: [Tailwind CSS](https://tailwindcss.com/) + CSS Donanım Hızlandırmalı Geçişler
- **Animasyon & İnteraksiyon**: [Framer Motion](https://www.framer.com/motion/) + SVG Morfoloji
- **Form Doğrulama & Güvenlik**: [Zod](https://zod.dev/) + Türkiye GSM Normalizasyonu (`^05\d{9}$`) + XSS Sanitizasyonu
- **Hız & Dağıtık Hız Sınırı**: [Upstash Redis](https://upstash.com/) Serverless Sliding-Window Rate Limiter + In-Memory Fallback
- **Bildirim & Entegrasyon**: Telegram Bot API (HTML Parse Mode) + [Resend](https://resend.com/) E-posta Yedek İletim
- **Test Altyapısı**: [Vitest](https://vitest.dev/) (Birim/Entegrasyon) + [Playwright](https://playwright.dev/) (E2E)
- **CI / CD**: GitHub Actions CI Pipeline + Husky Pre-Commit Hooks + Lint-Staged

---

## 📁 Proje Dizin Yapısı

```
growb-landing/
├── .github/
│   ├── workflows/ci.yml           # Otomatik CI test, denetim ve derleme hattı
│   └── pull_request_template.md   # PR kabul kriterleri ve kalite şablonu
├── .husky/
│   └── pre-commit                 # Git commit öncesi otomatik lint & typecheck kancası
├── public/
│   ├── clients/                   # Gerçek referans marka logoları (WebP/PNG)
│   ├── favicon.ico                # Marka altın logolu favicon
│   └── og-image.png               # Sosyal medya paylaşım kartı (1200x630)
├── scripts/
│   └── check-links.mjs            # İç bağlantı ve çapa (#) bütünlük denetleyicisi
├── src/
│   ├── app/                       # Next.js 14 App Router rotaları ve API uçları
│   │   ├── api/
│   │   │   ├── audit/route.ts     # Canlı PageSpeed v5 denetim motoru (24s TTL cache)
│   │   │   └── lead/route.ts      # Rate-limited, honeypot ve KVKK korumalı lead API
│   │   ├── [hizmet-ve-il-rotalari] # 32 adet statik optimize edilmiş iniş sayfası
│   │   ├── layout.tsx             # Ana şablon, Inter fontu ve global navigasyon
│   │   ├── page.tsx               # Ana sayfa kompozisyonu (RSC + dynamic split)
│   │   ├── robots.ts              # Arama motoru tarama direktifleri
│   │   └── sitemap.ts             # Otomatik dinamik XML site haritası
│   ├── components/                # Modüler UI bileşenleri (< 250 satır kuralı)
│   │   ├── hero/                  # Hero petekleri, kovan ve danışmanlık modalı
│   │   ├── services/              # 13 uzmanlık alanı kart ve detay modülleri
│   │   ├── honeycomb/             # Kovan animasyonu ve detay pencereleri
│   │   └── ui/                    # Atomik arayüz öğeleri ve butonlar
│   ├── data/                      # 📝 MÜŞTERİ İÇERİK YÖNETİM MERKEZİ (Tek Gerçek Kaynak)
│   │   ├── content.ts             # Telefon, WhatsApp, adres, SSS, paket ve metrikler
│   │   ├── services-data.ts       # 13 hizmetin detay metinleri, çıktılar ve fiyatları
│   │   └── hero-pollens-data.ts   # Hero kovanındaki 13 polen ve koordinat verisi
│   └── lib/
│       ├── rate-limiter.ts        # In-memory ve Upstash hız sınırı motoru
│       └── validators.ts          # GSM doğrulaması, URL normalizasyonu ve Zod şemaları
├── tests/
│   ├── e2e/                       # Playwright uçtan uca tarayıcı testleri
│   └── unit/                      # Vitest doğrulama ve mantık birim testleri
├── .eslintrc.json                 # Strict Next.js & TypeScript lint kuralları
├── .prettierrc                    # Kod biçimlendirme kuralları
├── playwright.config.ts           # Playwright E2E yapılandırması
└── vitest.config.ts               # Vitest yapılandırması
```

---

## 📝 Müşteri İçerik Güncelleme Rehberi (Client Content Guide)

Site üzerindeki iletişim bilgileri, fiyatlar, referanslar veya metinleri güncellemek için kod dosyalarına dokunmanıza gerek yoktur. Tüm içerikler `src/data/` altındaki dosyalardan yönetilir:

| Güncellenmek İstenen Alan         | Dosya Yolu                  | Açıklama                                                                                                                                       |
| :-------------------------------- | :-------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------- |
| **Telefon, WhatsApp & E-Posta**   | `src/data/content.ts`       | `SITE_CONFIG` nesnesindeki `phone`, `whatsappNumber`, `email` alanları güncellendiğinde tüm sitedeki butonlar ve linkler otomatik güncellenir. |
| **Sıkça Sorulan Sorular (SSS)**   | `src/data/content.ts`       | `FAQ_DATA` dizisine yeni soru-cevap ekleyebilirsiniz. Hem arayüzde hem de Google Schema `FAQPage` üzerinde anında yayınlanır.                  |
| **Fiyatlar & Kampanyalar**        | `src/data/content.ts`       | `PRICING_PACKAGES` ve `CAMPAIGN_PACKAGES` dizilerinden paket bedelleri ve özellikleri düzenlenebilir.                                          |
| **Hizmet Sayfaları & İçerikleri** | `src/data/services-data.ts` | 13 hizmetin başlıkları, teslim süreleri, kazanımları ve paketleri bu dosyadan yönetilir.                                                       |
| **Canlı Referanslar & Logolar**   | `src/data/content.ts`       | `FEATURED_PROJECTS` dizisine yeni referans eklenebilir; logolar `public/clients/` klasörüne yüklenir.                                          |

---

## 🔐 Ortam Değişkenleri (.env.local)

Sitenin form bildirimleri, hız denetimi ve güvenlik altyapısı için aşağıdaki ortam değişkenleri yapılandırılmalıdır:

```ini
# Site Genel Adresi
NEXT_PUBLIC_SITE_URL=https://growbdijital.com

# Telegram Anlık Lead Bildirimleri
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_CHAT_ID=your_telegram_chat_id

# Resend E-Posta Bildirimi (Yedek Hat)
RESEND_API_KEY=re_your_api_key
LEAD_NOTIFICATION_EMAIL=info@growbdijital.com

# Upstash Redis Serverless Hız Sınırı (Opsiyonel - Tanımlanmazsa In-Memory Fallback Çalışır)
UPSTASH_REDIS_REST_URL=https://your-upstash-url.upstash.io
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Google PageSpeed API (Opsiyonel - Tanımlanmazsa Lighthouse Fallback Çalışır)
PAGESPEED_API_KEY=your_google_pagespeed_api_key
```

---

## 🛠️ Kullanılabilir Komutlar & Testler

| Komut                 | Açıklama                                                                     |
| :-------------------- | :--------------------------------------------------------------------------- |
| `npm run dev`         | Geliştirme sunucusunu `http://localhost:3001` üzerinde başlatır.             |
| `npm run typecheck`   | TypeScript sıkı tip denetimini çalıştırır (`tsc --noEmit`).                  |
| `npm run lint`        | ESLint statik kod analizini çalıştırır.                                      |
| `npm run lint:fix`    | Lint uyarı ve hatalarını otomatik olarak düzeltir.                           |
| `npm run format`      | Prettier ile tüm kod ve stilleri biçimlendirir.                              |
| `npm test`            | Vitest birim ve entegrasyon testlerini çalıştırır.                           |
| `npm run check:links` | Dahili sayfa çapalarını (#) ve DOM ID bütünlüğünü denetler.                  |
| `npm run test:e2e`    | Playwright ile gerçek Chromium üzerinde uçtan uca akış testlerini icra eder. |
| `npm run build`       | Next.js üretim derlemesini oluşturur (32 rota statik SSG).                   |
| `npm run start`       | Üretim derlemesini `http://localhost:3001` portunda yayına alır.             |

---

## 🚢 Dağıtım & Yayınlama (Vercel)

Proje Vercel üzerinde sıfır yapılandırmayla çalışacak şekilde optimize edilmiştir:

1. Depoyu GitHub'a aktarın.
2. Vercel Dashboard üzerinden projeyi içe aktarın (Framework: Next.js).
3. Ortam değişkenlerini (Environment Variables) tanımlayın.
4. "Deploy" butonuna basın. Otomatik olarak Edge ağında ve 32 statik sayfayla yayınlanır.
