"use client";

import { useEffect, useRef, useCallback } from "react";
import { trackFormAbandon } from "@/lib/analytics";

interface UseFormAbandonmentOptions {
  formId: string;
  isSubmitted: boolean;
}

export function useFormAbandonment({ formId, isSubmitted }: UseFormAbandonmentOptions) {
  const startTimeRef = useRef<number>(Date.now());
  const lastFieldRef = useRef<string>("");
  const hasInteractedRef = useRef<boolean>(false);
  const isSubmittedRef = useRef<boolean>(isSubmitted);
  const hasReportedRef = useRef<boolean>(false);

  // submitted prop degisikligini takip et
  useEffect(() => {
    isSubmittedRef.current = isSubmitted;
  }, [isSubmitted]);

  const onFieldFocus = useCallback((fieldName: string) => {
    if (!hasInteractedRef.current) {
      hasInteractedRef.current = true;
      startTimeRef.current = Date.now();
    }
    lastFieldRef.current = fieldName;
  }, []);

  const onFieldBlur = useCallback((fieldName: string) => {
    lastFieldRef.current = fieldName;
  }, []);

  const markSubmitted = useCallback(() => {
    isSubmittedRef.current = true;
    hasReportedRef.current = true;
  }, []);

  const reportAbandonment = useCallback(() => {
    if (
      hasInteractedRef.current &&
      !isSubmittedRef.current &&
      !hasReportedRef.current &&
      lastFieldRef.current
    ) {
      const timeSpentSec = Math.max(1, Math.round((Date.now() - startTimeRef.current) / 1000));
      // Sadece en az 2 saniye vakit gecirilmisse terk kabul et
      if (timeSpentSec >= 2) {
        hasReportedRef.current = true;
        trackFormAbandon({
          formId,
          lastField: lastFieldRef.current,
          timeSpentSec,
        });
      }
    }
  }, [formId]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        reportAbandonment();
      }
    };

    const handlePageHide = () => {
      reportAbandonment();
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pagehide", handlePageHide);

    return () => {
      window.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pagehide", handlePageHide);
      reportAbandonment();
    };
  }, [reportAbandonment]);

  return {
    onFieldFocus,
    onFieldBlur,
    markSubmitted,
  };
}
