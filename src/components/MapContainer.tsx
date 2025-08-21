import { Track } from "@/types/track";
import TrackPin from "./TrackPin";
import styles from "@/styles/map.module.css";

export default function MapContainer({
  tracks,
  onSelectTrack,
}: {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}) {
  // กำหนดช่วงพิกัดประเทศไทยเพื่อ normalize
//   const mapBounds = {
//     latMin: 6.615, // latitude ต่ำสุดบน map
//     latMax: 29.465, // latitude สูงสุดบน map
//     lonMin: 97.295, // longitude ต่ำสุดบน map
//     lonMax: 106.536, // longitude สูงสุดบน map
//   };

  const mapBounds = {
    latMin: 5.5,
    latMax: 20.5,
    lonMin: 97.3,
    lonMax: 105.7,
  };

  return (
    <div className={`${styles.mapWrapper} relative w-full h-auto`}>
      <img
        src="/images/thailand-map.svg"
        alt="Thailand Map"
        className={`${styles.map} w-full h-full object-cover`}
      />
      {tracks.map((track) => (
        <TrackPin
          key={track._id}
          track={track}
          onClick={() => onSelectTrack(track)}
          mapBounds={mapBounds} // ส่ง mapBounds เข้าไป
        />
      ))}
    </div>
  );
}
