"use client";

import { useEffect, useState } from "react";
import { SLIDE_IDS, SLIDE_LABELS, SECTIONS, DIVIDER_INDICES } from "@/lib/constants";

function getSectionIndex(slideIndex: number): number {
  if (slideIndex === 0) return -1; // capa
  if (slideIndex < 5) return 0;
  if (slideIndex < 9) return 1;
  return 2;
}

function getSectionColor(slideIndex: number): string {
  const idx = getSectionIndex(slideIndex);
  return idx >= 0 ? SECTIONS[idx].color : "#a1a1aa";
}

export default function SlideNav() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SLIDE_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveIndex(index);
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (index: number) => {
    document.getElementById(SLIDE_IDS[index])?.scrollIntoView({ behavior: "smooth" });
  };

  const prev = () => scrollTo(Math.max(0, activeIndex - 1));
  const next = () => scrollTo(Math.min(SLIDE_IDS.length - 1, activeIndex + 1));

  const sectionIdx = getSectionIndex(activeIndex);
  const sectionColor = getSectionColor(activeIndex);

  return (
    <>
      {/* Progress dots (right side) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-1.5">
        {SLIDE_IDS.map((id, i) => {
          const isDivider = (DIVIDER_INDICES as readonly number[]).includes(i);
          const color = getSectionColor(i);

          return (
            <button
              key={id}
              onClick={() => scrollTo(i)}
              className={`group flex items-center gap-2.5 justify-end ${isDivider ? "mt-2" : ""}`}
              aria-label={`Ir para ${SLIDE_LABELS[i]}`}
            >
              <span
                className={`text-xs transition-opacity duration-300 whitespace-nowrap ${
                  activeIndex === i
                    ? "opacity-100"
                    : "opacity-0 group-hover:opacity-70"
                }`}
                style={{ color: activeIndex === i ? color : "#71717a" }}
              >
                {SLIDE_LABELS[i]}
              </span>
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isDivider ? "w-2 h-2" : ""
                }`}
                style={{
                  width: activeIndex === i ? "12px" : isDivider ? "8px" : "6px",
                  height: activeIndex === i ? "12px" : isDivider ? "8px" : "6px",
                  backgroundColor:
                    activeIndex === i ? color : isDivider ? `${color}60` : "#27272a",
                }}
              />
            </button>
          );
        })}
      </nav>

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-3 bg-background/80 backdrop-blur-sm border-t border-surface-light/50">
        <button
          onClick={prev}
          disabled={activeIndex === 0}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-light text-muted hover:text-foreground"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="rotate-180">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Anterior
        </button>

        <div className="flex items-center gap-3">
          {/* Section indicator */}
          <span
            className="text-xs font-bold px-2.5 py-1 rounded-full"
            style={{ backgroundColor: `${sectionColor}20`, color: sectionColor }}
          >
            {sectionIdx >= 0 ? `Parte ${sectionIdx + 1}` : "Capa"}
          </span>

          <span className="text-muted text-sm">
            <span className="font-bold" style={{ color: sectionColor }}>
              {activeIndex + 1}
            </span>
            {" / "}
            {SLIDE_IDS.length}
          </span>

          <span className="text-muted text-xs hidden sm:inline">
            {SLIDE_LABELS[activeIndex]}
          </span>
        </div>

        <button
          onClick={next}
          disabled={activeIndex === SLIDE_IDS.length - 1}
          className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-30 disabled:cursor-not-allowed hover:bg-surface-light text-muted hover:text-foreground"
        >
          Próximo
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M6 3l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>

      {/* Segmented progress bar */}
      <div className="fixed bottom-0 left-0 right-0 z-[51] h-0.5 flex">
        {SECTIONS.map((section, i) => {
          const sectionStart = 1 + i * 4; // offset by 1 for capa
          const sectionEnd = sectionStart + 3;
          const progress =
            activeIndex < sectionStart
              ? 0
              : activeIndex >= sectionEnd
                ? 100
                : ((activeIndex - sectionStart + 1) / 4) * 100;

          return (
            <div key={section.id} className="flex-1 bg-surface">
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: `${progress}%`,
                  backgroundColor: section.color,
                }}
              />
            </div>
          );
        })}
      </div>
    </>
  );
}
