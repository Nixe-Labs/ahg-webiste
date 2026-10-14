import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import { Arrow, Phone, WhatsApp } from "@/components/brand/Icons";
import { HOTELS, bookHref, inr } from "@/lib/hotels";
import { BOOKING_URL, GROUP, tel } from "@/lib/site";
import { img } from "@/lib/img";

export const metadata: Metadata = { title: "Book Now", description: "Book your room at The Emerald, Abi's Residency or Abi's Inn, Thanjavur. Tariffs from ₹1,700 + GST per night." };

export default function Book() {
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)", minHeight: "62svh" }}>
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Book now</span></nav>
            <p className="kicker">Reservations</p>
            <Split as="h1" load className="display" text="Book your *stay*" />
            <p className="lede" data-reveal style={{ marginTop: 26 }}>Choose your hotel and room. Booking directly with us is the simplest way to stay, and our team is a message away if you need anything at all.</p>
          </div>
        </section>

        <section className="section" style={{ paddingTop: 20 }}>
          <div className="wrap">
            <div className="bk" data-stagger>
              {HOTELS.map((h) => (
                <article key={h.slug} className={`bk__card t-${h.theme}`}>
                  <div className="bk__img"><img src={img(h.card)} alt={h.name} loading="lazy" /></div>
                  <div className="bk__body">
                    <span className="kicker" style={{ color: "var(--t-accent-hi)", margin: 0 }}>{h.tier}</span>
                    <h3>{h.name}</h3>
                    <ul className="bk__rooms">
                      {h.rooms.map((r) => (
                        <li key={r.name}><span>{r.name}<small>Up to {r.guests} adults</small></span><b>{inr(r.price)}</b></li>
                      ))}
                    </ul>
                    <div className="bk__actions on-dark">
                      <a href={bookHref(h)} target="_blank" rel="noreferrer" className="btn btn--gold">
                        {BOOKING_URL ? <>Check availability <Arrow /></> : <><WhatsApp className="w-4 h-4" /> Reserve</>}
                      </a>
                      <a href={tel(h.contact.phones[0])} className="btn"><Phone className="w-4 h-4" /> Call</a>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <p className="muted" data-reveal style={{ marginTop: 28, fontSize: 14 }}>Tariffs per room per night, plus GST, as published by each hotel. Final rates and availability are confirmed at booking.</p>
          </div>
        </section>

        <section className="section--tight sand">
          <div className="wrap grid-2">
            <div><p className="kicker">Need a hand?</p><Split className="display display--sm" text="Banquets, groups & *special requests*" /></div>
            <div data-reveal>
              <p className="lede">Planning a wedding, a corporate event or a family gathering? Abi&rsquo;s Inn hosts banquets for 250+ guests. Tell us what you have in mind.</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginTop: 26 }}>
                <Link href="/contact-us/" className="btn">Send an enquiry <Arrow /></Link>
                <a href={tel(GROUP.phone)} className="link">{GROUP.phone}</a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
