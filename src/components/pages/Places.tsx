"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PLACES, type Place } from "@/lib/content";
import { place } from "@/lib/img";

const KINDS: ("All" | Place["kind"])[] = ["All", "Sacred", "Heritage", "Leisure & Nature"];

export default function Places() {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("All");
  const grid = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const shown = grid.current!.querySelectorAll(".place:not(.is-out)");
    gsap.fromTo(shown, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "expo.out", stagger: 0.04 });
    ScrollTrigger.refresh();
  }, [kind]);

  return (
    <>
      <div className="filters" role="group" aria-label="Filter places">
        {KINDS.map((k) => (
          <button key={k} className="chip" aria-pressed={kind === k} onClick={() => setKind(k)}>
            {k} <span className="muted" style={{ marginLeft: 6 }}>{k === "All" ? PLACES.length : PLACES.filter((p) => p.kind === k).length}</span>
          </button>
        ))}
      </div>
      <div ref={grid} className="places" data-stagger>
        {PLACES.map((p) => (
          <article key={p.name} className={`place${kind !== "All" && p.kind !== kind ? " is-out" : ""}`}>
            <div className="frame"><img src={place(p.image)} alt={p.name} loading="lazy" /></div>
            <div>
              <span className="tag">{p.kind} · {p.region === "city" ? "In Thanjavur" : "Day trip"}</span>
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
