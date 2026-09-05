"use client";

import { CircularBadge } from "./ui/circular-badge";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { TESTIMONIALS_DATA } from "@/data/content";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import Image from "next/image";

export const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  };

  return (
    <section className="py-24 md:py-36 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-xs font-mono font-bold tracking-[0.2em] text-accent uppercase block mb-3">
              // MÜŞTERİ YORUMLARI
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-cream tracking-tight">
              Büyüme Ortaklarımız Ne Diyor?
            </h2>
          </div>

          {/* Prev/Next Controls */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Önceki Yorum"
              className="w-12 h-12 rounded-full border border-white/10 bg-surface flex items-center justify-center text-cream hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              aria-label="Sonraki Yorum"
              className="w-12 h-12 rounded-full border border-white/10 bg-surface flex items-center justify-center text-cream hover:border-accent hover:text-accent transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Viewport */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-6 cursor-grab active:cursor-grabbing"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) nextSlide();
              else if (info.offset.x > 50) prevSlide();
            }}
          >
            {TESTIMONIALS_DATA.map((item, idx) => {
              const isVisible = idx === currentIndex || idx === (currentIndex + 1) % TESTIMONIALS_DATA.length;
              return (
                <div
                  key={item.id}
                  className={`w-full md:w-[calc(50%-12px)] flex-shrink-0 p-8 sm:p-10 rounded-3xl bg-surface border border-white/10 transition-all duration-500 relative flex flex-col justify-between ${
                    isVisible ? "opacity-100 scale-100" : "opacity-30 scale-95 hidden md:flex"
                  }`}
                >
                  <div>
                    {/* Top: Customer Logo & Quote Icon */}
                    <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                      <span className="text-xs font-mono font-bold text-accent tracking-widest uppercase">
                        {item.logo}
                      </span>
                      <Quote className="w-8 h-8 text-white/10" />
                    </div>

                    {/* Middle: Quote Text */}
                    <p className="text-base sm:text-lg text-cream/90 font-medium leading-relaxed mb-8 italic">
                      "{item.quote}"
                    </p>
                  </div>

                  {/* Bottom: Avatar + Name + Title */}
                  <div className="flex items-center gap-4 pt-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden border border-accent/40 flex-shrink-0">
                      <Image src={item.avatar} alt={item.author} fill className="object-cover" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-cream tracking-tight">
                        {item.author}
                      </h4>
                      <p className="text-xs text-muted">
                        {item.role}, <span className="text-accent/90">{item.company}</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
