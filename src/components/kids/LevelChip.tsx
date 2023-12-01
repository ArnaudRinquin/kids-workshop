import { KidLevel } from "@/types";
import { Chip, ChipVariant } from "../Chip";

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

export function KidLevelChip(props: { level: KidLevel }) {
  return (
    <Chip variant={chipVariantMap[props.level]}>
      Niveau : {chipLabelMap[props.level]}
    </Chip>
  );
}
