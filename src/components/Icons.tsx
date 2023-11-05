import classNames, { Argument as ClassNamesArgument } from "classnames";

export function IconBookmark({
  className,
}: {
  className?: ClassNamesArgument;
}) {
  return (
    <svg className={classNames("h-6 w-6", className)}>
      <path d="M5 4a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v14l-5-2.5L5 18V4Z"></path>
    </svg>
  );
}
