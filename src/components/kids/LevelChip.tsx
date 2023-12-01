import { KidLevel } from "@/types";
import { Chip, ChipVariant, type ChipProps } from "../Chip";

const chipVariantMap: Record<KidLevel, ChipVariant> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

const chipLabelMap: Record<KidLevel, string> = {
  beginner: "petit",
  intermediate: "moyen",
  advanced: "grand",
};

export function KidLevelChip({
  level,
  ...props
}: Omit<ChipProps, "variant"> & { level: KidLevel }) {
  return (
    <Chip {...props} variant={chipVariantMap[level]}>
      Niveau : {chipLabelMap[level]}
    </Chip>
  );
}
