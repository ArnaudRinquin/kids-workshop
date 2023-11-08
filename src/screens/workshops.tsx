import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
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
  return (
    <PageContainer header={<PageTitle backLink="/">Ateliers</PageTitle>}>
      {categories.map((category) => (
        <CategorySection key={category.id} categoryId={category.id} />
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
      <SectionTitle id={makeCategorySectionId({ categoryId })}>
        {category.name}
      </SectionTitle>
      <CardGrid>
        {workshops.map((workshop) => (
          <WorkshopCard key={workshop.id} {...workshop} />
        ))}
      </CardGrid>
    </>
  );
}

function makeCategorySectionId({ categoryId }: { categoryId: Category["id"] }) {
  return `category-${categoryId}`;
}
