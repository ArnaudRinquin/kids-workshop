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
      className={classNames(className, "rounded-md text-blue-600 underline", {
        "decoration-wavy": isActive,
      })}
      style={{
        textDecorationSkipInk: "none",
      }}
    />
  );
}
