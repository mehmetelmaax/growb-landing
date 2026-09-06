/**
 * GrowB Landing — GA4 & Meta Pixel Analitik Entegrasyonu & Consent Mode v2
 * KVKK/GDPR Uyumlu, Tip Güvenli ve Sıfır Bağımlılıklı İstemci Analitik Katmanı
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GA_ID || "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";

export type ConsentType = "all" | "necessary" | "denied";

export interface LeadTrackingData {
  formId: string;
  source: string;
  service?: string;
  leadId?: string;
}

export interface FormAbandonData {
  formId: string;
  lastField: string;
  timeSpentSec: number;
}

export interface ABTestImpressionData {
  experimentId: string;
  variant: string;
}

/**
 * Kullanicinin KVKK cerez onay durumunu kontrol eder.
 */
export function hasAnalyticsConsent(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const consent = localStorage.getItem("growb_cookie_consent");
    return consent === "all";
  } catch {
    return false;
  }
}

/**
 * Google Consent Mode v2 Varsayilan Durumunu Tanimlar.
 */
export function initConsentMode(): void {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function (...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  const isGranted = hasAnalyticsConsent();
  const consentState = isGranted ? "granted" : "denied";

  window.gtag("consent", "default", {
    analytics_storage: consentState,
    ad_storage: consentState,
    ad_user_data: consentState,
    ad_personalization: consentState,
    wait_for_update: 500,
  });
}

/**
 * Kullanici onayini gunceller (Google Consent Mode v2 Update).
 */
export function updateConsent(status: ConsentType): void {
  if (typeof window === "undefined") return;

  const isGranted = status === "all";
  const consentState = isGranted ? "granted" : "denied";

  try {
    localStorage.setItem("growb_cookie_consent", status);
    // Cerez olarak da kaydet (SSR uyumu icin)
    document.cookie = `growb_cookie_consent=${status}; path=/; max-age=31536000; SameSite=Lax`;
  } catch {
    // Ignore storage errors
  }

  if (window.gtag) {
    window.gtag("consent", "update", {
      analytics_storage: consentState,
      ad_storage: consentState,
      ad_user_data: consentState,
      ad_personalization: consentState,
    });
  }

  window.dispatchEvent(new CustomEvent("cookie_consent_updated", { detail: status }));
}

/**
 * Sayfa goruntuleme izleme (Page View)
 */
export function trackPageView(url: string, title?: string): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "page_view", {
      page_location: url,
      page_title: title || document.title,
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("track", "PageView");
  }
}

/**
 * Form Gonderimi / Potansiyel Musteri Izleme (Lead Generation)
 */
export function trackLead(data: LeadTrackingData): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "generate_lead", {
      form_id: data.formId,
      source: data.source,
      service_interest: data.service || "Genel",
      lead_id: data.leadId || "",
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("track", "Lead", {
      content_name: data.service || "Genel Büyüme Talebi",
      content_category: data.source,
    });
  }
}

/**
 * WhatsApp Tiklama Event'i
 */
export function trackWhatsAppClick(source: string, service?: string): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "contact_whatsapp", {
      source_component: source,
      service_slug: service || "general",
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("trackCustom", "WhatsAppContact", { source, service });
  }
}

/**
 * Telefon Arama Tiklama Event'i
 */
export function trackPhoneClick(source: string, phone?: string): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "contact_phone", {
      source_component: source,
      phone_number: phone || "05414842426",
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("trackCustom", "PhoneCall", { source, phone });
  }
}

/**
 * Form Terk (Abandonment) Izleme Event'i
 */
export function trackFormAbandon(data: FormAbandonData): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "form_abandon", {
      form_id: data.formId,
      last_field_focused: data.lastField,
      time_spent_sec: data.timeSpentSec,
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("trackCustom", "FormAbandon", data);
  }
}

/**
 * A/B Test Impression Izleme Event'i
 */
export function trackABTestImpression(data: ABTestImpressionData): void {
  if (!hasAnalyticsConsent()) return;

  if (window.gtag && GA_TRACKING_ID) {
    window.gtag("event", "ab_test_impression", {
      experiment_id: data.experimentId,
      variant_id: data.variant,
    });
  }

  if (window.fbq && META_PIXEL_ID) {
    window.fbq("trackCustom", "ABTestImpression", data);
  }
}
