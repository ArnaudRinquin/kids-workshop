import classNames from "classnames";

export function SectionNavBar({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) {
  return (
    <nav
      className={classNames(
        "flex flex-row items-center gap-2 my-4 flex-wrap",
        className
      )}
      {...props}
    />
  );
}
