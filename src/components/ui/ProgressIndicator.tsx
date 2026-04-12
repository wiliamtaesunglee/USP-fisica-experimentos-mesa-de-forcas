"use client";

import { useEffect, useState } from "react";
import { SLIDE_IDS, SLIDE_LABELS } from "@/lib/constants";

export default function ProgressIndicator() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    SLIDE_IDS.forEach((id, index) => {
      const el = document.getElementById(id);
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveIndex(index);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
      {SLIDE_IDS.map((id, i) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
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
  );
}
