"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

/* A gold pearl and its halo. The halo swells over links and becomes a "View" coin over
   anything marked data-cursor="view". */
export default function Cursor() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const el = root.current!, dot = el.querySelector(".cursor__dot")!, ring = el.querySelector(".cursor__ring")!;
    const dx = gsap.quickTo(dot, "x", { duration: 0.12 }), dy = gsap.quickTo(dot, "y", { duration: 0.12 });
    const rx = gsap.quickTo(ring, "x", { duration: 0.5, ease: "power3" }), ry = gsap.quickTo(ring, "y", { duration: 0.5, ease: "power3" });
    gsap.set(el, { opacity: 0 });
    const move = (e: PointerEvent) => {
      gsap.to(el, { opacity: 1, duration: 0.3, overwrite: "auto" });
      dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY);
      const t = e.target as Element;
      el.classList.toggle("is-view", !!t.closest?.('[data-cursor="view"]'));
      el.classList.toggle("is-link", !!t.closest?.("a, button, select, label, [role=button]"));
    };
    const leave = () => gsap.to(el, { opacity: 0, duration: 0.3 });
    addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    return () => { removeEventListener("pointermove", move); document.removeEventListener("pointerleave", leave); };
  }, []);
  return (
    <div ref={root} className="cursor" aria-hidden="true">
      <div className="cursor__ring"><span>View</span></div>
      <div className="cursor__dot" />
    </div>
  );
}
