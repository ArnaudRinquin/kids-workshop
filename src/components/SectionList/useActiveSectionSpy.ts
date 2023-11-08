import { useState } from "react";

export function useActiveSectionTracker() {
  const [activeSectionId, setActiveSectionId] = useState<string | null>(null);

  return {
    activeSectionId,
    setActiveSectionId,
  };
}
