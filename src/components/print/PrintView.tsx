"use client";

import { useEffect } from "react";
import Image from "next/image";
import { STUDENTS, THEORETICAL, EXPERIMENTAL_MEANS, FORCE_COLORS, MEASUREMENTS } from "@/lib/constants";
import MathFormula from "@/components/ui/MathFormula";

const DISPLAY_ROWS = [2, 3, 5, 7, 12, 15];

const materials = [
  "Mesa de forças",
  "Polias",
  "Massas penduradas",
  "Anel central",
  "Fios",
];

const instruments = [
  { name: "Transferidor da mesa", uncertainty: "± 0,5°" },
  { name: "Balança", uncertainty: "± 0,1 g" },
  { name: "Mesa de forças", uncertainty: "Atrito nas polias" },
];

const limitations = [
  "Modelo ideal ignora atrito e oscilações",
  "Leitura angular tem precisão limitada",
  "Massas nominais podem diferir das reais",
];

const steps = [
  "Fixar as três massas nos fios da mesa de forças",
  "Ajustar os ângulos das polias até o anel central atingir equilíbrio",
  "Registrar os ângulos de cada configuração de equilíbrio",
  "Calcular as massas desconhecidas usando a massa de referência e os ângulos medidos",
];

const challenges = [
  "Atrito nas polias — resistência mecânica",
  "Imprecisão angular — erro de paralaxe",
  "Oscilação do sistema — vibração dificulta leitura",
  "Leitura das massas — variações na calibração",
];

const relations = [
  "Equilíbrio é vetorial, não escalar",
  "Ângulos determinam a distribuição de forças",
  "Uma massa conhecida é suficiente para determinar as demais",
];

const conclusions = [
  "É possível determinar massas desconhecidas a partir do equilíbrio",
  "Os ângulos de equilíbrio carregam toda a informação necessária",
  "Erro médio < 1% — teoria validada pela prática",
];

const comparison = [
  { label: "Vermelho", direct: THEORETICAL.vermelho, indirect: EXPERIMENTAL_MEANS.vermelho.mean, diff: EXPERIMENTAL_MEANS.vermelho.diffPercent, color: FORCE_COLORS.vermelho },
  { label: "Azul", direct: THEORETICAL.azul, indirect: EXPERIMENTAL_MEANS.azul.mean, diff: EXPERIMENTAL_MEANS.azul.diffPercent, color: FORCE_COLORS.azul },
  { label: "Laranja", direct: THEORETICAL.laranja, indirect: EXPERIMENTAL_MEANS.laranja.mean, diff: EXPERIMENTAL_MEANS.laranja.diffPercent, color: FORCE_COLORS.laranja },
];

function PageBreak() {
  return <div className="break-after-page" />;
}

function SlideHeader({ number, title }: { number: number; title: string }) {
  return (
    <div className="flex items-center gap-3 mb-6 pb-3 border-b border-gray-300">
      <span className="text-sm font-bold text-gray-400">{String(number).padStart(2, "0")}</span>
      <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
    </div>
  );
}

export default function PrintView({ onBack }: { onBack: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => window.print(), 500);
    return () => clearTimeout(timer);
  }, []);

  const rows = DISPLAY_ROWS.map((id) => MEASUREMENTS.find((m) => m.id === id)!);

  return (
    <div className="print-view bg-white text-gray-900 min-h-screen">
      {/* Back button — hidden in print */}
      <div className="print:hidden fixed top-4 right-4 z-50">
        <button
          onClick={onBack}
          className="px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-sm font-medium hover:bg-gray-200"
        >
          Voltar
        </button>
      </div>

      <div className="max-w-[800px] mx-auto px-8 py-12 print:px-0 print:py-0">

        {/* === CAPA === */}
        <div className="flex flex-col items-center justify-center min-h-[90vh] print:min-h-[95vh] text-center space-y-8">
          <p className="text-sm uppercase tracking-[0.3em] text-gray-500 font-medium">
            Universidade de São Paulo
          </p>
          <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
            Física Experimental — 1.o Semestre 2026
          </p>
          <div className="w-16 h-px bg-gray-300" />
          <h1 className="text-4xl font-bold leading-tight">
            Equilíbrio Estático de Três Forças
          </h1>
          <p className="text-lg text-gray-500">Experimento de mesa de forças</p>
          <div className="flex gap-6 pt-4">
            {STUDENTS.map((s) => (
              <div key={s.email} className="text-center">
                <p className="font-semibold">{s.name}</p>
                <p className="text-xs text-gray-400">{s.email}</p>
              </div>
            ))}
          </div>
        </div>
        <PageBreak />

        {/* === SLIDE 1 — Introdução === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={1} title="Introdução" />
          <p className="text-base leading-relaxed mb-4">
            A partir de uma massa conhecida e dos ângulos de equilíbrio entre
            três corpos, determinamos as massas desconhecidas usando a condição
            de soma vetorial nula.
          </p>
          <div className="mt-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Composição do experimento</p>
            <div className="flex flex-wrap gap-2">
              {materials.map((m, i) => (
                <span key={i} className="px-3 py-1 rounded-full bg-gray-100 text-sm">{m}</span>
              ))}
            </div>
          </div>
        </div>
        <PageBreak />

        {/* === SLIDE 2 — Instrumentos === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={2} title="Instrumentos e Incertezas" />
          <div className="grid grid-cols-3 gap-4">
            {instruments.map((inst, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200 text-center">
                <p className="font-semibold">{inst.name}</p>
                <p className="mt-2 text-sm font-bold text-blue-600">{inst.uncertainty}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-gray-500 leading-relaxed">
            As incertezas instrumentais propagam-se para o resultado final.
            Conhecê-las é essencial para avaliar a confiabilidade das massas calculadas.
          </p>
          <figure className="mt-6">
            <Image
              src="/fotos/montagem-geral.jpg"
              alt="Mesa de forças montada: transferidor, polias nas bordas, fios convergindo no anel central e massas penduradas"
              width={1600}
              height={737}
              className="w-full h-auto rounded-lg border border-gray-200"
            />
            <figcaption className="mt-2 text-xs text-gray-500 text-center">
              Montagem real: a mesa de forças com o transferidor, as polias presas nas bordas e os
              fios convergindo no anel central, cada um tensionado por uma massa pendurada.
            </figcaption>
          </figure>
        </div>
        <PageBreak />

        {/* === SLIDE 3 — Objetivo e Equações === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={3} title="Objetivo e Equações" />
          <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 mb-6">
            <p className="text-sm text-gray-500 mb-1 font-medium">Objetivo</p>
            <p>Determinar as massas desconhecidas dos corpos vermelho e azul,
            utilizando a massa conhecida (laranja) e os ângulos de equilíbrio.</p>
          </div>
          <div className="space-y-3 mb-6">
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <MathFormula tex="\sum F_x = 0 \;\Rightarrow\; F_1\cos(\alpha) + F_2\cos(\beta) + F_3 = 0" display />
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-gray-200">
              <MathFormula tex="\sum F_y = 0 \;\Rightarrow\; F_1\sin(\alpha) + F_2\sin(\beta) = 0" display />
            </div>
            <div className="p-3 rounded-lg bg-gray-50 border border-amber-200">
              <MathFormula tex="m_{\text{calc}} = m_{\text{ref}} \cdot \frac{\cos(\alpha)}{\cos(\beta)}" display />
            </div>
          </div>
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-2">Limitações do modelo</p>
          <ul className="space-y-1">
            {limitations.map((l, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-400" />
                {l}
              </li>
            ))}
          </ul>
        </div>
        <PageBreak />

        {/* === SLIDE 4 — Procedimento === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={4} title="Procedimento" />
          <div className="flex gap-6 mb-6">
            <div className="grid grid-cols-1 gap-4 flex-1">
              {steps.map((step, i) => (
                <div key={i} className="flex items-start gap-3 p-4 rounded-lg border border-gray-200">
                  <span className="text-xl font-bold text-gray-300">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-sm">{step}</p>
                </div>
              ))}
            </div>
            <figure className="w-44 flex-shrink-0">
              <Image
                src="/fotos/anel-central.jpg"
                alt="Detalhe do anel central: os fios das três polias se encontram no anel, sobre o ponto de referência 0° do transferidor"
                width={738}
                height={1600}
                className="w-full h-auto rounded-lg border border-gray-200"
              />
              <figcaption className="mt-2 text-xs text-gray-500 text-center leading-relaxed">
                Anel central: o equilíbrio é atingido quando o anel fica centrado sobre o 0° do
                transferidor.
              </figcaption>
            </figure>
          </div>
          <p className="text-center text-gray-500">
            <span className="text-2xl font-bold text-blue-600">15</span> configurações de ângulos testadas
          </p>
        </div>
        <PageBreak />

        {/* === SLIDE 5 — Dados === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={5} title="Dados Experimentais" />
          <div className="flex justify-center gap-4 mb-6">
            {[
              { label: "Vermelho", value: THEORETICAL.vermelho, color: FORCE_COLORS.vermelho },
              { label: "Azul", value: THEORETICAL.azul, color: FORCE_COLORS.azul },
              { label: "Laranja (ref.)", value: THEORETICAL.laranja, color: FORCE_COLORS.laranja },
            ].map((c) => (
              <div key={c.label} className="px-4 py-2 rounded-lg border border-gray-200 text-center">
                <span className="text-sm text-gray-500">{c.label}: </span>
                <span className="font-bold" style={{ color: c.color }}>{c.value} g</span>
              </div>
            ))}
          </div>
          <table className="w-full text-sm border-collapse border border-gray-200">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-3 text-left border border-gray-200">#</th>
                <th className="py-2 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.vermelho }}>Verm. (g)</th>
                <th className="py-2 px-3 text-center border border-gray-200">α</th>
                <th className="py-2 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.azul }}>Azul (g)</th>
                <th className="py-2 px-3 text-center border border-gray-200">β</th>
                <th className="py-2 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.laranja }}>Lar. (g)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((m) => (
                <tr key={m.id}>
                  <td className="py-1.5 px-3 border border-gray-200 text-gray-500">{m.id}</td>
                  <td className="py-1.5 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.vermelho }}>{m.calculada.vermelho.toFixed(1)}</td>
                  <td className="py-1.5 px-3 text-center border border-gray-200 text-gray-500">{m.vermelho.alfa > 0 ? "+" : ""}{m.vermelho.alfa}°</td>
                  <td className="py-1.5 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.azul }}>{m.calculada.azul.toFixed(1)}</td>
                  <td className="py-1.5 px-3 text-center border border-gray-200 text-gray-500">{m.azul.beta > 0 ? "+" : ""}{m.azul.beta}°</td>
                  <td className="py-1.5 px-3 text-center border border-gray-200" style={{ color: FORCE_COLORS.laranja }}>{m.calculada.laranja.toFixed(1)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <PageBreak />

        {/* === SLIDE 6 — Dificuldades === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={6} title="Dificuldades Experimentais" />
          <div className="grid grid-cols-2 gap-3">
            {challenges.map((c, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200">
                <p className="text-sm">{c}</p>
              </div>
            ))}
          </div>
        </div>
        <PageBreak />

        {/* === SLIDE 7 — Relações === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={7} title="Relações Físicas" />
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-4">O que os dados comprovam:</p>
          <div className="space-y-3">
            {relations.map((r, i) => (
              <div key={i} className="p-4 rounded-lg border border-gray-200">
                <p>{r}</p>
              </div>
            ))}
          </div>
        </div>
        <PageBreak />

        {/* === SLIDE 8 — Resultados === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={8} title="Resultados" />
          <p className="text-xs text-gray-500 uppercase tracking-wider font-medium mb-3">Comparação: medição indireta vs. direta</p>
          <table className="w-full text-sm border-collapse border border-gray-200 mb-6">
            <thead>
              <tr className="bg-gray-50">
                <th className="py-2 px-3 text-left border border-gray-200">Corpo</th>
                <th className="py-2 px-3 text-center border border-gray-200">Direta (g)</th>
                <th className="py-2 px-3 text-center border border-gray-200">Indireta (g)</th>
                <th className="py-2 px-3 text-center border border-gray-200">Diferença</th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((c) => (
                <tr key={c.label}>
                  <td className="py-2 px-3 font-medium border border-gray-200" style={{ color: c.color }}>{c.label}</td>
                  <td className="py-2 px-3 text-center border border-gray-200">{c.direct.toFixed(1)}</td>
                  <td className="py-2 px-3 text-center font-semibold border border-gray-200" style={{ color: c.color }}>{c.indirect.toFixed(1)}</td>
                  <td className="py-2 px-3 text-center border border-gray-200">
                    <span className="font-bold" style={{ color: c.color }}>{c.diff > 0 ? "+" : ""}{c.diff.toFixed(2)}%</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center">
            <span className="text-2xl font-bold text-green-600">&lt; 1%</span>
            <span className="text-sm text-gray-500 ml-2">erro médio</span>
          </div>
        </div>
        <PageBreak />

        {/* === SLIDE 9 — Conclusão === */}
        <div className="min-h-[90vh] print:min-h-0 py-8">
          <SlideHeader number={9} title="Conclusão" />
          <div className="space-y-3 mb-8">
            {conclusions.map((item, i) => (
              <div key={i} className="flex items-center gap-3 p-3 rounded-lg border border-gray-200">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold">
                  {i + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
          <div className="p-6 rounded-xl bg-blue-50 border border-blue-200 text-center">
            <p className="text-xl font-semibold">
              Equilíbrio não é igualdade de forças —{" "}
              <span className="text-blue-600">é cancelamento vetorial.</span>
            </p>
          </div>
          <p className="mt-6 text-sm text-gray-400 text-center italic">
            &ldquo;Conhecendo uma única massa e os ângulos de equilíbrio,
            determinamos as demais — a geometria revela as forças.&rdquo;
          </p>
        </div>
      </div>
    </div>
  );
}
