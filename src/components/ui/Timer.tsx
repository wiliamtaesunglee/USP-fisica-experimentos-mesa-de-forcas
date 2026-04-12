"use client";

import { useState, useRef, useCallback, useEffect } from "react";

export default function Timer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (running) return;
    setRunning(true);
    const startTime = Date.now() - elapsed;
    intervalRef.current = setInterval(() => {
      setElapsed(Date.now() - startTime);
    }, 100);
  }, [running, elapsed]);

  const pause = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
  }, []);

  const reset = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setElapsed(0);
  }, []);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const totalSeconds = Math.floor(elapsed / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const isOver = totalSeconds > 600; // > 10 min

  return (
    <div className="fixed bottom-16 right-6 z-50 flex items-center gap-2 px-3 py-2 rounded-xl bg-surface/90 backdrop-blur-sm border border-surface-light shadow-lg">
      {/* Time display */}
      <span
        className={`font-mono text-lg font-bold tabular-nums ${
          isOver ? "text-accent-red" : running ? "text-accent-green" : "text-foreground"
        }`}
      >
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </span>

      {/* Divider */}
      <span className="w-px h-5 bg-surface-light" />

      {/* Controls */}
      {!running ? (
        <button
          onClick={start}
          className="p-1.5 rounded-lg hover:bg-surface-light transition-colors text-accent-green"
          aria-label="Iniciar"
          title="Iniciar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2.5v11l9-5.5z" />
          </svg>
        </button>
      ) : (
        <button
          onClick={pause}
          className="p-1.5 rounded-lg hover:bg-surface-light transition-colors text-accent-amber"
          aria-label="Pausar"
          title="Pausar"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        </button>
      )}

      <button
        onClick={reset}
        className="p-1.5 rounded-lg hover:bg-surface-light transition-colors text-muted hover:text-foreground"
        aria-label="Resetar"
        title="Resetar"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <path d="M2 8a6 6 0 1 1 1.8 4.3" />
          <path d="M2 12V8h4" />
        </svg>
      </button>
    </div>
  );
}
