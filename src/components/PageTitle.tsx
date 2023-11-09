import classNames from "classnames";
import { Link } from "react-router-dom";

type Props = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
> & {
  backLink?: string;
};

export default function PageTitle({ className, ...props }: Props) {
  return (
    <h1
      className={classNames(
        "my-4 text-3xl sm:text-5xl font-bold tracking-tight text-gray-900 flex items-center gap-x-4",
        className
      )}
    >
      {props.backLink && <Link to={props.backLink}>&larr;</Link>}
      {props.children}
    </h1>
  );
}
