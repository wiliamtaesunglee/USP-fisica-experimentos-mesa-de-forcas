"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import { STUDENTS } from "@/lib/constants";

export default function Slide0Cover() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".cover-usp", {
        y: -30,
        opacity: 0,
        duration: 1.0,
        ease: "power3.out",
      });

      tl.from(
        ".cover-course",
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      tl.from(
        ".cover-line",
        { scaleX: 0, duration: 0.7, ease: "power2.out" },
        "-=0.2"
      );

      tl.from(
        ".cover-title",
        { y: 40, opacity: 0, duration: 1.1, ease: "power3.out" },
        "-=0.2"
      );

      tl.from(
        ".cover-subtitle",
        { y: 20, opacity: 0, duration: 0.8, ease: "power3.out" },
        "-=0.3"
      );

      tl.from(".cover-student", {
        y: 20,
        opacity: 0,
        stagger: 0.25,
        duration: 0.7,
        ease: "power2.out",
      });

      tl.from(
        ".cover-semester",
        { opacity: 0, duration: 0.7 },
        "-=0.2"
      );
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="capa">
      <div ref={ref} className="flex flex-col items-center justify-center text-center space-y-8 max-w-2xl mx-auto">
        {/* USP branding */}
        <div className="space-y-2">
          <p className="cover-usp text-sm md:text-base uppercase tracking-[0.3em] text-muted font-medium">
            Universidade de São Paulo
          </p>
          <p className="cover-course text-xs md:text-sm uppercase tracking-[0.2em] text-muted/70">
            Física Experimental
          </p>
        </div>

        {/* Divider */}
        <div
          className="cover-line h-px w-24 bg-accent-blue"
          style={{ transformOrigin: "center" }}
        />

        {/* Title */}
        <div className="space-y-4">
          <h1 className="cover-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Equilíbrio Estático de{" "}
            <span className="text-accent-blue">Três Forças</span>
          </h1>
          <p className="cover-subtitle text-lg md:text-xl text-muted">
            Experimento de mesa de forças
          </p>
        </div>

        {/* Students */}
        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          {STUDENTS.map((student) => (
            <div
              key={student.email}
              className="cover-student flex flex-col items-center gap-1 px-5 py-3 rounded-xl bg-surface border border-surface-light"
            >
              <span className="font-semibold text-base">{student.name}</span>
              <span className="text-xs text-muted">{student.email}</span>
            </div>
          ))}
        </div>

        {/* Semester */}
        <p className="cover-semester text-xs text-muted/60 uppercase tracking-wider">
          1.o Semestre — 2026
        </p>
      </div>
    </SlideContainer>
  );
}
