import { Link } from "react-router-dom";
import Card from "../Card";
import placeholderSrc from "../../../public/default-kid.svg";
import Chip, { ChipVariant } from "../Chip";
import { Kid, KidLevel } from "@/types";

type Props = Kid;

const chipVariantMap: Record<KidLevel, ChipVariant> = {
  beginner: "green",
  intermediate: "yellow",
  advanced: "red",
};

export function KidsCard(props: Props) {
  return (
    <Link to={`/kids/${props.id}`}>
      <Card>
        <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-content text-gray-700 shadow-lg">
          <img
            src={props.photoUrl ?? placeholderSrc}
            alt={props.name}
            className="mx-auto w-full"
          />
        </div>
        <div className="p-6 text-center">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {props.name}
          </h4>
          <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            <Chip variant={chipVariantMap[props.level]}>
              Level: {props.level}
            </Chip>
          </p>
        </div>
      </Card>
    </Link>
  );
}
