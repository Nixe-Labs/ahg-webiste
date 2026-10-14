# Abi's Hotel Group: "Kolam & Gold Leaf" redesign concept

An unofficial redesign concept for [Abi's Hotel Group](https://abishotels.com), Thanjavur, by Nixe Labs: not affiliated with
or operated by Abi's Hotel Group. Built from the live site's own content; hotel photography and content © Abi's Hotel Group.

**Live preview:** https://nixe-labs.github.io/ahg-webiste/

- Home, Hotels, a page for each hotel (Abi's Inn, Abi's Residency, The Emerald), Our History, Explore Thanjavur, About, Careers, Contact and Book Now
- A kolam-drawing intro, temple-arch hero, pinned hotel rail, palm-leaf history timeline and an illustrated delta map

Built with Next.js 16 (static export), React 19, Tailwind 4, GSAP + ScrollTrigger and Lenis.

## Run locally

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static site in ./out
NEXT_PUBLIC_BASE_PATH=/ahg-webiste NEXT_PUBLIC_SITE_URL=https://nixe-labs.github.io npm run build   # as GitHub Pages builds it
```

Pushing to `main` deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Images and film

- **Photos** are served as responsive WebP (640–3840 px) chosen per screen by `srcset`, through `src/components/fx/Img.tsx`.
  Rebuild them from full-resolution originals laid out as `<group>/<name>.jpg|png` with
  `python3 scripts/images.py <originals-dir>` (needs Pillow). It writes `public/img/**` and `src/data/images.json`.
- **Hotel photography** is the hotels' own, upscaled 4× with [Real-ESRGAN](https://github.com/xinntao/Real-ESRGAN) for high-resolution screens.
  **Thanjavur and the delta** use genuine UHD photography from Wikimedia Commons, Pexels and Unsplash; every credit is on `/credits/` (`src/data/credits.json`).
- **Films** (home hero and the paddy-field section) are seamless loops made with
  `FFMPEG=… scripts/video.sh <clip> <name> <start> <length> [xfade|pingpong] [slow]`: AV1 1440p, H.264 1080p, and a 720p cut for phones.
  They play only while on screen and fall back to a poster frame for visitors who prefer reduced motion.

## Where things live

| | |
|---|---|
| `src/lib/site.ts` | Group contacts, nav, and **`BOOKING_URL`** |
| `src/lib/hotels.ts` | The three hotels: copy, tariffs, amenities, galleries, contacts |
| `src/lib/content.ts` | Explore places, history milestones, reviews, departments |
| `src/components/chrome/Effects.tsx` | All scroll motion, driven by `data-*` attributes on server-rendered pages |
| `src/components/home/Intro.tsx` | The kolam → fan → temple-doors intro (home page, first visit per session) |

## Before going live

- **Booking engine:** set `BOOKING_URL` in `src/lib/site.ts`. Until then every Book button opens that hotel's WhatsApp.
- **Forms:** Contact and Careers open a pre-filled email (no backend in a static site). Wire them to a form service if needed.
- **Confirm with the client:** these values disagree on the live site, so they are marked `CHECK` in the code:
  - The Emerald PIN code is printed as "6130077" (used 613007).
  - Abi's Inn lists `reservations@abishotelgroup.com` (a different domain from abishotels.com; not used).
  - History says "JBlossom Hall" (kept as written).
- **Photography:** the source images top out at 1600–1920 px (The Emerald set at 800 px). Higher-resolution originals would lift the whole site.
- `robots` is set to `noindex` while this is a concept; remove it in `src/app/layout.tsx` for production.
