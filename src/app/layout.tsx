import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { CookieBanner } from "@/components/cookie-banner";
import { FloatingContactPill } from "@/components/floating-contact-pill";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://growbdijital.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı",
    template: "%s | GrowB Dijital",
  },
  description:
    "Dijitaldeki tüm işlerinizi yöneten büyüme ortağınız. Google & Meta reklamları, yerel harita SEO, dikey video prodüksiyon, WhatsApp CRM otomasyonu ve satış odaklı kurumsal altyapılar.",
  keywords: [
    "Growb dijital",
    "dijital pazarlama ajansı",
    "google ads performans reklamları",
    "meta reklam ajansı",
    "yerel harita seo",
    "reels video prodüksiyon",
    "crm satış otomasyonu",
    "kırşehir dijital pazarlama",
    "nevşehir web tasarım",
    "kapadokya dijital ajans",
  ],
  authors: [{ name: "GrowB Dijital Pazarlama Ajansı", url: siteUrl }],
  openGraph: {
    title: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı",
    description: "Dijitaldeki tüm süreçlerinizi üstlenen, cironuzu katlayan pazarlama ortağınız.",
    url: siteUrl,
    siteName: "GrowB Dijital",
    type: "website",
    locale: "tr_TR",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı",
    description: "Dijitaldeki tüm süreçlerinizi üstlenen büyüme ortağınız.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const professionalServiceSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "GrowB Dijital Pazarlama Ajansı",
    url: siteUrl,
    logo: `${siteUrl}/growb-logo.jpg`,
    image: `${siteUrl}/growb-logo.jpg`,
    telephone: "+905414842426",
    priceRange: "₺₺₺",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Nevşehir",
      addressRegion: "Kapadokya",
      addressCountry: "TR",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 38.6247,
      longitude: 34.7142,
    },
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
    areaServed: [
      { "@type": "AdministrativeArea", name: "Nevşehir" },
      { "@type": "AdministrativeArea", name: "Kırşehir" },
      { "@type": "AdministrativeArea", name: "Konya" },
      { "@type": "AdministrativeArea", name: "Aksaray" },
      { "@type": "Country", name: "Türkiye" },
    ],
  };

  return (
    <html lang="tr" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceSchema),
          }}
        />
      </head>
      <body
        className={`${inter.variable} overflow-x-hidden bg-[#0A0A0A] font-sans text-[#FFFDF5] antialiased selection:bg-[#FFC300] selection:text-[#0A0A0A]`}
      >
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[99999] focus:rounded-xl focus:bg-[#FFC300] focus:px-5 focus:py-2.5 focus:font-sans focus:text-sm focus:font-black focus:text-[#0A0A0A] focus:shadow-2xl focus:outline-none focus:ring-2 focus:ring-black"
        >
          Ana İçeriğe Atla
        </a>
        {children}
        <CookieBanner />
        <FloatingContactPill />
      </body>
    </html>
  );
}
