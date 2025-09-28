import TrackMapClient from "./TrackMapClient";
import { fetchTracks } from "@/lib/apiClient";
import styles from "@/styles/map.module.css";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function TracksMapPage() {
  const tracks = await fetchTracks();
  return (
    <div>
      <div className={`${styles.grid} absolute inset-0 z-10 opacity-60`}></div>
      <div className="w-full">
        <TrackMapClient tracks={tracks} />
      </div>
    </div>
  );
}
