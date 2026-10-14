"use client";
import { useEffect, useRef } from "react";

/** A gold thread across the top of the page that follows the reader down. */
export default function Progress() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let raf = 0;
    const on = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - innerHeight;
        if (ref.current) ref.current.style.transform = `scaleX(${max > 0 ? scrollY / max : 0})`;
      });
    };
    addEventListener("scroll", on, { passive: true });
    addEventListener("resize", on);
    return () => { removeEventListener("scroll", on); removeEventListener("resize", on); };
  }, []);
  return <div ref={ref} className="progress" aria-hidden="true" />;
}
