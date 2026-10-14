import Link from "next/link";
import Intro from "@/components/home/Intro";
import HomeHero from "@/components/home/HomeHero";
import HotelsRail from "@/components/home/HotelsRail";
import Testimonials from "@/components/home/Testimonials";
import Footer from "@/components/chrome/Footer";
import Split from "@/components/fx/Split";
import LivingKolam from "@/components/fx/LivingKolam";
import AmbientVideo from "@/components/fx/AmbientVideo";
import MotionToggle from "@/components/fx/MotionToggle";
import { Arrow } from "@/components/brand/Icons";
import { PLACES } from "@/lib/content";
import { placeSrc } from "@/lib/img";
import Img from "@/components/fx/Img";

const STATEMENT =
  "Established in Thanjavur, the Chola capital and rice bowl of Tamil Nadu, Abi's Hotel Group brings together three distinct stays, united by one ancient Tamil idea: ~Virunthombal,~ treating every guest as an honoured relative.";

const STATS = [
  { n: 3, label: "Distinct hotels across Thanjavur" },
  { n: 2012, label: "The year we first opened our doors", plain: true },
  { n: 250, plus: true, label: "Guests in a single banquet hall" },
  { n: 2, label: "UNESCO Chola temples within easy reach" },
];

const YEARS = [
  ["2012", "Abi's Inn opens: Thanjavur's first apartment hotel."],
  ["2014", "Hot 'n' Spicy, the city's first lawn restaurant."],
  ["2015", "Rhythm Hall, Thanjavur's first eco-friendly banquet space."],
  ["2016", "Cleartrip's Featured Hotel of the Year."],
  ["2021", "Abi's Residency opens beside the Big Temple."],
  ["2025", "The Emerald opens; Abi's Hotel Group is formed."],
];

const ROW_A = PLACES.slice(0, 10), ROW_B = PLACES.slice(10);

export default function Home() {
  return (
    <>
      <Intro />
      <main>
        <HomeHero />

        {/* ── the idea ── */}
        <section className="section" style={{ overflow: "hidden" }}>
          <LivingKolam className="kolam-float" />
          <div className="wrap">
            <p className="kicker">Welcome to Abi&rsquo;s Hotel Group</p>
            <p className="statement" data-scrub-words>
              {STATEMENT.split(" ").map((w, i) => {
                const hl = w.startsWith("~");
                return <span key={i}><span className={`w${hl ? " hl" : ""}`}>{w.replace(/~/g, "")}</span> </span>;
              })}
            </p>
            <div style={{ marginTop: 40 }} data-reveal><Link href="/about-us/" className="link">About us <Arrow /></Link></div>
            <ul className="stats" aria-label="Abi's Hotel Group in numbers" data-stagger>
              {STATS.map((s) => (
                <li key={s.label} className="stat">
                  <span className="stat__line" aria-hidden="true" data-line />
                  <b className="stat__num">
                    {s.plain ? s.n : <span data-count={s.n}>{s.n}</span>}
                    {s.plus && <span className="stat__plus" aria-label="or more">+</span>}
                  </b>
                  <span className="stat__label">{s.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <HotelsRail />

        {/* ── heritage ── */}
        <section className="section night" style={{ overflow: "hidden" }}>
          <div className="wrap">
            <div className="grid-2" style={{ alignItems: "end" }}>
              <div>
                <p className="kicker">Our history</p>
                <Split className="display display--md" text="A heritage of *hospitality*" />
              </div>
              <div data-reveal>
                <p className="lede">From a single apartment hotel in 2012 to a family of three, every chapter has been written in Thanjavur, with a string of the city&rsquo;s firsts along the way.</p>
                <Link href="/history/" className="link" style={{ marginTop: 22, color: "var(--color-gold-hi)" }}>Read our story <Arrow /></Link>
              </div>
            </div>
            <div className="years" data-stagger>
              <span className="years__line" aria-hidden="true"><i /></span>
              {YEARS.map(([y, t]) => (
                <div key={y} className="year"><b>{y}</b><i /><p>{t}</p></div>
              ))}
            </div>
          </div>
        </section>

        {/* ── the city ── */}
        <section className="vista">
          <div className="vista__img"><div data-parallax="8" className="vista__film"><AmbientVideo name="vista-fields" posters={{ wide: "/img/home/vista-poster-wide.jpg", tall: "/img/home/vista-poster.jpg" }} label="Paddy fields and coconut groves of the Kaveri delta near Thanjavur, from the air" /></div></div>
          <MotionToggle className="film-toggle film-toggle--vista" />
          <div className="vista__copy">
            <div className="wrap grid-2" style={{ alignItems: "end" }}>
              <div>
                <p className="kicker" style={{ color: "var(--color-gold-hi)" }}>Explore Thanjavur</p>
                <Split className="display display--md" text="The rice bowl of *Tamil Nadu*" />
              </div>
              <div data-reveal className="on-dark">
                <p className="lede" style={{ color: "rgba(246,240,229,.82)" }}>The Kaveri delta keeps Thanjavur green, and the city keeps its history: capital of the Cholas, home of Tanjore painting, Carnatic music and classical dance. Each of our hotels is a gateway to it.</p>
                <Link href="/explore-thanjavur/" className="btn" style={{ marginTop: 26 }}>Explore the city <Arrow /></Link>
              </div>
            </div>
          </div>
        </section>
        <div className="marquee night" aria-label="Places to visit around Thanjavur">
          {[ROW_A, ROW_B].map((row, r) => (
            <div key={r} className={`marquee__row marquee__row--${r ? "rev" : "fwd"}`}>
              {[...row, ...row].map((p, i) => (
                <Link key={i} href="/explore-thanjavur/" className="pcard" aria-hidden={i >= row.length} tabIndex={i >= row.length ? -1 : undefined}>
                  <Img src={placeSrc(p.image)} sizes="360px" />
                  <span><small>{p.kind}</small>{p.name}</span>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* ── guests ── */}
        <section className="section">
          <div className="wrap"><Testimonials /></div>
        </section>

        {/* ── careers ── */}
        <section className="section sand" style={{ overflow: "hidden" }}>
          <div className="wrap grid-2">
            <div>
              <p className="kicker">Careers</p>
              <Split className="display display--md" text="Join the *family*" />
              <p className="lede" data-reveal style={{ marginTop: 24 }}>We are always on the lookout for exceptional talent. If you are passionate about hospitality and wish to be part of a dynamic team, there is a place for you here.</p>
              <div data-reveal style={{ marginTop: 32 }}><Link href="/careers/" className="btn">Apply now <Arrow /></Link></div>
            </div>
            <div className="faces" data-stagger style={{ paddingTop: "10%" }}>
              {[1, 2, 3, 4, 5].map((n) => (
                <div key={n} className="face"><div className="arch"><Img src={`/img/team/portrait-${n}.jpg`} sizes="(min-width: 900px) 10vw, 20vw" /></div></div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
