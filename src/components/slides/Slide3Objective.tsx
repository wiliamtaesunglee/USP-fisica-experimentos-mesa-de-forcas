"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorDecomposition from "@/components/svg/VectorDecomposition";
import MathFormula from "@/components/ui/MathFormula";

const limitations = [
  "Modelo ideal ignora atrito e oscilações",
  "Leitura angular tem precisão limitada",
  "Massas nominais podem diferir das reais",
];

export default function Slide3Objective() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s3o-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.1,
      });

      gsap.from(".s3o-obj", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        scale: 0.9, opacity: 0, duration: 0.8, ease: "back.out(2)",
      });

      gsap.from(".s3o-formula", {
        scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none reverse" },
        x: 30, opacity: 0, stagger: 0.25, duration: 0.7,
      });

      gsap.from(".s3o-lim", {
        scrollTrigger: { trigger: ref.current, start: "top 50%", toggleActions: "play none none reverse" },
        x: -20, opacity: 0, stagger: 0.15, duration: 0.5,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="objetivo">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="s3o-title text-3xl md:text-4xl font-bold">
            Objetivo e{" "}
            <span className="text-accent-green">Equações</span>
          </h2>

          <div className="s3o-obj p-4 rounded-xl bg-accent-blue/10 border border-accent-blue/30">
            <p className="text-sm text-muted mb-1 font-medium">Objetivo</p>
            <p className="text-base">
              Determinar as massas desconhecidas dos corpos vermelho e azul,
              utilizando a massa conhecida (laranja) e os ângulos de equilíbrio.
            </p>
          </div>

          <div className="space-y-3">
            <p className="text-xs text-muted uppercase tracking-wider font-medium">
              Equações utilizadas
            </p>
            <div className="s3o-formula p-3 rounded-lg bg-surface border border-surface-light">
              <MathFormula tex="\sum F_x = 0 \;\Rightarrow\; \textcolor{#ef4444}{F_1}\cos(\alpha) + \textcolor{#3b82f6}{F_2}\cos(\beta) + \textcolor{#f59e0b}{F_3} = 0" display />
            </div>
            <div className="s3o-formula p-3 rounded-lg bg-surface border border-surface-light">
              <MathFormula tex="\sum F_y = 0 \;\Rightarrow\; \textcolor{#ef4444}{F_1}\sin(\alpha) + \textcolor{#3b82f6}{F_2}\sin(\beta) = 0" display />
            </div>
            <div className="s3o-formula p-3 rounded-lg bg-surface border border-accent-amber/20">
              <MathFormula tex="m_{\text{calc}} = \textcolor{#f59e0b}{m_{\text{ref}}} \cdot \frac{\cos(\alpha)}{\cos(\beta)}" display />
            </div>
            <div className="flex flex-wrap gap-2 text-xs text-muted">
              <span><span className="inline-block w-2 h-2 rounded-full bg-accent-amber mr-1" />F₃ = laranja (ref, 0°)</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-accent-red mr-1" />F₁ = vermelho (α)</span>
              <span><span className="inline-block w-2 h-2 rounded-full bg-accent-blue mr-1" />F₂ = azul (β)</span>
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-muted uppercase tracking-wider font-medium">
              Limitações do modelo
            </p>
            {limitations.map((lim, i) => (
              <div key={i} className="s3o-lim flex items-center gap-2 text-sm text-muted">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red flex-shrink-0" />
                {lim}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-[40%]">
          <VectorDecomposition />
        </div>
      </div>
    </SlideContainer>
  );
}
