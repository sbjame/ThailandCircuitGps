"use client";

import { useState, useEffect } from "react";
import DashboardClient from "./DashboardClient";
import ClientOnly from "@/components/ClientOnly";

export default function DashboardClientWrapper() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null; // รอจน client-side

  return (
    <ClientOnly>
      <DashboardClient />
    </ClientOnly>
  );
}
