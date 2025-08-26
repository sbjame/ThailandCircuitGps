"use client";
import Link from "next/link";

export default function ToTracksMap() {
  return (
    <div className="flex justify-center items-center">
      <div className="absolute bottom-0 sm:bottom-40 md:top-1/2 right-1/2 translate-x-1/2 sm:-translate-x-0 sm:right-[2vw] md:right-[10vw] w-80 text-center flex flex-col justify-self-center items-center gap-2 md:gap-8 text-4xl font-bold z-50 p-4 text-black drop-shadow-sm drop-shadow-black/40">
        <div className="text-2xl font-light">
          <h1>Collect information and locations on racetracks and go-kart tracks in <span className="font-bold">Thailand</span>.</h1>
        </div>
        <div className="relative cursor-pointer px-4 py-2 pr-12 bg-amber-500 rounded hover:rounded-2xl flex gap-2 justify-center items-center transition-all duration-300 text-white group">
          <Link href="/tracksMap" className="cursor:pointer">Tracks Map</Link>
          <div className="absolute right-2 group-hover:right-0 flex space-x-[-20px] duration-300">
            <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 4l3 8l-3 8" /></svg>
            <svg  xmlns="http://www.w3.org/2000/svg"  width="32"  height="32"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="2"  strokeLinecap="round"  strokeLinejoin="round"  className="icon icon-tabler icons-tabler-outline icon-tabler-chevron-compact-right"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M11 4l3 8l-3 8" /></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
