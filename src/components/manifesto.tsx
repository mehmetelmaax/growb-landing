"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";

const MANIFESTO_WORDS = [
  "BİZ",
  "MASRAF",
  "DEĞİL;",
  "TELEFONUNUZU",
  "VE",
  "SATIŞLARINIZI",
  "DÜZENLİ",
  "ÇALDIRAN",
  "BİR",
  "SATIŞ",
  "MAKİNESİ",
  "KURUYORUZ.",
  "SADECE",
  "AJANS",
  "DEĞİL,",
  "BÜYÜME",
  "ORTAĞINIZIZ.",
];

export const Manifesto: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const totalWords = MANIFESTO_WORDS.length;

  return (
    <section
      id="manifesto"
      ref={containerRef}
      className="relative overflow-hidden border-y border-white/5 bg-[#0A0A0A] py-32"
    >
      <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
        <h2 className="flex select-none flex-wrap justify-center gap-x-3.5 gap-y-2 text-3xl font-black leading-[1.15] tracking-tight sm:gap-x-5 sm:text-5xl md:text-6xl lg:text-7xl">
          {MANIFESTO_WORDS.map((word, index) => {
            const start = index / totalWords;
            const end = start + 1 / totalWords;
            return (
              <WordReveal
                key={index}
                word={word}
                progress={scrollYProgress}
                range={[start * 0.7, Math.min(1, end * 0.7 + 0.1)]}
              />
            );
          })}
        </h2>
      </div>
    </section>
  );
};

interface WordRevealProps {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}

const WordReveal: React.FC<WordRevealProps> = ({ word, progress, range }) => {
  const opacity = useTransform(progress, range, [0.18, 1]);
  const color = useTransform(progress, range, ["rgba(255, 253, 245, 0.18)", "#FFFDF5"]);

  return (
    <motion.span style={{ opacity, color }} className="transition-colors">
      {word}
    </motion.span>
  );
};
