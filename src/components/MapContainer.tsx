"use client";

import { useRef, useState, useEffect } from "react";
import { Track } from "@/types/track";
import TrackPin from "./TrackPin";
import styles from "@/styles/map.module.css";
import { AnimatePresence, motion } from "framer-motion";
import { SiGooglemaps } from "react-icons/si";

export default function MapContainer({
  tracks,
  onSelectTrack,
}: {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}) {
  const mapRef = useRef<HTMLDivElement>(null);
  const [windowWidth, setWindowWidth] = useState<number | null>(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number } | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);
  const [hoveredTrack, setHoveredTrack] = useState<Track | null>(null);

  const mapBounds = {
    latMin: 5.5,
    latMax: 20.5,
    lonMin: 97.3,
    lonMax: 105.7,
  };

<<<<<<< HEAD
  const handleWheel = (e: WheelEvent) => {
    e.preventDefault();
    const zoomSpeed = 0.002; //*Zoom speed
    setScale((prev) => {
      const next = prev - e.deltaY * zoomSpeed;
      return Math.min(Math.max(next, 0.5), 4); //* min/max scale
    });
  };
=======
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
>>>>>>> 25bd2363f59496d0453761595f456ac309d81d5d

  if (windowWidth === null) return null; // รอ client

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const zoomSpeed = 0.0015;
      setScale((prev) => {
        const next = prev - e.deltaY * zoomSpeed;
        return Math.min(Math.max(next, 0.5), 4);
      });
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (e.button !== 0) return;
      setDragging(true);
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!dragging || !lastPos) return;
      const dx = e.clientX - lastPos.x;
      const dy = e.clientY - lastPos.y;
      setPosition((prev) => ({ x: prev.x + dx, y: prev.y + dy }));
      setLastPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseUp = () => {
      setDragging(false);
      setLastPos(null);
    };

    const mapEl = mapRef.current;
    if (!mapEl) return;

    mapEl.addEventListener("wheel", handleWheel, { passive: false });
    mapEl.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      mapEl.removeEventListener("wheel", handleWheel);
      mapEl.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging, lastPos]);

  return (
    <div className="relative flex h-screen w-screen overflow-hidden">
      {/* --- Sidebar Desktop (≥ md) --- */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            key="sidebar-desktop"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="hidden md:block absolute left-0 top-0 h-full w-90 bg-white z-50 drop-shadow-xl drop-shadow-black/40"
          >
            <div
              className="absolute right-[-1.5rem] top-1/2 -translate-y-1/2 bg-amber-500 px-1 py-4 rounded-xl cursor-pointer group"
              onClick={() => setSelectedTrack(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="group-hover:scale-110 duration-300"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 20l-3 -8l3 -8" />
              </svg>
            </div>
            <div className="relative h-full p-4 py-8 flex flex-col overflow-y-auto scrollbar-hide">
              {/* ข้อมูล Track */}
              <div className="flex flex-col text-2xl">
                <h1 className="font-bold">{selectedTrack.name}</h1>
                <p className="text-base">
                  Circuit Length:{selectedTrack.length_km} km.
                </p>
                <p className="text-base">Type: {selectedTrack.type}</p>
                <a
                  href={selectedTrack.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base mt-4 font-bold flex items-center gap-2"
                >
                  <SiGooglemaps />
                  <h1>Google Maps</h1>
                </a>
                <h1 className="text-lg font-bold bg-gray-300 py-1 px-2 rounded-t-xl mt-2">
                  Weather Data
                </h1>
                <div className="text-base flex flex-col gap-2 bg-gray-200 py-2 px-4 rounded-b-xl">
                  <div className="flex justify-between">
                    <p>Min Temp (°C):</p>
                    {selectedTrack.weather_daily?.minTemp_c ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Max Temp (°C):</p>
                    {selectedTrack.weather_daily?.maxTemp_c ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Avg Temp (°C):</p>
                    {selectedTrack.weather_daily?.avgTemp_c ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Min Temp (°F):</p>
                    {selectedTrack.weather_daily?.minTemp_f ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Max Temp (°F):</p>
                    {selectedTrack.weather_daily?.maxTemp_f ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Avg Temp (°F):</p>
                    {selectedTrack.weather_daily?.avgTemp_f ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Max Wind Speed (m/s)</p>
                    {selectedTrack.weather_daily?.maxWind_mps ?? "-"}
                  </div>
                  <div className="flex justify-between">
                    <p>Chance of rain (%)</p>
                    {selectedTrack.weather_daily?.chanceOfRain ?? "-"}
                  </div>
                </div>
                <div className="flex flex-col gap-4 mt-2 mb-2">
                  {selectedTrack.images.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  ))}
                </div>

                {/* weather_daily: {
    minTemp_c: number;
    maxTemp_c: number;
    avgTemp_c: number;
    minTemp_f: number;
    maxTemp_f: number;
    avgTemp_f: number;
    maxWind_mps: number;
    chanceOfRain: number;
  }; */}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Sidebar Mobile (< md) --- */}
      <AnimatePresence>
        {selectedTrack && (
          <motion.div
            key="sidebar-mobile"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="block md:hidden absolute bottom-0 left-0 z-50 px-4 py-6 bg-white w-full drop-shadow-t-xl rounded-t-2xl h-[90vh] drop-shadow-xl drop-shadow-black"
          >
            <div
              className="absolute top-4 right-4 p-1 bg-amber-500 rounded-4xl cursor-pointer z-50"
              onClick={() => setSelectedTrack(null)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="icon icon-tabler icons-tabler-outline icon-tabler-x"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M18 6l-12 12" />
                <path d="M6 6l12 12" />
              </svg>
            </div>
            <div className="relative h-full flex flex-col overflow-y-auto scrollbar-hide">
              {/* ข้อมูล Track */}
              <div className="flex flex-col text-2xl">
                <h1 className="font-bold">{selectedTrack.name}</h1>
                <p className="text-base">
                  Circuit Length:{selectedTrack.length_km} km.
                </p>
                <p className="text-base">Type: {selectedTrack.type}</p>
                <a
                  href={selectedTrack.location_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base mt-4 font-bold flex items-center gap-2"
                >
                  <SiGooglemaps />
                  <h1>Google Maps</h1>
                </a>
                <div className="flex flex-col gap-4 mt-2 mb-2">
                  {selectedTrack.images.map((img: string, index: number) => (
                    <img
                      key={index}
                      src={img}
                      alt={`Image ${index + 1}`}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- Map --- */}
      <motion.div
        animate={{
          x: selectedTrack && windowWidth >= 768 ? "18vw" : "0vw",
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-1 flex justify-center items-center overflow-hidden z-40"
      >
        <div
          ref={mapRef}
          className={`${styles.mapWrapper} relative w-auto h-auto z-50 ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transformOrigin: "center center",
            transition: dragging ? "none" : "transform 0.05s linear",
          }}
        >
          <div className="absolute top-10 right-16 text-sm flex flex-col items-start gap-2">
            <div className="flex justify-start items-center gap-2">
              <div className="w-4 h-4 bg-lime-500 rounded-4xl"></div>
              <h1>Kart</h1>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded-4xl"></div>
              <h1>Car / Motocycle</h1>
            </div>
            <div className="flex justify-start items-center gap-2">
              <div className="w-4 h-4 bg-blue-500 rounded-4xl"></div>
              <h1>Car / Motocycle / Kart</h1>
            </div>
          </div>
          <img
            src="/images/thailand-map.svg"
            alt="Thailand Map"
            draggable={false}
            onMouseDown={(e) => e.preventDefault()}
            className="relative h-auto w-full object-cover drop-shadow-2xl drop-shadow-amber-400"
          />

          {tracks.map((track) => (
            <TrackPin
              key={track._id}
              track={track}
              onClick={() => setSelectedTrack(track)}
              onHover={() => setHoveredTrack(track)}
              onHoverOut={() => setHoveredTrack(null)}
              mapBounds={mapBounds}
            />
          ))}
        </div>
      </motion.div>
      <AnimatePresence>
        {hoveredTrack && (
          <motion.div
            key={hoveredTrack?._id}
            className="absolute top-0 left-0 w-screen h-screen opacity-100 z-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <img
              src={hoveredTrack.thumbnail}
              alt={hoveredTrack.name}
              className="w-full h-full object-cover"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
