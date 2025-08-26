import { Track } from "@/types/track";

export default function TrackInfoCard({ track }: { track: Track }) {
  const w = track.weather_daily;
  return (
    <div className="m-0 p-0 cursor-default">
      <div className="absolute top-0 left-0  bg-white h-screen px-8 py-4 drop-shadow-xl drop-shadow-black/40 p-1 mt-1">
        <h2>{track.name}</h2>
        <p>Type: {track.type}</p>
        <p>Length: {track.length_km} km</p>
        <p>
          Weather (avg): {w.avgTemp_c} | Max wind: {w.maxWind_mps} m/s
        </p>
      </div>
    </div>
  );
}
