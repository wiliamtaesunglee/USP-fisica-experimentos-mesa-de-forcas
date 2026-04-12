"use client";

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
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

export default function Home() {
  useSlideNavigation();

  return (
    <main className="pb-14">
      <SlideNav />

      {/* PARTE 1 — Fundamentos */}
      <SectionDivider section={0} />
      <Slide1Intro />
      <Slide2Instruments />
      <Slide3Objective />

      {/* PARTE 2 — Execução */}
      <SectionDivider section={1} />
      <Slide4Procedure />
      <Slide5Data />
      <Slide6Challenges />

      {/* PARTE 3 — Análise */}
      <SectionDivider section={2} />
      <Slide7Relations />
      <Slide8Results />
      <Slide9Conclusion />
    </main>
  );
}
