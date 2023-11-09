import classNames from "classnames";

export type ChipVariant = "green" | "yellow" | "red";

type ChipProps = {
  variant: ChipVariant;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

// TODO: let's unify the "level/difficulty" type on kids and workshops.
const levelColorMap: Record<ChipVariant, string> = {
  green: "bg-green-500",
  yellow: "bg-yellow-500",
  red: "bg-red-500",
};

export default function Chip({ className, ...props }: ChipProps) {
  const bgColor = levelColorMap[props.variant];

  return (
    <div
      className={classNames(
        bgColor,
        "center relative inline-block select-none whitespace-nowrap rounded-lg bg-blue-500 py-1 px-2 align-baseline font-sans text-xs font-bold uppercase leading-none text-white",
        className
      )}
    >
      <div className="mt-px">{props.children}</div>
    </div>
  );
}
