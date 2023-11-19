import { PageContainer } from "@/components/PageContainer";
import PageTitle from "@/components/PageTitle";
import { BookmarkButton } from "@/components/progress/BookmarkButton";
import { ProgressCardContent } from "@/components/progress/CardContent";
import { useKids, useWorkshops } from "@/dataStore";
import { Kid, Workshop } from "@/types";
import classNames from "classnames";

const CELL_CLASSES = "border border-slate-400 avoid-page-break";

export function Table() {
  const workshops = useWorkshops().slice(10);
  const kids = useKids().slice(5);
  return (
    <PageContainer
      header={<PageTitle backLink="/settings">Vue tableau</PageTitle>}
    >
      <table
        className={classNames(
          CELL_CLASSES,
          "overflow-auto relative table-auto border-separate border-spacing-0"
        )}
      >
        <thead>
          <tr>
            <th
              className={classNames(
                CELL_CLASSES,
                "z-20 sticky left-0 top-0 bg-white border"
              )}
            ></th>
            {workshops.map((workshop) => (
              <th
                key={workshop.id}
                className={classNames(
                  "z-10 sticky top-0 bg-white",
                  CELL_CLASSES
                )}
              >
                {workshop.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {kids.map((kid) => (
            <Row key={kid.id} kid={kid} workshops={workshops} />
          ))}
        </tbody>
      </table>
    </PageContainer>
  );
}

export function Row({ kid, workshops }: { kid: Kid; workshops: Workshop[] }) {
  return (
    <tr>
      <th className={classNames(CELL_CLASSES, "z-10 sticky left-0 bg-white")}>
        {kid.name}
      </th>
      {workshops.map((workshop) => (
        <Cell key={workshop.id} kid={kid} workshop={workshop} />
      ))}
    </tr>
  );
}

export function Cell({ kid, workshop }: { kid: Kid; workshop: Workshop }) {
  return (
    <td className={classNames(CELL_CLASSES, "p-2")}>
      <BookmarkButton kidId={kid.id} workshopId={workshop.id} />
      <ProgressCardContent kid={kid} workshop={workshop} />
    </td>
  );
}
