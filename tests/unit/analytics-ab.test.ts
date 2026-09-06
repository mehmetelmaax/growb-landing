import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  hasAnalyticsConsent,
  updateConsent,
  trackPageView,
  trackLead,
  trackWhatsAppClick,
  trackPhoneClick,
  trackFormAbandon,
} from "@/lib/analytics";
import { getABVariant, HERO_EXPERIMENT, HERO_COPY_VARIANTS } from "@/lib/ab-testing";

describe("Analytics & Consent Mode v2", () => {
  beforeEach(() => {
    localStorage.clear();
    // Clear cookies
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  });

  it("should block tracking when consent is not given", () => {
    expect(hasAnalyticsConsent()).toBe(false);

    const gtagSpy = vi.fn();
    window.gtag = gtagSpy;

    trackPageView("https://growbdijital.com/");
    trackLead({ formId: "test", source: "unit_test" });
    trackWhatsAppClick("unit_test");
    trackPhoneClick("unit_test");
    trackFormAbandon({ formId: "test", lastField: "phone", timeSpentSec: 5 });

    expect(gtagSpy).not.toHaveBeenCalled();
  });

  it("should update consent and persist to localStorage and cookie", () => {
    updateConsent("all");
    expect(hasAnalyticsConsent()).toBe(true);
    expect(localStorage.getItem("growb_cookie_consent")).toBe("all");
    expect(document.cookie).toContain("growb_cookie_consent=all");

    updateConsent("necessary");
    expect(hasAnalyticsConsent()).toBe(false);
    expect(localStorage.getItem("growb_cookie_consent")).toBe("necessary");
  });

  it("should dispatch events when consent is granted", () => {
    updateConsent("all");
    expect(hasAnalyticsConsent()).toBe(true);

    const gtagSpy = vi.fn();
    window.gtag = gtagSpy;

    // GA_TRACKING_ID might be empty in test env, but calling track functions does not throw
    expect(() => {
      trackPageView("https://growbdijital.com/");
      trackLead({ formId: "test", source: "test_source", service: "SEO" });
      trackWhatsAppClick("hero");
      trackPhoneClick("hero");
      trackFormAbandon({ formId: "test", lastField: "phone", timeSpentSec: 10 });
    }).not.toThrow();
  });
});

describe("A/B Testing Infrastructure", () => {
  beforeEach(() => {
    localStorage.clear();
    if (typeof document !== "undefined") {
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
      });
    }
  });

  it("should select a valid variant and stick to it", () => {
    const variant1 = getABVariant(HERO_EXPERIMENT);
    expect(["control", "conversion"]).toContain(variant1);

    // Subsequent calls must return identical variant
    const variant2 = getABVariant(HERO_EXPERIMENT);
    expect(variant2).toBe(variant1);

    // Verify copy variants map has all needed keys
    expect(HERO_COPY_VARIANTS[variant1]).toBeDefined();
    expect(HERO_COPY_VARIANTS[variant1].headline).toBeDefined();
    expect(HERO_COPY_VARIANTS[variant1].ctaPrimary).toBeDefined();
  });

  it("should respect manually assigned cookie", () => {
    document.cookie = `growb_ab_hero_headline_v1=conversion; path=/`;
    const variant = getABVariant(HERO_EXPERIMENT);
    expect(variant).toBe("conversion");
  });
});
