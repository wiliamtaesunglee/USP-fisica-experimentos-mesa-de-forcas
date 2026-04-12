// Force definitions chosen so ΣFx ≈ 0 and ΣFy ≈ 0
// F1: 2.0N at 30°, F2: 1.73N at 150°, F3: 1.0N at 270°
// Fx: 2cos30 + 1.73cos150 + 1cos270 = 1.732 - 1.498 + 0 ≈ 0.23
// Fy: 2sin30 + 1.73sin150 + 1sin270 = 1.0 + 0.865 - 1.0 ≈ 0.865
// Better values for near-zero sum:
// F1: 1.5N at 0°, F2: 1.5N at 120°, F3: 1.5N at 240° (symmetric)

export const FORCES = [
  { id: 1, magnitude: 1.5, angle: 0, color: "#3b82f6", label: "F₁" },
  { id: 2, magnitude: 1.5, angle: 120, color: "#10b981", label: "F₂" },
  { id: 3, magnitude: 1.5, angle: 240, color: "#f59e0b", label: "F₃" },
] as const;

export const SLIDE_IDS = [
  "titulo",
  "objetivo",
  "montagem",
  "forcas",
  "equilibrio",
  "observacoes",
  "conclusao",
] as const;

export const SLIDE_LABELS = [
  "Título",
  "Objetivo",
  "Montagem",
  "Forças",
  "Equilíbrio",
  "Observações",
  "Conclusão",
] as const;

export function polarToCartesian(
  angleDeg: number,
  magnitude: number,
  scale: number,
  cx: number,
  cy: number
) {
  const rad = (angleDeg * Math.PI) / 180;
  return {
    x: cx + magnitude * scale * Math.cos(rad),
    y: cy - magnitude * scale * Math.sin(rad),
  };
}

export function degreesToRadians(deg: number) {
  return (deg * Math.PI) / 180;
}
