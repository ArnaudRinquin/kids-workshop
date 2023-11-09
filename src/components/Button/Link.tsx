import classnames from "classnames";
import { Link, LinkProps } from "react-router-dom";
import { buttonClassName } from ".";

export function ButtonLink({ className, ...props }: LinkProps) {
  return <Link className={classnames(buttonClassName, className)} {...props} />;
}
