"use client";

import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SlideContainer from "@/components/ui/SlideContainer";
import MathFormula from "@/components/ui/MathFormula";
import { FORCES, polarToCartesian } from "@/lib/constants";

const CX = 150;
const CY = 150;
const SCALE = 55;

export default function Slide5Equilibrium() {
  const ref = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      gsap.from(".slide5-title", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
      });

      gsap.from(".eq-formula", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 65%",
          toggleActions: "play none none none",
        },
        scale: 0.8,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6,
        ease: "back.out(2)",
      });

      gsap.from(".slide5-text", {
        scrollTrigger: {
          trigger: ref.current,
          start: "top 55%",
          toggleActions: "play none none none",
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
      });

      // SVG animation: vectors appear then converge to center
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: svgRef.current,
          start: "top 70%",
          toggleActions: "play none none none",
        },
      });

      FORCES.forEach((force, i) => {
        const end = polarToCartesian(force.angle, force.magnitude, SCALE, CX, CY);
        tl.fromTo(
          `.eq-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0 },
          { attr: { x2: end.x, y2: end.y }, opacity: 1, duration: 0.4 },
          i * 0.15
        );
      });

      tl.to({}, { duration: 0.8 });

      FORCES.forEach((force) => {
        tl.to(
          `.eq-vec-${force.id}`,
          { attr: { x2: CX, y2: CY }, opacity: 0.3, duration: 0.6 },
          "converge"
        );
      });

      tl.from(".eq-zero", {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        ease: "back.out(3)",
      });

      tl.to(".eq-highlight", {
        boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)",
        duration: 0.4,
        yoyo: true,
        repeat: 1,
      });
    },
    { scope: ref }
  );

  return (
    <SlideContainer id="equilibrio">
      <div ref={ref} className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <h2 className="slide5-title text-3xl md:text-4xl font-bold">
            Condição de{" "}
            <span className="text-accent-blue">Equilíbrio</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <div className="eq-formula eq-highlight p-5 rounded-xl bg-surface border border-accent-blue/30 text-center">
              <MathFormula tex="\sum F_x = 0" display />
            </div>
            <div className="eq-formula eq-highlight p-5 rounded-xl bg-surface border border-accent-green/30 text-center">
              <MathFormula tex="\sum F_y = 0" display />
            </div>
          </div>

          <p className="slide5-text text-muted text-base max-w-lg leading-relaxed">
            O sistema permanece em repouso quando as forças se cancelam
            mutuamente. A soma das componentes horizontais e verticais deve
            tender a zero.
          </p>
        </div>

        <div className="flex-shrink-0 w-full md:w-[38%]">
          <svg
            ref={svgRef}
            viewBox="0 0 300 300"
            className="w-full max-w-[300px] mx-auto"
          >
            <defs>
              {FORCES.map((force) => (
                <marker
                  key={force.id}
                  id={`eq-arrow-${force.id}`}
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
                className={`eq-vec-${force.id}`}
                x1={CX}
                y1={CY}
                x2={CX}
                y2={CY}
                stroke={force.color}
                strokeWidth="3"
                markerEnd={`url(#eq-arrow-${force.id})`}
                opacity="0"
              />
            ))}

            <text
              className="eq-zero"
              x={CX}
              y={CY + 5}
              fill="#3b82f6"
              fontSize="24"
              fontWeight="bold"
              textAnchor="middle"
              dominantBaseline="central"
            >
              = 0
            </text>
          </svg>
        </div>
      </div>
    </SlideContainer>
  );
}
