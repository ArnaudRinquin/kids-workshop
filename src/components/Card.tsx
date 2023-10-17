import { Link } from "react-router-dom";
import Chip from "@/components/Chip";

export enum CardTypes {
  KID = "kid",
  WORKSHOP = "workshop",
}

const cardTypeUrlMap = {
  [CardTypes.KID]: (id: string) => `/kids/${id}`,
  [CardTypes.WORKSHOP]: (id: string) => `/workshops/${id}`,
};

const cardTypeDefaultPhotoMap = {
  [CardTypes.KID]: "public/default-kid.svg",
  [CardTypes.WORKSHOP]: "public/default-workshop.svg",
};

interface Props {
  id: string;
  type: CardTypes;
  name: string;
  level: string | number;
  photoUrl?: string;
}

export default function Card(props: Props) {
  const linkTo = cardTypeUrlMap[props.type](props.id);

  const photo = props.photoUrl ? props.photoUrl : cardTypeDefaultPhotoMap[props.type];

  return (
    <Link
      to={linkTo}
      className="relative flex w-96 flex-col rounded-xl bg-amber-50 bg-clip-border text-gray-700 shadow-md"
    >
      <div className="relative mx-4 mt-4 h-40 overflow-hidden rounded-xl bg-white bg-clip-content text-gray-700 shadow-lg">
        <img src={photo} alt={props.name} className="mx-auto w-full" />
      </div>
      <div className="p-6 text-center">
        <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
          {props.name}
        </h4>
        <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
          <Chip level={props.level} />
        </p>
      </div>
    </Link>
  );
}
