/* Everything here is taken from the live abishotels.com. Where the live site disagrees with
   itself, the conflicting value is kept and marked CHECK so the client can confirm it. */

/** External booking engine. Leave empty until the client confirms the URL: every "Book" button
 *  then falls back to the hotel's WhatsApp so no visitor ever hits a dead end. */
export const BOOKING_URL = "";

export const GROUP = {
  name: "Abi's Hotel Group",
  phone: "+91 93454 15220",
  email: "info@abishotels.com",
  address: "387/2A, Pudukottai Main Road, Thanjavur, Tamil Nadu 613007",
  instagram: "https://www.instagram.com/abishotels",
  linkedin: "https://www.linkedin.com/company/abi-s-hotel-group/",
};

export const NAV = [
  { href: "/about-us/", label: "About" },
  { href: "/history/", label: "Our History" },
  { href: "/hotels/", label: "Hotels" },
  { href: "/explore-thanjavur/", label: "Explore Thanjavur" },
  { href: "/careers/", label: "Careers" },
  { href: "/contact-us/", label: "Contact" },
];

export const tel = (n: string) => `tel:${n.replace(/[^\d+]/g, "")}`;
