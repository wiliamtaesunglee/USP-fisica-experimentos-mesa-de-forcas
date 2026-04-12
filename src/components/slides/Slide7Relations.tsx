"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import { DIAGRAM_FORCES as FORCES, polarToCartesian } from "@/lib/constants";

const relations = [
  {
    title: "Equilíbrio é vetorial",
    text: "Não basta igualar intensidades — as direções devem se compensar mutuamente.",
    color: "border-accent-blue/40",
    accent: "text-accent-blue",
  },
  {
    title: "Ângulos determinam forças",
    text: "A configuração angular de equilíbrio carrega toda a informação sobre a relação entre as massas.",
    color: "border-accent-green/40",
    accent: "text-accent-green",
  },
  {
    title: "Uma massa → todas as outras",
    text: "Conhecendo apenas uma massa de referência e os ângulos, determinamos as demais por cálculo.",
    color: "border-accent-amber/40",
    accent: "text-accent-amber",
  },
];

const CX = 150;
const CY = 150;
const SCALE = 55;

export default function Slide7Relations() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.from(".s7r-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s7r-card", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        x: -30, opacity: 0, stagger: 0.2, duration: 0.5,
      });

      // SVG: vectors form a closed triangle
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 70%", toggleActions: "play none none none" },
      });

      // Draw vectors from center
      FORCES.forEach((force, i) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        tl.fromTo(
          `.s7r-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          { attr: { x2: end.x, y2: end.y }, opacity: 1, duration: 0.4 },
          i * 0.15
        );
      });

      // Show the "closed triangle" connecting tips
      tl.from(".s7r-triangle", {
        strokeDashoffset: 500,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out",
      });

      tl.from(".s7r-label", {
        opacity: 0, scale: 0, duration: 0.4, ease: "back.out(2)",
      });
    },
    { scope: ref }
  );

  // Triangle connecting vector tips (closed polygon = equilibrium)
  const tips = FORCES.map((f) => polarToCartesian(f.angle, f.magnitude, SCALE, CX, CY));
  const trianglePath = `M ${tips[0].x} ${tips[0].y} L ${tips[1].x} ${tips[1].y} L ${tips[2].x} ${tips[2].y} Z`;

  return (
    <SlideContainer id="relacoes">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="s7r-title text-3xl md:text-4xl font-bold">
            Relações <span className="text-accent-amber">Físicas</span>
          </h2>

          <p className="text-sm text-muted uppercase tracking-wider font-medium">
            O que os dados comprovam:
          </p>

          <div className="space-y-4">
            {relations.map((r, i) => (
              <div
                key={i}
                className={`s7r-card p-4 rounded-xl bg-surface border ${r.color}`}
              >
                <h3 className={`font-bold mb-1 ${r.accent}`}>{r.title}</h3>
                <p className="text-sm text-muted">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-[38%]">
          <svg ref={svgRef} viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
            <defs>
              {FORCES.map((force) => (
                <marker
                  key={force.id}
                  id={`s7r-arrow-${force.id}`}
                  markerWidth="8"
                  markerHeight="6"
                  refX="8"
                  refY="3"
                  orient="auto"
                  markerUnits="strokeWidth"
                >
                  <polygon points="0 0, 8 3, 0 6" fill={force.color} />
                </marker>
              ))}
            </defs>

            <circle cx={CX} cy={CY} r="3" fill="#71717a" />

            {FORCES.map((force) => (
              <line
                key={force.id}
                className={`s7r-vec-${force.id}`}
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY}
                stroke={force.color}
                strokeWidth="3"
                markerEnd={`url(#s7r-arrow-${force.id})`}
                opacity="0"
              />
            ))}

            {/* Closed triangle = equilibrium */}
            <path
              className="s7r-triangle"
              d={trianglePath}
              fill="none"
              stroke="#a1a1aa"
              strokeWidth="1"
              strokeDasharray="4 3"
              opacity="0.5"
            />

            <text
              className="s7r-label"
              x={CX}
              y={CY + 100}
              fill="#a1a1aa"
              fontSize="12"
              textAnchor="middle"
              fontWeight="500"
            >
              triângulo fechado = equilíbrio
            </text>
          </svg>
        </div>
      </div>
    </SlideContainer>
  );
}
