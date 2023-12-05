import { useParams, useSearchParams } from "react-router-dom";
import { type OptionId } from "./types";
import { type Maybe, type Progress } from "@/types";
import { useKid, useKids, useProgressesForKid, useWorkshop } from "@/dataStore";
import { isWithinInterval } from "date-fns";

const formatter = new Intl.DateTimeFormat("fr-FR", {
  year: "numeric",
  month: "short",
  day: "numeric",
});

export function ProgressReport() {
  const { mode } = useParams<{ mode: OptionId }>();
  const [searchParams] = useSearchParams();

  const kidId = searchParams.get("kidId");
  const rawFrom = searchParams.get("from");
  const rawTo = searchParams.get("to");

  const from = rawFrom ? new Date(rawFrom) : undefined;
  const to = rawTo ? new Date(rawTo) : undefined;

  if (mode === "all") {
    return <AllKidsReport from={from} to={to} />;
  }
  if (kidId) {
    return <KidProgressReport kidId={kidId} from={from} to={to} />;
  } else {
    return <div>Missing param kidId</div>;
  }
}

function AllKidsReport({ from, to }: { from?: Date; to?: Date }) {
  const kids = useKids();
  return (
    <>
      {kids.map((kid, index) => (
        <>
          {index > 0 && <hr className="break-before-page" />}
          <KidProgressReport key={kid.id} kidId={kid.id} from={from} to={to} />
        </>
      ))}
    </>
  );
}

type KidProgressReportProps = {
  kidId: string;
  from?: Date;
  to?: Date;
};
function KidProgressReport({ kidId, from, to }: KidProgressReportProps) {
  const kid = useKid({ kidId });
  const progresses = useProgressesForKid({ kidId });
  if (!kid) return null;
  const sections = progresses.reduce(
    (acc, progress) => {
      const presentedWithinRange = timeStampWithinRange(
        progress.presentedAt,
        from,
        to
      );
      const validatedWithinRange = timeStampWithinRange(
        progress.validatedAt,
        from,
        to
      );

      if (presentedWithinRange) {
        if (validatedWithinRange) {
          acc.presentedAndValidatedProgresses.push(progress);
        } else {
          acc.presentedProgresses.push(progress);
        }
      } else if (validatedWithinRange) {
        acc.validatedProgresses.push(progress);
      }
      return acc;
    },
    {
      presentedProgresses: [] as Progress[],
      validatedProgresses: [] as Progress[],
      presentedAndValidatedProgresses: [] as Progress[],
    }
  );

  return (
    <div className="flex flex-col gap-4">
      <div>
        <span className="text-4xl">Progression de {kid.name}</span>
        {from && (
          <span className="text-xl"> depuis {formatter.format(from)}</span>
        )}
        {to && (
          <span className="text-xl"> jusqu'au {formatter.format(to)}</span>
        )}
      </div>
      {sections.validatedProgresses.length > 0 && (
        <ProgressSection
          title="Validés"
          progresses={sections.validatedProgresses}
        />
      )}
      {sections.presentedProgresses.length > 0 && (
        <ProgressSection
          title="Présentés"
          progresses={sections.presentedProgresses}
        />
      )}
      {sections.presentedAndValidatedProgresses.length > 0 && (
        <ProgressSection
          title="Présentés et validés"
          progresses={sections.presentedAndValidatedProgresses}
        />
      )}
    </div>
  );
}

function timeStampWithinRange(
  timestamp: Maybe<number>,
  from: Date = new Date("1970-01-01"),
  to: Date = new Date("2100-01-01")
) {
  if (!timestamp) return false;
  const date = new Date(timestamp);
  return isWithinInterval(date, { start: from, end: to });
}

function ProgressSection({
  title,
  progresses,
}: {
  title: string;
  progresses: Progress[];
}) {
  return (
    <div className="break-inside-avoid">
      <div className="text-2xl">{title}</div>
      <ul>
        {progresses.map((progress) => (
          <ProgressRow key={progress.id} progress={progress} />
        ))}
      </ul>
    </div>
  );
}

function ProgressRow({ progress }: { progress: Progress }) {
  const workshop = useWorkshop({ workshopId: progress.workshopId });
  if (!workshop) return null;

  return (
    <li>
      <span className="text-xl">{workshop.name}</span>
      {progress.presentedAt &&
        ` - présenté le ${formatter.format(new Date(progress.presentedAt))}`}
      {progress.validatedAt &&
        ` - validé le ${formatter.format(new Date(progress.validatedAt))}`}
    </li>
  );
}
