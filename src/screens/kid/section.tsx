import { Card } from "@/components/Card";
import { CardGrid } from "@/components/CardGrid";
import { SectionTitle } from "@/components/SectionTitle";
import { BookmarkButton } from "@/components/progress/BookmarkButton";
import { ProgressCardContent } from "@/components/progress/CardContent";
import { WorkshopCard } from "@/components/workshops/Card";
import { Kid, Workshop } from "@/types";
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
  if (!workshops.length) {
    return null;
  }

  return (
    <>
      <SectionTitle id={props.id}>{props.title}</SectionTitle>
      <CardGrid minItemWidth={400}>
        {workshops.map((workshop) => (
          <WorkshopCard
            {...workshop}
            titleControl={
              <BookmarkButton kidId={props.kid.id} workshopId={workshop.id} />
            }
          >
            <ProgressCardContent
              key={workshop.id}
              workshop={workshop}
              kid={props.kid}
            />
          </WorkshopCard>
        ))}
        {hasMore && (
          <Card className="flex items-center justify-center">
            <button
              className="p-8 text-blue-500 hover:text-blue-600 text-lg font-semibold"
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
