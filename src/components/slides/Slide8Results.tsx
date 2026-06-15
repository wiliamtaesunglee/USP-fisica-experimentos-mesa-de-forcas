"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import BarChart from "@/components/svg/BarChart";
import { THEORETICAL, EXPERIMENTAL_MEANS, FORCE_COLORS } from "@/lib/constants";

const comparison = [
  {
    label: "Vermelho",
    direct: THEORETICAL.vermelho,
    indirect: EXPERIMENTAL_MEANS.vermelho.mean,
    diff: EXPERIMENTAL_MEANS.vermelho.diffPercent,
    color: FORCE_COLORS.vermelho,
  },
  {
    label: "Azul",
    direct: THEORETICAL.azul,
    indirect: EXPERIMENTAL_MEANS.azul.mean,
    diff: EXPERIMENTAL_MEANS.azul.diffPercent,
    color: FORCE_COLORS.azul,
  },
  {
    label: "Laranja",
    direct: THEORETICAL.laranja,
    indirect: EXPERIMENTAL_MEANS.laranja.mean,
    diff: EXPERIMENTAL_MEANS.laranja.diffPercent,
    color: FORCE_COLORS.laranja,
  },
];

export default function Slide8Results() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from(".s8r-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none reverse" },
        y: 40, opacity: 0, duration: 1.1,
      });

      gsap.from(".s8r-chart", {
        scrollTrigger: { trigger: ref.current, start: "top 60%", toggleActions: "play none none reverse" },
        opacity: 0, scale: 0.95, duration: 0.8,
      });

      gsap.from(".s8r-row", {
        scrollTrigger: { trigger: ref.current, start: "top 50%", toggleActions: "play none none reverse" },
        y: 20, opacity: 0, stagger: 0.15, duration: 0.5,
      });

      gsap.from(".s8r-badge", {
        scrollTrigger: { trigger: ref.current, start: "top 40%", toggleActions: "play none none reverse" },
        scale: 0, opacity: 0, duration: 1.0, ease: "back.out(3)",
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="resultados">
      <div ref={ref} className="space-y-6 max-w-4xl mx-auto">
        <h2 className="s8r-title text-3xl md:text-4xl font-bold text-center">
          <span className="text-accent-green">Resultados</span>
        </h2>

        {/* Bar chart */}
        <div className="s8r-chart p-4 rounded-xl bg-surface border border-surface-light">
          <p className="text-xs text-muted mb-2 uppercase tracking-wider font-medium text-center">
            Medição direta (balança) vs. indireta (calculada)
          </p>
          <BarChart />
        </div>

        {/* Comparison table: Direct vs Indirect */}
        <div className="p-4 rounded-xl bg-surface border border-surface-light">
          <p className="text-xs text-muted mb-3 uppercase tracking-wider font-medium">
            Comparação: medição indireta vs. direta
          </p>
          <table className="w-full text-sm">
            <thead>
              <tr className="s8r-row border-b border-surface-light">
                <th className="py-2 px-3 text-left text-muted font-medium">Corpo</th>
                <th className="py-2 px-3 text-center text-muted font-medium">Direta (g)</th>
                <th className="py-2 px-3 text-center text-muted font-medium">Indireta (g)</th>
                <th className="py-2 px-3 text-center text-muted font-medium">Diferença</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.label} className="s8r-row border-b border-surface-light/50">
                  <td className="py-2 px-3 font-medium" style={{ color: c.color }}>
                    {c.label}
                  </td>
                  <td className="py-2 px-3 text-center">{c.direct.toFixed(1)}</td>
                  <td className="py-2 px-3 text-center font-semibold" style={{ color: c.color }}>
                    {c.indirect.toFixed(1)}
                  </td>
                  <td className="py-2 px-3 text-center">
                    <span
                      className="inline-block px-2 py-0.5 rounded-full text-xs font-bold"
                      style={{ backgroundColor: `${c.color}20`, color: c.color }}
                    >
                      {c.diff > 0 ? "+" : ""}{c.diff.toFixed(2)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Error badge */}
        <div className="s8r-badge flex justify-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-green/10 border border-accent-green/30">
            <span className="text-2xl font-bold text-accent-green">&lt; 1%</span>
            <span className="text-sm text-muted">erro médio — massas calculadas muito próximas das reais</span>
          </div>
        </div>
      </div>
    </SlideContainer>
  );
}
