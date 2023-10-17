import Card, { CardTypes } from "@/components/Card";
import PageTitle from "@/components/PageTitle";
import { useWorkshops } from "@/dataStore";

export default function Workshops() {
  const workshops = useWorkshops();
  return (
    <main className="container mx-auto">
      <PageTitle text="Workshops" withBackLink />
      <div className="flex items-center justify-center gap-x-12">
        {workshops.map((workshop) => (
          <Card
            key={workshop.id}
            type={CardTypes.WORKSHOP}
            id={workshop.id}
            name={workshop.name}
            level={workshop.difficulty}
            photoUrl={workshop.photoUrl}
          />
        ))}
      </div>
    </main>
  );
}
