import Link from "next/link";
import { Arrow, Instagram, LinkedIn, Mail, Phone } from "@/components/brand/Icons";
import Split from "@/components/fx/Split";
import { Brand } from "./Nav";
import { GROUP, NAV, tel } from "@/lib/site";
import { HOTELS } from "@/lib/hotels";

export default function Footer() {
  return (
    <footer className="footer night">
      <div className="footer__border" aria-hidden="true" />
      <div className="wrap">
        <div className="footer__cta">
          <div>
            <p className="kicker">Virunthombal · விருந்தோம்பல்</p>
            <Split className="display display--md" text="Come home to *Thanjavur.*" />
          </div>
          <div data-reveal style={{ display: "grid", gap: 22, justifyItems: "start" }}>
            <p className="lede">Three hotels, one family, minutes from the Big Temple. Tell us when you are coming, and we will be ready to welcome you.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <Link href="/book-now/" className="btn btn--gold">Book a stay <Arrow /></Link>
              <Link href="/contact-us/" className="btn">Contact us</Link>
            </div>
          </div>
        </div>

        <div className="footer__cols">
          <div style={{ display: "grid", gap: 22, alignContent: "start" }}>
            <Link href="/" aria-label="Home"><Brand light /></Link>
            <address>{GROUP.address}</address>
            <ul>
              <li><a href={tel(GROUP.phone)} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Phone className="w-4 h-4" />{GROUP.phone}</a></li>
              <li><a href={`mailto:${GROUP.email}`} style={{ display: "inline-flex", gap: 10, alignItems: "center" }}><Mail className="w-4 h-4" />{GROUP.email}</a></li>
            </ul>
          </div>
          {HOTELS.map((h) => (
            <div key={h.slug} className="footer__hotel">
              <h4>{h.tier}</h4>
              <ul>
                <li><Link href={`/${h.slug}/`}><b>{h.name}</b></Link></li>
                <li>{h.contact.address.split(",").slice(0, 2).join(",")}</li>
                {h.contact.phones.slice(0, 1).map((p) => <li key={p}><a href={tel(p)}>{p}</a></li>)}
              </ul>
            </div>
          ))}
          <div>
            <h4>Explore</h4>
            <ul>
              {NAV.map((n) => <li key={n.href}><Link href={n.href}>{n.label}</Link></li>)}
              <li style={{ display: "flex", gap: 14, marginTop: 8 }}>
                <a href={GROUP.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram className="w-5 h-5" /></a>
                <a href={GROUP.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><LinkedIn className="w-5 h-5" /></a>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__base">
          <span>Unofficial concept preview, not affiliated with or operated by Abi&rsquo;s Hotel Group · Content &amp; hotel photography © Abi&rsquo;s Hotel Group · Official site: <a href="https://abishotels.com" target="_blank" rel="noreferrer">abishotels.com</a></span>
          <span><Link href="/credits/">Photo &amp; film credits</Link></span>
        </div>
      </div>
      <p className="footer__giant" aria-hidden="true">Thanjavur</p>
    </footer>
  );
}
