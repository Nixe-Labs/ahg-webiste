import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import CREDITS from "@/data/credits.json";

export const metadata: Metadata = { title: "Credits", description: "Photography and film credits for the Abi's Hotel Group website concept." };

type Credit = { group: string; subject: string; title: string; author: string; license: string; license_url?: string; source_url: string };
const GROUPS = ["Film", "Thanjavur & the delta", "From Abi's Hotel Group"];

export default function Credits() {
  const credits = CREDITS as Credit[];
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)", minHeight: "56svh" }}>
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Credits</span></nav>
            <p className="kicker">With thanks</p>
            <Split as="h1" load className="display" text="Photography *& film*" />
            <p className="lede" data-reveal style={{ marginTop: 26 }}>Hotel photography is Abi&rsquo;s Hotel Group&rsquo;s own, enhanced for high-resolution screens. Views of Thanjavur and the delta are by the photographers and filmmakers below, used under their licences; photos licensed CC BY-SA are resized for the web and shared here under that same licence.</p>
          </div>
        </section>
        <section className="section" style={{ paddingTop: 20 }}>
          <div className="wrap" style={{ display: "grid", gap: 64 }}>
            {GROUPS.map((g) => {
              const rows = credits.filter((c) => c.group === g);
              if (!rows.length) return null;
              return (
                <div key={g}>
                  <p className="kicker">{g}</p>
                  <ul className="credits" data-stagger>
                    {rows.map((c) => (
                      <li key={c.subject + c.source_url}>
                        <b>{c.subject}</b>
                        <span>{c.source_url ? <a href={c.source_url} target="_blank" rel="noreferrer">{c.title}</a> : c.title}{c.author ? <> · {c.author}</> : null}</span>
                        <span className="credits__lic">{c.license_url ? <a href={c.license_url} target="_blank" rel="noreferrer">{c.license}</a> : c.license}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
