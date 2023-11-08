import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { SectionListLink } from "@/components/SectionList/Link";
import { SectionNavBar } from "@/components/SectionList/NavBar";
import { SectionListWrapper } from "@/components/SectionList/Wrapper";
import { useActiveSectionTracker } from "@/components/SectionList/useActiveSectionSpy";
import { SectionTitle } from "@/components/SectionTitle";
import { WorkshopCard } from "@/components/workshops/Card";
import {
  useCategories,
  useCategory,
  useWorkshopsFromCategory,
} from "@/dataStore";
import { Category } from "@/types";

export default function Workshops() {
  const categories = useCategories();
  console.log(categories);
  const { activeSectionId, setActiveSectionId } = useActiveSectionTracker();
  return (
    <PageContainer
      header={
        <>
          <PageTitle backLink="/">Ateliers</PageTitle>
          <SectionNavBar>
            {categories.map((category) => (
              <SectionListLink
                href={`#${category.name}`}
                isActive={category.id === activeSectionId}
              >
                {category.name}
              </SectionListLink>
            ))}
          </SectionNavBar>
        </>
      }
    >
      {categories.map((category) => (
        <SectionListWrapper
          key={category.id}
          id={category.id}
          setActiveSectionId={setActiveSectionId}
        >
          <CategorySection categoryId={category.id} />
        </SectionListWrapper>
      ))}
    </PageContainer>
  );
}

export function CategorySection({
  categoryId,
}: {
  categoryId: Category["id"];
}) {
  const category = useCategory({ categoryId });
  const workshops = useWorkshopsFromCategory({ categoryId });
  if (workshops.length === 0 || !category) {
    return null;
  }
  return (
    <>
      <SectionTitle id={category.name}>{category.name}</SectionTitle>
      <CardGrid>
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} {...workshop} />
        ))}
      </CardGrid>
    </>
  );
}
