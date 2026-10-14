import type { Metadata } from "next";
import HotelPage from "@/components/hotel/HotelPage";
import { hotel } from "@/lib/hotels";

const h = hotel("abis-inn");
export const metadata: Metadata = { title: h.name, description: "Abi's Inn, Thanjavur's first apartment hotel: spacious suites, banquet halls for 250+ guests, a restaurant and Hot 'n' Spicy lawn dining, near the Brihadeeswarar Temple." };

export default function Page() {
  return <HotelPage h={h} />;
}
