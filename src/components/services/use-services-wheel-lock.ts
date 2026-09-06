/**
 * GrowB Landing — Hizmetler Bölümü Fare Tekerleği Kontrol Kancası
 *
 * GEREKÇE (WCAG 2.1 AA & UX Erişilebilirlik Uyumu):
 * 1. prefers-reduced-motion (WCAG 2.2.2 & 2.3.3): Vestibüler bozukluğu veya hareket hassasiyeti
 *    olan ziyaretçilerde sistem genelinde animasyon azaltma tercih edildiğinde tekerlek kilidi
 *    tamamen devre dışı bırakılır, sayfa doğal hızında akar.
 * 2. Klavye Navigasyonu (WCAG 2.1.1 Klavye Erişilebilirliği): Klavye ve ekran okuyucu kullanan
 *    ziyaretçilerin Tab, Ok tuşları, PageUp/Down ile gezinmesini engellememek için klavye
 *    etkileşimlerinde tekerlek kilidi anında serbest bırakılır.
 * 3. Mobil Dokunmatik Deneyim (Touch UX): Dokunmatik ekranlarda doğal momentum kaydırma
 *    (inertial scrolling) hissinin bozulmaması ve ekranın takıldığı algısının oluşmaması için
 *    mobil ve dokunmatik cihazlarda (<1024px ve touch) bu mekanizma tamamen kapalıdır.
 */

import { useEffect, useRef, useCallback } from "react";

interface UseServicesWheelLockProps {
  totalServices: number;
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}

export function useServicesWheelLock({
  totalServices,
  currentIndex,
  onNext,
  onPrev,
  sectionRef,
}: UseServicesWheelLockProps) {
  const isLockedRef = useRef(false);
  const lastStepTimeRef = useRef(0);
  const isCompletedServicesRef = useRef(false);
  const currentIndexRef = useRef(currentIndex);

  const unlockPage = useCallback(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    isLockedRef.current = false;
  }, []);

  const lockPage = useCallback(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    }
    isLockedRef.current = true;
  }, []);

  // Son karta gelindiğinde kilit bayrağını ve sayfa overflow'unu otomatik temizle
  useEffect(() => {
    currentIndexRef.current = currentIndex;
    if (currentIndex >= totalServices - 1) {
      isCompletedServicesRef.current = true;
      unlockPage();
    }
  }, [currentIndex, totalServices, unlockPage]);

  const skipAllServices = useCallback(() => {
    isCompletedServicesRef.current = true;
    unlockPage();
    if (typeof document === "undefined") return;
    const nextSection = document.getElementById("surec") || document.getElementById("fiyatlar");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }, [unlockPage]);

  useEffect(() => {
    const sectionEl = sectionRef.current;
    if (!sectionEl || typeof window === "undefined") return;

    // WCAG 1: prefers-reduced-motion kontrolü
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      unlockPage();
      return;
    }

    // WCAG 3: Mobilde tamamen kapalı (touch ve ekran genişliği kontrolü)
    const isMobileDevice =
      window.innerWidth < 1024 || "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isMobileDevice) {
      unlockPage();
      return;
    }

    const handleScrollCheck = () => {
      // Hizmetler tamamlandıysa veya son karttaysak sayfayı asla kilitleme
      if (isCompletedServicesRef.current || currentIndexRef.current >= totalServices - 1) {
        return;
      }
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= window.innerHeight * 0.4) {
        if (!isLockedRef.current) {
          sectionEl.scrollIntoView({ behavior: "auto", block: "start" });
          lockPage();
        }
      }
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });

    // Masaüstü fare tekerleği adımlaması
    const handleWheel = (e: WheelEvent) => {
      const current = currentIndexRef.current;
      const isAtEnd = current >= totalServices - 1;

      // 1. Hizmetler tamamlandıysa veya son karttayken aşağı kaydırılıyorsa kilidi tamamen aç ve engelleme
      if (isCompletedServicesRef.current || (isAtEnd && e.deltaY > 0)) {
        isCompletedServicesRef.current = true;
        unlockPage();
        return; // Doğal sayfa kaydırması devam eder
      }

      // 2. İlk karttayken yukarı kaydırma serbest olmalı
      if (current === 0 && e.deltaY < 0) {
        unlockPage();
        return;
      }

      const rect = sectionEl.getBoundingClientRect();
      const isInSection = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.4;
      if (!isInSection && !isLockedRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastStepTimeRef.current < 240) return;

      if (e.deltaY > 0) {
        lastStepTimeRef.current = now;
        onNext();
      } else if (e.deltaY < 0) {
        lastStepTimeRef.current = now;
        onPrev();
      }
    };

    // WCAG 2: Klavye navigasyonunda tekerlek kilidini derhal ve kalıcı olarak serbest bırak
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        ["Tab", "ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", "Space"].includes(
          e.key
        )
      ) {
        isCompletedServicesRef.current = true;
        unlockPage();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      unlockPage();
      window.removeEventListener("scroll", handleScrollCheck);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [totalServices, lockPage, unlockPage, onNext, onPrev, sectionRef]);

  return { skipAllServices, unlockPage };
}
