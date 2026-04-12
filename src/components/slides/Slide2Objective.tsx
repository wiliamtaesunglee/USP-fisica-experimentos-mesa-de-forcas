"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SlideContainer from "@/components/ui/SlideContainer";

const objectives = [
  {
    icon: "Σ",
    text: "A soma das forças é zero no equilíbrio",
    color: "text-accent-blue",
    border: "border-accent-blue/30",
    bg: "bg-accent-blue/10",
  },
  {
    icon: "θ",
    text: "Direção e sentido importam",
    color: "text-accent-green",
    border: "border-accent-green/30",
    bg: "bg-accent-green/10",
  },
  {
    icon: "→",
    text: "Forças são grandezas vetoriais",
    color: "text-accent-amber",
    border: "border-accent-amber/30",
    bg: "bg-accent-amber/10",
  },
];

export default function Slide2Objective() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide2-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".obj-card", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        y: 50,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power2.out",
      });

      gsap.from(".slide2-footer", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 55%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="objetivo">
      <div ref={ref} className="space-y-10 text-center">
        <h2 className="slide2-title text-3xl md:text-4xl font-bold">
          O objetivo é <span className="text-accent-blue">verificar</span> que:
        </h2>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          {objectives.map((obj, i) => (
            <div
              key={i}
              className={`obj-card flex-1 max-w-sm mx-auto md:mx-0 p-6 rounded-xl border ${obj.border} ${obj.bg} backdrop-blur-sm`}
            >
              <div className={`text-4xl font-bold mb-3 ${obj.color}`}>
                {obj.icon}
              </div>
              <p className="text-lg">{obj.text}</p>
            </div>
          ))}
        </div>

        <p className="slide2-footer text-muted text-base max-w-2xl mx-auto">
          O experimento permite visualizar conceitos que normalmente aparecem de
          forma abstrata: decomposição vetorial, intensidade, direção e
          resultante nula.
        </p>
      </div>
    </SlideContainer>
  );
}
