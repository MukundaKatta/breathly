"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";

type Phase = "inhale" | "hold" | "exhale";

const PHASES: { name: Phase; label: string; seconds: number }[] = [
  { name: "inhale", label: "Breathe in", seconds: 4 },
  { name: "hold", label: "Hold", seconds: 7 },
  { name: "exhale", label: "Breathe out", seconds: 8 },
];

const TOTAL_CYCLES = 3;

export default function TryPage() {
  const [state, setState] = useState<"idle" | "running" | "done">("idle");
  const [cycle, setCycle] = useState(0);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [countdown, setCountdown] = useState(PHASES[0].seconds);
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef(0);
  const phaseStartRef = useRef(0);

  const currentPhase = PHASES[phaseIndex];

  const circleScale = (() => {
    if (state !== "running") return 0.6;
    switch (currentPhase.name) {
      case "inhale":
        return 0.6 + 0.4 * progress;
      case "hold":
        return 1.0;
      case "exhale":
        return 1.0 - 0.4 * progress;
    }
  })();

  const tick = useCallback(
    (now: number) => {
      if (state !== "running") return;

      const elapsed = (now - phaseStartRef.current) / 1000;
      const duration = PHASES[phaseIndex].seconds;
      const frac = Math.min(elapsed / duration, 1);
      const remaining = Math.max(Math.ceil(duration - elapsed), 0);

      setProgress(frac);
      setCountdown(remaining);

      if (elapsed >= duration) {
        // advance phase
        const nextPhase = phaseIndex + 1;
        if (nextPhase < PHASES.length) {
          setPhaseIndex(nextPhase);
          setCountdown(PHASES[nextPhase].seconds);
          setProgress(0);
          phaseStartRef.current = now;
        } else {
          // cycle complete
          const nextCycle = cycle + 1;
          if (nextCycle >= TOTAL_CYCLES) {
            setState("done");
            return;
          }
          setCycle(nextCycle);
          setPhaseIndex(0);
          setCountdown(PHASES[0].seconds);
          setProgress(0);
          phaseStartRef.current = now;
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    },
    [state, phaseIndex, cycle]
  );

  useEffect(() => {
    if (state === "running") {
      phaseStartRef.current = performance.now();
      startTimeRef.current = performance.now();
      rafRef.current = requestAnimationFrame(tick);
    }
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [state, tick]);

  function start() {
    setCycle(0);
    setPhaseIndex(0);
    setCountdown(PHASES[0].seconds);
    setProgress(0);
    setState("running");
  }

  function reset() {
    setState("idle");
    setCycle(0);
    setPhaseIndex(0);
    setCountdown(PHASES[0].seconds);
    setProgress(0);
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      {/* Nav */}
      <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-tight"
        >
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-sky-500" />
          Breathly
        </Link>
        <span className="text-sm text-neutral-400">4-7-8 Breathing</span>
      </nav>

      {/* Main */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 pb-20">
        {state === "done" ? (
          <div className="text-center">
            <div className="text-6xl">🧘</div>
            <h2 className="mt-6 text-3xl font-bold tracking-tight">Done</h2>
            <p className="mt-3 text-neutral-600">
              Three cycles complete. Notice how you feel.
            </p>
            <button
              onClick={reset}
              className="mt-8 rounded-full bg-sky-600 px-7 py-3.5 font-medium text-white transition hover:bg-sky-700"
            >
              Start over
            </button>
          </div>
        ) : (
          <>
            {/* Breathing circle */}
            <div className="relative flex h-64 w-64 items-center justify-center">
              <svg
                viewBox="0 0 200 200"
                className="absolute inset-0 h-full w-full"
              >
                <circle
                  cx="100"
                  cy="100"
                  r={90 * circleScale}
                  fill="none"
                  stroke="url(#skyGrad)"
                  strokeWidth="4"
                  className="transition-none"
                  style={{
                    filter: "drop-shadow(0 0 20px rgba(14,165,233,0.25))",
                  }}
                />
                <circle
                  cx="100"
                  cy="100"
                  r={90 * circleScale}
                  className="transition-none"
                  fill="url(#skyGradFill)"
                  opacity="0.15"
                />
                <defs>
                  <linearGradient
                    id="skyGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#7dd3fc" />
                    <stop offset="100%" stopColor="#0284c7" />
                  </linearGradient>
                  <linearGradient
                    id="skyGradFill"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#bae6fd" />
                    <stop offset="100%" stopColor="#38bdf8" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="z-10 flex flex-col items-center text-sky-900">
                {state === "running" ? (
                  <>
                    <div className="text-xl font-semibold">
                      {currentPhase.label}
                    </div>
                    <div className="mt-1 text-5xl font-bold">{countdown}</div>
                  </>
                ) : (
                  <div className="text-xl font-semibold text-neutral-400">
                    Ready
                  </div>
                )}
              </div>
            </div>

            {/* Cycle counter */}
            {state === "running" && (
              <p className="mt-6 text-sm text-neutral-500">
                Cycle {cycle + 1} of {TOTAL_CYCLES}
              </p>
            )}

            {/* Start button */}
            {state === "idle" && (
              <div className="mt-10 text-center">
                <button
                  onClick={start}
                  className="rounded-full bg-sky-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-sky-700"
                >
                  Start
                </button>
                <p className="mt-4 text-sm text-neutral-400">
                  4 seconds in · 7 seconds hold · 8 seconds out · 3 cycles
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-8 text-sm text-neutral-500">
          <p className="flex items-center gap-2">
            <span className="inline-block h-2 w-2 rounded-full bg-sky-500" />
            Breathly
          </p>
          <p>&copy; 2026</p>
        </div>
      </footer>
    </div>
  );
}
