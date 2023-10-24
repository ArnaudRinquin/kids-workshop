import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { KidsCard } from "@/components/kids/Card";
import { useKids } from "@/dataStore";

export default function Kids() {
  const kids = useKids();
  return (
    <PageContainer>
      <PageTitle backLink="/">Élèves</PageTitle>
      <CardGrid>
        {kids.map((kid) => (
          <KidsCard
            key={kid.id}
            id={kid.id}
            name={kid.name}
            level={kid.level}
            photoUrl={kid.photoUrl}
          />
        ))}
      </CardGrid>
    </PageContainer>
  );
}
