"use client";

import React, { useRef, useEffect, useState } from "react";
import { METRICS_DATA } from "@/data/content";

interface CounterProps {
  target: number;
  decimals: number;
  prefix?: string;
  suffix?: string;
}

const Counter: React.FC<CounterProps> = ({ target, decimals, prefix = "", suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let startTime: number;
    const duration = 1800; // ms

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // easeOutExpo
      const current = progress === 1 ? target : target * (1 - Math.pow(2, -10 * progress));
      setCount(current);

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [inView, target]);

  return (
    <span ref={ref} className="font-mono font-black tracking-tight">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Metrics: React.FC = () => {
  return (
    <section
      id="metrikler"
      className="relative border-y border-white/5 bg-[#0D0D0D] py-24 md:py-36"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-16 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
              // SAHA VERİLERİ & METRİKLER
            </span>
            <h2 className="text-3xl font-extrabold tracking-tight text-cream sm:text-5xl">
              Rakamlarla İspatlanmış Gerçek Etki.
            </h2>
          </div>
          <p className="max-w-md text-sm font-normal leading-relaxed text-muted md:text-base">
            Hizmet verdiğimiz işletmelerde laf üretmiyoruz; Google ölçümlerinde ve banka
            hesaplarında görülen somut sonuçlar kaydediyoruz.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {METRICS_DATA.map((item, idx) => (
            <div
              key={idx}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-surface p-8 transition-all duration-300 hover:border-accent/40"
            >
              <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-accent/5 blur-2xl transition-all group-hover:bg-accent/15" />

              <div className="mb-4 flex items-baseline text-4xl font-black text-cream transition-colors group-hover:text-accent md:text-5xl">
                <Counter
                  target={item.target}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              <h3 className="mb-2 text-base font-bold tracking-tight text-cream">{item.label}</h3>
              <p className="text-xs font-normal leading-relaxed text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
