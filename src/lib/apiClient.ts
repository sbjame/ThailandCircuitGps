import { axiosInstance } from "./axiosInstance";
import { Track } from "@/types/track";

export async function fetchTracks(): Promise<Track[]> {
    const res = await axiosInstance.get('/circuit')
    return res.data;
}