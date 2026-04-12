"use client";

import { SCRIPT, ACT_PRESENTERS, TIMING_SUMMARY } from "@/lib/script-data";
import { STUDENTS } from "@/lib/constants";
import Timer from "@/components/ui/Timer";

function isStageDirection(line: string) {
  return line.startsWith("(") && line.endsWith(")");
}

export default function ScriptView({ onBack }: { onBack: () => void }) {
  let currentAct = 0;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Timer />
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/90 backdrop-blur-sm border-b border-surface-light">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold">Roteiro Completo</h1>
            <p className="text-xs text-muted">Formato teatral — 10 minutos</p>
          </div>
          <button
            onClick={onBack}
            className="px-4 py-2 rounded-lg bg-surface border border-surface-light text-sm font-medium hover:bg-surface-light transition-colors"
          >
            Voltar
          </button>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 space-y-6">
        {/* Timing summary */}
        <div className="p-5 rounded-xl bg-surface border border-surface-light">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted mb-4">
            Estrutura de Tempo
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {TIMING_SUMMARY.map((t, i) => (
              <div
                key={i}
                className="p-3 rounded-lg border text-center"
                style={{
                  borderColor: [
                    "#3b82f640",
                    "#10b98140",
                    "#f59e0b40",
                  ][i],
                  backgroundColor: [
                    "#3b82f610",
                    "#10b98110",
                    "#f59e0b10",
                  ][i],
                }}
              >
                <p
                  className="font-bold text-sm"
                  style={{
                    color: ["#3b82f6", "#10b981", "#f59e0b"][i],
                  }}
                >
                  {t.act}
                </p>
                <p className="text-xs text-muted mt-1">{t.time}</p>
                <p className="text-lg font-bold mt-1">{t.duration}</p>
                <p className="text-xs text-muted mt-1">
                  {STUDENTS[i].name}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Scenes */}
        {SCRIPT.map((scene, i) => {
          const showActHeader = scene.act !== currentAct;
          if (showActHeader) currentAct = scene.act;

          return (
            <div key={i}>
              {/* Act header */}
              {showActHeader && (
                <div className="mt-10 mb-6">
                  <div
                    className="flex items-center gap-4 p-5 rounded-xl border-2"
                    style={{
                      borderColor: scene.actColor,
                      backgroundColor: `${scene.actColor}10`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold border-2"
                      style={{
                        borderColor: scene.actColor,
                        color: scene.actColor,
                      }}
                    >
                      {scene.act}
                    </div>
                    <div>
                      <h2
                        className="text-2xl font-bold"
                        style={{ color: scene.actColor }}
                      >
                        Ato {scene.act} — {scene.actTitle}
                      </h2>
                      <p className="text-sm text-muted mt-1">
                        {
                          ACT_PRESENTERS[
                            scene.act as keyof typeof ACT_PRESENTERS
                          ]
                        }{" "}
                        — {STUDENTS[scene.act - 1].name}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Scene card */}
              <div className="p-5 rounded-xl bg-surface border border-surface-light space-y-4">
                {/* Scene header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-xs font-bold px-2.5 py-1 rounded-full"
                      style={{
                        backgroundColor: `${scene.actColor}20`,
                        color: scene.actColor,
                      }}
                    >
                      Cena {scene.sceneNumber}
                    </span>
                    <h3 className="font-bold text-lg">
                      {scene.sceneTitle}
                    </h3>
                  </div>
                  {scene.timing && (
                    <span className="text-xs text-muted font-mono">
                      {scene.timing}
                    </span>
                  )}
                </div>

                {/* Slide reference */}
                <p className="text-xs text-muted">
                  Slide:{" "}
                  <span className="font-medium text-foreground">
                    {scene.slideLabel}
                  </span>
                </p>

                {/* Speech */}
                <div className="space-y-2 pl-4 border-l-2 border-accent-blue/30">
                  <p className="text-xs uppercase tracking-wider text-accent-blue font-bold">
                    Fala
                  </p>
                  {scene.speech.map((line, j) => {
                    if (isStageDirection(line)) {
                      return (
                        <p
                          key={j}
                          className="text-sm italic text-muted/70"
                        >
                          {line}
                        </p>
                      );
                    }

                    // Check if line contains a highlight
                    const hasHighlight = scene.highlights.some((h) =>
                      line.toLowerCase().includes(h.toLowerCase())
                    );

                    return (
                      <p
                        key={j}
                        className={`text-base leading-relaxed ${
                          hasHighlight
                            ? "font-semibold text-accent-blue"
                            : ""
                        }`}
                      >
                        {line.startsWith("—") ? (
                          <span className="text-muted">{line}</span>
                        ) : (
                          `"${line}"`
                        )}
                      </p>
                    );
                  })}
                </div>

                {/* Highlights */}
                {scene.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {scene.highlights.map((h, j) => (
                      <span
                        key={j}
                        className="text-xs px-2.5 py-1 rounded-full bg-accent-amber/15 text-accent-amber font-medium border border-accent-amber/30"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                )}

                {/* Notes */}
                {scene.notes.length > 0 && (
                  <details className="group">
                    <summary className="text-xs uppercase tracking-wider text-muted font-bold cursor-pointer hover:text-foreground transition-colors select-none">
                      Notas de estudo
                    </summary>
                    <div className="mt-2 p-3 rounded-lg bg-surface-light/50 space-y-1.5">
                      {scene.notes.map((note, j) => (
                        <p key={j} className="text-sm text-muted leading-relaxed">
                          {note.startsWith("Se perguntarem") ||
                          note.startsWith("NÃO") ||
                          note.startsWith("👉") ? (
                            <span className="text-accent-amber font-medium">
                              {note}
                            </span>
                          ) : (
                            <>
                              <span className="text-muted/60 mr-1.5">
                                &bull;
                              </span>
                              {note}
                            </>
                          )}
                        </p>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            </div>
          );
        })}

        {/* Footer */}
        <div className="mt-12 p-6 rounded-xl bg-accent-blue/10 border border-accent-blue/30 text-center space-y-3">
          <p className="text-lg font-bold text-accent-blue">
            Dicas de Ensaio
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm text-muted">
            <span>1. Leia em voz alta</span>
            <span className="hidden sm:inline text-surface-light">|</span>
            <span>2. Grave você mesmo</span>
            <span className="hidden sm:inline text-surface-light">|</span>
            <span>3. Ajuste as pausas</span>
          </div>
        </div>

        {/* Back button */}
        <div className="text-center pb-8">
          <button
            onClick={onBack}
            className="px-6 py-3 rounded-xl bg-surface border border-surface-light text-sm font-medium hover:bg-surface-light transition-colors"
          >
            Voltar para a capa
          </button>
        </div>
      </div>
    </div>
  );
}
