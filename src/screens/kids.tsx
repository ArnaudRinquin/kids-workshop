import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { SectionListLink } from "@/components/SectionList/Link";
import { SectionNavBar } from "@/components/SectionList/NavBar";
import { SectionListWrapper } from "@/components/SectionList/Wrapper";
import { useActiveSectionTracker } from "@/components/SectionList/useActiveSectionSpy";
import { SectionTitle } from "@/components/SectionTitle";
import { KidsCard } from "@/components/kids/Card";
import { useKidsAtLevel } from "@/dataStore";

export function Kids() {
  const categories = [
    {
      id: "petits",
      name: "Petits",
      kids: useKidsAtLevel({ level: "beginner" }),
    },
    {
      id: "moyens",
      name: "Moyens",
      kids: useKidsAtLevel({ level: "intermediate" }),
    },
    {
      id: "grands",
      name: "Grands",
      kids: useKidsAtLevel({ level: "advanced" }),
    },
  ].filter((category) => category.kids.length > 0);

  const { activeSectionId, setActiveSectionId } = useActiveSectionTracker();

  return (
    <PageContainer
      header={
        <div className="flex flex-wrap items-end justify-between">
          <PageTitle backLink="/">Élèves</PageTitle>
          <SectionNavBar>
            {categories.map((category) => (
              <SectionListLink
                key={category.id}
                href={`#${category.name}`}
                isActive={category.id === activeSectionId}
              >
                {category.name}
              </SectionListLink>
            ))}
          </SectionNavBar>
        </div>
      }
    >
      {categories.map((category) => (
        <SectionListWrapper
          key={category.id}
          id={category.id}
          setActiveSectionId={setActiveSectionId}
        >
          <SectionTitle id={category.name}>{category.name}</SectionTitle>
          <CardGrid minItemWidth={200}>
            {category.kids.map((kid) => (
              <KidsCard
                key={kid.id}
                id={kid.id}
                name={kid.name}
                level={kid.level}
                photoUrl={kid.photoUrl}
              />
            ))}
          </CardGrid>
        </SectionListWrapper>
      ))}
    </PageContainer>
  );
}
