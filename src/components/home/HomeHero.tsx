"use client";
/* The first view: a mandapa arch frames the Big Temple from the air. Scroll, and the arch
   widens until the whole city is in view: "a thousand years of welcome". */
import { useEffect, useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Split from "@/components/fx/Split";
import { Arrow } from "@/components/brand/Icons";
import { whenRevealed } from "@/lib/reveal";
import { img } from "@/lib/img";

gsap.registerPlugin(ScrollTrigger);

export default function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current!;
    const media = el.querySelector<HTMLElement>(".hero__media")!;
    const pic = media.querySelector("img")!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const arch = () => {
        const vw = innerWidth, vh = innerHeight;
        const nav = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--nav-h")) || 84;
        const w = Math.min(vw * 0.44, 620), l = vw * 0.52, t = nav + vh * 0.03, r = vw - l - w;
        return `inset(${t}px ${r}px 0px ${l}px round ${w / 2}px ${w / 2}px 0px 0px)`;
      };
      gsap.timeline({ scrollTrigger: { trigger: el, start: "top top", end: "+=140%", pin: el.querySelector(".hero__pin"), scrub: 1, invalidateOnRefresh: true } })
        .fromTo(media, { clipPath: arch }, { clipPath: "inset(0px 0px 0px 0px round 0px 0px 0px 0px)", ease: "power2.inOut", duration: 1 }, 0)
        // the tower sits left of centre in the photograph: pan it into the arch, then let it drift home
        .fromTo(pic, { scale: 1.14, xPercent: 42 }, { scale: 1, xPercent: 0, ease: "power2.inOut", duration: 1 }, 0)
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
            <img src={img("/img/home/big-temple-aerial.jpg")} alt="The Brihadeeswarar Temple and its courtyard, seen from the air" fetchPriority="high" />
          </div>
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
