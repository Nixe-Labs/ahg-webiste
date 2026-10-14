"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import FanMark from "@/components/brand/FanMark";
import { Arrow } from "@/components/brand/Icons";
import { NAV, GROUP, tel } from "@/lib/site";
import { HOTELS } from "@/lib/hotels";
import Img from "@/components/fx/Img";
import { getLenis } from "./SmoothScroll";

export function Brand({ light }: { light?: boolean }) {
  return (
    <span className="brand">
      <FanMark color={light ? "var(--color-gold-hi)" : "var(--color-teal)"} />
      <span><b>AHG</b><small>Abi&rsquo;s Hotel Group</small></span>
    </span>
  );
}

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setOpen(false);
    setDark(!!document.querySelector('main[data-nav="dark"]'));
  }, [pathname]);

  useEffect(() => {
    let last = scrollY;
    const on = () => {
      const y = scrollY;
      setSolid(y > 40);
      setHidden(y > 480 && y > last + 2);
      if (y < last - 2) setHidden(false);
      last = y;
    };
    on();
    addEventListener("scroll", on, { passive: true });
    return () => removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) { l?.stop(); document.body.style.overflow = "hidden"; }
    else { l?.start(); document.body.style.overflow = ""; }
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    addEventListener("keydown", esc);
    return () => removeEventListener("keydown", esc);
  }, [open]);

  const cls = ["nav", solid && !open && "is-solid", hidden && !open && "is-hidden", (dark || open) && "is-dark"].filter(Boolean).join(" ");
  return (
    <>
      <header className={cls}>
        <div className="wrap">
          <Link href="/" aria-label="Abi's Hotel Group, home" data-nav-logo><Brand light={(dark || open) && !solid} /></Link>
          <nav className="nav__links" aria-label="Main">
            {NAV.map((n) => <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>{n.label}</Link>)}
          </nav>
          <div className="nav__right">
            <Link href="/book-now/" className="btn btn--gold nav__book">Book a stay</Link>
            <button className="burger" aria-expanded={open} aria-controls="menu" aria-label={open ? "Close menu" : "Open menu"} onClick={() => setOpen((o) => !o)}>
              <span /><span />
            </button>
          </div>
        </div>
      </header>

      <div id="menu" className={`menu night${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="menu__inner">
          <ul className="menu__links stagger">
            {[{ href: "/", label: "Home" }, ...NAV].map((n, i) => (
              <li key={n.href}><Link href={n.href} tabIndex={open ? 0 : -1}><small>0{i + 1}</small>{n.label}</Link></li>
            ))}
          </ul>
          <div className="menu__aside stagger">
            <p className="kicker" style={{ margin: 0 }}>Our hotels</p>
            <div className="menu__hotels">
              {HOTELS.map((h) => (
                <Link key={h.slug} href={`/${h.slug}/`} className="menu__hotel" tabIndex={open ? 0 : -1}>
                  <Img src={h.card} sizes="84px" />
                  <span><b>{h.name}</b><small>{h.tier}</small></span>
                </Link>
              ))}
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, alignItems: "center" }}>
              <Link href="/book-now/" className="btn btn--gold" tabIndex={open ? 0 : -1}>Book a stay <Arrow /></Link>
              <a href={tel(GROUP.phone)} className="link" tabIndex={open ? 0 : -1}>{GROUP.phone}</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
