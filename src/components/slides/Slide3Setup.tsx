"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import ForceTable from "@/components/svg/ForceTable";

const materials = [
  "Mesa de forças",
  "Polias",
  "Massas penduradas",
  "Anel central",
];

export default function Slide3Setup() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide3-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".material-item", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        x: -30,
        opacity: 0,
        duration: 0.4,
        stagger: 0.12,
        ease: "power2.out",
      });

      gsap.from(".slide3-desc", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 60%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="montagem">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="slide3-title text-3xl md:text-4xl font-bold">
            Montagem <span className="text-accent-green">Experimental</span>
          </h2>

          <div className="space-y-3">
            <p className="text-sm text-muted uppercase tracking-wider font-medium">
              Materiais utilizados
            </p>
            {materials.map((mat, i) => (
              <div
                key={i}
                className="material-item flex items-center gap-3 p-3 rounded-lg bg-surface border border-surface-light"
              >
                <span className="w-2 h-2 rounded-full bg-accent-green flex-shrink-0" />
                <span className="text-base">{mat}</span>
              </div>
            ))}
          </div>

          <p className="slide3-desc text-muted text-sm leading-relaxed">
            As forças atuam em diferentes ângulos puxando o anel central através
            de fios que passam pelas polias.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-[55%]">
          <ForceTable />
        </div>
      </div>
    </SlideContainer>
  );
}
