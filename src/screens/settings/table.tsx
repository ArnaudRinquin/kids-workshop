import { PageContainer } from "@/components/PageContainer";
import { PageTitle } from "@/components/PageTitle";
import { BookmarkButton } from "@/components/progress/BookmarkButton";
import { ProgressCardContent } from "@/components/progress/CardContent";
import { useKids, useWorkshops } from "@/dataStore";
import { Kid, Workshop } from "@/types";
import classNames from "classnames";
import { useVirtualizer } from "@tanstack/react-virtual";
import React, { useRef } from "react";

const CELL_CLASSES = "border border-slate-400 avoid-page-break w-64 bg-white";

export function Table() {
  const parentRef = useRef<HTMLDivElement>(null);
  const workshops = useWorkshops();
  const kids = useKids();

  const virtualizer = useVirtualizer({
    count: workshops.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 210,
    overscan: 2,
  });

  return (
    <PageContainer
      header={<PageTitle backLink="/settings">Vue tableau</PageTitle>}
      containerRef={parentRef}
    >
      <div
        className="relative"
        style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <table
          className={classNames(
            CELL_CLASSES,
            "table-fixed border-separate border-spacing-0"
          )}
        >
          <thead>
            <tr>
              <th
                className={classNames(
                  CELL_CLASSES,
                  "z-20 sticky left-0 top-0 bg-white border"
                )}
              >
                <div className="w-32" />
              </th>
              {kids.map((kid) => (
                <th
                  key={kid.id}
                  className={classNames(
                    "z-10 sticky top-0 bg-white",
                    CELL_CLASSES
                  )}
                >
                  {kid.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {virtualizer.getVirtualItems().map((virtualRow, index) => {
              const workshop = workshops[virtualRow.index];
              return (
                <Row
                  key={workshop.id}
                  kids={kids}
                  workshop={workshop}
                  style={{
                    height: `${virtualRow.size}px`,
                    transform: `translateY(${
                      virtualRow.start - index * virtualRow.size
                    }px)`,
                  }}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    </PageContainer>
  );
}

export function Row({
  kids,
  workshop,
  ...props
}: {
  kids: Kid[];
  workshop: Workshop;
} & React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr {...props}>
      <th
        className={classNames(CELL_CLASSES, "z-10 sticky left-0 bg-white w-64")}
      >
        {workshop.name}
      </th>
      {kids.map((kid) => (
        <Cell key={kid.id} kid={kid} workshop={workshop} />
      ))}
    </tr>
  );
}

export function Cell({
  kid,
  workshop,
  ...props
}: {
  kid: Kid;
  workshop: Workshop;
} & React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <td {...props} className={classNames(props.className, CELL_CLASSES, "p-2")}>
      <div className="flex justify-between mb-2">
        Épinglé :
        <BookmarkButton kidId={kid.id} workshopId={workshop.id} />
      </div>
      <ProgressCardContent kid={kid} workshop={workshop} />
    </td>
  );
}
