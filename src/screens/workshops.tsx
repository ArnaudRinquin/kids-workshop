import PageTitle from "@/components/PageTitle";
import { WorkshopCard } from "@/components/workshops/Card";
import { useWorkshops } from "@/dataStore";

export default function Workshops() {
  const workshops = useWorkshops();
  return (
    <main className="container mx-auto">
      <PageTitle backLink="/">Workshops</PageTitle>
      <div className="flex items-center justify-center gap-x-12">
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            id={workshop.id}
            name={workshop.name}
            difficulty={workshop.difficulty}
            photoUrl={workshop.photoUrl}
          />
        ))}
      </div>
    </main>
  );
}
