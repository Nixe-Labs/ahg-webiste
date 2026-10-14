"use client";
/* Pause / play for all ambient motion (WCAG 2.2.2). Shown as a small round button over the films
   and as a text link in the footer; hidden for visitors who already ask for reduced motion. */
import { setMotionPaused, useMotionPaused } from "@/lib/motion";

export default function MotionToggle({ className = "film-toggle", text }: { className?: string; text?: boolean }) {
  const paused = useMotionPaused();
  const label = paused ? "Play motion" : "Pause motion";
  return (
    <button type="button" className={`motion-toggle ${className}`} aria-pressed={paused} aria-label={text ? undefined : label} title={label} onClick={() => setMotionPaused(!paused)}>
      {text ? label : paused ? (
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9l7.5-4.5z" fill="currentColor" /></svg>
      ) : (
        <svg viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3.5v9M11 3.5v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      )}
    </button>
  );
}
