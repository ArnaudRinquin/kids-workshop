import { useWorkshop } from "@/dataStore";
import { Link, useParams } from "react-router-dom";

export default function Workshop() {
  const params = useParams<{ workshopId: string }>();
  if (!params.workshopId) {
    throw new Error("Missing workshopId");
  }
  const workshop = useWorkshop({ workshopId: params.workshopId });
  if (!workshop) {
    return <main>Workshop not found 🚨</main>;
  }
  return (
    <main className="">
      <h1>Workshop #{workshop.name}</h1>
      <img src={workshop.photoUrl ?? undefined} alt={workshop.name} />
      <Link to="/workshops">Back</Link>
      <Link to="/">Home</Link>
    </main>
  );
}
