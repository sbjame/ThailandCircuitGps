"use client";
import { useState } from "react";
import { Track } from "@/types/track";
import dynamic from "next/dynamic";
const MapContainer = dynamic(() => import('@/components/MapContainer'), {ssr: false})
// import MapContainer from '@/components/MapContainer'
import { useTracks } from "@/hooks/useTracks";

type Props = {
  tracks: Track[];
};

export default function TrackMapClient({ tracks }: Props) {
  const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

  return (
    <div>
      <MapContainer tracks={tracks} onSelectTrack={setSelectedTrack}/>
    </div>
  );
}
