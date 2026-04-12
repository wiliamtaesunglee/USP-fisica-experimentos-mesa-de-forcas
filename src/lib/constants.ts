// ========================================
// DADOS EXPERIMENTAIS REAIS
// ========================================

export interface Measurement {
  id: number;
  laranja: { m: number; angle: number };
  vermelho: { m: number; alfa: number; cosAlfa: number; compTracao: number };
  azul: { m: number; beta: number; cosBeta: number; compTracao: number };
  calculada: { vermelho: number; azul: number; laranja: number };
  difAbs: { vermelho: number; azul: number; laranja: number };
}

// Valores teóricos (massas originais)
export const THEORETICAL = {
  laranja: 571.8,
  vermelho: 415.4,
  azul: 333.0,
} as const;

// Médias experimentais calculadas
export const EXPERIMENTAL_MEANS = {
  vermelho: { mean: 418.4, diffPercent: 0.71 },
  azul: { mean: 336.3, diffPercent: 1.0 },
  laranja: { mean: 569.5, diffPercent: -0.4 },
} as const;

// 15 medições
export const MEASUREMENTS: Measurement[] = [
  { id: 1, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 38, cosAlfa: 0.788, compTracao: 327.34 }, azul: { m: 333.0, beta: -51.5, cosBeta: 0.623, compTracao: 207.3 }, calculada: { vermelho: 462.56, azul: 392.7, laranja: 534.64 }, difAbs: { vermelho: 47.16, azul: -59.7, laranja: 37.16 } },
  { id: 2, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -40, cosAlfa: 0.766, compTracao: 318.22 }, azul: { m: 333.0, beta: 41, cosBeta: 0.755, compTracao: 251.3 }, calculada: { vermelho: 418.36, azul: 336.0, laranja: 569.53 }, difAbs: { vermelho: 2.96, azul: -3.0, laranja: 2.27 } },
  { id: 3, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 35, cosAlfa: 0.819, compTracao: 340.28 }, azul: { m: 333.0, beta: -46.5, cosBeta: 0.688, compTracao: 229.2 }, calculada: { vermelho: 418.21, azul: 336.34, laranja: 569.5 }, difAbs: { vermelho: 2.81, azul: -3.34, laranja: 2.3 } },
  { id: 4, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -35, cosAlfa: 0.819, compTracao: 340.28 }, azul: { m: 333.0, beta: 37, cosBeta: 0.799, compTracao: 265.9 }, calculada: { vermelho: 373.38, azul: 289.9, laranja: 606.22 }, difAbs: { vermelho: -42.02, azul: 43.1, laranja: -34.42 } },
  { id: 5, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 36, cosAlfa: 0.809, compTracao: 336.07 }, azul: { m: 333.0, beta: -43, cosBeta: 0.731, compTracao: 243.5 }, calculada: { vermelho: 405.75, azul: 322.33, laranja: 579.61 }, difAbs: { vermelho: -9.65, azul: 10.67, laranja: -7.81 } },
  { id: 6, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 43, cosAlfa: 0.731, compTracao: 303.8 }, azul: { m: 333.0, beta: -43, cosBeta: 0.731, compTracao: 243.5 }, calculada: { vermelho: 448.84, azul: 366.44, laranja: 547.35 }, difAbs: { vermelho: 33.44, azul: -33.44, laranja: 24.45 } },
  { id: 7, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 37, cosAlfa: 0.799, compTracao: 331.75 }, azul: { m: 333.0, beta: -45, cosBeta: 0.707, compTracao: 235.5 }, calculada: { vermelho: 421.14, azul: 339.48, laranja: 567.22 }, difAbs: { vermelho: 5.74, azul: -6.48, laranja: 4.58 } },
  { id: 8, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 28, cosAlfa: 0.883, compTracao: 366.78 }, azul: { m: 333.0, beta: -36.5, cosBeta: 0.804, compTracao: 267.7 }, calculada: { vermelho: 344.43, azul: 255.05, laranja: 634.46 }, difAbs: { vermelho: -70.97, azul: 77.95, laranja: -62.66 } },
  { id: 9, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: 36.5, cosAlfa: 0.804, compTracao: 333.92 }, azul: { m: 333.0, beta: -54, cosBeta: 0.588, compTracao: 195.7 }, calculada: { vermelho: 467.83, azul: 404.7, laranja: 529.65 }, difAbs: { vermelho: 52.43, azul: -71.7, laranja: 42.15 } },
  { id: 10, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -43, cosAlfa: 0.731, compTracao: 303.8 }, azul: { m: 333.0, beta: 48.5, cosBeta: 0.663, compTracao: 220.7 }, calculada: { vermelho: 480.13, azul: 404.45, laranja: 524.46 }, difAbs: { vermelho: 64.73, azul: -71.45, laranja: 47.34 } },
  { id: 11, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -33, cosAlfa: 0.839, compTracao: 348.38 }, azul: { m: 333.0, beta: 56, cosBeta: 0.559, compTracao: 186.2 }, calculada: { vermelho: 459.76, azul: 399.53, laranja: 534.6 }, difAbs: { vermelho: 44.36, azul: -66.53, laranja: 37.21 } },
  { id: 12, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -30, cosAlfa: 0.866, compTracao: 359.75 }, azul: { m: 333.0, beta: 45, cosBeta: 0.707, compTracao: 235.5 }, calculada: { vermelho: 388.36, azul: 299.89, laranja: 595.21 }, difAbs: { vermelho: -27.04, azul: 33.11, laranja: -23.41 } },
  { id: 13, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -26, cosAlfa: 0.899, compTracao: 373.36 }, azul: { m: 333.0, beta: 32, cosBeta: 0.848, compTracao: 282.4 }, calculada: { vermelho: 321.99, azul: 234.0, laranja: 655.76 }, difAbs: { vermelho: -93.41, azul: 99.0, laranja: -83.96 } },
  { id: 14, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -40, cosAlfa: 0.766, compTracao: 318.22 }, azul: { m: 333.0, beta: 50, cosBeta: 0.643, compTracao: 214.0 }, calculada: { vermelho: 467.01, azul: 394.51, laranja: 532.26 }, difAbs: { vermelho: 51.61, azul: -61.51, laranja: 39.54 } },
  { id: 15, laranja: { m: 571.8, angle: 0 }, vermelho: { m: 415.4, alfa: -34, cosAlfa: 0.829, compTracao: 344.38 }, azul: { m: 333.0, beta: 44, cosBeta: 0.719, compTracao: 239.5 }, calculada: { vermelho: 400.78, azul: 316.15, laranja: 583.92 }, difAbs: { vermelho: -14.62, azul: 16.85, laranja: -12.12 } },
];

// ========================================
// CONFIGURAÇÃO VISUAL
// ========================================

export const FORCE_COLORS = {
  laranja: "#f59e0b",
  vermelho: "#ef4444",
  azul: "#3b82f6",
} as const;

export const SLIDE_IDS = [
  "parte1",
  "introducao",
  "instrumentos",
  "objetivo",
  "parte2",
  "procedimento",
  "dados",
  "dificuldades",
  "parte3",
  "relacoes",
  "resultados",
  "conclusao",
] as const;

export const SLIDE_LABELS = [
  "Parte 1",
  "Introdução",
  "Instrumentos",
  "Objetivo",
  "Parte 2",
  "Procedimento",
  "Dados",
  "Dificuldades",
  "Parte 3",
  "Relações",
  "Resultados",
  "Conclusão",
] as const;

export const SECTIONS = [
  { id: "parte1" as const, title: "Fundamentos", color: "#3b82f6", slides: 3 },
  { id: "parte2" as const, title: "Execução", color: "#10b981", slides: 3 },
  { id: "parte3" as const, title: "Análise", color: "#f59e0b", slides: 3 },
] as const;

// Índices dos divisores dentro de SLIDE_IDS (para navegação)
export const DIVIDER_INDICES = [0, 4, 8] as const;

// ========================================
// UTILIDADES VETORIAIS
// ========================================

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

// Forças para diagramas vetoriais (simétricas para equilíbrio visual)
export const DIAGRAM_FORCES = [
  { id: 1, magnitude: 1.5, angle: 0, color: FORCE_COLORS.laranja, label: "F₁" },
  { id: 2, magnitude: 1.5, angle: 120, color: FORCE_COLORS.vermelho, label: "F₂" },
  { id: 3, magnitude: 1.5, angle: 240, color: FORCE_COLORS.azul, label: "F₃" },
] as const;
