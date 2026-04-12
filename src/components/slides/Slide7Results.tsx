"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import BarChart from "@/components/svg/BarChart";
import { EXPERIMENTAL_MEANS, FORCE_COLORS } from "@/lib/constants";

const results = [
  {
    label: "Vermelho",
    mean: EXPERIMENTAL_MEANS.vermelho.mean,
    diff: EXPERIMENTAL_MEANS.vermelho.diffPercent,
    color: FORCE_COLORS.vermelho,
  },
  {
    label: "Azul",
    mean: EXPERIMENTAL_MEANS.azul.mean,
    diff: EXPERIMENTAL_MEANS.azul.diffPercent,
    color: FORCE_COLORS.azul,
  },
  {
    label: "Laranja",
    mean: EXPERIMENTAL_MEANS.laranja.mean,
    diff: EXPERIMENTAL_MEANS.laranja.diffPercent,
    color: FORCE_COLORS.laranja,
  },
];

export default function Slide7Results() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s7-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s7-stat", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        y: 30, opacity: 0, stagger: 0.15, duration: 0.4,
      });

      gsap.from(".s7-chart", {
        scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none none" },
        opacity: 0, scale: 0.95, duration: 0.5,
      });

      gsap.from(".s7-badge", {
        scrollTrigger: { trigger: ref.current, start: "top 45%", toggleActions: "play none none none" },
        scale: 0, opacity: 0, duration: 0.6, ease: "back.out(3)",
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="resultados">
      <div ref={ref} className="space-y-8 max-w-4xl mx-auto">
        <h2 className="s7-title text-3xl md:text-4xl font-bold text-center">
          <span className="text-accent-green">Resultados</span>
        </h2>

        {/* Mean stats */}
        <div className="flex flex-wrap justify-center gap-4">
          {results.map((r) => (
            <div
              key={r.label}
              className="s7-stat flex flex-col items-center p-4 rounded-xl bg-surface border min-w-[140px]"
              style={{ borderColor: `${r.color}40` }}
            >
              <span className="text-xs text-muted uppercase tracking-wider">
                {r.label}
              </span>
              <span className="text-2xl font-bold mt-1" style={{ color: r.color }}>
                {r.mean.toFixed(1)}
              </span>
              <span className="text-xs text-muted mt-1">g (média)</span>
              <span
                className="mt-2 px-3 py-1 rounded-full text-xs font-bold"
                style={{
                  backgroundColor: `${r.color}20`,
                  color: r.color,
                }}
              >
                {r.diff > 0 ? "+" : ""}
                {r.diff.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>

        {/* Bar chart */}
        <div className="s7-chart p-4 rounded-xl bg-surface border border-surface-light">
          <p className="text-xs text-muted mb-2 uppercase tracking-wider font-medium text-center">
            Teórico vs. Experimental
          </p>
          <BarChart />
        </div>

        {/* Error badge */}
        <div className="s7-badge flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-green/10 border border-accent-green/30">
            <span className="text-2xl font-bold text-accent-green">&lt; 1%</span>
            <span className="text-sm text-muted">erro médio — massas calculadas muito próximas das reais</span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
