import { KidLevel } from "@/types";
import Chip, { ChipVariant } from "../Chip";

const chipVariantMap: Record<KidLevel, ChipVariant> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

export function KidLevelChip(props: { level: KidLevel }) {
  return (
    <Chip variant={chipVariantMap[props.level]}>Level: {props.level}</Chip>
  );
}
