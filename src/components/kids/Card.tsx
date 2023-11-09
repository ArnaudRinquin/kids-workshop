import { Link } from "react-router-dom";
import Card, { CardImage } from "../Card";
import placeholderSrc from "./default-kid.svg";
import { Kid } from "@/types";
import { KidLevelChip } from "./LevelChip";
import { CachedCardImage } from "../Cache/Image";

type Props = Kid & {
  children?: React.ReactNode;
  titleControl?: React.ReactNode;
};

export function KidsCard(props: Props) {
  return (
    <Card>
      <div className="p-4 gap-4 flex flex-col">
        <Link to={`/kids/${props.id}`}>
          <h4 className="flex font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased items-center justify-between">
            {props.name} <KidLevelChip level={props.level} />
          </h4>
        </Link>
        {props.photoUrl ? (
          <CachedCardImage src={props.photoUrl} alt={props.name} />
        ) : (
          <CardImage src={placeholderSrc} alt={props.name} />
        )}
        {props.children}
      </div>
    </Card>
  );
}
