"use client";

import { useState } from "react";
import Slide0Cover from "@/components/slides/Slide0Cover";
import SectionDivider from "@/components/ui/SectionDivider";
import Slide1Intro from "@/components/slides/Slide1Intro";
import Slide2Instruments from "@/components/slides/Slide2Instruments";
import Slide3Objective from "@/components/slides/Slide3Objective";
import Slide4Procedure from "@/components/slides/Slide4Procedure";
import Slide5Data from "@/components/slides/Slide5Data";
import Slide6Challenges from "@/components/slides/Slide6Challenges";
import Slide7Relations from "@/components/slides/Slide7Relations";
import Slide8Results from "@/components/slides/Slide8Results";
import Slide9Conclusion from "@/components/slides/Slide9Conclusion";
import SlideNav from "@/components/ui/SlideNav";
import ScriptView from "@/components/debug/ScriptView";
import PrintView from "@/components/print/PrintView";
import Timer from "@/components/ui/Timer";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

type Mode = "landing" | "presentation" | "debug" | "pdf";

function PresentationView() {
  useSlideNavigation();

  return (
    <main className="pb-14">
      <SlideNav />
      <Timer />
      <Slide0Cover />
      <SectionDivider section={0} />
      <Slide1Intro />
      <Slide2Instruments />
      <Slide3Objective />
      <SectionDivider section={1} />
      <Slide4Procedure />
      <Slide5Data />
      <Slide6Challenges />
      <SectionDivider section={2} />
      <Slide7Relations />
      <Slide8Results />
      <Slide9Conclusion />
    </main>
  );
}

export default function Home() {
  const [mode, setMode] = useState<Mode>("landing");

  if (mode === "presentation") {
    return <PresentationView />;
  }

  if (mode === "debug") {
    return <ScriptView onBack={() => setMode("landing")} />;
  }

  if (mode === "pdf") {
    return <PrintView onBack={() => setMode("landing")} />;
  }

  return <LandingView onSelect={setMode} />;
}

function LandingView({
  onSelect,
}: {
  onSelect: (mode: Mode) => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="text-center space-y-10 max-w-2xl">
        {/* USP branding */}
        <div className="space-y-2">
          <p className="text-sm uppercase tracking-[0.3em] text-muted font-medium">
            Universidade de São Paulo
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-muted/70">
            Física Experimental — 1.o Semestre 2026
          </p>
        </div>

        <h1 className="text-3xl md:text-4xl font-bold leading-tight">
          Equilíbrio Estático de{" "}
          <span className="text-accent-blue">Três Forças</span>
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <button
            onClick={() => onSelect("presentation")}
            className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-accent-blue/10 border-2 border-accent-blue/30 hover:border-accent-blue/60 hover:bg-accent-blue/15 transition-all"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-blue"
            >
              <rect
                x="2"
                y="3"
                width="20"
                height="14"
                rx="2"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 21h8M12 17v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-bold text-accent-blue">
              Apresentação
            </span>
            <span className="text-xs text-muted">
              Slides interativos com animações
            </span>
          </button>

          <button
            onClick={() => onSelect("debug")}
            className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-accent-amber/10 border-2 border-accent-amber/30 hover:border-accent-amber/60 hover:bg-accent-amber/15 transition-all"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-amber"
            >
              <path
                d="M4 6h16M4 10h16M4 14h10M4 18h7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-bold text-accent-amber">
              Roteiro
            </span>
            <span className="text-xs text-muted">
              Script completo com falas e notas
            </span>
          </button>

          <button
            onClick={() => onSelect("pdf")}
            className="group flex flex-col items-center gap-3 px-8 py-6 rounded-2xl bg-accent-green/10 border-2 border-accent-green/30 hover:border-accent-green/60 hover:bg-accent-green/15 transition-all"
          >
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              className="text-accent-green"
            >
              <path
                d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <polyline
                points="14 2 14 8 20 8"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <line
                x1="16"
                y1="13"
                x2="8"
                y2="13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <line
                x1="16"
                y1="17"
                x2="8"
                y2="17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <span className="text-lg font-bold text-accent-green">
              PDF
            </span>
            <span className="text-xs text-muted">
              Exportar apresentação para impressão
            </span>
          </button>
        </div>

        {/* Students */}
        <p className="text-xs text-muted/50">
          Caio &middot; Wiliam &middot; Giovani
        </p>
      </div>
    </div>
  );
}
