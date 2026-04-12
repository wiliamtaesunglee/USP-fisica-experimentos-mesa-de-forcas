"use client";

import { useEffect, useState } from "react";
import { SLIDE_IDS, SLIDE_LABELS } from "@/lib/constants";

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

  return (
    <>
      {/* Progress dots (right side) */}
      <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3 hidden md:flex">
        {SLIDE_IDS.map((id, i) => (
          <button
            key={id}
            onClick={() => scrollTo(i)}
            className="group flex items-center gap-3 justify-end"
            aria-label={`Ir para ${SLIDE_LABELS[i]}`}
          >
            <span
              className={`text-xs transition-opacity duration-300 ${
                activeIndex === i
                  ? "opacity-100 text-accent-blue"
                  : "opacity-0 group-hover:opacity-70 text-muted"
              }`}
            >
              {SLIDE_LABELS[i]}
            </span>
            <span
              className={`block rounded-full transition-all duration-300 ${
                activeIndex === i
                  ? "w-3 h-3 bg-accent-blue"
                  : "w-2 h-2 bg-surface-light group-hover:bg-muted"
              }`}
            />
          </button>
        ))}
      </nav>

      {/* Bottom bar with prev/next and slide counter */}
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

        <div className="flex items-center gap-2">
          <span className="text-accent-blue font-bold">{activeIndex + 1}</span>
          <span className="text-muted text-sm">/</span>
          <span className="text-muted text-sm">{SLIDE_IDS.length}</span>
          <span className="text-muted text-xs ml-2 hidden sm:inline">
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

      {/* Progress bar at very bottom */}
      <div className="fixed bottom-0 left-0 right-0 z-[51] h-0.5 bg-surface">
        <div
          className="h-full bg-accent-blue transition-all duration-500 ease-out"
          style={{
            width: `${((activeIndex + 1) / SLIDE_IDS.length) * 100}%`,
          }}
        />
      </div>
    </>
  );
}
