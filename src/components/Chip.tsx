import classNames from "classnames";
import { levelColorMap } from "./levelColorMap";

export type ChipVariant = "green" | "yellow" | "red";

type ChipProps = {
  variant: ChipVariant;
} & React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>;

export function Chip({ className, ...props }: ChipProps) {
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
