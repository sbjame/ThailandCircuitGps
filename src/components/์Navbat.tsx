"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="p-1 border border-amber-600">
      <Link href="/">Home</Link> | <Link href="/tracksMap">Tracks Map</Link>
    </nav>
  );
}
