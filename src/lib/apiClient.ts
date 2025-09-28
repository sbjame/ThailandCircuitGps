import { axiosInstance } from "./axiosInstance";
import { Track } from "@/types/track";

export async function fetchTracks(): Promise<Track[]> {
  const res = await axiosInstance.get('/circuit', {
    headers: { 'Cache-Control': 'no-cache' },
    params: { _t: Date.now() }
  });
  return res.data;
}
