"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import { SECTIONS } from "@/lib/constants";

interface SectionDividerProps {
  section: number; // 0, 1, or 2
}

export default function SectionDivider({ section }: SectionDividerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const s = SECTIONS[section];

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ref.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".sd-number", {
        scale: 0,
        opacity: 0,
        duration: 1.0,
        ease: "back.out(3)",
      });

      tl.from(
        ".sd-title",
        { y: 30, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.2"
      );

      tl.from(
        ".sd-line",
        { scaleX: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      );

      tl.from(".sd-step", {
        opacity: 0,
        y: 10,
        stagger: 0.15,
        duration: 0.5,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id={s.id} className="bg-surface/30">
      <div ref={ref} className="flex flex-col items-center justify-center text-center space-y-8">
        {/* Part number */}
        <div
          className="sd-number flex items-center justify-center w-24 h-24 rounded-full border-2"
          style={{ borderColor: s.color, color: s.color }}
        >
          <span className="text-4xl font-bold">
            {String(section + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Title */}
        <h2 className="sd-title text-4xl md:text-5xl font-bold" style={{ color: s.color }}>
          {s.title}
        </h2>

        {/* Divider line */}
        <div
          className="sd-line h-0.5 w-32"
          style={{ backgroundColor: s.color, transformOrigin: "center" }}
        />

        {/* Progress steps */}
        <div className="flex items-center gap-4">
          {SECTIONS.map((sec, i) => (
            <div key={sec.id} className="sd-step flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full transition-all ${
                  i === section ? "scale-125" : "opacity-30"
                }`}
                style={{ backgroundColor: sec.color }}
              />
              <span
                className={`text-sm font-medium ${
                  i === section ? "" : "opacity-30"
                }`}
                style={{ color: i === section ? sec.color : "#71717a" }}
              >
                {sec.title}
              </span>
              {i < SECTIONS.length - 1 && (
                <div className="w-8 h-px bg-surface-light ml-2" />
              )}
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
}
