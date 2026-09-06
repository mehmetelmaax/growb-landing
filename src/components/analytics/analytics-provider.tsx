"use client";

import React, { useEffect } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import {
  GA_TRACKING_ID,
  META_PIXEL_ID,
  initConsentMode,
  trackPageView,
  hasAnalyticsConsent,
} from "@/lib/analytics";

export const AnalyticsProvider: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();

  // 1. Consent Mode v2'yi en basta baslat
  useEffect(() => {
    initConsentMode();
  }, []);

  // 2. Sayfa degisimlerinde otomatik page_view gonder
  useEffect(() => {
    if (pathname) {
      trackPageView(window.location.href);
    }
  }, [pathname]);

  // 3. Cerez onay tercihi degistiginde consent guncelle
  useEffect(() => {
    const handleConsentChange = () => {
      if (hasAnalyticsConsent() && pathname) {
        trackPageView(window.location.href);
      }
    };

    window.addEventListener("cookie_consent_updated", handleConsentChange);
    return () => {
      window.removeEventListener("cookie_consent_updated", handleConsentChange);
    };
  }, [pathname]);

  return (
    <>
      {/* GA4 Script Yüklemesi (Sadece ID tanimlanmissa) */}
      {GA_TRACKING_ID && (
        <>
          <Script
            strategy="afterInteractive"
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="google-analytics"
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_TRACKING_ID}', {
                  page_path: window.location.pathname,
                });
              `,
            }}
          />
        </>
      )}

      {/* Meta Pixel Script Yüklemesi (Sadece ID tanimlanmissa) */}
      {META_PIXEL_ID && (
        <Script
          id="meta-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}

      {children}
    </>
  );
};
