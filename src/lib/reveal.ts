/* The intro holds the page until its doors open. Anything that animates "on load" waits here. */
let done = false;
const waiting: (() => void)[] = [];

export function markRevealed() {
  if (done) return;
  done = true;
  waiting.splice(0).forEach((f) => f());
}

export function whenRevealed(cb: () => void) {
  if (done) cb();
  else waiting.push(cb);
  return () => { const i = waiting.indexOf(cb); if (i > -1) waiting.splice(i, 1); };
}
