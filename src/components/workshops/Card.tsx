import { Link } from "react-router-dom";
import Card from "../Card";
import placeholderSrc from "../../../public/default-kid.svg";
import Chip, { ChipVariant } from "../Chip";
import { Workshop } from "@/types";

type Props = Workshop;

function getVariableForDifficulty(
  difficulty: Workshop["difficulty"]
): ChipVariant {
  if (difficulty <= 33) {
    return "green";
  } else if (difficulty <= 66) {
    return "yellow";
  } else {
    return "red";
  }
}

export function WorkshopCard(props: Props) {
  return (
    <Link to={`/workshops/${props.id}`}>
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
            <Chip variant={getVariableForDifficulty(props.difficulty)}>
              Difficulty: {props.difficulty}
            </Chip>
          </p>
        </div>
      </Card>
    </Link>
  );
}
