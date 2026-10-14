import type { Metadata, Viewport } from "next";
import "./globals.css";
import { serif, sans, tamil } from "@/lib/fonts";
import SmoothScroll from "@/components/chrome/SmoothScroll";
import Effects from "@/components/chrome/Effects";
import Nav from "@/components/chrome/Nav";
import Progress from "@/components/chrome/Progress";
import Cursor from "@/components/chrome/Cursor";
import Curtain from "@/components/chrome/Curtain";
import { BASE } from "@/lib/base";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  // A redesign concept: kept out of search so it never competes with the live abishotels.com
  robots: { index: false, follow: false },
  title: { default: "Abi's Hotel Group, Thanjavur | Three hotels, one welcome", template: "%s · Abi's Hotel Group, Thanjavur" },
  description: "Abi's Inn, Abi's Residency and The Emerald: three distinct hotels in Thanjavur, minutes from the Brihadeeswarar Temple, united by the Tamil art of Virunthombal.",
  openGraph: { title: "Abi's Hotel Group, Thanjavur", description: "Three distinct hotels in the Chola capital, united by Virunthombal.", images: [{ url: `${BASE}/img/home/big-temple-aerial.jpg`, width: 1600, height: 900 }] },
  icons: { icon: `${BASE}/img/brand/favicon.png` },
};
export const viewport: Viewport = { themeColor: "#f6f0e5", viewportFit: "cover" };

/* Runs before first paint: motion on → hidden pre-reveal states apply; repeat visit, deep link
   or reduced motion → the home intro never shows. */
const BOOT = `(function(){var d=document.documentElement;try{var r=matchMedia('(prefers-reduced-motion: reduce)').matches;if(!r)d.classList.add('js');if(r||location.hash||sessionStorage.getItem('ahg-seen'))d.classList.add('no-intro')}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable} ${tamil.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: BOOT }} />
      </head>
      <body>
        <SmoothScroll />
        <Effects />
        <Progress />
        <Nav />
        {children}
        <Curtain />
        <Cursor />
      </body>
    </html>
  );
}
