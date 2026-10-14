"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { REVIEWS } from "@/lib/content";
import { Arrow, ArrowL, Quote } from "@/components/brand/Icons";

const DWELL = 7;

/* Guest words, one at a time: the outgoing quote lifts away, the next rises line by line. */
export default function Testimonials() {
  const [i, setI] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLElement>(null);
  const paused = useRef(false);
  const visible = useRef(false);
  const go = useCallback((d: number) => setI((n) => (n + d + REVIEWS.length) % REVIEWS.length), []);

  useEffect(() => {
    const q = stage.current!.querySelectorAll<HTMLElement>(".quote");
    q.forEach((el, k) => {
      if (k === i) {
        el.classList.add("is-on");
        gsap.fromTo(el.querySelectorAll("p, footer"), { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, ease: "expo.out", stagger: 0.08, delay: 0.3 });
      } else if (el.classList.contains("is-on")) {
        gsap.to(el, { opacity: 0, y: -20, duration: 0.4, onComplete: () => { el.classList.remove("is-on"); gsap.set(el, { clearProps: "opacity,transform" }); } });
      }
    });
    const t = gsap.fromTo(bar.current, { scaleX: 0 }, { scaleX: 1, duration: DWELL, ease: "none", onComplete: () => (paused.current || !visible.current ? t.restart() : go(1)) });
    return () => { t.kill(); };
  }, [i, go]);

  // only turn the pages while someone can see them
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { visible.current = e.isIntersecting; }, { threshold: 0.3 });
    io.observe(stage.current!);
    return () => io.disconnect();
  }, []);

  const initials = (n: string) => n.split(/\s+/).map((p) => p[0]).slice(0, 2).join("").toUpperCase();
  return (
    <div className="quotes" onMouseEnter={() => (paused.current = true)} onMouseLeave={() => { paused.current = false; }}>
      <div>
        <p className="kicker">Guest words</p>
        <Quote className="bigquote" />
        <div className="quotes__nav">
          <button className="round" onClick={() => go(-1)} aria-label="Previous review"><ArrowL /></button>
          <span className="quotes__count">{String(i + 1).padStart(2, "0")} / {String(REVIEWS.length).padStart(2, "0")}</span>
          <button className="round" onClick={() => go(1)} aria-label="Next review"><Arrow /></button>
        </div>
        <div className="quotes__bar"><i ref={bar} /></div>
      </div>
      <div ref={stage} className="quotes__stage" aria-live="polite">
        {REVIEWS.map((r, k) => (
          <blockquote key={r.name} className="quote" aria-hidden={k !== i}>
            <p>&ldquo;{r.quote}&rdquo;</p>
            <footer>
              <span className="mono-badge" aria-hidden="true">{initials(r.name)}</span>
              <cite>{r.name}<small>{[r.hotel, r.meta].filter(Boolean).join(" · ") || "Guest review"}</small></cite>
            </footer>
          </blockquote>
        ))}
      </div>
    </div>
  );
}
