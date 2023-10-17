export type ChipVariant = "green" | "yellow" | "red";

type Props = {
  variant: ChipVariant;
  children: React.ReactNode;
};

// TODO: let's unify the "level/difficulty" type on kids and workshops.
const levelColorMap: Record<ChipVariant, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

export default function Chip(props: Props) {
  const bgColor = levelColorMap[props.variant];

  return (
    <div
      className={`${bgColor} center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white`}
    >
      <div className="mt-px">{props.children}</div>
    </div>
  );
}
