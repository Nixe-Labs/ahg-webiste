import type { ImgHTMLAttributes } from "react";
import MANIFEST from "@/data/images.json";
import { img } from "@/lib/img";

type Entry = { w: number; h: number; widths: number[]; blur: string };
const M = MANIFEST as Record<string, Entry>;
const key = (src: string) => src.replace(/\.(jpe?g|png|webp)$/i, "");

/** Every width an image comes in, for srcset. */
export function srcSet(src: string) {
  const m = M[key(src)];
  return m ? m.widths.map((w) => `${img(`${key(src)}-${w}.webp`)} ${w}w`).join(", ") : undefined;
}

/** The single best file for contexts without srcset (lightbox, video poster). */
export function largest(src: string, max = 3840) {
  const m = M[key(src)];
  if (!m) return img(src);
  const w = [...m.widths].reverse().find((x) => x <= max) ?? m.widths[0];
  return img(`${key(src)}-${w}.webp`);
}

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet"> & { src: string; priority?: boolean };

/* A responsive image: the browser picks the width it needs from srcset, and a 24px blurred
   preview fills the frame until the real pixels arrive. */
export default function Img({ src, sizes = "100vw", priority, style, loading, alt = "", ...rest }: Props) {
  const m = M[key(src)];
  if (!m) return <img src={img(src)} alt={alt} loading={priority ? "eager" : loading ?? "lazy"} style={style} {...rest} />;
  return (
    <img
      src={largest(src, 1600)}
      srcSet={srcSet(src)}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt}
      loading={priority ? "eager" : loading ?? "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding="async"
      style={{ backgroundImage: `url(${m.blur})`, backgroundSize: "cover", backgroundPosition: "center", ...style }}
      {...rest}
    />
  );
}
