import { Link } from "react-router-dom";

interface Props {
  text: string;
  withBackLink?: boolean;
}

export default function PageTitle(props: Props) {
  const backLink = props.withBackLink ? (
    <Link to="/" className="mr-4">
      &larr;
    </Link>
  ) : null;

  return (
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl pb-12">
      {backLink}
      {props.text}
    </h1>
  );
}
