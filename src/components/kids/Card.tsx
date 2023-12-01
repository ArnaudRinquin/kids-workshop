import { Link } from "react-router-dom";
import { Card, CardImage } from "../Card";
import placeholderSrc from "./placeholder.png";
import { Kid } from "@/types";
import { useFromCache } from "@/cache";

type Props = Kid & {
  children?: React.ReactNode;
  titleControl?: React.ReactNode;
};

export function KidsCard(props: Props) {
  const src = useFromCache(props.photoUrl) ?? placeholderSrc;
  return (
    <Card
      className="grid p-4 gap-4"
      style={{ gridTemplateColumns: "minmax(150px, 200px)" }}
    >
      <Link
        to={`/kids/${props.id}`}
        style={{ gridColumn: props.children ? "1 / 3" : undefined }}
      >
        <h4 className="flex text-2xl font-semibold text-blue-gray-900 items-center justify-between gap-2">
          {props.name}
        </h4>
      </Link>
      <Link to={`/kids/${props.id}`} style={{ gridColumn: 1, gridRow: 2 }}>
        <CardImage src={src ?? placeholderSrc} alt={props.name} />
      </Link>
      {props.children && (
        <div style={{ gridColumn: 2, gridRow: 2 }}>{props.children}</div>
      )}
    </Card>
  );
}
