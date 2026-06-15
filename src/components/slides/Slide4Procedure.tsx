"use client";

import { useRef } from "react";
import Image from "next/image";
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
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.1,
      });

      gsap.from(".s4-step", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, stagger: 0.3, duration: 0.8, ease: "power2.out",
      });

      gsap.from(".s4-formula", {
        scrollTrigger: { trigger: ref.current, start: "top 50%", toggleActions: "play none none reverse" },
        scale: 0.8, opacity: 0, stagger: 0.3, duration: 0.8, ease: "back.out(2)",
      });

      gsap.from(".s4-photo", {
        scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none reverse" },
        opacity: 0, x: 30, duration: 0.9, ease: "power2.out",
      });

      gsap.from(".s4-count", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none reverse" },
        scale: 0, opacity: 0, duration: 1.0, ease: "back.out(3)",
      });

      gsap.from(".s4-label", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none reverse" },
        opacity: 0, y: 10, duration: 0.7, delay: 0.3,
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

        <div className="flex flex-col md:flex-row gap-6 items-stretch">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-4 flex-1">
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

          <figure className="s4-photo flex-shrink-0 w-full md:w-52 space-y-2">
            <div className="overflow-hidden rounded-xl border border-surface-light">
              <Image
                src="/fotos/anel-central.jpg"
                alt="Detalhe do anel central: os fios das três polias se encontram no anel, sobre o ponto de referência 0° do transferidor"
                width={738}
                height={1600}
                className="w-full h-auto"
                sizes="(min-width: 768px) 13rem, 100vw"
              />
            </div>
            <figcaption className="text-xs text-muted text-center leading-relaxed">
              O <span className="text-accent-amber">anel central</span>: os fios se encontram e o
              equilíbrio é atingido quando o anel fica centrado sobre o 0° do transferidor.
            </figcaption>
          </figure>
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
