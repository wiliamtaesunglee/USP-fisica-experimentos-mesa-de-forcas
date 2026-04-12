"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DIAGRAM_FORCES as FORCES, polarToCartesian } from "@/lib/constants";

const CX = 200;
const CY = 200;
const SCALE = 70;

export default function VectorCancel() {
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

      // Vectors appear
      FORCES.forEach((force, i) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        tl.fromTo(
          `.cancel-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          {
            attr: { x2: end.x, y2: end.y },
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          i * 0.2
        );
      });

      // Pause to let viewer see vectors
      tl.to({}, { duration: 0.6 });

      // Vectors converge back to center and disappear
      FORCES.forEach((force) => {
        tl.to(
          `.cancel-vec-${force.id}`,
          {
            attr: { x2: CX, y2: CY },
            opacity: 0,
            duration: 0.8,
            ease: "power2.in",
          },
          "cancel"
        );
      });

      // Flash at center
      tl.fromTo(
        ".cancel-flash",
        { scale: 0, opacity: 1, transformOrigin: `${CX}px ${CY}px` },
        {
          scale: 1.5,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        }
      );

      // Zero label appears
      tl.from(".cancel-zero", {
        scale: 0,
        opacity: 0,
        duration: 0.6,
        ease: "back.out(3)",
      });

      // Arrow and equilibrium text
      tl.from(".cancel-result", {
        opacity: 0,
        y: 10,
        duration: 0.5,
      });
    },
    { scope: svgRef }
  );

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 400 300"
      className="w-full max-w-[400px] mx-auto"
    >
      <defs>
        {FORCES.map((force) => (
          <marker
            key={force.id}
            id={`cancel-arrow-${force.id}`}
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

      {/* Center point */}
      <circle cx={CX} cy={CY} r="3" fill="#71717a" />

      {/* Vectors that will cancel */}
      {FORCES.map((force) => (
        <line
          key={force.id}
          className={`cancel-vec-${force.id}`}
          x1={CX}
          y1={CY}
          x2={CX}
          y2={CY}
          stroke={force.color}
          strokeWidth="3"
          markerEnd={`url(#cancel-arrow-${force.id})`}
          opacity="0"
        />
      ))}

      {/* Flash circle at center */}
      <circle
        className="cancel-flash"
        cx={CX}
        cy={CY}
        r="20"
        fill="none"
        stroke="#3b82f6"
        strokeWidth="2"
        opacity="0"
      />

      {/* Zero result */}
      <text
        className="cancel-zero"
        x={CX}
        y={CY + 5}
        fill="#3b82f6"
        fontSize="28"
        fontWeight="bold"
        textAnchor="middle"
        dominantBaseline="central"
      >
        0
      </text>

      {/* Result text */}
      <text
        className="cancel-result"
        x={CX}
        y={CY + 60}
        fill="#e4e4e7"
        fontSize="14"
        textAnchor="middle"
        fontWeight="500"
      >
        resultante nula → equilíbrio
      </text>
    </svg>
  );
}
