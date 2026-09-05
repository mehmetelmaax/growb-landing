import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "GrowB Dijital — Tam Kapsamlı Dijital Pazarlama Ajansı";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0A0A0A",
          backgroundImage: "radial-gradient(circle at 50% 40%, rgba(255, 195, 0, 0.15) 0%, transparent 70%)",
          padding: "60px 80px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* Border Frame */}
        <div
          style={{
            position: "absolute",
            top: 24,
            left: 24,
            right: 24,
            bottom: 24,
            border: "1px solid rgba(255, 195, 0, 0.25)",
            borderRadius: 28,
            display: "flex",
          }}
        />

        {/* Brand Tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            backgroundColor: "rgba(255, 195, 0, 0.12)",
            border: "1px solid rgba(255, 195, 0, 0.35)",
            padding: "8px 24px",
            borderRadius: 999,
            marginBottom: 28,
          }}
        >
          <span style={{ color: "#FFC300", fontSize: 18, fontWeight: 800, letterSpacing: "0.15em" }}>
            GROWB DİJİTAL PAZARLAMA AJANSI
          </span>
        </div>

        {/* Main Title */}
        <div
          style={{
            fontSize: 54,
            fontWeight: 900,
            color: "#FFFFFF",
            textAlign: "center",
            lineHeight: 1.15,
            letterSpacing: "-0.03em",
            maxWidth: 1000,
            marginBottom: 20,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          Dijitaldeki Tüm Süreçlerinizi Üstlenen Büyüme Ortağınız.
        </div>

        {/* Subtitle */}
        <div
          style={{
            fontSize: 22,
            color: "#A3A3A3",
            textAlign: "center",
            maxWidth: 800,
            lineHeight: 1.5,
            marginBottom: 36,
          }}
        >
          Web Tasarım & Yazılım • Google & Meta Reklamları • Harita Yerel SEO • WhatsApp CRM Satış Hattı
        </div>

        {/* Highlights */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 32,
            fontSize: 16,
            color: "#FFC300",
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          <span>⚡ 1.2 sn Açılış Hızı</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span>📍 Yerel Harita Dominasyonu</span>
          <span style={{ color: "rgba(255,255,255,0.2)" }}>•</span>
          <span>🛡️ %100 Resmi Sözleşmeli</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
