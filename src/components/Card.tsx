// import { Link } from "react-router-dom";
// import Chip from "@/components/Chip";

// export enum CardTypes {
//   KID = "kid",
//   WORKSHOP = "workshop",
// }

// const cardTypeUrlMap = {
//   [CardTypes.KID]: (id: string) => `/kids/${id}`,
//   [CardTypes.WORKSHOP]: (id: string) => `/workshops/${id}`,
// };

// const cardTypeDefaultPhotoMap = {
//   [CardTypes.KID]: "public/default-kid.svg",
//   [CardTypes.WORKSHOP]: "public/default-workshop.svg",
// };

interface Props {
  children: React.ReactNode;
}

// const linkTo = cardTypeUrlMap[props.type](props.id);

// const photo = props.photoUrl
//   ? props.photoUrl
//   : cardTypeDefaultPhotoMap[props.type];

export default function Card(props: Props) {
  return (
    <div className="relative flex w-96 flex-col rounded-xl bg-amber-50 bg-clip-border text-gray-700 shadow-md">
      {props.children}
    </div>
  );
}
