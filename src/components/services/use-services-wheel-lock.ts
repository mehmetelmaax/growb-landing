import { useCallback } from "react";

interface UseServicesWheelLockProps {
  totalServices: number;
  onNext: () => void;
  onPrev: () => void;
  sectionRef: React.RefObject<HTMLElement>;
}

export function useServicesWheelLock({ sectionRef: _sectionRef }: UseServicesWheelLockProps) {
  const unlockPage = useCallback(() => {
    if (typeof document !== "undefined") {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
  }, []);

  const skipAllServices = useCallback(() => {
    if (typeof document === "undefined") return;
    const nextSection = document.getElementById("surec") || document.getElementById("fiyatlar");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      window.scrollBy({ top: window.innerHeight, behavior: "smooth" });
    }
  }, []);

  return { skipAllServices, unlockPage };
}
