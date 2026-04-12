"use client";

import { useEffect, useRef } from "react";
import { SLIDE_IDS } from "@/lib/constants";

export function useSlideNavigation() {
  const currentIndex = useRef(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = SLIDE_IDS.indexOf(
              entry.target.id as (typeof SLIDE_IDS)[number]
            );
            if (idx !== -1) currentIndex.current = idx;
          }
        });
      },
      { threshold: 0.5 }
    );

    SLIDE_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      let nextIndex = currentIndex.current;

      switch (e.key) {
        case "ArrowDown":
        case "ArrowRight":
        case " ":
        case "PageDown":
          e.preventDefault();
          nextIndex = Math.min(currentIndex.current + 1, SLIDE_IDS.length - 1);
          break;
        case "ArrowUp":
        case "ArrowLeft":
        case "PageUp":
          e.preventDefault();
          nextIndex = Math.max(currentIndex.current - 1, 0);
          break;
        default:
          return;
      }

      if (nextIndex !== currentIndex.current) {
        document
          .getElementById(SLIDE_IDS[nextIndex])
          ?.scrollIntoView({ behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      observer.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
}
