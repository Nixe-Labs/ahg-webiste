import type { Metadata } from "next";
import HotelPage from "@/components/hotel/HotelPage";
import { hotel } from "@/lib/hotels";

const h = hotel("abis-residency");
export const metadata: Metadata = { title: h.name, description: "Abi's Residency, Thanjavur: comfortable suites a short walk from the Brihadeeswarar Temple, the ideal base for pilgrims, tourists and business travellers." };

export default function Page() {
  return <HotelPage h={h} />;
}
