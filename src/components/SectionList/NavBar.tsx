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
        "text-2xl sm:text-3xl flex flex-row items-center gap-4 my-4 flex-wrap",
        className
      )}
      {...props}
    />
  );
}
