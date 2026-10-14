"use client";
/* The delta around Thanjavur, drawn by hand: the Kaveri running east to the Bay of Bengal,
   the coast curling round Point Calimere, and every day trip from the Explore page pinned
   where it lies. Illustrative, not to scale. */
import { useState } from "react";
import { PLACES } from "@/lib/content";
import { placeSrc } from "@/lib/img";
import Img from "@/components/fx/Img";
import FanMark from "@/components/brand/FanMark";

const HOME = { x: 40, y: 52 };
const VB = { x: 0, y: 20, w: 100, h: 76 };
const pct = (x: number, y: number) => ({ left: `${((x - VB.x) / VB.w) * 100}%`, top: `${((y - VB.y) / VB.h) * 100}%` });

const RIVER = "M0 46 C8 47 13 50 18 49 S28 44 36 44 S48 41 55 38 S66 33 74 31 S86 27 93 26";
/* the Kaveri's delta arms: the Vennar strikes south-east towards Point Calimere, the Kollidam
   (Coleroon) peels away north */
const VENNAR = "M38 44 C42 50 47 56 54 62 S68 72 76 78 S86 83 89 84";
const KOLLIDAM = "M10 44 C20 38 32 32 46 28 S66 22 80 20";
const COAST = "M93 20 C93.5 30 93 40 92.4 50 S91.6 64 91.4 72 S91 82 90 85 C86 86.5 80 86 74 85 S62 86 56 88.5 S46 93 38 96";

export default function RegionMap() {
  const regional = PLACES.filter((p) => p.region === "region");
  const [active, setActive] = useState<number | null>(null);
  const a = active !== null ? regional[active] : null;

  return (
    <div className="map" onMouseLeave={() => setActive(null)}>
      <div className="map__grid" aria-hidden="true" />
      <svg viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`} preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="sea" x1="0" x2="1"><stop offset="0" stopColor="#1b3346" stopOpacity="0" /><stop offset="1" stopColor="#1b3346" stopOpacity=".9" /></linearGradient>
        </defs>
        <path d={`${COAST} L38 96 L100 96 L100 20 Z`} fill="url(#sea)" opacity=".7" />
        <g data-draw fill="none" strokeLinecap="round">
          <path d={COAST} stroke="rgba(230,200,134,.6)" strokeWidth=".14" pathLength={1} />
          <path d={RIVER} stroke="rgba(28,191,192,.75)" strokeWidth=".2" pathLength={1} />
          <path d={VENNAR} stroke="rgba(28,191,192,.4)" strokeWidth=".12" pathLength={1} />
          <path d={KOLLIDAM} stroke="rgba(28,191,192,.4)" strokeWidth=".12" pathLength={1} />
          {regional.map((p) => (
            <path key={p.name} d={`M${HOME.x} ${HOME.y} L${p.x} ${p.y}`} stroke="rgba(230,200,134,.22)" strokeWidth=".08" pathLength={1} />
          ))}
        </g>
      </svg>
      <span className="map__label" style={{ ...pct(70, 29.5), transform: "rotate(-9deg)" }}>Kaveri</span>
      <span className="map__label map__label--sea" style={{ ...pct(96.5, 50), writingMode: "vertical-rl" }}>Bay of Bengal</span>
      <span className="map__label map__label--sea" style={pct(72, 92)}>Palk Bay</span>

      <div className="map__home" style={pct(HOME.x, HOME.y)}>
        <span className="map__halo" />
        <FanMark className="map__fan" color="var(--color-gold-hi)" />
        <b>Thanjavur</b>
        <small>Our three hotels</small>
      </div>

      {regional.map((p, i) => (
        <button key={p.name} className={`map__pin${p.x! > 80 ? " is-left" : ""}${active === i ? " is-active" : ""}`} style={pct(p.x!, p.y!)}
          onMouseEnter={() => setActive(i)} onFocus={() => setActive(i)} onClick={() => setActive(i)} aria-label={p.name}>
          <i /><span>{p.image === "velankanni" ? "Velankanni" : p.name}</span>
        </button>
      ))}

      {a && (
        <div className="map__card is-on" style={{ ...pct(a.x! > 60 ? a.x! - 30 : a.x! + 3, Math.min(a.y! + 3, 60)) }}>
          <Img src={placeSrc(a.image)} sizes="320px" loading="eager" />
          <div><h4>{a.name}</h4><p>{a.text}</p></div>
        </div>
      )}
      <div className="map__city">
        <h4>In Thanjavur itself</h4>
        <ul>{PLACES.filter((p) => p.region === "city").map((p) => <li key={p.name}>{p.name}</li>)}</ul>
      </div>
      <p className="map__note">Illustrative map · not to scale</p>
    </div>
  );
}
