"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const MANIFESTO_WORDS = [
  "BİZ", "MASRAF", "DEĞİL;", "TELEFONUNUZU", "VE", "SATIŞLARINIZI",
  "DÜZENLİ", "ÇALDIRAN", "BİR", "SATIŞ", "MAKİNESİ", "KURUYORUZ.",
  "SADECE", "AJANS", "DEĞİL,", "BÜYÜME", "ORTAĞINIZIZ."
];

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.85", "end 0.35"],
  });

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="py-24 sm:py-36 bg-[#0A0A0A] text-cream relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Category Badge */}
        <div className="flex items-center justify-center gap-2 mb-8 text-xs font-mono font-bold tracking-[0.25em] text-accent uppercase">
          <span className="w-2 h-2 rounded-full bg-accent animate-ping" />
          <span>GROWB BÜYÜME MANİFESTOSU</span>
        </div>

        {/* Short, Punchy Kinetic Typography */}
        <div className="text-center">
          <p className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.18] uppercase font-sans flex flex-wrap justify-center gap-x-3 sm:gap-x-5 gap-y-2 sm:gap-y-4">
            {MANIFESTO_WORDS.map((word, index) => {
              const start = index / MANIFESTO_WORDS.length;
              const end = start + 1 / MANIFESTO_WORDS.length;

              return (
                <WordReveal
                  key={index}
                  word={word}
                  progress={scrollYProgress}
                  range={[start, end]}
                />
              );
            })}
          </p>
        </div>
      </div>
    </section>
  );
};

interface WordRevealProps {
  word: string;
  progress: any;
  range: [number, number];
}

const WordReveal: React.FC<WordRevealProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(
    progress,
    range,
    ["rgba(255, 253, 245, 0.18)", "#FFFDF5"]
  );

  return (
    <motion.span style={{ opacity, color }} className="transition-colors">
      {word}
    </motion.span>
  );
};
