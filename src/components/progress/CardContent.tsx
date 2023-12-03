import { useProgressForKidAndWorkshop, useStore } from "@/dataStore";
import { ProgressBar } from "@/components/ProgressBar";
import { Kid, Maybe, Progress, Workshop } from "@/types";

export function ProgressCardContent({
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
    <div className="flex flex-col gap-2">
      <LabeledDateInput
        label="Présenté :"
        value={toInputDate(existingProgress?.presentedAt)}
        onChange={(date) => {
          setPresentedAt({
            kidId: kid.id,
            workshopId: workshop.id,
            date,
          });
        }}
      />
      <LabeledDateInput
        label="Validé :"
        value={toInputDate(existingProgress?.validatedAt)}
        onChange={(date) =>
          setValidatedAt({
            kidId: kid.id,
            workshopId: workshop.id,
            date,
          })
        }
      />
      <ProgressBar
        steps={successSteps}
        currentStep={successToStep(existingProgress?.success)}
      />
      <ProgressBar
        steps={completionSteps}
        currentStep={completionToStep(existingProgress?.completion)}
      />
    </div>
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
    <div className="flex gap-2 justify-between items-start">
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
