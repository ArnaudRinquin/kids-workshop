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
    <Card
      className="grid p-4 gap-4 justify-between"
      style={{ gridTemplateColumns: "minmax(150px, 300px)" }}
    >
      <div
        style={{ gridColumn: props.children ? "1 / 3" : undefined }}
        className="flex items-center justify-between gap-2"
      >
        <Link to={`/workshops/${props.id}`}>
          <h4 className="text-2xl font-semibold text-blue-gray-900">
            {props.name}
          </h4>
        </Link>
        {props.titleControl}
      </div>

      <Link to={`/workshops/${props.id}`} style={{ gridColumn: 1, gridRow: 2 }}>
        <CardImage src={src} alt={props.name} />
      </Link>
      {props.children && (
        <div style={{ gridColumn: 2, gridRow: 2 }}>{props.children}</div>
      )}
    </Card>
  );
}
