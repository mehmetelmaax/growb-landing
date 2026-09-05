import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { Preloader } from "@/components/preloader";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı",
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
  ],
  authors: [{ name: "GrowB Dijital Pazarlama Ajansı" }],
  openGraph: {
    title: "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı",
    description: "Dijitaldeki tüm süreçlerinizi üstlenen, cironuzu katlayan pazarlama ortağınız.",
    type: "website",
    locale: "tr_TR",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className="dark">
      <body className={`${inter.variable} font-sans bg-[#0A0A0A] text-[#FFFDF5] selection:bg-[#FFC300] selection:text-[#0A0A0A] antialiased overflow-x-hidden`}>
        {children}
      </body>
    </html>
  );
}
