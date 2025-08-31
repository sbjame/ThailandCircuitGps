"use client";

import DashboardClient from "./DashboardClient";
import ClientOnly from "@/components/ClientOnly";

export default function DashboardClientWrapper() {
  return (
    <ClientOnly>
      <DashboardClient />
    </ClientOnly>
  );
}
