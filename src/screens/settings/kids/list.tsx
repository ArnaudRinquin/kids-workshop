import { Button } from "@/components/Button";
import { ButtonLink } from "@/components/Button/Link";
import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { KidsCard } from "@/components/kids/Card";
import { useKids, useStore } from "@/dataStore";

export function KidsList() {
  const kids = useKids();
  const { removeKid } = useStore();
  return (
    <PageContainer
      header={
        <PageTitle backLink="/settings">
          Liste des enfants
          <ButtonLink to="/settings/kids/create">Ajouter</ButtonLink>
        </PageTitle>
      }
    >
      <CardGrid>
        {kids.map((kid) => (
          <KidsCard key={kid.id} {...kid}>
            <div className="flex flex-col gap-4">
              <ButtonLink to={`/settings/kids/${kid.id}`}>Modifier</ButtonLink>
              <Button
                className="w-full from-red-400 to-pink-500"
                onClick={() => {
                  // eslint-disable-next-line no-alert
                  if (
                    window.confirm(
                      "Êtes-vous sûr de vouloir supprimer cet enfant ?"
                    )
                  ) {
                    removeKid({ kidId: kid.id });
                  }
                }}
              >
                Supprimer
              </Button>
            </div>
          </KidsCard>
        ))}
      </CardGrid>
    </PageContainer>
  );
}
