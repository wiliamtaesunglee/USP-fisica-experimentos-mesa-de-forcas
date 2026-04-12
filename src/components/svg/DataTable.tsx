"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { MEASUREMENTS, FORCE_COLORS } from "@/lib/constants";

// Show a subset of representative measurements (2,3,5,7,12,15)
const DISPLAY_ROWS = [2, 3, 5, 7, 12, 15];

export default function DataTable() {
  const tableRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: tableRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".table-header", { opacity: 0, y: -10, duration: 0.3 });
      tl.from(".table-row", {
        opacity: 0,
        y: 20,
        stagger: 0.08,
        duration: 0.3,
        ease: "power2.out",
      });
      tl.from(".table-footer", { opacity: 0, duration: 0.4 });
    },
    { scope: tableRef }
  );

  const rows = DISPLAY_ROWS.map((id) => MEASUREMENTS.find((m) => m.id === id)!);

  return (
    <div ref={tableRef} className="w-full overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="table-header border-b border-surface-light">
            <th className="py-2 px-3 text-left text-muted font-medium">#</th>
            <th className="py-2 px-3 text-center font-medium" style={{ color: FORCE_COLORS.vermelho }}>
              Verm. (g)
            </th>
            <th className="py-2 px-3 text-center text-muted font-medium">α</th>
            <th className="py-2 px-3 text-center font-medium" style={{ color: FORCE_COLORS.azul }}>
              Azul (g)
            </th>
            <th className="py-2 px-3 text-center text-muted font-medium">β</th>
            <th className="py-2 px-3 text-center font-medium" style={{ color: FORCE_COLORS.laranja }}>
              Lar. (g)
            </th>
          </tr>
        </thead>
        <tbody>
          {rows.map((m) => (
            <tr
              key={m.id}
              className="table-row border-b border-surface-light/50 hover:bg-surface-light/30 transition-colors"
            >
              <td className="py-2 px-3 text-muted">{m.id}</td>
              <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.vermelho }}>
                {m.calculada.vermelho.toFixed(1)}
              </td>
              <td className="py-2 px-3 text-center text-muted">
                {m.vermelho.alfa > 0 ? "+" : ""}
                {m.vermelho.alfa}°
              </td>
              <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.azul }}>
                {m.calculada.azul.toFixed(1)}
              </td>
              <td className="py-2 px-3 text-center text-muted">
                {m.azul.beta > 0 ? "+" : ""}
                {m.azul.beta}°
              </td>
              <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.laranja }}>
                {m.calculada.laranja.toFixed(1)}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="table-footer border-t-2 border-surface-light font-bold">
            <td className="py-2 px-3 text-muted">Média</td>
            <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.vermelho }}>
              418.4
            </td>
            <td className="py-2 px-3"></td>
            <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.azul }}>
              336.3
            </td>
            <td className="py-2 px-3"></td>
            <td className="py-2 px-3 text-center" style={{ color: FORCE_COLORS.laranja }}>
              569.5
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
