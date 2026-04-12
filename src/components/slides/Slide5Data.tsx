"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import DataTable from "@/components/svg/DataTable";
import { THEORETICAL, FORCE_COLORS } from "@/lib/constants";

export default function Slide5Data() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s5d-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s5d-theo", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        scale: 0.8, opacity: 0, stagger: 0.15, duration: 0.4, ease: "back.out(2)",
      });

      gsap.from(".s5d-table", {
        scrollTrigger: { trigger: ref.current, start: "top 55%", toggleActions: "play none none none" },
        opacity: 0, y: 30, duration: 0.5,
      });
    },
    { scope: ref }
  );

  const theoCards = [
    { label: "Vermelho", value: THEORETICAL.vermelho, color: FORCE_COLORS.vermelho },
    { label: "Azul", value: THEORETICAL.azul, color: FORCE_COLORS.azul },
    { label: "Laranja (ref.)", value: THEORETICAL.laranja, color: FORCE_COLORS.laranja },
  ];

  return (
    <SlideContainer id="dados">
      <div ref={ref} className="space-y-8 max-w-4xl mx-auto">
        <h2 className="s5d-title text-3xl md:text-4xl font-bold text-center">
          Dados <span className="text-accent-blue">Experimentais</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4">
          {theoCards.map((c) => (
            <div
              key={c.label}
              className="s5d-theo flex items-center gap-3 px-5 py-3 rounded-xl bg-surface border"
              style={{ borderColor: `${c.color}40` }}
            >
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: c.color }} />
              <span className="text-sm text-muted">{c.label}:</span>
              <span className="font-bold text-lg" style={{ color: c.color }}>
                {c.value} g
              </span>
              <span className="text-xs text-muted">(real)</span>
            </div>
          ))}
        </div>

        <div className="s5d-table p-4 rounded-xl bg-surface border border-surface-light">
          <p className="text-xs text-muted mb-3 uppercase tracking-wider font-medium">
            Amostra de 6 configurações (de 15 totais) — massas calculadas a partir dos ângulos
          </p>
          <DataTable />
        </div>
      </div>
    </SlideContainer>
  );
}
