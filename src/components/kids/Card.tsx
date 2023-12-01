import { Link } from "react-router-dom";
import { Card, CardImage } from "../Card";
import placeholderSrc from "./placeholder.png";
import { Kid } from "@/types";
import { KidLevelChip } from "./LevelChip";
import { useFromCache } from "@/cache";

type Props = Kid & {
  children?: React.ReactNode;
  titleControl?: React.ReactNode;
};

export function KidsCard(props: Props) {
  const src = useFromCache(props.photoUrl) ?? placeholderSrc;
  return (
    <Card>
      <div className="p-4 gap-4 flex flex-col">
        <Link to={`/kids/${props.id}`}>
          <h4 className="flex font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased items-center justify-between">
            {props.name} <KidLevelChip level={props.level} />
          </h4>
        </Link>
        <CardImage src={src ?? placeholderSrc} alt={props.name} />
        {props.children}
      </div>
    </Card>
  );
}
