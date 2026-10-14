import Link from "next/link";
import Kolam from "@/components/brand/Kolam";
import { Arrow } from "@/components/brand/Icons";

export default function NotFound() {
  return (
    <main data-nav="dark" className="night" style={{ minHeight: "100svh", display: "grid", placeItems: "center", textAlign: "center", overflow: "hidden", position: "relative" }}>
      <Kolam className="kolam-float" strokeWidth={0.4} />
      <div className="wrap" style={{ position: "relative" }}>
        <p className="kicker" style={{ justifyContent: "center" }}>Page not found</p>
        <h1 className="display">This door <em>is closed</em></h1>
        <p className="lede" style={{ margin: "24px auto 32px" }}>The page you were looking for has moved or never existed. Every other door is open.</p>
        <Link href="/" className="btn btn--gold">Return home <Arrow /></Link>
      </div>
    </main>
  );
}
