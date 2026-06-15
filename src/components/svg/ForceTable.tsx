"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { DIAGRAM_FORCES as FORCES, polarToCartesian, degreesToRadians } from "@/lib/constants";

const CX = 250;
const CY = 250;
const TABLE_R = 180;
const SCALE = 70;

export default function ForceTable() {
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

      // 1. Table appears
      tl.from(".table-circle", {
        scale: 0,
        transformOrigin: `${CX}px ${CY}px`,
        duration: 1.0,
        ease: "power2.out",
      });

      // 2. Degree markings
      tl.from(".degree-mark", {
        opacity: 0,
        duration: 0.7,
        stagger: 0.04,
      });

      // 3. Pulleys slide in
      tl.from(".pulley", {
        scale: 0,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "back.out(2)",
      });

      // 4. Wires draw
      tl.from(".wire", {
        attr: { x2: CX, y2: CY },
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
      });

      // 5. Masses drop in
      tl.from(".mass-block", {
        y: -30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.25,
        ease: "bounce.out",
      });

      // 6. Force vectors grow
      FORCES.forEach((force, i) => {
        tl.fromTo(
          `.force-vec-${force.id}`,
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
          i === 0 ? "+=0.1" : "-=0.3"
        );
      });
    },
    { scope: svgRef }
  );

  // Degree marks at every 30°
  const degreeMarks = Array.from({ length: 12 }, (_, i) => {
    const angle = i * 30;
    const rad = degreesToRadians(angle);
    const innerR = TABLE_R - 12;
    const outerR = TABLE_R;
    return {
      angle,
      x1: CX + innerR * Math.cos(rad),
      y1: CY - innerR * Math.sin(rad),
      x2: CX + outerR * Math.cos(rad),
      y2: CY - outerR * Math.sin(rad),
      labelX: CX + (TABLE_R + 18) * Math.cos(rad),
      labelY: CY - (TABLE_R + 18) * Math.sin(rad),
    };
  });

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 500 500"
      className="w-full max-w-[500px] mx-auto"
    >
      <defs>
        {FORCES.map((force) => (
          <marker
            key={force.id}
            id={`table-arrow-${force.id}`}
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

      {/* Table circle */}
      <circle
        className="table-circle"
        cx={CX}
        cy={CY}
        r={TABLE_R}
        fill="none"
        stroke="#3f3f46"
        strokeWidth="2"
      />
      <circle
        className="table-circle"
        cx={CX}
        cy={CY}
        r={TABLE_R - 1}
        fill="#18181b"
        opacity="0.5"
      />

      {/* Center ring */}
      <circle cx={CX} cy={CY} r="8" fill="none" stroke="#71717a" strokeWidth="2" />
      <circle cx={CX} cy={CY} r="3" fill="#71717a" />

      {/* Degree marks */}
      {degreeMarks.map((m) => (
        <g key={m.angle} className="degree-mark">
          <line
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke="#52525b"
            strokeWidth="1"
          />
          <text
            x={m.labelX}
            y={m.labelY}
            fill="#71717a"
            fontSize="10"
            textAnchor="middle"
            dominantBaseline="central"
          >
            {m.angle}°
          </text>
        </g>
      ))}

      {/* Pulleys, wires, masses, and force vectors */}
      {FORCES.map((force) => {
        const rad = degreesToRadians(force.angle);
        const pulleyX = CX + TABLE_R * Math.cos(rad);
        const pulleyY = CY - TABLE_R * Math.sin(rad);
        const vecEnd = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);

        // Mass hangs outward from pulley
        const massX = CX + (TABLE_R + 35) * Math.cos(rad);
        const massY = CY - (TABLE_R + 35) * Math.sin(rad);

        return (
          <g key={force.id}>
            {/* Wire from pulley to center */}
            <line
              className="wire"
              x1={CX}
              y1={CY}
              x2={pulleyX}
              y2={pulleyY}
              stroke="#a1a1aa"
              strokeWidth="1"
              strokeDasharray="4 2"
            />

            {/* Pulley */}
            <circle
              className="pulley"
              cx={pulleyX}
              cy={pulleyY}
              r="10"
              fill="#27272a"
              stroke={force.color}
              strokeWidth="2"
            />

            {/* Mass block */}
            <g className="mass-block">
              <rect
                x={massX - 12}
                y={massY - 8}
                width="24"
                height="16"
                rx="2"
                fill={force.color}
                opacity="0.8"
              />
              <text
                x={massX}
                y={massY + 2}
                fill="white"
                fontSize="9"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                m{force.id}
              </text>
            </g>

            {/* Force vector */}
            <line
              className={`force-vec-${force.id}`}
              x1={CX}
              y1={CY}
              x2={CX}
              y2={CY}
              stroke={force.color}
              strokeWidth="3"
              markerEnd={`url(#table-arrow-${force.id})`}
              opacity="0"
            />

            {/* Vector label */}
            <text
              x={vecEnd.x + (vecEnd.x > CX ? 14 : vecEnd.x < CX ? -14 : 0)}
              y={vecEnd.y + (vecEnd.y > CY ? 18 : -10)}
              fill={force.color}
              fontSize="14"
              fontWeight="bold"
              textAnchor="middle"
              opacity="0"
              className={`force-vec-${force.id}`}
            >
              {force.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
