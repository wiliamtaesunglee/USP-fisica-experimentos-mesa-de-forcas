"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorDecomposition from "@/components/svg/VectorDecomposition";
import MathFormula from "@/components/ui/MathFormula";

const properties = [
  { label: "Conhecemos uma massa (referência)", color: "text-accent-amber" },
  { label: "Ajustamos os ângulos até o equilíbrio", color: "text-accent-green" },
  { label: "Calculamos as massas desconhecidas", color: "text-accent-blue" },
];

export default function Slide2Concept() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s2-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s2-formula", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.6, ease: "back.out(2)",
      });

      gsap.from(".s2-prop", {
        scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
        x: -30, opacity: 0, stagger: 0.15, duration: 0.4,
      });

      gsap.from(".s2-diagram", {
        scrollTrigger: { trigger: ref.current, start: "top 55%", toggleActions: "play none none none" },
        scale: 0.9, opacity: 0, duration: 0.6,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="conceito">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="s2-title text-3xl md:text-4xl font-bold">
            Conceito <span className="text-accent-blue">Físico</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <div className="s2-formula p-5 rounded-xl bg-surface border border-accent-blue/30 text-center flex-1">
              <MathFormula tex="\sum F_x = 0" display />
            </div>
            <div className="s2-formula p-5 rounded-xl bg-surface border border-accent-green/30 text-center flex-1">
              <MathFormula tex="\sum F_y = 0" display />
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm text-muted uppercase tracking-wider font-medium">
              Método:
            </p>
            {properties.map((p, i) => (
              <div key={i} className={`s2-prop flex items-center gap-3`}>
                <span className={`w-2 h-2 rounded-full ${p.color.replace("text-", "bg-")}`} />
                <span className={`text-base font-medium ${p.color}`}>{p.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="s2-diagram flex-shrink-0 w-full md:w-[45%]">
          <VectorDecomposition />
        </div>
      </div>
    </SlideContainer>
  );
}
