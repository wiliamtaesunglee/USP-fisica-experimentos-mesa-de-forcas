"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import { DIAGRAM_FORCES as FORCES, polarToCartesian } from "@/lib/constants";

const challenges = [
  { icon: "⚙", title: "Atrito nas polias", desc: "Resistência mecânica afeta a transmissão de força" },
  { icon: "∠", title: "Imprecisão angular", desc: "Leitura dos ângulos sujeita a erro de paralaxe" },
  { icon: "〰", title: "Oscilação do sistema", desc: "Vibração dificulta a leitura do equilíbrio estável" },
  { icon: "⚖", title: "Leitura das massas", desc: "Pequenas variações na calibração das massas" },
];

const CX = 150;
const CY = 150;
const SCALE = 50;

export default function Slide5Challenges() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.from(".s5-title", {
        scrollTrigger: { trigger: ref.current, start: "top 70%", toggleActions: "play none none none" },
        y: 40, opacity: 0, duration: 0.7,
      });

      gsap.from(".s5-card", {
        scrollTrigger: { trigger: ref.current, start: "top 65%", toggleActions: "play none none none" },
        y: 30, opacity: 0, stagger: 0.15, duration: 0.4,
      });

      // Unstable vectors that shake then stabilize
      const tl = gsap.timeline({
        scrollTrigger: { trigger: svgRef.current, start: "top 70%", toggleActions: "play none none none" },
      });

      FORCES.forEach((force, i) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        tl.fromTo(
          `.s5-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          { attr: { x2: end.x, y2: end.y }, opacity: 1, duration: 0.4 },
          i * 0.15
        );
      });

      // Shake all vectors (simulating instability)
      tl.to(".s5-vec", {
        x: "random(-4, 4)",
        y: "random(-4, 4)",
        duration: 0.1,
        repeat: 12,
        yoyo: true,
        ease: "none",
      });

      // Stabilize
      tl.to(".s5-vec", {
        x: 0,
        y: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      tl.from(".s5-stable", {
        opacity: 0,
        scale: 0,
        duration: 0.4,
        ease: "back.out(2)",
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="dificuldades">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-6">
          <h2 className="s5-title text-3xl md:text-4xl font-bold">
            <span className="text-accent-red">Dificuldades</span> Experimentais
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {challenges.map((c, i) => (
              <div
                key={i}
                className="s5-card flex items-start gap-3 p-4 rounded-xl bg-surface border border-surface-light"
              >
                <span className="text-xl flex-shrink-0">{c.icon}</span>
                <div>
                  <p className="font-semibold text-sm">{c.title}</p>
                  <p className="text-xs text-muted mt-1">{c.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-shrink-0 w-full md:w-[35%]">
          <svg ref={svgRef} viewBox="0 0 300 300" className="w-full max-w-[280px] mx-auto">
            <defs>
              {FORCES.map((force) => (
                <marker
                  key={force.id}
                  id={`s5-arrow-${force.id}`}
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
                className={`s5-vec s5-vec-${force.id}`}
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY}
                stroke={force.color}
                strokeWidth="3"
                markerEnd={`url(#s5-arrow-${force.id})`}
                opacity="0"
              />
            ))}

            <text
              className="s5-stable"
              x={CX}
              y={CY + 90}
              fill="#10b981"
              fontSize="12"
              textAnchor="middle"
              fontWeight="500"
            >
              estabilizado
            </text>
          </svg>
        </div>
      </div>
    </SlideContainer>
  );
}
