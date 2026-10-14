/* One switch for every ambient movement on the site (the films, the living kolam, the CSS loops),
   so a visitor can stop it all at once. Remembered for the visit; the boot script in layout.tsx
   applies html.motion-paused before first paint. */
import { useSyncExternalStore } from "react";

const subs = new Set<() => void>();
const KEY = "ahg-motion";

function current() {
  return typeof document !== "undefined" && document.documentElement.classList.contains("motion-paused");
}

export function setMotionPaused(paused: boolean) {
  document.documentElement.classList.toggle("motion-paused", paused);
  try { sessionStorage.setItem(KEY, paused ? "paused" : "on"); } catch {}
  subs.forEach((f) => f());
}

export function motionPaused() {
  return current();
}

export function onMotionChange(cb: () => void) {
  subs.add(cb);
  return () => { subs.delete(cb); };
}

/** Whether ambient motion is paused (always false while rendering on the server). */
export function useMotionPaused() {
  return useSyncExternalStore(onMotionChange, current, () => false);
}
