import { BOOKING_URL } from "./site";

export type Room = { name: string; price: number; guests: number };
export type Feature = { title: string; text: string; image: string };
export type Hotel = {
  slug: "abis-inn" | "abis-residency" | "the-emerald";
  name: string;
  short: string;
  tier: string;
  since: number;
  /** theme key used for colours: see .t-inn / .t-residency / .t-emerald in globals.css */
  theme: "inn" | "residency" | "emerald";
  logo: string;
  tagline: string;
  kicker: string;
  intro: string;
  hero: string;
  card: string;
  rooms: Room[];
  amenities: string[];
  features?: Feature[];
  gallery: string[];
  contact: { address: string; phones: string[]; emails: string[]; whatsapp: string; instagram: string; mapQuery: string };
  notes?: string[];
};

const ALL_AMENITIES = ["security", "wifi", "laundry", "dining", "housekeeping", "parking", "meetings", "breakfast"];

export const HOTELS: Hotel[] = [
  {
    slug: "the-emerald",
    name: "The Emerald",
    short: "Emerald",
    tier: "Premium",
    since: 2025,
    theme: "emerald",
    logo: "/img/brand/emerald-logo.png",
    tagline: "Exquisite Rooms. Exceptional Service.",
    kicker: "The latest jewel in the crown",
    intro:
      "Welcome to The Emerald, the latest jewel in the crown of Abi's Hotel Group. Located in the cultural heart of Thanjavur, The Emerald offers a refined stay with exquisitely designed rooms, modern comforts, and exceptional service tailored to every guest. Whether you're here for business, leisure, or heritage exploration, our commitment to warm hospitality and attention to detail ensures a truly memorable experience.",
    hero: "/img/emerald/hero.jpg",
    card: "/img/emerald/room-3.jpg",
    rooms: [
      { name: "Standard Room", price: 3200, guests: 3 },
      { name: "Premium Suite", price: 3700, guests: 3 },
      { name: "Presidential Suite", price: 6000, guests: 4 },
    ],
    amenities: ALL_AMENITIES,
    gallery: Array.from({ length: 15 }, (_, i) => `/img/emerald/room-${i + 1}.jpg`),
    contact: {
      // CHECK: live site prints the PIN as "6130077"
      address: "70/2, Pudukottai Main Road, Stella Mary Nagar, Opp. Auxilium School, Thanjavur, Tamil Nadu 613007",
      phones: ["+91 93454 15220"],
      emails: ["reservations.theemerald@gmail.com"],
      whatsapp: "https://wa.me/message/U5UT6XNECPVEB1",
      instagram: "https://www.instagram.com/theemeraldbyabis",
      mapQuery: "The Emerald by Abi's, Pudukottai Main Road, Thanjavur",
    },
  },
  {
    slug: "abis-residency",
    name: "Abi's Residency",
    short: "Residency",
    tier: "Heritage quarter",
    since: 2021,
    theme: "residency",
    logo: "/img/brand/residency-logo.png",
    tagline: "Your gateway to Thanjavur's rich heritage.",
    kicker: "Steps from the Big Temple",
    intro:
      "Situated just a short walk from the UNESCO World Heritage site, Brihadeeswarar Temple, Abi's Residency offers a harmonious blend of comfort, convenience, and cultural immersion. Whether you're a pilgrim, tourist, or business traveller, our hotel provides an ideal base to explore the historic city of Thanjavur.",
    hero: "/img/residency/room-2.jpg",
    card: "/img/residency/room-1.jpg",
    rooms: [
      { name: "Silver Suite", price: 1700, guests: 3 },
      { name: "Gold Suite", price: 1900, guests: 3 },
      { name: "Platinum Suite", price: 3150, guests: 4 },
    ],
    amenities: ["security", "wifi", "laundry", "housekeeping"],
    gallery: ["/img/residency/room-2.jpg", "/img/residency/corridor.jpg", "/img/residency/room-1.jpg", "/img/residency/room-3.png", "/img/history/2021-residency.jpg"],
    contact: {
      address: "2958, Rajakrishnapuram, South Rampart, Thanjavur, Tamil Nadu 613001",
      phones: ["+91 89033 32696"],
      emails: ["abisresidency@gmail.com"],
      whatsapp: "https://wa.me/message/NO67CTSKD6M6E1",
      instagram: "https://www.instagram.com/abisresidency",
      mapQuery: "Abi's Residency, South Rampart, Thanjavur",
    },
  },
  {
    slug: "abis-inn",
    name: "Abi's Inn",
    short: "Inn",
    tier: "Apartment hotel",
    since: 2012,
    theme: "inn",
    logo: "/img/brand/inn-logo.png",
    tagline: "Experience comfort amidst heritage.",
    kicker: "Where it all began",
    intro:
      "Nestled in the heart of Thanjavur, Abi's Inn offers a serene retreat for travellers seeking both relaxation and cultural exploration. Located a short distance from the iconic Brihadeeswarar Temple and the bustling city centre, our hotel provides the perfect base to discover the rich history and traditions of this ancient city.",
    hero: "/img/inn/atrium.jpg",
    card: "/img/inn/atrium-2.jpg",
    rooms: [
      { name: "Silver Suite", price: 1800, guests: 3 },
      { name: "Gold Suite", price: 2200, guests: 3 },
      { name: "Platinum Suite", price: 4500, guests: 6 },
      { name: "Diamond Suite", price: 5000, guests: 6 },
    ],
    amenities: ALL_AMENITIES,
    features: [
      {
        title: "Banquet Halls",
        text: "A spacious venue for weddings, parties and corporate events, fully equipped with catering and event support. Our largest hall seats 250+ guests, and Rhythm Hall was Thanjavur's first eco-friendly banquet space.",
        image: "/img/inn/banquet.jpg",
      },
      {
        title: "Restaurant",
        text: "Delicious meals and beverages in a comfortable setting, ideal for casual dining, family outings and special occasions. Hot 'n' Spicy, out on the lawn, was Thanjavur's first lawn restaurant.",
        image: "/img/inn/restaurant.jpg",
      },
    ],
    gallery: ["/img/inn/atrium.jpg", "/img/history/2014-lawn.jpg", "/img/inn/atrium-2.jpg", "/img/inn/banquet.jpg", "/img/history/2015-rhythm.jpg", "/img/history/2012-atrium.jpg", "/img/inn/restaurant.jpg"],
    contact: {
      address: "387/2A, Pudukottai Main Road, Thanjavur, Tamil Nadu 613007",
      phones: ["+91 89032 82207", "+91 4362 232207"],
      // CHECK: the live page lists reservations@abishotelgroup.com (note: abishotelgroup, not abishotels)
      emails: ["hotelabisinn@gmail.com"],
      whatsapp: "https://wa.me/message/ME34RJDDNU5YD1",
      instagram: "https://www.instagram.com/hotelabisinn",
      mapQuery: "Abi's Inn, Pudukottai Main Road, Thanjavur",
    },
  },
];

export const hotel = (slug: Hotel["slug"]) => HOTELS.find((h) => h.slug === slug)!;

/** Where a "Book" button goes: the booking engine once configured, otherwise the hotel's WhatsApp. */
export const bookHref = (h?: Hotel) => BOOKING_URL || h?.contact.whatsapp || "/book-now/";

export const AMENITY_TEXT: Record<string, [string, string]> = {
  security: ["24/7 Security", "A dedicated team stands watch, day and night."],
  wifi: ["Free Wi-Fi", "High-speed connectivity in every room."],
  laundry: ["Laundry Service", "Convenient laundry to keep your stay hassle-free."],
  dining: ["In-Room Dining", "Delicious meals from the comfort of your room."],
  housekeeping: ["Daily Housekeeping", "Fresh, clean rooms maintained every day."],
  parking: ["Free Car Parking", "Hassle-free parking at no extra cost."],
  meetings: ["Meeting Facilities", "Well-equipped spaces for business and events."],
  breakfast: ["Breakfast Buffet", "Start the day with a varied, homely spread."],
};

export const inr = (n: number) => "₹" + n.toLocaleString("en-IN");
