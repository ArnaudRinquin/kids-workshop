import classnames from "classnames";
import { Link, LinkProps } from "react-router-dom";

export function ButtonLink({ className, ...props }: LinkProps) {
  return (
    <Link
      className={classnames(
        "flex justify-center rounded-md bg-indigo-600 px-5 py-5 text-xl font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
        className
      )}
      {...props}
    />
  );
}
