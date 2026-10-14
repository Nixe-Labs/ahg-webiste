"use client";
/* A muted, looping film that behaves: it plays only while it is on screen, phones get a lighter
   cut, browsers that speak AV1 get a sharper one, and visitors who ask for reduced motion simply
   see the poster frame. */
import { useEffect, useRef } from "react";
import { img } from "@/lib/img";
import { largest } from "./Img";

type Props = { name: string; poster: string; label: string; className?: string; /** "none" for films below the fold: they load when first scrolled near */ preload?: "auto" | "none" };

export default function AmbientVideo({ name, poster, label, className, preload = "auto" }: Props) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current!;
    v.muted = true; // React does not render the attribute on the server; autoplay needs it set
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) { v.pause(); v.removeAttribute("autoplay"); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) v.play().catch(() => {}); else v.pause(); }, { rootMargin: "300px 0px", threshold: 0 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  return (
    <video ref={ref} className={className} poster={largest(poster, 2400)} aria-label={label} muted loop playsInline autoPlay={preload === "auto"} preload={preload} disablePictureInPicture>
      <source src={img(`/video/${name}-720.mp4`)} type="video/mp4" media="(max-width: 899px)" />
      <source src={img(`/video/${name}-1440.mp4`)} type='video/mp4; codecs="av01.0.12M.08"' />
      <source src={img(`/video/${name}-1080.mp4`)} type="video/mp4" />
    </video>
  );
}
