"use client";

import dynamic from "next/dynamic";

const AmenagementBehavior = dynamic(() => import("./AmenagementBehavior"), { ssr: false });

export default function AmenagementBehaviorLoader() {
  return <AmenagementBehavior />;
}
