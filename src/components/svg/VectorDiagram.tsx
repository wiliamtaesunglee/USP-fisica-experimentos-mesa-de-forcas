"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DIAGRAM_FORCES as FORCES, polarToCartesian } from "@/lib/constants";

const CX = 200;
const CY = 200;
const SCALE = 80;

export default function VectorDiagram() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      FORCES.forEach((force, i) => {
        tl.fromTo(
          `.vector-line-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          {
            attr: {
              x2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY)
                .x,
              y2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY)
                .y,
            },
            opacity: 1,
            duration: 1.0,
            ease: "power2.out",
          },
          i * 0.3
        );

        tl.from(
          `.vector-label-${force.id}`,
          { opacity: 0, scale: 0, duration: 0.5, ease: "back.out" },
          "-=0.2"
        );
      });

      // Glow pulse on all vectors
      tl.to(".vector-line", {
        filter: "drop-shadow(0 0 6px currentColor)",
        duration: 0.7,
        yoyo: true,
        repeat: 1,
      });

      // Show equilibrium label
      tl.from(".equilibrium-label", {
        opacity: 0,
        scale: 0,
        duration: 0.8,
        ease: "back.out(2)",
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 400"
      className="w-full max-w-[400px] mx-auto"
    >
      <defs>
        {FORCES.map((force) => (
          <marker
            key={force.id}
            id={`arrow-${force.id}`}
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill={force.color} />
          </marker>
        ))}
      </defs>

      {/* Center point */}
      <circle cx={CX} cy={CY} r="4" fill="#71717a" />

      {/* Force vectors */}
      {FORCES.map((force) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        return (
          <g key={force.id}>
            <line
              className={`vector-line vector-line-${force.id}`}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY}
              stroke={force.color}
              strokeWidth="3"
              markerEnd={`url(#arrow-${force.id})`}
              style={{ color: force.color }}
            />
            <text
              className={`vector-label-${force.id}`}
              x={end.x + (end.x > CX ? 12 : -12)}
              y={end.y + (end.y > CY ? 16 : -8)}
              fill={force.color}
              fontSize="16"
              fontWeight="bold"
              textAnchor={end.x > CX ? "start" : "end"}
            >
              {force.label}
            </text>
          </g>
        );
      })}

      {/* Equilibrium label */}
      <text
        className="equilibrium-label"
        x={CX}
        y={CY + 160}
        fill="#e4e4e7"
        fontSize="14"
        textAnchor="middle"
        fontWeight="500"
      >
        ΣF = 0
      </text>
    </svg>
  );
}
