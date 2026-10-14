import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import { Arrow } from "@/components/brand/Icons";
import { AMENITY_TEXT, HOTELS, bookHref, inr } from "@/lib/hotels";
import { BOOKING_URL } from "@/lib/site";
import { img } from "@/lib/img";

export const metadata: Metadata = { title: "Our Hotels", description: "Discover your perfect stay in Thanjavur: The Emerald, Abi's Residency and Abi's Inn, each with its own character, all with the same warm welcome." };

export default function Hotels() {
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)" }}>
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Hotels</span></nav>
            <p className="kicker">Our hotels</p>
            <Split as="h1" load className="display" text="Discover your | *perfect stay*" />
            <div className="grid-2" style={{ marginTop: 48, alignItems: "start" }}>
              <p className="lede" data-reveal>Abi&rsquo;s Hotel Group is a name synonymous with comfort, elegance and exceptional service. Rooted in a tradition of excellence, our hotels are designed for business and leisure travellers alike: a seamless blend of sophistication and cultural charm.</p>
              <p className="lede" data-reveal>Whether you are visiting for work, relaxation or to explore the rich heritage of Thanjavur, there is a house in our family that will feel like home.</p>
            </div>
          </div>
        </section>

        {HOTELS.map((h, i) => (
          <section key={h.slug} className={`section t-${h.theme}`} style={{ paddingTop: i ? undefined : 40 }}>
            <div className={`wrap feature${i % 2 ? " feature--flip" : ""}`}>
              <Link href={`/${h.slug}/`} className="arch feature__img" style={{ aspectRatio: "4/5", borderRadius: undefined }} data-zoom data-cursor="view" aria-label={`Discover ${h.name}`}>
                <img src={img(h.card)} alt={`${h.name}, Thanjavur`} loading="lazy" />
              </Link>
              <div>
                <p className="kicker" style={{ color: "var(--t-accent)" }}>0{i + 1} · {h.tier} · Since {h.since}</p>
                <Split as="h2" className="display display--md" text={h.name} />
                <p className="lede" data-reveal style={{ marginTop: 22 }}>{h.intro.split(/(?<=\.)\s+/).slice(0, 2).join(" ")}</p>
                <ul data-stagger style={{ listStyle: "none", padding: 0, margin: "28px 0", display: "flex", flexWrap: "wrap", gap: 8 }}>
                  {h.amenities.slice(0, 6).map((a) => <li key={a} className="chip" style={{ display: "inline-flex", alignItems: "center", height: 36, fontSize: 11 }}>{AMENITY_TEXT[a][0]}</li>)}
                </ul>
                <div data-reveal style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 14 }}>
                  <Link href={`/${h.slug}/`} className="btn">Discover <Arrow /></Link>
                  <a href={bookHref(h)} target="_blank" rel="noreferrer" className="btn btn--gold">{BOOKING_URL ? "Book" : "Reserve"}</a>
                  <span className="muted" style={{ fontSize: 13, letterSpacing: ".1em" }}>from <b className="serif" style={{ fontSize: 24, color: "var(--color-ink)", fontWeight: 400 }}>{inr(Math.min(...h.rooms.map((r) => r.price)))}</b> + GST</span>
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
