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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <MapContainer tracks={tracks} onSelectTrack={onSelectTrack} />;
}
