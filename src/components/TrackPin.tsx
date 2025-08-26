import { Track } from "@/types/track";

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
  let color = "border-lime-500";
  if (type === "Automotive") {
    color = "border-orange-500";
  }

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
      onMouseEnter={() => onHover && onHover(track)}   // เรียกเมื่อ hover
      onMouseLeave={() => onHoverOut && onHoverOut()} // เรียกเมื่อ hover ออก
      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
      className={`absolute w-4 h-4 border-4 flex justify-center items-center rounded-2xl cursor-pointer px-1 py-1 ${color} hover:scale-120`}
    >
    </div>
  );
}
