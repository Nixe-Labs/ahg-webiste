"use client";
/* A muted, looping film that behaves: nothing autoplays from the static HTML, it plays only while
   on (or near) the screen and while motion is on, phones get a lighter cut, browsers that speak
   AV1 get a sharper one, and visitors who ask for reduced motion only ever see the still poster. */
import { useEffect, useRef } from "react";
import { img } from "@/lib/img";
import { motionPaused, useMotionPaused } from "@/lib/motion";
import { largest } from "./Img";

type Props = {
  name: string;
  label: string;
  /** poster shown from first paint (films above the fold) */
  poster?: string;
  /** posters chosen per screen and fetched only when the film comes near (films below the fold):
      `wide` matches the cropped desktop cut, `tall` the full-frame phone cut */
  posters?: { wide: string; tall: string };
  className?: string;
};

const PHONE = "(max-width: 899px)";

export default function AmbientVideo({ name, label, poster, posters, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const near = useRef(false);
  const paused = useMotionPaused();

  useEffect(() => {
    const v = ref.current!;
    v.muted = true;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver((entries) => {
      const e = entries[entries.length - 1];
      near.current = e.isIntersecting;
      if (!e.isIntersecting) { v.pause(); return; }
      if (posters && !v.getAttribute("poster")) v.poster = matchMedia(PHONE).matches ? largest(posters.tall, 1024) : largest(posters.wide, 2400);
      if (!reduced && !motionPaused()) { v.preload = "auto"; v.play().catch(() => {}); }
    }, { rootMargin: "300px 0px" });
    io.observe(v);
    return () => io.disconnect();
  }, [posters]);

  // the site-wide motion switch
  useEffect(() => {
    const v = ref.current!;
    if (paused) v.pause();
    else if (near.current && !matchMedia("(prefers-reduced-motion: reduce)").matches) v.play().catch(() => {});
  }, [paused]);

  return (
    <video ref={ref} className={className} poster={poster ? largest(poster, 1600) : undefined} aria-label={label} muted loop playsInline preload={poster ? "metadata" : "none"} disablePictureInPicture>
      <source src={img(`/video/${name}-720.mp4`)} type="video/mp4" media={PHONE} />
      <source src={img(`/video/${name}-1440.mp4`)} type='video/mp4; codecs="av01.0.12M.08"' />
      <source src={img(`/video/${name}-1080.mp4`)} type="video/mp4" />
    </video>
  );
}
