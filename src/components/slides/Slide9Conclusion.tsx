"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorCancel from "@/components/svg/VectorCancel";

const conclusions = [
  "É possível determinar massas desconhecidas a partir do equilíbrio",
  "Os ângulos de equilíbrio carregam toda a informação necessária",
  "Erro médio < 1% — teoria validada pela prática",
];

export default function Slide9Conclusion() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s9-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.1,
      });

      gsap.from(".s9-item", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none reverse" },
        x: -30, opacity: 0, stagger: 0.3, duration: 0.8,
      });

      gsap.from(".s9-final", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none reverse" },
        scale: 0.9, opacity: 0, duration: 1.2, ease: "power2.out",
      });

      gsap.from(".s9-quote", {
        scrollTrigger: { trigger: ref.current, start: "top 40%", toggleActions: "play none none reverse" },
        opacity: 0, y: 20, duration: 1.0, delay: 0.3,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="conclusao">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-8">
          <h2 className="s9-title text-3xl md:text-4xl font-bold">
            <span className="text-accent-blue">Conclusão</span>
          </h2>

          <div className="space-y-4">
            <p className="text-sm text-muted uppercase tracking-wider font-medium">
              O experimento demonstrou que:
            </p>
            {conclusions.map((item, i) => (
              <div key={i} className="s9-item flex items-center gap-3 p-3 rounded-lg bg-surface border border-surface-light">
                <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="s9-final p-6 rounded-xl bg-accent-blue/10 border border-accent-blue/30">
            <p className="text-lg md:text-xl font-semibold text-center leading-relaxed">
              Equilíbrio não é igualdade de forças —{" "}
              <span className="text-accent-blue">é cancelamento vetorial.</span>
            </p>
          </div>

          <p className="s9-quote text-muted text-sm text-center italic">
            &ldquo;Conhecendo uma única massa e os ângulos de equilíbrio,
            determinamos as demais — a geometria revela as forças.&rdquo;
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-[40%]">
          <VectorCancel />
        </div>
      </div>
    </SlideContainer>
  );
}
