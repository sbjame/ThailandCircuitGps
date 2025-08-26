import Image from "next/image";
import RandomImage from "@/components/randomImage";
import ToTracksMap from "@/components/ToTracksMap";
import styles from "@/styles/map.module.css";

export default function Home() {
  return (
    <main className="relative h-[100vh]">
      <div className={`${styles.grid} absolute inset-0`}></div>
      <div className="flex flex-col items-center justify-self-center text-6xl md:text-9xl font-black h-[100%] w-[100%]">
        <h1 className="absolute top-[8vh] md:top-[17vh] left-[2vw] md:left-[10vw] text-amber-500 z-30">
          Thailand
        </h1>
        <h1 className="absolute top-[12vh] md:top-[26vh] left-[2vw] md:left-[10vw] text-amber-600 z-30">
          Circuits
        </h1>
        <h1 className="absolute top-[16vh] md:top-[35vh] left-[2vw] md:left-[10vw] text-amber-700 z-30">
          GPS
        </h1>
      </div>
      <div className="absolute top-[5vh] left-1/2 -translate-x-1/2 flex justify-self-center items- w-[100vw]">
        <RandomImage />
      </div>
      <div>
        <ToTracksMap />
      </div>
    </main>
  );
}
