import { Track } from "@/types/track";
import { col } from "framer-motion/client";
import { useEffect, useState } from "react";

type Props = {
  track: Track;
  onClick: () => void;
  mapBounds: { latMin: number; latMax: number; lonMin: number; lonMax: number };
  onHover?: (track: Track) => void;
  onHoverOut?: () => void;
};

export default function TrackPin({ track, onClick, mapBounds, onHover, onHoverOut }: Props) {
  const { lat, lon } = track.location_coords;
  const type = track.type;
  const [color, setColor] = useState("border-lime-500")
  useEffect(() => {

    if (type === "Automotive") {
      setColor("border-orange-500")
    }
    if(type === "Automotive & Kart"){
      setColor("border-blue-500")
    }
  }, [])


  if (!mapBounds) {
    console.error("mapBounds is undefined!");
    return null;
  }

  const topPercent =
    ((mapBounds.latMax - lat) / (mapBounds.latMax - mapBounds.latMin)) * 100;
  const leftPercent =
    ((lon - mapBounds.lonMin) / (mapBounds.lonMax - mapBounds.lonMin)) * 100;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => onHover && onHover(track)}
      onMouseLeave={() => onHoverOut && onHoverOut()}
      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
      className={`absolute w-4 h-4 border-4 flex justify-center items-center rounded-2xl cursor-pointer px-1 py-1 ${color} hover:scale-120`}
    >
    </div>
  );
}
