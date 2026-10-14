"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { Arrow, ArrowL } from "@/components/brand/Icons";
import { getLenis } from "@/components/chrome/SmoothScroll";
import { img } from "@/lib/img";

/* A strip of photographs you can drag through, opening into a lightbox. */
export default function Gallery({ images, name }: { images: string[]; name: string }) {
  const strip = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<number | null>(null);
  const moved = useRef(false);

  useEffect(() => {
    const el = strip.current!;
    let down = false, x0 = 0, s0 = 0, v = 0, lastX = 0, raf = 0;
    const pd = (e: PointerEvent) => { if (e.pointerType !== "mouse") return; down = true; moved.current = false; x0 = lastX = e.clientX; s0 = el.scrollLeft; cancelAnimationFrame(raf); };
    const pm = (e: PointerEvent) => {
      if (!down) return;
      const dx = e.clientX - x0;
      if (Math.abs(dx) > 4) { moved.current = true; el.classList.add("is-dragging"); }
      v = e.clientX - lastX; lastX = e.clientX;
      el.scrollLeft = s0 - dx;
    };
    const pu = () => {
      if (!down) return;
      down = false; el.classList.remove("is-dragging");
      const glide = () => { v *= 0.94; el.scrollLeft -= v; if (Math.abs(v) > 0.4) raf = requestAnimationFrame(glide); };
      glide();
    };
    el.addEventListener("pointerdown", pd);
    addEventListener("pointermove", pm);
    addEventListener("pointerup", pu);
    return () => { el.removeEventListener("pointerdown", pd); removeEventListener("pointermove", pm); removeEventListener("pointerup", pu); cancelAnimationFrame(raf); };
  }, []);

  const step = useCallback((d: number) => setOpen((o) => (o === null ? o : (o + d + images.length) % images.length)), [images.length]);
  useEffect(() => {
    if (open === null) return;
    getLenis()?.stop();
    const key = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(null); if (e.key === "ArrowRight") step(1); if (e.key === "ArrowLeft") step(-1); };
    addEventListener("keydown", key);
    return () => { removeEventListener("keydown", key); getLenis()?.start(); };
  }, [open, step]);

  return (
    <>
      <div ref={strip} className="drag" data-reveal>
        <div className="gallery">
          {images.map((src, i) => (
            <button key={src} className="gallery__item" data-cursor="view" onClick={() => !moved.current && setOpen(i)} aria-label={`Open photo ${i + 1} of ${name}`}>
              <img src={img(src)} alt="" loading="lazy" draggable={false} />
            </button>
          ))}
        </div>
      </div>
      <div className={`lightbox${open !== null ? " is-open" : ""}`} role="dialog" aria-modal="true" aria-label={`${name} gallery`} onClick={(e) => e.target === e.currentTarget && setOpen(null)}>
        {open !== null && <img key={open} src={img(images[open])} alt={`${name}, photo ${open + 1}`} />}
        <button className="round lightbox__prev" onClick={() => step(-1)} aria-label="Previous photo"><ArrowL /></button>
        <button className="round lightbox__next" onClick={() => step(1)} aria-label="Next photo"><Arrow /></button>
        <button className="lightbox__close" onClick={() => setOpen(null)}>Close ✕</button>
        {open !== null && <p className="lightbox__count">{open + 1} / {images.length}</p>}
      </div>
    </>
  );
}
