import { useParams, useSearchParams } from "react-router-dom";
import { type OptionId } from "./types";

export function ProgressReport() {
  const { mode } = useParams<{ mode: OptionId }>();
  const [searchParams] = useSearchParams();

  const kidId = searchParams.get("kidId");
  const rawFrom = searchParams.get("from");
  const rawTo = searchParams.get("to");

  const from = rawFrom ? new Date(rawFrom) : null;
  const to = rawTo ? new Date(rawTo) : null;

  return (
    <div className="">
      <div>{mode}</div>
      <div>{kidId}</div>
      <div>{from?.toISOString()}</div>
      <div>{to?.toISOString()}</div>
    </div>
  );
}
