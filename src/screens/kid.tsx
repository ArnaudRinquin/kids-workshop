import { CachedImageInput } from "@/components/Cache/ImageInput";
import { CardGrid } from "@/components/CardGrid";
import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { ProgressBar } from "@/components/ProgressBar";
import { KidLevelChip } from "@/components/kids/LevelChip";
import { WorkshopCard } from "@/components/workshops/Card";
import {
  useStore,
  useKid,
  useProgressForKidAndWorkshop,
  useSetKidPhotoUrl,
  useWorkshopsInProgressForKid,
  useStartableWorkshopsForKid,
  useValidatedWorkshopsForKid,
} from "@/dataStore";
import { Kid, Maybe, Progress, Workshop } from "@/types";
import { useParams } from "react-router-dom";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-2xl font-semibold my-2 text-gray-900">{children}</h2>
  );
}

export default function KidPage() {
  const params = useParams<{ kidId: string }>();
  if (!params.kidId) {
    throw new Error("Missing kidId");
  }
  const kid = useKid({ kidId: params.kidId });

  const inProgressWorkshops = useWorkshopsInProgressForKid({
    kidId: params.kidId,
  });
  const startableWorkshops = useStartableWorkshopsForKid({
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
      <PageTitle backLink="/kids">
        <>
          {kid.name}
          <KidLevelChip level={kid.level} />
          <CachedImageInput
            className="ml-auto"
            onChange={(url) => {
              console.log("url", url);
              setKidPhoto({
                photoUrl: url,
                kidId: kid.id,
              });
            }}
          >
            📸
          </CachedImageInput>
        </>
      </PageTitle>

      <SectionTitle>Ateliers en cours</SectionTitle>
      <CardGrid>
        {inProgressWorkshops.map((workshop) => (
          <AvailableWorkshop key={workshop.id} workshop={workshop} kid={kid} />
        ))}
      </CardGrid>

      <SectionTitle>Ateliers disponibles</SectionTitle>
      <CardGrid>
        {startableWorkshops.map((workshop) => (
          <AvailableWorkshop key={workshop.id} workshop={workshop} kid={kid} />
        ))}
      </CardGrid>

      <SectionTitle>Ateliers validés</SectionTitle>
      <CardGrid>
        {validatedWorkshops.map((workshop) => (
          <AvailableWorkshop key={workshop.id} workshop={workshop} kid={kid} />
        ))}
      </CardGrid>
    </PageContainer>
  );
}

function AvailableWorkshop({
  kid,
  workshop,
}: {
  kid: Kid;
  workshop: Workshop;
}) {
  const existingProgress = useProgressForKidAndWorkshop({
    kidId: kid.id,
    workshopId: workshop.id,
  });

  const { setPresentedAt, setSuccess, setCompletion, setValidatedAt } =
    useStore();

  const successSteps = [
    {
      children: "C",
      onClick: () => {
        setSuccess({ kidId: kid.id, workshopId: workshop.id, success: "c" });
      },
      key: "1",
    },
    {
      children: "B",
      onClick: () => {
        setSuccess({ kidId: kid.id, workshopId: workshop.id, success: "b" });
      },
      key: "2",
    },
    {
      children: "A",
      onClick: () => {
        setSuccess({ kidId: kid.id, workshopId: workshop.id, success: "a" });
      },
      key: "3",
    },
  ];

  const completionSteps = [
    {
      children: "2",
      onClick: () => {
        setCompletion({
          kidId: kid.id,
          workshopId: workshop.id,
          completion: 2,
        });
      },
      key: "2",
    },
    {
      children: "1",
      onClick: () => {
        setCompletion({
          kidId: kid.id,
          workshopId: workshop.id,
          completion: 1,
        });
      },
      key: "1",
    },
  ];

  return (
    <WorkshopCard {...workshop}>
      <LabeledDateInput
        label={"Présenté le : "}
        value={toInputDate(existingProgress?.presentedAt)}
        onChange={(date) => {
          setPresentedAt({
            kidId: kid.id,
            workshopId: workshop.id,
            date,
          });
        }}
      />
      <ProgressBar
        steps={successSteps}
        currentStep={successToStep(existingProgress?.success)}
      />
      <ProgressBar
        steps={completionSteps}
        currentStep={completionToStep(existingProgress?.completion)}
      />
      <LabeledDateInput
        label={"Validé le : "}
        value={toInputDate(existingProgress?.validatedAt)}
        onChange={(date) =>
          setValidatedAt({
            kidId: kid.id,
            workshopId: workshop.id,
            date,
          })
        }
      />
    </WorkshopCard>
  );
}

function LabeledDateInput({
  label,
  onChange,
  value,
}: {
  label: React.ReactNode;
  onChange: (date: number) => void;
  value: string;
}) {
  return (
    <div className="flex">
      {label}
      <input
        type="date"
        value={value}
        onChange={(event) => onChange(event.target.valueAsNumber)}
      />
    </div>
  );
}

function successToStep(success: Maybe<Progress["success"]>) {
  switch (success) {
    case "a":
      return 2;
    case "b":
      return 1;
    case "c":
      return 0;
    default:
      return null;
  }
}

function completionToStep(completion: Maybe<Progress["completion"]>) {
  switch (completion) {
    case 1:
      return 1;
    case 2:
      return 0;
    default:
      return null;
  }
}

function toInputDate(date: Maybe<number>) {
  if (!date) {
    return "";
  }
  return new Date(date).toISOString().slice(0, 10);
}
