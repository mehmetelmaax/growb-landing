import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ALL_13_SERVICES_DETAILED } from "@/data/services-detail-data";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ArrowLeft, ArrowUpRight, CheckCircle2, Sparkles, Phone, MessageSquare, Zap, ShieldCheck } from "lucide-react";

export async function generateStaticParams() {
  return ALL_13_SERVICES_DETAILED.map((service) => ({
    slug: service.slug,
  }));
}

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = ALL_13_SERVICES_DETAILED.find((s) => s.slug === params.slug);

  if (!service) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-cream overflow-x-hidden">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Content Area */}
      <main className="pt-32 pb-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/#hizmetler"
            className="inline-flex items-center gap-2 text-xs font-mono font-bold text-neutral-400 hover:text-accent transition-colors uppercase tracking-wider"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Tüm Hizmetlere Geri Dön</span>
          </Link>
        </div>

        {/* Hero Section of Service Detail */}
        <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-10 lg:p-14 shadow-2xl mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-accent/10 rounded-full blur-3xl pointer-events-none" />

          {/* Top Pill: Number & Category */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full bg-accent text-[#0A0A0A] text-xs font-black font-mono">
              HİZMET #{service.num}
            </span>
            <span className="text-xs font-mono font-bold text-neutral-400 tracking-wider uppercase">
              {service.category}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold">
              {service.badge}
            </span>
          </div>

          {/* Service Title */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-cream tracking-tight mb-6 font-sans">
            {service.title}
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-neutral-300 font-medium leading-relaxed mb-6">
            {service.tagline}
          </p>

          {/* Hero Narrative */}
          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl mb-8">
            {service.heroDesc}
          </p>

          {/* Direct CTA Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
            <a
              href="https://wa.me/905414842426"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 rounded-full bg-accent hover:bg-accent-hover text-[#0A0A0A] font-bold text-xs sm:text-sm tracking-wide uppercase transition-all shadow-lg hover:scale-105"
            >
              <MessageSquare className="w-4 h-4 fill-[#0A0A0A]" />
              <span>Bu Hizmet İçin WhatsApp Teklifi Al</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            <a
              href="tel:05414842426"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-white font-bold text-xs sm:text-sm transition-all"
            >
              <Phone className="w-4 h-4 text-accent" />
              <span>0541 484 24 26</span>
            </a>
          </div>
        </div>

        {/* Two-Column Breakdown: Deliverables & How It Works */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Card 1: Deliverables */}
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8">
            <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-4">
              <Sparkles className="w-4 h-4 text-accent" />
              <span>Hizmet Kapsamı & Neler Alırsınız?</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-cream mb-6">
              Net Teslimatlar & Süreç
            </h3>
            <ul className="space-y-3.5">
              {service.deliverables.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-neutral-300">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0 mt-1" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card 2: How It Works & Result Metric */}
          <div className="bg-[#121212] border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-accent uppercase mb-4">
                <Zap className="w-4 h-4 text-accent" />
                <span>Çalışma Adımları</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-cream mb-6">
                Nasıl İlerliyoruz?
              </h3>
              <ul className="space-y-4 mb-8">
                {service.howItWorks.map((step, idx) => (
                  <li key={idx} className="p-3.5 rounded-xl bg-white/5 border border-white/10 text-xs sm:text-sm text-neutral-300">
                    {step}
                  </li>
                ))}
              </ul>
            </div>

            {/* Expected Result Box */}
            <div className="p-4 rounded-2xl bg-accent/15 border border-accent/30 text-center">
              <span className="text-[11px] font-mono text-neutral-400 uppercase block mb-1">
                Hedeflenen Sonuç & Metrik
              </span>
              <span className="text-lg sm:text-xl font-black text-accent">
                {service.metricsResult}
              </span>
            </div>
          </div>

        </div>

        {/* Other 12 Services Quick Links */}
        <div className="border-t border-white/10 pt-10">
          <h4 className="text-base font-bold text-cream mb-6 font-sans">
            Diğer Uzmanlık Alanlarımızı İnceleyin:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {ALL_13_SERVICES_DETAILED.filter(s => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                href={`/hizmetler/${s.slug}`}
                className="p-3.5 rounded-xl bg-[#121212] border border-white/10 hover:border-accent transition-all flex items-center justify-between text-xs font-bold text-neutral-300 hover:text-white group"
              >
                <span>{s.num} {s.title}</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent opacity-0 group-hover:opacity-100 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
