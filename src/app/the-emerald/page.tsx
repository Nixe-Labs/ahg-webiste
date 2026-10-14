import type { Metadata } from "next";
import HotelPage from "@/components/hotel/HotelPage";
import { hotel } from "@/lib/hotels";

const h = hotel("the-emerald");
export const metadata: Metadata = { title: h.name, description: "The Emerald by Abi's, Thanjavur: the group's premium hotel, with exquisitely designed rooms, in-room dining and exceptional service in the cultural heart of the city." };

export default function Page() {
  return <HotelPage h={h} />;
}
