"use client";
/* Between pages, a granite curtain bearing the fan sweeps up, the route changes beneath it,
   and it lifts away. Intercepts plain left-clicks on internal links only. */
import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";
import FanMark from "@/components/brand/FanMark";
import { BASE } from "@/lib/base";

export default function Curtain() {
  const router = useRouter();
  const pathname = usePathname();
  const ref = useRef<HTMLDivElement>(null);
  const pending = useRef(false);

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const click = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element).closest?.("a");
      if (!a || a.target === "_blank" || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin || url.pathname === location.pathname || /\.\w+$/.test(url.pathname)) return;
      e.preventDefault();
      e.stopPropagation();
      if (pending.current) return;
      pending.current = true;
      const path = url.pathname.startsWith(BASE) ? url.pathname.slice(BASE.length) || "/" : url.pathname;
      gsap.timeline()
        .set(ref.current, { yPercent: 100, visibility: "visible" })
        .to(ref.current, { yPercent: 0, duration: 0.75, ease: "expo.inOut" })
        .fromTo(ref.current!.querySelector("svg"), { scale: 0.6, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: "expo.out" }, 0.35)
        .add(() => router.push(path + url.search + url.hash));
    };
    document.addEventListener("click", click, true);
    return () => document.removeEventListener("click", click, true);
  }, [router]);

  useEffect(() => {
    if (!pending.current) return;
    pending.current = false;
    gsap.timeline({ delay: 0.15 })
      .to(ref.current!.querySelector("svg"), { y: -30, opacity: 0, duration: 0.4, ease: "power2.in" })
      .to(ref.current, { yPercent: -100, duration: 0.95, ease: "expo.inOut" }, 0.1)
      .set(ref.current, { visibility: "hidden" });
  }, [pathname]);

  return (
    <div ref={ref} className="curtain night" aria-hidden="true" style={{ visibility: "hidden" }}>
      <FanMark color="var(--color-gold-hi)" />
    </div>
  );
}
