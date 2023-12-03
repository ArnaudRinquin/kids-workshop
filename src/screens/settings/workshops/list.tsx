import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/Link";
import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { WorkshopCard } from "@/components/workshops/Card";
import { useWorkshops, useStore } from "@/dataStore";

export function WorkshopsList() {
  const workshops = useWorkshops();
  const { removeWorkshop } = useStore();
  return (
    <PageContainer
      header={
        <PageTitle backLink="/settings">
          Liste des enfants
          <ButtonLink to="/settings/workshops/create">Ajouter</ButtonLink>
        </PageTitle>
      }
    >
      <CardGrid>
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} {...workshop}>
            <div className="flex flex-col gap-4">
              <ButtonLink to={`/settings/workshops/${workshop.id}`}>
                Modifier
              </ButtonLink>
              <Button
                className="w-full from-red-400 to-pink-500"
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer cet enfant ?"
                    )
                  ) {
                    removeWorkshop({ workshopId: workshop.id });
                  }
                }}
              >
                Supprimer
              </Button>
            </div>
          </WorkshopCard>
        ))}
      </CardGrid>
    </PageContainer>
  );
}
