import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  backLink?: string;
}

export default function PageTitle(props: Props) {
  return (
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pb-12">
      {props.backLink && (
        <Link to={props.backLink} className="mr-4">
          &larr;
        </Link>
      )}
      {props.children}
    </h1>
  );
}
