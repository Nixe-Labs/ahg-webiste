import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import Kolam from "@/components/brand/Kolam";
import { Arrow } from "@/components/brand/Icons";
import { HOTELS } from "@/lib/hotels";
import Img from "@/components/fx/Img";

export const metadata: Metadata = { title: "About Us", description: "Founded to redefine hospitality in Thanjavur, Abi's Hotel Group brings Abi's Inn, Abi's Residency and The Emerald together around one belief: make every guest feel at home, always." };

export default function About() {
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)", overflow: "hidden" }}>
          <Kolam className="kolam-float" strokeWidth={0.45} />
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)", position: "relative" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>About us</span></nav>
            <p className="kicker">About Abi&rsquo;s Hotel Group</p>
            <Split as="h1" load className="display" text="To make every guest | feel at home, *always.*" />
          </div>
        </section>

        <section className="frame" style={{ height: "80svh", minHeight: 480 }}>
          <Img data-parallax="10" src="/img/inn/atrium.jpg" alt="The hand-painted Tanjore-art column rising through the atrium of Abi's Inn" style={{ height: "125%", marginTop: "-12%", objectFit: "cover", width: "100%" }} />
        </section>

        <section className="section">
          <div className="wrap grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="kicker">Our story</p>
              <Split className="display display--sm" text="A simple belief, *three houses*" />
            </div>
            <div data-reveal>
              <p className="lede" style={{ fontFamily: "var(--font-serif)", fontSize: 24, color: "var(--color-ink)", lineHeight: 1.45 }}>Founded with a vision to redefine hospitality in Thanjavur, Abi&rsquo;s Hotel Group has grown to become a symbol of exceptional service. Our journey began with a simple belief: to make every guest feel at home, always.</p>
              <p className="lede" style={{ marginTop: 20 }}>Today our collection includes three distinctive properties, Abi&rsquo;s Inn, Abi&rsquo;s Residency and The Emerald, each offering a unique experience while upholding the core values that define the group.</p>
              <Link href="/history/" className="link" style={{ marginTop: 28 }}>Our history <Arrow /></Link>
            </div>
          </div>
          <div className="wrap siblings siblings--3" style={{ marginTop: 80 }} data-stagger>
            {HOTELS.map((h) => (
              <Link key={h.slug} href={`/${h.slug}/`} className="sib" data-cursor="view" style={{ aspectRatio: "4/5" }}>
                <Img src={h.card} sizes="(min-width: 800px) 33vw, 100vw" />
                <div><span className="kicker" style={{ color: "var(--color-gold-hi)", margin: 0 }}>Since {h.since}</span><h3>{h.name}</h3></div>
              </Link>
            ))}
          </div>
        </section>

        <section className="section night virun">
          <span className="virun__ghost" aria-hidden="true">விருந்தோம்பல்</span>
          <div className="wrap" style={{ position: "relative", textAlign: "center" }}>
            <p className="kicker" style={{ justifyContent: "center" }}>Our vision</p>
            <Split className="display display--md" text="A world-class hospitality brand, | *rooted in Tamil heritage*" />
            <div className="pillars" data-stagger style={{ textAlign: "left" }}>
              <div className="pillar">
                <span className="pillar__n">01 · Authentic hospitality</span>
                <h3>Virunthombal</h3>
                <p>We embrace the ancient Tamil concept of Virunthombal: the art of treating guests as honoured relatives, not just as customers. Every interaction is an opportunity to show the warmth and generosity that has defined Tamil hospitality for centuries.</p>
              </div>
              <div className="pillar">
                <span className="pillar__n">02 · Empowering communities</span>
                <h3>Rooted locally</h3>
                <p>We partner with local artisans, farmers and talent to keep our hospitality authentic and sustainable, and to keep the craft and flavour of the delta in every stay.</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
