import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import Kolam, { KOLAM_LINES } from "@/components/brand/Kolam";
import { Arrow } from "@/components/brand/Icons";
import { HISTORY } from "@/lib/content";
import Img from "@/components/fx/Img";

export const metadata: Metadata = { title: "Our History", description: "From Thanjavur's first apartment hotel in 2012 to the opening of The Emerald in 2025: the milestones, firsts and awards of Abi's Hotel Group." };

export default function History() {
  return (
    <>
      <main data-nav="dark">
        <section className="phero phero--plain night" style={{ overflow: "hidden" }}>
          <Kolam className="kolam-float" strokeWidth={0.4} />
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)", position: "relative" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Our history</span></nav>
            <p className="kicker">2012 — 2025</p>
            <Split as="h1" load className="display" text="A heritage of | *hospitality*" />
            <p className="lede" data-reveal style={{ marginTop: 32 }}>Thanjavur&rsquo;s libraries keep their oldest stories on palm leaves. Ours is shorter, but it is written the same way: one leaf, one year, one welcome at a time.</p>
          </div>
        </section>

        <section className="section">
          <div className="wrap leaves">
            <span className="leaves__spine"><i data-grow="y" /></span>
            {HISTORY.map((m) => (
              <div key={m.year} className="leaf-row">
                <span className="leaf-row__node" />
                <div className="leaf-row__text">
                  <p className="leaf-row__year" data-reveal>{m.year}</p>
                  <div data-stagger>
                    {m.items.map((t) => <div key={t} className="leaf"><p>{t}</p></div>)}
                  </div>
                </div>
                {m.image ? (
                  <figure className="leaf-row__img" style={{ margin: 0, position: "relative" }}>
                    <div className="frame" data-zoom><Img src={m.image} alt={m.caption ?? ""} sizes="(min-width: 900px) 45vw, 100vw" /></div>
                    {m.caption && <figcaption>{m.caption}</figcaption>}
                  </figure>
                ) : <div className="leaf-row__orn" aria-hidden="true"><svg viewBox="0 0 200 200" data-draw fill="none" stroke="currentColor" strokeWidth=".8">{KOLAM_LINES.map((d, i) => <path key={i} d={d} pathLength={1} />)}</svg></div>}
              </div>
            ))}
          </div>
        </section>

        <section className="section--tight sand" style={{ textAlign: "center" }}>
          <div className="wrap">
            <p className="kicker" style={{ justifyContent: "center" }}>The next chapter</p>
            <Split className="display display--sm" text="Be part of the *story*" />
            <div data-reveal style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 12, marginTop: 32 }}>
              <Link href="/book-now/" className="btn btn--gold">Book a stay <Arrow /></Link>
              <Link href="/careers/" className="btn">Join our team</Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
