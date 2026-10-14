import { Cormorant_Garamond, Jost, Noto_Serif_Tamil } from "next/font/google";

/** Display: a high-contrast Garamond, at home on temple inscriptions and tariff cards alike. */
export const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500", "600"], style: ["normal", "italic"], variable: "--nf-serif", display: "swap" });
/** Text: a clean geometric sans that echoes the AHG wordmark. */
export const sans = Jost({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--nf-sans", display: "swap" });
export const tamil = Noto_Serif_Tamil({ subsets: ["tamil"], weight: ["300", "400", "600"], variable: "--nf-tamil", display: "swap" });
