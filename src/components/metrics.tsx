"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
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
  const inView = useInView(ref, { once: true, margin: "-100px" });

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
    <span ref={ref} className="font-mono tracking-tight font-black">
      {prefix}
      {count.toFixed(decimals)}
      {suffix}
    </span>
  );
};

export const Metrics: React.FC = () => {
  return (
    <section id="metrikler" className="py-24 md:py-36 bg-[#0D0D0D] border-y border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              // SAHA VERİLERİ & METRİKLER
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-cream tracking-tight">
              Rakamlarla İspatlanmış Gerçek Etki.
            </h2>
          </div>
          <p className="text-muted text-sm md:text-base max-w-md font-normal leading-relaxed">
            Hizmet verdiğimiz işletmelerde laf üretmiyoruz; Google ölçümlerinde ve banka hesaplarında görülen somut sonuçlar kaydediyoruz.
          </p>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS_DATA.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: "easeOut" }}
              className="p-8 rounded-3xl bg-surface border border-white/10 hover:border-accent/40 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/15 transition-all" />

              <div className="text-4xl md:text-5xl font-black text-cream group-hover:text-accent transition-colors mb-4 flex items-baseline">
                <Counter
                  target={item.target}
                  decimals={item.decimals}
                  prefix={item.prefix}
                  suffix={item.suffix}
                />
              </div>

              <h3 className="text-base font-bold text-cream mb-2 tracking-tight">
                {item.label}
              </h3>
              <p className="text-xs text-muted leading-relaxed font-normal">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
