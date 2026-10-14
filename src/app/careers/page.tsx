import type { Metadata } from "next";
import Link from "next/link";
import Split from "@/components/fx/Split";
import Footer from "@/components/chrome/Footer";
import { CareerForm } from "@/components/pages/Forms";
import { DEPARTMENTS } from "@/lib/content";
import { GROUP } from "@/lib/site";
import Img from "@/components/fx/Img";

export const metadata: Metadata = { title: "Careers", description: "Build a career in hospitality with Abi's Group of Hotels in Thanjavur: front office, housekeeping, food & beverage, kitchen, sales and management." };

export default function Careers() {
  return (
    <>
      <main>
        <section className="phero phero--plain" style={{ color: "var(--color-ink)" }}>
          <div className="wrap" style={{ paddingTop: "calc(var(--nav-h) + 40px)" }}>
            <nav className="crumbs" aria-label="Breadcrumb"><Link href="/">Home</Link><span>/</span><span>Careers</span></nav>
            <p className="kicker">Careers with Abi&rsquo;s Group of Hotels</p>
            <Split as="h1" load className="display" text="Hospitality is | a *family* business" />
          </div>
        </section>

        <section style={{ paddingBottom: 40 }}>
          <div className="wrap faces" data-stagger style={{ maxWidth: 1100 }}>
            {[1, 2, 3, 4, 5].map((n) => <div key={n} className="face"><div className="arch"><Img src={`/img/team/portrait-${n}.jpg`} sizes="(min-width: 900px) 18vw, 20vw" /></div></div>)}
          </div>
        </section>

        <section className="section">
          <div className="wrap grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="lede" data-reveal style={{ fontFamily: "var(--font-serif)", fontSize: 26, color: "var(--color-ink)", lineHeight: 1.4 }}>At Abi&rsquo;s Group of Hotels, we believe in creating memorable experiences, not just for our guests but for our team as well.</p>
              <p className="lede" data-reveal style={{ marginTop: 20 }}>With a legacy of warm hospitality and excellence in service, we are always looking for passionate, dedicated and talented people who are ready to grow with us. Whether you are just starting out or bring years of experience, you will find room to thrive in a supportive, growth-driven environment.</p>
            </div>
            <div>
              <p className="kicker">Where you could belong</p>
              <ul className="depts" data-stagger>
                {[...DEPARTMENTS, "Sales & Marketing", "Management"].map((d, i) => <li key={d}>{d}<span>0{i + 1}</span></li>)}
              </ul>
            </div>
          </div>
        </section>

        <section className="section sand" id="apply">
          <div className="wrap grid-2" style={{ alignItems: "start" }}>
            <div>
              <p className="kicker">Apply now</p>
              <Split className="display display--md" text="Tell us *about you*" />
              <p className="lede" data-reveal style={{ marginTop: 24 }}>Fill in your details and we will open a ready-to-send email. Attach your résumé, and our team will be in touch. You can also reach us on <a href={GROUP.linkedin} target="_blank" rel="noreferrer" className="link" style={{ letterSpacing: ".12em" }}>LinkedIn</a>.</p>
            </div>
            <div data-reveal><CareerForm /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
