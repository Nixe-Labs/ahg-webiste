"use client";
/* The kolam keeps being drawn, the way it is renewed at the threshold every dawn: dots settle,
   the line winds round them, rests, then travels on and away before the next drawing begins.
   Runs only while on screen and while motion is on; a still, finished kolam for reduced motion.
   strokeDashoffset tweens need autoRound:false: GSAP otherwise rounds px values, and with
   pathLength=1 a line could only ever be fully hidden or fully drawn. */
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Kolam from "@/components/brand/Kolam";
import { motionPaused, onMotionChange } from "@/lib/motion";

export default function LivingKolam({ className, strokeWidth = 0.45 }: { className?: string; strokeWidth?: number }) {
  const ref = useRef<SVGSVGElement>(null);
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const svg = ref.current!;
    const lines = svg.querySelectorAll(".kolam-line"), dots = svg.querySelectorAll(".kolam-dot");
    gsap.set(lines, { strokeDasharray: "1 1.02", strokeDashoffset: 1.01, autoRound: false });
    gsap.set(dots, { opacity: 0, scale: 0, transformOrigin: "50% 50%" });
    const tl = gsap.timeline({ repeat: -1, repeatDelay: 1.2, paused: true })
      .to(dots, { opacity: 1, scale: 1, duration: 0.6, ease: "back.out(2.5)", stagger: { each: 0.05, from: "center" } })
      .to(lines, { strokeDashoffset: 0, duration: 7, ease: "sine.inOut", stagger: 0.9, autoRound: false }, 0.4)
      .to(lines, { strokeDashoffset: -1.01, duration: 5, ease: "sine.inOut", stagger: 0.6, autoRound: false }, "+=3.5")
      .to(dots, { opacity: 0, scale: 0, duration: 0.8, stagger: { each: 0.03, from: "edges" } }, "-=1.6");
    let visible = false;
    const sync = () => (visible && !motionPaused() ? tl.play() : tl.pause());
    const io = new IntersectionObserver((entries) => { visible = entries[entries.length - 1].isIntersecting; sync(); });
    io.observe(svg);
    const off = onMotionChange(sync);
    return () => { io.disconnect(); off(); tl.kill(); };
  }, []);
  return <Kolam ref={ref} className={className} strokeWidth={strokeWidth} />;
}
