'use client';
import { useState } from "react";
import { Track } from '@/types/track'
import MapContainer from '@/components/MapContainer'
// import TrackInfo from '@/components/TrackInfo'
import { useTracks } from "@/hooks/useTracks";

type Props = {
    tracks: Track[];
}

export default function TrackMapClient({ tracks }: Props) {
    const [selectedTrack, setSelectedTrack] = useState<Track | null>(null);

    
    return(
        <div>
            <MapContainer tracks={tracks} onSelectTrack={setSelectedTrack}/>
            {/* {selectedTrack && <TrackInfo track={selectedTrack}/>} */}
        </div>
    )
}