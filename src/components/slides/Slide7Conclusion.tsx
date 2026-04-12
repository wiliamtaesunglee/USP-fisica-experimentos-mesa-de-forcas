"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import VectorCancel from "@/components/svg/VectorCancel";

const conclusions = [
  "Forças se somam vetorialmente",
  "Equilíbrio ocorre quando a resultante é zero",
  "A prática valida o modelo teórico",
];

export default function Slide7Conclusion() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide7-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".conclusion-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        x: -30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.5,
      });

      gsap.from(".final-message", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 45%",
          toggleActions: "play none none none",
        },
        scale: 0.9,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      gsap.from(".final-highlight", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 40%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.3,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="conclusao">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-8">
          <h2 className="slide7-title text-3xl md:text-4xl font-bold">
            <span className="text-accent-blue">Conclusão</span>
          </h2>

          <div className="space-y-4">
            <p className="text-sm text-muted uppercase tracking-wider font-medium">
              O experimento confirma que:
            </p>
            {conclusions.map((item, i) => (
              <div
                key={i}
                className="conclusion-item flex items-center gap-3 p-3 rounded-lg bg-surface border border-surface-light"
              >
                <span className="w-6 h-6 rounded-full bg-accent-blue/20 text-accent-blue flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {i + 1}
                </span>
                <span className="text-base">{item}</span>
              </div>
            ))}
          </div>

          <div className="final-message p-6 rounded-xl bg-accent-blue/10 border border-accent-blue/30">
            <p className="text-lg md:text-xl font-semibold text-center leading-relaxed">
              Equilíbrio não é igualdade de forças —{" "}
              <span className="text-accent-blue">
                é cancelamento vetorial.
              </span>
            </p>
          </div>

          <p className="final-highlight text-muted text-sm text-center">
            O experimento validou, de forma satisfatória, o modelo teórico de
            equilíbrio estático.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-[40%]">
          <VectorCancel />
        </div>
      </div>
    </SlideContainer>
  );
}
