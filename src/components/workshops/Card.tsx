import { Link } from "react-router-dom";
import Card, { CardImage } from "../Card";
import placeholderSrc from "./default-workshop.svg";
import Chip, { ChipVariant } from "../Chip";
import { Workshop } from "@/types";

type Props = Workshop & {
  children?: React.ReactNode;
};

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
    <Card>
      <CardImage src={props.photoUrl ?? placeholderSrc} alt={props.name} />
      <div className="p-4 text-center gap-4 flex flex-col">
        <Link to={`/workshops/${props.id}`}>
          <h4 className="block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {props.name}
          </h4>
        </Link>
        <div className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
          <Chip variant={getVariableForDifficulty(props.difficulty)}>
            Difficulté: {props.difficulty}
          </Chip>
        </div>
        {props.children}
      </div>
    </Card>
  );
}
