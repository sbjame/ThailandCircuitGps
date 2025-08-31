"use client";

import { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import { Track } from "@/types/track";

export default function MapContainerWrapper({
  tracks,
  onSelectTrack,
}: {
  tracks: Track[];
  onSelectTrack: (track: Track) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return <MapContainer tracks={tracks} onSelectTrack={onSelectTrack} />;
}
