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
        "text-2xl font-semibold my-2 text-gray-900",
        className
      )}
      {...props}
    />
  );
}
