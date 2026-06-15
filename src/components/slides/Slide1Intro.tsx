"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorDiagram from "@/components/svg/VectorDiagram";

const materials = [
  "Mesa de forças",
  "Polias",
  "Massas penduradas",
  "Anel central",
  "Fios",
];

export default function Slide1Intro() {
  const contentRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline();

      tl.from(".s1-title", { y: 60, opacity: 0, duration: 1.2, ease: "power3.out" });
      tl.from(".s1-subtitle", { y: 40, opacity: 0, duration: 1.1, ease: "power3.out" }, "-=0.4");
      tl.from(".s1-body", { y: 30, opacity: 0, duration: 1.0, ease: "power3.out" }, "-=0.3");
      tl.from(".s1-mat", { x: -20, opacity: 0, stagger: 0.12, duration: 0.5 }, "-=0.2");
      tl.from(".s1-diagram", { scale: 0.9, opacity: 0, duration: 1.0, ease: "power2.out" }, "-=0.4");
    },
    { scope: contentRef }
  );

  return (
    <SlideContainer id="introducao">
      <div ref={contentRef} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-5">
          <h1 className="s1-title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Equilíbrio Estático de{" "}
            <span className="text-accent-blue">Três Forças</span>
          </h1>
          <p className="s1-subtitle text-lg md:text-xl text-muted">
            Determinação de massas desconhecidas a partir do equilíbrio
          </p>
          <p className="s1-body text-base text-muted/80 max-w-lg leading-relaxed">
            A partir de uma massa conhecida e dos ângulos de equilíbrio entre
            três corpos, determinamos as massas desconhecidas usando a condição
            de soma vetorial nula.
          </p>

          <div className="pt-2">
            <p className="text-xs text-muted uppercase tracking-wider font-medium mb-2">
              Composição do experimento
            </p>
            <div className="flex flex-wrap gap-2">
              {materials.map((mat, i) => (
                <span
                  key={i}
                  className="s1-mat inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface border border-surface-light text-sm"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-blue" />
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="s1-diagram flex-shrink-0 w-full md:w-[42%]">
          <VectorDiagram />
        </div>
      </div>
    </SlideContainer>
  );
}
