import { Link } from "react-router-dom";
import Card, { CardImage } from "../Card";
import placeholderSrc from "./default-kid.svg";
import { Kid } from "@/types";
import { KidLevelChip } from "./LevelChip";
import { CachedCardImage } from "../Cache/Image";

type Props = Kid;

export function KidsCard(props: Props) {
  return (
    <Link to={`/kids/${props.id}`}>
      <Card>
        <div className="p-6 text-center">
          <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
            {props.name}
          </h4>
          {props.photoUrl ? (
            <CachedCardImage src={props.photoUrl} alt={props.name} />
          ) : (
            <CardImage src={placeholderSrc} alt={props.name} />
          )}
          <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
            <KidLevelChip level={props.level} />
          </p>
        </div>
      </Card>
    </Link>
  );
}
