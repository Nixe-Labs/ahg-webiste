# Abi's Hotel Group: "Kolam & Gold Leaf" redesign concept

A redesign of [abishotels.com](https://abishotels.com) built only from the live site's own content and photography.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export to ./out, host anywhere
NEXT_PUBLIC_BASE_PATH=/ahg npm run build   # when served from a sub-path
```

Stack: Next.js 16 (static export), Tailwind 4, GSAP + ScrollTrigger, Lenis.

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
