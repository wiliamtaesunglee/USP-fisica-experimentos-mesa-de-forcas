"use client";

import Slide1Title from "@/components/slides/Slide1Title";
import Slide2Objective from "@/components/slides/Slide2Objective";
import Slide3Setup from "@/components/slides/Slide3Setup";
import Slide4Forces from "@/components/slides/Slide4Forces";
import Slide5Equilibrium from "@/components/slides/Slide5Equilibrium";
import Slide6Observations from "@/components/slides/Slide6Observations";
import Slide7Conclusion from "@/components/slides/Slide7Conclusion";
import ProgressIndicator from "@/components/ui/ProgressIndicator";
import { useSlideNavigation } from "@/hooks/useSlideNavigation";

export default function Home() {
  useSlideNavigation();

  return (
    <main>
      <ProgressIndicator />
      <Slide1Title />
      <Slide2Objective />
      <Slide3Setup />
      <Slide4Forces />
      <Slide5Equilibrium />
      <Slide6Observations />
      <Slide7Conclusion />
    </main>
  );
}
