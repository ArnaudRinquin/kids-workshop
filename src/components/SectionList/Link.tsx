import classNames from "classnames";

type SectionListLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
> & {
  isActive?: boolean;
};
export function SectionListLink({
  className,
  isActive,
  ...props
}: SectionListLinkProps) {
  return (
    <a
      {...props}
      className={classNames(
        className,
        "rounded-md px-3 py-2", // text-sm font-medium",
        {
          "bg-indigo-600 text-white": isActive,
          "border border-white hover:border-gray-200 hover:bg-gray-200 text-indigo-600":
            !isActive,
        }
      )}
    />
  );
}
