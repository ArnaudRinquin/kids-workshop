import { CachedImageInput } from "@/components/Cache/ImageInput";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { SectionListLink } from "@/components/SectionList/Link";
import { SectionNavBar } from "@/components/SectionList/NavBar";
import { SectionListWrapper } from "@/components/SectionList/Wrapper";
import { useActiveSectionTracker } from "@/components/SectionList/useActiveSectionSpy";
import {
  useBookmarkedKidsForWorkshop,
  useKidsInProgressForWorkshop,
  useKidsStartableForWorkshop,
  useKidsValidatedForWorkshop,
  useSetWorkshopPhotoUrl,
  useWorkshop,
} from "@/dataStore";
import { Kid } from "@/types";
import { useParams } from "react-router-dom";
import { WorkshopKidsSection } from "./section";
import React from "react";

export default function Workshop() {
  const params = useParams<{ workshopId: string }>();
  if (!params.workshopId) {
    throw new Error("Missing workshopId");
  }
  const workshop = useWorkshop({ workshopId: params.workshopId });
  const setWorkshopPhoto = useSetWorkshopPhotoUrl();

  const { activeSectionId, setActiveSectionId } = useActiveSectionTracker();

  const bookmarkedKids = useBookmarkedKidsForWorkshop({
    workshopId: params.workshopId,
  });
  const inProgressKids = useKidsInProgressForWorkshop({
    workshopId: params.workshopId,
  });
  const availableKids = useKidsStartableForWorkshop({
    workshopId: params.workshopId,
  });
  const validatedKids = useKidsValidatedForWorkshop({
    workshopId: params.workshopId,
  });

  // we don't want these categories to change until we navigate to another workshop or page
  // so we memoize the results with an empty dependency array
  const categories: { id: string; label: string; kids: Kid[] }[] =
    React.useMemo(
      () =>
        [
          {
            id: "bookmarked",
            label: "Épinglés",
            kids: bookmarkedKids,
          },
          {
            id: "in-progress",
            label: "En cours",
            kids: inProgressKids,
          },
          {
            id: "available",
            label: "Disponibles",
            kids: availableKids,
          },
          {
            id: "validated",
            label: "Validés",
            kids: validatedKids,
          },
        ].filter((category) => category.kids.length),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

  if (!workshop) {
    return (
      <PageContainer>
        <PageTitle backLink="/workshops">Atelier non trouvé 🚨</PageTitle>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      header={
        <div className="flex flex-wrap items-end justify-between">
          <PageTitle backLink="/workshops">
            {workshop.name}
            <CachedImageInput
              className="ml-auto"
              onChange={(url) => {
                setWorkshopPhoto({
                  photoUrl: url,
                  workshopId: workshop.id,
                });
              }}
            >
              📸
            </CachedImageInput>
          </PageTitle>
          <SectionNavBar>
            {categories.map((category) => (
              <SectionListLink
                key={category.id}
                href={`#${category.label}`}
                isActive={category.id === activeSectionId}
              >
                {category.label}
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
          <WorkshopKidsSection
            id={category.label}
            workshop={workshop}
            title={category.label}
            kids={category.kids}
          />
        </SectionListWrapper>
      ))}
    </PageContainer>
  );
}
