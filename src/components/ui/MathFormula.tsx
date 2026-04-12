"use client";

import katex from "katex";
import { useMemo } from "react";

interface MathFormulaProps {
  tex: string;
  display?: boolean;
  className?: string;
}

export default function MathFormula({
  tex,
  display = false,
  className = "",
}: MathFormulaProps) {
  const html = useMemo(
    () =>
      katex.renderToString(tex, {
        displayMode: display,
        throwOnError: false,
      }),
    [tex, display]
  );

  return (
    <span
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
