import { Link } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  backLink?: string;
}

export default function PageTitle(props: Props) {
  return (
    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8 flex items-center gap-x-4">
      {props.backLink && <Link to={props.backLink}>&larr;</Link>}
      {props.children}
    </h1>
  );
}
