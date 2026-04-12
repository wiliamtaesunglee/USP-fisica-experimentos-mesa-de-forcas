"use client";

import Slide1Intro from "@/components/slides/Slide1Intro";
import Slide2Concept from "@/components/slides/Slide2Concept";
import Slide3Setup from "@/components/slides/Slide3Setup";
import Slide4Procedure from "@/components/slides/Slide4Procedure";
import Slide5Challenges from "@/components/slides/Slide5Challenges";
import Slide6Data from "@/components/slides/Slide6Data";
import Slide7Results from "@/components/slides/Slide7Results";
import Slide8Conclusion from "@/components/slides/Slide8Conclusion";
import SlideNav from "@/components/ui/SlideNav";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

export default function Home() {
  useSlideNavigation();

  return (
    <main className="pb-14">
      <SlideNav />
      <Slide1Intro />
      <Slide2Concept />
      <Slide3Setup />
      <Slide4Procedure />
      <Slide5Challenges />
      <Slide6Data />
      <Slide7Results />
      <Slide8Conclusion />
    </main>
  );
}
