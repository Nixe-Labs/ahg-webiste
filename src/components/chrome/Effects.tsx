"use client";
/* One place for the site's scroll choreography. Pages stay server-rendered and opt in with
   data attributes:
     data-split        words rise from their masks (data-split="load": as soon as the page is revealed)
     data-reveal       block fades up
     data-stagger      children fade up in sequence
     data-zoom         an image unveils from the bottom while settling from a slight zoom
     data-parallax="n" the element drifts n% against the scroll
     data-draw         svg strokes (pathLength=1) draw themselves
     data-count="n"    the number counts up
     data-scrub-words  words of a paragraph light up as it is read
     data-grow="x|y"   a line grows with the scroll through its parent
     data-line         a hairline draws itself from the left, once, as it comes into view                                                  */
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markRevealed, whenRevealed } from "@/lib/reveal";

gsap.registerPlugin(ScrollTrigger);

export default function Effects() {
  const pathname = usePathname();
  useEffect(() => {
    const root = document.documentElement;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { markRevealed(); root.classList.add("fx-ready"); return; }
    if (!document.querySelector(".intro")) markRevealed();
    let ctx: gsap.Context | undefined;
    const stop = whenRevealed(() => {
      ctx = gsap.context(() => {
        const st = (el: Element, start = "top 86%") => ({ trigger: el, start, once: true });

        gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
          const words = el.querySelectorAll(".sw > span");
          const load = el.dataset.split === "load";
          gsap.fromTo(words, { yPercent: 115, y: 0 }, { yPercent: 0, duration: 1.4, ease: "expo.out", stagger: 0.055, delay: load ? 0.1 : 0, scrollTrigger: load ? undefined : st(el, "top 90%") });
        });
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
          gsap.fromTo(el, { y: 44, opacity: 0 }, { y: 0, opacity: 1, duration: 1.4, ease: "expo.out", delay: +(el.dataset.reveal || 0), scrollTrigger: st(el) });
        });
        gsap.utils.toArray<HTMLElement>("[data-stagger]").forEach((el) => {
          gsap.fromTo(el.children, { y: 48, opacity: 0 }, { y: 0, opacity: 1, duration: 1.3, ease: "expo.out", stagger: 0.09, scrollTrigger: st(el) });
        });
        gsap.utils.toArray<HTMLElement>("[data-zoom]").forEach((el) => {
          const img = el.querySelector("img");
          const tl = gsap.timeline({ scrollTrigger: st(el, "top 88%") });
          tl.fromTo(el, { clipPath: "inset(100% 0% 0% 0%)" }, { clipPath: "inset(0% 0% 0% 0%)", duration: 1.6, ease: "expo.inOut" });
          if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 2.2, ease: "expo.out" }, 0.1);
        });
        gsap.utils.toArray<HTMLElement>("[data-parallax]").forEach((el) => {
          const n = +(el.dataset.parallax || 10);
          gsap.fromTo(el, { yPercent: -n }, { yPercent: n, ease: "none", scrollTrigger: { trigger: el.parentElement!, start: "top bottom", end: "bottom top", scrub: true } });
        });
        gsap.utils.toArray<SVGElement>("[data-draw]").forEach((el) => {
          const paths = el.querySelectorAll("path, circle, line, polyline");
          // autoRound:false, or GSAP rounds the px offset and a pathLength=1 line pops instead of drawing
          gsap.fromTo(paths, { strokeDasharray: "1 1.02", strokeDashoffset: 1.01 }, { strokeDashoffset: 0, duration: 2.4, ease: "power2.inOut", stagger: 0.12, autoRound: false, scrollTrigger: st(el, "top 90%") });
        });
        gsap.utils.toArray<HTMLElement>("[data-scrub-words]").forEach((el) => {
          gsap.to(el.querySelectorAll(".w"), { opacity: 1, ease: "none", stagger: 0.1, scrollTrigger: { trigger: el, start: "top 78%", end: "bottom 42%", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-grow]").forEach((el) => {
          const y = el.dataset.grow === "y";
          gsap.fromTo(el, { [y ? "scaleY" : "scaleX"]: 0 }, { [y ? "scaleY" : "scaleX"]: 1, ease: "none", scrollTrigger: { trigger: el.parentElement!, start: y ? "top 70%" : "top 80%", end: y ? "bottom 60%" : "bottom 50%", scrub: true } });
        });
        gsap.utils.toArray<HTMLElement>("[data-line]").forEach((el, i) => {
          gsap.fromTo(el, { scaleX: 0 }, { scaleX: 1, duration: 1.8, ease: "expo.inOut", delay: (i % 4) * 0.12, scrollTrigger: st(el, "top 92%") });
        });
        gsap.utils.toArray<HTMLElement>("[data-count]").forEach((el) => {
          const to = +(el.dataset.count || 0), o = { v: 0 };
          gsap.to(o, { v: to, duration: 2.2, ease: "power3.out", scrollTrigger: st(el, "top 92%"), onUpdate: () => { el.textContent = Math.round(o.v).toLocaleString("en-IN"); } });
        });
      });
      root.classList.add("fx-ready");
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });
    return () => { stop(); ctx?.revert(); };
  }, [pathname]);
  return null;
}
