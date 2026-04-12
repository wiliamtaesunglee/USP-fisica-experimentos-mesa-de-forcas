"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import MathFormula from "@/components/ui/MathFormula";

const steps = [
  { num: "01", text: "Fixar as três massas nos fios da mesa de forças" },
  { num: "02", text: "Ajustar os ângulos das polias até o anel central atingir equilíbrio" },
  { num: "03", text: "Registrar os ângulos de cada configuração de equilíbrio" },
  { num: "04", text: "Calcular as massas desconhecidas usando a massa de referência (laranja) e os ângulos medidos" },
];

export default function Slide4Procedure() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s4-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s4-step", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        y: 40, opacity: 0, stagger: 0.2, duration: 0.5, ease: "power2.out",
      });

      gsap.from(".s4-formula", {
        scrollTrigger: { trigger: ref.current, start: "top 50%", toggleActions: "play none none none" },
        scale: 0.8, opacity: 0, stagger: 0.2, duration: 0.5, ease: "back.out(2)",
      });

      gsap.from(".s4-count", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none none" },
        scale: 0, opacity: 0, duration: 0.6, ease: "back.out(3)",
      });

      gsap.from(".s4-label", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none none" },
        opacity: 0, y: 10, duration: 0.4, delay: 0.3,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="procedimento">
      <div ref={ref} className="space-y-8 max-w-3xl mx-auto">
        <h2 className="s4-title text-3xl md:text-4xl font-bold text-center">
          <span className="text-accent-amber">Procedimento</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="s4-step flex items-start gap-4 p-5 rounded-xl bg-surface border border-surface-light"
            >
              <span className="text-2xl font-bold text-accent-amber/60 leading-none">
                {step.num}
              </span>
              <p className="text-base leading-relaxed">{step.text}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <div className="s4-formula p-4 rounded-xl bg-surface border border-accent-blue/20 text-center">
            <p className="text-xs text-muted mb-2">A partir dos ângulos:</p>
            <MathFormula tex="m_2 = m_1 \cdot \frac{\cos(\alpha)}{\cos(\beta)}" display />
          </div>
          <div className="s4-formula p-4 rounded-xl bg-surface border border-accent-green/20 text-center">
            <p className="text-xs text-muted mb-2">Massa de referência:</p>
            <MathFormula tex="m_1 = 571{,}8 \text{ g (laranja)}" display />
          </div>
        </div>

        <div className="flex items-center justify-center gap-4">
          <div className="s4-count flex items-center justify-center w-16 h-16 rounded-full bg-accent-blue/10 border-2 border-accent-blue/40">
            <span className="text-2xl font-bold text-accent-blue">15</span>
          </div>
          <p className="s4-label text-lg text-muted">
            configurações de ângulos testadas
          </p>
        </div>
      </div>
    </SlideContainer>
  );
}
