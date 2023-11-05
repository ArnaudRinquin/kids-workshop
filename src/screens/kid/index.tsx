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
import { useLocation, useParams } from "react-router-dom";
import { KidWorkshopsSection } from "./section";
import classNames from "classnames";

type FilterLinkProps = React.DetailedHTMLProps<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;
const FilterLink = ({ className, ...props }: FilterLinkProps) => {
  const { hash } = useLocation();

  return (
    <a
      {...props}
      className={classNames(className, { underline: hash === props.href })}
    />
  );
};

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

  if (!kid) {
    return <main>Enfant perdu 🚨</main>;
  }

  return (
    <PageContainer>
      <div className="sticky top-0 bg-white z-50">
        <PageTitle backLink="/kids">
          {kid.name}
          <KidLevelChip level={kid.level} />
          <CachedImageInput
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

        <nav className="flex flex-row justify-between items-center">
          <FilterLink href="#bookmarked">Épinglés</FilterLink>
          <FilterLink href="#in-progress">En cours</FilterLink>
          <FilterLink href="#available">À commencer</FilterLink>
          <FilterLink href="#validated">Validés</FilterLink>
        </nav>
      </div>

      <KidWorkshopsSection
        id="bookmarked"
        kid={kid}
        title="Épinglés"
        workshops={bookmarkedWorkshops}
      />

      <KidWorkshopsSection
        id="in-progress"
        kid={kid}
        title="Ateliers en cours"
        workshops={inProgressWorkshops}
      />

      <KidWorkshopsSection
        id="available"
        kid={kid}
        title="Ateliers à commencer"
        workshops={availableWorkshops}
      />

      <KidWorkshopsSection
        id="validated"
        kid={kid}
        title="Ateliers validés"
        workshops={validatedWorkshops}
      />
    </PageContainer>
  );
}
