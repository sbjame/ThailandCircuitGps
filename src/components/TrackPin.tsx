import { Track } from "@/types/track";

type Props = {
  track: Track;
  onClick: () => void;
  mapBounds: { latMin: number; latMax: number; lonMin: number; lonMax: number };
};

export default function TrackPin({ track, onClick, mapBounds }: Props) {
  const { lat, lon } = track.Circ_location_coords;

  if (!mapBounds) {
    console.error("mapBounds is undefined!");
    return null;
  }

  const topPercent =
    ((mapBounds.latMax - lat) / (mapBounds.latMax - mapBounds.latMin)) * 100;
  const leftPercent =
    ((lon - mapBounds.lonMin) / (mapBounds.lonMax - mapBounds.lonMin)) * 100;

  return (
    <button
      onClick={onClick}
      style={{ top: `${topPercent}%`, left: `${leftPercent}%` }}
      className="absolute w-5 h-5 flex justify-center items-center rounded-2xl cursor-pointer border-2 border-red-600 bg-white px-2 py-1"
    >
      <div className="relative">
        <div className="absolute top-0 left-0 z-50">{track.Circ_name}</div>
      </div>
    </button>
  );
}
