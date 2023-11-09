import classnames from "classnames";
import { buttonClassName } from ".";

export function ButtonLabel({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
>) {
  return (
    <label className={classnames(buttonClassName, className)} {...props} />
  );
}
