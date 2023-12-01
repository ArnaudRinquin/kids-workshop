import classNames from "classnames";

export function SectionTitle({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h2
      className={classNames(
        "text-xl sm:text-2xl font-semibold my-2 text-sky-950",
        className
      )}
      {...props}
    />
  );
}
