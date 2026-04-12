"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";

const observations = [
  {
    title: "Ângulos importam",
    text: "O equilíbrio depende diretamente dos ângulos de aplicação das forças, não apenas de suas intensidades.",
    color: "border-accent-blue/40",
    accent: "text-accent-blue",
  },
  {
    title: "Massas iguais ≠ equilíbrio",
    text: "Não basta igualar as massas penduradas. A distribuição angular é determinante para o equilíbrio.",
    color: "border-accent-green/40",
    accent: "text-accent-green",
  },
  {
    title: "Erros experimentais",
    text: "Pequenas imprecisões em atrito, leitura angular e massas afetam o resultado observado.",
    color: "border-accent-amber/40",
    accent: "text-accent-amber",
  },
];

export default function Slide6Observations() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide6-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".obs-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "power2.out",
      });

      // Subtle shake on the error card
      gsap.to(".obs-shake", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 50%",
          toggleActions: "play none none none",
        },
        x: 3,
        duration: 0.08,
        yoyo: true,
        repeat: 5,
        delay: 1.5,
        ease: "power1.inOut",
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="observacoes">
      <div ref={ref} className="space-y-8 text-center">
        <h2 className="slide6-title text-3xl md:text-4xl font-bold">
          O que <span className="text-accent-green">observamos</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {observations.map((obs, i) => (
            <div
              key={i}
              className={`obs-card ${i === 2 ? "obs-shake" : ""} p-6 rounded-xl bg-surface border ${obs.color} text-left`}
            >
              <h3 className={`text-lg font-bold mb-3 ${obs.accent}`}>
                {obs.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed">{obs.text}</p>
            </div>
          ))}
        </div>
      </div>
    </SlideContainer>
  );
}
