"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { THEORETICAL, EXPERIMENTAL_MEANS, FORCE_COLORS } from "@/lib/constants";

const CHART_W = 500;
const CHART_H = 300;
const PADDING = { top: 30, right: 30, bottom: 60, left: 65 };
const INNER_W = CHART_W - PADDING.left - PADDING.right;
const INNER_H = CHART_H - PADDING.top - PADDING.bottom;
const MAX_VAL = 650;

const groups = [
  {
    label: "Vermelho",
    theoretical: THEORETICAL.vermelho,
    experimental: EXPERIMENTAL_MEANS.vermelho.mean,
    diff: EXPERIMENTAL_MEANS.vermelho.diffPercent,
    color: FORCE_COLORS.vermelho,
  },
  {
    label: "Azul",
    theoretical: THEORETICAL.azul,
    experimental: EXPERIMENTAL_MEANS.azul.mean,
    diff: EXPERIMENTAL_MEANS.azul.diffPercent,
    color: FORCE_COLORS.azul,
  },
  {
    label: "Laranja",
    theoretical: THEORETICAL.laranja,
    experimental: EXPERIMENTAL_MEANS.laranja.mean,
    diff: EXPERIMENTAL_MEANS.laranja.diffPercent,
    color: FORCE_COLORS.laranja,
  },
];

const yScale = (v: number) => INNER_H - (v / MAX_VAL) * INNER_H;
const barH = (v: number) => (v / MAX_VAL) * INNER_H;
const Y_TICKS = [0, 100, 200, 300, 400, 500, 600];

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });

      tl.from(".chart-axis", { opacity: 0, duration: 0.3 });
      tl.from(".chart-tick", { opacity: 0, stagger: 0.03, duration: 0.2 });

      // Bars grow from bottom using scaleY
      tl.from(".bar-theo", {
        scaleY: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power2.out",
      });

      tl.from(
        ".bar-exp",
        {
          scaleY: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.6"
      );

      tl.from(".bar-label", { opacity: 0, y: 10, stagger: 0.1, duration: 0.3 });
      tl.from(".diff-badge", {
        scale: 0,
        opacity: 0,
        stagger: 0.15,
        duration: 0.4,
        ease: "back.out(2)",
      });
      tl.from(".chart-legend", { opacity: 0, x: -20, duration: 0.4 });
    },
    { scope: svgRef }
  );

  const groupWidth = INNER_W / groups.length;
  const bw = groupWidth * 0.3;
  const gap = 6;

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${CHART_W} ${CHART_H + 30}`}
      className="w-full max-w-[550px] mx-auto"
    >
      <g transform={`translate(${PADDING.left}, ${PADDING.top})`}>
        {/* Axes */}
        <line className="chart-axis" x1="0" y1="0" x2="0" y2={INNER_H} stroke="#3f3f46" strokeWidth="1" />
        <line className="chart-axis" x1="0" y1={INNER_H} x2={INNER_W} y2={INNER_H} stroke="#3f3f46" strokeWidth="1" />

        {/* Y ticks */}
        {Y_TICKS.map((tick) => (
          <g key={tick} className="chart-tick">
            <line
              x1="-5"
              y1={yScale(tick)}
              x2={INNER_W}
              y2={yScale(tick)}
              stroke="#27272a"
              strokeWidth="0.5"
              strokeDasharray={tick === 0 ? "0" : "3 3"}
            />
            <text x="-10" y={yScale(tick) + 4} fill="#71717a" fontSize="10" textAnchor="end">
              {tick}
            </text>
          </g>
        ))}

        {/* Y-axis label */}
        <text
          className="chart-axis"
          transform={`translate(-50, ${INNER_H / 2}) rotate(-90)`}
          fill="#a1a1aa"
          fontSize="11"
          textAnchor="middle"
        >
          Massa (g)
        </text>

        {/* Bar groups */}
        {groups.map((g, i) => {
          const gx = i * groupWidth + groupWidth / 2;
          const theoX = gx - bw - gap / 2;
          const expX = gx + gap / 2;
          const thH = barH(g.theoretical);
          const exH = barH(g.experimental);

          return (
            <g key={g.label}>
              {/* Theoretical bar — transform-origin at bottom edge */}
              <rect
                className="bar-theo"
                x={theoX}
                y={INNER_H - thH}
                width={bw}
                height={thH}
                fill={g.color}
                opacity="0.4"
                rx="2"
                style={{ transformOrigin: `${theoX + bw / 2}px ${INNER_H}px` }}
              />

              {/* Experimental bar */}
              <rect
                className="bar-exp"
                x={expX}
                y={INNER_H - exH}
                width={bw}
                height={exH}
                fill={g.color}
                opacity="0.9"
                rx="2"
                style={{ transformOrigin: `${expX + bw / 2}px ${INNER_H}px` }}
              />

              {/* Group label */}
              <text
                className="bar-label"
                x={gx}
                y={INNER_H + 20}
                fill={g.color}
                fontSize="12"
                fontWeight="600"
                textAnchor="middle"
              >
                {g.label}
              </text>

              {/* Diff badge */}
              <g
                className="diff-badge"
                transform={`translate(${gx}, ${yScale(Math.max(g.theoretical, g.experimental)) - 18})`}
              >
                <rect x="-24" y="-10" width="48" height="18" rx="9" fill={g.color} opacity="0.2" />
                <text fill={g.color} fontSize="10" fontWeight="bold" textAnchor="middle" dominantBaseline="central">
                  {g.diff > 0 ? "+" : ""}{g.diff.toFixed(2)}%
                </text>
              </g>
            </g>
          );
        })}
      </g>

      {/* Legend */}
      <g className="chart-legend" transform={`translate(${PADDING.left + 10}, ${CHART_H + 10})`}>
        <rect width="12" height="12" rx="2" fill="#71717a" opacity="0.4" />
        <text x="16" y="10" fill="#a1a1aa" fontSize="10">Teórico</text>
        <rect x="80" width="12" height="12" rx="2" fill="#71717a" opacity="0.9" />
        <text x="96" y="10" fill="#a1a1aa" fontSize="10">Experimental</text>
      </g>
    </svg>
  );
}
