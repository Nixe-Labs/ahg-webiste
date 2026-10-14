"use client";
/* The first view: a mandapa arch holds a slow film of the Big Temple, seen between the pillars of
   its cloister. Scroll, and the arch itself opens out to fill the screen: "a thousand years of
   welcome". */
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Split from "@/components/fx/Split";
import { Arrow } from "@/components/brand/Icons";
import AmbientVideo from "@/components/fx/AmbientVideo";
import MotionToggle from "@/components/fx/MotionToggle";
import { whenRevealed } from "@/lib/reveal";

/** The arch window, aligned to the same content edges as the nav (.wrap: 1440px max, gutter). */
function archRect() {
  const vw = document.documentElement.clientWidth, vh = innerHeight;
  const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 84;
  const gutter = Math.min(80, Math.max(16, vw * 0.046));
  const right = vw - ((vw - Math.min(vw, 1440)) / 2 + gutter);
  const w = Math.min(vw * 0.44, 640);
  return { t: nav + vh * 0.03, r: vw - right, w };
}

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const media = el.querySelector<HTMLElement>(".hero__media")!;
    const pic = media.querySelector("video")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      // the film is portrait, so the arch box itself grows (rather than a mask over a full-screen
      // film), letting object-fit re-crop smoothly from the whole frame to a band round the vimana
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: el.querySelector(".hero__pin"), scrub: 1, invalidateOnRefresh: true } })
        .fromTo(media,
          { top: () => archRect().t, right: () => archRect().r, width: () => archRect().w, borderRadius: () => `${archRect().w / 2}px ${archRect().w / 2}px 0px 0px` },
          { top: 0, right: 0, width: () => document.documentElement.clientWidth, borderRadius: "0px 0px 0px 0px", ease: "power2.inOut", duration: 1 }, 0)
        .fromTo(pic, { scale: 1.06, objectPosition: "45% 50%" }, { scale: 1, objectPosition: "45% 28%", ease: "power2.inOut", duration: 1 }, 0)
        .to(el.querySelector(".hero__copy"), { y: -140, opacity: 0, ease: "power1.in", duration: 0.5 }, 0)
        .to(el.querySelector(".hero__scroll"), { opacity: 0, duration: 0.2 }, 0)
        .to(media, { "--shade": 1, duration: 0.6 }, 0.3)
        .fromTo(el.querySelector(".hero__overlay"), { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 0.45 }, 0.62)
        .to(el.querySelector(".hero__caption"), { opacity: 1, duration: 0.3 }, 0.72)
        .to({}, { duration: 0.25 });
    });

    const stop = whenRevealed(() => {
      if (reduced) return;
      gsap.fromTo(el.querySelector(".hero__reveal"), { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 2, ease: "expo.inOut" });
      gsap.fromTo(el.querySelector(".hero__reveal"), { scale: 1.25 }, { scale: 1, duration: 3, ease: "expo.out", delay: 0.2 });
      gsap.fromTo(el.querySelectorAll("[data-hero-fade]"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 1.4, ease: "expo.out", stagger: 0.1, delay: 0.7 });
    });
    return () => { stop(); mm.revert(); };
  }, []);

  return (
    <section ref={root} className="hero">
      <div className="hero__pin">
        <div className="hero__media">
          <div className="hero__reveal">
            <AmbientVideo name="hero-temple" poster="/img/home/hero-poster.jpg" label="The Brihadeeswarar Temple, Thanjavur" />
          </div>
          <MotionToggle className="film-toggle film-toggle--hero" />
        </div>

        <div className="hero__copy">
          <div className="wrap">
            <p className="kicker" data-hero-fade>Thanjavur · Since 2012</p>
            <Split as="h1" load className="display hero__title" text="Where every | guest is | *family.*" lineClass={(i) => (i === 1 ? "r r--in" : "r")} />
            <div className="hero__aside">
              <p className="tamil" data-hero-fade>விருந்தோம்பல்</p>
              <p className="lede" data-hero-fade>Three distinct hotels in the Chola capital, united by <em>Virunthombal</em>, the Tamil art of treating every guest as an honoured relative.</p>
              <div className="hero__cta" data-hero-fade>
                <Link href="/hotels/" className="btn">Our hotels <Arrow /></Link>
                <Link href="/book-now/" className="btn btn--gold">Book a stay</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="hero__overlay">
          <p className="kicker" style={{ color: "var(--color-gold-hi)" }}>The Chola capital</p>
          <p className="display">A thousand years <em>of welcome</em></p>
        </div>
        <p className="hero__caption">Brihadeeswarar Temple · UNESCO World Heritage Site</p>
        <div className="hero__scroll" data-hero-fade><i />Scroll</div>
      </div>
    </section>
  );
}
