import { forwardRef } from "react";

/* A kolam, the rice-flour welcome drawn at Tamil thresholds each dawn: a ring of pulli (dots)
   and continuous looping lines that never lift from the ground. The lines are trochoids, which
   loop the same way a hand-drawn sikku kolam weaves around its dots. */
const C = 100;

function trochoid(kind: "epi" | "hypo", R: number, r: number, d: number, radius: number, rot = 0, steps = 720) {
  const k = kind === "epi" ? (R + r) / r : (R - r) / r;
  const base = kind === "epi" ? R + r : R - r;
  const s = radius / (base + d);
  let p = "";
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2;
    const x = kind === "epi" ? base * Math.cos(t) - d * Math.cos(k * t) : base * Math.cos(t) + d * Math.cos(k * t);
    const y = kind === "epi" ? base * Math.sin(t) - d * Math.sin(k * t) : base * Math.sin(t) - d * Math.sin(k * t);
    const xr = x * Math.cos(rot) - y * Math.sin(rot), yr = x * Math.sin(rot) + y * Math.cos(rot);
    p += (i ? "L" : "M") + (C + xr * s).toFixed(2) + " " + (C + yr * s).toFixed(2);
  }
  return p;
}

const ring = (n: number, radius: number, offset = 0) =>
  Array.from({ length: n }, (_, i) => {
    const a = offset + (i / n) * Math.PI * 2;
    return [+(C + radius * Math.cos(a)).toFixed(2), +(C + radius * Math.sin(a)).toFixed(2)] as const;
  });

export const KOLAM_LINES = [
  trochoid("epi", 8, 1, 2.7, 92, Math.PI / 8),
  trochoid("hypo", 4, 1, 1.9, 46, Math.PI / 4),
  trochoid("epi", 8, 1, 0.9, 64, Math.PI / 8),
];
export const KOLAM_DOTS = [[C, C] as const, ...ring(4, 22, Math.PI / 4), ...ring(8, 52, 0), ...ring(8, 78, Math.PI / 8)];

type Props = { className?: string; strokeWidth?: number; dots?: boolean };

const Kolam = forwardRef<SVGSVGElement, Props>(function Kolam({ className, strokeWidth = 0.7, dots = true }, ref) {
  return (
    <svg ref={ref} className={className} viewBox="0 0 200 200" aria-hidden="true" fill="none">
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        {KOLAM_LINES.map((d, i) => <path key={i} className="kolam-line" d={d} pathLength={1} />)}
      </g>
      {dots && <g fill="currentColor">{KOLAM_DOTS.map(([x, y], i) => <circle key={i} className="kolam-dot" cx={x} cy={y} r={1.6} />)}</g>}
    </svg>
  );
});
export default Kolam;

/** A running kolam border: interlaced arcs with a pulli in each eye. */
export function KolamBorder({ className }: { className?: string }) {
  return (
    <svg className={className} width="100%" height="26" aria-hidden="true">
      <defs>
        <pattern id="kolam-chain" width="40" height="26" patternUnits="userSpaceOnUse">
          <g fill="none" stroke="currentColor" strokeWidth=".8">
            <path d="M0 13C10 -1 30 -1 40 13" />
            <path d="M0 13C10 27 30 27 40 13" />
          </g>
          <circle cx="20" cy="13" r="1.6" fill="currentColor" />
          <circle cx="0" cy="13" r=".9" fill="currentColor" />
          <circle cx="40" cy="13" r=".9" fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="26" fill="url(#kolam-chain)" />
    </svg>
  );
}
