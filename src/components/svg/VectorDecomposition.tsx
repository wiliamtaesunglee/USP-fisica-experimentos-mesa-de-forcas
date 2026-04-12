"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DIAGRAM_FORCES as FORCES, polarToCartesian } from "@/lib/constants";

const CX = 200;
const CY = 200;
const SCALE = 80;

export default function VectorDecomposition() {
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

      // Axes appear
      tl.from(".axis", { opacity: 0, duration: 0.4 });

      // Vectors grow from center
      FORCES.forEach((force, i) => {
        tl.fromTo(
          `.decomp-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          {
            attr: {
              x2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY).x,
              y2: polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY).y,
            },
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          },
          i === 0 ? "+=0.1" : "-=0.2"
        );
      });

      // Dashed component lines appear
      tl.from(".comp-x", {
        scaleX: 0,
        transformOrigin: `${CX}px center`,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
      });

      tl.from(
        ".comp-y",
        {
          scaleY: 0,
          transformOrigin: `center ${CY}px`,
          opacity: 0,
          duration: 0.5,
          stagger: 0.1,
        },
        "-=0.3"
      );

      // Labels fade in
      tl.from(".comp-label", {
        opacity: 0,
        duration: 0.3,
        stagger: 0.05,
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
      <line
        className="axis"
        x1="40"
        y1={CY}
        x2="360"
        y2={CY}
        stroke="#3f3f46"
        strokeWidth="1"
      />
      <line
        className="axis"
        x1={CX}
        y1="40"
        x2={CX}
        y2="360"
        stroke="#3f3f46"
        strokeWidth="1"
      />
      <text className="axis" x="365" y={CY + 4} fill="#71717a" fontSize="12">
        x
      </text>
      <text className="axis" x={CX + 8} y="38" fill="#71717a" fontSize="12">
        y
      </text>

      {/* Center point */}
      <circle cx={CX} cy={CY} r="3" fill="#71717a" />

      {/* Force vectors and their components */}
      {FORCES.map((force) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        const fx = end.x;
        const fy = end.y;

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

            {/* X component (horizontal dashed line from center to fx) */}
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

            {/* Y component (vertical dashed line from fx,cy to fx,fy) */}
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
              y={CY + 16}
              fill={force.color}
              fontSize="11"
              textAnchor="middle"
              opacity="0.8"
            >
              {force.label.replace("F", "Fx")}
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
              {force.label.replace("F", "Fy")}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
