import { forwardRef } from "react";

/* The AHG fan, redrawn as vector from the raster logo: seven scalloped blades opening from a
   single point above a pearl. Each blade is drawn pointing straight up and rotated into place,
   so the intro can unfold it like a hand fan. */
const CX = 50, CY = 60, R0 = 7, R1 = 44, W = (9.5 * Math.PI) / 180;
export const FAN_ANGLES = [-72, -48, -24, 0, 24, 48, 72];

const polar = (r: number, a: number) => [CX + r * Math.sin(a), CY - r * Math.cos(a)].map((n) => +n.toFixed(2));
const [x1, y1] = polar(R0, -W), [x2, y2] = polar(R1, -W), [x3, y3] = polar(R1, W), [x4, y4] = polar(R0, W);
const cap = +(R1 * Math.sin(W)).toFixed(2);
export const BLADE = `M${x1} ${y1}L${x2} ${y2}A${cap} ${cap} 0 0 1 ${x3} ${y3}L${x4} ${y4}Z`;

type Props = { className?: string; color?: string; pearl?: string; title?: string };

const FanMark = forwardRef<SVGSVGElement, Props>(function FanMark({ className, color = "var(--color-teal)", pearl, title = "Abi's Hotel Group" }, ref) {
  return (
    <svg ref={ref} className={className} viewBox="-4 2 108 80" role="img" aria-label={title}>
      <g fill={color}>
        {FAN_ANGLES.map((a) => (
          <path key={a} className="fan-blade" d={BLADE} transform={`rotate(${a} ${CX} ${CY})`} />
        ))}
      </g>
      <circle className="fan-pearl" cx={CX} cy={CY + 11.5} r={4.4} fill={pearl ?? color} />
    </svg>
  );
});
export default FanMark;
export const FAN_CENTER = { x: CX, y: CY };
