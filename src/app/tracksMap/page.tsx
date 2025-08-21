import TrackMapClient from "./TrackMapClient";
import { fetchTracks } from "@/lib/apiClient";

export default async function TracksMapPage() {
  const tracks = await fetchTracks();
  return <TrackMapClient tracks={tracks} />;
}
