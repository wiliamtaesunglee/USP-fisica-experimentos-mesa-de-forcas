"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorDecomposition from "@/components/svg/VectorDecomposition";
import MathFormula from "@/components/ui/MathFormula";

const properties = [
  { label: "Intensidade", desc: "massa pendurada", icon: "⊛" },
  { label: "Direção", desc: "ângulo na mesa", icon: "∠" },
  { label: "Sentido", desc: "orientação do fio", icon: "→" },
];

export default function Slide4Forces() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide4-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".prop-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.5,
      });

      gsap.from(".formula-block", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 55%",
          toggleActions: "play none none none",
        },
        x: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="forcas">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-shrink-0 w-full md:w-[45%]">
          <VectorDecomposition />
        </div>

        <div className="flex-1 space-y-6">
          <h2 className="slide4-title text-3xl md:text-4xl font-bold">
            Forças e <span className="text-accent-amber">Vetores</span>
          </h2>

          <p className="text-muted text-sm">Cada força é representada por:</p>

          <div className="space-y-3">
            {properties.map((prop, i) => (
              <div
                key={i}
                className="prop-card flex items-center gap-4 p-3 rounded-lg bg-surface border border-surface-light"
              >
                <span className="text-2xl text-accent-amber">{prop.icon}</span>
                <div>
                  <span className="font-semibold">{prop.label}</span>
                  <span className="text-muted ml-2">— {prop.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-3 pt-4">
            <p className="text-sm text-muted uppercase tracking-wider font-medium">
              Decomposição
            </p>
            <div className="formula-block p-4 rounded-lg bg-surface border border-accent-blue/20">
              <MathFormula tex="F_x = F \cdot \cos(\theta)" display />
            </div>
            <div className="formula-block p-4 rounded-lg bg-surface border border-accent-green/20">
              <MathFormula tex="F_y = F \cdot \sin(\theta)" display />
            </div>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
