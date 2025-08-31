"use client";

import MapContainer from "./MapContainer";
import { Track } from "@/types/track";
import ClientOnly from "./ClientOnly";

export default function MapContainerWrapper({
  tracks,
  onSelectTrack,
}: {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}) {
  return (
    <ClientOnly>
      <MapContainer tracks={tracks} onSelectTrack={onSelectTrack} />
    </ClientOnly>
  );
}
