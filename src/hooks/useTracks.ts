import useSWR from "swr";
import { Track } from "@/types/track";
import { axiosInstance } from "@/lib/axiosInstance";

const fetcher = (url: string) => axiosInstance.get(url).then(res => res.data)

export function useTracks(){
    const {data, error, isLoading } = useSWR<Track[]>('/circuit', fetcher)

    return {
        tracks: data,
        isLoading,
        isError: error,
    }
}
