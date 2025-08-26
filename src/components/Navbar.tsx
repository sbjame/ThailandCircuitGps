"use client";
import Link from "next/link";
import styles from "@/styles/map.module.css"

export default function Navbar() {
  return (
    <nav className="absolute top-10 right-0 z-50 px-6 py-2 text-base text-white bg-amber-500 gap-4 rounded-l-xl flex justify-center items-center">
      <Link href="/tracksMap" className={`${styles.btn} btn cursor:pointer`}>
        Tracks Map
      </Link>
      <Link href="/dashboard" className={`${styles.btn} btn cursor:pointer`}>
        Dashboard
      </Link>
    </nav>
  );
}
