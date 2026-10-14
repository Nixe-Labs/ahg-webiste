import localFont from "next/font/local";

/* Self-hosted (SIL Open Font License, see src/fonts/OFL-*.txt): variable fonts cut to the
   300–600 weights and the characters the site uses. Building never calls out to Google Fonts,
   whose responses intermittently broke the Turbopack build. */

/** Display: a high-contrast Garamond, at home on temple inscriptions and tariff cards alike. */
export const serif = localFont({
  src: [
    { path: "../fonts/cormorant-garamond.woff2", weight: "300 600", style: "normal" },
    { path: "../fonts/cormorant-garamond-italic.woff2", weight: "300 600", style: "italic" },
  ],
  variable: "--nf-serif",
  display: "swap",
});
/** Text: a clean geometric sans that echoes the AHG wordmark. */
export const sans = localFont({ src: [{ path: "../fonts/jost.woff2", weight: "300 600", style: "normal" }], variable: "--nf-sans", display: "swap" });
export const tamil = localFont({ src: [{ path: "../fonts/noto-serif-tamil.woff2", weight: "300 600", style: "normal" }], variable: "--nf-tamil", display: "swap", preload: false });
