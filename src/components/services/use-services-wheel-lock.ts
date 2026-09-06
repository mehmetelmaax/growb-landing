import { useEffect, useRef, useCallback } from "react";

interface UseServicesWheelLockProps {
  totalServices: number;
  onNext: () => void;
  onPrev: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}

export function useServicesWheelLock({
  totalServices,
  onNext,
  onPrev,
  sectionRef,
}: UseServicesWheelLockProps) {
  const isLockedRef = useRef(false);
  const lastStepTimeRef = useRef(0);
  const isCompletedServicesRef = useRef(false);

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
    if (!sectionEl) return;

    const handleScrollCheck = () => {
      if (isCompletedServicesRef.current) return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top <= 60 && rect.bottom >= window.innerHeight * 0.4) {
        if (!isLockedRef.current) {
          sectionEl.scrollIntoView({ behavior: "auto", block: "start" });
          lockPage();
        }
      }
    };

    window.addEventListener("scroll", handleScrollCheck, { passive: true });

    const handleWheel = (e: WheelEvent) => {
      if (isCompletedServicesRef.current) return;

      const rect = sectionEl.getBoundingClientRect();
      const isInSection = rect.top <= 80 && rect.bottom >= window.innerHeight * 0.4;
      if (!isInSection && !isLockedRef.current) return;

      e.preventDefault();
      e.stopPropagation();

      const now = Date.now();
      if (now - lastStepTimeRef.current < 260) return;

      if (e.deltaY > 0) {
        lastStepTimeRef.current = now;
        onNext();
      } else if (e.deltaY < 0) {
        lastStepTimeRef.current = now;
        onPrev();
      }
    };

    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0]?.clientY ?? 0;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isCompletedServicesRef.current) return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top <= 80 && rect.bottom >= window.innerHeight * 0.4) {
        e.preventDefault();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isCompletedServicesRef.current) return;
      const rect = sectionEl.getBoundingClientRect();
      if (rect.top > 80 || rect.bottom < window.innerHeight * 0.4) return;

      const deltaY = touchStartY - (e.changedTouches[0]?.clientY ?? 0);
      if (deltaY > 35) {
        onNext();
      } else if (deltaY < -35) {
        onPrev();
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });

    return () => {
      unlockPage();
      window.removeEventListener("scroll", handleScrollCheck);
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [totalServices, lockPage, unlockPage, onNext, onPrev, sectionRef]);

  return { skipAllServices, unlockPage };
}
