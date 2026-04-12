"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorDiagram from "@/components/svg/VectorDiagram";

export default function Slide1Title() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".slide1-title", {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
      });

      tl.from(
        ".slide1-subtitle",
        {
          y: 40,
          opacity: 0,
          duration: 0.7,
          ease: "power3.out",
        },
        "-=0.4"
      );

      tl.from(
        ".slide1-body",
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: "power3.out",
        },
        "-=0.3"
      );

      tl.from(
        ".slide1-diagram",
        {
          scale: 0.9,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );
    },
    { scope: contentRef }
  );

  return (
    <SlideContainer id="titulo">
      <div
        ref={contentRef}
        className="flex flex-col md:flex-row items-center gap-8 md:gap-12"
      >
        <div className="flex-1 space-y-6">
          <h1 className="slide1-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Equilíbrio Estático de{" "}
            <span className="text-accent-blue">Três Forças</span>
          </h1>
          <p className="slide1-subtitle text-lg md:text-xl text-muted">
            Verificação experimental da soma vetorial nula
          </p>
          <p className="slide1-body text-base text-muted/80 max-w-lg leading-relaxed">
            Este experimento investiga como três forças podem se equilibrar
            quando aplicadas em um mesmo ponto, demonstrando na prática o
            conceito de resultante nula.
          </p>
        </div>
        <div className="slide1-diagram flex-shrink-0 w-full md:w-[45%]">
          <VectorDiagram />
        </div>
      </div>
    </SlideContainer>
  );
}
