"use client";

import { useRef } from "react";

interface SlideContainerProps {
  id: string;
  children: React.ReactNode;
  className?: string;
}

export default function SlideContainer({
  id,
  children,
  className = "",
}: SlideContainerProps) {
  const ref = useRef<HTMLElement>(null);

  return (
    <section id={id} ref={ref} className={`slide ${className}`}>
      <div className="w-full max-w-[1100px] mx-auto">{children}</div>
    </section>
  );
}
