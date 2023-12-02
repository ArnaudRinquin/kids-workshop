import { Link } from "react-router-dom";
import { Card, CardImage } from "../Card";
import placeholderSrc from "./placeholder.png";
import { Workshop } from "@/types";
import { useFromCache } from "@/cache";

type Props = Workshop & {
  children?: React.ReactNode;
  titleControl?: React.ReactNode;
};

// function getVariableForDifficulty(
//   difficulty: Workshop["difficulty"]
// ): ChipVariant {
//   if (difficulty <= 33) {
//     return "green";
//   } else if (difficulty <= 66) {
//     return "yellow";
//   } else {
//     return "red";
//   }
// }

export function WorkshopCard(props: Props) {
  const src = useFromCache(props.photoUrl) ?? placeholderSrc;
  return (
    <Card className="flex flex-col gap-4 p-4">
      <div
        style={{ gridColumn: props.children ? "1 / 3" : undefined }}
        className="flex items-start justify-between gap-2"
      >
        <Link to={`/workshops/${props.id}`}>
          <h4 className="text-2xl font-semibold text-blue-gray-900">
            {props.name}
          </h4>
        </Link>
        <div className="pt-2">{props.titleControl}</div>
      </div>

      <Link to={`/workshops/${props.id}`}>
        <CardImage src={src} alt={props.name} />
      </Link>
      {props.children && <div>{props.children}</div>}
    </Card>
  );
}
