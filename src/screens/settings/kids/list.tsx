import { ButtonLink } from "@/components/Button/Link";
import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { KidsCard } from "@/components/kids/Card";
import { useKids } from "@/dataStore";

export function KidsList() {
  const kids = useKids();
  return (
    <PageContainer
      header={<PageTitle backLink="/settings">Liste des enfants</PageTitle>}
    >
      <CardGrid>
        {kids.map((kid) => (
          <KidsCard key={kid.id} {...kid}>
            <ButtonLink to={`/settings/kids/${kid.id}`}>Modifier</ButtonLink>
          </KidsCard>
        ))}
      </CardGrid>
    </PageContainer>
  );
}
