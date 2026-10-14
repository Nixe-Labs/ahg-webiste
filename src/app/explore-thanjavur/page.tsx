import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import RegionMap from "@/components/pages/RegionMap";
import Places from "@/components/pages/Places";
import { Arrow } from "@/components/brand/Icons";
import { placeSrc } from "@/lib/img";
import Img from "@/components/fx/Img";

export const metadata: Metadata = { title: "Explore Thanjavur", description: "The Big Temple, Darasuram, Kumbakonam, Velankanni, Nagore, Kallanai and more: twenty places to discover from your base at Abi's Hotel Group in Thanjavur." };

export default function Explore() {
  return (
    <>
      <main data-nav="dark">
        <section className="phero" style={{ minHeight: "100svh" }}>
          <div className="phero__img"><Img data-parallax="6" src="/img/explore/brihadeeswarar-wide.jpg" alt="The Brihadeeswarar Temple, Thanjavur" priority sizes="(max-aspect-ratio: 1/1) 120vh, 100vw" style={{ height: "112%", marginTop: "-6%" }} /></div>
          <div className="phero__copy">
            <div className="wrap">
              <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Explore Thanjavur</span></nav>
              <p className="kicker" style={{ color: "var(--color-gold-hi)" }}>The rice bowl of Tamil Nadu</p>
              <Split as="h1" load className="display" text="Explore | *Thanjavur*" />
              <p className="lede" data-reveal style={{ color: "rgba(246,240,229,.85)", marginTop: 22 }}>Capital of the Chola dynasty, a hub of Tanjore painting, classical dance and Carnatic music, and home to a UNESCO World Heritage temple. Each of our hotels is a gateway to it all.</p>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap grid-2">
            <div className="arch" data-zoom style={{ aspectRatio: "4/5" }}><Img src="/img/explore/brihadeeswarar-portrait.jpg" alt="The vimana of the Brihadeeswarar Temple, Thanjavur" sizes="(min-width: 900px) 45vw, 100vw" /></div>
            <div>
              <p className="kicker">Begin at the Big Temple</p>
              <Split className="display display--sm" text="Brihadeeswarar *Temple*" />
              <p className="lede" data-reveal style={{ marginTop: 24 }}>A UNESCO World Heritage Site, this magnificent Chola-era temple dedicated to Lord Shiva is renowned for its grand architecture and towering vimana. Abi&rsquo;s Residency sits a short walk away.</p>
              <p className="lede" data-reveal style={{ marginTop: 16 }}>Beyond it, the city keeps the Maratha Palace, the Saraswathi Mahal Library and its museums, while the delta around it is dotted with temples, shrines, forts and wetlands.</p>
              <div data-reveal style={{ marginTop: 30 }}><Link href="/abis-residency/" className="link">Stay at Abi&rsquo;s Residency <Arrow /></Link></div>
            </div>
          </div>
        </section>

        <section className="section night" style={{ overflow: "hidden" }}>
          <div className="wrap">
            <div className="grid-2" style={{ alignItems: "end", marginBottom: 40 }}>
              <div><p className="kicker">Day trips from Thanjavur</p><Split className="display display--md" text="The delta, *at your door*" /></div>
              <p className="lede" data-reveal>From the Chola dam at Kallanai to the shrines of the coast, the Kaveri delta is full of journeys. Hover a pin to see where it leads.</p>
            </div>
            <RegionMap />
          </div>
        </section>

        <section className="section">
          <div className="wrap">
            <div className="grid-2" style={{ alignItems: "end", marginBottom: 40 }}>
              <div><p className="kicker">Twenty places to see</p><Split className="display display--md" text="Temples, palaces | *& quiet waters*" /></div>
              <p className="lede" data-reveal>Sacred sites of every faith, royal heritage, and gentle escapes into nature, all within reach of our three hotels.</p>
            </div>
            <Places />
          </div>
        </section>

        <section className="frame" style={{ height: "70svh", minHeight: 420 }}>
          <Img data-parallax="10" src={placeSrc("kallanai-dam")} alt="Kallanai, the ancient Chola dam on the Kaveri" style={{ width: "100%", height: "125%", marginTop: "-12%", objectFit: "cover" }} />
        </section>
      </main>
      <Footer />
    </>
  );
}
