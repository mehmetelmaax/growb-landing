/**
 * GrowB Landing — Hafif, Sıfır Bağımlılıklı A/B Test & Feature Flag Mekanizması
 * Cookie ve LocalStorage ile Varyant Sabitleme (Flicker-Free SSR/CSR Uyumlu)
 */

import { trackABTestImpression } from "./analytics";

export interface ABExperiment<T extends string = string> {
  id: string;
  variants: readonly T[];
  defaultVariant: T;
}

/**
 * Tarayici cerezinden (cookie) belirtilen anahtari okur.
 */
function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.match(new RegExp("(^|;\\s*)" + name + "=([^;]*)"));
  return match && match[2] ? decodeURIComponent(match[2]) : null;
}

/**
 * Tarayici cerezine ve localStorage'a varyanti yazar (30 gunluk kalici omur).
 */
function setCookieAndStorage(name: string, value: string): void {
  if (typeof document === "undefined") return;
  try {
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=2592000; SameSite=Lax`;
    localStorage.setItem(name, value);
  } catch {
    // Depolama erisim hatalarini yut
  }
}

/**
 * Belirtilen A/B testi icin kullaniciya ait sabit varyanti dondurur.
 * Ilk defa giriliyorsa rastgele secer, sabitler ve analitik impression eventi gonderir.
 */
export function getABVariant<T extends string>(experiment: ABExperiment<T>): T {
  if (typeof window === "undefined") {
    return experiment.defaultVariant;
  }

  const cookieKey = `growb_ab_${experiment.id}`;

  // 1. Oncelikle cerezden oku (SSR / Client hydration oncesi eslesme icin)
  const existingCookie = getCookie(cookieKey) as T | null;
  if (existingCookie && experiment.variants.includes(existingCookie)) {
    return existingCookie;
  }

  // 2. LocalStorage kontrol et
  try {
    const existingLocal = localStorage.getItem(cookieKey) as T | null;
    if (existingLocal && experiment.variants.includes(existingLocal)) {
      setCookieAndStorage(cookieKey, existingLocal);
      return existingLocal;
    }
  } catch {
    // LocalStorage erisilemezse devam et
  }

  // 3. Yeni kullanici icin adil dagilim (50/50 veya esit olasilik)
  const randomIndex = Math.floor(Math.random() * experiment.variants.length);
  const selectedVariant = experiment.variants[randomIndex] || experiment.defaultVariant;

  // Sabitle
  setCookieAndStorage(cookieKey, selectedVariant);

  // Analitik gosterim (impression) kaydet
  trackABTestImpression({
    experimentId: experiment.id,
    variant: selectedVariant,
  });

  return selectedVariant;
}

// --- DENEY TANIMLARI ---

export const HERO_EXPERIMENT = {
  id: "hero_headline_v1",
  variants: ["control", "conversion"] as const,
  defaultVariant: "control" as const,
};

export type HeroVariantKey = (typeof HERO_EXPERIMENT.variants)[number];

export const HERO_COPY_VARIANTS: Record<
  HeroVariantKey,
  {
    badge: string;
    headline: string;
    subtitle: string;
    ctaPrimary: string;
  }
> = {
  control: {
    badge: "TÜM DİJİTAL İŞLERİNİZ İÇİN TEK AJANS",
    headline: "DİJİTALDEKİ TÜM İŞLERİNİZİ YÖNETEN BÜYÜME ORTAĞINIZ",
    subtitle:
      "Web, SEO, Google & Meta reklamları, sosyal medya ve otomasyon. Dağınık ajanslarla vakit kaybetmeyin; tüm dijital operasyonunuzu tek merkezden yönetelim.",
    ctaPrimary: "Ücretsiz Büyüme Analizi Al",
  },
  conversion: {
    badge: "PERFORMANS & CİRO ODAKLI BÜYÜME AJANSI",
    headline: "CİRONUZU VE MÜŞTERİLERİNİZİ KATLAYAN DİJİTAL BÜYÜME EKİBİ",
    subtitle:
      "Boşa harcanan reklam bütçelerine son verin. Veri odaklı stratejiler, yüksek dönüşümlü web yazılımları ve garantili büyüme modelleriyle yanınızdayız.",
    ctaPrimary: "Hemen Teklif & Yol Haritası Al",
  },
};
