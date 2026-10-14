import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import { ContactForm } from "@/components/pages/Forms";
import { Mail, Phone, Pin, WhatsApp } from "@/components/brand/Icons";
import { GROUP, tel } from "@/lib/site";
import { HOTELS } from "@/lib/hotels";

export const metadata: Metadata = { title: "Contact Us", description: "Reach Abi's Hotel Group in Thanjavur: +91 93454 15220, info@abishotels.com, 387/2A Pudukottai Main Road. Direct lines for Abi's Inn, Abi's Residency and The Emerald." };

const row = { display: "flex", gap: 12, alignItems: "flex-start" } as const;

export default function Contact() {
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)", minHeight: "60svh" }}>
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Contact</span></nav>
            <p className="kicker">Contact us</p>
            <Split as="h1" load className="display" text="We would love | to *hear from you*" />
          </div>
        </section>

        <section className="section" style={{ paddingTop: 20 }}>
          <div className="wrap grid-2" style={{ alignItems: "start" }}>
            <div data-reveal><ContactForm /></div>
            <div style={{ display: "grid", gap: 28 }}>
              <div className="card" data-reveal style={{ background: "var(--color-night)", color: "var(--color-ivory)" }}>
                <span className="tag" style={{ color: "var(--color-gold-hi)" }}>Abi&rsquo;s Hotel Group</span>
                <h3>Head office</h3>
                <ul>
                  <li style={{ ...row, color: "rgba(246,240,229,.8)" }}><Pin className="w-5 h-5 shrink-0" />{GROUP.address}</li>
                  <li style={{ ...row, color: "rgba(246,240,229,.8)" }}><Phone className="w-5 h-5 shrink-0" /><a href={tel(GROUP.phone)}>{GROUP.phone}</a></li>
                  <li style={{ ...row, color: "rgba(246,240,229,.8)" }}><Mail className="w-5 h-5 shrink-0" /><a href={`mailto:${GROUP.email}`}>{GROUP.email}</a></li>
                </ul>
              </div>
              <div className="cards" data-stagger style={{ gridTemplateColumns: "1fr" }}>
                {HOTELS.map((h) => (
                  <div key={h.slug} className="card">
                    <span className="tag">{h.tier}</span>
                    <h3><Link href={`/${h.slug}/`}>{h.name}</Link></h3>
                    <ul>
                      <li style={row}><Pin className="w-5 h-5 shrink-0" />{h.contact.address}</li>
                      {h.contact.phones.map((p) => <li key={p} style={row}><Phone className="w-5 h-5 shrink-0" /><a href={tel(p)}>{p}</a></li>)}
                      {h.contact.emails.map((m) => <li key={m} style={row}><Mail className="w-5 h-5 shrink-0" /><a href={`mailto:${m}`}>{m}</a></li>)}
                      <li style={row}><WhatsApp className="w-5 h-5 shrink-0" /><a href={h.contact.whatsapp} target="_blank" rel="noreferrer">Message on WhatsApp</a></li>
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="visit__map" style={{ minHeight: "60svh" }}>
          <iframe title="Map of Abi's Hotel Group head office, Thanjavur" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent("Abi's Inn, Pudukottai Main Road, Thanjavur")}&output=embed`} />
        </section>
      </main>
      <Footer />
    </>
  );
}
