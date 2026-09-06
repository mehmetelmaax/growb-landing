"use client";

import React, { useState } from "react";
import { FAQ_DATA } from "@/data/content";
import { Plus } from "lucide-react";

export const Faq: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="sss" className="relative py-8 sm:py-10">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <span className="mb-3 block font-mono text-xs font-bold uppercase tracking-[0.2em] text-accent">
            // AKLINIZA TAKILANLAR
          </span>
          <h2 className="mb-4 text-3xl font-black tracking-tight text-cream sm:text-5xl">
            Sıkça Sorulan Sorular.
          </h2>
          <p className="mx-auto max-w-lg text-sm font-normal text-muted sm:text-base">
            Esnafımızın ve büyüme ortaklarımızın bize en sık danıştığı konuları ve verdiğimiz yazılı
            taahhütleri şeffaflıkla derledik.
          </p>
        </div>

        {/* 8 Accordion Items */}
        <div className="flex flex-col gap-3.5">
          {FAQ_DATA.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-surface transition-colors hover:border-accent/40"
              >
                <button
                  id={`faq-btn-${item.id}`}
                  type="button"
                  onClick={() => toggleFaq(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="flex w-full select-none items-center justify-between p-5 text-left text-cream focus:outline-none focus-visible:ring-2 focus-visible:ring-accent sm:p-6"
                >
                  <span className="pr-4 text-base font-bold tracking-tight sm:text-lg">
                    {item.question}
                  </span>
                  <div
                    className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-200 ${
                      isOpen
                        ? "rotate-45 border-accent bg-accent text-[#0A0A0A]"
                        : "border-white/10 bg-surface-dark text-muted"
                    }`}
                  >
                    <Plus className="h-4 w-4" />
                  </div>
                </button>

                <div
                  id={`faq-answer-${item.id}`}
                  role="region"
                  aria-labelledby={`faq-btn-${item.id}`}
                  className={`grid transition-[grid-template-rows,opacity] duration-300 ease-in-out ${
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    <div className="border-t border-white/5 px-5 pb-6 pt-1 text-sm font-normal leading-relaxed text-muted sm:px-6 sm:text-base">
                      {item.answer}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
