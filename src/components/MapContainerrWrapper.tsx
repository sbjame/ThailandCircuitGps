"use client";

import ClientOnly from "./ClientOnly";
import MapContainer from "./MapContainer";
import { Track } from "@/types/track";

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
