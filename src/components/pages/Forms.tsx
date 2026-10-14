"use client";
/* The live site posts these forms to WordPress. This static concept composes the message in
   the visitor's own mail app instead, so nothing is lost until a form backend is chosen. */
import { useState } from "react";
import { Arrow } from "@/components/brand/Icons";
import { GROUP } from "@/lib/site";
import { DEPARTMENTS } from "@/lib/content";
import { HOTELS } from "@/lib/hotels";

function compose(to: string, subject: string, form: HTMLFormElement) {
  const body = [...new FormData(form).entries()].map(([k, v]) => `${k}: ${v}`).join("\n");
  location.href = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

export function ContactForm() {
  const [sent, setSent] = useState(false);
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); compose(GROUP.email, `Enquiry: ${new FormData(e.currentTarget).get("Subject") || "Website"}`, e.currentTarget); setSent(true); }}>
      <div className="form__row">
        <div className="field"><label htmlFor="c-first">First name</label><input id="c-first" name="First name" required autoComplete="given-name" /></div>
        <div className="field"><label htmlFor="c-last">Last name</label><input id="c-last" name="Last name" autoComplete="family-name" /></div>
      </div>
      <div className="form__row">
        <div className="field"><label htmlFor="c-mail">Email</label><input id="c-mail" name="Email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="c-tel">Mobile</label><input id="c-tel" name="Mobile" type="tel" autoComplete="tel" /></div>
      </div>
      <div className="field">
        <label htmlFor="c-hotel">Regarding</label>
        <select id="c-hotel" name="Regarding" defaultValue="General">
          <option>General</option>
          {HOTELS.map((h) => <option key={h.slug}>{h.name}</option>)}
          <option>Banquets &amp; events</option>
        </select>
      </div>
      <div className="field"><label htmlFor="c-sub">Subject</label><input id="c-sub" name="Subject" /></div>
      <div className="field"><label htmlFor="c-msg">Your message</label><textarea id="c-msg" name="Message" required /></div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
        <button className="btn btn--gold" type="submit">Send message <Arrow /></button>
        <span className="form__note">Opens your email app, addressed to {GROUP.email}</span>
      </div>
      {sent && <p className="form__sent">Thank you. If your email app did not open, write to us at <a href={`mailto:${GROUP.email}`}>{GROUP.email}</a>.</p>}
    </form>
  );
}

export function CareerForm() {
  const [sent, setSent] = useState(false);
  return (
    <form className="form" onSubmit={(e) => { e.preventDefault(); compose(GROUP.email, `Job application: ${new FormData(e.currentTarget).get("Department")}`, e.currentTarget); setSent(true); }}>
      <div className="form__row">
        <div className="field"><label htmlFor="j-first">First name</label><input id="j-first" name="First name" required autoComplete="given-name" /></div>
        <div className="field"><label htmlFor="j-last">Last name</label><input id="j-last" name="Last name" required autoComplete="family-name" /></div>
      </div>
      <div className="form__row">
        <div className="field"><label htmlFor="j-mail">Email</label><input id="j-mail" name="Email" type="email" required autoComplete="email" /></div>
        <div className="field"><label htmlFor="j-tel">Mobile</label><input id="j-tel" name="Mobile" type="tel" required autoComplete="tel" /></div>
      </div>
      <div className="field"><label htmlFor="j-pos">Position applying for</label><input id="j-pos" name="Position" /></div>
      <div className="form__row">
        <div className="field">
          <label htmlFor="j-dept">Department</label>
          <select id="j-dept" name="Department" required defaultValue="">
            <option value="" disabled>Please select</option>
            {DEPARTMENTS.map((d) => <option key={d}>{d}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="j-loc">Location</label>
          <select id="j-loc" name="Location" required defaultValue="">
            <option value="" disabled>Please select</option>
            {HOTELS.map((h) => <option key={h.slug}>{h.name}</option>)}
          </select>
        </div>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 20 }}>
        <button className="btn btn--gold" type="submit">Apply <Arrow /></button>
        <span className="form__note">Opens your email app; please attach your résumé before sending.</span>
      </div>
      {sent && <p className="form__sent">Thank you. Remember to attach your résumé. If your email app did not open, send it to <a href={`mailto:${GROUP.email}`}>{GROUP.email}</a>.</p>}
    </form>
  );
}
