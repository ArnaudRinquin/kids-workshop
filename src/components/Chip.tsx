interface Props {
  level: string | number;
}

// TODO: let's unify the "level/difficulty" type on kids and workshops.
const levelColorMap: { [l: number | string]: string } = {
  1: "bg-green-500",
  2: "bg-yellow-500",
  3: "bg-red-500",
  small: "bg-green-500",
  medium: "bg-yellow-500",
  large: "bg-red-500",
};

export default function Chip(props: Props) {
  const bgColor = levelColorMap[props.level];

  return (
    <div
      className={`${bgColor} center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white`}
    >
      <div className="mt-px">Level: {props.level}</div>
    </div>
  );
}
