import { Track } from "@/types/track";
// import { formatTemp } from "@/utils/formatLength";

export default function TrackInfoCard({ track }: { track: Track }) {
  const w = track.Circ_weather_daily;
  return (
    <div className="border-2 border-red-600 p-1 mt-1">
      <h2>{track.Circ_name}</h2>
      <p>Type: {track.Circ_type}</p>
      <p>Length: {track.Circ_length_km} km</p>
      <p>
        {/* Weather (avg): {formatTemp(w.avgTemp_c)} | Max wind: {w.maxWind_mps} m/s */}
      </p>
    </div>
  );
}
