import Card from "@/components/Card";
import { CardGrid } from "@/components/CardGrid";
import { IconBookmark } from "@/components/Icons";
import { ProgressBar } from "@/components/ProgressBar";
import { WorkshopCard } from "@/components/workshops/Card";
import { useProgressForKidAndWorkshop, useStore } from "@/dataStore";
import { Kid, Maybe, Progress, Workshop } from "@/types";
import classNames from "classnames";
import React from "react";

const ITEMS_PER_SHOW_MORE = 5;

type KidWorkshopsSectionProps = {
  kid: Kid;
  workshops: Workshop[];
  title: string;
  id?: string;
};

export function KidWorkshopsSection(props: KidWorkshopsSectionProps) {
  const [show, setShowMore] = React.useState(1);
  const showMore = () => setShowMore(show + 1);
  const hasMore = show * ITEMS_PER_SHOW_MORE < props.workshops.length;
  const workshops = props.workshops.slice(0, show * ITEMS_PER_SHOW_MORE);
  return (
    <>
      <SectionTitle id={props.id}>{props.title}</SectionTitle>
      <CardGrid>
        {workshops.map((workshop) => (
          <WorkshopProgress
            key={workshop.id}
            workshop={workshop}
            kid={props.kid}
          />
        ))}
        {hasMore && (
          <Card className="flex items-center justify-center">
            <button
              className="p-8 text-blue-500 hover:text-blue-700"
              onClick={showMore}
            >
              Voir plus
            </button>
          </Card>
        )}
      </CardGrid>
    </>
  );
}

function SectionTitle({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>) {
  return (
    <h2
      className={classNames(
        "text-2xl font-semibold my-2 text-gray-900",
        className
      )}
      {...props}
    />
  );
}

function WorkshopProgress({ kid, workshop }: { kid: Kid; workshop: Workshop }) {
  const existingProgress = useProgressForKidAndWorkshop({
    kidId: kid.id,
    workshopId: workshop.id,
  });

  const {
    setPresentedAt,
    setSuccess,
    setCompletion,
    setValidatedAt,
    setBookmarkedAt,
  } = useStore();

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
    <WorkshopCard
      {...workshop}
      titleControl={
        <button
          className="p-2 shrink-0"
          onClick={() => {
            setBookmarkedAt({
              kidId: kid.id,
              workshopId: workshop.id,
              date: existingProgress?.bookmarkedAt ? null : Date.now(),
            });
          }}
        >
          <IconBookmark
            className={{
              "stroke-2": true,
              "fill-red-400": existingProgress?.bookmarkedAt,
              "fill-transparent": !existingProgress?.bookmarkedAt,
              "stroke-red-400": true,
            }}
          />
        </button>
      }
    >
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
