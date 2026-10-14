"use client";
/* The three houses, one after another: the page pins and the hotels slide past like
   doors along a corridor, each in its own colours. Stacks vertically on small screens. */
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOTELS, bookHref, inr } from "@/lib/hotels";
import { BOOKING_URL } from "@/lib/site";
import { Arrow } from "@/components/brand/Icons";
import Split from "@/components/fx/Split";
import Img from "@/components/fx/Img";

gsap.registerPlugin(ScrollTrigger);

export default function HotelsRail() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = root.current!, track = el.querySelector<HTMLElement>(".rail__track")!;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => track.scrollWidth - innerWidth;
      const tween = gsap.to(track, { x: () => -dist(), ease: "none", scrollTrigger: { trigger: el, start: "top top", end: () => "+=" + dist(), pin: true, scrub: 0.8, invalidateOnRefresh: true } });
      el.querySelectorAll<HTMLElement>(".rail__img img").forEach((im) => {
        gsap.fromTo(im, { xPercent: -8, scale: 1.18 }, { xPercent: 8, scale: 1.18, ease: "none", scrollTrigger: { trigger: im.closest(".rail__panel"), containerAnimation: tween, start: "left right", end: "right left", scrub: true } });
      });
      el.querySelectorAll<HTMLElement>(".rail__copy").forEach((c) => {
        gsap.fromTo(c.children, { x: 80, opacity: 0 }, { x: 0, opacity: 1, stagger: 0.06, ease: "power2.out", scrollTrigger: { trigger: c, containerAnimation: tween, start: "left 85%", end: "left 45%", scrub: true } });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} className="rail" aria-labelledby="rail-title">
      <div className="rail__track">
        <div className="rail__intro">
          <p className="kicker">Our hotels</p>
          <Split id="rail-title" className="display display--md" text="Three houses, *one welcome.*" />
          <p className="lede" data-reveal style={{ marginTop: 26 }}>A collection of exceptional stays, blending tradition with contemporary comfort, each thoughtfully designed to offer a unique experience in the heart of Thanjavur.</p>
          <p className="muted" data-reveal style={{ marginTop: 34, fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase" }}>Keep scrolling →</p>
        </div>
        {HOTELS.map((h, i) => (
          <article key={h.slug} className={`rail__panel t-${h.theme}`}>
            <span className="rail__num">0{i + 1} / 03</span>
            <Link href={`/${h.slug}/`} className="arch rail__img" data-cursor="view" aria-label={`Discover ${h.name}`}>
              <span className="kb"><Img src={h.card} alt={`${h.name}, Thanjavur`} sizes="(min-width: 900px) 42vw, 100vw" /></span>
            </Link>
            <div className="rail__copy">
              <p className="kicker">{h.tier} · Since {h.since}</p>
              <h3>{h.name}</h3>
              <p>{h.tagline} {h.kicker}.</p>
              <div className="rail__price">
                <span>Rooms from</span><b>{inr(Math.min(...h.rooms.map((r) => r.price)))}</b><span>+ GST / night</span>
              </div>
              <div className="rail__actions on-dark">
                <Link href={`/${h.slug}/`} className="btn">Discover <Arrow /></Link>
                <a href={bookHref(h)} target={BOOKING_URL || bookHref(h).startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="btn btn--gold">Book</a>
              </div>
            </div>
          </article>
        ))}
        <div className="rail__end" aria-hidden="true" />
      </div>
    </section>
  );
}
