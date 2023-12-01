import { Link } from "react-router-dom";
import Card, { CardImage } from "../Card";
import placeholderSrc from "./default-workshop.svg";
import Chip, { ChipVariant } from "../Chip";
import { Workshop } from "@/types";
import { useFromCache } from "@/cache";

type Props = Workshop & {
  children?: React.ReactNode;
  titleControl?: React.ReactNode;
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
  const src = useFromCache(props.photoUrl) ?? placeholderSrc;
  return (
    <Card>
      <div className="p-4 gap-4 flex flex-col">
        <div className="flex items-start justify-between">
          <Link to={`/workshops/${props.id}`}>
            <h4 className="pl-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
              {props.name}
            </h4>
          </Link>
          {props.titleControl}
        </div>
        <Chip
          className="self-baseline"
          variant={getVariableForDifficulty(props.difficulty)}
        >
          Difficulté: {props.difficulty}
        </Chip>
        <CardImage src={src} alt={props.name} />
        {props.children}
      </div>
    </Card>
  );
}
