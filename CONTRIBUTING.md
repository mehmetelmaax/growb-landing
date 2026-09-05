# GrowB Landing — Geliştirici & Katkı Sağlama Kılavuzu

Bu belge, **GrowB Dijital** kurumsal web sitesine (`growb-landing`) katkıda bulunurken izlenmesi gereken mühendislik kurallarını ve kalite standartlarını belirler.

---

## 1. Değişmez Temel Kurallar (Inviolable Rules)

1. **Sıfır Hata / Build Geçişi**: Her Pull Request ve commit öncesinde `npm run build` hatasız geçmelidir.
2. **Tasarım Bütünlüğü**: Siyah (`#0A0A0A`), Altın (`#FFC300`) ve Inter tipografi dili asla bozulamaz.
3. **Bileşen Boyut Sınırı**: Hiçbir UI bileşeni 250 satırı aşamaz. Büyüyen bileşenler `components/<domain>/` altında alt modüllere bölünmelidir.
4. **Tek Gerçek Kaynak**: Telefon, WhatsApp, e-posta gibi iletişim verileri doğrudan bileşen içine sabitlenemez; mutlaka `@/data/content` içindeki `SITE_CONFIG` kullanılmalıdır.
5. **Conventional Commits**: Tüm commit mesajları Conventional Commits standartlarına uygun olmalıdır (`feat:`, `fix:`, `refactor:`, `perf:`, `test:`, `docs:`).

---

## 2. Geliştirme Ortamı Kurulumu

```bash
# Bağımlılıkları yükleyin
npm install --legacy-peer-deps

# Geliştirme sunucusunu başlatın (port 3001)
npm run dev

# Husky pre-commit kancasını etkinleştirin
npm run prepare
```

---

## 3. Kalite & Doğrulama Komutları

Commit göndermeden önce aşağıdaki boru hattını çalıştırarak tüm kontrolleri doğrulayın:

```bash
# 1. Tip Denetimi (Strict TypeScript)
npm run typecheck

# 2. Statik Kod Analizi (ESLint)
npm run lint

# 3. Birim & Entegrasyon Testleri (Vitest)
npm test

# 4. İç Link ve Çapa Bütünlüğü Denetimi
npm run check:links

# 5. Uçtan Uca Testler (Playwright)
npm run test:e2e

# 6. Üretim Derlemesi (Next.js Production Build)
npm run build
```

---

## 4. Yeni İl veya Hizmet Sayfası Ekleme

- **Yeni Hizmet Sayfası**: `src/data/services-data.ts` içine slug ve içerik ekleyin; sayfa otomatik olarak `src/app/hizmetler/[slug]/page.tsx` tarafından statik derlenecektir.
- **Yeni İl Sayfası**: `src/app/<il>-dijital-pazarlama-ajansi/page.tsx` formatında statik sayfa oluşturun, JSON-LD schema ve canonical meta tag'lerini eksiksiz tanımlayın.
