"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";

const instruments = [
  {
    name: "Transferidor da mesa",
    uncertainty: "± 0,5°",
    desc: "Leitura dos ângulos entre as forças",
    icon: "∠",
  },
  {
    name: "Balança",
    uncertainty: "± 0,1 g",
    desc: "Medição direta das massas dos corpos",
    icon: "⚖",
  },
  {
    name: "Mesa de forças",
    uncertainty: "Atrito nas polias",
    desc: "Plataforma circular com polias e escala angular",
    icon: "◎",
  },
];

export default function Slide2Instruments() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s2i-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s2i-card", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        y: 40, opacity: 0, stagger: 0.2, duration: 0.5, ease: "power2.out",
      });

      gsap.from(".s2i-note", {
        scrollTrigger: { trigger: ref.current, start: "top 50%", toggleActions: "play none none none" },
        opacity: 0, y: 15, duration: 0.4,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="instrumentos">
      <div ref={ref} className="space-y-8 max-w-3xl mx-auto">
        <h2 className="s2i-title text-3xl md:text-4xl font-bold text-center">
          Instrumentos e{" "}
          <span className="text-accent-blue">Incertezas</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {instruments.map((inst, i) => (
            <div
              key={i}
              className="s2i-card p-6 rounded-xl bg-surface border border-surface-light text-center space-y-3"
            >
              <span className="text-3xl block">{inst.icon}</span>
              <h3 className="font-semibold text-lg">{inst.name}</h3>
              <p className="text-sm text-muted">{inst.desc}</p>
              <div className="inline-block px-4 py-2 rounded-full bg-accent-blue/10 border border-accent-blue/30">
                <span className="text-accent-blue font-bold text-sm">
                  {inst.uncertainty}
                </span>
              </div>
            </div>
          ))}
        </div>

        <p className="s2i-note text-muted text-sm text-center max-w-xl mx-auto leading-relaxed">
          As incertezas instrumentais propagam-se para o resultado final.
          Conhecê-las é essencial para avaliar a confiabilidade das massas
          calculadas.
        </p>
      </div>
    </SlideContainer>
  );
}
