"use client";
/* The welcome. Pulli dots are laid on dark granite, a kolam is drawn around them in gold,
   the AHG fan unfolds blade by blade, and the temple doors open onto the page.
   Rendered on the server so it covers the page from the first paint; a head script adds
   .no-intro for repeat visits in the same session, deep links and reduced motion. */
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Kolam from "@/components/brand/Kolam";
import FanMark, { FAN_ANGLES, FAN_CENTER } from "@/components/brand/FanMark";
import { getLenis } from "@/components/chrome/SmoothScroll";
import { LANDING, markRevealed } from "@/lib/reveal";

export default function Intro() {
  const root = useRef<HTMLDivElement>(null);
  // arriving here by client navigation: no intro (the route curtain already did the honours)
  const [gone, setGone] = useState(() => typeof window !== "undefined" && location.pathname !== LANDING);

  useEffect(() => {
    const el = root.current;
    if (!el || getComputedStyle(el).display === "none") { markRevealed(); setGone(true); return; }
    const host = el;
    document.body.classList.add("is-loading");
    getLenis()?.stop();
    const q = <T extends Element = Element>(s: string) => [...el.querySelectorAll<T>(s)];
    const blades = q<SVGPathElement>(".fan-blade");
    let opened = false;

    const tl = gsap.timeline({ delay: 0.25 });
    tl.fromTo(q(".kolam-dot"), { scale: 0, transformOrigin: "50% 50%", opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(3)", stagger: { each: 0.025, from: "center" } })
      .fromTo(q(".kolam-line"), { strokeDasharray: "1 1.02", strokeDashoffset: 1.01 }, { strokeDashoffset: 0, duration: 2.1, ease: "power2.inOut", stagger: 0.28 }, 0.25)
      .to(q(".intro__kolam"), { rotation: 22, scale: 1.18, opacity: 0.16, duration: 1.6, ease: "power3.inOut" }, 2.15)
      .fromTo(blades, { rotation: 0, svgOrigin: `${FAN_CENTER.x} ${FAN_CENTER.y}`, opacity: 0 }, { rotation: (i) => FAN_ANGLES[i], opacity: 1, duration: 1.15, ease: "expo.out", stagger: { each: 0.03, from: "center" } }, 2.3)
      .fromTo(q(".fan-pearl"), { scale: 0, transformOrigin: "50% 50%" }, { scale: 1, duration: 0.6, ease: "back.out(3)" }, 2.75)
      .fromTo(q(".intro__word .sw > span"), { yPercent: 115 }, { yPercent: 0, duration: 1, ease: "expo.out", stagger: 0.05 }, 2.75)
      .fromTo(q(".intro__sub, .intro__tamil"), { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.12 }, 3.05)
      .add(() => open(), 4.1);

    // never hold a visitor hostage: background tabs, slow devices, anything
    const failsafe = setTimeout(() => open(), 7000);

    function open() {
      if (opened) return;
      opened = true;
      clearTimeout(failsafe);
      tl.progress(1).kill();
      try { sessionStorage.setItem("ahg-seen", "1"); } catch {}
      host.classList.add("is-opening");
      gsap.timeline({ onComplete: () => setGone(true) })
        .to(q(".intro__stage, .intro__skip"), { opacity: 0, y: -24, duration: 0.55, ease: "power2.in" })
        .to(q(".intro__door--l"), { xPercent: -101, duration: 1.4, ease: "expo.inOut" }, 0.35)
        .to(q(".intro__door--r"), { xPercent: 101, duration: 1.4, ease: "expo.inOut" }, 0.35)
        .add(() => { document.body.classList.remove("is-loading"); getLenis()?.start(); markRevealed(); }, 0.75);
    }
    (el as HTMLDivElement & { skip?: () => void }).skip = open;
    return () => { tl.kill(); clearTimeout(failsafe); document.body.classList.remove("is-loading"); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} className="intro" role="presentation">
      <div className="intro__door intro__door--l night" />
      <div className="intro__door intro__door--r night" />
      <div className="intro__stage" aria-hidden="true">
        <Kolam className="intro__kolam" strokeWidth={0.55} />
        <div className="intro__mark">
          <FanMark color="var(--color-teal)" pearl="var(--color-gold-hi)" />
          <div className="intro__word" style={{ color: "var(--color-ivory)" }}>
            {"AHG".split("").map((c, i) => <span key={i} className="sw"><span>{c}</span></span>)}
          </div>
          <div className="intro__sub">Abi&rsquo;s Hotel Group · Thanjavur</div>
          <div className="intro__tamil">விருந்தோம்பல்</div>
        </div>
      </div>
      <button className="intro__skip" onClick={() => (root.current as HTMLDivElement & { skip?: () => void })?.skip?.()}>Skip intro</button>
    </div>
  );
}
