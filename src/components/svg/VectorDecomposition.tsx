"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { FORCE_COLORS, polarToCartesian } from "@/lib/constants";

const CX = 200;
const CY = 200;
const SCALE = 80;

// Vectors matching the real experiment layout
// F3 (laranja) = reference at 0° (positive x-axis)
// F1 (vermelho) = angle α (~140°, upper-left)
// F2 (azul) = angle β (~230°, lower-left)
const EXP_FORCES = [
  { id: 3, magnitude: 1.5, angle: 0, color: FORCE_COLORS.laranja, label: "F₃", compPrefix: "3" },
  { id: 1, magnitude: 1.2, angle: 143, color: FORCE_COLORS.vermelho, label: "F₁", compPrefix: "1" },
  { id: 2, magnitude: 1.0, angle: 225, color: FORCE_COLORS.azul, label: "F₂", compPrefix: "2" },
];

export default function VectorDecomposition() {
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 75%",
          toggleActions: "play none none reverse",
        },
      });

      tl.from(".axis", { opacity: 0, duration: 0.7 });

      EXP_FORCES.forEach((force, i) => {
        tl.fromTo(
          `.decomp-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          {
            attr: {
              x2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY).x,
              y2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY).y,
            },
            opacity: 1,
            duration: 0.8,
            ease: "power2.out",
          },
          i === 0 ? "+=0.1" : "-=0.2"
        );
      });

      tl.from(".comp-x", {
        scaleX: 0,
        transformOrigin: `${CX}px center`,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
      });

      tl.from(
        ".comp-y",
        {
          scaleY: 0,
          transformOrigin: `center ${CY}px`,
          opacity: 0,
          duration: 0.8,
          stagger: 0.15,
        },
        "-=0.3"
      );

      tl.from(".comp-label", {
        opacity: 0,
        duration: 0.5,
        stagger: 0.08,
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
        {EXP_FORCES.map((force) => (
          <marker
            key={force.id}
            id={`decomp-arrow-${force.id}`}
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

      {/* Axes */}
      <line className="axis" x1="40" y1={CY} x2="360" y2={CY} stroke="#3f3f46" strokeWidth="1" />
      <line className="axis" x1={CX} y1="40" x2={CX} y2="360" stroke="#3f3f46" strokeWidth="1" />
      <text className="axis" x="365" y={CY + 4} fill="#71717a" fontSize="12">x</text>
      <text className="axis" x={CX + 8} y="38" fill="#71717a" fontSize="12">y</text>

      {/* Center point */}
      <circle cx={CX} cy={CY} r="3" fill="#71717a" />

      {/* Force vectors and their components */}
      {EXP_FORCES.map((force) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        const fx = end.x;
        const fy = end.y;
        // F3 (laranja) is on x-axis — no decomposition needed
        const showDecomp = force.angle !== 0;

        return (
          <g key={force.id}>
            {/* Main vector */}
            <line
              className={`decomp-vec-${force.id}`}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY}
              stroke={force.color}
              strokeWidth="2.5"
              markerEnd={`url(#decomp-arrow-${force.id})`}
            />

            {showDecomp && (
              <>
                {/* X component */}
                <line
                  className="comp-x"
                  x1={CX}
                  y1={CY}
                  x2={fx}
                  y2={CY}
                  stroke={force.color}
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  opacity="0.6"
                />

                {/* Y component */}
                <line
                  className="comp-y"
                  x1={fx}
                  y1={CY}
                  x2={fx}
                  y2={fy}
                  stroke={force.color}
                  strokeWidth="1.5"
                  strokeDasharray="5 3"
                  opacity="0.6"
                />

                {/* Fx label */}
                <text
                  className="comp-label"
                  x={(CX + fx) / 2}
                  y={fy < CY ? CY + 16 : CY - 8}
                  fill={force.color}
                  fontSize="11"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  Fx{force.compPrefix}
                </text>

                {/* Fy label */}
                <text
                  className="comp-label"
                  x={fx + (fx >= CX ? 18 : -18)}
                  y={(CY + fy) / 2}
                  fill={force.color}
                  fontSize="11"
                  textAnchor="middle"
                  opacity="0.8"
                >
                  Fy{force.compPrefix}
                </text>
              </>
            )}

            {/* Vector label at tip */}
            <text
              className="comp-label"
              x={end.x + (end.x > CX ? 14 : end.x < CX ? -14 : 0)}
              y={end.y + (end.y > CY ? 16 : -10)}
              fill={force.color}
              fontSize="13"
              fontWeight="bold"
              textAnchor={end.x > CX ? "start" : end.x < CX ? "end" : "middle"}
              opacity="0.9"
            >
              {force.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
