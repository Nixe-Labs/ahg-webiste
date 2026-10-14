import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import Gallery from "./Gallery";
import { AMENITY_ICONS, Arrow, Instagram, WhatsApp } from "@/components/brand/Icons";
import { AMENITY_TEXT, HOTELS, bookHref, inr, type Hotel } from "@/lib/hotels";
import { BOOKING_URL, tel } from "@/lib/site";
import Img from "@/components/fx/Img";

const ext = (href: string) => (href.startsWith("http") ? { target: "_blank", rel: "noreferrer" } : {});

export default function HotelPage({ h }: { h: Hotel }) {
  const from = Math.min(...h.rooms.map((r) => r.price));
  const others = HOTELS.filter((o) => o.slug !== h.slug);
  const book = bookHref(h);
  const bookLabel = BOOKING_URL ? "Check availability" : "Reserve on WhatsApp";
  const [lead, ...rest] = h.intro.split(/(?<=\.)\s+/);

  return (
    <>
      <main data-nav="dark" className={`t-${h.theme}`}>
        <section className="phero">
          <div className="phero__img"><Img data-parallax="6" src={h.hero} alt={`${h.name}, Thanjavur`} priority style={{ height: "112%", marginTop: "-6%" }} /></div>
          <div className="phero__copy">
            <div className="wrap">
              <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><Link href="/hotels/">Hotels</Link></nav>
              <p className="kicker" style={{ color: "var(--t-accent-hi)" }}>{h.tier} · Since {h.since}</p>
              <Split as="h1" load className="display" text={h.name} />
              <p className="lede" data-reveal style={{ color: "rgba(246,240,229,.85)", marginTop: 18 }}>{h.tagline}</p>
              <div className="phero__meta" data-reveal>
                <div><b>Address</b>{h.contact.address.split(",").slice(0, 3).join(",")}</div>
                <div><b>Reservations</b><a href={tel(h.contact.phones[0])}>{h.contact.phones[0]}</a></div>
                <div><b>Rooms from</b>{inr(from)} + GST</div>
                <div style={{ marginLeft: "auto" }} className="on-dark"><a href={book} {...ext(book)} className="btn btn--gold">{bookLabel} <Arrow /></a></div>
              </div>
            </div>
          </div>
        </section>

        {/* ── welcome ── */}
        <section className="section">
          <div className="wrap grid-2">
            <div>
              <p className="kicker">{h.kicker}</p>
              <Split className="display display--sm" text={`Welcome to *${h.name}*`} />
              <p className="lede" data-reveal style={{ marginTop: 26, fontSize: 21, fontFamily: "var(--font-serif)", color: "var(--color-ink)" }}>{lead}</p>
              <p className="lede" data-reveal style={{ marginTop: 16 }}>{rest.join(" ")}</p>
            </div>
            <div className="hp-intro__art">
              <div className="arch" data-zoom><Img src={h.gallery[1] ?? h.hero} sizes="(min-width: 900px) 45vw, 100vw" /></div>
              <div className="frame" data-reveal="0.3"><Img src={h.gallery[2] ?? h.card} sizes="(min-width: 900px) 20vw, 44vw" style={{ height: "100%" }} /></div>
            </div>
          </div>
        </section>

        {/* ── venues (Abi's Inn) ── */}
        {h.features && (
          <section className="section sand">
            <div className="wrap">
              {h.features.map((f, i) => (
                <div key={f.title} className={`feature${i % 2 ? " feature--flip" : ""}`}>
                  <div className="frame feature__img" data-zoom><Img src={f.image} alt={f.title} sizes="(min-width: 900px) 55vw, 100vw" /></div>
                  <div>
                    <p className="kicker">At {h.name}</p>
                    <Split as="h3" text={f.title} />
                    <p className="lede" data-reveal>{f.text}</p>
                    <div data-reveal style={{ marginTop: 28 }}><Link href="/contact-us/" className="link">Enquire <Arrow /></Link></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── rooms & tariff ── */}
        <section className="section" id="rooms">
          <div className="wrap">
            <div className="tariff" data-reveal>
              <div className="tariff__head">
                <div>
                  <p className="kicker" style={{ color: "var(--t-accent-hi)" }}>Accommodations</p>
                  <h2 className="display display--sm">Rooms &amp; <em>tariff</em></h2>
                </div>
                <a href={book} {...ext(book)} className="btn btn--gold">{bookLabel} <Arrow /></a>
              </div>
              {h.rooms.map((r) => (
                <div key={r.name} className="tariff__row">
                  <h4>{r.name}</h4>
                  <span className="tariff__dots" />
                  <span className="tariff__guests">Up to {r.guests} adults</span>
                  <span className="tariff__price">{inr(r.price)}<small>+ GST</small></span>
                </div>
              ))}
              <p className="tariff__note">Per room, per night. Tariffs as published by the hotel; please confirm availability when booking.</p>
            </div>
          </div>
        </section>

        {/* ── amenities ── */}
        <section className="section--tight">
          <div className="wrap">
            <div className="grid-2" style={{ alignItems: "end", marginBottom: 48 }}>
              <div><p className="kicker">Hotel features</p><Split className="display display--sm" text="Everything you need, *nothing you don't*" /></div>
              <p className="lede" data-reveal>Thoughtful comforts for business and leisure, looked after by a team that treats every guest as family.</p>
            </div>
            <div className="amenities" data-stagger>
              {h.amenities.map((a) => {
                const Icon = AMENITY_ICONS[a];
                return (
                  <div key={a} className="amenity">
                    <Icon />
                    <h4>{AMENITY_TEXT[a][0]}</h4>
                    <p>{AMENITY_TEXT[a][1]}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── gallery ── */}
        <section className="section" style={{ overflow: "hidden" }}>
          <div className="wrap" style={{ marginBottom: 44, display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "end", gap: 20 }}>
            <div><p className="kicker">Gallery</p><Split className="display display--sm" text={`Inside *${h.short === "Inn" ? "the Inn" : h.short === "Residency" ? "the Residency" : "The Emerald"}*`} /></div>
            <p className="muted" data-reveal style={{ fontSize: 12, letterSpacing: ".24em", textTransform: "uppercase" }}>Drag to explore · {h.gallery.length} photographs</p>
          </div>
          <Gallery images={h.gallery} name={h.name} />
        </section>

        {/* ── visit ── */}
        <section className="section" style={{ paddingTop: 0 }}>
          <div className="wrap">
            <div className="visit" data-reveal>
              <dl className="visit__info">
                <div><p className="kicker" style={{ marginBottom: 12 }}>Get in touch</p><h2 className="display display--sm">Visit {h.name}</h2></div>
                <div><dt>Address</dt><dd>{h.contact.address}</dd></div>
                <div><dt>Room booking</dt><dd>{h.contact.phones.map((p) => <a key={p} href={tel(p)} style={{ display: "block" }}>{p}</a>)}</dd></div>
                <div><dt>Email</dt><dd>{h.contact.emails.map((m) => <a key={m} href={`mailto:${m}`}>{m}</a>)}</dd></div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  <a href={h.contact.whatsapp} target="_blank" rel="noreferrer" className="btn"><WhatsApp className="w-4 h-4" /> WhatsApp</a>
                  <a href={h.contact.instagram} target="_blank" rel="noreferrer" className="btn"><Instagram className="w-4 h-4" /> Instagram</a>
                </div>
              </dl>
              <div className="visit__map">
                <iframe title={`Map showing ${h.name}`} loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(h.contact.mapQuery)}&output=embed`} />
              </div>
            </div>
          </div>
        </section>

        {/* ── the rest of the family ── */}
        <section className="section sand">
          <div className="wrap">
            <p className="kicker">Also in the family</p>
            <Split className="display display--sm" text="More ways to *stay*" />
            <div className="siblings" style={{ marginTop: 44 }} data-stagger>
              {others.map((o) => (
                <Link key={o.slug} href={`/${o.slug}/`} className="sib" data-cursor="view">
                  <Img src={o.card} sizes="(min-width: 800px) 50vw, 100vw" />
                  <div><span className="kicker" style={{ color: "var(--color-gold-hi)", margin: 0 }}>{o.tier}</span><h3>{o.name}</h3></div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
