import { CachedImageInput } from "@/components/Cache/ImageInput";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { KidLevelChip } from "@/components/kids/LevelChip";
import {
  useKid,
  useSetKidPhotoUrl,
  useWorkshopsInProgressForKid,
  useStartableWorkshopsForKid,
  useValidatedWorkshopsForKid,
  useBookmarkedWorkshopsForKid,
} from "@/dataStore";
import { useParams } from "react-router-dom";
import { KidWorkshopsSection } from "./section";
import { SectionListLink } from "@/components/SectionList/Link";
import { useActiveSectionTracker } from "@/components/SectionList/useActiveSectionSpy";
import { SectionListWrapper } from "@/components/SectionList/Wrapper";
import { Workshop } from "@/types";
import { SectionNavBar } from "@/components/SectionList/NavBar";
import React from "react";

export default function KidPage() {
  const params = useParams<{ kidId: string }>();
  if (!params.kidId) {
    throw new Error("Missing kidId");
  }
  const kid = useKid({ kidId: params.kidId });

  const bookmarkedWorkshops = useBookmarkedWorkshopsForKid({
    kidId: params.kidId,
  });

  const inProgressWorkshops = useWorkshopsInProgressForKid({
    kidId: params.kidId,
  });
  const availableWorkshops = useStartableWorkshopsForKid({
    kidId: params.kidId,
  });
  const validatedWorkshops = useValidatedWorkshopsForKid({
    kidId: params.kidId,
  });

  const setKidPhoto = useSetKidPhotoUrl();
  const { activeSectionId, setActiveSectionId } = useActiveSectionTracker();

  // we don't want these categories to change until we navigate to another kid or page
  // so we memoize the results with an empty dependency array
  const categories: { id: string; label: string; workshops: Workshop[] }[] =
    React.useMemo(
      () =>
        [
          {
            id: "bookmarked",
            label: "Épinglés",
            workshops: bookmarkedWorkshops,
          },
          {
            id: "in-progress",
            label: "En cours",
            workshops: inProgressWorkshops,
          },
          {
            id: "available",
            label: "À commencer",
            workshops: availableWorkshops,
          },
          {
            id: "validated",
            label: "Validés",
            workshops: validatedWorkshops,
          },
        ].filter((category) => category.workshops.length > 0),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      []
    );

  if (!kid) {
    return <main>Enfant perdu 🚨</main>;
  }

  return (
    <PageContainer
      header={
        <div className="flex flex-wrap items-end justify-between">
          <PageTitle backLink="/kids">
            {kid.name}
            <KidLevelChip level={kid.level} />
            <CachedImageInput
              prefix="/kids"
              className="ml-auto"
              onChange={(url) => {
                setKidPhoto({
                  photoUrl: url,
                  kidId: kid.id,
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
          <KidWorkshopsSection
            id={category.label}
            kid={kid}
            title={category.label}
            workshops={category.workshops}
          />
        </SectionListWrapper>
      ))}
    </PageContainer>
  );
}
