import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { WorkshopCard } from "@/components/workshops/Card";
import { useWorkshops } from "@/dataStore";

export default function Workshops() {
  const workshops = useWorkshops();
  return (
    <PageContainer>
      <PageTitle backLink="/">Workshops</PageTitle>
      <CardGrid>
        {workshops.map((workshop) => (
          <WorkshopCard
            key={workshop.id}
            id={workshop.id}
            name={workshop.name}
            difficulty={workshop.difficulty}
            photoUrl={workshop.photoUrl}
          />
        ))}
      </CardGrid>
    </PageContainer>
  );
}
